<template>
  <q-page class="q-pa-md">
    <div class="my-orders-page">
      <div class="q-mb-lg">
        <h1 class="text-h5 text-weight-bold q-mb-sm">Mes commandes</h1>
        <p class="text-body1 q-ma-none">
          Cette page permet de consulter l’historique de mes réservations.
        </p>
      </div>

      <div v-if="loading" class="flex flex-center q-py-xl">
        <q-spinner color="primary" size="40px" />
      </div>

      <q-banner v-else-if="error" class="bg-red-1 text-red-8 q-mb-md" rounded>
        {{ error }}
      </q-banner>

      <q-banner v-else-if="orders.length === 0" class="bg-grey-2 text-grey-8" rounded>
        Vous n’avez encore aucune commande.
      </q-banner>

      <div v-else class="column q-gutter-md">
        <q-card v-for="order in orders" :key="order.id" flat bordered>
          <q-card-section>
            <div class="row items-start justify-between q-col-gutter-md">
              <div class="col-12 col-md-8">
                <div class="text-h6 q-mb-sm">
                  {{ getMenuTitle(order) }}
                </div>

                <div class="text-body2 q-mb-xs">
                  <strong>Date :</strong> {{ formatDate(order.event_at || order.created_at) }}
                </div>

                <div class="text-body2 q-mb-xs">
                  <strong>Nombre de personnes :</strong> {{ order.guest_count ?? 'Non renseigné' }}
                </div>

                <div class="text-body2 q-mb-xs">
                  <strong>Total :</strong> {{ formatPrice(order.total_price) }}
                </div>
              </div>

              <div class="col-12 col-md-auto">
                <q-badge color="primary" outline class="text-subtitle2">
                  {{ formatStatus(order.status) }}
                </q-badge>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const orders = ref([])
const loading = ref(true)
const error = ref('')

const fetchOrders = async () => {
  loading.value = true
  error.value = ''

  try {
    const token = localStorage.getItem('token')

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    orders.value = Array.isArray(response.data) ? response.data : []
  } catch (err) {
    console.error('Erreur lors du chargement des commandes :', err)
    error.value = 'Impossible de charger vos commandes pour le moment.'
  } finally {
    loading.value = false
  }
}

const getMenuTitle = (order) => {
  return order?.menu?.title || order?.menu?.name || 'Menu non disponible'
}

const formatDate = (value) => {
  if (!value) return 'Non renseignée'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

const formatPrice = (value) => {
  if (value === null || value === undefined || value === '') {
    return 'Non renseigné'
  }

  const number = Number(value)

  if (Number.isNaN(number)) {
    return `${value} €`
  }

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(number)
}

const formatStatus = (status) => {
  if (!status) return 'Non renseigné'

  const labels = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    cancelled: 'Annulée',
    completed: 'Terminée',
  }

  return labels[status] || status
}

onMounted(() => {
  fetchOrders()
})
</script>
