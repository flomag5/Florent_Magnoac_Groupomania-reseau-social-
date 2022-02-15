<template>
  <div>
    <HeaderCgu />
    <container>
      <div class="card">
        <h1>Conditions Générales Utilisation: Groupomania</h1>
        <h2>
          Nous croyons en l'importance de favoriser le partage et la
          connaissance au sein de notre communauté. Les pages que nous animons
          sont des espaces d’échanges et d’information sur les différentes
          activités du groupe Groupomania.
        </h2>
        <p>
          En interagissant avec Groupomania via les réseaux sociaux, vous
          acceptez les présentes conditions générales d’utilisation.<br /><strong
            >Sont notamment prohibées les contributions :</strong
          >
        </p>
        <ul class="rule-list">
          <li class="rule-item">
            <i class="rule"></i>
            <p>
              offensantes, irrespectueuses ou méprisantes envers nos
              collaborateurs ou notre entreprise
            </p>
          </li>
          <li class="rule-item">
            <i class="rule"></i>
            <p>
              en opposition à la législation relative à la propriété
              intellectuelle
            </p>
          </li>
          <li class="rule-item">
            <i class="rule"></i>
            <p>
              diffamatoires, grossières, agressives, injurieuses, obscènes ou
              discriminatoires
            </p>
          </li>
          <li class="rule-item">
            <i class="rule"></i>
            <p>
              incitant à la haine ou à la violence, assimilables à du
              harcèlement ou à une quelconque forme de menace
            </p>
          </li>
          <li class="rule-item">
            <i class="rule"></i>
            <p>à visée publicitaires, promotionnelles ou commerciales</p>
          </li>
          <li class="rule-item">
            <i class="rule"></i>
            <p>
              comportant des liens vers des contenus sans rapport avec les
              thématiques abordées dans nos publications
            </p>
          </li>
          <li class="rule-item">
            <i class="rule"></i>
            <p>
              nuisant au bon déroulement des échanges, incompréhensibles ou
              redondantes
            </p>
          </li>
          <li class="rule-item">
            <i class="rule"></i>
            <p>semblables à de la propagande ou sujettes à polémiques</p>
          </li>
          <li class="rule-item">
            <i class="rule"></i>
            <p>contenant des informations sensibles ou confidentielles</p>
          </li>
        </ul>
        <p class="subtext">
          Groupomania se réserve le droit de refuser ou de supprimer les
          contributions qui contreviendraient à ces règles. <br />

          <strong
            >Toute personne dérogeant à ces principes pourra se voir empêchée
            (de façon temporaire ou permanente) de toutes interactions avec les
            comptes et pages animées par Groupomania.</strong
          >
        </p>
      </div>
    </container>
  </div>
</template>

<script>
import HeaderCgu from "../components/HeaderCgu.vue";
export default {
  name: "Cgu",
  components: {
    HeaderCgu,
  },
};
</script>

<style lang="scss">
img {
  max-width: 100%;
  border-radius: 8px;
}
.card {
  max-width: 100%;
  width: 540px;
  background: white;
  border-radius: 16px;
  margin-top: 45px;
  padding: 20px;
}
.card__title {
  text-align: center;
  font-weight: 800;
}

@media screen and (max-width: 512px) {
  .card {
    width: 100%;
    margin: auto;
  }
}
/**Reset Bootstrap*/
.dropdown-toggle::after {
  content: none;
  display: none;
}
</style>