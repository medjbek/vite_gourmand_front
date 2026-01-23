<template>
  <div class="menuSection">
    <div class="row q-col-gutter-md menu-grid">
      <div v-for="menu in items" :key="menu.id" class="col-12 col-sm-6 col-md-4 menu-col">
        <MenuCard class="menu-card" :item="menu" />
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuCard from 'src/components/MenuCard.vue'

defineProps({
  items: { type: Array, required: true },
})
</script>

<style scoped>
.menuSection {
  width: 100%;
}

.menu-grid {
  padding-top: 16px;
  padding-bottom: 16px;
}

/* la colonne devient un conteneur flex */
.menu-col {
  display: flex;
}

/* on étire la carte (via la class posée sur MenuCard) */
.menu-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
