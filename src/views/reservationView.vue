<template>
  <div class="home">
    Rezervacija stolova:
    <tableView @data="get" />
    <button type="button" class="btn btn-secondary" @click="finishIt">
      Završi
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import tableView from "@/components/TableView.vue";
import store from "@/store";
import { db } from "@/firebase";

async function updateTables(postId, newValues) {
  try {
    // Ensure newValuesArray has exactly 9 elements
    if (newValues.length !== 9) {
      throw new Error("The array must contain exactly 9 values.");
    }

    // Reference to the document you want to update
    const postRef = db.collection("posts").doc(postId);

    // Update the entire array field with the new values
    await postRef.update({
      eTableStyle: newValues,
    });

    console.log("Array updated successfully with new values!");
  } catch (error) {
    console.error("Error updating array values: ", error);
  }
}

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
    finishIt() {
      updateTables(store.activeEvent, this.tables);
      console.log(store.activeEvent);
      this.$router.push({
        path: "/",
      });
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
