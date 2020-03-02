---
title: Executando Aplicações na AWS Usando Recursos Free Tier (Part 2)
subtitle: Utilizando instancias de EC2 para rodar a aplicação e database na AWS.
category:
  - AWS
author: Felippe Oliveira Neto (FAON)
date: 2020-02-25T19:59:59.000Z
featureImage: /providers/logos/aws.jpg
---
No primeiro post desta série, ([Parte 1](/aws-host-apps-part-1)), abordamos alguns serviços free tier que podem ser utilizados para disponibilizar suas aplicações web. Mostramos serviços classificados como **Free Tier** e também gratuítos por 12 meses a partir da criação da conta na AWS.

Neste post, vamos explorar alguns modelos de infraestrutura que podemos utilizar para uma aplicação web, dentro dos limites estabelecidos pelos serviços gratuítos.

Primeiramente, certifique-se de utilizar um usuário com permissões administrativas nos recursos e não o usuário root da sua conta (aquele criado durante o registro na AWS). Veja [Configurando Acesso aos Recursos Free Tier na AWS](/aws-provide-access-resources).

**Arquitetura IaaS-Only-Single-Server**:

O primeiro modelo usa uma única instância de compute para abrigar tanto a aplicação web CRUD (Create/Read/Update/Delete) quanto o servidor de banco de dados.

Esta compute deve estar disponibilizada numa subnet publica para que possa ser acessível via SSH.

Abaixo temos uma representação em alto nível da infraestrutura necessária para rodar a aplicação. Esta infraestrutura é composta por uma única instância de EC2 que servirá para rodar a aplicação web e a base de dados. Um balanceador de carga (**Network Load Balancer**) faz o roteamento do trafico da internet para o servidor web.

![Arquitetura AWS IaaS-Only-Single-Server](/uploads/aws/aws-iaas-only-single-server-architecture.jpg)

1. Para criar uma VPC, abra o menu **Services** no topo da página, e procure por "_VPC_".

    A AWS possue templates para simplificar a criação da VPC e seus componentes. Na página de dashboard da VPC, click em **Launch VPC Wizard** e selecione o template **VPC with a Single Public Subnet**.

    Defina o nome da VPC como "_Free Tier VPC_", selecione uma **Availability Zone** para a subnet pública, altere o nome da subnet para "_Frontend Subnet_", e click em **Create VPC**.

    Após a criação do serviço, click **OK** para ver os detalhes da VPC criada.

