<template>
    <div>
      <q-dialog v-model="mostrarModal">
        <q-card class="qcard-modal-edit">
          <q-card-section>
            <div class="titulo">Agregar Taller</div>
            <q-input v-model="nuevoT.nombreTaller" label="Nombre Taller" class="custom-label"/>
            <q-input v-model="nuevoT.sedeTaller" label="Sede" class="custom-label" />
            <q-input v-model="nuevoT.direccion" label="Dirección" class="custom-label" />
            <q-input v-model="nuevoT.contacto" label="Contacto" class="custom-label" />
            <q-input v-model="nuevoT.estado" label="Estado" class="custom-label" />
            
            <!-- </q-input> -->

            <br />
            <div class="buttons">
              <q-btn @click="guardarnuevoT" label="Guardar" color="secondary" />
              <q-btn @click="cerrarModal" label="Cancelar" color="red" />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <style>
  .titulo{
    text-align: center;
    font-size: large;
    font-style: inherit;
  }
  .qcard-modal-edit {
    width: 550px;
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
import axios from 'axios'
import { Notify } from 'quasar'
export default{
    data() {
      return {

        mostrarModal: false,
        nuevoT: {
            
            nombreTaller: '',
            sede: '',
            direccion: '',
            contacto: '',
            estado: ''
         
        },
        
      };
    },

    methods: {
            
        abrirModalnuevoV() {
            this.mostrarModal = true;
        },

            // Método para cerrar el modal de edición
        cerrarModal() {
            this.mostrarModal = false;
            // Limpia los campos de edición
            this.nuevoT = {
                
                nombreTaller: '',
                sede: '',
                direccion: '',
                contacto: '',
                estado: ''

                // Limpia más propiedades según sea necesario
                };
        },

        // Método para enviar al servidor
        async guardarnuevoT() {
        try {
            let url = "http://localhost:5243/api/Taller/RegisterTaller"
            var data = {
                
                nombreTaller: this.nuevoT.nombreTaller,
                sede: this.nuevoT.sedeTaller,
                direccion: this.nuevoT.direccion,
                contacto: this.nuevoT.contacto,
                estado: this.nuevoT.estado
                
            }
            console.log(data)
            //peticion post
             axios.post(url,data)
                     .then(reponse => {
                         this.$q.notify({
                             message: "Se añadió correctamente",
                             color: 'green',
                             position: 'top',
                             timeout: 10000
                         })
                     }).catch(error => {
                         this.$q.notify({
                             message: "Ha Ocurrido un problema",
                             color: 'red',
                             position: 'top',
                             timeout: 10000
                         })
                     })


            
            location.reload();
            this.cerrarModal();
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
        },

        
},
}
</script>