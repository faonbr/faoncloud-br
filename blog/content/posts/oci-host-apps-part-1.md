---
title: Rode Aplicações na Oracle Cloud Usando Recursos Free Tier (Part 1)
subtitle: Apresentando opções de arquitetura de infraestrutura para aplicações usando recursos free tier.
category:
  - Oracle
author: Felippe Oliveira Neto (FAON)
date: 2020-02-13T19:59:59.000Z
featureImage: /providers/logos/oci.jpg
---
A Oracle disponibiliza aos seus clientes um conjunto de recursos "Always Free" que podem ser utilizados para disponibilizar aplicações web ou serviço REST na internet.

![OCI Always Free Tier](/uploads/oci/oci-always-free-tier.jpg)

No momento que este post foi escrito, 2 servidores (Compute), 2 base de dados autônomas (ADW ou ATP), storage, rede virtual (VPC) e load balancer (LBR) fazem parte da camada "Always Free". Isto significa que qualquer usuário pode criar estes recursos na nuvem da Oracle e utilizá-los, dentro dos limites estabelecidos no "Always Free", sem custo.

Neste post apresento uma opção de arquitetura de infraestrutura para  aplicações que podem ser implementada utilizando recursos gratuítos da Oracle Cloud.

**Arquitetura IaaS-Only**:

Ilustrado abaixo temos um exemplo de arquitetura para uma aplicação CRUD (Create/Read/Update/Delete) composta de servidor de frontend e de backend/database:

![OCI IaaS-Only Architecture](/uploads/oci/oci-iaas-only-architecture.jpg)

Nesta arquitetura, aqui nomeada de "_Arquitetura Iaas-Only_", o administrador/arquiteto tem total controle da infraestrutura (rede, sistema operacional, versões dos pacotes necessários para os aplicativos) para a aplicação.

Esta arquitetura permite uso de linguagens de programação e softwares que são largamente utilizados pelo mercado. Por exemplo, a aplicação pode ser desenvolvida em [Java](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Java.03.html), [Node.js](https://nodejs.org/), [Python](https://www.python.org/), [PHP](https://www.php.net/), [Ruby](https://www.ruby-lang.org/), entre outras; com uso de bancos de dados relacionais ou não como [MySQL](https://www.mysql.com/), [MongoDB](https://www.mongodb.com/), [PostgreSQL](https://www.postgresql.org/) ou [SQLite](https://www.sqlite.org/).

Busque na internet pelo termo "_develop CRUD web applications_" e inclua na busca o nome da linguagem de programação e base de dados. Você encontrará vários materiais explicando como desenvolver aplicações web CRUD.

Esta é uma arquitetura bem simples, porém que se enquadra em alguns padrões de desenvolvimento. Esta arquitetura permite que um sistema desenvolvido em um desktop possa ser disponibilizado na nuvem de forma simples, instalando seu código fonte nos servidores.

Abaixo, uma descrição mais detalhada da Arquitetura IaaS Total:

* **Virtual Cloud Network (VCN)**: Rede virtual dentro da nuvem Oracle utilizada para disponibilizar a aplicação e o banco de dados.

  * Antes de criar a VCN em uma região é importante verficar se a região tem disponibilidade do modelo (Shape) "Always Free Eligible".

  * As computes serão disponibilizadas na VCN, no Availability Domain(AD) que tem o shape disponível. Este AD pode variar dependendo da região.

  * Certifique-se de selecionar um compartimento onde a VCN e toda a infraestrutura será criada. Veja [Configurando Acesso aos Recursos Always Free na Oracle Cloud (OCI)](/oci-provide-access-resources).

  ![Always Free Label](/uploads/oci/oci-always-free-shape-labeled.jpg)

* **Load Balancer Subnet (LBR)**: Disponibiliza o load balancer para a aplicação web.

  * Subnet regional de acesso público.

  * Embora não seja necessário para a implementação (você poderia disponibilizar o IP público do servidor frontend para acesso à aplicação web) é recomendado utilizar o Load Balancer Always Free fornecido pelos seguintes motivos:

    * Utilizar as métricas disponibilzadas no serviço de Load balancer para monitorar o comportamento de acesso ao seu sistema.

    * Facilitar a configuração de acesso SSL à sua aplicação caso você tenha este requisito (você só tem o custo de compra de um certificado).

    * Caso você queira disponibilizar mais de uma aplicação no servidor Frontend você pode utilizar a mesma porta do serviço HTTP do load balancer e configurar regras de roteamento baseadas no path da URL (utilizando a feature **Path Route Set** do load balancer).

  * O balanceador de carga será disponibilizado nesta subnet, configurado em SSL (caso seja requisito), com o certificado (adquirido  separadamente).

  ![LBR Subnet](/uploads/oci/oci-lbr-subnet-details.jpg)

* **Frontend Subnet**: Disponibiliza o servidor de frontend da aplicação web.

  * Subnet regional de acesso público.

  * O servidor da aplicação web também serve como servidor bastião para acesso ao servidor no backend.

  * Regra de firewall (Security List) controla o acesso de conexão SSH com servidor provenientes da internet.

  * Mantenha maior segurança, habilitando estas regras de acesso SSH ao servidor pela internet somente quando o acesso se fizer necessário. Nos demais momentos remova a regra.

  * Security List controla a regra de comunicação entre o frontend e o backend.

  ![Frontend Subnet](/uploads/oci/oci-frontend-subnet-details.jpg)

* **Backend Subnet**: Nesta camada o servidor disponibilizado serve como base de dados e de serviços para a camada de frontend.

  * Subnet regional de acesso privado.

  * A subnet tem comunicação egress com a internet para baixar pacotes de S.O e do banco através de um NAT Gateway.

  * A Security List desta subnet precisa conter uma regra de egress com a internet através de um NAT Gateway. Isto permitirá que sejam instalados packages e updates do sistema operacional assim como do database através dos comandos `sudo yum install <app>` ou `sudo apt-get install <app>`, dependendo do S.O. utilizado.

  ![Backend Subnet](/uploads/oci/oci-backend-subnet-details.jpg)

Os servidores (computes) de frontend e backend devem ser disponibilizados em suas respectivas subnets. Você pode escolher a imagem da plataforma (Platform Image) Ubuntu, CentOS ou Oracle Linux.

Importante lembrar que caso escolha a opção Oracle Linux, o sistema operacional vem configurado com o firewall linux sendo necessário a liberação da porta do servidor de aplicação e banco de dados no firewall do sistema operacional, através dos comandos abaixo:

```
sudo firewall-cmd --zone=public --permanent --add-port=80/tcp
sudo firewall-cmd --reload
```

No exemplo acima, a porta 80 será liberada no firewall do sistema operacional do servidor. Verique a porta em que a aplicação e o banco de dados serão executados e substitua no comando acima antes de executar no respectivo servidor.

Continua em [Part 2](/oci-host-apps-part-2).
