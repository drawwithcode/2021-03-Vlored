let sfondo;
let canzone = {
  title: "-",
  autor: "-",
  time: "0:00",
  cover: "-",
  filemusic: "-",
};

var jsonData;
let trackIndex = 0;
let currenttrackIndex;
let playingNow;
let showMeNow;
let isPlaying = false;

let bottoneAvanti;
let bottoneIndietro;
let playButton;
let pauseButton;
let firstPlay = true;

let canzoneCorrente;

function preload() {
  sfondo = loadImage("./assets/player.png");
  jsonData = loadJSON("tracce.json");
  font = loadFont("./assets/Anthony.otf");
}

function refreshBkg() {
  background("black");
  imageMode(CENTER);
  image(sfondo, windowWidth / 2, windowHeight / 2, 1400, 1000);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  refreshBkg();

  bottoneIndietro = createImg("./assets/indietro.png");
  bottoneIndietro.style("width", "50px");
  bottoneIndietro.position(windowWidth / 2 - 120, windowHeight / 2 - 360);
  bottoneIndietro.mousePressed(tornaIndietro);
  bottoneIndietro.style("opacity", "0.1");

  bottoneAvanti = createImg("./assets/avanti.jpeg");
  bottoneAvanti.style("width", "40px");
  bottoneAvanti.position(windowWidth / 2 + 22, windowHeight / 2 - 360);
  bottoneAvanti.mousePressed(tornaIndietro);
  bottoneAvanti.style("opacity", "0.1");

  playButton = createImg("./assets/play.jpeg");
  playButton.style("width", "32px");
  playButton.position(windowWidth / 2 - 20, windowHeight / 2 - 354);
  playButton.mousePressed(playStop);
  playButton.style("opacity", "0.1");

  pauseButton = createImg("./assets/stop.png");
  pauseButton.style("width", "50px");
  pauseButton.position(windowWidth / 2 - 68, windowHeight / 2 - 354);
  pauseButton.mousePressed(playStop);
  pauseButton.style("opacity", "0.1");
}

function playStop() {
  if (firstPlay) {
    vaiAvanti();
    firstPlay = false;
  }

  if (isPlaying) {
    playingNow.stop();
    pauseButton.style("visibility", "hidden");
    playButton.style("visibility", "visible");
  } else {
    playingNow.play();
    playButton.style("visibility", "hidden");
    pauseButton.style("visibility", "visible");
  }
  isPlaying = !isPlaying;
}

function vaiAvanti() {
  trackIndex = trackIndex + 1;
  if (trackIndex == jsonData.playlist.length) trackIndex = 0;
  riempiCanzone(jsonData.playlist[trackIndex]);
}

function tornaIndietro() {
  trackIndex = trackIndex - 1;
  if (trackIndex < 0) trackIndex = jsonData.playlist.length - 1;
  riempiCanzone(jsonData.playlist[trackIndex]);
}

function riempiCanzone(canzoneCorrente) {
  if (playingNow !== undefined && playingNow.isPlaying) {
    isPlaying = false;
    playingNow.stop();
  }
  playingNow = loadSound(canzoneCorrente.filemusic);
  showMeNow = loadImage(canzoneCorrente.cover);

  canzone.title = "";
  canzone.autor = "";
  canzone.time = "";
  canzone.cover = "";

  refreshBkg();

  setTimeout(function () {
    canzone.title = canzoneCorrente.title;
    canzone.autor = canzoneCorrente.autor;
    canzone.time = canzoneCorrente.time;
    canzone.cover = canzoneCorrente.cover;
    playingNow.play();
    isPlaying = true;
    console.log(trackIndex);
    playButton.style("visibility", "hidden");
    pauseButton.style("visibility", "visible");

    textFont(font);
    textSize(20);
    fill("green");
    textAlign(CENTER, CENTER);
    textSize(25);
    text(canzoneCorrente.title, windowWidth / 2 + 370, windowHeight / 2 - 160);
    textSize(25);
    text(canzoneCorrente.autor, windowWidth / 2 + 370, windowHeight / 2 - 135);
    textSize(25);
    text(canzoneCorrente.time, windowWidth / 2 + 370, windowHeight / 2 - 110);
    image(showMeNow, windowWidth / 2 + 10, windowHeight / 2 - 180, 240, 240);
  }, 1000);
}
