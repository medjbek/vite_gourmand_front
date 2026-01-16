<template>
  <section class="vg-section-light">
    <div class="vg-container">
      <div class="q-mb-md">
        <h2 class="sectionTitle">{{ title }}</h2>
        <p v-if="subtitle" class="sectionSubtitle">{{ subtitle }}</p>
      </div>

      <div class="row q-col-gutter-md">
        <div v-for="menu in items" :key="menu.id" class="col-12 col-sm-6 col-md-4">
          <MenuCard :item="menu" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import MenuCard from 'src/components/MenuCard.vue'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  items: { type: Array, required: true },
})
</script>

<style scoped>
.sectionTitle {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  margin: 0;
}

.sectionSubtitle {
  margin: 6px 0 0 0;
  opacity: 0.9;
}
</style>
