import css from "styled-jsx/css";

const style = css`
:global(.header-dashboard) {
  margin-bottom: 20px;
}
:global(.header-date) {
  color: #93999E!important;
}
:global(.apexcharts-canvas) {
  width: 100% !important;
}
:global(.apexcharts-canvas, .apexcharts-canvas svg) {
  width: 100% !important;
}
:global(.chart) {
  width: 100% !important;
  height: 100% !important;
}
:global(.card-dashboard .ant-card-body) {
  height: 100% !important;
}
:global(.tag-condition) {
  float: right;
  color: #ffffff!important;
  border: 0px !important;
  border-radius: 1rem !important;
  margin-right: 0px !important;
  padding: 1px 10px!important;
}
:global(.tag-condition.good) {
  background-color: #2ecc71!important;
}
:global(.tag-condition.medium) {
  background-color: #ffb142!important;
}
:global(.tag-condition.bad) {
  background-color: #ff3838!important;
}

/*PLANT GROWTH*/
:global(.apexcharts-tooltip.apexcharts-theme-light){
  border: 0px!important;
  padding: 5px;
}
:global(.btn-radio-pill .ant-radio-button-wrapper:first-child){
  border-radius: 9px 0 0 9px;
}
:global(.btn-radio-pill .ant-radio-button-wrapper:last-child){
  border-radius: 0 9px 9px 0;
}
`

export default style
