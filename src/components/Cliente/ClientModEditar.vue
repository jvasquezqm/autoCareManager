<template>
  <div>
    <!-- MODAL FORMULARIO -->
    <q-dialog v-model="mostrarModal" persistent>
      <q-card style="min-width: 450px">
        <q-card-section>
          <q-input v-model="edicion.nombre" autofocus label="Nombre" />
        </q-card-section>
        <q-card-section>
          <q-input v-model="edicion.apellido" autofocus label="Apellido" />
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="edicion.correoElectronico"
            autofocus
            label="Correo"
          />
        </q-card-section>
        <q-card-section>
          <q-input v-model="edicion.telefono" autofocus label="Telefono" />
        </q-card-section>
        <q-card-section>
          <q-input v-model="edicion.direccion" autofocus label="Direccion" />
        </q-card-section>
        <q-card-section>
          <q-input v-model="password" autofocus label="Contraseña" />
        </q-card-section>
        <q-card-section>
          <q-input v-model="password" autofocus label="Repite Contraseña" />
        </q-card-section>

        <!-- BOTONES -->
        <q-card-actions align="center" class="text-primary">
          <q-btn
            @click="guardarEdicion"
            label="Actualizar"
            color="primary"
            v-close-popup
          />

          <q-btn @click="cerrarModal" label="Cancelar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

export default {
  data() {
    return {
      // ... Resto del código ...
      mostrarModal: ref(false),
      edicion: {
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        direccion: "",
        // Agrega más propiedades según sea necesario
      },
    };
  },

  methods: {
    // ... Resto del código ...

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
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        direccion: "",
        // Limpia más propiedades según sea necesario
      };
    },

    // Método para guardar la edición y enviarla al servidor
    async guardarEdicion() {
      try {
        const response = await axios.put(
          `http://localhost:5243/api/Cliente/Update/${this.edicion.clienteId}`,
          this.edicion
        );
        console.log("Registro actualizado:", response.data);
        // Actualiza tus datos después de editar
        //this.getDatos();
        location.reload();
        // Cierra el modal
        this.$nextTick(() => {
          this.cerrarModal();
        });
      } catch (error) {
        console.error("Error al actualizar:", error);
      }
    },
  },
};
</script>
