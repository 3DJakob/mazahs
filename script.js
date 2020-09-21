var song
var slider

function setup () {
  console.log('foo')
  createCanvas(200, 200)
  song = loadSound('fivemore.wav', loaded)
  amp = new p5.Amplitude()
  song.setVolume(0.5)
  // sliderRate = createSlider(0, 1.5, 1, 0.01);
  // sliderPan = createSlider(0, 1, 0.5, 0.01);
}

function loaded () {
  song.play()
}

function draw () {
//   console.log('draw')
  background(51)

  var vol = amp.getLevel()
  var diam = map(vol, 0, 0.3, 10, 200)

  fill(255, 0, 255)
  ellipse(width / 2, height / 2, diam, diam)
}
