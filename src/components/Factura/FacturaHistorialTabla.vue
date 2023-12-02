<template>
    <div>
      <div class="table-container">
        <q-table
          :rows="datosFiltrados"
          :columns="columns"
          row-key="facturaId"
          :rows-per-page-options="[10,50,100]"
          class="scroll-table"
  
        >

  
  
  
          <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="busqueda" placeholder="Busqueda">
                <template v-slot:append>
                    <q-icon name="search"></q-icon>
                </template>
              </q-input>
          </template>
        </q-table>
      </div>
    </div>
  </template>
  
  
  <style>
  .table-container {
    position: relative;
    overflow: hidden;
  }
  .scroll-table {
    max-height: 600px; /* ajusta la altura máxima según tus necesidades */
    overflow-y: auto;
  }
  
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
  import { ref } from 'vue'
  import { useQuasar } from 'quasar'
  import axios from 'axios'
  
  
  export default{
  
    name: "FacturaTabla",

  
    data(){
      return{
        datos: [],
        busqueda: '',
        columns: [
          { name: 'id', align: 'left', label: 'ID Factura', field: 'facturaId', sortable: true },
          { name: 'fecha', align: 'left', label: 'Fecha', field: 'fechaFacturacion', sortable: true },
          { name: 'total', align: 'left', label: 'Monto Facturado (S/.)', field: 'total', sortable: true },
          //{ name: 'cancelado', align: 'left', label: 'cancelado', field: 'cancelado', sortable: true },

        ],
      }
    },
  
    computed: {
      // Filtra los datos según el texto de búsqueda
      datosFiltrados() {
        return this.datos.filter((dato) =>
          this.columnasFiltrables().some((columna) =>
            String(this.celda(dato, columna)).toLowerCase().includes(this.busqueda.toLowerCase())
          )
        );
  
  
      },
    },
  
    mounted() {
      this.getDatos();
    },
  
    methods: {
      async getDatos(){
        try {
          const response = await axios.get('http://localhost:5243/api/Factura/GetAll');
          this.datos = response.data;
          console.log(this.datos)
        } catch (error){
          console.error('Error al obtener datos: ',error);
        }
      },
      celda(fila, columna){
        if (columna.field === 'cliente') {
          return fila.cliente.nombre + ' ' + fila.cliente.apellido;
        }
        return fila[columna.field];
      },
  
      // Retorna las columnas que se pueden filtrar
      columnasFiltrables() {
        return this.columns.filter((columna) => columna.field !== 'facturaId');
      },
  
    },
  
    actualizar(){
      this.getDatos()
    }
  
  
  
  }
  
  </script>
  