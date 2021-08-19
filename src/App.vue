<template>
  <v-app>
    <Menu v-if="false"/>
    <v-main>
        <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "@vue/composition-api";
import Menu from "@/components/app/Menu.vue";

export default defineComponent({
  name: "App",
  components:{
    Menu
  },
  setup() {

    onMounted(() => {
      console.log('App Montando')
    })


  }
})
</script>
