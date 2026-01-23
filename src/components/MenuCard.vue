<template>
  <q-card class="vg-card menu-card">
    <!-- Zone image -->
    <div class="menu-card__zone">
      <q-img
        v-if="menuImage"
        class="menu-card__img"
        :src="menuImage"
        :alt="`Photo du menu ${item.title}`"
        fit="cover"
        loading="lazy"
      />

      <div v-else class="menu-card__no-image">Image non disponible</div>
    </div>

    <!-- Contenu texte -->
    <q-card-section class="vg-card-section">
      <div class="menuTitleItem">{{ item.title }}</div>

      <div v-if="item.description" class="menuDesc q-mt-sm">
        {{ item.description }}
      </div>

      <div class="menuInfo q-mt-sm">
        min {{ item.minimum_people }} pers. • {{ item.base_price }} €
      </div>
    </q-card-section>

    <!-- Bouton -->
    <q-card-actions align="right">
      <q-btn flat class="vg-btn-secondary" label="Voir le détail" :to="`/menus/${item.id}`" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
})

const menuImage = computed(() => props.item?.images?.[0]?.url || null)
</script>

<style scoped>
.menu-card__zone {
  width: 100%;
  background: var(--vg-bg-light);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.menu-card__img {
  width: 100%;
  height: 160px;
}

.menu-card__no-image {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  opacity: 0.6;
  text-align: center;
}

.menuTitleItem {
  font-weight: 700;
}

.menuDesc {
  opacity: 0.95;
}

.menuInfo {
  font-size: 0.95rem;
  opacity: 0.85;
}
</style>
