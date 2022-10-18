<script setup>
const area = ref("");
const search = ref("");
const { data: countries } = await useFetch("https://restcountries.com/v2/all");
const regions = computed(() => {
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
  let filtered = [];
  for (let i = 0; i < countries.value.length; i++) {
    const region = countries.value[i].region;
    if (region == area.value) {
      filtered.push(countries.value[i]);
    }
  }
  return filtered;
});

const searched = computed(() => {
  // let names = [];
  // for (let i = 0; i < countries.value.length; i++) {
  //   const name = countries.value[i].name;
  //   if (name.toLowerCase().includes(search.value.toLowerCase())) {
  //     names.push(countries.value[i]);
  //   }
  // }
  // return names;
  return countries.value.filter((country) =>
    country.name.toLowerCase().includes(search.value.toLowerCase())
  );
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
</script>
<template>
  <div class="flex flex-col py-5">
    <input
      class="mb-7 h-10"
      type="text"
      placeholder="Search for a country..."
      name=""
      id=""
      v-model="search"
    />
    <select
      class="flex justify-items-start w-52 py-3 pl-5"
      name=""
      id=""
      placeholder="Filter by Region"
      v-model="area"
    >
      <option class="" value="" disabled selected>Filter by Region</option>
      <option :value="region" v-for="region in regions">
        {{ region }}
      </option>
    </select>
    <!-- <pre>{{ { area, regions, filteredCountries } }}</pre> -->
    <!-- <pre>{{ results }}</pre> -->
    <div v-if="!results">
      <div
        v-for="country in countries"
        class="flex flex-col bg-white border-solid border-2 border-vdblue mx-10 my-5 rounded-md overflow-hidden"
      >
        <img :src="country.flags.svg" alt="" />
        <div class="px-5 pb-10 pt-3 flex flex-col">
          <h2 class="font-extrabold my-3">{{ country.name }}</h2>
          <span class="">
            <span class="font-semibold">Population:</span>
            {{ country.population }}
          </span>
          <span>
            <span class="font-semibold">Region:</span> {{ country.region }}
          </span>
          <span>
            <span class="font-semibold">Capital:</span>
            {{ country.capital }}
          </span>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        v-for="country in results.value"
        class="flex flex-col bg-white border-solid border-2 border-vdblue mx-10 my-5 rounded-md overflow-hidden"
      >
        <img :src="country.flags.svg" alt="" />
        <div class="px-5 pb-10 pt-3 flex flex-col">
          <h2 class="font-extrabold my-3">{{ country.name }}</h2>
          <span class="">
            <span class="font-semibold">Population:</span>
            {{ country.population }}
          </span>
          <span>
            <span class="font-semibold">Region:</span> {{ country.region }}
          </span>
          <span>
            <span class="font-semibold">Capital:</span>
            {{ country.capital }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>