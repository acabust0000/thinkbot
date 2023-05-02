<script lang="ts">
import { defineComponent } from "vue";
import config from "../config.json";
import Exchange from "./components/exchange.component";
import { EXCHANGES } from "./shared/defines";

(() => {
  for (let exchange in config.exchange)
    EXCHANGES[exchange] = new Exchange(exchange);
})();

export default defineComponent({
  name: "App",
});
</script>

<template>
  <router-view />
</template>
