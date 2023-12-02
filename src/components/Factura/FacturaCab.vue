<!-- Componente FacturaCab.vue -->
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
          @input="seleccionarServicio"
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
      console.log("clienteSeleccionado", newClienteId);
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
          `http://localhost:5243/api/RepMantenimiento/GetReparacByClientId?idClient=${clienteId.value}`
        )
        .then((response) => {
          this.servicios = response.data.map((servicio) => ({
            label: `${servicio.descripcion}`,
            value: servicio.reparacionMantenimientoId,
          }));
          console.log("Opciones de servicios:", this.servicios);
        })
        .catch((error) => {
          console.log("error al obtener servicios", error);
          console.log("clienteId pp", clienteId.value);
        });
    },
    seleccionarServicio() {
      console.log("Método seleccionarServicio ejecutado");

      const reparacionMantenimientoId = this.servicioSeleccionado
        ? this.servicioSeleccionado.value
        : null;
      console.log("reparacionMantenimientoId:", reparacionMantenimientoId);

      if (reparacionMantenimientoId) {
        axios
          .get(
            `http://localhost:5243/api/RepMantenimiento/GetReparacMantIncServ?id=${reparacionMantenimientoId}`
          )
          .then((response) => {
            console.log("Detalles del servicio", response.data);
            const servicio = {
              reparacionMantenimientoId:
                response.data.reparacionMantenimientoId,
              descripcion: response.data.descripcion,
              costo: response.data.costo,
            };
            this.servicios.push(servicio);
            console.log("Servicio agregado", servicio);

            this.actualizarSubtotal();
          })
          .catch((error) => {
            console.log("Error al obtener detalles del servicio", error);
          });
      }
    },
    agregarServicio() {
      if (this.servicioSeleccionado) {
        const servicioExistente = this.servicios.find(
          (servicio) =>
            servicio.reparacionMantenimientoId ===
            this.servicioSeleccionado.value
        );

        if (!servicioExistente) {
          const nuevoServicio = {
            reparacionMantenimientoId: this.servicioSeleccionado.value,
            descripcion: this.servicioSeleccionado.label,
            costo: 0,
          };

          this.servicios.push(nuevoServicio);
          console.log("Servicio agregado", nuevoServicio);
        } else {
          console.log("Este servicio ya fue agregado.");
        }
      }
    },
    seleccionarServicioDirectamente() {
      console.log("Método seleccionarServicioDirectamente ejecutado");
      this.seleccionarServicio();
    },
  },
};
</script>
