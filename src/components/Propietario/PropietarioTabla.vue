
<template>
  <div>
    <PropietarioEditar ref="PropietarioEditar"/>
    
    <q-table
      :rows="datosFiltrados"
      :columns="columns"
      row-key="PropietarioId"
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
import PropietarioEditar from 'src/components/Propietario/PropietarioEdit.vue'


export default{

  name: "PropietarioTabla",

  components: {
    PropietarioEditar,
  },
  
  data(){
    return{
      datos: [],
      busqueda: '',
      columns: [
        { name: 'id', align: 'center', label: 'ID', field: 'propietarioId', sortable: true },
        { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
        { name: 'apellido', align: 'center', label: 'Apellido', field: 'apellido', sortable: true },
        { name: 'correoElectronico', align: 'center', label: 'Correo Electronico', field: 'correoElectronico', sortable: true },
        { name: 'telefono', align: 'center', label: 'Telefono', field: 'telefono', sortable: true },
        { name: 'direccion', align: 'center', label: 'Dirección', field: 'direccion', sortable: true },
        { name: 'dni', align: 'left', label: 'DNI', field: 'dni', sortable: true },
        { name: 'tallerId', align: 'center', label: 'Taller', field: 'tallerId', sortable: false},
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
        const response = await axios.get('http://localhost:5243/api/Propietario/GetAll');
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
      return this.columns.filter((columna) => columna.field !== 'PropietarioId');
    },

    editarFila(fila) {
      this.$refs.PropietarioEditar.abrirModalEdicion(fila);
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
          const response = await axios.delete(`http://localhost:5243/api/Propietario/Delete${fila.propietarioId}`);
          
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