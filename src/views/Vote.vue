<template>
    <div>
        {{ votingName }}
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const votingName = ref('')

onMounted(() => {
    votingName.value = route.params.id
})
</script>
