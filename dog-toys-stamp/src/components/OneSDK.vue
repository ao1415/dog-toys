<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useOneSDKStore } from "@/stores/OneSDK";
const oneSdkStore = useOneSDKStore();

const done = ref(false);

onMounted(() => {
  const scriptEl = document.createElement("script");
  const url = (() => {
    if (import.meta.env.DEV) {
      return "./onesdk.js";
    } else {
      return "../__origin/js/onesdk.js";
    }
  })();
  scriptEl.setAttribute("src", url);
  document.body.appendChild(scriptEl);

  scriptEl.onload = async () => {
    if (!done.value) {
      oneSdkStore.oneSDK = OneSDK;
      await oneSdkStore.init();
      done.value = true;
    }
  };
});
</script>

<template>
  <slot v-if="done"></slot>
</template>
