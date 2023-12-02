<!-- Componenten ServiceTable.vue -->
<template>
  <div>
    <q-table :rows="servicios" :columns="columns" row-key="id" />
  </div>
</template>

<script>
export default {
  props: {
    servicios: Array, // Pasa el array de servicios como prop
  },
  data() {
    return {
      columns: [
        { name: "id", label: "Servicio ID", align: "left", field: "id" },
        {
          name: "descripcion",
          label: "Descripción",
          align: "left",
          field: "descripcion",
        },
        {
          name: "costo",
          label: "Precio",
          align: "left",
          field: "costo",
        },
      ],
    };
  },
};
</script>
