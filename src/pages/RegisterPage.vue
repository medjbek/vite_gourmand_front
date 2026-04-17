<template>
  <q-page class="register-page">
    <div class="register-card">
      <h1 class="register-title">Inscription</h1>
      <p class="register-subtitle">Crée ton compte pour pouvoir commander un menu.</p>

      <q-form @submit.prevent="register" class="q-gutter-md">
        <q-input
          v-model="form.first_name"
          label="Prénom"
          outlined
          dense
          lazy-rules
          :rules="[(val) => !!val || 'Le prénom est obligatoire']"
        />

        <q-input
          v-model="form.last_name"
          label="Nom"
          outlined
          dense
          lazy-rules
          :rules="[(val) => !!val || 'Le nom est obligatoire']"
        />

        <q-input
          v-model="form.email"
          label="Email"
          type="email"
          outlined
          dense
          lazy-rules
          :rules="[
            (val) => !!val || 'L’email est obligatoire',
            (val) => /.+@.+\..+/.test(val) || 'Format d’email invalide',
          ]"
        />

        <q-input
          v-model="form.phone"
          label="Téléphone"
          outlined
          dense
          lazy-rules
          :rules="[(val) => !!val || 'Le téléphone est obligatoire']"
        />

        <q-input
          v-model="form.address"
          label="Adresse"
          outlined
          dense
          lazy-rules
          :rules="[(val) => !!val || 'L’adresse est obligatoire']"
        />

        <q-input
          v-model="form.city"
          label="Ville"
          outlined
          dense
          lazy-rules
          :rules="[(val) => !!val || 'La ville est obligatoire']"
        />

        <q-input
          v-model="form.password"
          label="Mot de passe"
          :type="showPassword ? 'text' : 'password'"
          outlined
          dense
          lazy-rules
          :rules="[
            (val) => !!val || 'Le mot de passe est obligatoire',
            (val) => val.length >= 10 || '10 caractères minimum',
            (val) => /[A-Z]/.test(val) || 'Une majuscule est requise',
            (val) => /[a-z]/.test(val) || 'Une minuscule est requise',
            (val) => /[0-9]/.test(val) || 'Un chiffre est requis',
            (val) => /[^A-Za-z0-9]/.test(val) || 'Un caractère spécial est requis',
          ]"
        >
          <template #append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>

        <div class="register-help">
          Le mot de passe doit contenir au moins 10 caractères, avec majuscule, minuscule, chiffre
          et caractère spécial.
        </div>

        <q-banner v-if="errorMessage" class="bg-red-1 text-red-9 rounded-borders">
          {{ errorMessage }}
        </q-banner>

        <div class="register-actions">
          <q-btn type="submit" label="Créer mon compte" class="vg-btn-primary" :loading="loading" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { setAuth } from 'src/services/authState'

const router = useRouter()
const API_URL = import.meta.env.VITE_API_URL

const loading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  password: '',
})

async function register() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.post(`${API_URL}/register`, form.value, {
      headers: {
        Accept: 'application/json',
      },
    })

    const { user, token } = response.data

    setAuth(user, token)

    router.push('/connexion')
  } catch (error) {
    if (error.response?.status === 422 && error.response?.data?.errors) {
      const errors = error.response.data.errors
      const firstError = Object.values(errors)[0]
      errorMessage.value = Array.isArray(firstError) ? firstError[0] : 'Erreur de validation'
    } else {
      errorMessage.value = 'Erreur lors de la création du compte'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: #f7f3e6;
}

.register-card {
  width: 100%;
  max-width: 460px;
  background: #f7f3e6;
  border: 2px solid #281514;
  border-radius: 14px;
  padding: 24px;
  color: #070300;
}

.register-title {
  margin: 0 0 8px 0;
  font-size: 1.8rem;
  font-family: 'Playfair Display', serif;
}

.register-subtitle {
  margin: 0 0 20px 0;
  font-family: 'Inter', sans-serif;
}

.register-help {
  font-size: 0.9rem;
  color: #4e2b05;
  line-height: 1.4;
}

.register-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
}
</style>
