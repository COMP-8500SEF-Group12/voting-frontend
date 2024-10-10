<template>
    <div v-if="isFinished">
        {{ data }}
    </div>
</template>

<script setup>
import { useFetch } from '@vueuse/core'
import { useRouteParams } from '@vueuse/router'
const votingId = useRouteParams('id')
const url = `/api/voting-detail?voting_id=${votingId.value}&user_id=s123456`
const { data, isFinished } = useFetch(url).get().json()
</script>
