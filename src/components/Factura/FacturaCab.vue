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
      fecha: new Date().toISOString().split("T")[0],
      clientes: [],
      servicios: [],
    };
  },
  watch: {
    clienteSeleccionado: function (newClienteId, oldClienteId) {
      console.log("Cliente seleccionado", newClienteId);
      let clienteSeleccionado = newClienteId || oldClienteId;

      // Obtener el valor de 'value' del objeto proxy
      let valorClienteSeleccionado = clienteSeleccionado.value;
      console.log("Valor de cliente seleccionado", valorClienteSeleccionado);
      this.Clientes = response.data.map((Cliente) => cliente.clienteId);
      const op = this.obtenerServiciosxClient(newClienteId);
      console.log("id client csm", op);
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
          this.servicios = response.data.map(
            (servicio) => servicio.reparacionMantenimientoId
          );
          console.log("Clientes id", value);
        })
        .catch((error) => {
          console.log("error al obtener clientes", error);
        });
    },
    obtenerServiciosxClient(valorClienteSeleccionado) {
      axios
        .get(
          `http://localhost:5243/api/RepMantenimiento/GetReparacByClientId?idClient=${valorClienteSeleccionado}`
        )
        .then((response) => {
          this.servicios = response.data.map(
            (servicio) => servicio.reparacionMantenimientoId
          );
          console.log("IDs de Servicios", this.servicios);
        })

        .catch((error) => {
          console.log("error al obtener servicios", error);
        });
    },
  },
};
</script>
