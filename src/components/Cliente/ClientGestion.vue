<template>
  <div>
    <ClientModEditar ref="clientModEditar" />
    <div class="table-container">
      <q-table
        :rows="datosFiltrados"
        :columns="columns"
        row-key="clienteId"
        :rows-per-page-options="[10, 50, 100]"
        class="scroll-table"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="columna in columns" :key="columna.field" align="left">
              <template v-if="columna.field !== 'acciones'">
                {{ celda(props.row, columna) }}
              </template>
              <template v-else>
                <q-btn
                  @click="editarFila(props.row)"
                  icon="edit"
                  flat
                  color="primary"
                />
                <q-btn
                  @click="eliminarFila(props.row)"
                  icon="delete"
                  flat
                  color="negative"
                />
              </template>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="busqueda"
            placeholder="Busqueda"
          >
            <template v-slot:append>
              <q-icon name="search"></q-icon>
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  position: relative;
  overflow: hidden;
}

.scroll-table {
  max-height: 400px; /* ajusta la altura máxima según tus necesidades */
  overflow-y: auto;
}

/* Fijar los títulos de la tabla */
.q-table .q-table__top,
.q-table .q-th {
  position: sticky;
  top: 0;
  background-color: #fff; /* ajusta el color de fondo según tu diseño */
  z-index: 1;
}

/* Fijar el buscador a la derecha */
.q-table .q-field--dense {
  position: sticky;
  top: 0;
  right: 0;
  background-color: #fff; /* ajusta el color de fondo según tu diseño */
  z-index: 1;
}
</style>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import ClientModEditar from "src/components/Cliente/ClientModEditar.vue";

export default {
  components: {
    ClientModEditar,
  },

  data() {
    return {
      datos: [],
      busqueda: "",
      columns: [
        {
          name: "clienteId",
          align: "center",
          label: "ID",
          field: "clienteId",
          sortable: true,
        },
        {
          name: "nombre",
          align: "center",
          label: "Nombre",
          field: "nombre",
          sortable: true,
        },
        {
          name: "apellido",
          align: "center",
          label: "Apellido",
          field: "apellido",
          sortable: true,
        },
        {
          name: "correoElectronico",
          align: "center",
          label: "Correo",
          field: "correoElectronico",
          sortable: true,
        },
        {
          name: "telefono",
          align: "center",
          label: "Teléfono",
          field: "telefono",
          sortable: true,
        },
        {
          name: "direccion",
          align: "center",
          label: "Dirección",
          field: "direccion",
          sortable: true,
        },
        {
          name: "dni",
          align: "left",
          label: "DNI",
          field: "dni",
          sortable: true,
        },
        {
          name: "ruc",
          align: "left",
          label: "RUC",
          field: "ruc",
          sortable: true,
        },
        {
          name: "Acciones",
          align: "center",
          label: "Acciones",
          field: "acciones",
          sortable: false,
        },
      ],
    };
  },

  computed: {
    // Filtra los datos según el texto de búsqueda
    datosFiltrados() {
      return this.datos.filter((dato) =>
        this.columnasFiltrables().some((columna) =>
          String(this.celda(dato, columna))
            .toLowerCase()
            .includes(this.busqueda.toLowerCase())
        )
      );
    },
  },

  mounted() {
    this.getDatos();
  },

  methods: {
    cerrarDialogError() {
      this.dependencyError = false;
    },
    // handleEdicionCompletada() {
    // // Actualiza tus datos después de editar
    // this.getDatos();
    // },
    async getDatos() {
      try {
        const response = await axios.get(
          "http://localhost:5243/api/Cliente/GetAll"
        );
        this.datos = response.data;
        console.log(this.datos);
      } catch (error) {
        console.error("Error al obtener datos: ", error);
      }
    },
    celda(fila, columna) {
      return fila[columna.field];
    },

    // Retorna las columnas que se pueden filtrar
    columnasFiltrables() {
      return this.columns.filter((columna) => columna.field !== "clienteId");
    },

    editarFila(fila) {
      this.$refs.clientModEditar.abrirModalEdicion(fila);
      console.log("Editar:", fila);
    },

    // Función para eliminar una fila
    eliminarFila(fila) {
      const $q = useQuasar();
      this.$q
        .dialog({
          title: "Confirmacion Requerida",
          message: "¿Seguro que desea eliminar?",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          try {
            const response = await axios.delete(
              `http://localhost:5243/api/Cliente/Delete/${fila.clienteId}`
            );
            console.log("Registro eliminado:", response.data);
            // Actualizar tus datos después de eliminar
            this.getDatos();
          } catch (error) {
            console.error("Error al eliminar:", error);
            if (error.response && error.response.status === 500)
              this.dependencyError = true;
          }
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    },
  },
};
</script>
