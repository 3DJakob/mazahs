import React, { useImperativeHandle } from 'react'
import logo from './logo.svg'
import './App.css'
// import SpectrumAnalyser from './components/SpectrumAnalyser'

import { findSong } from './utils'

function App (props, ref) {
  useImperativeHandle(ref, () => ({
    sendSpectrum: (song) => {
      console.log('sample collected!')
      findSong(song)
    }
  }))
  return (
    <div className='App'>
      <header className='App-header'>

        {/* <SpectrumAnalyser /> */}
      </header>
    </div>
  )
}

export default App
