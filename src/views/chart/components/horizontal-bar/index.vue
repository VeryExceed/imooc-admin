<template>
  <el-card
    :body-style="{
      paddingTop: '12px'
    }"
  >
    <div class="container" ref="target"></div>
  </el-card>
</template>

<script setup>
import { getChartTimeAmount } from '@/api/chart'
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import emitter from '@/utils/eventHub'
const i18n = useI18n()

/**
 * 与日历图联通
*/
emitter.on('calendarChange', val => {
  getData(val)
})

/**
 * 获取数据
 */
const data = ref([])
const getData = async (date) => {
  const { result } = await getChartTimeAmount(date)
  data.value = result
  console.log(result)
  renderChart()
}
getData()

/**
 * 图表初始化
 */
const target = ref(null)
let mChart = null
onMounted(() => {
  mChart = echarts.init(target.value)
})

/**
 * 构建图表
 */
const renderChart = () => {
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      // 图例数据
      data: [
        `${i18n.t('msg.chart.income')}（${i18n.t('msg.chart.unit')}）`,
        `${i18n.t('msg.chart.expend')}（${i18n.t('msg.chart.unit')}）`,
        `${i18n.t('msg.chart.balance')}（${i18n.t('msg.chart.unit')}）`
      ],
      // 图例位置
      right: 0
    },
    grid: {
      top: 28,
      right: 0,
      bottom: 0,
      left: 0,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value'
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        data: data.value.map((item) => item.timeStr),
        inverse: true
      }
    ],
    series: [
      {
        name: `${i18n.t('msg.chart.income')}（${i18n.t('msg.chart.unit')}）`,
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'right'
        },
        color: '#6DC473',
        emphasis: {
          focus: 'series'
        },
        data: data.value.map((item) => item.income)
      },
      // 第二个图表：支出
      {
        // 图表名字，对应 legend.data[1]
        name: `${i18n.t('msg.chart.expend')}（${i18n.t('msg.chart.unit')}）`,
        // 图表类型
        type: 'bar',
        // 数据堆叠，两个相同的 stack 将会堆叠渲染
        stack: 'Total',
        // 标签配置
        label: {
          // 展示
          show: true,
          // 右侧
          position: 'right'
        },
        // 柱的颜色
        color: '#E47470',
        // 高亮配置
        emphasis: {
          // 聚焦当前高亮的数据所在的系列的所有图形
          focus: 'series'
        },
        // 数据
        data: data.value.map((item) => item.expense)
      },
      // 第三个图表：结余
      {
        // 图表名字，对应 legend.data[2]
        name: `${i18n.t('msg.chart.balance')}（${i18n.t('msg.chart.unit')}）`,
        // 图表类型
        type: 'bar',
        // 标签配置
        label: {
          // 展示
          show: true,
          // 内部
          position: 'inside'
        },
        // 柱的颜色
        color: '#83C0DF',
        // 高亮配置
        emphasis: {
          // 聚焦当前高亮的数据所在的系列的所有图形
          focus: 'series'
        },
        // 数据
        data: data.value.map((item) => item.balance)
      }
    ]
  }
  mChart.setOption(options)
}
watchSwitchLang(renderChart)
</script>

<style lang="scss" scoped>
.container {
  height: 409px;
  // background-color: #bcbfc3;
}
</style>
