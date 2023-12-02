<template>
  <q-card>
    <q-card-section>
      <div class="total-section">
        <div class="label">Subtotal:</div>
        <div class="value">{{ subtotal }}</div>
      </div>
      <div class="total-section">
        <div class="label">IGV (18%):</div>
        <div class="value">{{ calcularIGV(subtotal) }}</div>
      </div>
      <div class="total-section">
        <div class="label">Total:</div>
        <div class="value">{{ calcularTotal(subtotal) }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.total-field {
  width: 300px; /* Ajusta el ancho según tus necesidades */
  margin-left: auto; /* Alinea a la derecha */
  margin-right: 0;
}

.total-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.label {
  flex: 1;
  text-align: left;
}

.value {
  flex: 1;
  text-align: right;
}
</style>

<script>
export default {
  props: {
    subtotal: Number,
  },
  methods: {
    calcularIGV(subtotal) {
      return (subtotal * 0.18).toFixed(2);
    },
    calcularTotal(subtotal) {
      const igv = this.calcularIGV(subtotal);
      return (subtotal + parseFloat(igv)).toFixed(2);
    },
  },
};
</script>
