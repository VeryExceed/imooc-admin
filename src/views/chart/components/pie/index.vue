<template>
  <el-card :body-style="{ padding: 0 }">
    <div ref="target" class="container">饼图</div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { getChartPie } from '@/api/chart'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'

const i18n = useI18n()

const chartData = ref([])
const getChartData = async () => {
  const res = await getChartPie()
  chartData.value = res
  // 渲染图表
  renderChart()
}
const target = ref(null)
let mChart = null
onMounted(() => {
  mChart = echarts.init(target.value)
})
getChartData()

const renderChart = () => {
  const options = {
    title: {
      text: i18n.t('msg.chart.pieChartTitle')
    },
    tooltip: {
      trigger: 'item',
      formatter: `{b}: {c} ${i18n.t('msg.chart.unit')}`
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          formatter: '{b}: {d}%',
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '22',
            fontWeight: 'bold'
          }
        },
        data: chartData.value
      }
    ]
  }
  mChart.setOption(options)
}
watchSwitchLang(renderChart)
</script>

<style lang="scss" scoped>
.container {
  height: 240px;
  // background-color: #bcbfc3;
}
</style>
