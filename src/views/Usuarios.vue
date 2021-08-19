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
          md="12"
      >
        <Badge value="1"></Badge>
        <span class="title ml-5">Lista de usuarios</span>
        <v-data-table
            :headers="headers"
            :items="users"
            item-key="name"
            class="elevation-0"
            :height="250"
            hide-default-footer
        >
          <template v-slot:item="{item}">
            <tr>
              <td>
                {{ item.username }}
              </td>
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.email }}
              </td>
              <td>
                {{ item.rol }}
              </td>
              <td>
                <v-btn icon color="black" @click="eliminar(item)">
                  <v-icon>
                    {{ mdiDelete }}
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col
          md="12"
          cols="12"
      >
        <Badge value="2"></Badge>
        <span class="title ml-5">Nuevo Usuario</span>
        <br>
        <br>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
          <v-row dense>
            <v-col cols="6">
              <label>Usuario</label>
              <v-text-field v-model="newUser.username"
                            :rules="rules"
                            outlined dense/>
            </v-col>
            <v-col cols="6">
              <label>Nombre</label>
              <v-text-field v-model="newUser.name"
                            :rules="rules"
                            dense
                            outlined/>
            </v-col>
            <v-col cols="6">
              <label>Correo</label>
              <v-text-field v-model="newUser.email"
                            :rules="emailRules"
                            outlined dense/>
            </v-col>
            <v-col cols="6">
              <label>Contraseña</label>
              <v-text-field type="password"
                            v-model="newUser.password"
                            :rules="rules"
                            outlined dense/>
            </v-col>
            <v-col cols="6">
              <label>Rol en Plataforma</label>
              <v-select v-model="newUser.rol"
                        label=""
                        :rules="rules"
                        :items="roles"
                        outlined dense/>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col
          md="12"
      >
        <v-btn text style="float: right"
               class="primary ml-10"
               @click="guardar">Guardar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts">
import Badge from '@/components/core/Badge.vue';
import {defineComponent, onMounted, ref} from "@vue/composition-api"; // @ is an alias to /src
import {
  mdiDelete
} from '@mdi/js'
import {userServices} from "@/common/service/user.services";
import {User} from "@/common/Types/User";

export default defineComponent({
  name: 'Home',
  components: {
    Badge,
  },
  setup() {

    const newUser = ref<User>({
      id: 0,
      name: '',
      email: '',
      username: '',
      rol: '',
      password: ''
    } as User)
    const roles = ['admin', 'guest']
    const users = ref<User[]>([])
    const headers = [
      {text: 'USUARIO', value: ''},
      {text: 'NOMBRE', value: ''},
      {text: 'CORREO', value: ''},
      {text: 'ROL', value: ''},
      {text: '', value: ''},
    ]

    const valid = ref(true)
    const form = ref<any>(null)
    const snackbar = ref<boolean>(false)
    const text = ref<string>("")
    const timeout = 2000
    const rules = [
      (v: any) => !!v || 'Is required',
    ]

    const emailRules = [
      (v: any) => !!v || 'E-mail is required',
      (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]
    const getUsers = async () => {
      try {
        const data = await userServices.getUsers()
        users.value = data.data.data
      } catch (e) {

      }
    }
    onMounted(async () => {
      getUsers()
    })

    const eliminar = async (user: User) => {
     //  const confirm = ('desear eliminar este usuario')
      try {
          const data = await userServices.detele(user)
          notification('Datos Eliminados')
          const findIndex = users.value.findIndex((u: User) => u.id === user.id)
          if (findIndex > -1) {
            users.value.splice( findIndex, 1)
          }

      } catch (e) {

      }
    }

    const guardar = async () => {
      if (form.value.validate()) {
        try {
          //@ts-ignore
          delete newUser.value.id
          const data = await userServices.create(newUser.value)
          restartData()
          notification('Datos Creados')
          getUsers()

        } catch (e) {
          notification('Error')
        }
      }
    }

    const notification = (msj: string) => {
      text.value = msj
      snackbar.value = true
    }

    const restartData = () => {
      newUser.value = {
        id: 0,
        name: '',
        email: '',
        username: '',
        rol: '',
        password: ''
      }
      form.value.reset()
    }
    return {
      users,
      headers,
      mdiDelete,
      newUser,
      roles,
      valid,
      form,
      guardar,
      rules,
      snackbar,
      text,
      timeout,
      eliminar,
      emailRules
    }
  }
});
</script>
