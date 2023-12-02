<template>
    <div class="propietario-page">
        <div class="titulo"><h5>GESTIÓN TALLER</h5></div>
        <TallerAdd ref="TallerAdd" />
        <div class="agregar"><q-btn @click="agregarv" color="blue" icon="add" label="Añadir Taller" /></div>
        <br/>
        <div class="tabla"><TallerTabla /></div>
    </div>  
</template>



<style>

.tallero-page{

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

import TallerTabla from 'src/components/Taller/TallerTabla.vue';
import TallerAdd from 'src/components/Taller/TallerAdd.vue'

export default {
    name: "GestionTaller",
    components: {
        TallerTabla,
        TallerAdd
    },

    methods: {
        agregarv(){
            this.$refs.TallerAdd.abrirModalnuevoV();
        }
    }
}

</script>