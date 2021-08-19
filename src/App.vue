<template>
  <v-app>
    <Menu v-if="isAuthenticated"/>
    <v-main>
        <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "@vue/composition-api";
import Menu from "@/components/app/Menu.vue";
import {useAuthStore} from "@/common/Hooks/useAuthStore";

export default defineComponent({
  name: "App",
  components:{
    Menu
  },
  setup() {
    const { isAuthenticated } = useAuthStore()
    onMounted(() => {
      console.log('App Montando')
    })

    return {
      isAuthenticated
    }

  }
})
</script>
