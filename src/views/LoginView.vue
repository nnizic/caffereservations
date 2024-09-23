<template>
  <div class="login">
    <div class="box">
      <h1>LOGIN</h1>
      <div class="input-field">
        <input type="email" v-model="username" id="usernameInput" />
        <label>Email</label>
      </div>
      <div class="input-field">
        <input type="password" v-model="password" id="passwordInput" />
        <label>Lozinka</label>
      </div>
      <submit-buttons />
    </div>
  </div>
</template>
<script>
import SubmitButtons from "../components/SubmitButtons.vue";
import { firebase } from "@/firebase";
import router from "@/router";

export default {
  name: "logIn",
  components: {
    SubmitButtons,
  },
  data() {
    return {
      router,

      username: "",
      password: "",
    };
  },
  methods: {
    loginMe() {
      console.log("Logiram se...");

      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then((result) => {
          console.log("Uspješna prijava", result);
        })
        .catch(function (e) {
          console.error("Greška", e);
        });
    },
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.login {
  height: 100vh;
  background-image: url("../assets/images/ET005.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: top;
  justify-content: center;
}
.box {
  background-color: rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  min-height: 50vh;
  width: 400px;
  padding: 20px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.input-field {
  position: relative;
}

.input-field input {
  width: 350px;
  height: 60px;
  border-radius: 6px;
  font-size: 18px;
  padding: 0 15px;
  margin: 15px;
  border: 2px solid #fff;
  background: transparent;
  outline: none;
  color: #fff;
}
.input-field label {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  color: #282828;
  font-size: 19px;
  pointer-events: none;
  transition: 0.3s;
}
input:focus {
  border: 2px solid indianred;
}

input:focus ~ label {
  top: 0;
  font-size: 16px;
}
</style>
