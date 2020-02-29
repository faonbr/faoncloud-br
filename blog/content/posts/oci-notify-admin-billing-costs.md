---
title: Notifique os Administradores quando sua Conta na Oracle Cloud exceder o limite Free tier.
subtitle: Crie Alerta de Gastos na Oracle Cloud (OCI).
category:
  - Oracle Cloud
author: Felippe Oliveira Neto (FAON)
date: 2020-02-10T19:59:59.000Z
featureImage: /providers/logos/oci.jpg
---
Para criar um alerta de custo excessivo na OCI, acesse a console com sua conta principal (o email que você utilizou durante a criação da conta na Oracle Cloud), expanda o menu lateral, clique em **Account Management** (serviço listado em **Governance and Administration**) e clique em **Budgets**.

Na console de gerenciamento de conta clique em **Create Budgets** para criar um alarme de custos com as seguintes configurações:

Forneça o nome do alarme como "_Alarm_for_Billing_Outside_Free_Tier_Usage_" e a descrição como "_Alarm for Billing Outside Free Tier Usage_".

Selecione o compartimento que você irá utilizar para criar os recursos Free Tier. Caso não tenha criado um compartimento, veja Controlando o Acesso aos Recursos Free Tier na Oracle Cloud).

Forneça o valor de _1_ (um) para o campo **Monthly Budget Amout**. Este campo apresenta o valor na moeda que foi configurada para a conta Oracle Cloud.

Na região **Budget Alert Rule**, selecione **Actual Spend** e entre com um valor de threshold de 100% do budget. O **Threshold Type** deve ser em porcentagem.

Cadastre o email que você deseja receber a notificação no campo **Email Recipients**, e a mensagem "_Your Free Tier compartment has reached the maximum amount of 1 credit._" no campo **Email Message**.

Pronto, toda vez que o seu consumo na Oracle Cloud ultrapassar a marca estabelecida no alarme, você receberá um email de notificação alertando o custo.
