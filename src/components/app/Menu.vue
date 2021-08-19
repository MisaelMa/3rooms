<template>
  <v-navigation-drawer v-model="drawer"
                       color="#263238"
                       dark
                       app clipped>
    <div class="ma-8 ml-1">
      <img alt="tu colegio"
           width="240"
           height="50"
           @click="logoutUser"
           src="../../assets/logo.svg">
    </div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>
          Hola
        </v-list-item-subtitle>
        <v-list-item-title class="text-h6">
          {{ user.name }}
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
            v-for="item in filterRuta"
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
import {computed, defineComponent, onMounted, ref} from "@vue/composition-api";
import {
  mdiClipboardCheck,
  mdiAccountCheck,
  mdiCog,
} from '@mdi/js'
import {useAuthStore} from "@/common/Hooks/useAuthStore";

export default defineComponent({
  name: "Menu",
  setup(props,{root}) {
    const selected = ref(0);
    const items = ref([
      {
        title: 'Reportes',
        icon: mdiClipboardCheck,
        path: '/reportes',
        permisos: ['admin', 'guest']
      },
      {
        title: 'Usuarios',
        icon: mdiAccountCheck,
        path: '/usuarios',
        permisos: ['admin']
      },
      {
        title: 'Configuración',
        icon: mdiCog,
        path: '/configuracion',
        permisos: ['admin', 'guest']
      },
    ])
    const {user, getRol, logout} = useAuthStore()
    const filterRuta = computed(()=>{
      const rutas = []
      for (const item of items.value){
        console.log(item.permisos.includes(getRol.value))
        if (item.permisos.includes(getRol.value)){
          rutas.push(item)
        }
      }
      return rutas
    })
    const logoutUser = ()=> {
      logout()
      root.$router.push('/login');
    }
    const drawer = ref(true)
    return {
      items,
      drawer,
      selected,
      user,
      filterRuta,
      logoutUser
    }
  }
})

</script>

<style scoped>
.blanco {
  background-color: white !important;
}
</style>