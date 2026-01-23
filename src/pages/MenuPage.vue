<template>
  <q-page class="vg-page">
    <!-- SECTION PRINCIPALE (intro + carrousel) -->
    <section class="vg-section-light vg-section-border menu-principal">
      <div class="vg-container">
        <h1 class="menu-principal__title">Nos menus</h1>
        <p class="menu-principal__subtitle">
          Explorez nos menus, filtrez selon vos besoins, et en 1 clic vous accédez au détail.
        </p>

        <div class="q-mt-md">
          <q-carousel
            v-model="slide"
            animated
            infinite
            autoplay
            arrows
            navigation
            height="450px"
            class="menu-carousel"
          >
            <q-carousel-slide
              v-for="(img, index) in carouselImages"
              :key="index"
              :name="index"
              class="q-pa-none"
            >
              <q-img :src="img" fit="cover" class="menu-carousel__img" />
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
    </section>
    <!-- SECTION PRESENTATION (filtres gauche / contenu droite) -->
    <section class="vg-section-border vg-section-dark menu-presentation">
      <div class="vg-container">
        <div class="row q-col-gutter-lg items-stretch">
          <!-- Colonne gauche : FILTRES -->
          <aside class="col-12 col-md-3 col-lg-3">
            <div class="vg-card vg-card-section menu-filtersCard">
              <h2 class="filtersTitle">Filtres</h2>

              <!-- THEME -->
              <div class="menu-filter-group">
                <div class="menu-filter-title">Thème</div>
                <q-option-group
                  v-model="filters.themeId"
                  :options="themeOptions"
                  type="radio"
                  dense
                />
              </div>

              <!-- REGIME -->
              <div class="menu-filter-group">
                <div class="menu-filter-title">Régime</div>
                <q-option-group
                  v-model="filters.dietId"
                  :options="dietOptions"
                  type="radio"
                  dense
                />
              </div>

              <!-- PRIX -->
              <div class="menu-filter-group">
                <div class="menu-filter-title">Prix</div>

                <div class="row q-col-gutter-sm">
                  <div class="col-12 col-sm-6">
                    <q-input
                      v-model.number="filters.priceMin"
                      type="number"
                      dense
                      outlined
                      label="Prix min (€)"
                    />
                  </div>

                  <div class="col-12 col-sm-6">
                    <q-input
                      v-model.number="filters.priceMax"
                      type="number"
                      dense
                      outlined
                      label="Prix max (€)"
                    />
                  </div>

                  <div class="col-12">
                    <q-input
                      v-model.number="filters.minPeople"
                      type="number"
                      dense
                      outlined
                      label="Nb personnes"
                    />
                  </div>
                </div>

                <q-btn
                  class="vg-btn-secondary vg-btn-reset q-mt-md"
                  label="Réinitialiser"
                  @click="resetFilters"
                />
              </div>
            </div>
          </aside>

          <!-- Colonne droite : CONTENU -->
          <div class="col-12 col-md-9 col-lg-9 menu-rightCol">
            <q-banner v-if="error" rounded class="q-mt-md">
              {{ error }}
            </q-banner>

            <div v-if="loading" class="q-mt-md">
              <q-spinner size="32px" />
            </div>

            <template v-if="!loading && !error">
              <div class="menu-listPanel">
                <MenuSection title="Tous les menus" :items="filteredMenus" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'

import { fetchMenus } from 'src/services/menuService'
import MenuSection from 'src/components/MenuSection.vue'

const carouselImages = [
  new URL('src/assets/menu-carousel/slide-1.jpg', import.meta.url).href,
  new URL('src/assets/menu-carousel/slide-2.jpg', import.meta.url).href,
  new URL('src/assets/menu-carousel/slide-3.jpg', import.meta.url).href,
]
const slide = ref(1)
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
</script>

<style scoped>
.menu-principal__title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  line-height: 1.15;
  margin: 0 0 8px 0;
}

.menu-principal__subtitle {
  font-family: 'Inter', sans-serif;
}

.menu-carousel {
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid var(--vg-border);
  margin-bottom: 24px;
}
.menu-carousel__img {
  width: 100%;
  height: 450px;
}

.menu-presentation {
  padding-top: 24px;
  padding-bottom: 24px;
}

.filtersTitle {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  margin: 0 0 12px 0;
}

.menu-filtersCard {
  margin-bottom: 24px;
}

.menu-listPanel {
  background: var(--vg-bg-light);
  color: var(--vg-text-dark);
  border: 2px solid var(--vg-border);
  border-radius: 12px;
  padding: 42px;
}

.menu-filter-group {
  margin-bottom: 16px;
}

.menu-filter-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0px;
}

.vg-btn-reset {
  padding: 6px 14px;
  font-size: 0.85rem;
}
</style>
