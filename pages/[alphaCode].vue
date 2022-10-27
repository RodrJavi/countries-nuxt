<script setup>
import { pushScopeId } from "vue";

let name = useRoute().params.alphaCode;

const { data: all } = await useFetch("https://restcountries.com/v2/all");

const country = computed(() => {
  let container;
  for (let i = 0; i < all.value.length; i++) {
    if (all.value[i].alpha3Code === name) {
      container = all.value[i];
    }
  }
  return container;
});

const neighbors = computed(() => {
  let names = [];
  let codes = [];
  let combo = { names, codes };
  if (country.value.hasOwnProperty("borders")) {
    for (let i = 0; i < all.value.length; i++) {
      for (let j = 0; j < country.value.borders.length; j++) {
        if (all.value[i].alpha3Code === country.value.borders[j]) {
          names.push(all.value[i].name);
          codes.push(all.value[i].alpha3Code);
        }
      }
    }
    return combo;
  }
});

const numFor = Intl.NumberFormat("en-US");
</script>
<template>
  <div class="flex justify-center w-full">
    <div
      class="flex flex-col pt-10 pb-5 px-3 lg:p-0 lg:my-14 lg:w-full lg:justify-between"
    >
      <div
        class="flex inline-block shadow-lg items-center rounded max-w-fit justify-center bg-white gap-1 px-6 py-1 text-lg dark:bg-dblue"
      >
        <Icon name="iconoir:arrow-left" size="18px"> </Icon>
        <NuxtLink to="/"> Back </NuxtLink>
      </div>

      <div
        class="flex flex-col lg:flex-row lg:gap-20 lg:my-14 lg:justify-center"
      >
        <img
          :src="country.flags.svg"
          alt=""
          class="mt-11 mb-9 max-w-[300px] lg:m-0 lg:max-w-none lg:w-[500px] lg:h-[325px]"
        />
        <div class="flex flex-col lg:justify-between lg:py-6">
          <h1 class="my-4 font-extrabold text-lg">{{ country.name }}</h1>
          <div class="flex flex-col lg:flex-row gap-2 lg:gap-14 text-lg">
            <div class="flex flex-col">
              <span
                ><span class="font-semibold">Native Name: </span>
                {{
                  country.hasOwnProperty("nativeName")
                    ? country.nativeName
                    : "No native Name"
                }}</span
              >
              <span v-if="country.hasOwnProperty('population') == true"
                ><span class="font-semibold">Population: </span
                >{{ numFor.format(country.population) }}
              </span>
              <span v-if="country.hasOwnProperty('region') == true"
                ><span class="font-semibold">Region: </span
                >{{ country.region }}</span
              >
              <span v-if="country.hasOwnProperty('subregion') == true"
                ><span class="font-semibold">Sub Region: </span
                >{{ country.subregion }}</span
              >
              <span
                ><span class="font-semibold">Capital: </span
                >{{
                  country.hasOwnProperty("capital")
                    ? country.capital
                    : `${country.name} has no capital!`
                }}</span
              >
            </div>
            <br />
            <div class="flex flex-col">
              <span
                ><span class="font-semibold">Top Level Domain: </span
                >{{
                  country.hasOwnProperty("topLevelDomain")
                    ? country.topLevelDomain[0]
                    : `${country.name} has no top level domain!`
                }}</span
              >
              <span
                ><span class="font-semibold">Currencies: </span
                >{{
                  country.hasOwnProperty("currencies")
                    ? country.currencies[0].name
                    : `${country.name} has no currency!`
                }}</span
              >
              <span v-if="country.hasOwnProperty('languages') == true">
                <span class="font-semibold">Languages: </span>
                {{ country.languages.map((l) => l.name).join(", ") }}
              </span>
            </div>
          </div>
          <br />
          <div class="flex flex-row flex-wrap gap-2">
            <span class="font-semibold">Border Countries:</span>
            <div
              v-if="country.hasOwnProperty('borders') == true"
              class="flex flex-row flex-wrap gap-2"
            >
              <NuxtLink
                v-for="(neighbor, index) in neighbors.names"
                class="shadow-lg rounded bg-white px-6 py-1 dark:bg-dblue"
                :to="neighbors.codes[index]"
              >
                {{ neighbor }}
              </NuxtLink>
            </div>
            <div v-else>
              <span>{{ `${country.name} has no bordering neighbors!` }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
