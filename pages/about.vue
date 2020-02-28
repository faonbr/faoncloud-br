<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="Sobre"
      subtitle="Sobre"
      image="/cloud4freelogo.jpg"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="content">
  			  <h3>Sobre</h3>
          <p>O objetivo deste blog é mostrar para você o que pode ser feito com a camada "Free Tier" ou "Always Free" de diversos provedores de nuvem.</p>
          <p>Utilizaremos algumas aplicações de exemplo para mostrar como disponibilizar estas aplicações para a internet utilizando diversos provedores de computação na nuvem disponíveis hoje, sem ter custo envolvido ou pelo menos com um mínimo de custo (você verá que alguns provedores disponibilizam horas de recurso gratuitas e não o recurso como um todo, e isto pode acarretar num custo mínimo).</p>
          <p>Importante ressaltar que as regras para a camada gratuita "Free Tier" e "Always Free" podem mudar a qualquer momento, pois os provedores são os detentores destas regras.</p>
          <p>Se você verificar que alguma das postagens deste blog não está correta com as cobranças dos serviços relacionados no post, entrem em contato para podermos atualizar o material.</p>
          <p>Não é objetivo deste blog fazer qualquer tipo de comparativo em relação aos provedores e nem seus serviços.<br>Apenas mostraremos as diversas maneiras de se estruturar e disponibilizar aplicações de exemplo utilizando recursos gratuitos fornecidos pelos provedores.</p>
          <p>Da mesma forma, as aplicações de exemplo não devem ser utilizadas como base para desenvolvimento de suas aplicações, pois as mesmas podem não implementar seus requisitos de segurança, conformidade, ou até mesmo arquitetura.</p>
          <p>Lembrem-se que por utilizarmos os serviços gratuitos, que são limitados em termos de capacidade computacional, a aplicação disponibilizada pode não ter alta disponibilidade nem performance adequada para atender uma massa grande de usuários.</p>
          <p>A finalidade deste blog é pura e simplesmente incentivar você a colocar em prática suas idéias de uma forma econômica para que possa mostrar seus protótipos à outras pessoas.</p>
        </div>
      </template>
      <template v-slot:sidebar>
        <h3 class="subtitle is-4">
          Latest Posts
        </h3>
        <posts-grid :per-row="1" :number="2" />
      </template>
    </main-section>
  </div>
</template>
