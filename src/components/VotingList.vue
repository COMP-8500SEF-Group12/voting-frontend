<template>
    <div class="w-1/2 p-4">
        <ul className="space-y-2" v-if="isFinished">
            <li v-for="vote in data.voting_lists" :key="vote.voting_id">
                <Dialog v-model:open="open">
                    <DialogTrigger as-child>
                        <div className="p-2 flex flex-col items-center space-x-4">
                            <div class="w-full flex">
                                <h3 className="cursor-pointer text-zinc-700 mr-auto">{{ vote.voting_name }}</h3>
                                <Badge>{{ vote.voting_date }}</Badge>
                            </div>
                        </div>
                        <Separator class="mt-2" />
                    </DialogTrigger>
                    <DialogContent class="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Voter Information</DialogTitle>
                            <DialogDescription>
                                Please add your id and nickname.
                            </DialogDescription>
                        </DialogHeader>
                        <div class="grid gap-4 py-4">
                            <div class="grid grid-cols-4 items-center gap-4">
                                <Label for="userid" class="text-right">
                                    Your ID
                                </Label>
                                <Input id="userid" v-model="userId" class="col-span-3" />
                            </div>
                            <div class="grid grid-cols-4 items-center gap-4">
                                <Label for="username" class="text-right">
                                    Nickname
                                </Label>
                                <Input id="username" v-model="nickname" class="col-span-3" />
                            </div>
                        </div>
                        <DialogClose class="w-full  flex-row-reverse flex">
                            <Button type="submit" @click="() => {
            toast.success('Voter information saved successfully')
            // 手动路由跳转,这里先固定跳转到路由 1
            router.push(`/vote/1`)
        }">
                                Save changes
                            </Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { toast } from 'vue-sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useFetch } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const open = ref(false)
const userId = ref('s123456')
const nickname = ref('s123456')
const { data, isFinished } = useFetch("/api/voting-lists").get().json()
</script>
