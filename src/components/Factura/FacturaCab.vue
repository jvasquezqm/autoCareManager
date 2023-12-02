<template>
  <div class="q-page q-pa-md">
    <div class="items-center">
      <div class="form-group">
        <label class="label">Cliente:</label>
        <q-select
          v-model="clienteSeleccionado"
          :options="clientes"
          label=" "
          @input="actualizarFechaYNumeroFactura"
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
export default {
  data() {
    return {
      numeroFactura: null,
      clienteSeleccionado: null,
      servicioSeleccionado: null,
      repuestoSeleccionado: null,
      fecha: new Date().toISOString().split("T")[0],
      clientes: [
        { label: "Cliente 1", value: "cliente1" },
        { label: "Cliente 2", value: "cliente2" },
      ],
      servicios: [
        { label: "Servicio 1", value: "servicio1" },
        { label: "Servicio 2", value: "servicio2" },
      ],
      repuestos: [
        { label: "Repuesto 1", value: "repuesto1" },
        { label: "Repuesto 2", value: "repuesto2" },
      ],
    };
  },
  methods: {},
};
</script>
