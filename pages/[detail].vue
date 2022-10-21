<script setup>
let name = useRoute().params.detail;
const { data: country } = await useFetch(
  `https://restcountries.com/v2/alpha/${name}`
);
</script>
<template>
  <div>
    <NuxtLink to="/"> Back </NuxtLink>
    <img :src="country.flags.svg" alt="" />
    <h1>{{ country.name }}</h1>
    <div class="flex flex-col">
      <span><span>Native Name: </span>{{ country.nativeName }}</span>
      <span><span>Population: </span>{{ country.population }}</span>
      <span><span>Region: </span>{{ country.region }}</span>
      <span><span>Sub Region: </span>{{ country.subregion }}</span>
      <span><span>Capital: </span>{{ country.capital }}</span>
      <br />
      <span><span>Top Level Domain: </span>{{ country.tld }}</span>
      <span><span>Currencies: </span>{{ country.currencies[0].name }}</span>
      <span
        ><span>Languages: </span
        ><span v-for="(languages, index) in country.languages"
          >{{ languages.name
          }}<span v-if="index != languages.length - 1">, </span>
        </span></span
      >
    </div>
  </div>
</template>
