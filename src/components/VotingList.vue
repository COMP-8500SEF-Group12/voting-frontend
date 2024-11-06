<template>
    <div class="w-1/2 p-4">
        <ul className="space-y-2" v-if="isFinished">
            <li v-for="vote in data.voting_lists" :key="vote.voting_id" @click="handleVoteListClick">
                <div className="p-2 flex flex-col items-center space-x-4">
                    <div class="w-full flex">
                        <h3 className="cursor-pointer text-zinc-700 mr-auto">{{ vote.voting_name }}</h3>
                        <Badge>{{ vote.voting_date }}</Badge>
                    </div>
                </div>
                <Separator class="mt-2" />
            </li>
        </ul>
    </div>
</template>

<script setup>
import { toast } from 'vue-sonner'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useFetch } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { API_URL } from '@/lib/utils'

const router = useRouter()

function handleVoteListClick() {
    toast.success('Voter information saved successfully')
    // 手动路由跳转,这里先固定跳转到路由 1
    router.push(`/vote/1`)
}
const { data, isFinished } = useFetch(`${API_URL}/voting-lists`).get().json()
</script>
