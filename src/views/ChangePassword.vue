<script setup lang="ts">
  import { changePasswordMe } from '../api/users'
  import { ChangePassword } from '../interfaces'
  import PageHeader from '../components/PageHeader.vue'
  import { useRouter } from 'vue-router'
  import { Ref, ref } from 'vue'
  
  const router = useRouter()
  const passwordForm: ChangePassword = {} as ChangePassword
  const confirmPassword = ref('')
  const errorMessage = ref('')
  const loading = ref(false)
  const showPassword: Ref<boolean> = ref(false)

  async function changePassword() {
    if (passwordForm.oldPassword === passwordForm.newPassword) {
      errorMessage.value = 'La contraseña nueva no puede ser igual a la anterior'
    }
    else if (passwordForm.newPassword !== confirmPassword.value) {
      errorMessage.value = 'La contraseña nueva no fue confirmada correctamente'
    }
    else {
      try {
        loading.value = true
        const changedPassword = await changePasswordMe(passwordForm)
        console.info('Changed password', changedPassword)
        router.push({ name: 'Home' })
      } catch (error) {
        errorMessage.value = 'Contraseña actual incorrecta'
      } finally {
        loading.value = false
      }
    }
}


</script>

<template>
<v-container>
    <PageHeader title="Cambiar Contraseña" />
    <v-row justify="center" class="mt-6">
      <v-col cols="6">
        <v-form ref="form">
          <v-text-field
            v-model="passwordForm.oldPassword"
            label="Contraseña Actual"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            v-model="passwordForm.newPassword"
            label="Nuevo Contraseña"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            prepend-inner-icon="mdi-lock"
            v-model="confirmPassword"
            label="Confirmar Contraseña"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
          ></v-text-field>
          
          <div v-if="errorMessage">
            <v-alert
              type="error"
              density="compact"
              variant="tonal"
              class="mb-2"
            >
              {{ errorMessage }}
            </v-alert>
          </div>

          <v-btn 
            color="teal" 
            class="mr-4" 
            @click="changePassword"
            :loading="loading"
          >
            Guardar
          </v-btn>

          <v-btn :to="{ name: 'Home' }" color="grey" class="mr-4">
            Cancelar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>