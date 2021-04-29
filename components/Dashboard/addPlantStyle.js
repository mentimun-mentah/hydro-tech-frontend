import css from "styled-jsx/css";

const style = css`
:global(.rounded-card-actions .ant-card-actions) {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
:global(.input-with-addonafter .ant-input) {
  border-top-right-radius: 0!important;
  border-bottom-right-radius: 0!important;
}
:global(.input-with-addonafter .ant-input-group-addon) {
  border-top-right-radius: .5rem!important;
  border-bottom-right-radius: .5rem!important;
}
:global(.input-with-addonafter .ant-input-group-addon .ant-select-selector) {
  border-top-left-radius: 0!important;
  border-bottom-left-radius: 0!important;
}
:global(.ant-form-item-has-error .ant-input-group-addon .ant-select.ant-select-single:not(.ant-select-customize-input) .ant-select-selector) {
  border: 1px solid;
}
:global(.ant-form-item-has-error .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input) .ant-select-selector) {
  border-width: 1px!important;
}
:global(.input-with-addonafter .ant-input-group-addon .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector) {
  box-shadow: none!important;
}
:global(.input-with-addonafter .ant-input-group-addon .ant-select-open .ant-select-selector, 
        .input-with-addonafter .ant-input-group-addon .ant-select-focused .ant-select-selector) {
  color: var(--grey-1)
}

:global(.ant-select-selector) {
  border: inherit;
}

:global(.space-w-100 .ant-space-item:last-of-type){
  width: 100%;
}
`

export default style
