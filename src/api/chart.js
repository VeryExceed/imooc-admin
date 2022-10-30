import request from '@/utils/request'

/**
 * 获取累计收益明细
 */
export const getChartTrend = () => {
  return request({
    url: '/chart/trend'
  })
}

/**
 * 日历图示数据
 */
export const getChartCalendar = () => {
  return request({
    url: '/chart/calendar'
  })
}

/**
 * 指定日期的时段柱形数据
 */
export const getChartTimeAmount = (date) => {
  return request({
    url: '/chart/time/amount',
    parmas: {
      date
    }
  })
}

/**
 * 饼图数据
 */
export const getChartPie = () => {
  return request({
    url: '/chart/pie'
  })
}

/**
 * 文字云图数据
 */
export const getChartWordCloud = () => {
  return request({
    url: '/chart/wordcloud'
  })
}
