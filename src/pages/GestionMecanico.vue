<template>
    <div class="mecanico-page">
        <div class="titulo"><h5>GESTIÓN MECÁNICO</h5></div>
        <MecanicoAdd ref="MecanicoAdd" />
        <div class="agregar"><q-btn @click="agregarv" color="blue" icon="add" label="Añadir Mecánico" /></div>
        <br/>
        <div class="tabla"><MecanicoTabla /></div>
    </div>  
</template>



<style>

.mecanico-page{

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

import MecanicoTabla from 'src/components/Mecanico/MecanicoTabla.vue';
import MecanicoAdd from 'src/components/Mecanico/MecanicoAdd.vue'

export default {
    name: "GestionMecanico",
    components: {
        MecanicoTabla,
        MecanicoAdd
    },

    methods: {
        agregarv(){
            this.$refs.MecanicoAdd.abrirModalnuevoV();
        }
    }
}

</script>