export const options = {
  colors:['#26de81'],
  stroke: { curve: 'smooth', },
  dataLabels: { enabled: false },
  chart: {
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
  yaxis: { min: 0 },
  xaxis: {
    type: 'datetime',
    labels: { show: false },
    categories: [ "01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan", "06 Jan" ],
  },
}

export const series = [
  {
    name: "series-1",
    data: [2, 4, 3, 6, 4, 9]
  }
]
