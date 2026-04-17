<template>
  <q-page class="login-page">
    <div class="login-card">
      <h1 class="login-title">Connexion</h1>
      <p class="login-subtitle">Connecte-toi pour accéder à ton espace et commander.</p>

      <q-form @submit.prevent="login" class="q-gutter-md">
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
          v-model="form.password"
          label="Mot de passe"
          :type="showPassword ? 'text' : 'password'"
          outlined
          dense
          lazy-rules
          :rules="[(val) => !!val || 'Le mot de passe est obligatoire']"
        >
          <template #append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>

        <q-banner v-if="errorMessage" class="bg-red-1 text-red-9 rounded-borders">
          {{ errorMessage }}
        </q-banner>

        <div class="login-actions">
          <q-btn type="submit" label="Se connecter" class="vg-btn-primary" :loading="loading" />
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
  email: '',
  password: '',
})

async function login() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.post(`${API_URL}/login`, form.value, {
      headers: {
        Accept: 'application/json',
      },
    })

    const { user, token } = response.data
    setAuth(user, token)
    router.push('/menu')
  } catch (error) {
    if (error.response?.status === 422 && error.response?.data?.errors) {
      const errors = error.response.data.errors
      const firstError = Object.values(errors)[0]
      errorMessage.value = Array.isArray(firstError) ? firstError[0] : 'Erreur de connexion'
    } else {
      errorMessage.value = 'Impossible de se connecter'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: #f7f3e6;
}

.login-card {
  width: 100%;
  max-width: 460px;
  background: #f7f3e6;
  border: 2px solid #281514;
  border-radius: 14px;
  padding: 24px;
  color: #070300;
}

.login-title {
  margin: 0 0 8px 0;
  font-size: 1.8rem;
  font-family: 'Playfair Display', serif;
}

.login-subtitle {
  margin: 0 0 20px 0;
  font-family: 'Inter', sans-serif;
}

.login-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
}
</style>
