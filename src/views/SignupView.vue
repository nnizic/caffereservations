<template>
  <div class="signup">
    <div class="box">
      <h1>SIGNUP</h1>
      <div class="input-field">
        <input type="text" />
        <label>Ime</label>
      </div>
      <div class="input-field">
        <input type="text" />
        <label>Prezime</label>
      </div>
      <div class="input-field">
        <input type="text" />
        <label>Email</label>
      </div>
      <div class="input-field">
        <input type="text" />
        <label>Lozinka</label>
      </div>
      <div class="input-field">
        <input type="text" />
        <label>Ponovo Lozinka</label>
      </div>
      <submit-buttons />
    </div>
  </div>
</template>
<script>
import SubmitButtons from '../components/SubmitButtons.vue';

export default {
  name: 'signUp',
  components: {
    SubmitButtons,
  },
};
</script>
<style>
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
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  color: #fff;
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
