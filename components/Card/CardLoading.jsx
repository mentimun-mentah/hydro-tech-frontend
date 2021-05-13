import { Card, Skeleton } from 'antd'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import Image from 'next/image'

const PlantCardLoading = () => {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: ".2" }}
      >
        <Card 
          className="w-100 card-loading"
          bordered={false}
          cover={<Image src="/static/images/loader.gif" width={350} height={250} alt="card-loading" />}
        >
          <Skeleton className="loading-card" active paragraph={{ rows: 2 }} loading={true} />
        </Card>
      </motion.div>

      <style jsx>{`
        :global(.ant-card.card-loading .ant-card-cover img) {
          object-fit: cover;
          border-radius: .5rem;
        }

        :global(.card-loading) {
          border-radius: .5rem;
        }

        :global(.blog-image) {
          padding-top: 74px;
        }

        :global(.ant-skeleton-title) {
          margin-bottom: 16px;
        }
        :global(
          .loading-card .ant-skeleton-content .ant-skeleton-title + .ant-skeleton-paragraph, 
          .loading-card .ant-skeleton-content .ant-skeleton-title
        ){
          margin-top: 0px;
        }
        :global(.ant-skeleton-paragraph:last-of-type){
          margin-bottom: 0px;
        }
      `}</style>
    </>
  )
}

export default PlantCardLoading
