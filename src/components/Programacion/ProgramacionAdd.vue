<template>
    <div>
      <q-dialog v-model="mostrarModal">
        <q-card class="qcard-modal-edit">
          <q-card-section>
            <div class="titulo">Agregar Programación</div>
            <!--<q-input v-model="nuevoP.programacionId" label="ID de Programación" class="custom-label"/>-->
            <q-input v-model="nuevoP.fechaProgramacion" label="Fecha" class="custom-label" />
            <q-input v-model="nuevoP.hora" label="Hora" class="custom-label" />
            <!--<q-input v-model="nuevoM.especialidad" label="Especilidad" class="custom-label" />-->
            <q-select
                    v-model="nuevoP.vehiculoId"
                    label="Vehiculo"
                    :options="vehiculo"
                    option-value="vehiculoId"  
                    :option-label="option => `${option.marca} ${option.numeroPlaca}`"
                    
            />
            <q-select
                    v-model="nuevoP.mecanicoId"
                    label="Mecanico"
                    :options="mecanico"
                    option-value="mecanicoId"  
                    :option-label="option => `${option.nombre} ${option.apellido}`"
                    
            />
            <q-input v-model="nuevoP.estado" label="Estado" class="custom-label" />
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
        nuevoP: {
            fechaProgramacion: '',
            hora: '',
            vehiculoId: '',
            mecanicoId: '',
            estado: '',
         
        },
        vehiculo: [],
        mecanico: [],
      };
    },


    mounted() {
        this.getVehiculos(),
        this.getMecanicos()   

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
                fechaProgramacion: '',
                hora: '',
                vehiculoId: '',
                mecanicoId: '',
                estado: '',

                // Limpia más propiedades según sea necesario
                };
        },

        // Método para enviar al servidor
        async guardarnuevoM() {
        try {
            let url = "http://localhost:5243/api/Programacion/RegisterProgramacion"
            var data = {
                fechaProgramacion: this.nuevoP.fechaProgramacion,
                hora: this.nuevoP.hora,
                vehiculoId: this.nuevoP.vehiculoId,
                mecanicoId: this.nuevoP.mecanicoId,
                estado: this.nuevoP.estado
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


            
            //location.reload();
            this.cerrarModal();
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
        },

        async getVehiculos(){
            try {
            const response = await axios.get('http://localhost:5243/api/Vehiculo/GetAll');
            this.vehiculo = response.data;
        } catch (error) {
            console.error('Error al obtener vehiculos:', error);
        }
        },

        async getMecanicos(){
            try {
            const response = await axios.get('http://localhost:5243/api/Mecanico/GetAll');
            this.mecanico = response.data;
        } catch (error) {
            console.error('Error al obtener mecanicos:', error);
        }
        }
},
}
</script>