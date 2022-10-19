<script setup>
const name = useRoute().params.detail;
const { data: country } = await useFetch(
  `https://restcountries.com/v2/name/${name}`
);
</script>
<template>
  <p>{{ country }}</p>
</template>
