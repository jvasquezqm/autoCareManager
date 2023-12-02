<template>
    <div class="factura-page">
        <div class="titulo"><h5>HISTORIAL DE FACTURASC</h5></div>
        <FacturaAdd ref="FacturaAdd" />
        <br/>
        <div class="tabla"><FacturaTabla /></div>
    </div>  
</template>



<style>

.factura-page{

    justify-content: space-between;
    position: sticky;
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

import FacturaTabla from 'src/components/Factura/FacturaHistorialTabla.vue';

export default {
    name: "GestionFactura",
    components: {
        FacturaTabla
    },

    methods: {
        
    }
}

</script>