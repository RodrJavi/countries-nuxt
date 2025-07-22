<script setup>
let name = useRoute().params.alphaCode;

const { data: all } = await useFetch(
  "https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,region,subregion,capital,borders,languages,currencies"
);

const country = computed(() => {
  if (!all.value) return null;
  return all.value.find((c) => c.cca3 === name) || null;
});

console.log("Country data:", country.value);

const numFor = Intl.NumberFormat("en-US");
</script>
<template>
  <div class="flex justify-center w-full">
    <div
      class="flex flex-col pt-10 pb-5 px-3 lg:p-0 lg:my-14 lg:w-full lg:justify-between"
    >
      <NuxtLink
        class="flex inline-block shadow-lg items-center rounded max-w-fit justify-center bg-white gap-1 px-6 py-1 text-lg dark:bg-dblue"
        to="/"
      >
        <Icon name="iconoir:arrow-left" size="18px"> </Icon>
        <span> Back </span>
      </NuxtLink>

      <div
        class="flex flex-col lg:flex-row lg:gap-20 lg:my-14 lg:justify-center"
      >
        <img
          v-if="country && country.flags"
          :src="country.flags.svg"
          alt=""
          class="mt-11 mb-9 max-w-[300px] lg:m-0 lg:max-w-none lg:w-[500px] lg:h-[325px]"
        />
        <div class="flex flex-col lg:justify-between lg:py-6">
          <h1 v-if="country" class="my-4 font-extrabold text-lg">
            {{ country.name.official }}
          </h1>
          <span v-else>No country data available</span>

          <div class="flex flex-col lg:flex-row gap-2 lg:gap-14 text-lg">
            <div class="flex flex-col">
              <span
                ><span class="font-semibold">Native Name: </span>
                {{
                  country.hasOwnProperty("nativeName")
                    ? country.name.nativeName.eng.official
                    : "No native Name"
                }}</span
              >

              <span v-if="country.hasOwnProperty('population')"
                ><span class="font-semibold">Population: </span
                >{{ numFor.format(country.population) }}
              </span>

              <span v-if="country.hasOwnProperty('region')"
                ><span class="font-semibold">Region: </span
                >{{ country.region }}</span
              >

              <span v-if="country.hasOwnProperty('subregion')"
                ><span class="font-semibold">Sub Region: </span
                >{{ country.subregion }}</span
              >

              <span
                ><span class="font-semibold">Capital: </span
                >{{
                  country.hasOwnProperty("capital")
                    ? country.capital[0]
                    : `${country.name.official} has no capital!`
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
                    : `${country.name.official} has no top level domain!`
                }}</span
              >
              <span>
                <span class="font-semibold">Currencies: </span
                >{{
                  country.hasOwnProperty("currencies")
                    ? Object.keys(country.currencies).join(", ")
                    : `${country.name.official} has no currency!`
                }}</span
              >
              <span v-if="country?.languages">
                <span class="font-semibold">Languages: </span>
                {{ Object.values(country.languages).join(", ") }}
              </span>
              <span v-else>No languages available</span>
            </div>
          </div>
          <br />
          <!-- <div class="flex flex-row flex-wrap gap-2">
            <span class="font-semibold">Border Countries:</span>
            <div
              v-if="country.hasOwnProperty('borders') == true"
              class="flex flex-row flex-wrap gap-2"
            >
              <div
                v-if="country.borders.length > 0"
                class="flex flex-row flex-wrap gap-2"
              >
                <NuxtLink
                  v-for="border in country.borders"
                  :key="index"
                  class="shadow-lg rounded bg-white px-6 py-1 dark:bg-dblue"
                  :to="`/${border}`"
                >
                  {{ border }}
                </NuxtLink>
              </div>
              <div v-else>
                <span>{{
                  `${
                    country?.name?.official || "This country"
                  } has no bordering neighbors!`
                }}</span>
              </div>
            </div>
            <div v-else>
              <span>{{
                `${country.name.official} has no bordering neighbors!`
              }}</span>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
