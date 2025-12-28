<!-- src/pages/CGV.vue -->
<template>
  <q-page class="cgv-page">
    <!-- SECTION PRINCIPALE -->
    <section class="cgv-principal q-pa-md">
      <div class="cgv-container">
        <h1 class="cgv-title">Conditions Générales de Vente</h1>
        <p class="cgv-subtitle">
          Les présentes CGV définissent les modalités de commande, de paiement, de livraison et les
          règles applicables aux produits proposés par Vite &amp; Gourmand.
        </p>
      </div>
    </section>

    <!-- CONTENU -->
    <section class="cgv-content q-pa-md">
      <div class="cgv-container">
        <q-card flat bordered class="cgv-legal">
          <q-card-section class="cgv-legal__section">
            <h2 class="cgv-legal__title">1. Objet</h2>
            <p class="cgv-legal__text">
              Les présentes Conditions Générales de Vente (CGV) encadrent les ventes de produits
              alimentaires et services associés proposés par <strong>Vite &amp; Gourmand</strong>
              (entreprise fictive dans le cadre d’un projet pédagogique).
            </p>

            <q-separator class="cgv-sep" />

            <h2 class="cgv-legal__title">2. Produits</h2>
            <p class="cgv-legal__text">
              Les produits proposés sont décrits et présentés avec la plus grande exactitude
              possible. Les visuels sont non contractuels (illustrations).
            </p>

            <q-separator class="cgv-sep" />

            <h2 class="cgv-legal__title">3. Commande</h2>
            <p class="cgv-legal__text">
              Toute commande implique l’acceptation sans réserve des présentes CGV. Une commande
              peut être passée via le site (ou par email dans le cadre du projet).
            </p>

            <q-separator class="cgv-sep" />

            <h2 class="cgv-legal__title">4. Prix</h2>
            <p class="cgv-legal__text">
              Les prix sont indiqués en euros. Les éventuels frais de livraison peuvent s’ajouter au
              prix des produits et sont affichés avant validation de la commande.
            </p>

            <q-separator class="cgv-sep" />

            <h2 class="cgv-legal__title">5. Paiement</h2>
            <p class="cgv-legal__text">
              Le paiement est exigible immédiatement à la commande. Les moyens de paiement affichés
              sur le site sont indiqués à titre pédagogique.
            </p>

            <q-separator class="cgv-sep" />

            <h2 class="cgv-legal__title">6. Livraison</h2>
            <p class="cgv-legal__text">
              Les modalités de livraison (zones, créneaux, délais) sont précisées lors de la
              commande. À réception, il appartient au client de vérifier l’état des produits et de
              respecter la chaîne du froid.
            </p>

            <q-separator class="cgv-sep" />

            <h2 class="cgv-legal__title">7. Droit de rétractation</h2>
            <p class="cgv-legal__text">
              Conformément aux règles applicables, certains produits alimentaires périssables
              peuvent ne pas bénéficier du droit de rétractation. Les conditions sont précisées
              selon la nature des produits proposés.
            </p>

            <q-separator class="cgv-sep" />

            <h2 class="cgv-legal__title">8. Responsabilité</h2>
            <p class="cgv-legal__text">
              <strong>Vite &amp; Gourmand</strong> ne saurait être tenue responsable des dommages
              résultant d’une mauvaise conservation ou d’une utilisation non conforme des produits.
            </p>

            <q-separator class="cgv-sep" />

            <h2 class="cgv-legal__title">9. Données personnelles</h2>
            <p class="cgv-legal__text">
              Les informations personnelles collectées dans le cadre d’une commande sont traitées
              conformément à la politique de confidentialité et aux obligations RGPD.
            </p>

            <q-separator class="cgv-sep" />

            <h2 class="cgv-legal__title">10. Droit applicable</h2>
            <p class="cgv-legal__text">
              Les présentes CGV sont soumises au droit français. En cas de litige, une solution
              amiable sera recherchée avant toute action judiciaire.
            </p>
          </q-card-section>
        </q-card>

        <!-- Bouton retour -->
        <div class="cgv-backbtn q-mt-md">
          <q-btn unelevated rounded label="Retour à l’accueil" to="/" class="cgv-btn" />
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
// page statique
defineOptions({
  name: 'CgvPage',
})
</script>

<style scoped>
/* Page */
.cgv-page {
  background-color: #f7f3e6;
  color: #070300;
}

/* Conteneur commun */
.cgv-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

@media (min-width: 1024px) {
  .cgv-container {
    padding-left: 32px;
    padding-right: 32px;
  }
}

/* Section principale */
.cgv-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  line-height: 1.15;
  margin: 0 0 0.75rem 0;
}

.cgv-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  line-height: 1.8;
  margin: 0;
  opacity: 0.95;
}

/* Bloc légal */
.cgv-legal {
  border-radius: 12px;
  background: #f7f3e6;
  border: 2px solid #281514;
}

.cgv-legal__section {
  padding: 20px;
}

/* Typo du contenu */
.cgv-legal__title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.cgv-legal__text {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  line-height: 1.9;
  margin: 0 0 0.9rem 0;
}

.cgv-sep {
  background-color: #281514;
  margin: 16px 0;
  opacity: 0.2;
}

/* Bouton retour */
.cgv-backbtn {
  display: flex;
  justify-content: flex-start;
}

.cgv-btn {
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
  .cgv-title {
    font-size: 1.65rem;
  }
  .cgv-legal__section {
    padding: 16px;
  }
  .cgv-backbtn {
    justify-content: center;
  }
}
</style>
