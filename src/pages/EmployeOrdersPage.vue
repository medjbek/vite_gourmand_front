<template>
  <q-page class="q-pa-md">
    <h1 class="text-h5 q-mb-md">Espace employé</h1>

    <div v-if="loading" class="q-mb-md">Chargement des commandes...</div>

    <div v-else-if="error" class="text-negative q-mb-md">
      {{ error }}
    </div>

    <div v-else-if="orders.length === 0" class="q-mb-md">Aucune commande à afficher.</div>

    <div v-else class="column q-gutter-md">
      <q-card v-for="order in orders" :key="order.id" flat bordered>
        <q-card-section>
          <div>
            <strong>Menu :</strong>
            {{ order.menu?.title || order.menu?.name || 'Menu non disponible' }}
          </div>
          <div>
            <strong>Date :</strong>
            {{
              new Date(order.event_at || order.created_at).toLocaleString('fr-FR', {
                timeZone: 'UTC',
              })
            }}
          </div>
          <div><strong>Nombre de personnes :</strong> {{ order.guest_count }}</div>
          <div><strong>Total :</strong> {{ order.total_price }} €</div>
          <div><strong>Statut :</strong> {{ formatStatus(order.status) }}</div>

          <div class="q-mt-md row q-gutter-sm">
            <q-btn size="sm" label="Acceptée" @click="updateStatus(order.id, 'accepted')" />
            <q-btn size="sm" label="En préparation" @click="updateStatus(order.id, 'preparing')" />
            <q-btn size="sm" label="En livraison" @click="updateStatus(order.id, 'delivering')" />
            <q-btn size="sm" label="Livrée" @click="updateStatus(order.id, 'delivered')" />
            <q-btn size="sm" label="Terminée" @click="updateStatus(order.id, 'completed')" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const orders = ref([])
const loading = ref(true)
const error = ref('')

async function fetchOrders() {
  loading.value = true
  error.value = ''

  try {
    const token = localStorage.getItem('token')

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    orders.value = response.data
  } catch (err) {
    error.value = 'Impossible de charger les commandes.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

async function updateStatus(orderId, status) {
  try {
    const token = localStorage.getItem('token')

    await axios.patch(
      `${import.meta.env.VITE_API_URL}/orders/${orderId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    )

    await fetchOrders()
  } catch (err) {
    error.value = 'Impossible de mettre à jour le statut.'
    console.error(err)
  }
}

function formatStatus(status) {
  const labels = {
    pending: 'En attente',
    accepted: 'Acceptée',
    preparing: 'En préparation',
    delivering: 'En cours de livraison',
    delivered: 'Livrée',
    completed: 'Terminée',
  }

  return labels[status] || status
}

onMounted(() => {
  fetchOrders()
})
</script>
