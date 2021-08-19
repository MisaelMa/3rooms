<template>
  <v-container class="pa-10">
    <v-row>
      <v-col
          md="12"
      >
        <Badge value="1"></Badge>
        <span class="title ml-5">Lista de usuarios</span>
        <v-data-table
            :headers="headers"
            :items="desserts"
            item-key="name"
            class="elevation-0"
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
                {{ item.mail }}
              </td>
              <td>
                {{ item.rol }}
              </td>
              <td>
                <v-btn icon color="black">
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
        <v-row dense>
          <v-col cols="6">
            <label>Usuario</label>
            <v-text-field outlined dense></v-text-field>
          </v-col>
          <v-col cols="6">
            <label>Nombre</label>
            <v-text-field outlined dense></v-text-field>
          </v-col>
          <v-col cols="6">
            <label>Correo</label>
            <v-text-field outlined dense></v-text-field>
          </v-col>
          <v-col cols="6">
            <label>Contraseña</label>
            <v-text-field outlined dense></v-text-field>
          </v-col>
          <v-col cols="6">
            <label>Rol en Plataforma</label>
            <v-select outlined dense></v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-col
          md="12"
      >
        <v-btn text style="float: right" class="primary ml-10">Guardar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts">
import Badge from '@/components/core/Badge.vue';
import {defineComponent} from "@vue/composition-api"; // @ is an alias to /src
import {
  mdiDelete
} from '@mdi/js'

export default defineComponent({
  name: 'Home',
  components: {
    Badge,
  },
  setup() {

    const desserts = [
      {
        username: 'Israel',
        name: 'Israel Dominguez',
        mail: 'israel@gmail.com',
        rol: 'Admin'
      },
      {
        username: 'Israel',
        name: 'Israel Dominguez',
        mail: 'israel@gmail.com',
        rol: 'Admin'
      },
      {
        username: 'Israel',
        name: 'Israel Dominguez',
        mail: 'israel@gmail.com',
        rol: 'Admin'
      },
      {
        username: 'Israel',
        name: 'Israel Dominguez',
        mail: 'israel@gmail.com',
        rol: 'Admin'
      },
      {
        username: 'Israel',
        name: 'Israel Dominguez',
        mail: 'israel@gmail.com',
        rol: 'Admin'
      },
    ];
    const headers = [
      {text: 'USUARIO', value: ''},
      {text: 'NOMBRE', value: ''},
      {text: 'CORREO', value: ''},
      {text: 'ROL', value: ''},
      {text: '', value: ''},
    ]
    return {
      desserts,
      headers,
      mdiDelete
    }
  }
});
</script>
