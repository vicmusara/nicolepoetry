'use client'

import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '')
      console.log('Hash detected:', window.location.hash, 'ID:', id)
      const el = document.getElementById(id)
      if (el) {
        console.log('Element found, scrolling:', el)
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        console.log('Element NOT found for ID:', id)
      }
    } else {
      console.log('No hash in URL or not in browser')
    }
  }, [])

  return <React.Fragment />
}

export default PageClient
