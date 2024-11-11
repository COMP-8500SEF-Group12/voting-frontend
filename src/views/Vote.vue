<template>
    <div class="w-full h-screen flex flex-col justify-center items-center bg-background" v-if="isFinished">
        <div class="w-full h-screen flex flex-col justify-center items-center bg-zinc-50">
            <div class="prose bg-white p-8 rounded-lg shadow-md max-w-2xl">
                <h1 class="text-3xl font-bold mb-4">{{ data.voting_name }}</h1>

                <p class="text-gray-600 mb-6">{{ data.voting_description }}</p>

                <div class="mb-6">
                    <p class="font-semibold">Voting ID: <span class="font-normal">{{ data.voting_id }}</span></p>
                    <p class="font-semibold">Voting Date: <span class="font-normal">{{ data.voting_date }}</span></p>
                    <p class="font-semibold">Status: <span class="font-normal">{{ data.is_voted ? 'Voted' : 'Not Voted'
                            }}</span></p>
                </div>
                <div v-for="option in data.voting_options" :key="option.option_id" class="mb-8">
                    <h2 class="text-xl font-semibold mb-3">{{ option.option_title }}</h2>
                    <p class="text-sm text-gray-500 mb-2">{{ option.option_type === 'single' ? 'Single choice' :
                            'Multiple choice' }}</p>
                    <el-radio-group v-if="option.option_type === 'single'" v-model="singleChoices[option.option_id]">
                        <el-radio 
                            v-for="item in option.option_list" 
                            :key="item.list_id" 
                            :value="item.list_id"
                        >
                            {{ item.list_title }}
                        </el-radio>
                    </el-radio-group>

                    <div v-else>
                        <el-checkbox-group v-model="multipleChoices[option.option_id]">
                            <el-checkbox 
                                v-for="item in option.option_list" 
                                :key="item.list_id" 
                                :value="item.list_id"
                            >
                                {{ item.list_title }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="w-full flex flex-row-reverse gap-2">
                    <Button @click="handleSubmit">Submit</Button>
                    <Button variant="secondary" @click="handleBackClick">Back</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { useFetch } from '@vueuse/core'
import { useRouteParams } from '@vueuse/router'
import { useRouter } from 'vue-router'
import { API_URL } from '@/lib/utils'
import { reactive } from 'vue'

const router = useRouter()
const votingId = useRouteParams('id')
const url = `${API_URL}/voting-detail?voting_id=${votingId.value}&user_id=s123456`
const postUrl = `${API_URL}/vote`
const { data, isFinished } = useFetch(url).get().json()

// 分别存储单选和多选的结果
const singleChoices = reactive({})
const multipleChoices = reactive({})

function validateVotes() {
    console.log(singleChoices)
    console.log(multipleChoices)  
    if (!data.value?.voting_options) {
        return false
    }

    for (const option of data.value.voting_options) {
        if (option.option_type === 'single') {
            if (!singleChoices[option.option_id]) {
                toast.error(`Please select an option for "${option.option_title}"`)
                return false
            }
        } else {
            if (!multipleChoices[option.option_id] || multipleChoices[option.option_id].length === 0) {
                toast.error(`Please select at least one option for "${option.option_title}"`)
                return false
            }
        }
    }
    
    return true
}

function getVoteData() {
    const user = JSON.parse(localStorage.getItem('user'))
    
    // 合并单选和多选的结果
    const votes = []
    
    // 处理单选结果
    Object.entries(singleChoices).forEach(([option_id, value]) => {
        votes.push({
            option_id,
            option_value: [value]
        })
    })
    
    // 处理多选结果
    Object.entries(multipleChoices).forEach(([option_id, values]) => {
        votes.push({
            option_id,
            option_value: values
        })
    })

    return {
        "user_id": user.vote_id,
        "user_nickname": user.vote_nickname,
        "voting_id": votingId.value,
        "votes": votes
    }
}

const { execute } = useFetch(postUrl, { immediate: false })
    .post(getVoteData)
    .json()

async function handleSubmit() {
    if (!validateVotes()) {
        return
    }

    try {
        await execute()
        toast.success('Voting Successfully!')
        router.push(`/votePending`)
    } catch (error) {
        toast.error('Failed to submit vote. Please try again.')
    }
}

function handleBackClick() {
    router.push("/")
}
</script>
