import Sidebar from './Sidebar.jsx'

const Layout = ({ children, setShowReport, setShowSetting, activeMenu, setActiveMenu }) => { 
  return(
    <Sidebar setShowReport={setShowReport} setShowSetting={setShowSetting} activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
      {children}
    </Sidebar>
  )
}

export default Layout
