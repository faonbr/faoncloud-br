---
title: Host Applications in Oracle Cloud Using Free Tier Resources (Part 1)
subtitle: This is the 1st part of the Host Applications in Oracle Cloud series.
category:
  - Oracle Cloud
author: Felippe Oliveira Neto (FAON)
date: 2020-02-13T19:59:59.000Z
featureImage: /providers/logos/oci.jpg
---
Oracle Cloud provides a set of resources in their "Always Free" layer which can be used to deploy web applications or REST services to access from the internet.

![OCI Always Free Tier](/uploads/oci/oci-always-free-tier.jpg)

The time I wrote this post, the Always Free layer was made of 2 computes, 2 autonomous databases (ADW or ATP), storage, virtual private cloud (VPC), and load balancer (LBR). Those resources are available to be used (with restrictions and limits) without any cost.

This post is part 1 of a series of posts and presents an infrastructure architecture that customers can use to deploy a CRUD web application using Always Free resources.

**IaaS-Only Architecture**:

Below is a high-level graph representation of the infrastructure for a CRUD (Create/Read/Update/Delete) web application made by a frontend server and a backend/database server.

![OCI IaaS-Only Architecture](/uploads/oci/oci-iaas-only-architecture.jpg)

By using this architecture, named "_IaaS-Only Architecture_", administrators and architects have full control of the infrastructure (network, operational system, package versions required by the application) that supports the application.

This architecture allows developers to choose which programming language they will develop their web application, and deploy these application easily from the desktop to the server in the cloud. For example, it supports using [Java](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Java.03.html), [Node.js](https://nodejs.org/), [Python](https://www.python.org/), [PHP](https://www.php.net/), [Ruby](https://www.ruby-lang.org/), and others; and the usage or SQL and non-SQL database such as [MySQL](https://www.mysql.com/), [MongoDB](https://www.mongodb.com/), [PostgreSQL](https://www.postgresql.org/) or [SQLite](https://www.sqlite.org/).

Use Google to search for "_develop CRUD web applications_" and provide the name of one of these programming languages and databases and you'll find plenty of material on how to develop CRUD web applications.

This infrastructure architecture is simple, but it implements some design patterns as you'll see.

Below the layer-by-layer description of the IaaS-Only architecture:

* **Virtual Cloud Network (VCN)**: This is the virtual cloud network where the application and its database will be deployed.

  * Before you create the VCN in a region, it's important to verify if the "Always Free Eligible" shape are available in the selected region.

  * The servers (computes) need to be created in an Availability Domain (AD) which contains the "Always Free Eligible" shape. The AD may vary depending on the region chosen.

  * Make sure to select a compartment where the VCN and the entire infrastructure will be held. See Configure Access to Free Tier Resources in Oracle Cloud (OCI).

  ![Always Free Label](/uploads/oci/oci-always-free-shape-labeled.jpg)

* **Load Balancer Subnet (LBR)**: It's where you deploy the load balancer of the web application.

  * Create a regional public subnet.

  * Although it may be not required (you could use the public IP of the frontend compute to access the web application) it's highly recommended to use the always free load balancer Oracle provides because:

    * You can use the metrics available for the load balancer service to monitor the behavior of the user access to your application.

    * It facilitates the configuration of SSL access to your web application (although you need to buy a certificate).

    * If you want to deploy multiple web applications using the same frontend server (each one needs to start in a different port), you can configure Path Route Set to allow routing rules based on the URL path. The domain/IP Address and port of all applications accessed from the internet will be the same.

  * If you have security requirements to use SSL to access your application, install the certificate in the load balancer and configure the listener to listen on port number 443.

  ![LBR Subnet](/uploads/oci/oci-lbr-subnet-details.jpg)

* **Frontend Subnet**: Deploy the frontend server (compute) to host your web application in this subnet.

  * Create a regional public subnet.

  * The frontend server will also be used as a bastion server, allowing access to the backend server located in a private subnet.

  * Use a Security List and create a security rule to allow SSH connections from the internet.

  * For security reasons, only add this security rule when you need to SSH into the server. If you aren't logged in, delete the rule.

  * Create a Security Rule to allow communication between the frontend and the backend subnets. This allows you to SSH to the backend server, from the bastion host locate in the frontend subnet.

  ![Frontend Subnet](/uploads/oci/oci-frontend-subnet-details.jpg)

* **Backend Subnet**: Deploy the backend server (compute) here to host the database of the web application. You can also use this server to host REST API server to be used by the frontend server.

  * Create a regional private subnet.

  * This subnet's Security List needs to contain a rule to allow egress communication to the internet through a NAT Gateway. This allows you to install O.S. and database packages directly from the internet using `sudo yum install` or `apt-get install` commands depending on the operating system.

  ![Backend Subnet](/uploads/oci/oci-backend-subnet-details.jpg)

The frontend and backend servers (computes) must be deployed in their respective subnets. Chose the platform image (operational system) which suits you the best. For example: Ubuntu, CentOS, or Oracle Linux.

If you choose Oracle Linux, this O.S comes configured with linux firewall enabled, hence it's necessary to execute the following commands in order to open the port used by the web application and database:

```
sudo firewall-cmd --zone=public --permanent --add-port=80/tcp
sudo firewall-cmd --reload
```

In the above example, port 80 will be open in the O.S. firewall. Verify which port number your application and database will run and replace the value in the commands before executing it.

Continue on [Part 2](/oci-host-apps-part-2).
