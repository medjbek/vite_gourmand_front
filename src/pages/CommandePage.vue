<template>
  <q-page class="vg-page">
    <div class="vg-container q-py-lg">
      <section class="vg-section-light vg-section-border commande-page">
        <div class="commande-wrapper">
          <h1 class="commande-title">Commande</h1>

          <q-banner v-if="error" rounded class="q-mb-md bg-red-1 text-red-9">
            {{ error }}
          </q-banner>

          <div v-if="loading" class="q-py-xl flex flex-center">
            <q-spinner size="40px" />
          </div>

          <template v-else-if="menu">
            <div class="row q-col-gutter-lg">
              <!-- COLONNE GAUCHE -->
              <div class="col-12 col-md-5">
                <q-card class="vg-card">
                  <q-card-section class="vg-card-section">
                    <div class="text-h6 q-mb-md">Résumé du menu</div>

                    <p><strong>Titre :</strong> {{ menu.title }}</p>
                    <p><strong>Minimum de personnes :</strong> {{ menu.minimum_people }}</p>
                    <p><strong>Prix unitaire :</strong> {{ menu.base_price }} €</p>

                    <div v-if="menu.conditions" class="q-mt-md">
                      <strong>Conditions :</strong>
                      <p>{{ menu.conditions }}</p>
                    </div>
                  </q-card-section>
                </q-card>

                <q-card class="vg-card q-mt-lg">
                  <q-card-section class="vg-card-section">
                    <div class="text-h6 q-mb-md">Total</div>

                    <p>Prix menu : {{ menuTotal.toFixed(2) }} €</p>
                    <p>Livraison : {{ deliveryFee.toFixed(2) }} €</p>
                    <p v-if="discount > 0">Réduction : -{{ discount.toFixed(2) }} €</p>

                    <q-separator class="q-my-md" />

                    <p>
                      <strong>Total final : {{ finalTotal.toFixed(2) }} €</strong>
                    </p>
                  </q-card-section>
                </q-card>
              </div>

              <!-- COLONNE DROITE -->
              <div class="col-12 col-md-7">
                <q-card class="vg-card">
                  <q-card-section class="vg-card-section">
                    <div class="text-h6 q-mb-md">Informations client</div>

                    <!-- ⚠️ FORM SANS SUBMIT -->
                    <q-form class="q-gutter-md">
                      <div class="row q-col-gutter-md">
                        <div class="col-12 col-sm-6">
                          <q-input v-model="form.first_name" label="Prénom" outlined dense />
                        </div>

                        <div class="col-12 col-sm-6">
                          <q-input v-model="form.last_name" label="Nom" outlined dense />
                        </div>

                        <div class="col-12 col-sm-6">
                          <q-input v-model="form.email" label="Email" type="email" outlined dense />
                        </div>

                        <div class="col-12 col-sm-6">
                          <q-input v-model="form.phone" label="Téléphone" outlined dense />
                        </div>

                        <div class="col-12">
                          <q-input v-model="form.address" label="Adresse" outlined dense />
                        </div>

                        <div class="col-12 col-sm-6">
                          <q-input v-model="form.city" label="Ville" outlined dense />
                        </div>

                        <div class="col-12 col-sm-3">
                          <q-input
                            v-model="form.date"
                            label="Date de livraison"
                            mask="##/##/####"
                            outlined
                            dense
                            stack-label
                          />
                        </div>

                        <div class="col-12 col-sm-3">
                          <q-input
                            v-model="form.time"
                            label="Heure de livraison"
                            type="time"
                            outlined
                            dense
                            stack-label
                          />
                        </div>

                        <div class="col-12 col-sm-6">
                          <q-input
                            v-model.number="form.people_count"
                            label="Nombre de personnes"
                            type="number"
                            outlined
                            dense
                            min="1"
                          />
                        </div>
                      </div>

                      <q-banner v-if="peopleError" rounded class="bg-red-1 text-red-9">
                        {{ peopleError }}
                      </q-banner>

                      <div class="row justify-end">
                        <!-- ⚠️ BOUTON CLICK (pas submit) -->
                        <q-btn
                          label="Valider la commande"
                          type="button"
                          class="vg-btn-primary"
                          @click="submitOrder"
                          :loading="submitting"
                          :disable="submitting"
                        />
                      </div>
                    </q-form>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </template>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { user, token } from 'src/services/authState'
