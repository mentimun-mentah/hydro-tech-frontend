import { Row, Col, Badge } from 'antd'
import { motion } from 'framer-motion'

import Image from 'next/image'

const People = ({ avatar, name, online }) => {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
      >
        <Row align="middle" gutter={[10,10]} className={`${!online && 'op--5' } m-b-10 people-container`} wrap={false}>
          <Col flex="none">
            {online ? (
              <Badge dot status="success">
                <Image className="border-radius--5rem" src={avatar} width={30} height={30} alt="user" />
              </Badge>
            ) : (
              <Image className="border-radius--5rem" src={avatar} width={30} height={30} alt="user" />
            )}
          </Col>
          <Col flex="auto" className="truncate">
            <h4 className="fw-600 truncate text-capitalize">{name}</h4>
          </Col>
        </Row>
      </motion.div>

      <style jsx>{`
        :global(.op--5) {
          opacity: .5;
        }
        :global(.people-container:hover) {
          opacity: 1;
          cursor: pointer;
          transition: .2s ease-in-out;
        }
      `}</style>
    </>
  )
}

export default People
