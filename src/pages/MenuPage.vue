<template>
  <q-page class="vg-page">
    <!-- SECTION PRINCIPALE -->
    <section class="vg-section-light vg-section-border">
      <div class="vg-container">
        <h1 class="menu-title">Nos menus</h1>
        <p class="menu-subtitle">Liste globale des menus.</p>
      </div>
    </section>

    <!-- SECTION FILTRES -->
    <section class="vg-section vg-section-border">
      <div class="vg-container">
        <h2 class="filtersTitle">Filtres (prévu VG-17)</h2>
        <div class="row q-col-gutter-md q-mt-sm items-center">
          <!-- THEMES  -->
          <q-option-group
            v-model="filters.themeId"
            :options="themeOptions"
            type="radio"
            inline
            dense
          />

          <!-- REGIMES -->
          <q-option-group
            v-model="filters.dietId"
            :options="dietOptions"
            type="radio"
            inline
            dense
          />

          <!-- PRIX FOURCHETTE ET MAX-->
          <q-input
            v-model.number="filters.priceMin"
            type="number"
            dense
            outlined
            label="Prix min (€)"
            style="max-width: 160px"
          />

          <q-input
            v-model.number="filters.priceMax"
            type="number"
            dense
            outlined
            label="Prix max (€)"
            style="max-width: 160px"
          />

          <q-input
            v-model.number="filters.minPeople"
            type="number"
            dense
            outlined
            label="Nb personnes"
            style="max-width: 160px"
          />

          <q-btn outline label="Réinitialiser" @click="resetFilters" />
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
          <div class="text-subtitle1 q-mb-md">Menus affichés : {{ filteredMenus.length }}</div>
        </div>
      </div>

      <!-- Sections affichage Menus-->
      <template v-if="!loading && !error">
        <MenuSection title="Tous les menus" :items="filteredMenus" />
      </template>
    </section>
  </q-page>
</template>

<script setup>
import { onMounted, onActivated, ref, computed } from 'vue'

import { fetchMenus } from 'src/services/menuService'
import MenuSection from 'src/components/MenuSection.vue'

const loading = ref(false)
const error = ref('')
const listMenu = ref([])

const filters = ref({
  themeId: null,
  dietId: null,
  priceMin: null,
  priceMax: null,
  minPeople: null,
})

const themeOptions = [
  { label: 'Noël', value: 1 },
  { label: 'Pâques', value: 2 },
  { label: 'Classique', value: 3 },
  { label: 'Évènement', value: 4 },
]

const dietOptions = [
  { label: 'Végétarien', value: 1 },
  { label: 'Vegan', value: 2 },
  { label: 'Classique', value: 3 },
  { label: 'Sans gluten', value: 4 },
  { label: 'Sans lactose', value: 5 },
]

function resetFilters() {
  filters.value = {
    themeId: null,
    dietId: null,
    priceMin: null,
    priceMax: null,
    minPeople: null,
  }
}

const filteredMenus = computed(() => {
  const f = filters.value

  // si  min > max "aucun résultat"
  if (f.priceMin != null && f.priceMax != null && Number(f.priceMin) > Number(f.priceMax)) {
    return []
  }

  return listMenu.value.filter((menu) => {
    // Thème exclusif
    if (f.themeId != null && Number(menu.theme?.id) !== Number(f.themeId)) return false

    // Régime exclusif
    if (f.dietId != null) {
      const diets = Array.isArray(menu.diets) ? menu.diets : []
      const hasDiet = diets.some((d) => Number(d.id) === Number(f.dietId))
      if (!hasDiet) return false
    }

    // Prix
    if (f.priceMax != null && Number(menu.base_price) > Number(f.priceMax)) return false
    if (f.priceMin != null && Number(menu.base_price) < Number(f.priceMin)) return false

    // Personnes NBRE
    if (f.minPeople != null && Number(menu.minimum_people) > Number(f.minPeople)) return false

    return true
  })
})
async function loadMenus() {
  loading.value = true
  error.value = ''

  try {
    listMenu.value = await fetchMenus()
  } catch {
    error.value = 'Impossible de charger les menus depuis l’API'
    listMenu.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadMenus)
onActivated(loadMenus)
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
