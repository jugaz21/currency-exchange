<script setup lang="ts">
import CurrencyConverter from './components/CurrencyConverter.vue';
</script>

<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center xs:flex-col md:flex-row">
    <div class="max-w-7xl mx-auto">
      <h1 class="xs:text-[24px] md:text-[48px] font-medium text-white xs:text-center xs:mb-[6px] md:text-left">El mejor 
        <br/>tipo de cambio</h1>
        <p class="xs:text-[14px] md:text-[24px] font-regular text-white text-center xs:mb-[25px] xs:w-[78%] xs:mx-auto md:text-left md:m-[0]">para cambiar dólares y soles online en Perú</p>
    </div>
    <CurrencyConverter />
  </div>
</template>


