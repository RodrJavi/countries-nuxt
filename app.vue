<script setup>
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<template>
  <div
    class="min-h-screen bg-vlgray flex flex-col dark:bg-vdblue dark:text-white"
  >
    <div class="bg-white flex justify-between px-3 py-5 md:px-9 dark:bg-dblue">
      <h1 class="font-extrabold">Where in the world?</h1>
      <button @click="toggleDark()">Dark mode</button>
    </div>
    <div class="px-5 md:px-9">
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>
