<template>
  <div class="q-page q-pa-md">
    <div class="items-center">
      <div class="form-group">
        <label class="label">Cliente:</label>
        <q-select
          v-model="clienteSeleccionado"
          :options="clientes"
          label=" "
          class="select"
        />
      </div>

      <div class="form-group">
        <label class="label">Servicio RM:</label>
        <q-select
          v-model="servicioSeleccionado"
          :options="servicios"
          label=" "
          class="select"
          :disable="!clienteSeleccionado"
        />
        <q-btn
          color="primary"
          icon="add"
          @click="agregarServicio"
          :disable="!servicioSeleccionado"
          round
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.items-center {
  display: flex;
  justify-content: space-between; /* Distribuye los elementos horizontalmente */
  align-items: flex-start;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  width: 100px; /* Tamaño fijo para labels, ajusta según tus necesidades */
  margin-right: 10px;
}

.input,
.select {
  width: 200px; /* Tamaño fijo para q-input y q-select, ajusta según tus necesidades */
}

.separacion {
  height: 20px; /* Separación entre las tablas de servicios y repuestos, ajusta según tus necesidades */
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      numeroFactura: null,
      clienteSeleccionado: null,
      servicioSeleccionado: null,
      repuestoSeleccionado: null,
      fecha: new Date().toISOString().split("T")[0],
      clientes: [],
      servicios: [],
    };
  },
  watch: {
    clienteSeleccionado: function (newClienteId, oldClienteId) {
      if (newClienteId) {
        this.obtenerServiciosxClient(newClienteId);
      } else {
        this.servicios = [];
      }
    },
  },
  created() {
    this.obtenerClientes();
  },
  methods: {
    obtenerClientes() {
      axios
        .get("http://localhost:5243/api/Cliente/GetAll")
        .then((response) => {
          this.clientes = response.data.map((cliente) => ({
            label: `${cliente.clienteId} - ${cliente.nombre}`,
            value: cliente.clienteId,
          }));
        })
        .catch((error) => {
          console.log("error al obtener clientes", error);
        });
    },
    obtenerServiciosxClient(clienteId) {
      axios
        .get(
          `http://localhost:5243/api/Servicio/GetServiciosxCliente?clienteId=${clienteId}`
        )
        .then((response) => {
          this.servicios = response.data.map((servicio) => ({
            label: `${servicio.servicioId} - ${servicio.descripcion}`,
            value: servicio.servicioId,
          }));
        })
        .catch((error) => {
          console.log("error al obtener servicios", error);
        });
    },
  },
};
</script>
