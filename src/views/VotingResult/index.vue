<template>

  <div class="flex justify-center items-center h-full w-full flex-col">


    <div class="voting-description"  :style="{width: '50%', height: '10%', marginTop: '20px', marginBottom: '10px', fontSize: '16px'}">
        <p class="text-3xl text-bold">{{ voting_name}}</p>
        <p class="text-2xl text-stone-600">{{ voting_description }}</p>
        <p class="text-xl">{{ voting_numbers }} Participants</p>
    </div>


    <div id="barChart" :style="{width: '50%', height: '30%', marginBottom: '10px', marginTop: '10px'}"></div>


    <div id="pieChart" :style="{width: '50%', height: '50%', marginBottom: '20px'}"></div>

    <div class="Home-button" style=" width: 100%; justify-content: center; display: flex; margin-top: 20px;">
      <el-button type="danger" round size = "large" style=" width: 100px; height: 50px; font-size: 20px; color: white;" @click="goHomePage">Home</el-button>
    </div>

  </div>


</template>
  
<script>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { useRouteParams } from '@vueuse/router'
import { useFetch } from '@vueuse/core'
import { useRouter } from 'vue-router'

export default {
setup() {
    const votingId = useRouteParams('id')
    const optionData1  = ref([])  
    const optionData2  = ref([])  
    const votingDetails =ref([])
    const voting_name = ref('')
    const voting_description = ref('')
    const voting_numbers = ref('')
    const router = useRouter()
    const goHomePage=()=>{
        router.push('/')
    }


    const fetchData = async () => {
        const { data: votingData, error: fetchError, isFetching: fetchStatus }  = await useFetch(`/api/voting-result?voting_id=${votingId.value}`).get().json();
        if (fetchError.value) {
            console.error("Error fetch voting result:", fetchError.value);
            return;
        }
        
        if (votingData.value) {
            if (!votingData.value) {
                console.error("Data is undefined in votingData:", votingData.value);
                return;
            }
        }
        const data = votingData.value;
        votingDetails.value = data;
        
        voting_name.value = data.voting_name;
        voting_description.value = data.voting_description;
        voting_numbers.value = data.voting_numbers;

        if (data.voting_options && data.voting_options.length > 0) {
          optionData1.value = data.voting_options[0].option_list.map(option => ({
            name: option.list_title,  
            value: parseFloat(option.list_percentage)  
          }))

          optionData2.value = data.voting_options[1].option_list.map(option => ({
            name: option.list_title,
            value: parseFloat(option.list_percentage)
          }))
        }
    }

    onMounted(async() => {
        await fetchData();
        drawLine();
        drawLine2();
    
    })


    const drawLine = () => {
        const barChart = echarts.init(document.getElementById('barChart'))
        
        barChart.setOption({
            //backgroundColor: 'white',
            
            title: {
                text: votingDetails.value.voting_options[0]?.option_title,
                textStyle: {
                    color: "black",
                    fontSize: 24, 
                    fontWeight: 'bold'
                }
            },
            tooltip: {},
            xAxis: {
                data: optionData1.value.map(item => item.name),
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
            series: [
                {
                name: 'Percentage',
                type: 'bar',
                data: optionData1.value.map(item=>item.value),
                itemStyle: {
                    normal: {
                    opacity: 0.8,
                    barBorderRadius: 5,
                    shadowBlur: 5,
                    shadowColor: '#111'
                    }
                }
                },
            ]
        });
    }

    const drawLine2 = () => {
        if (!votingDetails.value.voting_options || votingDetails.value.voting_options.length <= 1) {
            console.error("No voting options available for pie chart");
            return;
        }

        let pieChart = echarts.init(document.getElementById('pieChart'))
        
        pieChart.setOption({
            legend: {
                top: 'bottom',
                textStyle: {
                
                fontWeight: 'bold',
                fontSize: 14
                }
            },
            title: {
                text: votingDetails.value.voting_options[1]?.option_title,
                textStyle: {
                    
                    fontSize: 24, 
                    fontWeight: 'bold'
                }
            },
            tooltip: {},
            toolbox: {
                show: true,
                feature: {
                mark: { show: true },
                // dataView: { show: true, readOnly: false },
                // restore: { show: true },
                // saveAsImage: { show: true }
                }
            },
        series: [
            {
                name: "Percentage",
                type: 'pie',
                radius: [50, 250],
                center: ['50%', '50%'],
                //roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: optionData2.value.map(item=>({name: item.name, value: item.value})),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    })
    
    }
    return {votingDetails, voting_name, voting_description, voting_numbers, goHomePage,votingId}
}  
}
</script>

<style scoped>

.flex {
  min-height: 120vh; 
}


</style>