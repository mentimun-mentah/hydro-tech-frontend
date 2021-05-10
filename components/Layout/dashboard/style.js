import css from "styled-jsx/css";

const style = css`
:global(.ant-layout-sider) {
  background: var(--white)!important;
}
:global(.ant-layout-sider-trigger) {
  margin: 15px;
  border-radius: 1rem;
}

:global(.ant-layout-sider-light .ant-layout-sider-trigger) {
  color: var(--white)!important;
  background: var(--purple)!important;
}

:global(.ant-layout-sider-has-trigger .ant-layout-sider-trigger) {
  width: 170px!important;
}

:global(.ant-layout-sider-collapsed.ant-layout-sider-has-trigger .ant-layout-sider-trigger) {
  width: 50px!important;
}

:global(.ant-layout-sider-custom .ant-layout-sider-children) {
  top: 0;
  height: 100vh;
  width: inherit;
  position: fixed;
}

:global(.ant-layout-sider-has-trigger) {
  padding-bottom: 78px!important;
}

:global(.ant-layout-sider-children) {
  padding: 15px!important;
}

:global(.ant-menu-inline) {
  border-right: unset !important;
}

:global(.ant-menu-scroll) {
  overflow: scroll;
  height: calc(100vh - 48px - 70px - 30px);
}

:global(.ant-menu-scroll::-webkit-scrollbar) {
  width: 0;  /* Remove scrollbar space */
  background: transparent;  /* Optional: just make scrollbar invisible */
}

:global(.ant-menu-inline-collapsed) {
  width: 50px!important;
}

:global(.ant-menu-inline .ant-menu-item) {
  padding-right: 15px!important;
}

:global(.ant-menu-inline .ant-menu-item::after, .ant-menu-vertical, .ant-menu-vertical .ant-menu-item::after) {
  border-right: unset !important;
}

:global(.ant-menu, .ant-menu-item a) {
  color: var(--grey)!important;
}

:global(.ant-menu-item-selected, 
.ant-menu-item-selected a:hover, 
.ant-menu-item-selected a) {
  color: var(--black)!important;
}

:global(.ant-menu-item:hover, 
.ant-menu-item a:hover, 
.ant-menu-item-active, 
.ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, 
.ant-menu-submenu-active, .ant-menu-submenu-title:hover,
.ant-menu-item-selected a:hover) {
  color: var(--black)!important;
}

:global(.ant-menu-inline .ant-menu-item, .ant-menu-inline .ant-menu-submenu-title) {
  width: 100%!important;
}

:global(.ant-menu-item) {
  border-radius: .8rem;
}

:global(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected) {
  font-weight: 600!important;
  background-color: #f0f1f2!important;
}

:global(.ant-menu-item:active, .ant-menu-submenu-title:active) {
  background: #f0f1f2!important;
}

:global(.ant-menu-vertical .ant-menu-item:not(:last-child), .ant-menu-inline .ant-menu-item:not(:last-child)) {
  margin-bottom: 4px!important;
}

:global(.ant-menu-sub.ant-menu-inline) {
  background: transparent;
}

:global(.ant-menu-submenu-arrow::before, .ant-menu-submenu-arrow::after) {
  width: 7px;
}

:global(.logo) {
  padding-top: 1rem;
  padding-bottom: 15px;
  font-size: 1.1rem;
}

:global(.main-layout) {
  padding: 25px;
}
`

export default style
