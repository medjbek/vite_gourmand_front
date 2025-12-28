<!-- src/pages/MentionsLegales.vue -->
<template>
  <q-page class="ml-page">
    <!-- SECTION PRINCIPALE  -->
    <section class="ml-principal q-pa-md">
      <div class="ml-container">
        <h1 class="ml-title">Mentions légales</h1>
        <p class="ml-subtitle">
          Informations relatives à l’éditeur, à l’hébergement et au traitement des données
          personnelles du site Vite &amp; Gourmand.
        </p>
      </div>
    </section>

    <!-- CONTENU -->
    <section class="ml-content q-pa-md">
      <div class="ml-container">
        <q-card flat bordered class="ml-legal">
          <q-card-section class="ml-legal__section">
            <h2 class="ml-legal__title">1. Éditeur du site</h2>
            <p class="ml-legal__text">
              Le présent site, <strong>Vite &amp; Gourmand</strong>, est édité par :
            </p>
            <ul class="ml-list">
              <li>
                <strong>Vite &amp; Gourmand</strong> — entreprise fictive dans le cadre d’un projet
                pédagogique
              </li>
              <li><strong>Adresse :</strong> France</li>
              <li><strong>Email :</strong> contact@vite-et-gourmand.fr</li>
            </ul>

            <q-separator class="ml-sep" />

            <h2 class="ml-legal__title">2. Responsable de la publication</h2>
            <p class="ml-legal__text">
              Le responsable de la publication est : <strong>Julie &amp; José</strong>, fondateurs
              de Vite &amp; Gourmand.
            </p>

            <q-separator class="ml-sep" />

            <h2 class="ml-legal__title">3. Hébergement</h2>
            <p class="ml-legal__text">Le site est hébergé par :</p>
            <ul class="ml-list">
              <li>
                <strong>Hébergeur :</strong> hébergeur fictif (dans le cadre d’un projet
                pédagogique)
              </li>
              <li><strong>Adresse :</strong> France</li>
            </ul>

            <q-separator class="ml-sep" />

            <h2 class="ml-legal__title">4. Propriété intellectuelle</h2>
            <p class="ml-legal__text">
              L’ensemble des contenus présents sur le site (textes, images, logos, graphismes,
              structure) est susceptible d’être protégé par le droit de la propriété intellectuelle.
            </p>
            <p class="ml-legal__text">
              Toute reproduction, représentation, modification ou exploitation, totale ou partielle,
              sans autorisation préalable, est interdite.
            </p>

            <q-separator class="ml-sep" />

            <h2 class="ml-legal__title">5. Données personnelles (RGPD)</h2>
            <p class="ml-legal__text">
              Les informations personnelles pouvant être collectées via le site (formulaire de
              contact, création de compte, commande) sont destinées exclusivement à
              <strong>Vite &amp; Gourmand</strong>.
            </p>
            <p class="ml-legal__text">
              Conformément à la réglementation applicable, vous disposez d’un droit d’accès, de
              rectification et de suppression des données te concernant.
            </p>
            <p class="ml-legal__text">
              Pour exercer vos droits : <strong>contact@vite-et-gourmand.fr</strong>.
            </p>

            <q-separator class="ml-sep" />

            <h2 class="ml-legal__title">6. Cookies</h2>
            <p class="ml-legal__text">
              Le site peut afficher un bandeau (pop-up) de consentement afin de vous permettre
              d’accepter ou de refuser l’utilisation de cookies non essentiels (ex. mesure
              d’audience).
            </p>
            <p class="ml-legal__text">
              Les cookies strictement nécessaires au fonctionnement du site peuvent être utilisés
              sans consentement, car ils sont indispensables à la navigation et à la sécurité.
            </p>
            <p class="ml-legal__text">
              Vous pouvez modifier vos choix à tout moment via les paramètres de ton navigateur ou,
              lorsque disponible, via le lien de gestion des cookies.
            </p>

            <q-separator class="ml-sep" />

            <h2 class="ml-legal__title">7. Sécurité</h2>
            <p class="ml-legal__text">
              Vite &amp; Gourmand met en œuvre des mesures techniques et organisationnelles
              raisonnables pour protéger les données personnelles contre l’accès non autorisé, la
              perte, l’altération ou la divulgation.
            </p>

            <q-separator class="ml-sep" />

            <h2 class="ml-legal__title">8. Responsabilité</h2>
            <p class="ml-legal__text">
              Vite &amp; Gourmand s’efforce de fournir des informations aussi précises que possible.
              Toutefois, l’éditeur ne saurait être tenu responsable des omissions, inexactitudes ou
              carences dans la mise à jour.
            </p>
            <p class="ml-legal__text">
              L’utilisation du site se fait sous la seule responsabilité de l’utilisateur.
            </p>
          </q-card-section>
        </q-card>

        <!-- Bouton retour -->
        <div class="ml-backbtn q-mt-md">
          <q-btn unelevated rounded label="Retour à l’accueil" to="/" class="ml-btn" />
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
//  page statique
</script>

<style scoped>
/* Page */
.ml-page {
  background-color: #f7f3e6;
  color: #070300;
}

/* Conteneur commun */

.ml-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

@media (min-width: 1024px) {
  .ml-container {
    padding-left: 32px;
    padding-right: 32px;
  }
}

/* Section principale*/

.ml-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  line-height: 1.15;
  margin: 0 0 0.75rem 0;
}

.ml-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  line-height: 1.8;
  margin: 0;
  opacity: 0.95;
}

/* cadre légale  */
.ml-legal {
  border-radius: 12px;
  background: #f7f3e6;
  border: 2px solid #281514;
}

.ml-legal__section {
  padding: 20px;
}

/* Typo du contenu */
.ml-legal__title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.ml-legal__text {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  line-height: 1.9;
  margin: 0 0 0.9rem 0;
}

.ml-list {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  line-height: 1.9;
  margin: 0 0 0.9rem 1.2rem;
  padding: 0;
}

.ml-sep {
  background-color: #281514;
  margin: 16px 0;
  opacity: 0.2;
}

/* Bouton retour  */
.ml-backbtn {
  display: flex;
  justify-content: flex-start;
}

.ml-btn {
  background: #281514; /* primary (charte VG) */
  color: #f7f3e6;
  text-transform: none;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 999px;
}

/* Responsive */
@media (max-width: 768px) {
  .ml-title {
    font-size: 1.65rem;
  }
  .ml-legal__section {
    padding: 16px;
  }
  .ml-backbtn {
    justify-content: center;
  }
}
</style>
