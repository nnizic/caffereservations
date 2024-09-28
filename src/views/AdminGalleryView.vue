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
          <calendar-picker />
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
      store,
      newEventName: "",
      newEventDescription: "",
      newImageUrl: "",
      imageReference: null,
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
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

        let doc = await db.collection("posts").add({
          url: url,
          name: eventName,
          desc: eventDescription,
          email: store.currentUser,
          posted_at: Date.now(),
        });
        alert("Spremljeno: ", doc);
        this.getPosts();
      } catch (e) {
        console.error("Greška: ", e);
      }
      this.loading = false;
    },
  },
  computed: {
    filteredCards() {
      let termin = this.store.searchTerm;

      let newCards = [];
      for (let card of this.cards) {
        if (card.description.includes(termin)) {
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
