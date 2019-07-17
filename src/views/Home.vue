<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="login" type="button">Login!</button>
    <button @click="logout" type="button">Logout!</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import fb from "../db";
// fb.auth.getRedirectResult().then(n=>{
//  console.log(n);
// })
export default {
  name: "home",
  components: {
    HelloWorld
  },
  created() {
    fb.auth.onAuthStateChanged(user => {
      console.log("hi user", user);
    });
  },
  methods: {
    login() {
      console.log(fb);
      // let provider = fb.auth.GoogleAuthProvider();
      fb.auth.signInWithRedirect(fb.provider);
    },
    logout() {
      fb.auth.signOut();
    }
  }
};
</script>
