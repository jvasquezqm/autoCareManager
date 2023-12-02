<template>
    <div class="programacion-page">
        <div class="titulo"><h5>GESTIÓN PROGRAMACIÓN</h5></div>
        <ProgramacionAdd ref="ProgramacionAdd" />
        <div class="agregar"><q-btn @click="agregarv" color="blue" icon="add" label="Añadir Programación" /></div>
        <br/>
        <div class="tabla"><ProgramacionTabla /></div>
    </div>  
</template>



<style>

.programacion-page{

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

import ProgramacionTabla from 'src/components/Programacion/ProgramacionTabla.vue';
import ProgramacionAdd from 'src/components/Programacion/ProgramacionAdd.vue'

export default {
    name: "GestionProgramacion",
    components: {
        ProgramacionTabla,
        ProgramacionAdd
    },

    methods: {
        agregarv(){
            this.$refs.ProgramacionAdd.abrirModalnuevoV();
        }
    }
}

</script>