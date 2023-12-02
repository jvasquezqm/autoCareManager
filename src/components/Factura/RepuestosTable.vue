<template>
  <div>
    <q-table
      :rows="repuestos"
      :columns="columns"
      row-key="id"
      :pagination="pagination"
      :rows-per-page-options="rowsPerPageOptions"
      virtual-scroll
    />
  </div>
</template>

<script>
export default {
  props: {
    repuestos: Array, // Pasa el array de repuestos como prop
  },
  data() {
    return {
      columns: [
        { name: "id", label: "Repuesto ID", align: "left", field: "id" },
        {
          name: "descripcion",
          label: "Descripción",
          align: "left",
          field: "descripcion",
        },
        {
          name: "precioUnitario",
          label: "Precio Unitario",
          align: "left",
          field: "precioUnitario",
        },
        {
          name: "precioTotal",
          label: "Precio Total",
          align: "left",
          field: "precioTotal",
        },
      ],
      pagination: {
        rowsPerPage: 10,
      },
      rowsPerPageOptions: [10, 20, 30],
    };
  },
};
</script>
