<template>
  <div class="signup">
    <div class="box">
      <h1>SIGNUP</h1>
      <div class="input-field">
        <input type="text" v-model="name" />
        <label>Ime</label>
      </div>
      <div class="input-field">
        <input type="text" v-model="surname" />
        <label>Prezime</label>
      </div>
      <div class="input-field">
        <input type="email" v-model="username" />
        <label>Email</label>
      </div>
      <div class="input-field">
        <input type="password" v-model="password" />
        <label>Lozinka</label>
      </div>
      <div class="input-field">
        <input type="password" v-model="passwordRepeat" />
        <label>Ponovo Lozinka</label>
      </div>
      <submit-buttons />
    </div>
  </div>
</template>
<script>
import { firebase, db } from "@/firebase.js";
import router from "@/router";
import SubmitButtons from "@/components/SubmitButtons.vue";

export default {
  name: "signUp",
  data() {
    return {
      router,
      username: "",
      password: "",
      passwordRepeat: "",
      name: "",
      surname: "",
    };
  },
  components: {
    SubmitButtons,
  },
  methods: {
    async registerMe() {
      try {
        if (this.password.length >= 6) {
          if (this.password === this.passwordRepeat) {
            // Attempt to create a user with Firebase Auth
            await firebase
              .auth()
              .createUserWithEmailAndPassword(this.username, this.password);

            // Attempt to save user data to Firestore
            await db
              .collection("allUsers")
              .doc(this.username + Date.now())
              .set({
                username: this.username,
                name: this.name,
                surname: this.surname,
                registeredAt: Date.now(),
                isAdmin: false,
              });

            alert("Korisnik spremljen");
            // Reset fields after successful registration
            this.name = "";
            this.surname = "";
            this.username = "";
            this.password = "";
            this.passwordRepeat = "";
            this.router.push("userdashboard");
          } else {
            this.password = "";
            this.passwordRepeat = "";
            alert("Lozinke se ne podudaraju!");
          }
        } else {
          this.password = "";
          this.passwordRepeat = "";
          alert("Lozinka mora imati 6 ili više znakova!");
        }
      } catch (error) {
        alert("Došlo je do greške: " + error.message);
      }
    },
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.signup {
  height: 100vh;
  background-image: url("../assets/images/ET008.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: top;
  justify-content: center;
}
.box {
  background-color: rgba(255, 255, 255, 0.1);
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
  height: 0px;
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
