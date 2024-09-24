import React from 'react'
import HelpHeader from '../components/Help/HelpHeader'
import ReportBugs from '../components/Help/ReportBugs'

const Help = () => {
  return (
    <section className='bg-black bg-opacity-50 h-[93vh]'>
      <HelpHeader/>
      <ReportBugs/>
    </section>
  )
}

export default Help