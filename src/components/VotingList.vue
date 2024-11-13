<template>
    <div class="w-1/2 p-4" v-if="isFinished">
        <ul className="space-y-2">
            <li v-for="vote in data.voting_lists" :key="vote.voting_id" @click="handleVoteListClick(vote.voting_id)">
                <div className="p-2 flex flex-col items-center space-x-4">
                    <div class="w-full flex">
                        <h3 className="cursor-pointer text-zinc-700 mr-auto">{{ vote.voting_name }}</h3>
                        <Badge>{{ vote.voting_date }}</Badge>
                    </div>
                </div>
                <div></div>
                <Separator class="mt-2" />
            </li>
        </ul>
        <div class="w-full flex flex-row-reverse mt-4" >
                <Button @click="handleCreateVoteClick" v-show="data.is_has_authority"> Create Vote</Button>
         </div>
    </div>
</template>

<script setup>
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useFetch } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { API_URL } from '@/lib/utils'
import { Button } from '@/components/ui/button';

const router = useRouter()

function handleVoteListClick(id) {
    router.push(`/vote/${id}`)
}
function handleCreateVoteClick(){
    router.push("/createVote")
}
const user = JSON.parse(localStorage.getItem('user'))
const { data, isFinished } = useFetch(`${API_URL}/voting-lists?user_id=${user.vote_id}`).get().json()
</script>
