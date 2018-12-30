let mySound, fft;
const WIDTH = 256;
const RESOLUTION = Math.floor(WIDTH / 8);
const MAX_RADIUS = 8;
const CENTER = Math.floor(RESOLUTION / 2);
const PAD = 24;
let clicked = false;
let color = [50, 50, 240];
let vecR = 0;
let vecG = 0;
let vecB = 0;
let font;

function preload() {
    soundFormats('mp3', 'ogg');
    // mySound = loadSound('assets/Phillip_Gross_-_01_-_Casablanca.mp3');
    //mySound = loadSound('assets/Phillip_Gross_-_03_-_Tumbona.mp3');
    mySound = loadSound('assets/aderin-the-response.mp3');

    font = loadFont('assets/mexcellent 3d.ttf');

  }

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    // cnv.setStyle('display', 'block');
    
    background('black')

    //    refresh()
    strokeWeight(3)
    stroke('gray')


    fill("white");
    textFont(font);
    textSize(40);
    textAlign(CENTER, CENTER);
    const str = "Click Anywhere to Start";
    const bounds = font.textBounds(str, 0, 0, 40);
    const x = (windowWidth - bounds.w) / 2;
    const y = (windowHeight - bounds.h) / 2;
    console.log(x, y)
    text(str, x, y);

}

function mouseClicked() {
    if (!clicked) {
        clicked = true;

        mySound.setVolume(0.5);
    
        fft = new p5.FFT(0.8, WIDTH);


        mySound.play();

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
  }

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    if (clicked) {
        noFill();
        refresh();
    }
}

function refresh() {
    background('black')

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