<template>
    <div>
      <q-dialog v-model="mostrarModal">
        <q-card class="qcard-modal-edit">
          <q-card-section>
            <div class="titulo">Agregar Propietario</div>
            <q-input v-model="nuevoP.nombre" label="Nombre" class="custom-label"/>
            <q-input v-model="nuevoP.apellido" label="Apellido" class="custom-label" />
            <q-input v-model="nuevoP.correoElectronico" label="Corre Electrónico" class="custom-label" />
            <q-input v-model="nuevoP.telefono" label="Telefono" class="custom-label" />
            <q-input v-model="nuevoP.direccion" label="Dirección" class="custom-label" />
            <q-input v-model="nuevoP.dni" label="DNI" class="custom-label" />
                      
                <q-select
                    v-model="nuevoP.tallerId"
                    :options="taller"
                    option-value="tallerId"  
                    :option-label="option => `${option.nombreTaller} ${option.sede}`"
                    
                />
            <!-- </q-input> -->

            <br />
            <div class="buttons">
              <q-btn @click="guardarnuevoP" label="Guardar" color="secondary" />
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
export default{
    data() {
      return {

        mostrarModal: false,
        nuevoP: {
            nombre: '',
            apellido: '',
            correoElectronico: '',
            telefono: '',
            direccion: '',
            dni: '',
            tallerId: '',
         
        },
        taller: [],
      };
    },


    mounted() {
        this.getTalleres()   

    },
    methods: {
            
        abrirModalnuevoV() {
            this.mostrarModal = true;
        },

            // Método para cerrar el modal de edición
        cerrarModal() {
            this.mostrarModal = false;
            // Limpia los campos de edición
            this.nuevoP = {
                nombre: '',
                apellido: '',
                correoElectronico: '',
                telefono: '',
                direccion: '',
                dni: '',
                tallerId: '',

                // Limpia más propiedades según sea necesario
                };
        },

        // Método para enviar al servidor
        async guardarnuevoP() {
        try {
            let url = "http://localhost:5243/api/Propietario/RegisterPropietario"
            var data = {
                nombre: this.nuevoP.nombre,
                apellido: this.nuevoP.apellido,
                correoElectronico: this.nuevoP.correoElectronico,
                telefono: this.nuevoP.telefono,
                direccion: this.nuevoP.direccion,
                dni: this.nuevoP.dni,
                tallerId: this.nuevoP.tallerId.tallerId
            }
            //console.log(data)
            //peticion post
            // axios.post(url,data)
            //         .then(reponse => {
            //             this.$q.notify({
            //                 message: "Se añadió correctamente",
            //                 color: 'green',
            //                 position: 'top',
            //                 timeout: 10000
            //             })
            //         }).catch(error => {
            //             this.$q.notify({
            //                 message: "Ha Ocurrido un problema",
            //                 color: 'red',
            //                 position: 'top',
            //                 timeout: 10000
            //             })
            //         })


            
            location.reload();
            this.cerrarModal();
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
        },

        async getTalleres(){
            try {
            const response = await axios.get('http://localhost:5243/api/Taller/GetAll');
            this.taller = response.data;
        } catch (error) {
            console.error('Error al obtener talleres:', error);
        }
        }
},
}
</script>