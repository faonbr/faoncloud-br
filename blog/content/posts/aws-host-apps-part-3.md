---
title: Executando Aplicações na AWS Usando Recursos Free Tier (Part 3)
subtitle: Utilizando Amazon DynamoDB como database para a aplicação web na AWS.
category:
  - AWS
author: Felippe Oliveira Neto (FAON)
date: 2020-02-27T19:59:59.000Z
featureImage: /providers/logos/aws.jpg
---

Esta é a terceira parte da série Executando Aplicações na AWS Usando Recursos Free Tier (Veja [Parte 1](/aws-host-apps-part-1) e [Parte 2](/aws-host-apps-part-2)).

Neste post vamos explorar outro modelo de infraestrutura para aplicações web na AWS. Desta vez a aplicação será disponibilizada em uma instância de Amazon EC2 e para a base de dados desta aplicação utilizaremos o Amazon DynamoDB.

Antes de iniciar, certifique-se de usar um usuário com privilégios nos recursos mencionados neste post. Não utilize a conta root da AWS. Veja [Configurando Acesso aos Recursos Free Tier na AWS](/aws-provide-access-resources).

**Arquitetura IaaS-DynamoDB**:

A arquitetura IaaS-DynamoDB utiliza o serviço **Amazon DynamoDB**, que é o serviço da Amazon para base de dados NoSQL.

![Arquitetura IaaS-DynamoDB](/uploads/aws/aws-iaas-dynamodb-architecture.jpg)

Usando esta arquitetura não é necessário criar uma instância de database, pois o DynamoDB é um serviço serverless, o que significa que a AWS cuida da infraestrutura para você. Você só precisa cuidar do dado.

Sendo assim, apenas uma (1) instância de Amazon EC3 se faz necessária para rodar a aplicação web. Para esta camada, você pode seguir o modelo e implementação apresentados na **Arquitetura IaaS-Only-Single-Server** e descrita em [Executando Aplicações na AWS Usando Recursos Free Tier (Part 2)](/aws-host-apps-part-2).

Depois de configurar a camada de aplicação, acesse o serviço Amazon DynamoDB e crie as tabelas, carregue dados e configure uma Role no IAM para habilitar sua instância EC2 para se comunicar com o DynamoDB.

![Details da Subnet Frontend](/uploads/aws/aws-frontend-subnet-dynamodb-details.jpg)

1. Crie suas tabelas no DynamoDB

    Abra o menu **Services** no topo da tela e faça uma busca por "_DynamoDB_".

    Na página do DynamoDB, clique em **Tables** no menu lateral esquerdo e crie as tabelas necessárias para sua aplicação.

    Em NoSQL, tabelas representam uma coleção de documentos (geralmente em formato JSON). Documentos representam dados que a aplicação manipula e expõe. Por exemplo, se você está desenvolvendo uma aplicação de avaliação de músicas, então "músicas" pode ser considerada uma table onde você armazena (em JSON) os dados das músicas que os usuários avaliarão.

    Verifique que a AWS oferece o DynamoDB como parte da oferta **Always Free**, mas com limites de espaço: "_25 GB of storage_"; e de capacidade: "_handle up to 200M requests per month_".

2. Associe uma Role à sua instância EC2 para habilitar a comunicação com o DynamoDB

    Sua aplicação precisará da **AWS SDK** instalada como parte da biblioteca da aplicação para abrir comunicação com o DynamoDB. Porém a SDK necessita de permissões para realizar esta comunicação.

    Você pode criar um usuário no IAM com acesso (**Access Type**) de acesso programático (**Programmatic access**), e configurar os valores da **access key ID** e **secret access key** em um arquivo de configuração no diretório "_$HOME/.aws_". Porém esta forma pode gerar problemas de segurança. Por exemplo, se alguém tiver acesso à instância EC2 esta pessoa ou programa poderá ler as informações de acesso privilegiado e acessar seus dados no DynamoDB.

    Ao invés de utilizar uma access key de um usuário, a abordagem recomendada é criar uma Role no IAM com privilégios de acesso ao DynamoDB e designar esta Role à sua instância de EC2.

    * Acesse a console da AWS com sua conta root (email que você utilizou para criar a conta), clique em **Services** no topo e faça uma busca por "_IAM_" (serviço listado em **Security, Identity, & Compliance**).

    * Clique em **Roles** no menu lateral e cria a seguinte role:

        Selecione o **Type** como sendo **AWS Service**, o use case **EC2**, e clique em **Next**.

        Procure e selecione a policy **AmazonDynamoDBFullAccess** e clique **Next** até chegar no passo em que você prove o nome da role. Use o nome "_EC2-Server-DynamoDB_" e clique em **Create**.

    * Através da console AWS, acesse a página da sua instância EC2. No menu **Action**, clique em **Instance Settings** e clique em **Attach/Replace IAM Role**. Selecione a role que você criou e clique em **Apply**.

    Agora a instância EC2 tem permissão de se comunicar com o DynamoDB através da Role do IAM.

    * Para verificar se a comunicação está funcionando, acesse a instância com o usuário ec2-user e execute comandos através da command line interface (AWS CLI) disponível em todas imagens Amazon linux. Por exemplo:
      ```
      aws configure set region us-east-1
      aws dynamodb list-tables
      ```
      O resultado (em formato JSON) deve apresentar uma lista de tabelas

3. Use a SDK da AWS para integrar sua aplicação ao DynamoDB

    Sua aplicação web necessitará utilizar a SDK da AWS (**AWS SDK**) como parte integrante das packages e libraries.

    A SDK está disponível para várias linguagens de programação. Escolha de acordo com a linguagem de sua aplicação web. Veja [Getting Started with the DynamoDB SDK](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html)

    Use the SDK to make your application to query your DynamoDB tables. The following excerpt is from a Node.js application querying a table called "_App-Table1_" and return the collection as response to the browser:
    ```
    var aws = require('aws-sdk');
    aws.config.update({region: "us-east-1"});
    const dynamodb = new aws.DynamoDB.DocumentClient();
    ...
    var params = {
      TableName: "App-Table1"
    };
    ...
    //There is a limit of 1Mb of messages the _scan_ function can bring each call.
    //You need to recursively call the function (not shown here) if your table contains more than 1Mb of raw data.
    dynamodb.scan(params, function(err, data) {
      if (err){
        logger.log(err, err.stack); // an error occurred
        res.status(500);
      }else{
        logger.log(data);           // successful response
        logger.log('response: '+ data);
        res.status(200).json(data);
      }
    });
    ```

    AWS DynamoDB [Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html) provides examples of other query-functions, as well as how to use the SDK for other programming languages.

I personally think this approach (using DynamoDB as the data source for your application) is better than the IaaS-only approach not only because you can keep your frontend instance running 24/7 for an year for free (at least), but also because you don't need to deal with the underlining infrastructure for the database tier and rely on Amazon serverless service for it.

**IaaS-DBServices Architecture**:

You can use **Amazon RDS*** to store your application data. The infrastructure for this architecture would be quite similar to the IaaS-DynamoDB one, except that instead of using DynamoDB, you would use Amazon RDS.

![Frontend Subnet details](/uploads/aws/aws-iaas-dbservices-architecture.jpg)

For this approach, keep in mind that **Amazon RDS** is part of the **12 months free** tier, and the limits is "_750 Hours
per month of db.t2.micro database usage (applicable DB engines)_". Which means that not all database flavors are supported in the free tier, but **Amazon Aurora** is but data transfer out of the database is charged.

Also, if you follow this approach  make sure to assign "_AmazonRDSFullAccess_" policy to the IAM Role that you assign to the EC2 instance.
