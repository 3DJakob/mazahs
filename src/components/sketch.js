
// import 'p5/lib/addons/p5.sound'
// import p5 from 'p5'

export default function sketch (p) {
  const usingMic = true
  let rotation = 0
  let mic, fft

  p.setup = function () {
    p.createCanvas(710, 400, p.WEBGL)

    if (usingMic) {
      mic = new p.AudioIn()
      mic.start()
      fft = new p.FFT()
      fft.setInput(mic)
    } else {
      const song = p.loadSound('fivemore.wav', () => p.loaded())
      song.setVolume(0.5)
      fft = new p.FFT()
      fft.setInput(song)
    }
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.rotation !== null) {
      rotation = props.rotation * Math.PI / 180
    }
  }

  p.draw = function () {
    p.background(100)
    p.normalMaterial()
    p.noStroke()
    p.push()
    p.rotateY(rotation)
    p.box(100)
    p.pop()
  }
};
