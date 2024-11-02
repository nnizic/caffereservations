<template>
  <div class="card text-center">
    <div class="card-header">
      <h4>{{ info.name }}</h4>
      {{ info.edate }}
    </div>
    <div class="card-header">
      {{ info.description }} <br />Početak u {{ info.etime }}
      <button
        v-if="store.currentUser"
        type="button"
        class="btn btn-secondary"
        @click="gotoReservation"
      >
        Rezerviraj mjesto
      </button>
    </div>
    <div class="card-body p-0">
      <img class="card-img-top" :src="info.url" />
    </div>
    <div class="card-footer text-muted">
      {{ postedFromNow }}
      <hr />
      {{ weatherR }}
      <i :class="fetchWeatherIcon" style="font-size: 36px"></i>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import store from "@/store";

export default {
  props: ["info"],
  data: function () {
    return {
      weatherR: "Zasada bez dostupnih podataka",
      iconR: "nema ikone",
      store,
      eventDay: this.info.edate,
      eventTime: this.info.etime,
      tableStyle: this.info.eTableStyle,
    };
  },
  name: "PhotoCard",
  computed: {
    postedFromNow() {
      return moment(this.info.time).locale("hr").fromNow();
    },
    fetchWeatherIcon() {
      switch (this.iconR) {
        case "clear-night":
          return "fas fa-moon";
        case "partly-cloudy-day":
          return "fas fa-cloud-sun";
        case "partly-cloudy-night":
          return "fas fa-cloud-moon";
        case "cloudy":
          return "fas fa-cloud";
        case "rain":
          return "fas fa-cloud-rain";
        case "clear-day":
          return "fas fa-sun";
        case "wind":
          return "fas fa-wind";
        default:
          return "no icon found";
      }
    },
  },
  methods: {
    async fetchWeatherData() {
      try {
        console.log("EVENTDATE: " + this.eventDay);
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Zadar/${this.eventDay}T${this.eventTime}?unitGroup=metric&key=ZQVJ86FZTZXZVSWNPT6CHURBH&contentType=json&include=current`,
          {
            method: "GET",
            headers: { accept: "application/json" },
          },
        );
        // ovo hvata ostale errore
        if (response.status !== 200) {
          console.error("Greška: " + response.status);
          this.weatherR = "Nema dostupnih podataka";
        } else {
          const data = await response.json();

          return data.currentConditions;
        }
      } catch (err) {
        // ovo hvata error 500
        console.error(err);
        this.weatherR = "Nema dostupnih podataka";
      }
    },

    getWeatherData() {
      this.fetchWeatherData().then((weatherData) => {
        this.weatherR = `Vremenska prognoza: Temperatura:${weatherData.temp} °C,  `;
        this.iconR = weatherData.icon;
      });
    },
    gotoReservation() {
      this.$router.push({
        path: "reservations",
        query: { tables: this.tableStyle },
      });
    },
  },
  mounted() {
    this.getWeatherData();
  },
};
</script>
<style lang="scss"></style>