import { useQuasar } from 'quasar'

const route = useRoute()
const $q = useQuasar()

const loading = ref(true)
const error = ref('')
const menu = ref(null)
const submitting = ref(false)

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  date: '',
  time: '',
  people_count: 1,
})

async function loadMenu() {
  loading.value = true
  error.value = ''

  try {
    const API_URL = import.meta.env.VITE_API_URL
    const response = await fetch(`${API_URL}/menus/${route.params.id}`)

    if (!response.ok) {
      throw new Error('Impossible de charger le menu.')
    }

    const data = await response.json()
    menu.value = data.data ? data.data : data

    form.value.people_count = Number(menu.value.minimum_people) || 1
  } catch (err) {
    error.value = err.message || 'Une erreur est survenue.'
  } finally {
    loading.value = false
  }
}

function prefillUser() {
  if (!user.value) return

  form.value.first_name = user.value.first_name || ''
  form.value.last_name = user.value.last_name || ''
  form.value.email = user.value.email || ''
  form.value.phone = user.value.phone || ''
  form.value.address = user.value.address || ''
  form.value.city = user.value.city || ''
}

function convertDateToMysql(dateFr) {
  const parts = (dateFr || '').split('/')
  if (parts.length !== 3) return ''

  return `${parts[2]}-${parts[1]}-${parts[0]}`
}

const peopleError = computed(() => {
  if (!menu.value) return ''
  if (Number(form.value.people_count) < Number(menu.value.minimum_people)) {
    return `Le minimum pour ce menu est de ${menu.value.minimum_people} personnes.`
  }
  return ''
})

const subtotal = computed(() => {
  if (!menu.value) return 0
  return Number(menu.value.base_price) * Number(form.value.people_count || 0)
})

const discount = computed(() => {
  if (!menu.value) return 0
  if (form.value.people_count >= menu.value.minimum_people + 5) {
    return subtotal.value * 0.1
  }
  return 0
})

const menuTotal = computed(() => subtotal.value - discount.value)

const deliveryFee = computed(() => {
  const address = (form.value.address || '').toLowerCase()
  return address.includes('bordeaux') ? 0 : 5
})

const finalTotal = computed(() => menuTotal.value + deliveryFee.value)

async function submitOrder() {
  if (submitting.value) return

  if (peopleError.value) {
    return $q.notify({ type: 'negative', message: peopleError.value })
  }

  const mysqlDate = convertDateToMysql(form.value.date)

  if (!mysqlDate || !form.value.time) {
    return $q.notify({ type: 'negative', message: 'Date ou heure invalide.' })
  }

  if (!token.value) {
    return $q.notify({ type: 'negative', message: 'Connexion requise.' })
  }

  submitting.value = true

  try {
    const API_URL = import.meta.env.VITE_API_URL

    const payload = {
      menu_id: Number(menu.value.id),
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      email: form.value.email,
      phone: form.value.phone,
      address: form.value.address,
      city: form.value.city,
      event_at: `${mysqlDate} ${form.value.time}:00`,
      location: `${form.value.address}, ${form.value.city}`,
      guest_count: Number(form.value.people_count),
      km: 0,
    }

    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erreur commande')
    }

    $q.notify({
      type: 'positive',
      message: 'Commande enregistrée avec succès',
    })
  } catch (err) {
    $q.notify({
      type: 'negative',
      message: err.message,
    })
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  prefillUser()
  loadMenu()
})
</script>

<style scoped>
.commande-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px;
}

.commande-title {
  margin: 0 0 24px;
  font-size: 2rem;
}
</style>
