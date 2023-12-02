
<template>
  <div>
    <TallerEditar ref="TallerEditar"/>
    
    <q-table
      :rows="datosFiltrados"
      :columns="columns"
      row-key="TallerId"
      :rows-per-page-options="[10,50,100]"
      
    >

      
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="columna in columns" :key="columna.field" align="left">
            <template v-if="columna.field !== 'acciones'">
              {{ celda(props.row, columna) }}
            </template>

            <template v-else>
              <q-btn @click="editarFila(props.row)" icon="edit"  flat color="primary" />
              <q-btn @click="eliminarFila(props.row)" icon="delete" flat color="negative" />
            </template>
          </q-td>
        </q-tr>
      </template>
      


      <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="busqueda" placeholder="Busqueda">
            <template v-slot:append>
                <q-icon name="search"></q-icon>
            </template>
          </q-input>
      </template>
    </q-table>
  </div>
</template>


<style>

</style>



<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'
import TallerEditar from 'src/components/Taller/TallerEdit.vue'


export default{

  name: "TallerTabla",

  components: {
    TallerEditar,
  },
  
  data(){
    return{
      datos: [],
      busqueda: '',
      columns: [
        { name: 'id', align: 'center', label: 'ID', field: 'tallerId', sortable: true },
        { name: 'nombre', align: 'center', label: 'Nombre Taller', field: 'nombreTaller', sortable: true },
        { name: 'sede', align: 'center', label: 'Sede', field: 'sede', sortable: true },
        { name: 'direccion', align: 'center', label: 'Dirección', field: 'direccion', sortable: true },
        { name: 'contacto', align: 'center', label: 'Contacto', field: 'contacto', sortable: true },
        { name: 'estado', align: 'center', label: 'Estado', field: 'estado', sortable: true },
        { name: 'acciones', align: 'center', label: 'Acciones', field: 'acciones', sortable: false},
      ]
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
        const response = await axios.get('http://localhost:5243/api/Taller/GetAll');
        this.datos = response.data;
        console.log(this.datos)
      } catch (error){
        console.error('Error al obtener datos: ',error);
      }
    },
    celda(fila, columna){
      if (columna.field === 'taller') {
        return fila.taller.nombreTaller + ' ' + fila.taller.sede;
      }
      return fila[columna.field];
    },

    // Retorna las columnas que se pueden filtrar
    columnasFiltrables() {
      return this.columns.filter((columna) => columna.field !== 'TallerId');
    },

    editarFila(fila) {
      this.$refs.TallerEditar.abrirModalEdicion(fila);
      //console.log('Editar:', fila);
    },

    // Función para eliminar una fila
    eliminarFila(fila) {
      const $q = useQuasar()
      this.$q.dialog({
        title: 'Confirmacion Requerida',
        message: '¿Seguro que desea eliminar?',
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        try {
          const response = await axios.delete(`http://localhost:5243/api/Taller/Delete${fila.tallerId}`);
          
          console.log('Registro eliminado:', response.data);
          // Actualizar tus datos después de eliminar
          this.getDatos();
        } catch (error) {
          console.error('Error al eliminar:', error);
        }
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    },
  },

  actualizar(){
    this.getDatos()
  }



}

</script>