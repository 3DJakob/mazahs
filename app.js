let mic, fft

usingMic = false

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

function setup () {
  createCanvas(710, 400)
  noFill()

  if (usingMic) {
    mic = new p5.AudioIn()
    mic.start()
    fft.setInput(mic)
  } else {
    song = loadSound('fivemore.wav', () => loaded())
    song.setVolume(0.5)
    fft = new p5.FFT()
    fft.setInput(song)
  }
}

function loaded () {
  song.play()
}

function draw () {
  background(200)

  const spectrum = fft.analyze()
  console.log(extract(spectrum))

  beginShape()
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0))
  }
  endShape()
}

document.querySelector('button').addEventListener('click', function () {
  userStartAudio().then(() => {
    console.log('Playback resumed successfully')
  })
})
