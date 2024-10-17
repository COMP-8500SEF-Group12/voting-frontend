<script setup>
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <main class="w-full h-screen pb-14 overflow-auto bg-zinc-50">
    <RouterView/>
    <Toaster />
  </main>
</template>
