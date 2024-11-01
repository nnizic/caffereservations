<template>
  <div class="home">
    Rezervacija stolova:
    <tableView @data="get" />
  </div>
</template>

<script>
// @ is an alias to /src
import tableView from "@/components/TableView.vue";

export default {
  name: "ReservationView",
  data: function () {
    return {
      showName: "",
      reservedNames: [],
    };
  },
  components: {
    tableView,
  },
  methods: {
    get(value) {
      this.showName = value.toString();
      this.reservedNames.push(this.showName);
      console.log(this.reservedNames);
    },
  },
};
</script>
<style></style>
