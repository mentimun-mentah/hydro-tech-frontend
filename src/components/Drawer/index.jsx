import './index.css';
import { Drawer } from 'antd';

const DrawerContainer = ({ title, show, close, children }) => {
  return(
    <>
      <Drawer
        height="85vh"
        title={title}
        visible={show}
        onClose={close}
        placement="bottom"
        className="overlay-drawer-mask"
        closeIcon={<i className="far fa-times" />}
        maskStyle={{ backdropFilter: '1.5px', backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
      >
        {children}
      </Drawer>
    </>
  )
}

export default DrawerContainer
