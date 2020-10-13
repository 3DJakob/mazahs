import React, { useState, forwardRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { findSong } from './utils'
import styled from 'styled-components'

// import logo from '../public/songs/'

const Container = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Bg = styled.div`
  position: absolute;
  top: -20px;
  bottom: -20px;
  right: -20px;
  left: -20px;
  background-image: url("${props => props.artwork}");
  background-size: cover;
  filter: blur(10px);
  z-index: -100;

  :before {
    content: "";
    position: absolute;
    left: 0; right: 0;
    top: 0; bottom: 0;
    background: rgba(91, 102, 120, .3);
  }
`

const Song = styled.div`
  width: 80vw;
  height: 80vw;
  max-width: 400px;
  max-height: 400px;
  background-image: url("${props => props.artwork}");
  background-size: cover;
  border-radius: 10px;
  box-shadow: 0px 0px 40px 0px rgba(0,0,0,0.21);
`

const Text = styled.h2`
  color: #fff;
  text-shadow: 0px 0px 40px 0px rgba(0,0,0,0.21);
  text-align: center;
`

function EventCatcher (props, ref) {
  const [song, setSong] = useState()

  useImperativeHandle(ref, () => ({
    sendSample: (sample) => {
      console.log('Finding song...')
      const song = findSong(sample)
      console.log(song)
      setSong(song)
      // document.querySelector('#start').click()
      return true
    }
  }))

  if (song) {
    console.log(song)
  }

  return (
    <Container>
      {song ? <Bg artwork={song.artwork} /> : null}
      {song ? <Song artwork={song.artwork} /> : null}
      {song ? <Text>You are listening to {song.name} by {song.artist} </Text> : 'loading...'}
    </Container>
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
