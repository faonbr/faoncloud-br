---
title: Rode Aplicações na AWS Usando Recursos Free Tier (Part 2)
subtitle: Utilizando instancias de EC2 para rodar a aplicação e database na AWS.
category:
  - AWS
author: Felippe Oliveira Neto (FAON)
date: 2020-02-25T19:59:59.000Z
featureImage: /providers/logos/aws.jpg
---
In the first part of this topic ([Part 1](/aws-host-apps-part-1)), we showed you the list of services available in AWS' Free Tier layer as well as the **12 months free** resources.

In this post, we explorer some AWS infrastructure models for running web applications using the limits established by the free tiers.

Make sure to use an administrative user instead of your AWS' root account to create and manage the resources. See [Configure Access to Free Tier Resources in AWS](/aws-provide-access-resources).

**IaaS-Only-Single-Server Architecture**:

The first model is to use a single compute instance to host both the application layer and the database layer for your CRUD (Create/Read/Update/Delete) web application.

This compute instance need to be deployed to a public subnet.

Below is a high-level graph representation of the infrastructure for an application comprised by a single EC2 instance that runs both the web application and the database. A Network Load Balancer routes the traffic to the server.

![AWS IaaS-Only-Single-Server Architecture](/uploads/aws/aws-iaas-only-single-server-architecture.jpg)

1. To create the VPC, expand the **Services** menu at the top, and then filter the search for "_VPC_".

    AWS provides a wizard to simplify the VPC creation process. In the VPC Dashboard page, click **Launch VPC Wizard**, and select the template **VPC with a Single Public Subnet**.

    In the wizard provide the **VPC name** as "_Free Tier VPC_", select an **Availability Zone** for the public subnet, change the name of the public subnet to "_Frontend Subnet_", and then click **Create VPC**.

    After the service is created, click **OK** to see the details of the newly created VPC.

2. Create and deploy your EC2 instance into the **Frontend Subnet**.

    When creating an EC2 instance, make sure to select an **Amazon Machine Image (AMI)** and a type with the label **Free tier eligible**. For Example, **Amazon Linux 2 AMI** and **t2.micro**. See [AWS Free Tier](https://aws.amazon.com/free) for more details.

    Deploy the instance to the "_Free Tier VPC_" network and "_Frontend Subnet_", and make sure to enable **Auto-assign Public IP**.

    By default an **8 Gb** boot volume is allocated to the instance. Make sure it's enough space for your application. Usually is!

    In the **Add Tags** step, add a tag **Name** with value as "_Frontend-Server_".

    In the **Configure Security Group** step, rename the **Security group name** to "_Frontend-Security-Group_".

    Use this instance to deploy and run both your application and database.

3. Create a **Network Load Balancer**

    You may create a load balancer and assign this EC2 instance to a target group. AWS provides 750 hours of **Elastic Load Balancer** in the **12 months free** tier.

    The load balancer type needs to be **Network Load Balancer**, configured to do health check on the application's port number. An **Application Load Balancer** requires two compute instances to balance request between them. That's why you need to set up a **Network Load Balancer**.

**IaaS-Only-Two-Servers Architecture**:

If you want to segregate the application layer from the database layer into two separate compute instances, then you need to create a separate compute instance in a backend private subnet.

In order to keep your spending in the free tier and because of the 750-hours-of-compute-time free tier limit, you need to abdicate the 24/7 requirement and schedule your server to run only 12hs per day.

![IaaS-Only-Two-Servers Architecture](/uploads/aws/aws-iaas-only-2-servers-architecture.jpg)

1. Before creating the Virtual Private Network (VPC), you need to allocate an Elastic IP Address from AWS's pool to be used by the NAT Gateway (the resource that allows the backend to communicate to the internet - the NAT Gateway will only be used during backend set up process. You won't use it later on as charges may apply).

    Log in the AWS Console as an administrative user, click **EC2** under **Compute** group, and from the left menu click **Elastic IPs**. Allocate an elastic IP address from **Amazon's pool of IPv4 addresses**.

2. To create the VPC, expand the **Services** menu at the top, and then filter the search for "_VPC_".

    In the VPC Dashboard page, click **Launch VPC Wizard**, and select the template **VPC with a Public and Private Subnet**.

    In the wizard provide the **VPC name** as "_Free Tier VPC_", select an **Availability Zone** for both public and private subnet, rename the public as "_Frontend Subnet_" and the private subnet as "_Backend Subnet_", select the elastic IP address for the NAT Gateway, and then click **Create VPC**.

    After the service is created, click **OK** to see the details of the newly created VPC.

    **Note**: Make sure to remove the NAT Gateway after you set up the database server, because as per AWS' pricing model "_...you are charged for each “NAT Gateway-hour" that your NAT gateway is provisioned and available...Each partial NAT Gateway-hour consumed is billed as a full hour._"

3. Create and deploy your EC2 instances into the subnets.

    Create an EC2 instance and deploy it to the  

    In the **Add Tags** step, provide **Name** as "_Frontend-Server_".

    In the **Configure Security Group** rename the **Security group name** as "_Frontend-Security-Group_".

    In the **Configure Security Group** step, enter **Source** IP address as "_10.0.1.0/24_" and **Description** as "_Access from the bastion host_" for the **Port Range 22** entry.

4. Create a **Network Load Balancer**

    The same way the way for the **IaaS-Only-Single-Server Architecture**, you may create a load balancer and assign this EC2 instance to a target group. AWS provides "_750 hours_" of **Elastic Load Balancer** in the **12 months free** tier.

5. Schedule instances to start and stop automatically

    Because of the limit of 750 hours of compute of the free tier, you need to keep your compute instances running only 12hs per day.

    To automatically accomplish this, use **Lambda** functions and **CloudWatch Events** or set up **AWS Instance Scheduler** to start your instances and stop them after 12 hours they are running every day.

    **AWS Lambda** is part of the **Always Free** tier providing "_1 Million free requests per month_". Enough requests to start and stop the instances every day. **CloudWatch Events** as well as **AWS Instance Scheduler** may incur in charges.

    AWS documentation provides two tutorials to help you to configure your Amazon EC2 instances to stop and start at regular intervals:
    * [How do I stop and start Amazon EC2 instances at regular intervals using Lambda?](https://aws.amazon.com/premiumsupport/knowledge-center/start-stop-lambda-cloudwatch/)

    * [How do I stop and start my instances using the AWS Instance Scheduler?](https://aws.amazon.com/premiumsupport/knowledge-center/stop-start-instance-scheduler/)

    **Note**: Remember to apply these for both the frontend and the backend servers.

As a General Note, the billing alarm you've set in the [Notify Admins when AWS Billing Costs Exceed Free Tier Layer](/aws-notify-admin-billing-costs) post will be triggered if you select a resource which isn't part of the free tier.

Continue on [Part 3](/aws-host-apps-part-3).
