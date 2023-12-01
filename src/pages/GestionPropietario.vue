<template>
    <div class="propietario-page">
        <div class="titulo"><h5>GESTIÓN PROPIETARIO</h5></div>
        <PropietarioAdd ref="PropietarioAdd" />
        <div class="agregar"><q-btn @click="agregarv" color="blue" icon="add" label="Añadir Propietario" /></div>
        <br/>
        <div class="tabla"><PropietarioTabla /></div>
    </div>  
</template>



<style>

.propietario-page{

    justify-content: space-between;
}
.titulo {
    text-align: center;
    width: 100%;
}

.agregar {
    text-align: left;
    margin-left: 2%;
}
.tabla {
    text-align: center;
    width: 100%;
}
</style>


<script>

import PropietarioTabla from 'src/components/Propietario/PropietarioTabla.vue';
import PropietarioAdd from 'src/components/Propietario/PropietarioAdd.vue'

export default {
    name: "GestionPropietario",
    components: {
        PropietarioTabla,
        PropietarioAdd
    },

    methods: {
        agregarv(){
            this.$refs.PropietarioAdd.abrirModalnuevoV();
        }
    }
}

</script>