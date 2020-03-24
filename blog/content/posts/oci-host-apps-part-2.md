---
title: Rode Aplicações na Oracle Cloud Usando Recursos Free Tier (Part 2)
subtitle: Utilizando serviços de database always free na Oracle Cloud.
category:
  - Oracle
author: Felippe Oliveira Neto (FAON)
date: 2020-02-15T19:59:59.000Z
featureImage: /providers/logos/oci.jpg
---
Na primeira parte deste tópico (veja ([Parte 1](/oci-host-apps-part-1)), apresentamos a arquitetura de infraestrutura chamada "IaaS-Only", que contempla o uso de recursos Oracle Cloud Always Free. Nesta arquitetura utilizamos somente recursos de infraestrutura (Network e Computes) para instalar e rodar aplicações web.

Nesta segunda parte, apresentamos uma segunda opção de arquitetura de infraestrutura que utiliza o recurso autonomous database Always Free da Oracle Cloud como base de dados da aplicação web.

**Arquitetura  IaaS-DBServices**:

A arquitetura IaaS-DBServices utiliza uma instância de **Autonomous Database** do tipo **Transaction Process** (ATP) para servir de base de dados para a aplicação web.

![IaaS-DBServices Architecture](/uploads/oci/oci-iaas-dbservices-architecture.jpg)

Neste cenário, dado a utilização de recursos de database autônoma, não é necessário criação de infraestrutura (compute) para utilização do banco de dados.

Sendo assim, temos disponível 2 computes always free que podem ser utilizadas como servidores de frontend ou utilizadas separadamente: uma delas como servidor de frontend e a outra como servidor de backend para serviço REST API, depedendo do cenário da aplicação a ser construída.

1. Na primeira opção, utilize 2 servidores (computes) na camada frontend para balancear a carga através do **Backend Set** no Load Balancer, e permitir disponibilizar mais aplicações web com as computes Always Free.

  ![Frontend Subnet](/uploads/oci/oci-frontend-subnet-2-details.jpg)

  Após criar a primeira compute, conecte e execute todos os passos necessários de  configuração: atualização de sistema operacional, instalação de packages, e deploy da aplicação no storage de boot do servidor.

  Posteriormente, crie um clone do Boot Volume e crie a segunda instância frontend à partir do boot volume clonado. Lembrando de escolher o shape que tenha a indicação **Always Free** para a compute.

2. Caso seja requisito ter uma camada de serviço REST API para aplicação web ou disponibilizar serviços REST API para a internet, você pode utilizar  uma das computes como servidor de backend.

  ![Backend Subnet](/uploads/oci/oci-backend-subnet-2-details.jpg)

  Da mesma forma que na arquitetura IaaS-Only, o acesso à compute de backend é feito através do bastion host da subnet Frontend.

As mesmas características e padrões aplicados na arquitetura IaaS-Only também são aplicados nesta arquitetura IaaS-DBServices. Porém, alguns detalhes são importantes resaltar:

* Recomendado criar um compartimento para o database diferente do compartimento utilizado pelos demais itens da infraestrutura. Desta forma, é possível segregar o acesso administrativo à infraestrutura e do banco de dados entre os usuários administrativos através da criação de políticas no IAM. Veja [Configure Acesso aos Recursos Free Tier na Oracle Cloud (OCI)](/oci-provide-access-resources).

* Certifique-se de escolher este compartimento na criação do autonomous database.

* Para utilização com uma aplicação web CRUD, utilize um banco de dados **Autonomous Transaction Processing** (ATP) instance.

* Durante a criação do banco de dados, escolha a configuração de database indicada pela marca **Always Free**. A capacidade do banco de dados será limitada porém você não pagará por este serviço.

  ![ATP Always Free flag](/uploads/oci/oci-atp-always-free-flag.jpg)

* Configure regras de controle de acesso (**Access Control Rules**) ao banco de dados limitando o acesso ao banco de dados para uma virtual cloud network (VCN). Escolha o compartimento da sua VCN e selecione a virtual cloud network da aplicação web.

* Para configuração inicial do banco de dados da aplicação (criar tabelas e polular os dados iniciais) você pode liberar o acesso Access Control List para a internet (IP 0.0.0.0/0) ou para o IP da sua máquina.

    Por medida de segurança, configure a Access Control List para acesso desta forma somente durante o período de setup inicial da base ou algum tipo de manutenção. Nos demais momentos, remova a regra.

Você pode utilizar as ferramentas disponíveis na console da instância para carregar dados ou realizar manutenções na base através de comandos SQL.
