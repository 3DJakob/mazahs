import React, { useState, forwardRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { findSong } from './utils'

function EventCatcher (props, ref) {
  const [song, setSong] = useState()

  useImperativeHandle(ref, () => ({
    sendSample: (sample) => {
      console.log('Finding song...')
      const song = findSong(sample)
      console.log(song)
      setSong(song)
    }
  }))

  return (
    <div>
      {song ? 'You are listening to ' + song.name : 'loading...'}

    </div>
  )
}
EventCatcher = forwardRef(EventCatcher) // Necessary code!
// App = forwardRef(App) // Necessary code!

ReactDOM.render(<EventCatcher ref={(MazashInterface) => { window.MazashInterface = MazashInterface }} />, document.getElementById('root'))

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
