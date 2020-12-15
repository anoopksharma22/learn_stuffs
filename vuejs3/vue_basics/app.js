// create vue app
const app = Vue.createApp({
  data() {
    // data is an attribute whose value is a function same as data: function(){}, and the function should return an object
    return {
      mygoal: "I want to build my app",
      vueLink: "https://v3.vuejs.org",
    }; // data returned here can be used on vue controlled html by interpolation using {{ data attribute name }}
  },
});

app.mount("#user-goal"); // attach the vue app to a unique element in html, hence to an ID generally.
