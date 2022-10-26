<script setup>
let name = useRoute().params.alphaCode;

const { data: country, refresh } = await useFetch(
  `https://restcountries.com/v2/alpha/${name}`
);

const { data: all } = await useFetch("https://restcountries.com/v2/all");

const neighbors = computed(() => {
  let names = [];
  let codes = [];
  let combo = { names, codes };
  if (country.value.borders != "") {
    for (var i = 0; i < all.value.length; i++) {
      for (var j = 0; j < country.value.borders.length; j++) {
        if (all.value[i].alpha3Code === country.value.borders[j]) {
          names.push(all.value[i].name);
          codes.push(all.value[i].alpha3Code);
        }
      }
    }
  }
  return combo;
});

const numFor = Intl.NumberFormat("en-US");

refresh();
</script>
<template>
  <div class="flex justify-center w-full">
    <div
      class="flex flex-col pt-10 pb-5 px-3 my-10 lg:p-0 lg:my-14 lg:w-full lg:justify-between"
    >
      <NuxtLink
        class="shadow-lg rounded bg-white px-3 py-1 text-lg w-24 dark:bg-dblue"
        to="/"
      >
        Back
      </NuxtLink>
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
                ><span class="font-semibold">Native Name: </span
                >{{ country.nativeName }}</span
              >
              <span
                ><span class="font-semibold">Population: </span
                >{{ numFor.format(country.population) }}</span
              >
              <span
                ><span class="font-semibold">Region: </span
                >{{ country.region }}</span
              >
              <span
                ><span class="font-semibold">Sub Region: </span
                >{{ country.subregion }}</span
              >
              <span
                ><span class="font-semibold">Capital: </span
                >{{ country.capital }}</span
              >
            </div>
            <br />
            <div class="flex flex-col">
              <span
                ><span class="font-semibold">Top Level Domain: </span
                >{{ country.topLevelDomain[0] }}</span
              >
              <span
                ><span class="font-semibold">Currencies: </span
                >{{ country.currencies[0].name }}</span
              >
              <span
                ><span class="font-semibold">Languages: </span
                ><span v-for="(languages, index) in country.languages"
                  >{{ languages.name
                  }}<span v-if="index != languages.length - 1">, </span>
                </span></span
              >
            </div>
          </div>
          <br />
          <div class="flex flex-row flex-wrap gap-2">
            <span class="font-semibold">Border Countries:</span>
            <div v-if="neighbors">
              <NuxtLink
                v-for="(neighbor, index) in neighbors.names"
                class="shadow-lg rounded bg-white dark:bg-dblue"
                :to="neighbors.codes[index]"
              >
                {{ neighbor }}
              </NuxtLink>
            </div>
            <div v-else="!neighbors">
              <h2>NO NEIGHBORS</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
