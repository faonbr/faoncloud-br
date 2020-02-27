---
title: Rode Aplicações na AWS Usando Recursos Free Tier (Part 1)
subtitle: Apresentando opções de arquitetura de infraestrutura para aplicações usando recursos free tier.
category:
  - AWS
author: Felippe Oliveira Neto (FAON)
date: 2020-02-16T19:59:59.000Z
featureImage: /providers/logos/aws.jpg
---
Let's start this topic by exploring Amazon Web Services (AWS) free tier.

When you create an account in AWS, it provides you two main free-tier flavors: A set of **Always free** resources and you also get some extra resources for free for a period of time of 12 months (called **12 months free** resources).

![AWS Always Free and 12 Month Free Tiers](/uploads/aws/aws-always-free-12-month-free-tier.jpg)

Among the **12 months free** resources, the most used and known services (such as compute, storage, and database) have limits.  Computes and databases have runtime limits while storage gets storage-space limit.

![AWS 12 Months Free Resources](/uploads/aws/aws-12-months-free-resources.jpg)

* The Amazon EC2 service provides compute where you can host and run your web application code.

* For EC2, a 750 hours compute time limit is established as the sum of all compute instances you have. This limit represents exactly 31 days and 6 hours. This is enough time to keep your web application up and running 24/7 in a single compute instance for a year.

  This way, you have one year to collect money to keep your application up and running for the subsequent years, after the 12-month free period ends.

* To host your web application's data, you can make use of the **Amazon RDS** service. The Amazon RDS contains some database flavors, but to keep the choice within the 12-month-free tier use **Amazon Aurora**, and then set it up with a **Dev/Test** template and a **DB instance size** of **db.t2.micro**.

The AWS Always free tier provides Amazon DynamoDB service, a non-relational database (NoSQL), which can be an excellent choice to host the web application data.

![AWS Always Free Resources](/uploads/aws/aws-always-free-resources.jpg)

* There are lots of development frameworks available in the market (depending on the programming language you choose for your web application) that can be used, but AWS provides an [SDK](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) to integrate your web application with DynamoDB.

* [AWS documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html) also provides code examples explaining how to perform create, read, update, and delete operations in DynamoDB using [Java](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Java.03.html), [Node.js](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html), [Python](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Python.03.html), [PHP](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.PHP.03.html), [Ruby](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Ruby.03.html), and [.NET](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NET.html).

Let's start using the **12 months free** resources from AWS (compute and DB Services) and later explorer DynamoDB usage, because it's part of the **Always Free** tier.

Continue on [Part 2](/aws-host-apps-part-2).
