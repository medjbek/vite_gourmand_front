<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated class="vg-header">
      <q-toolbar>
        <div class="row items-center no-wrap">
          <q-icon name="restaurant" size="22px" class="q-mr-sm" />
          <q-toolbar-title class="vg-title">Vite &amp; Gourmand</q-toolbar-title>
        </div>

        <q-space />

        <!-- Mobile -->
        <div class="row items-center no-wrap lt-md">
          <q-btn
            flat
            dense
            round
            icon="person_add"
            aria-label="Inscription"
            to="/inscription"
            class="q-mr-xs"
          />
          <q-btn
            flat
            dense
            round
            icon="person"
            aria-label="Connexion"
            to="/connexion"
            class="q-mr-xs"
          />
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
        </div>

        <!-- Desktop -->
        <div class="row items-center q-gutter-sm gt-sm">
          <q-btn flat dense label="Accueil" to="/" />
          <q-btn flat dense label="Menu" to="/menu" />
          <q-btn flat dense label="Inscription" to="/inscription" />
          <q-btn flat dense label="Connexion" to="/connexion" />
          <q-btn flat dense label="Contact" to="/contact" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered overlay class="vg-drawer">
      <q-list padding>
        <q-item clickable v-ripple to="/" @click="leftDrawerOpen = false">
          <q-item-section>Accueil</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/menu" @click="leftDrawerOpen = false">
          <q-item-section>Menu</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/inscription" @click="leftDrawerOpen = false">
          <q-item-section>Inscription</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/connexion" @click="leftDrawerOpen = false">
          <q-item-section>Connexion</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/contact" @click="leftDrawerOpen = false">
          <q-item-section>Contact</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="vg-footer">
      <div class="footer-container">
        <footer-opening-hours />

        <div class="footer-block">
          <q-btn flat class="footer-link" label="Mentions légales" to="/mentions-legales" />
        </div>

        <div class="footer-block">
          <q-btn flat class="footer-link" label="CGV" to="/cgv" />
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import FooterOpeningHours from 'src/components/FooterOpeningHours.vue'
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
</script>

<style scoped>
.vg-header {
  background: #070300;
  color: #f7f3e6;
}

.vg-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  letter-spacing: 0.2px;
}

.vg-footer {
  background-color: #070300;
  color: #f7f3e6;
  padding: 28px 16px;
  border-top: 1px solid rgba(247, 243, 230, 0.18);
}

.footer-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.footer-block {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.6;
}

.footer-hours {
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.4;
}

.footer-title-horaires {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: 16px;
}

.footer-hours-text {
  opacity: 0.95;
  white-space: nowrap;
}

.footer-link {
  color: #f7f3e6;
  text-transform: none;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  padding: 0;
  min-height: auto;
}

.footer-link:focus-visible {
  outline: 2px solid #f7f3e6;
  outline-offset: 6px;
  border-radius: 6px;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    text-align: center;
    gap: 14px;
  }

  .footer-hours {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
