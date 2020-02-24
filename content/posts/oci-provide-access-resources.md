---
title: Configure Access to Free Tier Resources in Oracle Cloud (OCI)
subtitle: Create users to manage Oracle Cloud (OCI) resources.
category:
  - Oracle Cloud
author: Felippe Oliveira Neto (FAON)
date: 2020-02-10T19:59:59.000Z
featureImage: /providers/logos/oci.jpg
---
Before creating Free Tier / Always Free resources (Computes, Storages, Network, …) in Oracle Cloud Infrastructure (OCI) it is important to create users and configure access policies so that these users can manage these resources.

Therefore, it is necessary to understand the concept of compartments introduced by the OCI.

A compartment is a logical concept with the purpose of grouping the resources to be created Computes, Storages, Network, among others. Every resource in the OCI must be associated with a compartment.

The compartment can be configured with authorization policies, cost alarms, and other resources.

This way, it's possible to designate a group of users who will have administrative privilege on all resources in a compartment.


1. **Creating a Compartment for Free Tier / Always Free Resources**:

  Access the OCI console with your root account (the email you used when creating your Oracle Cloud account), expand the side menu, click on **Identity** (service listed under Governance and Administration) and click on **Compartments**.

  Click **Create Compartment**, provide name and description as "_AlwaysFree_", make sure **Parent Compartment** is the root and click **Create Compartment**.

2. **Creation of Administration User Group**:

  In the **Identity** service side menu, click **Groups**, and then click **Create Group**.

  Provide name and description as "_AlwaysFreeAdminGroup_" and click **Create**.

3. Create Administrative Access Policy for the "AlwaysFree" compartment:

  In the **Identity** service side menu, click **Policies**. Make sure that the compartment selected in the **List Scope** is **AlwaysFree** (if not, select this value) and then click **Create Policy**.

  Provide name and description with "AlwaysFree_Policy", and in the **Statement 1** field in the **Policy Statements** area, enter the following value "Allow group AlwaysFreeAdminGroup to manage all-resources in compartment AlwaysFree" (do not use quotes), and then click **Create**.

  This policy gives every user who is a member of the AlwaysFreeAdminGroup group full control over the features of the AlwaysFree compartment.

4. **Administration User Creation**:

  Navigate back to the **Identity** service page, click **Users**, and then click **Create User**.

  You can create users using email in the name field, or a login. In this example, we create the account with name and description "_alwaysfreeadminuser_", and the value of the email field being "_alwaysfreeadminuser@mydomain.com_".

  Click **Create** to create the user.

  In the list of users, click the name of the newly created user. In the side menu click **Groups** and click **Add User to Group**. Select **AlwaysFreeAdminGroup** from the list and click **Add**.

  Back to the list of users, click the name of the newly created user again, and click **Create / Reset Password** to set a temporary password for this user. The first time this user logs in to the OCI console, they must change the password.

  To ensure a higher level of security access, click **Enable Multi-Factor Authentication** for this user, and enable a device for 2 step authentication.

When logging in to the console, the administrative user must select the **AlwaysFree** compartment to be able to manage resources.

This administrator user will be referenced in future posts.
