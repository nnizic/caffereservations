<template>
  <div id="gallery">
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
        if (card.description.includes(termin)) {
          newCards.push(card);
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
<style lang="scss"></style>
