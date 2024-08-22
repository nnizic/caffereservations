<template>
  <div id="gallery">
    <photo-card v-for="card in filteredCards" :key="card.id" :info="card" />
  </div>
</template>
<script>
import store from "@/store";
import PhotoCard from "@/components/PhotoView.vue";
import { db } from "@/firebase";
export default {
  name: "galleryView",
  data: function () {
    return {
      cards: [],
      store,
      ImageReference: null,
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      db.collection("posts")
        .orderby("posted_at", "desc")
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
    filterCards() {
      let termin = this.store.searchTerm;

      return this.cards.filter((card) => card.desccription.includes(termin));
    },
  },
  components: {
    PhotoCard,
  },
};
</script>
<style lang="scss"></style>
