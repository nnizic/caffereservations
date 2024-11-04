<template>
  <div>
    <h1>Rezervacije korisnika {{ this.userEmail }}</h1>
    <ul v-if="reservations.length">
      <li v-for="reservation in reservations" :key="reservation.id">
        <p>
          <strong>Datum rezervacije:</strong>
          {{ reservation.date.toDate().toLocaleDateString() }}
        </p>
        <p><strong>Događaj:</strong> {{ reservation.rEvent }}</p>
        <p><strong>Rezervirani stolovi:</strong> {{ reservation.rTables }}</p>
        <p><strong>Status rezervacije:</strong> {{ reservation.rStatus }}</p>
        <hr />
      </li>
    </ul>
    <p v-else>Nema rezervacija.</p>
  </div>
</template>

<script>
import { db } from "@/firebase";
import store from "@/store";

export default {
  data() {
    return {
      userEmail: store.currentUser,
      reservations: [],
    };
  },
  async created() {
    await this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        // Reference to the user's reservations subcollection
        const reservationsRef = db
          .collection("reservations")
          .doc(this.userEmail)
          .collection("reservations");

        // Fetch all documents in the subcollection
        const snapshot = await reservationsRef.get();
        this.reservations = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    },
  },
};
</script>

<style scoped></style>
