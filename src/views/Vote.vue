<template>
    <div class="w-full h-screen flex flex-col justify-center items-center bg-background" v-if="isFinished">
        <div class="w-full h-screen flex flex-col justify-center items-center bg-zinc-50">
    <div class="prose bg-white p-8 rounded-lg shadow-md max-w-2xl">
        <h1 class="text-3xl font-bold mb-4">{{ data.voting_name }}</h1>
        
        <p class="text-gray-600 mb-6">{{ data.voting_description }}</p>
        
        <div class="mb-6">
            <p class="font-semibold">Voting ID: <span class="font-normal">{{ data.voting_id }}</span></p>
            <p class="font-semibold">Voting Date: <span class="font-normal">{{ data.voting_date }}</span></p>
            <p class="font-semibold">Status: <span class="font-normal">{{ data.is_voted ? 'Voted' : 'Not Voted' }}</span></p>
        </div>
        <div v-for="option in data.voting_options" :key="option.option_id" class="mb-8">
            <h2 class="text-xl font-semibold mb-3">{{ option.option_title }}</h2>
            <p class="text-sm text-gray-500 mb-2">Type: {{ option.option_type === 'single' ? 'Single choice' : 'Multiple choice' }}</p>
            <RadioGroup v-if="option.option_type === 'single'">
                    <div class="flex items-center space-x-2" v-for="item in option.option_list">
                        <RadioGroupItem id="r1" :value="item.list_id" />
                        <Label for="r1">{{ item.list_title }}</Label>
                    </div>
            </RadioGroup>
            <div v-else v-for="item in option.option_list" class="flex items-center gap-2">
                <Checkbox
                :value="item.list_id"
              />
              {{ item.list_title }}
            </div>
        </div>
        <div class="w-full flex flex-row-reverse">
            <Button @click="async ()=>{
                toast.success('Voting Successfully!')
                router.push(`/votePending`)
                // 发送一个 post 请求
                await execute()
            }" >Submit</Button>
        </div>
    </div>
</div>
    </div>
</template>

<script setup>
import {toast} from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { useFetch } from '@vueuse/core'
import { useRouteParams } from '@vueuse/router'
import { ref } from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()
const checkboxLists = ref([])
const votingId = useRouteParams('id')
const url = `/api/voting-detail?voting_id=${votingId.value}&user_id=s123456`
const postUrl = `/api/vote`
const { data,isFinished } = useFetch(url).get().json()
const {postData, execute}= useFetch(postUrl,{immediate:false}).post(
    {
  "user_id": "s123456",
  "user_nickname": "s123456",
  "voting_id": "1",
  "votes": [
    {
      "option_id": "1",
      "option_value": "1"
    },
    {
      "option_id": "2",
      "option_value": "2"
    }
  ]
}
).json()
</script>
