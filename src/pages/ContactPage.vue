<template>
  <q-page class="contact-page">
    <!-- SECTION PRINCIPALE -->
    <section class="contact-page__principal q-pa-md">
      <div class="contact-page__container">
        <h1 class="contact-page__title">Contact</h1>
        <p class="contact-page__subtitle">
          Une question sur un menu, une livraison ou une demande spécifique ? Envoie-nous un
          message.
        </p>
      </div>
    </section>

    <!-- SECTION CONTENU -->
    <section class="contact-page__section q-pa-md">
      <div class="contact-page__container contact-page__grid">
        <!-- BLOC INFOS -->
        <div class="contact-page__content contact-page__infos">
          <h2 class="contact-page__h2">Nos coordonnées</h2>

          <div class="contact-page__info">
            <div class="contact-page__label">Email</div>
            <div class="contact-page__value">vite-gourmand@gmail.com</div>
          </div>

          <div class="contact-page__info">
            <div class="contact-page__label">Horaires</div>
            <div class="contact-page__value">Du lundi au dimanche • 09:00 à 23:00</div>
          </div>
        </div>

        <!-- BLOC FORMULAIRE -->
        <div class="contact-page__content contact-page__formulaire">
          <h2 class="contact-page__h2">Envoyer un message</h2>

          <q-form ref="formRef" class="q-gutter-md" @submit.prevent="submit">
            <q-input
              v-model.trim="form.name"
              label="Nom et prénom"
              outlined
              :rules="[rules.required]"
              autocomplete="name"
            />

            <q-input
              v-model.trim="form.email"
              label="Email"
              type="email"
              outlined
              :rules="[rules.required, rules.email]"
              autocomplete="email"
            />

            <q-input
              v-model.trim="form.subject"
              label="Objet"
              outlined
              :rules="[rules.required]"
              maxlength="255"
              counter
            />

            <q-input
              v-model.trim="form.message"
              label="Message"
              type="textarea"
              outlined
              :rules="[rules.required]"
              autogrow
              maxlength="2000"
              counter
            />

            <div class="row items-center q-gutter-sm">
              <q-btn
                class="contact-page__btn"
                type="submit"
                label="Envoyer"
                :loading="loading"
                :disable="loading"
              />
              <q-btn flat label="Réinitialiser" :disable="loading" @click="reset" />
            </div>

            <p class="contact-page__helper">
              Tes données sont utilisées uniquement pour traiter ta demande et te répondre.
            </p>
            <p
              v-if="feedback"
              class="contact-page__feedback"
              :class="{
                'contact-page__feedback--success': feedbackType === 'success',
                'contact-page__feedback--error': feedbackType === 'error',
                'contact-page__feedback--info': feedbackType === 'info',
              }"
            >
              {{ feedback }}
            </p>
          </q-form>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const loading = ref(false)
const feedback = ref('')
const feedbackType = ref('') // 'success' | 'error' | 'info'
const formRef = ref(null)

// Base URL de l’API (locale puis env plus tard)
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const rules = {
  required: (v) => (!!v && String(v).trim().length > 0) || 'Champ requis',
  email: (v) => {
    const value = String(v || '').trim()
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    return ok || 'Email invalide'
  },
}

function reset() {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  feedback.value = ''
  feedbackType.value = ''
}

async function submit() {
  loading.value = true

  const isValid = await formRef.value?.validate?.()
  if (!isValid) {
    feedback.value = 'Merci de compléter correctement tous les champs requis.'
    feedbackType.value = 'error'
    loading.value = false
    return
  }

  feedback.value = 'Envoi en cours…'
  feedbackType.value = 'info'

  try {
    await axios.post(`${API_BASE}/api/contact`, {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    })

    // ✅ vide les champs
    formRef.value?.reset?.()

    // ✅ enlève le rouge
    formRef.value?.resetValidation?.()

    // ✅ Message succès
    feedback.value = 'Message envoyé ✅'
    feedbackType.value = 'success'
  } catch (err) {
    const status = err?.response?.status
    const msg =
      err?.response?.data?.message ||
      (status ? `Erreur API (status ${status})` : 'Erreur réseau ou serveur indisponible')

    feedback.value = msg
    feedbackType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Page */
.contact-page {
  background: #f7f3e6;
  color: #070300;
}

/* Container */
.contact-page__container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

/* Section principale */
.contact-page__principal {
  background: #070300;
  color: #f7f3e6;
}

.contact-page__title {
  font-family: 'Playfair Display', serif;
  font-size: 38px;
  line-height: 1.1;
  margin: 0 0 12px 0;
}

.contact-page__subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  margin: 0;
  max-width: 760px;
  opacity: 0.9;
}

/* Section */
.contact-page__section {
  background: #f7f3e6;
}

/* Grid */
.contact-page__grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 16px;
}

/* Content */
.contact-page__content {
  background: #ffffff;
  border: 2px solid #070300;
  border-radius: 12px;
  padding: 16px;
}

/* Titres */
.contact-page__h2 {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  margin: 0 0 10px 0;
}

/* Infos */
.contact-page__info {
  margin-top: 12px;
}

.contact-page__label {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  opacity: 0.7;
}

.contact-page__value {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
}

/* Bouton */
.contact-page__btn {
  background: #281504;
  color: #f7f3e6;
  border-radius: 10px;
  padding: 0 18px;
}

/* Texte d’aide */
.contact-page__helper {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  opacity: 0.8;
  margin: 6px 0 0 0;
}

/* Mobile */
@media (max-width: 599px) {
  .contact-page__grid {
    grid-template-columns: 1fr;
  }

  .contact-page__title {
    font-size: 32px;
  }

  .contact-page__h2 {
    font-size: 22px;
  }

  .contact-page__subtitle {
    font-size: 16px;
  }
}

.contact-page__feedback {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  margin: 10px 0 0 0;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #070300;
}

.contact-page__feedback--success {
  background: #eaf7ea;
}

.contact-page__feedback--error {
  background: #fdeaea;
}

.contact-page__feedback--info {
  background: #eef3ff;
}
</style>
