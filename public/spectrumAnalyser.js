let mic, fft

// const fiveMoreSong = JSON.parse(fiveMore) // this is a terrible song lol
// const rickRollSong = JSON.parse(rickRoll)
// const hallelujahSong = JSON.parse(hallelujah)

// const songBank = [fiveMoreSong, rickRollSong, hallelujahSong]

let exportedSong = []

const extract = (spectrum) => {
  const values = [0, 0, 0, 0, 0]

  for (let i = 0; i < spectrum.length; i++) {
    if (i <= 134) {
      if (spectrum[i] > values[0]) {
        values[0] = spectrum[i]
      }
    } else if (i <= 270) {
      if (spectrum[i] > values[1]) {
        values[1] = spectrum[i]
      }
    } else if (i <= 406) {
      if (spectrum[i] > values[2]) {
        values[2] = spectrum[i]
      }
    } else if (i <= 612) {
      if (spectrum[i] > values[3]) {
        values[3] = spectrum[i]
      }
    } else {
      if (spectrum[i] > values[4]) {
        values[4] = spectrum[i]
      }
    }
    // this is dumb, too bad!
  }

  return values
}

let lastTimeStamp

function setup () {
  createCanvas(710, 400)
  noFill()

  mic = new p5.AudioIn()
  mic.start()
  fft = new p5.FFT()
  fft.setInput(mic)

  lastTimeStamp = (new Date()).getTime()
}

function loaded () {
  song.play()
}

const stopped = false
const recording = false

function draw () { // Loop
  if (stopped) { return }

  if ((new Date()).getTime() > lastTimeStamp + 5000) {
    lastTimeStamp = lastTimeStamp + 5000
    console.log('time for export!')
    window.MazashInterface.sendSample(exportedSong)
    exportedSong = []
  }

  background(200)

  const spectrum = fft.analyze()
  // exportedSong = [...exportedSong, ...extract(spectrum)]

  // if (recording) {
  exportedSong = [...exportedSong, ...extract(spectrum)]
  // exportedSong.push(extract(spectrum))
  // }

  beginShape()
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0))
  }
  endShape()
}

document.querySelector('button').addEventListener('click', function () {
  window.userStartAudio().then(() => { // denna kod kukar upp det för chrome :( Too bad
    console.log('Playback resumed successfully')
  })
})