2. Crie uma instância de EC2 e disponibilize na subnet **Frontend Subnet**.

    Durante a criação da EC2, certifique-se de selecionar a imagem como sendo **Amazon Machine Image (AMI)** e um tipo identificado como **Free tier eligible**. Por exemplo, **Amazon Linux 2 AMI** and **t2.micro**. Veja [AWS Free Tier](https://aws.amazon.com/free) para mais detalhes.

    Disponibilize a instância na VPC "_Free Tier VPC_" e na subnet "_Frontend Subnet_". Certifique-se de clicar em **Auto-assign Public IP** para que a AWS defina um IP público para a instância EC2.

    Por padrão o boot volume da instância tem **8 Gb**. De maneira geral, é espaço suficiente para deploy de uma aplicação.

    No passo **Add Tags**, forneça a tag "_Name_" com o valor ""_Frontend-Server_".

    No passo **Configure Security Group**, renomeie o **Security group name** para "_Frontend-Security-Group_", para facilitar a visualização.

    Após a instância estar rodando, conecte-se e instale a aplicação, packages e o banco de dados.

3. Crie um load balancer do tipo **Network Load Balancer**

    É recomendado o uso de um load balancer para a aplicação devido ao fato do IP da instância EC2 mudar após restarts, caso você não tenha reservado um IP (operação que tem custo).

    Crie um load balancer e associe a instância EC2 ao target group do load balancer. A AWS fornece 750 horas de **Elastic Load Balancer** na opção **12 months free**. Configure o health check na porta da aplicação. O load balancer só retornará status ok quando a aplicação estiver no ar.

**Arquitetura IaaS-Only-Two-Servers**:

Se você precisa segregar a camada da aplicação da camada de database em 2 instâncias EC2, então recomendamos criar a segunda instnância (backend server) em uma subnet privada de backend.

Para manter os gastos na AWS gratuítos e por causa da restrição de 750 horas de computação que o free tier possue, você precisará abdicar do requiremento de sua aplicação estar no ar 24 horas por dia. Será ncessário parar as 2 instâncias EC2 por 12 horas todos dias.

![Arquitetura IaaS-Only-Two-Servers](/uploads/aws/aws-iaas-only-2-servers-architecture.jpg)

1. Antes de criar a **Virtual Private Network** (**VPC**), você precisa alocar um **Elastic IP Address** do pool da AWS para ser utilizado pelo **NAT Gateway** (necessário para permitir que o backend server possa se comunicar com a internet para baixar updates e packages. Posteriormente à configuração inicial da instância, você poderá desabilitar o **NAT Gateway** e liberar o IP).

    Acesse a console AWS como usuário administrativo, click **EC2** no agrupamento **Compute**, e no menu lateral click **Elastic IPs**. Destine um IP do  **Amazon's pool of IPv4 addresses**.

2. Para criar a VPC, expand o menu **Services** no topo, e procure por "_VPC_".

    Na página da VPC, click **Launch VPC Wizard**, e selecione o template **VPC with a Public and Private Subnet**.

    Na tela de wizard entre com o valor "_Free Tier VPC_" para **VPC name**, selecione **Availability Zone** para as subnets pública e privada, renomeie a subnet pública com o nome "_Frontend Subnet_" e a privada como "_Backend Subnet_", selecione o elastic IP Addree para o NAT Gateway e por fim clique em **Create VPC**.

    Depois que o serviço for criado, clique **OK** para ver os detalhes da VPC.

    **Nota**: Certifique-se de remover o NAT Gateway depois que você instalar e configurar a instância de backend com a database, packages e updates do sistema operacional, porque de acordo com o modelod de preço da AWS o NAT Gateway é um serviço cobrado por hora de uso.

3. Crie as instâncias EC2 nas subnets.

    Crie uma instância de EC2 em cada subnet. Para a instância da subnet de frontend, a tag **Name** deve ter o valor "_Frontend-Server_", e a de backend "_Backend-Server_".

    Em cada instância é aconselhável renomear o **Security Group name** como "_Frontend-Security-Group_" e "_Backend-Security-Group_".

    No security group de backend, configure uma regra de egress da seguinte forma: No **Source** entre o CIDR IP da subnet de frontend, na **Description** "_Access from the bastion host_"  e **Port Range 22**.

4. Crie um Load Balancer do tipo **Network Load Balancer**

    Do mesmo jeito que na **Arquitetura IaaS-Only-Single-Server**, crie um load balancer e aponte para a instância EC2 de frontend. AWS provê 750 horas de **Elastic Load Balancer** na camada **12 months free**.

5. Automatize o start e stop das intâncias EC2.

    Por causa do limite de 750 horas de computação no free tier, é necessário manter as intâncias rodando somente 12 horas por dia.

    Para automaticamente parar as intâncias e religar as mesmas 12 horas depois, use o **Amazon Lambda** com **CloudWatch Events** ou configure **AWS Instance Scheduler**.

    **AWS Lambda** é um serviço classificado no **Always Free** que possue limite de "_1 Million free requests per month_" (1 milhão de execuções). Execuções suficientes para parar e iniciar as instâncias durante um ano (período do "free tier"). O  **CloudWatch Events** e também **AWS Instance Scheduler** são serviços pagos.

    A AWS fornece em sua documentação 2 tutorias que ajudam a configurar as instâncias para stop-start em intervalos regulares:

    * [How do I stop and start Amazon EC2 instances at regular intervals using Lambda?](https://aws.amazon.com/premiumsupport/knowledge-center/start-stop-lambda-cloudwatch/)

    * [How do I stop and start my instances using the AWS Instance Scheduler?](https://aws.amazon.com/premiumsupport/knowledge-center/stop-start-instance-scheduler/)

    **Note**: Lembre-se de aplicar estas configurações para ambas as instâncias de EC2.

Como nota geral, é importante resaltar o papel do alarme de custo que recomendamos configurar no post [Notifique os Administradores quando sua Conta na AWS exceder o limite Free tier](/aws-notify-admin-billing-costs), que será acionado sempre que você exceder o limite estabelecido nele.

Continua na [Parte 3](/aws-host-apps-part-3).
