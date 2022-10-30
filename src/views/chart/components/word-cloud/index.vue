<template>
  <el-card :body-style="{ padding: 0 }">
    <div class="container" ref="target">文档云图</div>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { getChartWordCloud } from '@/api/chart'
import 'echarts-wordcloud'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { randomRGB } from '@/utils/color'
import wordcloudBg from '@/assets/wordcloud.png'

const i18n = useI18n()

/**
 * 获取数据
 */
const wordCloudData = ref([])
const getWordCloudData = async () => {
  const res = await getChartWordCloud()
  wordCloudData.value = res
  // 渲染图表
  renderChart()
}
getWordCloudData()

const target = ref(null)
let mChart = null
onMounted(() => {
  mChart = echarts.init(target.value)
})

/**
 * 渲染图表
 */
const renderChart = () => {
  const maskImage = new Image()
  maskImage.src = wordcloudBg
  const option = {
    title: {
      text: i18n.t('msg.chart.cloudChartTitle')
    },
    series: [
      {
        type: 'wordCloud',
        sizeRange: [4, 80],
        rotationRange: [0, 0],
        gridSize: 0,
        layoutAnimation: true,
        textStyle: {
          color: randomRGB
        },
        emphasis: {
          textStyle: {
            fontWeight: 'bold',
            color: '#000'
          }
        },
        data: wordCloudData.value,
        maskImage: maskImage
      }
    ]
  }
  // 等待图像加载完成之后
  maskImage.onload = function () {
    mChart.setOption(option)
  }
}
watchSwitchLang(renderChart)
</script>

<style lang="scss" scoped>
.container {
  height: 240px;
  // background-color: #bcbfc3;
}
</style>
