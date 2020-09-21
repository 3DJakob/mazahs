let mic, fft

function setup () {
  createCanvas(710, 400)
  noFill()

  song = loadSound('fivemore.wav', loaded)
  song.setVolume(0.5)

  // mic = new p5.AudioIn()
  // mic.start()
  fft = new p5.FFT()
  fft.setInput(song)
  // fft.setInput(mic)
}

function loaded () {
  song.play()
}

function draw () {
  background(200)

  const spectrum = fft.analyze()

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
