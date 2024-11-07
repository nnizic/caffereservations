<template>
  <div>
    <h1 v-if="!amIAdmin">Rezervacije korisnika {{ this.userEmail }}</h1>
    <h1 v-else>Rezervacije svih korisnika</h1>
    <ul v-if="reservations.length">
      <li v-for="reservation in reservations" :key="reservation.id">
        <p>
          <strong>Datum rezervacije:</strong>
          {{ reservation.date.toDate().toLocaleDateString() }}
        </p>
        <p><strong>Događaj:</strong> {{ reservation.eventData.name }}</p>
        <p>
          <strong>Datum događaja:</strong>
          {{ reservation.eventData.edate }}
        </p>
        <p><strong>Rezervirani stolovi:</strong> {{ reservation.rTables }}</p>
        <p><strong>Status rezervacije:</strong> {{ reservation.rStatus }}</p>
        <p v-if="amIAdmin">
          <strong>Rezervirao korisnik:</strong>{{ reservation.userEmail }}
        </p>
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
      amIAdmin: store.isAdmin,
      reservations: [],
    };
  },
  async created() {
    await this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        let reservationsRef;

        //ADMIN: fetch all reservations across all users
        if (this.userEmail === "neven@zd.zd") {
          console.log("***IAM ADMIN");
          // Admin: Fetch all reservations across all users
          const userDocs = await db.collection("reservations").get();

          // Fetch reservations for each user document
          this.reservations = await Promise.all(
            userDocs.docs.map(async (userDoc) => {
              const userEmail = userDoc.id; // Email as document ID
              // Access the "reservations" subcollection for this user
              const userReservations = await db
                .collection("reservations")
                .doc(userEmail)
                .collection("reservations")
                .get();

              // Map through each reservation and fetch event details
              return await Promise.all(
                userReservations.docs.map(async (reservationDoc) => {
                  const reservationData = {
                    id: reservationDoc.id,
                    ...reservationDoc.data(),
                    userEmail, // Attach user email to each reservation
                  };
                  // Assuming each reservation document has an `eventId` field
                  const eventId = reservationData.rEvent;
                  if (eventId) {
                    // Fetch event details from the events collection
                    const eventDoc = await db
                      .collection("posts")
                      .doc(eventId)
                      .get();
                    if (eventDoc.exists) {
                      reservationData.eventData = eventDoc.data(); // Attach event details to the reservation
                      console.log(reservationData.eventData.name);
                    } else {
                      console.warn(`Event with ID ${eventId} not found.`);
                    }
                  }

                  return reservationData;
                }),
              );
            }),
          ).then((reservations) => reservations.flat()); // Flatten the array of arrays
        } else {
          // Reference to the user's reservations subcollection
          reservationsRef = db
            .collection("reservations")
            .doc(this.userEmail)
            .collection("reservations");
        }
        // Fetch all documents in the reservations subcollection
        const snapshot = await reservationsRef.get();

        // Map each reservation and fetch event details
        this.reservations = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const reservationData = { id: doc.id, ...doc.data() };

            // Assuming each reservation document has an `eventId` field
            const eventId = reservationData.rEvent;
            if (eventId) {
              // Fetch event details from the events collection
              const eventDoc = await db.collection("posts").doc(eventId).get();
              if (eventDoc.exists) {
                reservationData.eventData = eventDoc.data(); // Attach event details to the reservation
                console.log(reservationData.eventData.name);
              } else {
                console.warn(`Event with ID ${eventId} not found.`);
              }
            }

            return reservationData;
          }),
        );
      } catch (error) {
        console.error("Error fetching reservations and events:", error);
      }
    },
  },
};
</script>

<style scoped></style>
