<template>
  <div class="buttons">
    <router-link to="/" class="router"><MdBeerIcon /></router-link>
    <button class="router" @click="loginOrRegisterMe">
      <MdCheckMarkCircleIcon />
    </button>
  </div>
</template>
<script>
import MdBeerIcon from "vue-ionicons/dist/md-beer.vue";
import MdCheckMarkCircleIcon from "vue-ionicons/dist/md-checkmark-circle.vue";
import router from "@/router";

export default {
  name: "SubmitButtons",
  components: {
    MdBeerIcon,
    MdCheckMarkCircleIcon,
  },
  methods: {
    loginOrRegisterMe() {
      console.log("Ruta: ", router.currentRoute.name);
      console.log("Parent: ", this.$parent);
      if (router.currentRoute.name === "login") {
        this.$parent.loginMe();
      }
      if (router.currentRoute.name === "signup") {
        this.$parent.registerMe();
      }
    },
  },
};
</script>
<style>
@import "~vue-ionicons/ionicons.scss";
.buttons {
  display: flex;
  gap: 5px;
}

.router {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  font-size: 2em;
  color: #111;
  transition: 0.5s;
}
.router:hover {
  color: #ff1252;
}
.router-link-exact-active {
  background-color: indianred;
}
</style>
