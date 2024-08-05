<template>
  <div id="app">
    <header>
      <brand-name />
    </header>

    <router-view />
    <nav v-if="showMenu()">
      <div class="menu" :class="{ active: isActive }">
        <div class="toggle" @click="toggleMenu"><MdAddIcon /></div>
        <li style="--i: 0">
          <div @click="toggleMenu">
            <router-link to="/" class="router"><MdBeerIcon /></router-link>
          </div>
        </li>
        <li style="--i: 1">
          <div @click="toggleMenu">
            <router-link to="/about" class="router"
              ><MdAppsIcon />
            </router-link>
          </div>
        </li>
        <li style="--i: 2">
          <div @click="toggleMenu">
            <router-link to="/login" class="router"
              ><MdPersonIcon
            /></router-link>
          </div>
        </li>
        <li style="--i: 3">
          <div @click="toggleMenu">
            <router-link to="/signup" class="router"
              ><MdPersonAddIcon
            /></router-link>
          </div>
        </li>
      </div>
    </nav>
  </div>
</template>
<script>
import MdAddIcon from 'vue-ionicons/dist/md-add.vue';
import MdPersonIcon from 'vue-ionicons/dist/md-person.vue';
import MdPersonAddIcon from 'vue-ionicons/dist/md-person-add.vue';
import MdAppsIcon from 'vue-ionicons/dist/md-apps.vue';
import MdBeerIcon from 'vue-ionicons/dist/md-beer.vue';
import BrandName from './components/BrandName.vue';
import router from '@/router';

export default {
  components: {
    MdAddIcon,
    MdPersonIcon,
    MdPersonAddIcon,
    MdAppsIcon,
    MdBeerIcon,
    BrandName,
  },
  data() {
    return {
      isActive: false,
      router,
    };
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    },
    showMenu() {
      if (
        router.currentRoute.path !== '/signup'
        && router.currentRoute.path !== '/login'
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss">
@import "~vue-ionicons/ionicons.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  min-height: 100vh;
  background: linear-gradient(45deg, #8460ed, #ff1252);
}
nav {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.menu {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu li {
  position: absolute;
  left: 0;
  list-style: none;
  transform-origin: 100px;
  transition: 0.5s;
  transition-delay: calc(0.1s * var(--i));
  transform: rotate(0deg) translateX(80px);
}

.menu.active li {
  transform: rotate(calc(480deg / 8 * var(--i)));
}

.menu li .router {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  transform: rotate(calc(480deg / -8 * var(--i)));
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  color: #111;
  transition: 0.5s;
}
.menu li .router:hover {
  color: #ff1252;
}
.menu li .router-link-exact-active {
  background-color: indianred;
}

.toggle {
  position: absolute;
  width: 60px;
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0, 3px, 4px, rgba(0, 0, 0, 0.15);
  font-size: 2em;
  transition: 1.25s;
}

.menu.active .toggle {
  background-color: indianred;
  transform: rotate(315deg);
}
</style>
