<template>
  <div id="admingallery">
    <img
      v-if="loading"
      class="loading"
      :src="require('@/assets/loading.gif')"
    />
    <form v-if="!loading" @submit.prevent="postNewImage" class="mb-5">
      <croppa
        :width="400"
        :height="400"
        placeholder="Učitaj sliku..."
        v-model="imageReference"
      ></croppa>
      <div class="form-group"></div>
      <div class="form-group">
        <label for="imageDescription">Opis</label>
        <input
          v-model="newImageDescription"
          type="text"
          class="form-control ml-2"
          placeholder="unesi opis slike"
          id="imageDescription"
        />
      </div>
      <button type="submit" class="btn btn-primary ml-2">Objavi sliku</button>
    </form>
    <photo-card v-for="card in filteredCards" :key="card.id" :info="card" />
  </div>
</template>
<script>
import store from "@/store";
import PhotoCard from "@/components/PhotoView.vue";
import { db, storage } from "@/firebase";
export default {
  name: "adminGallery",
  data: function () {
    return {
      cards: [],
      store,
      newImageDescription: "",
      nawImageUrl: "",
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
    getImage() {
      return new Promise((resolveFn, errorFn) => {
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

        const imageDescription = this.newImageDescription;

        let doc = await db.collection("posts").add({
          url: url,
          desc: imageDescription,
          email: store.currentUser,
          posted_at: Date.now(),
        });

        this.getPosts();
      } catch (e) {
        console.error("Greška: ", e);
      }
      this.loading = false;
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
<style lang="scss" scoped>
.loading {
  width: 400px;
}
</style>
