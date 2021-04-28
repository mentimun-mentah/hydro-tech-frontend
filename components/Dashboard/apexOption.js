export const optionsPH = {
  chart: {
    id: 'realtime',
    foreColor: '#93999E',
    zoom: { enabled: false },
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
  },
  grid: {
    borderColor: '#93999e24',
    strokeDashArray: 6,
    position: 'back',
    xaxis: {
      lines: { show: false }
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      opacityTo: 0.2,
      opacityFrom: 0.7,
      shadeIntensity: 1,
      inverseColors: false,
      stops: [20, 90, 100]
    },
    colors: ['#7bed9f']
  },
  colors:['#26de81'],
  stroke: { curve: 'smooth', },
  sparkline: { enabled: true },
  dataLabels: { enabled: false },
  yaxis: { 
    min: 0,
    tickAmount: 5,
  },
  xaxis: {
    range: 21,
    type: 'datetime',
    labels: { show: false },
    axisTicks: { show: false },
    tooltip: { enabled: false },
  },
  tooltip: {
    enabled: true,
    custom: ({series, seriesIndex, dataPointIndex}) => {
      return(
      '<div class="text-center bold">'+
        '<p style="margin-bottom: 0;color:var(--grey-1); font-size: 12px!important; margin-top:5px;">'
        + series[seriesIndex][dataPointIndex] + 
        '<span style="color:var(--grey-1)"> pH</span></p>'+
      '</div>'
      )
    },
  }
}

export const optionsGrowth = {
  colors:['#18a880'],
  stroke: { curve: 'straight', },
  dataLabels: { enabled: false },
  markers: { 
    size: 7,
    colors: "#262626",
    strokeWidth: 5,
  },
  chart: {
    height: 350,
    foreColor: '#93999E',
    zoom: { enabled: false },
    toolbar: { show: false },
  },
  grid: {
    borderColor: '#93999e24',
    strokeDashArray: 6,
    position: 'back',
    xaxis: {
      lines: { show: false }
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      opacityTo: 0.2,
      opacityFrom: 0.3,
      shadeIntensity: 1,
      inverseColors: false,
      stops: [20, 90, 100]
    },
    colors: ['#18a88069']
  },
  yaxis: { min: 1, tickAmount: 4 },
  xaxis: {
    max: 4,
    categories: [...Array(4)].map((_, x) => `Week ${x+1}`),
  },
  tooltip: {
    enabled: true,
    custom: ({series, seriesIndex, dataPointIndex}) => {
      let img = "/static/images/plant/growth/2.png"
      if(dataPointIndex == 3) img = "/static/images/plant/growth/4.png"
      return(
      '<div class="text-center">'+
        '<img src="'+ img +'" width="40" />' +
        '<p style="margin-bottom: 0;color:var(--grey-1); font-size: 12px!important; margin-top:5px;">'
        + series[seriesIndex][dataPointIndex] + 
        '<span style="color:var(--grey)"> cm</span></p>'+
      '</div>'
      )
    },
  }
}

export const seriesWeekGrowth = [{
  name: "Week",
  data: [8.3, 9.3, 12.4, 14]
}]

export const seriesDayGrowth = [{
  name: "Day",
  data: [1.2, 2.1, 3.5, 4, 5.5, 6.7, 8.3]
}]

export const optionsWeekGrowthData = {
  xaxis: {
    max: 4,
    categories: [...Array(4)].map((_, x) => `Week ${x+1}`),
  },
  tooltip: {
    enabled: true,
    custom: ({series, seriesIndex, dataPointIndex}) => {
      let img = "/static/images/plant/growth/2.png"
      if(dataPointIndex == 3) img = "/static/images/plant/growth/4.png"
      return(
      '<div class="text-center">'+
        '<img src="'+ img +'" width="40" />' +
        '<p style="margin-bottom: 0;color:var(--grey-1); font-size: 12px!important; margin-top:5px;">'
        + series[seriesIndex][dataPointIndex] + 
        '<span style="color:var(--grey)"> cm</span></p>'+
      '</div>'
      )
    },
  }
}

export const optionsDayGrowthData = {
  xaxis: {
    max: 7,
    categories: [...Array(7)].map((_, x) => `Day ${x+1}`),
  },
  tooltip: {
    enabled: true,
    custom: ({series, seriesIndex, dataPointIndex}) => {
      let img = "/static/images/plant/growth/2.png"
      if(dataPointIndex == 6) img = "/static/images/plant/growth/4.png"
      return(
      '<div class="text-center">'+
        '<img src="'+ img +'" width="40" />' +
        '<p style="margin-bottom: 0;color:var(--grey-1); font-size: 12px!important; margin-top:5px;">'
        + series[seriesIndex][dataPointIndex] + 
        '<span style="color:var(--grey)"> cm</span></p>'+
      '</div>'
      )
    },
  }
}
