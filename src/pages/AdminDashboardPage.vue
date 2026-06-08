<template>
  <q-page class="q-pa-md">
    <h1 class="text-h5 q-mb-lg">Dashboard Administrateur</h1>

    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6 q-mb-md">Statistiques MongoDB</div>

        <div v-if="loading">Chargement des statistiques...</div>

        <q-banner v-else-if="error" class="bg-red-1 text-red-9" rounded>
          {{ error }}
        </q-banner>

        <div v-else-if="mongoStats.length === 0">Aucune statistique disponible.</div>

        <div v-else class="column q-gutter-sm">
          <div v-for="stat in mongoStats" :key="stat._id" class="q-pa-sm bg-grey-1 rounded-borders">
            <div><strong>Menu :</strong> {{ stat.menu_name }}</div>
            <div><strong>Nombre de commandes :</strong> {{ stat.orders_count }}</div>
            <div><strong>Chiffre d'affaires :</strong> {{ stat.total_revenue }} €</div>
            <div><strong>Date :</strong> {{ formatDate(stat.date) }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const mongoStats = ref([])
const loading = ref(false)
const error = ref('')

async function fetchMongoStats() {
  loading.value = true
  error.value = ''

  try {
    const token = localStorage.getItem('token')

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/menu-order-stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    mongoStats.value = response.data
  } catch (err) {
    console.error('Erreur statistiques MongoDB :', err)
    error.value = 'Impossible de charger les statistiques MongoDB.'
  } finally {
    loading.value = false
  }
}

function formatDate(value) {
  if (!value) return ''

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'short',
  }).format(new Date(value))
}

onMounted(() => {
  fetchMongoStats()
})
</script>
