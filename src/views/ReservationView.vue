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

    async createReservation() {
      const reservationData = {
        date: new Date(),
        rEvent: store.activeEvent,
        rTables: this.reservedNames,
        rStatus: "pending",
      };

      try {
        // Create a document with the user's email as the ID
        const userDocRef = db.collection("reservations").doc(store.currentUser);

        // Check if the document already exists
        const doc = await userDocRef.get();
        if (!doc.exists) {
          await userDocRef.set({
            createdAt: Date.now(),
          });
        }

        // Add a new reservation subcollection under the user's document
        const reservationRef = userDocRef.collection("reservations");
        await reservationRef.add(reservationData);

        console.log("Reservation created successfully!");
      } catch (error) {
        console.error("Error creating reservation:", error);
      }
    },

    finishIt() {
      updateTables(store.activeEvent, this.tables);
      this.createReservation();
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
