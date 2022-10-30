<template>
  <div class="container">
    <el-row :gutter="32" v-if="chartTerendData.allAmount">
      <el-col :span="6">
        <trend-data-vue :data="chartTerendData" />
      </el-col>
      <el-col :span="18">
        <trend-chart-vue :data="chartTerendData" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import trendDataVue from './trend-data.vue'
import trendChartVue from './trend-chart.vue'
import { getChartTrend } from '@/api/chart'
import { ref } from 'vue'

const chartTerendData = ref({})
const getChartTrenData = async () => {
  const res = await getChartTrend()
  chartTerendData.value = res
}
getChartTrenData()
</script>

<style lang="scss" scoped>
.container {
  height: 286px;
}
</style>
