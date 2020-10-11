import React, { useEffect, useRef } from 'react'
import Sketch from 'react-p5'

// import 'p5/lib/addons/p5.sound'
// import p5 from 'p5'
// import p5sound from 'p5/sound'
// import p5 from 'p5/sound'
// import 'p5/lib/addons/p5.sound'
// import 'p5/lib/addons/p5.sound'
// import 'p5/lib/addons/p5.dom'

// import p5 from '../../node_modules/p5/lib/addons/p5.sound'

// import p5 from 'p5'
// import 'p5/lib/addons/p5.sound'

import P5Wrapper from 'react-p5-wrapper'

import fiveMoreSong from '../songs/fiveMore.json'
import rickRollSong from '../songs/rickroll.json'
import hallelujahSong from '../songs/hallelujah.json'
import sketch from './sketch'

const songBank = [fiveMoreSong, rickRollSong, hallelujahSong]

function SpectrumAnalyser () {
  return <P5Wrapper sketch={sketch} />
}

export default SpectrumAnalyser
