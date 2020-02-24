---
title: Host Applications in AWS Using Free Tier Resources (Part 2)
subtitle: This is the 2nd part of the Host Applications in AWS series.
category:
  - AWS
author: Felippe Oliveira Neto (FAON)
date: 2020-02-25T19:59:59.000Z
featureImage: /providers/logos/aws.jpg
---
In the first part of this topic ([Part 1](/aws-host-apps-part-1)), we showed you the list of services available in AWS' Free Tier layer and the **12 months free** resources as well.

In this post, we'll introduce some ideas for running your applications using the limits established by the free tiers.

Before executing any creation/configuration through AWS console, make sure to use an administrative user instead of your AWS' root account. See [Configure Access to Free Tier Resources in AWS](/aws-provide-access-resources).

**IaaS-Only-Single-Server Architecture**:

The first option is to use a single compute instance.

Below is a high-level graph representation of the infrastructure for a CRUD (Create/Read/Update/Delete) web application comprised by a server that acts as the web application's server as well as the database server.

![AWS IaaS-Only Architecture](/uploads/aws/aws-iaas-only-single-server-architecture.jpg)


**IaaS-Only-Two-Servers Architecture**:

If you want to segregate the web layer from the data layer of your application, you'll need to create a separate compute instance in a backend private subnet. This will cause you to abdicate the 24/7 requirement, supposing you still want's to keep your spending in the free tier.

What can be done though, is to keep your compute instances running only 12hs per day. You can schedule

![AWS IaaS-Only Architecture](/uploads/aws/aws-iaas-only-2-servers-architecture.jpg)

The billing alarm you've set in the [Notify Admins when AWS Billing Costs Exceed Free Tier Layer](/aws-notify-admin-billing-costs) post will be triggered if you select a resource which isn't part of the free tier.

TBC
