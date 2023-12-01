<template>
  <q-layout view="lHh Lpr lFf">
    <div class="q-pa-md">
      <q-header>
        <q-toolbar
          class="bg-primary text-white q-my-md shadow-2 q-gutter-sm fixed-top"
        >
          <!-- Perfil -->
          <q-btn
            to="/perfil"
            flat
            label="Perfil"
            class="q-mr-sm"
            icon="account_circle"
          />

          <!-- Gestión Taller -->
          <q-btn-dropdown stretch flat label="Gestión Taller" icon="business">
            <q-list>
              <q-item clickable to="/dashboard/taller">
                <q-item-section avatar>
                  <q-avatar
                    icon="business"
                    color="secondary"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Talleres</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable to="/dashboard/propietario">
                <q-item-section avatar>
                  <q-avatar icon="people" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Propietarios</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable to="/dashboard/mecanico">
                <q-item-section avatar>
                  <q-avatar icon="build" color="accent" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Mecánicos</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <!-- Gestión Clientes -->
          <q-btn-dropdown stretch flat label="Clientes" icon="people">
            <q-list>
              <q-item clickable to="/dashboard/client">
                <q-item-section avatar>
                  <q-avatar
                    icon="people"
                    color="secondary"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Cliente</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable to="/dashboard/vehiculo">
                <q-item-section avatar>
                  <q-avatar
                    icon="directions_car"
                    color="primary"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Vehiculo</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <!-- Las otras opciones -->
          <q-btn to="/dashboard/Servicio" flat label="Servicios" icon="build" />
          <q-btn
            to="/dashboard/facturas"
            flat
            label="Facturas"
            icon="receipt"
          />
          <q-btn
            to="/dashboard/inventario"
            flat
            label="Inventario"
            icon="inventory"
          />
          <q-btn
            to="/dashboard/reportes"
            flat
            label="Reportes"
            icon="assessment"
          />

          <!-- Cerrar Sesión -->
          <q-space />
          <q-btn to="/" flat label="Cerrar sesión" round dense icon="logout" />
        </q-toolbar>
      </q-header>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style scoped>
/* Estilo específico para pantallas pequeñas */
.q-btn-menu {
  display: none; /* Oculta el botón del menú en pantallas grandes */
}

@media only screen and (max-width: 600px) {
  .q-btn-menu {
    display: block; /* Muestra el botón del menú en pantallas pequeñas */
  }

  /* Alinea el botón de cerrar sesión a la derecha en pantallas pequeñas */
  .q-toolbar .q-btn:last-child {
    margin-left: auto;
  }
}
</style>
<script>
import { defineComponent, ref } from "vue";

const linksList = [
  {
    title: "Favorito",
    caption: "Lista de favoritos",
    icon: "favorite",
    link: "src/components/Movie/MovieFavorite.vue",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {},
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
