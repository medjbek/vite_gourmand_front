<template>
  <q-page class="q-pa-md">
    <div class="admin-user-page">
      <h1 class="text-h5 q-mb-md">Créer un compte employé</h1>

      <q-card flat bordered class="q-pa-md" style="max-width: 600px">
        <q-form ref="formRef" @submit.prevent="createUser" class="q-gutter-md">
          <q-input
            v-model="form.first_name"
            label="Prénom"
            outlined
            dense
            :rules="[(val) => !!val || 'Le prénom est obligatoire']"
          />

          <q-input
            v-model="form.last_name"
            label="Nom"
            outlined
            dense
            :rules="[(val) => !!val || 'Le nom est obligatoire']"
          />

          <q-input
            v-model="form.email"
            label="Email"
            type="email"
            outlined
            dense
            :rules="[(val) => !!val || 'L’email est obligatoire']"
          />

          <q-input
            v-model="form.password"
            label="Mot de passe"
            type="password"
            outlined
            dense
            :rules="[(val) => !!val || 'Le mot de passe est obligatoire']"
          />

          <q-select
            v-model="form.role"
            label="Rôle"
            :options="roleOptions"
            outlined
            dense
            emit-value
            map-options
          />

          <div class="row q-gutter-sm">
            <q-btn
              label="Créer le compte"
              type="submit"
              color="primary"
              unelevated
              :loading="loading"
            />
            <q-btn label="Réinitialiser" flat color="primary" type="button" @click="handleReset" />
          </div>
        </q-form>

        <q-banner v-if="successMessage" class="bg-green-1 text-green-9 q-mt-md" rounded>
          {{ successMessage }}
        </q-banner>

        <q-banner v-if="errorMessage" class="bg-red-1 text-red-9 q-mt-md" rounded>
          {{ errorMessage }}
        </q-banner>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref, nextTick } from 'vue'
import { api } from 'boot/axios'

const formRef = ref(null)
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role: 'employee',
})

const roleOptions = [
  { label: 'Utilisateur', value: 'user' },
  { label: 'Employé', value: 'employee' },
  { label: 'Administrateur', value: 'admin' },
]

function resetForm() {
  form.first_name = ''
  form.last_name = ''
  form.email = ''
  form.password = ''
  form.role = 'employee'
}

function handleReset() {
  resetForm()
  errorMessage.value = ''
  successMessage.value = ''
  formRef.value?.resetValidation()
}
async function createUser() {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await api.post('/admin/create-user', {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password,
      role: form.role,
    })

    successMessage.value = response.data.message || 'Utilisateur créé avec succès'

    resetForm()

    await nextTick()

    formRef.value?.resetValidation()
  } catch (error) {
    console.log('ERREUR API CREATE USER :', error.response?.data)

    errorMessage.value =
      error.response?.data?.message ||
      JSON.stringify(error.response?.data?.errors) ||
      JSON.stringify(error.response?.data) ||
      'Une erreur est survenue lors de la création du compte'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-user-page {
  max-width: 900px;
}
</style>
