import { useEffect } from 'react'
import { Divider, Empty } from 'antd'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import React from 'react'
import axios from 'lib/axios'
import * as actions from 'store/actions'

const Documentation = () => {
  const router = useRouter()

  const isDocs = router.pathname.startsWith('/docs')
  const allDocumentations = useSelector(state => state.documentations.allDocumentations)

  useEffect(() => {
    if(isDocs) document.body.classList.add("bg-white")
    else document.body.classList.remove("bg-white")
    return () => document.body.classList.remove("bg-white")
  }, [isDocs])

  useEffect(() => {
    let listTable = document.getElementById("section-document-id").getElementsByTagName("table")
    let listTableMobile = document.getElementById("section-document-id").getElementsByTagName("table")
    for(let i = 0; i < listTable.length; i++){
      listTable[i].classList.add("table-sm", "table-bordered", "table-responsive", "border-0")
    }
    for(let i = 0; i < listTableMobile.length; i++){
      listTableMobile[i].classList.add("table-sm", "table-bordered", "table-responsive", "border-0")
    }
  }, [])


  return(
    <>
    <div id="section-document-id">
    {allDocumentations && allDocumentations.length > 0 ? (
      <>
        {allDocumentations.map(docs => (
          <div key={docs.category_docs_id}>
            {docs && docs.childs && docs.childs.length > 0 && docs.childs.map(child => (
              <div key={child.documentations_id}>
                <div id={child.documentations_slug} className="section-docs">
                  <h1 className="entry-title">
                    <b>{child.documentations_title}</b>
                  </h1>
                  <div dangerouslySetInnerHTML={{__html: child.documentations_description}} />
                </div>
                <Divider />
              </div>
            ))}
          </div>
        ))}
      </>
    ) : (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: ".2" }}
        className="w-100 text-center"
      >
        <Empty className="m-t-150 m-b-150" description={<span className="text-grey">No Data</span>} /> 
      </motion.div>
    )}
    </div>

      <style jsx>{`
        :global(#section-document-id p) {
          margin-bottom: 5px;
        }
        :global(#section-document-id table) {
          padding: 0;
          margin-left: auto;
          margin-right: auto;
        }
        :global(#section-document-id img) {
          margin: 0 auto !important;
          display: block;
        }
        :global(.section-docs) {
          padding-top: 80px;
          margin-top: -80px;
        }
        :global(.table-bordered, .table-bordered td, .table-bordered th) {
          border: 1px solid #dee2e6;
          padding: 10px;
        }
        :global(.table-responsive) {
          // display: block;
          // width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        :global(.border-0) {
          border-width: 0;
        }

      `}</style>
    </>
  )
}

Documentation.getInitialProps = async ctx => {
  try{
    const res = await axios.get(`/documentations/all-documentations`)
    ctx.store.dispatch(actions.getAllDocumentationSuccess(res.data))
  }
  catch (err) {
    const res = await axios.get(`/documentations/all-documentations`)
    ctx.store.dispatch(actions.getAllDocumentationSuccess(res.data))
  }
}

export default Documentation
