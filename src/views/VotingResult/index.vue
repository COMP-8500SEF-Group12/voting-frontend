<template>
    <div class="w-full flex flex-col justify-center items-center bg-zinc-50" v-if="isFinished">
        <div class="prose w-full p-12 flex flex-col justify-center items-center bg-zinc-50">
            <div class="bg-white w-full p-8 rounded-lg shadow-md">
                <h1 class="text-3xl font-bold mb-4">{{ data.voting_name }}</h1>
                <p class="text-gray-600 mb-6">Thank you for your vote!</p>
                <div class="mb-6">
                    <p class="font-semibold">Voting ID: <span class="font-normal">{{ data.voting_id }}</span></p>
                    <p class="font-semibold">Voting Date: <span class="font-normal">{{ data.voting_date }}</span></p>
                    <p class="font-semibold">Total Voting Numbers: {{ data.voting_numbers }}</p>
                </div>
                
                <!-- 遍历所有的voting options -->
                <div v-for="(option, index) in chartOptions" :key="index" class="mb-8">
                    <v-chart 
                        :option="option" 
                        :class="option.series[0].type === 'pie' ? 'w-full h-[600px]' : 'h-96'"
                    />
                </div>

                <div class="flex flex-row-reverse w-full mt-6">
                    <Button @click="() => router.push('/')">Back to Home</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Button } from "@/components/ui/button";
import "echarts";
import VChart from 'vue-echarts';
import { useFetch } from '@vueuse/core'
import { useRouteParams } from '@vueuse/router'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { API_URL } from '@/lib/utils'

const router = useRouter()
const votingId = useRouteParams('id')
const user = JSON.parse(localStorage.getItem('user'))
const url = `${API_URL}/voting-result?voting_id=${votingId.value}&user_id=${user.vote_id}`
const { data, isFinished } = useFetch(url).get().json()

// 创建图表配置生成函数
const createBarChartOption = (option) => ({
    title: {
        text: option.option_title,
        textStyle: {
            color: "black",
            fontSize: 24,
            fontWeight: 'bold'
        }
    },
    tooltip: {},
    xAxis: {
        data: option.option_list.map(item => item.list_title),
        axisLabel: {
            color: 'black',
            fontSize: 14,
            fontWeight: 'bold'
        }
    },
    visualMap: {
        show: false,
        min: 0,
        max: 3,
        dimension: 0,
        inRange: {
            color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
        }
    },
    yAxis: {},
    series: [{
        name: 'Percentage',
        type: 'bar',
        data: option.option_list.map(item => item.list_percentage),
        itemStyle: {
            normal: {
                opacity: 0.8,
                barBorderRadius: 5,
                shadowBlur: 5,
                shadowColor: '#111'
            }
        }
    }]
})

const createPieChartOption = (option) => ({
    legend: {
        top: 'bottom',
        textStyle: {
            fontWeight: 'bold',
            fontSize: 14
        }
    },
    title: {
        text: option.option_title,
        textStyle: {
            fontSize: 24,
            fontWeight: 'bold'
        }
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true }
        }
    },
    series: [{
        name: "Percentage",
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        itemStyle: {
            borderRadius: 8
        },
        data: option.option_list.map(item => ({
            value: item.list_percentage,
            name: item.list_title
        })),
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        },
        label: {
            show: false
        },
        labelLine: {
            show: false
        }
    }]
})

const chartOptions = computed(() => {
    if (!isFinished.value || !data.value) return []
    
    return data.value.voting_options.map(option => {
        if (option.option_type === 'multi') {
            return createPieChartOption(option)
        }
        return createBarChartOption(option)
    })
})
</script>
