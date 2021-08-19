<template>
  <v-row>
    <v-col cols="6">
      <v-container fill-height>

        <v-row align="center"
               justify="center">
          <v-col cols="12" sm="8">
            <img alt="tu colegio"
                 width="240"
                 height="50"
                 style="margin-left: -43px"
                 src="../assets/login.svg">
            <h2>
              Inicia sesión
            </h2>
          </v-col>
          <v-col cols="12" sm="8">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
              <label>Usuario</label>
              <v-text-field
                  v-model="email"
                  outlined
                  dense
                  :rules="emailRules"
                  required
              ></v-text-field>

              <div style="display: flex">
                <label>Contraseña</label>
                <v-spacer></v-spacer>
                <v-icon @click="view=!view">{{ !view ? mdiEye : mdiEyeOff }}</v-icon>
              </div>
              <v-text-field
                  v-model="password"
                  :rules="nameRules"
                  :type="!view ? 'password' : 'text'"
                  outlined
                  dense
                  required
              ></v-text-field>
              <v-btn
                  block
                  color="warning"
                  @click="validate"
              >
                Iniciar sesión
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
import {mdiEye, mdiEyeOff} from "@mdi/js";
import {useAuthStore} from "@/common/Hooks/useAuthStore";
import {authService} from "@/common/service/auth.services"; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup(props,{root}) {

    const valid = ref(true)
    const view = ref(false)
    const password = ref('')
    const nameRules = [
      (v: any) => !!v || 'Password is required',
    ]

    const email = ref('')
    const emailRules = [
      (v: any) => !!v || 'E-mail is required',
      (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]
    const form = ref<any>(null)
    const { isAuthenticated, setAuth } = useAuthStore()
    const validate = async () => {
      if (form.value.validate()) {
        try {
          const data = await authService.login({
            email: email.value,
            password: password.value
          })
          setAuth(data.data)
          root.$router.push('/');
        } catch (e) {

        }
      }
    }
    const reset = () => {
      form.value.reset()
    }
    const resetValidation = () => {
      form.value.resetValidation()
    }

    return {
      valid,
      password,
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
