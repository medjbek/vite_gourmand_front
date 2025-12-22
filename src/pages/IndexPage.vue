<template>
  <q-page class="bg-page">
    <!-- SECTION PRINCIPALE -->
    <section class="section-principale q-pa-md border-section">
      <div class="section-container">
        <div class="row items-center q-col-gutter-lg wrap">
          <!-- Colonne texte principale -->
          <div class="col-xs-12 col-md-6 section-principale-text">
            <h1>
              Une cuisine de caractère<br />
              livrée chez vous.<br />
              Des menus frais préparés chaque jour par<br />
              Julie &amp; José.
            </h1>
          </div>

          <!-- Colonne image  principale-->
          <div class="col-xs-12 col-md-6 section-principale-image-col">
            <q-img
              class="section-principale-image"
              src="src/assets/principale-photo.jpg"
              alt="Table dressée avec un plat Vite & Gourmand"
              fit="cover"
              :ratio="4 / 3"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION PRESENTATION -->
    <section class="section-light section-presentation q-pa-md border-section">
      <div class="section-container">
        <div class="row items-center q-col-gutter-lg wrap">
          <!-- colonne  texte presentation-->
          <div class="col-xs-12 col-md-6 presentation-texte">
            <h2 class="presentation-title">Bienvenue chez Vite &amp; Gourmand</h2>

            <ul class="bullet-list">
              <li>Des plats frais élaborés chaque semaine.</li>
              <li>Des repas gourmands équilibrés.</li>
              <li>Une équipe à votre écoute.</li>
              <li>Un service de qualité.</li>
            </ul>

            <q-btn
              label="Voir nos menus"
              class="q-mt-lg btn-secondary-outline"
              outline
              rounded
              padding="sm lg"
            />
          </div>

          <!-- colonne photo  presentation-->
          <div class="col-xs-12 col-md-6 presentation-image-col">
            <q-img
              class="presentation-img"
              src="src/assets/presentation.jpg"
              alt="Plateau repas Vite & Gourmand"
              fit="cover"
              :ratio="4 / 3"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION NOTRE HISTOIRE -->
    <section class="section-histoire q-pa-md border-section">
      <div class="section-container">
        <div class="row items-center q-col-gutter-lg wrap">
          <!-- colonne photo histoire -->
          <div class="col-xs-12 col-md-6 histoire-image-col">
            <q-img
              src="src/assets/histoire.jpg"
              alt="Livraison artisanale Vite & Gourmand"
              :ratio="4 / 3"
              class="histoire-img"
              fit="cover"
              loading="lazy"
            />
          </div>

          <!-- colonne texte histoire-->
          <div class="col-xs-12 col-md-6 histoire-texte">
            <h2 class="histoire-title">Notre histoire</h2>

            <p>
              Vite & Gourmand est une entreprise familiale créée il y a plus de 25 ans par Julie et
              José, spécialistes de la cuisine artisanale livrée à domicile.
            </p>

            <p>
              Chaque semaine, nous proposons des menus faits maison, préparés avec des produits
              frais puis livrés avec soin.
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- SECTION NOTRE ÉQUIPE -->
    <section class="section-equipe q-pa-md border-section">
      <div class="section-container">
        <div class="row items-center q-col-gutter-lg wrap">
          <!-- colonne  texte equipe-->
          <div class="col-xs-12 col-md-6 equipe-texte">
            <h2 class="section-equipe-title">Notre équipe</h2>

            <p>Notre équipe se distingue par son énergie et sa solidarité au quotidien.</p>
            <p>
              Chacun apporte ses compétences pour garantir un service fiable, réactif et centré sur
              la satisfaction des clients.
            </p>
          </div>

          <!-- colonne photo image -->
          <div class="col-xs-12 col-md-6">
            <q-img
              src="src/assets/equipe.jpg"
              alt="L'équipe Vite & Gourmand"
              :ratio="4 / 3"
              class="equipe-img"
              fit="cover"
              position="75% center"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- SECTION AVIS CLIENTS (carousel plus tard) -->
    <section class="section-light section-avis q-pa-md border-section">
      <div class="avis-client">
        <q-img
          src="src/assets/avis-client-carousel.png"
          alt="futur  carousel avis clients"
          :ratio="24 / 9"
          fit="contain"
          loading="lazy"
          class="avis-image"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup>
