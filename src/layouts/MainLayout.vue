<template>
  <q-layout view="lHh Lpr lFf">
    <!-- HEADER vite et gourmand-->

    <q-header elevated class="vg-header">
      <q-toolbar>
        <!-- Bloc de gauche : logo + vite et gourmand-->
        <div class="row items-center no-wrap">
          <q-icon name="restaurant" size="22px" class="q-mr-sm" />
          <q-toolbar-title class="vg-title"> Vite &amp; Gourmand </q-toolbar-title>
        </div>

        <!-- q-space pousse à droite l icone connexion et le menu burger-->
        <q-space />
        <!-- Partie mobile -->
        <div class="row items-center no-wrap vg-actions-mobile lt-md">
          <!-- Icône connexion -->
          <q-btn flat dense round icon="person" aria-label="Connexion" to="/connexion" />
          <!-- Icône menu burger qui ouvre ou ferme le drawer -->
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
        </div>
        <!-- Menu desktop uniquement -->

        <div class="row items-center q-gutter-sm gt-sm">
          <q-btn flat dense label="Accueil" to="/" />
          <q-btn flat dense label="Menu" to="/menu" />
          <q-btn flat dense label="Connexion" to="/connexion" />
          <q-btn flat dense label="Contact" to="/contact" />
        </div>
      </q-toolbar>
    </q-header>
    <!-- DRAWER : menu coulissant mobile ouvert ou fermé grâce à leftDrawerOpen -->
    <q-drawer v-model="leftDrawerOpen" bordered overlay class="vg-drawer">
      <q-list padding>
        <q-item clickable v-ripple to="/" @click="leftDrawerOpen = false">
          <q-item-section>Accueil</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/menu" @click="leftDrawerOpen = false">
          <q-item-section>Menu</q-item-section>
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
  </q-layout>
</template>

<script setup>
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
</style>
