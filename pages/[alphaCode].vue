<script setup>
let name = useRoute().params.alphaCode;

const { data: country, refresh } = await useFetch(
  `https://restcountries.com/v2/alpha/${name}`
);

const numFor = Intl.NumberFormat("en-US");

refresh();
</script>
<template>
  <div class="flex justify-center">
    <div class="pt-10 pb-5 px-3 my-10 lg:p-0 lg:my-14">
      <NuxtLink
        class="shadow-lg rounded bg-white px-3 py-1 text-lg dark:bg-dblue"
        to="/"
      >
        Back
      </NuxtLink>
      <div class="flex flex-col lg:flex-row lg:gap-20 lg:my-14">
        <img
          :src="country.flags.svg"
          alt=""
          class="mt-11 mb-9 max-w-[300px] lg:m-0 lg:max-w-none lg:w-[475px] lg:h-[300px]"
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
          <div class="flex flex-row gap-2">
            <span class="font-semibold">Border Countries:</span>
            <NuxtLink
              v-for="border in country.borders"
              class="shadow-lg rounded bg-white dark:bg-dblue"
              :to="border"
            >
              {{ border }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
