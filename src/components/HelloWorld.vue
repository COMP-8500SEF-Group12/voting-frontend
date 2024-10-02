<script setup>
import { useFetch } from '@vueuse/core'
const { isFetching, error, data } = useFetch("/api/voting-list")

defineProps({
  msg: String,
})
</script>

<template>
  <div v-if="isFetching">fetching...</div>
  <div v-if="error">message...</div>
  <div>{{ data }}</div>
</template>
