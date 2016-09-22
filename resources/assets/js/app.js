
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');


//注册组件
Vue.component('tasks', require('./components/Tasks.vue'));
Vue.component('page', require('./components/Page.vue'));
const app = new Vue({
    el: 'body',

});
