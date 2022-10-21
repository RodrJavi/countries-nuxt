<script setup>
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<template>
  <div
    class="bg-vlgray flex flex-col justify-center dark:bg-vdblue dark:text-white"
  >
    <div class="bg-white flex justify-between px-3 py-5 dark:bg-dblue">
      <h1 class="font-extrabold">Where in the world?</h1>
      <button @click="toggleDark()">Dark mode</button>
    </div>
    <div class="px-5">
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>
