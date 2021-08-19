<template>
  <v-container class="pa-10">

    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="primary"
    >
      {{ text }}
    </v-snackbar>

    <v-row>
      <v-col
          md="6"
          offset-md="3"
      >
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
          <h1 style="font-family: Montserrat; font-size: 48px">Configuración</h1>
          <label>Usuario</label>
          <v-text-field v-model="editUser.username" :rules="rules" outlined dense></v-text-field>
          <label>Nombre</label>
          <v-text-field v-model="editUser.name" :rules="rules" outlined dense></v-text-field>
          <label>Correo</label>
          <v-text-field v-model="editUser.email" :rules="rules" outlined dense></v-text-field>
          <label>Contraseña</label>
          <v-text-field v-model="editUser.password"
                        type="password"
                        :rules="rules" outlined dense></v-text-field>
        </v-form>
      </v-col>
      <v-col
          md="6"
          offset-md="3"
          align-self="center"
          style="text-align: center"
      >
        <v-btn text color="primary" large>Cancelar</v-btn>
        <v-btn text class="primary ml-10" large @click="guardar">Guardar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import {defineComponent, onMounted, ref} from "@vue/composition-api";
import {
  mdiClipboardCheck,
  mdiAccountCheck,
  mdiCog,
} from '@mdi/js'
import {useAuthStore} from "@/common/Hooks/useAuthStore";
import {User} from "@/common/Types/User";
import {authService} from "@/common/service/auth.services";
import {userServices} from "@/common/service/user.services";

export default defineComponent({
  name: "Configuracion",
  setup() {
    const editUser = ref<User>({
      id: 0,
      name: '',
      email: '',
      username: '',
      rol: '',
      password: ''
    } as User)
    const {user, updateUser} = useAuthStore()
    const roles = ['admin', 'guest']
    const valid = ref(true)
    const form = ref<any>(null)

    const rules = [
      (v: any) => !!v || 'Is required',
    ]

    const snackbar = ref<boolean>(false)
    const text = ref<string>("")
    const timeout = 2000

    onMounted(() => {
      editUser.value = {...user.value}
      //@ts-ignore
      delete editUser.value.createdAt
      //@ts-ignore
      delete editUser.value.deletedAt
      //@ts-ignore
      delete editUser.value.updatedAt
      //@ts-ignore
      delete editUser.value.enabled
    })

    const guardar = async () => {
      if (form.value.validate()) {
        try {
          const data = await userServices.update(editUser.value)
          updateUser(data.data)
          notification('Datos Actualizados')
        } catch (e) {
          notification('Error')
        }
      }
    }
    const notification = (msj: string) => {
      text.value = msj
      snackbar.value = true
    }
    return {
      editUser,
      roles,
      valid,
      form,
      rules,
      guardar,
      snackbar,
      text,
      timeout
    }
  }
})
</script>