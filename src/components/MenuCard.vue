<template>
  <q-card class="vg-card">
    <q-card-section class="vg-card-section">
      <!-- Titre -->
      <div class="menuTitleItem">{{ item.title }}</div>

      <!-- Description -->
      <div v-if="item.description" class="menuDesc q-mt-sm">
        {{ item.description }}
      </div>

      <!-- Min personnes + Prix -->
      <div class="menuInfo q-mt-sm">
        min {{ item.minimum_people }} pers. • {{ item.base_price }} €
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <!-- 4) Bouton -->
      <q-btn flat class="vg-btn-secondary" label="Voir le détail" :to="`/menus/${item.id}`" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true },
})
</script>

<style scoped>
.menuTitleItem {
  font-weight: 700;
}

.menuInfo {
  font-size: 0.95rem;
  opacity: 0.85;
}

.menuDesc {
  opacity: 0.95;
}
</style>
