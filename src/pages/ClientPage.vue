<template>
  <div class="product-page">
    <div class="titulo"><h5>GESTIÓN CLIENTE</h5></div>
    <ClientAdd ref="ClientAdd" />
    <div class="q-ml-md q-mr-xl">
      <div class="agregar">
        <q-btn
          @click="agregarc"
          @clienteAgregado="actualizarTabla"
          color="blue"
          icon="add"
          label="Añadir Cliente"
          fixed-top
        />
      </div>
      <br />
      <div class="tabla"><ClientGestion /></div>
    </div>
  </div>
</template>
<style>
.product-page {
  justify-content: space-between;
}

.titulo {
  text-align: center;
  width: 100%;
}

.agregar {
  text-align: left;
  margin-left: 2%;
}
.tabla {
  text-align: center;
  width: 100%;
}
</style>
<script>
import ClientGestion from "src/components/Cliente/ClientGestion.vue";
import ClientAdd from "src/components/Cliente/ClientAdd.vue";
export default {
  name: "ClientPage",
  components: {
    ClientGestion,
    ClientAdd,
  },
  methods: {
    async agregarc() {
      this.$refs.ClientAdd.abrirModalnuevoC();
      await this.getDatos();
    },
    async actualizarTabla() {
      await this.getDatos();
    },
  },
};
</script>
