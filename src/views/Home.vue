<template>
  <div class="h-full justify-center items-center w-full px-24 flex flex-col">
    <VotingList v-if="!!user.id" />

    <Card class="w-full max-w-sm mt-16" v-else>
      <CardHeader>
        <CardTitle class="text-2xl">
          Voter Information
        </CardTitle>
        <CardDescription>
          Please enter your id and nickname.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="id">Voter ID</Label>
          <Input id="id" type='text' required v-model="voteId" />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" required v-model="nickname" />
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" @click="handleSaveClick">
          Save
        </Button>
      </CardFooter>
    </Card>
    <footer class="absolute bottom-4 font-geist text-sm text-gray-500">By COMP 8500SEF Group 12</footer>
  </div>
</template>

<script setup>
import VotingList from '@/components/VotingList.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
import { toast } from 'vue-sonner'


const voteId = ref('')
const nickname = ref('')
const user = useStorage('user', { id: '', nickname: '' })


function handleSaveCheck() {
  const voteIdPattern = /^s\d{7}$/
  return voteIdPattern.test(voteId.value)
}

function handleSaveClick() {
  const isVoteIdValid = handleSaveCheck()
  if (isVoteIdValid) {
    user.value.id = voteId.value
    user.value.nickname = nickname.value
  } else {
    toast.error('Please enter the correct eight-digit vote id')
  }
}

</script>
