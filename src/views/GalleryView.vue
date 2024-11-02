<template>
  <div id="gallery">
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
</template>
<script>
import store from "@/store";
import router from "@/router";
import PhotoCard from "@/components/PhotoView.vue";
import { db } from "@/firebase";
export default {
  name: "galleryView",
  data: function () {
    return {
      cards: [],
      store,
      router,
      ImageReference: null,
    };
  },
  mounted() {
    this.amIAdmin();
    this.getPosts();
  },
  methods: {
    amIAdmin() {
      if (store.isAdmin) {
        console.log("amIADmin:", store.isAdmin);
        router.push("admingallery");
      }
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
              etime: data.etime,
              edate: data.edate,
              eTableStyle: data.eTableStyle,
              description: data.desc,
              url: data.url,
            });
          });
        });
    },
  },
  computed: {
    filteredCards() {
      let termin = this.store.searchTerm;

      let newCards = [];
      for (let card of this.cards) {
        if (card.name.includes(termin)) {
          newCards.push(card);
          console.log(newCards);
        }
      }
      return newCards;
    },
  },
  components: {
    PhotoCard,
  },
};
</script>
<style lang="scss">
#searchbar a.active {
  border: black;
}
#searchterm {
  width: 20em;
}
</style>
