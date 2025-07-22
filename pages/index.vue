<script setup>
const area = ref("");
const search = ref("");
const { data: countries, error } = await useFetch(
  "https://restcountries.com/v3.1/all?fields=name,region,population,capital,flags,alpha3Code,cca3"
);
if (error.value) {
  console.log("Error object:", error);
  console.error(
    "Failed to fetch countries:",
    error.value.message || error.value
  );
}
const regions = computed(() => {
  if (!countries.value) return [];
  let names = [];
  for (let i = 0; i < countries.value.length; i++) {
    const region = countries.value[i].region;
    if (!names.includes(region)) {
      names.push(region);
    }
  }
  return names;
});

const filteredCountries = computed(() => {
  return countries.value.filter((country) =>
    country.region.toLowerCase().includes(area.value.toLowerCase())
  );
});

const searched = computed(() => {
  if (area.value == "") {
    return countries.value.filter((country) =>
      country.name.official.toLowerCase().includes(search.value.toLowerCase())
    );
  } else {
    return filteredCountries.value.filter((country) =>
      country.name.official.toLowerCase().includes(search.value.toLowerCase())
    );
  }
});

const results = computed(() => {
  if (search.value != "") {
    return searched;
  } else if (area.value != "") {
    return filteredCountries;
  } else {
    return false;
  }
});

const numberFormatter = Intl.NumberFormat("en-US");
</script>
<template>
  <div class="flex flex-col py-5">
    <!-- Input field -->
    <div
      class="flex flex-col gap-10 md:flex-row md:items-center md:justify-between"
    >
      <div
        class="flex items-center bg-white rounded-md h-[49px] dark:bg-dblue px-6 md:w-1/3"
      >
        <Icon name="iconoir:search" size="24px" class="dark:bg-dblue"></Icon>
        <input
          class="md:w-full bg-transparent"
          type="text"
          placeholder="Search for a country..."
          name=""
          id=""
          v-model="search"
        />
      </div>
      <!-- Region dropdown -->
      <select
        class="flex justify-items-start w-52 py-3 pl-5 md:my-6 h-[49px] rounded-md md:py-0 dark:bg-dblue"
        name=""
        id=""
        placeholder="Filter by Region"
        v-model="area"
      >
        <option class="" value="">Filter by Region</option>
        <option :value="region" v-for="region in regions">
          {{ region }}
        </option>
      </select>
    </div>
    <!-- Countries list -->
    <div class="md:flex md:flex-row md:flex-wrap gap-20" v-if="!results">
      <NuxtLink
        v-for="country in countries"
        class="flex flex-col justify-between bg-white mx-10 shadow-xl md:mx-0 my-5 rounded-md overflow-hidden md:w-[280px] dark:bg-dblue"
        :to="`/${country.cca3}`"
      >
        <img :src="country.flags.svg" class="h-[176px] object-cover" alt="" />
        <div class="px-5 pb-10 pt-3 flex flex-col dark:bg-dblue">
          <h2 class="font-extrabold my-3">
            {{ country.name.official }}
          </h2>
          <span class="">
            <span class="font-semibold">Population:</span>
            {{ numberFormatter.format(country.population) }}
          </span>
          <span>
            <span class="font-semibold">Region:</span> {{ country.region }}
          </span>
          <span>
            <span class="font-semibold">Capital:</span>
            {{ country.capital[0] }}
          </span>
        </div>
      </NuxtLink>
    </div>
    <div class="md:flex md:flex-row md:flex-wrap md:justify-between" v-else>
      <NuxtLink
        v-for="country in results.value"
        class="flex flex-col justify-between bg-white mx-10 shadow-xl md:mx-0 my-5 rounded-md overflow-hidden md:w-[280px] dark:bg-dblue"
        :to="`/${country.cca3}`"
      >
        <img :src="country.flags.svg" class="h-[176px] object-cover" alt="" />
        <div class="px-5 pb-10 pt-3 flex flex-col dark:bg-dblue">
          <h2 class="font-extrabold my-3">{{ country.name.official }}</h2>
          <span class="">
            <span class="font-semibold">Population:</span>
            {{ numberFormatter.format(country.population) }}
          </span>
          <span>
            <span class="font-semibold">Region:</span> {{ country.region }}
          </span>
          <span>
            <span class="font-semibold">Capital:</span>
            {{ country.capital[0] }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
