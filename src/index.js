
var canvas = document.getElementById("oscilloscope");
var canvasCtx = canvas.getContext("2d");
document.addEventListener('DOMContentLoaded', e => {



  console.log('load')
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var analyser = audioCtx.createAnalyser();

  var music = document.querySelector('#source-audio')

  music.src = 'audio/faded.mp3';

  var source = audioCtx.createMediaElementSource(music);
  // var source = audioCtx.createOscillator()
  // source.frequency.value = 440
  console.log(source)
  console.log(audioCtx)

  var gainNode = audioCtx.createGain();
  source.connect(analyser);
  analyser.connect(audioCtx.destination)

  for (i = 0; i < 1024; i++) {
    new Orb(i)
  }

  music.play()

  // console.log(audioCtx.destination)
  // gainNode.connect();
  // source.noteOn(0)

  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength)
  var dataArray = new Uint8Array(bufferLength);
  console.log(dataArray)
  analyser.getByteTimeDomainData(dataArray);

  function draw() {
    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";



    // canvasCtx.beginPath();
    //
    // var sliceWidth = canvas.width * 1.0 / bufferLength;
    // var x = 0;
    //
    // for (var i = 0; i < bufferLength; i++) {
    //
    //   var v = dataArray[i] / 128.0;
    //   var y = v * canvas.height / 2;
    //
    //   if (i === 0) {
    //     canvasCtx.moveTo(x, y);
    //   } else {
    //     canvasCtx.lineTo(x, y);
    //   }
    //
    //   x += sliceWidth;
    // }
    //
    // canvasCtx.lineTo(canvas.width, canvas.height / 2);
    // canvasCtx.stroke();
    Orb.all.map(orb => orb.render(dataArray))
  }

  draw();
})
