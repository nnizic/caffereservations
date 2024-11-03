<template>
  <div id="tableview">
    <table>
      <tr>
        <td>
          <label>
            <input
              @click="onTableClick(1)"
              type="radio"
              name="01"
              data-toggle="modal"
              data-target="#staticBackdrop"
            />
            <div id="table01" :class="circlestyle[0]"></div>
          </label>
        </td>

        <td>&nbsp; &nbsp;</td>
        <td>
          <label>
            <input
              @click="onTableClick(2)"
              type="radio"
              name="02"
              data-toggle="modal"
              data-target="#staticBackdrop"
            />
            <div id="table02" :class="circlestyle[1]"></div>
          </label>
        </td>
        <td>
          <label>
            <input
              @click="onTableClick(3)"
              type="radio"
              name="03"
              data-toggle="modal"
              data-target="#staticBackdrop"
            />
            <div id="table03" :class="circlestyle[2]"></div>
          </label>
        </td>
      </tr>

      <tr>
        <td>
          <label>
            <input
              @click="onTableClick(4)"
              type="radio"
              name="04"
              data-toggle="modal"
              data-target="#staticBackdrop"
            />
            <div id="table04" :class="circlestyle[3]"></div>
          </label>
        </td>

        <td>&nbsp; &nbsp;</td>
        <td>
          <label>
            <input
              @click="onTableClick(5)"
              type="radio"
              name="05"
              data-toggle="modal"
              data-target="#staticBackdrop"
            />
            <div id="table05" :class="circlestyle[4]"></div>
          </label>
        </td>
        <td>
          <label>
            <input
              @click="onTableClick(6)"
              type="radio"
              name="06"
              data-toggle="modal"
              data-target="#staticBackdrop"
            />
            <div id="table06" :class="circlestyle[5]"></div>
          </label>
        </td>
      </tr>

      <tr>
        <td>
          <label>
            <input
              @click="onTableClick(7)"
              type="radio"
              name="07"
              data-toggle="modal"
              data-target="#staticBackdrop"
            />
            <div id="table07" :class="circlestyle[6]"></div>
          </label>
        </td>

        <td>&nbsp; &nbsp;</td>
        <td>
          <label>
            <input
              @click="onTableClick(8)"
              type="radio"
              name="08"
              data-toggle="modal"
              data-target="#staticBackdrop"
            />
            <div id="table08" :class="circlestyle[7]"></div>
          </label>
        </td>
        <td>
          <label>
            <input
              @click="onTableClick(9)"
              type="radio"
              name="09"
              data-toggle="modal"
              data-target="#staticBackdrop"
            />
            <div id="table09" :class="circlestyle[8]"></div>
          </label>
        </td>
      </tr>
    </table>
    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Rezerviraj</h5>
            <button
              type="button"
              class="close"
              aria-label="Close"
              data-dismiss="modal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div id="pics">
              <img :src="getImageSrc(1)" />

              <img :src="getImageSrc(2)" />
            </div>
          </div>

          <div>Broj stola: {{ tableNum }}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Odustani
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="changeColor"
              data-dismiss="modal"
            >
              Rezerviraj
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "@/firebase";
import store from "@/store";

async function geteTableStyle(postId) {
  try {
    // Reference the document in Firestore
    const postRef = db.collection("posts").doc(postId);

    // Fetch the document data
    const doc = await postRef.get();

    if (doc.exists) {
      // Extract the array from the document data
      const data = doc.data();
      const arrayField = data.eTableStyle || []; // Default to empty array if not found

      console.log("Retrieved array:", arrayField);
      return arrayField; // Return the array if you need to use it elsewhere
    } else {
      console.log("No such document found!");
      return [];
    }
  } catch (error) {
    console.error("Error retrieving array from Firestore:", error);
    return [];
  }
}

export default {
  name: "tableView",
  data() {
    return {
      tableNum: 1, // The selected table number
      circlestyle: Array(9).fill("tableview"), // Initialize 9 circles with the 'tableview' class
    };
  },
  methods: {
    onTableClick(table) {
      this.tableNum = table;
    },
    changeColor() {
      if (this.tableNum !== null) {
        // Changes the specific circle's class to 'tableview2' (yellow)
        // Use Vue.set to ensure reactivity is triggered
        this.$set(this.circlestyle, this.tableNum - 1, "tableview2");
        this.$emit("data", this.tableNum); // Emits table number when clicked
      }
    },
    getImageSrc(num) {
      try {
        return require(`@/assets/images/${this.tableNum}/${num}.jpg`);
      } catch (e) {
        // Return a fallback image if the dynamic image is not found
        return require("@/assets/logo.png");
      }
    },
  },
  async mounted() {
    this.circlestyle = await geteTableStyle(store.activeEvent);
  },
};
</script>

<style>
label {
  width: 150px;
  height: 150px;
}
#tableview {
  display: flex;
  align-items: center;
  justify-content: center;
}
label input {
  appearance: none;
}
label .tableview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: green;
  background-image: url("@/assets/table.png");
  background-repeat: no-repeat;
  cursor: pointer;
}
label .tableview2 {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: yellow;
  background-image: url("@/assets/table.png");
  background-repeat: no-repeat;
  cursor: pointer;
}
label .tableview3 {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: red;
  background-image: url("@/assets/table.png");
  background-repeat: no-repeat;
  cursor: pointer;
}
#pics {
  display: flex;
}
#pics img {
  margin: 5px;
  padding: 10px;
  width: 180px;
  height: 150px;
}
</style>
