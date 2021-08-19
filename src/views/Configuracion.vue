<template>
  <v-container class="pa-10">
    <v-row>
      <v-col
          md="6"
          offset-md="3"
      >
        <h1 style="font-family: Montserrat; font-size: 48px">Configuración</h1>
        <label>Usuario</label>
        <v-text-field outlined dense></v-text-field>
        <label>Nombre</label>
        <v-text-field outlined dense></v-text-field>
        <label>Correo</label>
        <v-text-field outlined dense></v-text-field>
        <label>Contraseña</label>
        <v-text-field outlined dense></v-text-field>
      </v-col>
      <v-col
          md="6"
          offset-md="3"
          align-self="center"
          style="text-align: center"
      >
        <v-btn text color="primary" large>Cancelar</v-btn>
        <v-btn text class="primary ml-10" large>Guardar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
