// var spectrogram = require('spectrogram');
// import spectrogram from 'spectrogram'

var spectro = Spectrogram(document.getElementById('canvas'), {
  audio: {
    enable: false
  }
});

var audioContext = new AudioContext();
var request = new XMLHttpRequest();
request.open('GET', 'fivemore.wav', true);
request.responseType = 'arraybuffer';

request.onload = function() {
  audioContext.decodeAudioData(request.response, function(buffer) {
    spectro.connectSource(buffer, audioContext);
    spectro.start();
  });
};

request.send();


document.querySelector('button').addEventListener('click', function() {
    context.resume().then(() => {
      console.log('Playback resumed successfully');
    });
  });

const startSpectrum = () => {
    context.resume().then(() => {
        console.log('Playback resumed successfully');
      });
}
