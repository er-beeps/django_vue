<script setup>
import {RouterLink}  from 'vue-router';
</script>

<template>
    <div class="wrapper">
    <nav
      class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 "
    >
      <div
        class="container px-4 mx-auto flex flex-wrap items-center justify-between"
      >
        <div
          class="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none"
          v-bind:class="{'hidden': !showMenu, 'block': showMenu}"
        >
          <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
            <RouterLink class="p-2" to= "/home">Home</RouterLink>
            <RouterLink class="p-2" to= "/about">About</RouterLink>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  </template>
