let mySound, fft;
const WIDTH = 256;
const RESOLUTION = Math.floor(WIDTH / 8);
const MAX_RADIUS = 8;
const CENTER = Math.floor(RESOLUTION / 2);
const PAD = 24;
let stop = false;
let color = [50, 50, 240];
let vecR = 0;
let vecG = 0;
let vecB = 0;

function preload() {
    soundFormats('mp3', 'ogg');
    // mySound = loadSound('assets/Phillip_Gross_-_01_-_Casablanca.mp3');
    //mySound = loadSound('assets/Phillip_Gross_-_03_-_Tumbona.mp3');
    mySound = loadSound('assets/aderin-the-response.mp3');
    mySound.setVolume(1);
  }

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    // cnv.setStyle('display', 'block');
    mySound.setVolume(0.5);
    mySound.play();
    
    fft = new p5.FFT(0.8, WIDTH);

    background('black')

    //    refresh()
    strokeWeight(3)
    stroke('gray')

   setInterval(_ => {
       const colorR = Math.floor((1 + Math.sin(vecR)) * 128);
       const colorG = Math.floor((1 + Math.sin(vecG)) * 128);
       const colorB = Math.floor((1 + Math.sin(vecB)) * 128);
       
       vecR += 0.1;
       vecG += 0.2;
       vecB += 0.3;

       color = [colorR, colorG, colorB];
   }, 1000)

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {

    if (!stop) {
        background('black')
        noFill()
        refresh()
    } else {
        mySound.stop()
    }
   
    
}

function refresh() {
    const analyze = fft.analyze().sort((a, b) => a < b ? 1 : -1).filter(a => a > 0);
    // console.log(analyze.length)
    const waveform = fft.waveform();

    for (let y = 0; y < RESOLUTION; y++) {
        for (let x = 0; x < RESOLUTION; x++) {
            const distFromCenterX = Math.abs(CENTER - x);
            const distFromCenterY = Math.abs(CENTER - y);
            const distFromCenter = Math.floor(Math.sqrt(Math.pow(distFromCenterX, 2) + Math.pow(distFromCenterY, 2)) );
            const alpha = 1024 / (distFromCenter + 1);
            const radius = Math.pow(analyze[distFromCenter], 2) / 512;
            
            stroke(...color, alpha);
            ellipse((windowWidth - PAD * RESOLUTION) / 2 + x * PAD, (windowHeight - PAD * RESOLUTION) / 2 + y * PAD, radius)
        }
    }
}