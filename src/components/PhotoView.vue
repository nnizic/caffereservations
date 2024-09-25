<template>
  <div class="card text-center">
    <div class="card-header">{{ info.description }}</div>
    <div class="card-body p-0">
      <img class="card-img-top" :src="info.url" />
    </div>
    <div class="card-footer text-muted">
      {{ postedFromNow }}
      <hr />
      {{ weatherR }}
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  props: ["info"],
  data: function () {
    return {
      weatherR: "Hello",
    };
  },
  name: "PhotoCard",
  computed: {
    postedFromNow() {
      return moment(this.info.time).locale("hr").fromNow();
    },
  },
  methods: {
    async fetchWeatherData() {
      try {
        const response = await fetch(
          "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Zadar?unitGroup=metric&key=ZQVJ86FZTZXZVSWNPT6CHURBH&contentType=json",
          {
            method: "GET",
            headers: { accept: "application/json" },
          },
        );

        const data = await response.json();

        // Map over the days and return the relevant information
        return data.days.map((day) => ({
          icon: day.icon,
          datetime: day.datetime,
          temperature: day.temp,
          description: day.description,
        }));
      } catch (err) {
        console.error(err);
      }
    },
    getWeatherData() {
      this.fetchWeatherData().then((weatherData) => {
        this.weatherR = weatherData[0].icon;
        console.log(this.weatherR);
      });
    },
  },
  mounted() {
    this.getWeatherData();
  },
};
</script>
<style lang="scss"></style>
