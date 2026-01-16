<template>
  <q-page class="vg-page">
    <!-- SECTION PRINCIPALE -->
    <section class="vg-section-light vg-section-border">
      <div class="vg-container">
        <h1 class="menu-title">Nos menus</h1>
        <p class="menu-subtitle">Liste globale des menus.</p>
      </div>
    </section>

    <!-- SECTION FILTRES statique à ce stade: (Prévu VG-17) -->
    <section class="vg-section vg-section-border">
      <div class="vg-container">
        <h2 class="filtersTitle">Filtres (prévu VG-17)</h2>

        <div class="row q-col-gutter-sm q-mt-sm">
          <q-chip outline>Thème</q-chip>
          <q-chip outline>Régime</q-chip>
          <q-chip outline>Prix maximum</q-chip>
          <q-chip outline>Fourchette de prix</q-chip>
          <q-chip outline>Nombre minimum de personnes</q-chip>
        </div>
      </div>
    </section>
    <!-- SECTION CONTENU -->
    <section class="vg-section">
      <div class="vg-container">
        <q-banner v-if="error" rounded class="q-mt-md">
          {{ error }}
        </q-banner>

        <div v-if="loading" class="q-mt-md">
          <q-spinner size="32px" />
        </div>

        <div v-if="!loading && !error" class="q-mt-md">
          <div class="text-subtitle1 q-mb-md">Menus récupérés : {{ listMenu.length }}</div>
        </div>
      </div>

      <!-- Sections affichage Menus-->
      <template v-if="!loading && !error">
        <MenuSection title="Tous les menus" :items="listMenu" />
      </template>
    </section>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { fetchMenus } from 'src/services/menuService'
import MenuSection from 'src/components/MenuSection.vue'

const loading = ref(false)
const error = ref('')
const listMenu = ref([])

onMounted(async () => {
  loading.value = true
  error.value = ''

  try {
    const payload = await fetchMenus()

    listMenu.value = Array.isArray(payload.data) ? payload.data : []
  } catch {
    error.value = 'Impossible de charger les menus depuis l’API'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* TITRE PRINCIPAL */
.menu-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  line-height: 1.15;
  margin: 0 0 8px 0;
}

/* SOUS-TITRE */
.menu-subtitle {
  margin: 0;
  font-family: 'Inter', sans-serif;
}

/* TITRE SECTION FILTRES */
.filtersTitle {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  margin: 0;
}
</style>
