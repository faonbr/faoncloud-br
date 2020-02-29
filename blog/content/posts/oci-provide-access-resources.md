---
title: Configure Acesso aos Recursos Free Tier na Oracle Cloud (OCI)
subtitle: Crie Usuários para Gerenciar os Recursos na Oracle Cloud (OCI).
category:
  - Oracle Cloud
author: Felippe Oliveira Neto (FAON)
date: 2020-02-10T19:59:59.000Z
featureImage: /providers/logos/oci.jpg
---

Antes de criar os recursos Free Tier/Always Free (Computes, Storages, Network, ...) na Oracle Cloud Infrastructure (OCI) é importante criar usuários e configurar políticas de acesso para que estes usuários possam administrar estes recursos.

Para tanto é necessário entender o conceito de compartimentos (Compartments) introduzido pela OCI.

Compartimento é um recurso lógico com a finalidade de agrupar os recursos a serem criados Computes, Storages, Network, entre outros. Todo recurso na OCI precisa ser associado à um compartimento.

Ao compartimento pode-se configurar políticas de autorização, alarmes de custo, e outros recursos.

Desta forma, é possível designar um grupo de usuários que terá privilégio administrativo em todos os recursos de um compartimento.

1. **Criação de Compartimento para os Recursos Free Tier/Always Free**:

    Acesse a console OCI com sua conta principal (o email que você utilizou durante a criação da conta na Oracle Cloud), expanda o menu lateral, clique em **Identity** (serviço listado em **Governance and Administration**) e clique em **Compartments**.

    Clique **Create Compartment**, forneça nome e descrição como "_AlwaysFree_", certifique-se que o **Parent Compartment** seja o root e clique em **Create Compartment**.

2. **Criação de Grupo de Usuários de Administração**:

    No menu lateral do serviço **Identity**, clique em **Groups** e depois clique em **Create Group**.

    Forneça nome e descrição como "_AlwaysFreeAdminGroup_" e clique em **Create**.

3. **Criação da política de Acesso Administrativo no Compartimento "AlwaysFree"**:

    No menu lateral do serviço Identity, clique em Policies. Certifique-se que o compartimento selecionado na **List Scope** é o **AlwaysFree** (selecione caso não seja) e depois clique em **Create Policy**.

    Forneça nome e descrição com "_AlwaysFree_Policy_", e no campo **Statement 1** na área **Policy Statements** entre com o seguinte valor "_Allow group AlwaysFreeAdminGroup to manage all-resources in compartment AlwaysFree_" (não use as aspas) e clique em Create.

    Esta política concede à todo usuário que é membro do grupo **AlwaysFreeAdminGroup** controle total nos recursos do compartimento **AlwaysFree**.

4. **Criação de Usuário de Administração**:

    Volte à página do serviço **Identity**, clique em **Users** e clique em **Create User**.

    Você pode criar usuários utilizando o email no campo nome, ou um login. Neste exemplo, criamos a conta com nome e descrição "_alwaysfreeadminuser_",  e com o valor do campo email sendo "_alwaysfreeadminuser@mydomain.com_".

    Clique **Create** para criar o usuário.

    Na lista de usuários, clique no nome do usuário recém criado. No menu lateral clique em **Groups** e clique **Add User to Group**. Selecione **AlwaysFreeAdminGroup** da lista e clique **Add**.

    Na lista de usuários, clique no nome do usuário recém criado e clique em **Create/Reset Password** para definir uma password temporária para este usuário. A primeira vez que o usuário se logar na console OCI ele deverá alterar a senha.

    Para garantir mais segurança no acesso deste usuário, clique na opção **Enable Multi-Factor Authentication** e habilite um dispositivo (Device) para autentição em 2 etapas deste usuário.

Após se logar na console, o usuário deverá selecionar o compartimento **AlwaysFree**. Utilize o usuário administrativo criado neste post para criar e gerenciar os recursos Free Tier.

Este usuário será referenciado nos posts futuros.
