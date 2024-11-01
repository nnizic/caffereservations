<template>
  <div id="admingallery">
    <div>
      <img
        v-if="loading"
        class="loading"
        :src="require('@/assets/loading.gif')"
      />
      <form v-if="!loading" @submit.prevent="postNewImage" class="mb-5">
        <div class="form-group">
          <croppa
            :width="400"
            :height="400"
            placeholder="Učitaj sliku..."
            v-model="imageReference"
          ></croppa>
        </div>
        <div>
          <label for="eventName">Naziv</label>
          <input
            v-model="newEventName"
            type="text"
            class="form-control"
            placeholder="unesi naziv"
            id="eventName"
          />
        </div>

        <div>
          Datum događaja:
          <calendar-picker @data="get" />
        </div>
        <div>
          <label for="eventTime">Vrijeme događaja</label>
          <input
            v-model="newEventTime"
            type="text"
            class="form-control"
            placeholder="20:00"
            id="eventTime"
          />
        </div>

        <div class="form-group">
          <label for="eventDescription">Opis</label>
          <input
            v-model="newEventDescription"
            type="text"
            class="form-control"
            placeholder="unesi opis događaja"
            id="eventDescription"
          />
        </div>
        <button type="submit" class="btn btn-outline-light">
          Objavi događaj
        </button>
      </form>
      <hr />
      <form id="searchbar" class="form-inline my-2">
        <input
          id="searchterm"
          v-model="store.searchTerm"
          class="form-control ml-auto mr-sm-2"
          type="search"
          placeholder="Pretraga"
          aria-label="Search"
        />

        <img src="@/assets/search.png" width="30" id="searchpic" />
      </form>

      <photo-card v-for="card in filteredCards" :key="card.id" :info="card" />
    </div>
  </div>
</template>
<script>
import store from "@/store";
import PhotoCard from "@/components/PhotoView.vue";
import calendarPicker from "@/components/CalendarPickerView.vue";
import { db, storage } from "@/firebase";
export default {
  name: "adminGallery",
  data: function () {
    return {
      loading: false,
      cards: [],
      data: "",
      store,
      newEventName: "",
      newEventDate: this.theDate(),
      newEventTime: "20:00:00",
      newEventDescription: "",
      newImageUrl: "",
      imageReference: null,
      newCircleStyle: Array(9).fill("tableview"), // Initialize 9 circles with the 'tableview' class
    };
  },
  mounted() {
    this.getPosts();
    console.log(this.newEventDate);
  },
  methods: {
    theDate() {
      const todayDate = new Date();
      const date1 = todayDate.getFullYear();
      const date2 = todayDate.getMonth() + 1;
      const date3 = todayDate.getDate();
      return date1 + "-" + date2 + "-" + date3;
    },

    get(value) {
      this.data = value;
      this.newEventDate = value;
      console.log(this.data, "-", value);
    },
    getPosts() {
      db.collection("posts")
        .orderBy("posted_at", "desc")
        .get()
        .then((query) => {
          this.cards = [];
          query.forEach((doc) => {
            const data = doc.data();

            this.cards.push({
              id: doc.id,
              time: data.posted_at,
              name: data.name,
              edate: data.edate,
              etime: data.etime,
              description: data.desc,
              url: data.url,
            });
          });
        });
    },
    getImage() {
      return new Promise((resolveFn) => {
        this.imageReference.generateBlob((data) => {
          resolveFn(data);
        });
      });
    },
    async postNewImage() {
      try {
        this.loading = true;
        let blobData = await this.getImage();
        let imageName =
          "posts/" + store.currentUser + "/" + Date.now() + ".png";
        let result = await storage.ref(imageName).put(blobData);
        let url = await result.ref.getDownloadURL();

        const eventDescription = this.newEventDescription;
        const eventName = this.newEventName;
        const eventDate = this.newEventDate;
        const eventTime = this.newEventTime;
        const eventTableStyle = this.newCircleStyle;

        let doc = await db.collection("posts").add({
          url: url,
          name: eventName,
          edate: eventDate,
          etime: eventTime,
          desc: eventDescription,
          eTableStyle: eventTableStyle,
          email: store.currentUser,
          posted_at: Date.now(),
        });
        alert("Spremljeno: ", doc);
        this.getPosts();
      } catch (e) {
        console.error("Greška: ", e);
      }
      this.loading = false;
      this.newEventName = "";
      this.newEventDescription = "";
      this.newEventDate = this.theDate();
    },
  },
  computed: {
    filteredCards() {
      let termin = this.store.searchTerm;

      let newCards = [];
      for (let card of this.cards) {
        if (card.name.includes(termin)) {
          newCards.push(card);
        }
      }
      return newCards;
    },
  },
  components: {
    PhotoCard,
    calendarPicker,
  },
};
</script>
<style lang="scss" scoped>
.loading {
  width: 400px;
}
#searchbar a.active {
  border: black;
}
#searchterm {
  width: 20em;
}
</style>
