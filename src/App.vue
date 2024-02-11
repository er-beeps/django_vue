<template>
  <div v-if="isLoading" class="page-layout">
    <PageLoader />
  </div>
  <router-view v-else />
</template>

<script setup>
import PageLoader from "@/components/PageLoader.vue";

const { isLoading } = false;
</script>