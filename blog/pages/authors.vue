<template>
  <div id="authors-page" class="page-wrapper about-page content-page">
    <site-hero
      title="Autores"
      subtitle="Autores"
      image="/cloud4freelogo.jpg"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="content">
          <img src="/collaborators/felippe.jpg">
    			<h2>Felippe Augusto de Oliveira Neto (FAON)</h2>
          <h3>Sao Paulo, Brasil</h3>
          <p>Tenho 16 anos de experiência em na Consultoria da Oracle implementando soluções on-premise de portal, controle de acesso e gestão de identidade em clientes no Brasil.</p>
          <p>Após os anos de consultoria, dediquei os 3 anos seguintes à criar e publicar tutoriais, vídeos sobre caso de uso para o serviço de plataforma (PaaS) Oracle Identity Cloud Service no time de User Assistance da Oracle.</p>
          <p>A partir de 2019 foquei nos estudos e aprendizado nos diversos provedores de infraestrutura na nuvem (IaaS).</p>
          <p>Com os estudos conseguiu as certificações de arquiteto Oracle Cloud Infrastructure e Amazon Web Services no ínicio de 2020.</p>
          <p>Hoje trabalho na TOTVS, na torre de varejo, como especialista em desenvolvimento de software para Omni Channel.</p> 
    			<table cellspacing="10">
    				<tbody>
    					<tr>
    						<td align="center"><img src="/collaborators/aws-certified-logo_color-horz_180x30.jpg"><br><img src="/collaborators/cloud-practitioner-tag_180x16.jpg"><br><img src="/collaborators/solutions-architect-associate-tag_180x16.jpg"></td>
    						<td align="center"><img src="/collaborators/oracle-cloud-infrastructure-2019-architect-associate.png"></td>
    					</tr>
    				</tbody>
    			</table>
    			<br>
    			<a href="mailto:faonbr@gmail.com">Email</a>&nbsp;-&nbsp;<a href="https://www.linkedin.com/in/felippe-augusto-de-oliveira-neto/" target="_blank">Linked</a>
    			<hr>
    			<h2>Robert Lavallie</h2>
          <h3>New York, EUA</h3>
    			<p>Robert é um grande amigo. Nos conhecemos no time de User Assistance. Costumávamos dizer que éramos "Parceiros de crime" (Partners in Crime, em inglês) pois um completa o pensamento do outro e vice-versa.</p>
          <p>Robert colabora com este blog revisando os posts e incluindo sua visão detalhada sobre os casos de uso, além de ajudar na tradução do site para inglês.</p>
    			<p>Atualmente no time de documentação de serviços Kubernetes, ele irá escrever sobre este tema no blog.</p>
    			<br>
    			<a href="mailto:tutorman10461@gmail.com">Email</a>&nbsp;-&nbsp;<a href="https://www.linkedin.com/in/robert-la-vallie-37725243/" target="_blank">Linked</a>
        </div>
      </template>
      <template v-slot:sidebar>
        <h3 class="subtitle is-4">
          Ultimos Posts
        </h3>
        <posts-grid :per-row="1" :number="2" />
      </template>
    </main-section>
  </div>
</template>
