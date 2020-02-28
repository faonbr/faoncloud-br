---
title: Rode Aplicações na AWS Usando Recursos Free Tier (Part 3)
subtitle: Utilizando Amazon DynamoDB como database para a aplicação web na AWS.
category:
  - AWS
author: Felippe Oliveira Neto (FAON)
date: 2020-02-27T19:59:59.000Z
featureImage: /providers/logos/aws.jpg
---
This is the third part of this series (See [Part 1](/aws-host-apps-part-1) and [Part 2](/aws-host-apps-part-2)) where we show how to deploy applications to AWS using free resources.

The infrastructure model presented here uses an Amazon EC2 instance and Amazon DynamoDB to hold the application and its data, respectively.

Make sure to use an administrative user instead of your AWS' root account to create and manage the resources. See [Configure Access to Free Tier Resources in AWS](/aws-provide-access-resources).

**IaaS-DynamoDB Architecture**:

The IaaS-DynamoDB architecture uses **Amazon DynamoDB**, Amazon's NoSQL database service.

![IaaS-DynamoDB Architecture](/uploads/aws/aws-iaas-dynamodb-architecture.jpg)

By using this architecture, it isn't necessary to create the infrastructure for the database, because DynamoDB is a serverless service, which means that AWS handles its infrastructure. Actually, you only need to take care of the data itself.

You only need to use one Amazon EC2 instance for running your web application, hence you can just follow the infrastructure architecture and implementation steps for **IaaS-Only-Single-Server Architecture**, described in [Host Applications in AWS Using Free Tier Resources (Part 2)](/aws-host-apps-part-2).

After you have set up your application layer as per the **IaaS-Only-Single-Server** Architecture, create DynamoDB tables, load them with data, and then setup an IAM Role to enable your application to communicate with DynamoDB to execute CRUD operations.

![Frontend Subnet details](/uploads/aws/aws-frontend-subnet-dynamodb-details.jpg)

1. Create tables in DynamoDB

    Expand the **Services** menu at the top, and then filter the search for "_DynamoDB_".

    In the DynamoDB page, click **Tables** on the left menu, and create as many tables as needed for your application.

    In NoSQL, a table represents a collection of documents (usually in JSON format). And documents are the data that your application exposes/manipulates. For example, if you're developing a music-rating application, then "Music" would be considered a table where you would store documents (JSON format) representing each music with its rating score.

    Keep in mind that Amazon offers DynamoDB as part of the **Always Free** resources, but with a limit of "_25 GB of storage_" and with a capacity to "_handle up to 200M requests per month_".

2. Assign a role to your EC2 to enable communication with DynamoDB

    You application will need **AWS SDK** installed as part of the application's library in order to communicate with DynamoDB. AWS SDK requires permission to communicate with services.

    You can create a user in IAM with **Access Type** as **Programmatic access**, and then set up the **access key ID** and **secret access key** in a configuration file under "_$HOME/.aws_" folder, but this can lead to security issues. For example, anyone who logs in the EC2 instance could access this key values and then use it to access DynamoDB data.

    Instead of using a user's access key, create a IAM Role with access to DynamoDB and then assign this role to the EC2 instance.

    * Access the console with your root account (the email you used when you signed up AWS), click on **Services** at the top and filter the search for "_IAM_" (service listed in **Security, Identity, & Compliance**).

    * Click **Roles** on the left menu, and create the following role:

        Select type as **AWS Service**, the use case as **EC2**, and then click **Next**.

        Search for the **AmazonDynamoDBFullAccess** policy, select it, and then click **Next** until you reach the point in which you need to provide the name of the role. Name it as "_EC2-Server-DynamoDB_" and click **Create**.

    * Access the EC2 page on the console, select your EC2 instance. In the **Action** menu, expand **Instace Settings** and click **Attach/Replace IAM Role**. Select the role you've just created from the IAM role list, and then click **Apply**.

    Now your EC2 instance can communicate with DynamoDB through the IAM Role.

    * To verify this communication is working, run AWS cli from the EC2 instance by running the "_aws configure_" command and then the _aws dynamodb list-table_ command, as per the example below:
      ```
      aws configure set region us-east-1
      aws dynamodb list-tables
      ```
      The result must be the list of tables in JSON format.

3. Use AWS SDK to integrate your application with DynamoDB

    Your application need to use **AWS SDK** as part of the application packages/libraries.

    The SDK is available on a variety of programming languages. Choose the one that fits your application programming language. See [Getting Started with the DynamoDB SDK](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html)

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
