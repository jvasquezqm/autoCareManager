<template>
    <div>
      <q-dialog v-model="mostrarModal">
        <q-card class="qcard-modal-edit">
          <q-card-section>
            <q-input v-model="edicion.nombreTaller" label="Nombre Taller" class="custom-label" />
            <q-input v-model="edicion.sede" label="Sede" class="custom-label" />
            <q-input v-model="edicion.direccion" label="Dirección" class="custom-label" />
            <q-input v-model="edicion.contacto" label="Contacto" class="custom-label" />
            <q-input v-model="edicion.estado" label="Estado" class="custom-label" />
            <br />
            <div class="buttons">
              <q-btn @click="guardarEdicion" label="Actualizar" color="secondary" />
              <q-btn @click="cerrarModal" label="Cancelar" color="red" />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <style>
  .qcard-modal-edit {
    width: 450px;
    align-content: center;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 25px; 
  }
  
  .buttons q-btn {
    width: 48%; 
 
  }
  
  .buttons q-btn:last-child {
    margin-left: 10px;
  }

  .custom-label .q-field__label {
  font-size: 16px; 
  
}
  </style>

  <script>
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';
  import axios from 'axios';

  
  export default {

    data() {
      return {
        // ... Resto del código ...
        mostrarModal: false,
        edicion: {
            nombreTaller: '',
            sede: '',
            direccion: '',
            contacto: '',
            estado: '',
          //modelo: '',
        },
      };
    },
  
  // mounted() {
  //       this.getTalleres()   

  //   },
    methods: {
  
      // Método para abrir el modal de edición
      abrirModalEdicion(fila) {
        // Guarda la fila seleccionada para editar
        this.edicion = { ...fila };
        this.mostrarModal = true;
      },
  
      // Método para cerrar el modal de edición
      cerrarModal() {
        this.mostrarModal = false;
        // Limpia los campos de edición
        this.edicion = {
            nombreTaller: '',
            sede: '',
            direccion: '',
            contacto: '',
            estado: '',
          //modelo: '',
          // Limpia más propiedades según sea necesario
        };
      },
  
      // Método para guardar la edición y enviarla al servidor
      async guardarEdicion() {
      try {
        const response = await axios.put(`http://localhost:5243/api/Taller/Update${this.edicion.tallerId}`, this.edicion);
        
        console.log('Registro actualizado:', response.data);

        //this.getDatos();
        //location.reload();

        this.cerrarModal();
      } catch (error) {
        console.error('Error al actualizar:', error);
      }
    },
    },
  };
  </script>