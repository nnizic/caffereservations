<template>
  <div id="calendarpicker">
    <v-date-picker
      class="picker"
      v-model="date"
      @dayclick="onDayClick"
      locale="hr"
    >
      <template v-slot="{ inputValue, togglePopover }">
        <div class="flex">
          <div class="flex">
            <!-- Button to toggle the date picker -->
            <button @click="togglePopover">
              <img src="../assets/calendar_icon.png" width="20" />
            </button>

            <!-- Read-only input to display the selected date -->
            <input class="inputbox" :value="inputValue" readonly />
          </div>
        </div>
      </template>
    </v-date-picker>
    <br />
    {{ "Datum događaja: " + dday }}
  </div>
</template>

<script>
export default {
  name: "calendarPicker",
  dday: "",
  data() {
    return {
      date: new Date(),
    };
  },

  methods: {
    onDayClick(day) {
      this.dday = day.id;
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  padding: 0.5rem;
  background-color: #ebf8ff;
  border: 1px solid #bee3f8;
  color: #2b6cb0;
  border-radius: 0.375rem 0 0 0.375rem;
  transition: background-color 0.2s ease-in-out;
}
button:hover {
  background-color: #90cdf4;
}
.inputbox {
  background-color: white;
  color: #4a5568;
  width: 100%;
  padding: 0.25rem 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 0 0.375rem 0.375rem 0;
  outline: none;
}
.picker {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
