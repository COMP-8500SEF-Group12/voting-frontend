<template>
    <div class="w-1/2 p-4">
        <ul className="space-y-2" v-if="isFinished">
            <li v-for="vote in data.voting_lists" :key="vote.voting_id">
                <RouterLink :to="`/vote/${vote.voting_id}`" className="p-2 flex flex-col items-center space-x-4">
                    <div class="w-full flex">
                        <h3 className="cursor-pointer text-zinc-700 mr-auto">{{ vote.voting_name }}</h3>
                        <Badge>{{ vote.voting_date }}</Badge>
                    </div>
                </RouterLink>
                <Separator class="mt-2" />
            </li>
        </ul>
    </div>
</template>

<script setup>
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useFetch } from '@vueuse/core'
const { data, isFinished } = useFetch("/api/voting-list").get().json()
</script>
