---
title: Executando Aplicações na AWS Usando Recursos Free Tier (Part 1)
subtitle: Apresentando opções de arquitetura de infraestrutura para aplicações usando recursos free tier.
category:
  - AWS
author: Felippe Oliveira Neto (FAON)
date: 2020-02-16T19:59:59.000Z
featureImage: /providers/logos/aws.jpg
---
Vamos explorar o modelo free tier na Amazon Web Services (AWS).

Quando você criar uma conta na AWS, esta prove para você um pacote de serviços **Always free**  e também recursos adcionais gratuítos (com limites) por um período de 2 meses (**12 months free**).

![AWS Always Free e 12 Month Free](/uploads/aws/aws-always-free-12-month-free-tier.jpg)

Dentre os serviços **12 months free**, os mais conhecidos e utilizados da AWS (Compute, Storage e Database) possuem limitação de tempo de execução para compute e database, e limitação de espaço de armazenamento para o storage.

![Recursos AWS Gratuítos por 12 Meses](/uploads/aws/aws-12-months-free-resources.jpg)

* Intâncias de **Amazon EC2** proveem servidores (computes) onde podemos executar a aplicação web.

* Fazendo a conta, a limitação de 750 horas por mês equivale à exatos 31 dias e mais 1/4 de dia, isto é, 6 horas. Isto permite manter a aplicação web rodando por 12 meses ininterruptamente.

    Você tem 1 ano para captar recursos financeiros para pagar o host da sua aplicação web pelos anos seguintes.

* No backend, podemos utilizar o serviço **Amazon RDS** como base de dados relacional para a aplicação web. O serviço dispôe de alguns modelos, porém na camada **12 months free** utilize o **Amazon Aurora**, com o template de **Dev/Test**, e o **DB instance size** como **db.t2.micro**.

To host your web application's data, you can make use of the **Amazon RDS** service. The Amazon RDS contains some database flavors, but to keep the choice within the 12-month-free tier use **Amazon Aurora**, and then set it up with a **Dev/Test** template and a **DB instance size** of **db.t2.micro**.

Na camada **Always free** é possível verificar a disponibilidade do **Amazon DynamoDB**, que é um database não-relacional (NoSQL) que pode ser utilizado para armazenar dados de aplicações web ao invés de um database relacional

![Recursos AWS Always Free](/uploads/aws/aws-always-free-resources.jpg)

* Existem vários frameworks de desenvolvimento para aplicações web (em diferentes linguagens) que utilizam modelo NoSQL para a camada de dados, porém a AWS disponibliza uma [SDK](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) para integrar sua aplicação web com o **Amazon DynamoDB**.

* Em sua [documentação](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html) a AWS provê exemplos de como executar operações CRUD no DynamoDB utilizando linguagens como [Java](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Java.03.html), [Node.js](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html), [Python](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Python.03.html), [PHP](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.PHP.03.html), [Ruby](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Ruby.03.html), and [.NET](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NET.html).

O **Amazon DynamoDB** é uma excelente opção para mantermos o conceito "Cloud For Free", porém vamos começar fazendo uso dos recursos disponíveis gratuitamente por 12 meses (**12 months free**) e posteriormente mostrar a arquitetura utilizando **Amazon DynamoDB**.

Continua na [Parte 2](/aws-host-apps-part-2).
