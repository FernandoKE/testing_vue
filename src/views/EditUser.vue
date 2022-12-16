<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import PageHeader from '@/components/PageHeader.vue'
  import { computed, reactive, Ref, ref } from 'vue'
  import { useTokenStore } from '../stores/token'
  import { getGroups, getUsers, getUserMe, userEdit } from '@/api/users'
  import { Group, User, User as ModifyUser } from '@/interfaces'

  const route = useRoute()


  const newUserData: userEdit = reactive({
    username: '',
    fullname: '',
    age: null,
    groupIds: [],
  })
  const groups: Ref<Group[]> = ref([])
  const users: Ref<User[]> = ref([])
  const user: Ref<User> = ref({} as User)
  let userModify: Ref<userEdit> = ref({} as ModifyUser)
  const tokenStore = useTokenStore()
  const userToken = computed(() => tokenStore.user)

  const showPassword: Ref<boolean> = ref(false)

  const form: Ref<any> = ref(null)
  const valid: Ref<boolean> = ref(false)
  const errorMessage = ref('')
  const rules = {
    user: [(v: string) => !!v || 'El usuario es requerido'],
    fullname: [(v: string) => !!v || 'El nombre es requerido'],
    password: [(v: string) => !!v || 'La contraseña es requerida'],
  }

  async function fetchUsers() {
    users.value = await getUsers()
  }

  async function fetchGroups() {
    groups.value = await getGroups()
  }

  async function fetchUser() {
    const { id } = route.params.id
    user.value = await getUserMe(id)
    newUserData.username = user.username
    newUserData.fullname = user.fullname
    newUserData.age = user.age
    newUserData.groupIds = user.groupIds
  }

  async function editUser() {
    const { valid } = await form.value.validate()

    
  }

  fetchGroups()
  fetchUsers()
  fetchUser()
</script>

<template>
  <v-container>
    <PageHeader title="Editar Usuario" />
    <v-row justify="center" class="mt-6">
      <v-col cols="6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="newUserData.username"
            label="Usuario"
            :rules="rules.user"
          ></v-text-field>
          <v-text-field
            v-model="newUserData.fullname"
            label="Nombre"
            :rules="rules.fullname"
          ></v-text-field>
          <v-text-field
            v-model="newUserData.age"
            label="Edad"
            type="number"
          ></v-text-field>
          <v-select
            v-model="newUserData.groupIds"
            :items="groups"
            item-title="name"
            item-value="id"
            multiple
            chips
            label="Grupos"
          >
          </v-select>

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

          <v-btn color="teal" class="mr-4" @click="editUser">
            Guardar
          </v-btn>

          <v-btn :to="{ name: 'ListUsers' }" color="grey" class="mr-4">
            Cancelar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
