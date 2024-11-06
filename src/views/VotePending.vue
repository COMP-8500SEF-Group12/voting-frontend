<template>
  <div class="flex flex-col items-center justify-center w-full h-screen bg-zinc-50">
    <div class="space-y-4">
      <Button variant="default" class="w-full" @click="() => {
        router.push(`/`)
      }">
        Back to Home
      </Button>
      <Button variant="outline" class="w-full" @click="() => {
        router.push(`/votingResult/1`)
      }">
        View Voting Results
      </Button>
    </div>
  </div>
</template>

<script setup>
import { Button } from "@/components/ui/button";
import { useRouter } from "vue-router";
const router = useRouter()
</script>
