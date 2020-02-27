---
title: Rode Aplicações na Oracle Cloud Usando Recursos Free Tier (Part 2)
subtitle: Utilizando serviços de database always free na Oracle Cloud.
category:
  - Oracle Cloud
author: Felippe Oliveira Neto (FAON)
date: 2020-02-15T19:59:59.000Z
featureImage: /providers/logos/oci.jpg
---
In the first part of this topic ([Part 1](/oci-host-apps-part-1)), we introduced the 1st option of infrastructure architecture using Oracle Cloud Always resources that you can use to deploy your CRUD web application to the internet. This architecture was called "IaaS-Only".

As the second option of architecture, instead of using an always free compute to host the application database you can make use of Oracle Autonomous Database Always Free. We call this architecture "IaaS-DBServices".

**IaaS-DBServices Architecture**:

The IaaS-DBServices architecture uses an instance of **Autonomous Transaction Process** (ATP) to host the web application data.

![IaaS-DBServices Architecture](/uploads/oci/oci-iaas-dbservices-architecture.jpg)

By using this architecture, it isn't necessary to create the infrastructure for the database, because the Autonomous database services is a serverless service and Oracle handles the infrastructure.

This allows the architect to make use of the backend server to another purpose, such as host the web application and make use of the load balancer to balance requests between the two instances; or use to host a REST API interface.

1. In the first option, you create two frontend servers in the frontend subnet, and then set up the load balancer's Backend Set to distribute the load between the two instances.

  ![Frontend Subnet](/uploads/oci/oci-frontend-subnet-2-details.jpg)

  After you create the first compute, execute all the required steps to configure the instance, such as update the operating system, install application packages, binaries, and then deploy the application to the instance's boot volume.

  Create a boot volume clone, and then create the second instance from the boot volume clone. Don't forget to set the instance up as Always Free.

2. If your requirement is to have a REST API interface for your web application or expose a REST API to the internet, then you can use the available compute as a backend server.

  ![Backend Subnet](/uploads/oci/oci-backend-subnet-2-details.jpg)

  As in the IaaS-Only architecture, the access to the backend server needs to be made through the bastion host (frontend server).

The same concepts and patterns which are applied to the IaaS-Only architecture can be applied to this IaaS-DBServices architecture. Though it's important to mention:

* It's highly recommended to create a separate compartment for the database. By using a separate compartment, it's possible to segregate the administrative access to the database from the rest of the infrastructure resources by using policies in the IAM. See [Configure Access to Free Tier Resources in Oracle Cloud (OCI)](/oci-provide-access-resources).

* Make sure to select the database compartment during the autonomous database creation process.

* For a CRUD web application use an **Autonomous Transaction Processing** (ATP) instance.

* Make sure to select the Always Free flag during the creation process. The database capacity will be limited and some stop/terminate rules will be presented to you on the screen.

  ![ATP Always Free flag](/uploads/oci/oci-atp-always-free-flag.jpg)

* Configure Access Control Rules to restrict the access to the database from within the Virtual Cloud Network (VCN). Choose your VCN's compartment and then choose the web application's VCN.

* To allow you to connect from your desktop and execute the initial database set up (table creation and data insertion), make sure to add an **Access Control List** to allow access from the internet (IP Address _0.0.0.0/0_).

  For safety reasons, only keep this setting up for the time you need for this initial set up. Remove the rule when you don't need to connect directly to the database from your desktop.

  You can also use the tools available from the instance's **Service Console** to connect to the database and execute SQL commands.
