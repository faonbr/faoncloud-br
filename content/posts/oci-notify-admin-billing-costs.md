---
title: Notifique os Administradores quando sua Conta na Oracle Cloud exceder o limite Free tier.
subtitle: Crie Alerta de Gastos na Oracle Cloud (OCI).
category:
  - Oracle Cloud
author: Felippe Oliveira Neto (FAON)
date: 2020-02-10T19:59:59.000Z
featureImage: /providers/logos/oci.jpg
---
To create an excessive cost alert on OCI, access the console with your root account (the email you used when you signed up Oracle Cloud), expand the console menu (top left corner), click **Account Management** (under Governance and Administration), and then click **Budgets**.

In the account management console, click **Create Budgets** to create a cost alarm with the following settings:

Provide the name of the alarm as "_Alarm_for_Billing_Outside_Free_Tier_Usage_" and the description as "_Alarm for Billing Outside Free Tier Usage_" (don't use the quotes).

Select the compartment you will use to create the Free Tier resources. If you haven't created a compartment, see (Providing Access to Free Tier Resources in OCI)[/control-billing-cost-cloud-providers].

Provide a value of _1_ (one) for the **Monthly Budget Amount** field. This field displays the amount in the currency that has been configured for the Oracle Cloud account.

In the **Budget Alert Rule** region, select **Actual Spend** and enter a threshold value of 100% of the budget. **Threshold Type** value must be a percentage.

Enter the email address you want to receive notification in the **Email Recipients** field, and the message "_Your Free Tier compartment has reached the maximum amount of 1 credit._" in the **Email Message** field.

Now every time your consumption of Oracle Cloud resources exceeds the mark established in the alarm, you will receive a notification email alerting the high cost.