// pas de code dynamique à ce stade
</script>

<!-- CSS-->
<style scoped>
/* --- CSS SECTION PRINCIPALE --- */
.section-principale {
  background-color: #4e2b05; /*  Primary-Dark */
  color: #f7f3e6; /* texte clair */
}

.section-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

.section-principale-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

@media (min-width: 1024px) {
  .section-principale-text {
    padding-left: 32px;
    padding-right: 32px;
  }
}

.section-principale-text h1 {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  line-height: 2;
  margin-bottom: 0.5rem;
}

.section-principale-text p {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
}

/* Bloc image - section principale */
.section-principale-image {
  width: 100%;
  border-radius: 0;
}

/*Plus de respiration à  l aide du padding */
@media (min-width: 1024px) {
  .section-principale {
    padding-top: 56px;
    padding-bottom: 56px;
  }
}

/* --- STYLES A REUTILISER --- */
.bg-page {
  background-color: #f7f3e6;
}
.border-section {
  box-sizing: border-box;
  border-left: 8px solid #070300;
  border-right: 8px solid #070300;
  border-top: 4px solid #070300;
  border-bottom: 4px solid #070300;
}

.section-light {
  background-color: #f7f3e6;
  color: #070300;
}

/* liste à puces */

.bullet-list {
  padding-left: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  margin: 0;
}

.bullet-list li + li {
  margin-top: 12px; /* petit espace entre chaque puce */
}

/* bouton secondary (outline Quasar) */
.btn-secondary-outline {
  color: #281504; /*  couleur primary  */
  border: 2px solid #281504;
  font-weight: 600;
}

/*---CSS SECTION PRESENTATION---*/

.section-presentation {
  padding-top: 48px;
  padding-bottom: 48px;
}

.presentation-texte {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: none;
  padding-left: 16px;
  padding-right: 16px;
}

@media (min-width: 1024px) {
  .presentation-texte {
    padding-left: 32px;
    padding-right: 32px;
    margin-left: 0px;
  }
}

.presentation-image-col {
  display: flex;
  justify-content: stretch;
}

@media (min-width: 1024px) {
  .presentation-image-col {
    margin-left: 0px;
  }
}

.presentation-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  text-align: left;
  margin: 0 0 1.75rem 0rem; /* ✅ aligne le titre sur le texte des puces */
}

/* Style  des titres h2 de la section Présentation*/
.section-presentation h2 {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.presentation-img {
  width: 100%;
  display: block;
  border-radius: 12px;
  overflow: hidden;
}

/* --- CSS SECTION NOTRE HISTOIRE --- */

.histoire-texte {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 520px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}

@media (min-width: 1024px) {
  .histoire-texte {
    padding-left: 32px;
    padding-right: 32px;
  }
}

.section-histoire {
  background-color: #4e2b05; /*  Primary-Dark */
  color: #f7f3e6; /* texte clair */
}

.histoire-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.7rem;
  margin-bottom: 1rem;
}

.histoire-texte p {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.histoire-img {
  width: 100%;
  display: block;
  border-radius: 12px;
}

/* --- CSS SECTION NOTRE ÉQUIPE --- */
.section-equipe {
  background-color: #f7f3e6;
  color: #070300;
}

.equipe-texte {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: none;
  padding-left: 16px;
  padding-right: 16px;
}

@media (min-width: 1024px) {
  .equipe-texte {
    padding-left: 32px;
    padding-right: 32px;
  }
}

.section-equipe-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  text-align: left;
  margin: 0 0 1.5rem 0;
}

.equipe-texte p {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.85;
  margin: 0 0 1.25rem 0;
}
.equipe-img {
  width: 100%;
  display: block;
  border-radius: 12px;
}

/* --- CSS SECTION AVIS CLIENT --- */

.section-avis {
  display: flex;
  justify-content: center;
}

.avis-client {
  width: 100%;
  max-width: 1100px;
  max-height: none;
  overflow: visible;
}

.avis-image {
  border-radius: 8px;
}
</style>
