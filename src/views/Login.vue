<template>
  <v-row>
    <v-col cols="6">
      <v-container fill-height>

        <v-row align="center"
               justify="center">
          <v-col cols="12" sm="10">
            <img alt="tu colegio"
                 width="240"
                 height="50"
                 src="../assets/login.svg">
            <div>
              Inicia sesión
            </div>
          </v-col>
          <v-col cols="12" sm="10">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
              <label>Usuario</label>
              <v-text-field
                  v-model="name"
                  outlined
                  dense
                  :rules="nameRules"
                  required
              ></v-text-field>

              <div style="display: flex">
                <label>Contraseña</label>
                <v-spacer></v-spacer>
                <v-icon @click="view=!view">{{ !view ? mdiEye : mdiEyeOff }}</v-icon>
              </div>
              <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  outlined
                  dense
                  required
              ></v-text-field>

              <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
              >
                Validate
              </v-btn>

              <v-btn
                  color="error"
                  class="mr-4"
                  @click="reset"
              >
                Reset Form
              </v-btn>

              <v-btn
                  color="warning"
                  @click="resetValidation"
              >
                Reset Validation
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-col cols="6" class="primary" style="height: 100vh">
      <v-container fill-height fluid>
        <v-row align="center"
               justify="center">
          <v-col cols="12">
            <img class="ml-16" height="450" src="../assets/login-img.svg" alt="">
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import {defineComponent, ref} from "@vue/composition-api";
import {mdiEye, mdiEyeOff} from "@mdi/js"; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {

    const valid = ref(true)
    const view = ref(false)
    const name = ref('')
    const nameRules = [
      (v: any) => !!v || 'Name is required',
      (v: any) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ]

    const email = ref('')
    const emailRules = [
      (v: any) => !!v || 'E-mail is required',
      (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]
    const form = ref<any>(null)

    const validate = () => {
      form.value.validate()
    }
    const reset = () => {
      form.value.reset()
    }
    const resetValidation = () => {
      form.value.resetValidation()
    }

    return {
      valid,
      name,
      nameRules,
      emailRules,
      email,
      form,
      reset,
      resetValidation,
      validate,
      view,
      mdiEye,
      mdiEyeOff
    }
  }
});
</script>
