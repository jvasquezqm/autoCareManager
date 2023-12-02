<!-- Pagina FacturaPage.vue -->
<template>
  <div class="factura-page">
    <div class="content-container">
      <h4 class="titulo">GENERAR FACTURA</h4>
      <FacturaCabe />
      <div class="tabla">
        <ServiciosTable :servicios="servicios" />
      </div>
      <div class="separacion"></div>
      <div class="tabla">
        <RepuestosTable :repuestos="repuestos" />
      </div>
      <div class="separacion"></div>
      <div class="totalizador-container">
        <TotalizadorFactura :subtotal="subtotal" />
      </div>

      <div class="separacion"></div>
      <q-btn @click="registrarFactura" color="blue" icon="add_circle">
        Registrar Factura
      </q-btn>
    </div>
  </div>
</template>

<style>
.factura-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.content-container {
  max-width: 800px;
  width: 100%;
  text-align: center;
}
.titulo {
  text-align: center;
  width: 100%;
}
.registrar-button {
  margin-top: 20px;
  padding: 10px;
}

.tabla {
  text-align: center;
  width: 100%;
}

.separacion {
  height: 20px; /* Puedes ajustar la altura según tus necesidades */
}

.totalizador-container {
  margin-left: auto; /* Mueve TotalizadorFactura a la derecha */
}
</style>

<script>
import FacturaCabe from "components/Factura/FacturaCab.vue";
import ServiciosTable from "components/Factura/ServiciosTable.vue";
import RepuestosTable from "components/Factura/RepuestosTable.vue";
import TotalizadorFactura from "components/Factura/TotalizadorFactura.vue";

export default {
  components: {
    FacturaCabe,
    ServiciosTable,
    RepuestosTable,
    TotalizadorFactura,
  },
  methods: {
    registrarFactura() {
      // Lógica para registrar la factura
      console.log("Factura registrada!");
    },
  },
  data() {
    return {
      servicios: [], // Tu array de servicios
      repuestos: [], // Tu array de repuestos
      subtotal: 0, // Calcular y asignar el subtotal aquí
    };
  },
};
</script>
