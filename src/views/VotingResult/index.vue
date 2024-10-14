<template>

  <div class="chart-container" style="display: flex; justify-content: center; flex-direction: column; height: 130vh;">


    <div class="Home-button" style="display: flex; width: 100%;">
      <el-button type="danger" round size = "large" style="transform: translate(120px, 60px); width: 100px; height: 50px; font-size: 20px; color: white;" @click="goHomePage">Home</el-button>
    </div>

    <div class="voting-description"  :style="{width: '50%', height: '10%', marginBottom: '20px', fontSize: '16px', color: 'white'}">
        <h1>Voting Name: {{ voting_name}}</h1>
        <h5>Voting Description: {{ voting_description }}</h5>
        <h5>Voting Numbers: {{ voting_numbers }}</h5>
    </div>


    <div id="barChart" :style="{width: '50%', height: '35%', marginBottom: '20px', marginTop: '20px'}"></div>


    <div id="pieChart" :style="{width: '50%', height: '50%', marginBottom: '20px'}"></div>


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
            if (!votingData.value.data) {
                console.error("Data is undefined in votingData:", votingData.value);
                return;
            }
        }
        const data = votingData.value.data;
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
            backgroundColor: '#08263a',
            
            title: {
                text: votingDetails.value.voting_options[0]?.option_title,
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 24, 
                    fontWeight: 'bold'
                }
            },
            tooltip: {},
            xAxis: {
                data: optionData1.value.map(item => item.name),
                axisLabel: {
                    color: '#FFFFFF',
                    fontSize: 14, 
                    fontWeight: 'bold'
                }
            },
            visualMap: {
                show: false,
                min: 0,
                max: 5,
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
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: 14
                }
            },
            title: {
                text: votingDetails.value.voting_options[1]?.option_title,
                textStyle: {
                    color: '#FFFFFF',
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
    return {votingDetails, voting_name, voting_description, voting_numbers, goHomePage}
}  
}
</script>

<style scoped>




.chart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  background-color: #08263a; 
}
</style>