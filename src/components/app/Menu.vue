<template>
  <v-navigation-drawer v-model="drawer"
                       color="#263238"
                       dark
                       app clipped>
    <div class="ma-8 ml-1">
      <img alt="tu colegio"
           width="240"
           height="50"
           src="../../assets/logo.svg">
    </div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>
          Hola
        </v-list-item-subtitle>
        <v-list-item-title class="text-h6">
          Israel Domínguez
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list
        dense
        nav
    >
      <v-list-item-group
          v-model="selected"
          active-class="blanco"
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.path"
        >
          <template v-slot:default="{ active }">
            <v-list-item-icon>
              <v-icon :color="active ? 'black ': 'white '">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title :class="active ? 'black--text subtitle-1': 'white--text subtitle-1'">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "@vue/composition-api";
import {
  mdiClipboardCheck,
  mdiAccountCheck,
  mdiCog,
} from '@mdi/js'

export default defineComponent({
  name: "Menu",
  setup() {
    const selected = ref(0);
    const items = ref([
      {title: 'Reportes', icon: mdiClipboardCheck, path: '/reportes'},
      {title: 'Usuarios', icon: mdiAccountCheck, path: '/usuarios'},
      {title: 'Configuración', icon: mdiCog, path: '/configuracion'},
    ])
    const drawer = ref(true)

    return {
      items,
      drawer,
      selected
    }
  }
})

</script>

<style scoped>
.blanco {
  background-color: white !important;
}
</style>