let mySound, fft;
const WIDTH = 8;
const MAX_RADIUS = 50;
const CENTER = [320, 240]

function preload() {
    soundFormats('mp3', 'ogg');
    mySound = loadSound('assets/Phillip_Gross_-_03_-_Tumbona.mp3');
    mySound.setVolume(1);
  }

function setup() {
    createCanvas(640, 480);
    mySound.setVolume(0.1);
    //mySound.play();
    
    fft = new p5.FFT(0.8, 64);

    background('black')

    refresh()

}

function draw() {
    /* const PAD = 50;
    const analyze = fft.analyze();

    background('black')
    stroke('white')
    // fill('black')
    noFill() */
   
    
}

function refresh() {
    for (let y = 0; y < WIDTH; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const idx = ((y - 1) * WIDTH + x - 1) % (WIDTH / 2);
            const pos = idx % WIDTH - 1 + Math.floor(WIDTH / 2);

            const radius = 30;//analyze[pos] / 3;

            //ellipse(x * PAD, y * PAD, radius)
        }
    }
    console.log('00000000000000000000000')
}