import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
// import fb from "./db";
// import firebase from "firebase";

Vue.config.productionTip = false;

// let app;

/*var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("profile");
provider.addScope("email");
firebase.auth().signInWithRedirect(provider);
firebase
  .auth()
  .getRedirectResult()
  .then(function(result) {
    debugger;
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
    console.log(user,token)
  });*/

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
