import { Card, Skeleton } from 'antd'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const PlantCardLoading = () => {
  return (
    <>
      <Card bordered={false} className="radius1rem shadow1 h-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ".2" }}
          className="hover-pointer"
        >
          <div className="loading-square-img text-center">
            <Skeleton.Avatar shape="square" active className="loading-content-img" />
          </div>
          <div className="text-center items-center text-grey">
            <Skeleton className="loading-card" active paragraph={{ rows: 1 }}/>
          </div>
        </motion.div>
      </Card>

      <style jsx>{`
      :global(.loading-square-img){
        position: relative;
        width: 100%;
      }
      :global(.loading-square-img:after) {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
      :global(.loading-content-img){
        position: absolute;
        width: 100%;
        height: 100%;
        display: inherit;
      }
      :global(.loading-content-img.ant-skeleton-element .ant-skeleton-avatar){
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: .5rem;
      }
      :global(
        .loading-card .ant-skeleton-content .ant-skeleton-title + .ant-skeleton-paragraph, 
        .loading-card .ant-skeleton-content .ant-skeleton-title
      ){
        margin-top: 0px;
        margin-left: auto;
        margin-right: auto;
      }
      :global(.ant-skeleton-paragraph:last-of-type){
        margin-bottom: 0px;
      }
      :global(.loading-card .ant-skeleton-content .ant-skeleton-title){
        margin-top: 11px;
        margin-bottom: 11px;
      }
      :global(.loading-card .ant-skeleton-content .ant-skeleton-paragraph > li + li){
        margin-top: 10px;
      }
      :global(.loading-card .ant-skeleton-content .ant-skeleton-paragraph > li){
        margin-left: auto;
        margin-right: auto;
      }
      `}</style>
    </>
  )
}

export default PlantCardLoading
