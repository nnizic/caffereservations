<template>
  <div class="brand">
    <router-link to="/">
      <img alt="ET logo" src="../assets/logo.png"
    /></router-link>
    <span>
      Ul. Ante Starčevića 11A, 23000 Zadar<br />
      radno vrijeme:07:00 - 00:00</span
    >
  </div>
</template>
<script>
export default {
  name: "BrandName",
};
</script>
<style>
.brand img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50px;
  background-color: none !important;
}
.brand {
  display: flex;
  justify-content: space-between;
  padding: 5px;
}
.brand span {
  color: white;
}
</style>
