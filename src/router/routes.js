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
    ],
  },
  {
    path: "/",
    component: () => import("pages/LoginForm.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
