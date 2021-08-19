<template>
  <v-container class="pa-10">
    <v-row >
      <v-col cols="12" >
        <h1 style="text-align: center" class="">Reportes {{select}}</h1>
        <v-expansion-panels v-model="select" accordion class="elevation-0">
          <v-expansion-panel disabled>
            <v-expansion-panel-header style="border-bottom: 0px">
              <template v-slot:default="{open}">
                <v-row no-gutters>
                  <v-col cols="4" class="text--secondary">
                    PROGRAMA
                  </v-col>
                  <v-col
                      cols="8"
                      class="text--secondary"
                  >
                    <v-row
                        no-gutters
                        style="width: 100%"
                    >
                      <v-col cols="6" class="text--secondary">

                        TOTAL DE INSCRITOS
                      </v-col>
                      <v-col cols="6" class="text--secondary" style="text-align: right">
                        DETALLES
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>
          </v-expansion-panel>

          <v-expansion-panel v-for="(item,i) of data"  :key="i">
            <v-expansion-panel-header style="border-bottom: 1px solid #92C8D8">
              <template v-slot:default="{open}">
                <v-row no-gutters>
                  <v-col cols="4">
                    <strong>
                      {{ item.numero }}
                    </strong>
                  </v-col>
                  <v-col
                      cols="8"
                      class="text--secondary"
                  >
                    <v-row
                        no-gutters
                        style="width: 100%"
                    >
                      <v-col cols="6">
                        <strong>
                          {{ item.total }}
                        </strong>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </template>
              <template v-slot:actions>
                <v-icon color="primary">
                  {{ mdiChevronDown }}
                </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                  :headers="headers"
                  :items="item.students"
                  item-key="name"
                  class="elevation-0"
                  hide-default-footer
                  height="300"
              >
                <template v-slot:item="{item}">
                  <tr class="app-table mb-1 mt-1">
                    <td>
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.registeDate | shortDate }}
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import {defineComponent, onMounted, ref} from "@vue/composition-api";
import {mdiChevronDown, mdiChevronUp} from "@mdi/js";
import {studentsServices} from "@/common/service/students.services";
import {Reporte} from "@/common/Types/Reporte"; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    const select = ref(1)
    const date = null
    const trip = {
      name: '',
      location: null,
      start: null,
      end: null,
    }
    const locations = ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'];

    const data =  ref<Reporte[]>([])

    const desserts = [
      {
        username: 'Israel',
        name: 'Israel Dominguez',
      },
      {
        username: 'Israel',
        name: 'Israel Dominguez',
      },
      {
        username: 'Israel',
        name: 'Israel Dominguez',
      },
      {
        username: 'Israel',
        name: 'Israel Dominguez',
      },
      {
        username: 'Israel',
        name: 'Israel Dominguez',
      },
    ];
    const headers = [
      {text: 'ALUMNO', value: '', width: '70%'},
      {text: 'FECHA DE INSCRIPCION', value: ''},
    ]

    const getData = async () => {
       data.value = await studentsServices.getGroupBy()
    }
    onMounted(()=> {
      getData()
    })
    return {
      data,
      trip,
      date,
      locations,
      mdiChevronDown,
      mdiChevronUp,
      desserts,
      headers,
      select
    }
  }
});
</script>
<style lang="scss" scoped>
.app-table {
  background: #E8F9FE;
  border-radius: 10px;
  padding-bottom: 10px;
}

table {
  border-collapse: separate;
  border-spacing: 0 1em;
}

::v-deep {
  .v-data-table table {
    border-spacing: 0 0.5rem;
  }

  .v-data-table > .v-data-table__wrapper > table {
    width: 100%;
    -webkit-border-vertical-spacing: 10px;
  }

  .theme--light.v-expansion-panels .v-expansion-panel {
    background-color: transparent;
    color: rgba(0, 0, 0, .87);
  }

  .v-expansion-panel:before {
    border-radius: inherit;
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
    transition: box-shadow .28s cubic-bezier(.4, 0, .2, 1);
    box-shadow: none;
  }

  .v-expansion-panel-header {
    padding: 16px 13px;
  }

  .v-expansion-panel-content__wrap {
    padding: 0px;
    flex: 1 1 auto;
    max-width: 100%;
  }
}

.v-data-table > .v-data-table__wrapper > table {
  width: 100%;
  border-spacing: 10px;
}

</style>
