export const columns = [
  {
    key: "ph",
    align: "center",
    title: "PH",
    dataIndex: "report",
    render: (item) => <span>{item.ph}</span>,
  },
  {
    key: "tds",
    align: "center",
    title: "Nutrition",
    dataIndex: "report",
    render: (item) => <span>{item.tds} ppm</span>,
  },
  {
    key: "ldr",
    align: "center",
    title: "Light Intensity",
    dataIndex: "report",
    render: (item) => <span>{item.ldr} lux</span>,
  },
  {
    key: "sh",
    align: "center",
    title: "Water Temp.",
    dataIndex: "report",
    render: (item) => <span>{item.sh}°C</span>,
  },
  {
    key: "ta",
    align: "center",
    title: "Water Level",
    dataIndex: "report",
    render: (item) => <span>{item.ta}%</span>,
  },
  {
    key: "time",
    align: "center",
    title: "Time",
    dataIndex: "report",
    render: (item) => <span>{item.time}</span>,
  },
];

export const dataSource = [
  {
    key: 0.19777277608656285,
    report: { sh: "29", tds: "958", ldr: "570", ta: "81", ph: "9.30", time: "4:22 PM" },
  },
  {
    key: 0.8150942087462312,
    report: { sh: "30", tds: "881", ldr: "548", ta: "91", ph: "8.72", time: "4:23 PM" },
  },
  {
    key: 0.5210355778665618,
    report: { sh: "27", tds: "870", ldr: "592", ta: "86", ph: "11.50", time: "4:24 PM" },
  },
  {
    key: 0.8165505380731397,
    report: { sh: "28", tds: "949", ldr: "506", ta: "76", ph: "8.38", time: "4:25 PM" },
  },
  {
    key: 0.07374130493711961,
    report: { sh: "28", tds: "870", ldr: "568", ta: "96", ph: "9.52", time: "4:26 PM" },
  },
  {
    key: 0.4687208647341543,
    report: { sh: "28", tds: "913", ldr: "538", ta: "93", ph: "13.13", time: "4:27 PM" },
  },
  {
    key: 0.5665714778124649,
    report: { sh: "29", tds: "835", ldr: "571", ta: "71", ph: "11.11", time: "4:28 PM" },
  },
  {
    key: 0.30834060088598214,
    report: { sh: "28", tds: "834", ldr: "505", ta: "85", ph: "12.59", time: "4:29 PM" },
  },
  {
    key: 0.7151410357998422,
    report: { sh: "29", tds: "900", ldr: "510", ta: "91", ph: "10.93", time: "4:30 PM" },
  },
  {
    key: 0.13392430164420221,
    report: { sh: "27", tds: "878", ldr: "522", ta: "80", ph: "9.74", time: "4:31 PM" },
  },
  {
    key: 0.04448957640096296,
    report: { sh: "29", tds: "808", ldr: "562", ta: "77", ph: "15.79", time: "4:32 PM" },
  },
  {
    key: 0.46947968474652146,
    report: { sh: "27", tds: "983", ldr: "561", ta: "74", ph: "13.89", time: "4:33 PM" },
  },
  {
    key: 0.8939867673632909,
    report: { sh: "29", tds: "886", ldr: "503", ta: "98", ph: "11.72", time: "4:34 PM" },
  },
  {
    key: 0.9273474416398337,
    report: { sh: "30", tds: "941", ldr: "546", ta: "92", ph: "11.64", time: "4:35 PM" },
  },
  {
    key: 0.6173171154653958,
    report: { sh: "29", tds: "960", ldr: "510", ta: "76", ph: "12.09", time: "4:36 PM" },
  },
];

export const progressData = [
  { date: 11, sub: "Planted - Location updated" },
  { date: 14, sub: "Growing - Early phase" },
  { date: 17, sub: "Growing - Leaves blooming" },
  { date: 19, sub: "Growing - Leaves bloom - Expected" },
  { date: 21, sub: "Growing - Early phase ii - Expected" },
];
