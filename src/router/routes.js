const routes = [
  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "client", component: () => import("pages/ClientPage.vue") },
      { path: "Inicio", component: () => import("pages/LoginForm.vue") },
      {
        path: "vehiculo",
        component: () => import("pages/GestionVehiculo.vue"),
      },
      {
        path: "propietario",
        component: () => import("pages/GestionPropietario.vue"),
      },
      { path: "factura", component: () => import("pages/FacturaPage.vue") },
      {
        path: "inventario",
        component: () => import("pages/GestionInventario.vue"),
      },
      {
        path: "reportes",
        component: () => import("pages/ReporteACM.vue"),
      },
      { path: "mecanico", component: () => import("pages/GestionMecanico.vue") },
      { path: "programacion", component: () => import("pages/GestionProgramacion.vue") },
      { path: "taller", component: () => import("pages/GestionTaller.vue") },
    ],
  },
  {
    path: "/",
    component: () => import("pages/LoginFormv3.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
