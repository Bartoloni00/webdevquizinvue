const home = {
  template: '<form-contenedor></form-contenedor>',
  name: 'component-home'
};

const ranking = {
  template: '<ranking></ranking>',
  name: 'ingresar'
};

const routes = [
  { path: '/Formulario', component: home },
  { path: '/Ranking', component: ranking },
  { path: '*', redirect: '/Formulario' }
];

const router = new VueRouter({
  routes
});

var vw = new Vue({
  el: '#vw',
  router
});