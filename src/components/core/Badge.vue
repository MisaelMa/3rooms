<template>
 <span class="v-badge theme--light mr-5">
        <span class="v-badge__wrapper">
        <span aria-atomic="true" aria-label="Placa"
              aria-live="polite" role="status"
              class="v-badge__badge primary"
              style="inset: auto auto calc(100% - 8px) calc(100% - 4px); font-size: 20px; border-radius:50%; width: 30px; height: 30px">
          {{value}}
        </span>
      </span>
      </span>
</template>
<script lang="ts">
import {defineComponent} from "@vue/composition-api"; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  props:{
    value: {
    }
  },
  setup() {
    return {

    }
  }
})
</script>