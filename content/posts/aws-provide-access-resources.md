---
title: Configure Access to Free Tier Resources in AWS
subtitle: Create users to manage AWS resources.
category:
  - AWS
author: Felippe Oliveira Neto (FAON)
date: 2020-02-24T19:59:59.000Z
featureImage: /providers/logos/aws.jpg
---
Before creating resources (EC2, S3, VPC, …) in AWS, it's important to create users, groups and policies, and use these users to manage the resources instead of using the root account for these actions.

This way, it's possible to designate a group of users who will have administrative privilege on all resources in a compartment.

1. **Create an Administrative Group**:

  Access the console with your root account (the email you used when you signed up AWS), click on **Services** at the top and filter the search for "IAM" (service listed in **Security, Identity, & Compliance**).

  In the **Identity and Access Management (IAM)** service side menu, click **Groups**, and then click **Create New Group**.

  Provide name as "_FreeTierAdminGroup_" and click **Next Step**.

  From the policy list, you can either select **AdministratorAccess**, or you can select only resource specific administrator access such as **AmazonEC2FullAcces**, **AmazonVPCFullAccess**, **AmazonDynamoDBFullAccess**, **AmazonS3FullAccess**, **AmazonRDSFullAccess**, and so on.

  **Note**: Keep in mind that during resource configurations, users from this group may lack access to resources due to policies not assigned. If this happen, you'll need to update the list of policies in this group, and request the user to log out and log in again.

  After you selected the policies, click **Next Step**, review the group information, and then click **Create Group**.

2. **Create an Administrative User**

  In the **Identity and Access Management (IAM)** service side menu, click **Users**, and then click **Add User**.

  Provide a name for the user. For example, "_freetieradmin_".

  In the **Select AWS access type** section, select **AWS Management Console access**.

  You can either let AWS generate a password for the user, or define the password yourself by selecting **Custom password** and entering the desired password.

  Select if the user needs to reset their password after first login or not, and then click **Next: Permissions**. For security reasons, it's recommended to enforce user's password reset after 1st login.

  In the **Add user to group** step, add the user to the **FreeTierAdminGroup** group, and then click next until you reach the final step. Then click **Create user**.

  To ensure a higher level of security access, you can enable Multi-Factor Authentication (MFA) by clicking the user link in the user list. In the user **Summary** page, click the **Security credentials** tab, and then click **Manage** for **Assigned MFA device**. Set up a MFA device for the user from this point.

This administrator user will be referenced in future posts as the user responsible for creating and managing the free tier resources.
