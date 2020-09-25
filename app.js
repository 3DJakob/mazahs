let mic, fft

const fiveMoreSong = JSON.parse(fiveMore)
console.log(fiveMoreSong)

const usingMic = true

let exportedSong = []

const compareSongs = (refSong, audioRec) => {
  // Loop every five to start compare
  for (let index = 0; index < refSong.length; index = index + 5) {
    // Compare songs to each other
    let diff = 0
    for (let sampleIndex = 0; sampleIndex < audioRec.length; sampleIndex++) {
      diff = diff + refSong[index + sampleIndex] - audioRec[sampleIndex]
    }
    console.log('The diff is: ' + diff)
  }
}

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
    fft = new p5.FFT()
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

let stopped = false
let recording = false

function draw () { // Loop
  if (stopped) {

  } else {
    background(200)

    const spectrum = fft.analyze()
    // console.log(extract(spectrum))
    if (recording) {
      exportedSong = [...exportedSong, ...extract(spectrum)]
      // exportedSong.push(extract(spectrum))
    }

    beginShape()
    for (i = 0; i < spectrum.length; i++) {
      vertex(i, map(spectrum[i], 0, 255, height, 0))
    }
    endShape()
  }
}

function stop () {
  stopped = true
}

function start () {
  stopped = false
}

function startRecord () {
  recording = true
}

function stopRecord () {
  recording = false
  // console.log(exportedSong)
  // console.log(fiveMoreSong)
  // console.log(exportedSong)
  compareSongs(fiveMoreSong, exportedSong)
}

document.querySelector('button').addEventListener('click', function () {
  window.userStartAudio().then(() => { // denna kod kukar upp det för chrome :( Too bad
    console.log('Playback resumed successfully')
  })
})

function exportSong () {
  // console.log(exportedSong)
  // const pElement = document.createElement('p')
  let string = ''

  exportedSong.forEach((line) => {
    // pElement.textContent = pElement.textContent + line + ','
    string = string + line + ','
  })
  console.log(string)
  // document.querySelector('body').appendChild(pElement)
}
