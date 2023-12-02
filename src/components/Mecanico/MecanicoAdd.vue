<template>
    <div>
      <q-dialog v-model="mostrarModal">
        <q-card class="qcard-modal-edit">
          <q-card-section>
            <div class="titulo">Agregar Mecánico</div>
            <q-input v-model="nuevoM.nombre" label="Nombre" class="custom-label"/>
            <q-input v-model="nuevoM.apellido" label="Apellido" class="custom-label" />
            <q-input v-model="nuevoM.telefono" label="Telefono" class="custom-label" />
            <!--<q-input v-model="nuevoM.especialidad" label="Especilidad" class="custom-label" />-->
            <q-select
            v-model="nuevoM.especialidad"
            label="Especilidad"
            :options="['Mecánica general', 'Electricidad automotriz', 'Chapistería']"
            class="custom-label"
          />         
                <q-select
                    v-model="nuevoM.tallerId"
                    label="Taller"
                    :options="taller"
                    option-value="tallerId"  
                    :option-label="option => `${option.nombreTaller} ${option.sede}`"
                    
                />
            <q-select
            v-model="nuevoM.estado"
            label="Estado"
            :options="['Activo', 'Inactivo']"
            class="custom-label"
          />
            <!-- </q-input> -->

            <br />
            <div class="buttons">
              <q-btn @click="guardarnuevoM" label="Guardar" color="secondary" />
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
        nuevoM: {
            nombre: '',
            apellido: '',
            telefono: '',
            especialidad: '',
            tallerId: '',
            estado: '',
         
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
            this.nuevoM = {
                nombre: '',
                apellido: '',
                telefono: '',
                especialidad: '',
                tallerId: '',
                estado: '',

                // Limpia más propiedades según sea necesario
                };
        },

        // Método para enviar al servidor
        async guardarnuevoM() {
        try {
            let url = "http://localhost:5243/api/Mecanico/RegisterMecanico"
            var data = {
                nombre: this.nuevoM.nombre,
                apellido: this.nuevoM.apellido,
                telefono: this.nuevoM.telefono,
                especialidad: this.nuevoM.especialidad,
                tallerId: this.nuevoM.tallerId.tallerId,
                estado: this.nuevoM.estado
            }
            //console.log(data)
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