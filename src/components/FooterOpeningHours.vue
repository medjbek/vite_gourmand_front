<template>
  <div class="vg-hours">
    <div class="vg-hours__title">Horaire</div>

    <div v-if="loading">Chargement…</div>
    <div v-else-if="error">Horaires indisponibles</div>

    <div v-else class="vg-hours__list">
      <div v-for="h in hours" :key="h.id" class="vg-hours__row">
        <span class="vg-hours__day">{{ h.day }}</span>
        <span class="vg-hours__time">{{ formatLine(h) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchOpeningHours } from 'src/services/openingHoursService'

const hours = ref([])
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    hours.value = await fetchOpeningHours()
  } catch (e) {
    console.error('Erreur API opening-hours :', e)
    error.value = true
  } finally {
    loading.value = false
  }
})

function toHHMM(value) {
  if (!value) return ''
  return String(value).slice(0, 5)
}

function formatLine(h) {
  if (h.is_closed) return 'Fermé'
  return `De ${toHHMM(h.opens_at)} à ${toHHMM(h.closes_at)}`
}
</script>

<style scoped>
.vg-hours {
  color: #f7f3e6;
}
.vg-hours__title {
  font-weight: 700;
  margin-bottom: 8px;
}
.vg-hours__row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 2px 0;
}
.vg-hours__time {
  opacity: 0.9;
}
</style>
