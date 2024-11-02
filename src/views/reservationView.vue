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
      this.tables[this.showName - 1] = "tableview2";
      console.log(this.reservedNames);
      console.log(this.tables);
    },
  },
  computed: {
    tables() {
      return this.$route.query.tables || []; //Default to empty array
    },
  },
};
</script>
<style></style>
