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
          <br />
          <button
            type="button"
            class="btn btn-secondary"
            @click="
              toggleReservations(
                reservation.userEmail,
                reservation.id,
                reservation.rEvent,
                reservation.rTables,
              )
            "
          >
            Potvrdi rezervaciju
          </button>
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

        //ADMIN: dohvati sve rezervacije za sve korisnike
        if (this.amIAdmin) {
          console.log("***IAM ADMIN");

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
          ).then((reservations) => reservations.flat()); // Spljošti u jedan array?
        } else {
          // Referenca na korisničku subcollection 'reservations'
          reservationsRef = db
            .collection("reservations")
            .doc(this.userEmail)
            .collection("reservations");
        }
        // dohvati sve dokumente iz subcollection
        const snapshot = await reservationsRef.get();

        // Map-iraj svaku rezervaciju i dohvati podatke o događaju
        this.reservations = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const reservationData = { id: doc.id, ...doc.data() };

            // rEvent je ID događaja u kolekciji posts
            const eventId = reservationData.rEvent;
            if (eventId) {
              // Dohvati podatke o događaju
              const eventDoc = await db.collection("posts").doc(eventId).get();
              if (eventDoc.exists) {
                reservationData.eventData = eventDoc.data(); // Dodaj podatke o događaju rezervaciji
                console.log(reservationData.eventData.name);
              } else {
                console.warn(`Događaj sa ID ${eventId} nije pronađen.`);
              }
            }

            return reservationData;
          }),
        );
      } catch (error) {
        console.error("Greška u dohvaćanju podataka:", error);
      }
    },
    async toggleReservations(userEmail, reservationId, eventId, tablesNum) {
      try {
        console.log("UserMail:" + userEmail);
        console.log("ResID:" + reservationId);
        console.log("Tables:" + tablesNum);
        console.log("EventID:" + eventId);

        // Referenaca na korisnikov dokument sa subcollection za rezervacije
        const reservationsRef = db
          .collection("reservations")
          .doc(userEmail)
          .collection("reservations")
          .doc(reservationId);
        console.log(reservationsRef);
        // Referenca na događaj za koji je rezervacija
        const eventRef = db.collection("posts").doc(eventId);

        //mijenanje podataka - potvrda rezervacije, promjena boje stola
        await reservationsRef.update({ rStatus: "rezervacija potvrđena" });
        // Dohvati array klasa za boje stolova iz dokumenta
        const eventDoc = await eventRef.get();
        if (eventDoc.exists) {
          const eventData = eventDoc.data();
          const eTableStyle = eventData.eTableStyle || [];

          // Update the specific indices in the statusArray
          tablesNum.forEach((index) => {
            eTableStyle[index - 1] = "tableview3";
          });

          // Write the updated array back to the event document
          await eventRef.update({ eTableStyle });
        } else {
          console.warn(`Event with ID ${eventId} not found.`);
        }

        alert(`Rezervacija ${reservationId} uspješno izmjenjena.`);
      } catch (error) {
        alert("Greška prilikom mijenjanja podataka:", error);
      }
    },
  },
};
</script>

<style scoped></style>
