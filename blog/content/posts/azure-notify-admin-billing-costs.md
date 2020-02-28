---
title: Notifique os Administradores quando sua Conta na Azure exceder o limite Free tier.
subtitle: Crie Alerta de Gastos na Azure.
category:
  - Microsoft Azure
author: Felippe Oliveira Neto (FAON)
date: 2020-02-20T19:59:59.000Z
featureImage: /providers/logos/azure.jpg
---
To create a budget alert on Microsoft Azure, access the console with your root account (the email you used when you signed up  Azure), expand the top left menu, click **Cost Management + Billing**, and then click **Cost Management** on the left menu.

On the left menu, click **Cost alerts** and click **Add**.

* On the first step, the interface will ask you to create budget. Provide name as "_Free_Tier_Budget_", leave **Reset period** as **Billing Month** and set a expiration date for at least one year from the current date.

  Provide the value _1_ for the **Amount** field and then click **Next**.

* On the second step, in the **Alert conditions**, enter value _100_ for **% of budget** field, provide an email address to  **Alert recipients (email)**, and then click **Create**.

Now every time your consumption of Azure resources exceeds the mark established in the alarm, you will receive a notification email alerting the high cost.
