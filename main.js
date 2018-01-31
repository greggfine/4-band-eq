let audioBuffer;
let playSound;

const playBtn = document.querySelector("#play-btn");
const stopBtn = document.querySelector("#stop-btn");

const lowShelfGainSlider = document.querySelector("#low-shelf-gain");
const lowShelfFreqSlider = document.querySelector("#low-shelf-freq");

const peak1GainSlider = document.querySelector("#peak1-gain");
const peak1FreqSlider = document.querySelector("#peak1-freq");
const peak1QSlider = document.querySelector("#peak1-Q");

const peak2GainSlider = document.querySelector("#peak2-gain");
const peak2FreqSlider = document.querySelector("#peak2-freq");
const peak2QSlider = document.querySelector("#peak2-Q");

const highShelfGainSlider = document.querySelector("#high-shelf-gain");
const highShelfFreqSlider = document.querySelector("#high-shelf-freq");

const masterVolumeSlider = document.querySelector("#master-volume-slider");

const lowShelfGainVal = document.querySelector("#low-shelf-gain-val");
const lowShelfFreqVal = document.querySelector("#low-shelf-freq-val");

const highShelfGainVal = document.querySelector("#high-shelf-gain-val");
const highShelfFreqVal = document.querySelector("#high-shelf-freq-val");

const peak1GainVal = document.querySelector("#peak1-gain-val");
const peak1FreqVal = document.querySelector("#peak1-freq-val");
const peak1QVal = document.querySelector("#peak1-Q-val");

const peak2GainVal = document.querySelector("#peak2-gain-val");
const peak2FreqVal = document.querySelector("#peak2-freq-val");
const peak2QVal = document.querySelector("#peak2-Q-val");

const masterVolVal = document.querySelector("#masterVol-gain-val")

playBtn.addEventListener("click", play);
stopBtn.addEventListener("click", stop);

const ctx = new (window.AudioContext || window.webkitAudioContext)();

(function getSound() {
	let http = new XMLHttpRequest();
	http.open("GET", "audio/sg.mp3", true);
	http.responseType = "arraybuffer";
	http.onload = function(){
		ctx.decodeAudioData(http.response, function(buffer){
			audioBuffer = buffer;
		});
	};
	http.send();	
})();

function play() {
	playSound = ctx.createBufferSource();
	playSound.buffer = audioBuffer;	

	//Low-Shelf
	const lowShelf = ctx.createBiquadFilter();
	lowShelf.type = "lowshelf";
	lowShelf.frequency.value = 1000;
	lowShelf.gain.value = 8;

	lowShelfFreqSlider.addEventListener("change", () => {	
		lowShelf.frequency.value = lowShelfFreqSlider.value;
		lowShelfFreqVal.textContent = Math.round(lowShelf.frequency.value);
	})

	lowShelfGainSlider.addEventListener("change", () => {
		lowShelf.gain.value = lowShelfGainSlider.value;
		lowShelfGainVal.textContent = lowShelf.gain.value.toFixed(2);
	})

	//Peak1
	const peak1 = ctx.createBiquadFilter();
	peak1.type = "peaking";
	peak1.gain.value = 0.50;
	peak1.Q.value = 0.50;
	peak1.frequency.value = 1000;

	peak1FreqSlider.addEventListener("change", () => {
		peak1.frequency.value = peak1FreqSlider.value;
		peak1FreqVal.textContent = Math.round(peak1.frequency.value);
	})

	peak1GainSlider.addEventListener("change", () => {
		peak1.gain.value = peak1GainSlider.value;
		peak1GainVal.textContent = peak1.gain.value.toFixed(2);
	})

	peak1QSlider.addEventListener("change", () => {
		peak1.Q.value = peak1QSlider.value;
		peak1QVal.textContent = peak1.Q.value.toFixed(2);
	})

	//Peak2
	const peak2 = ctx.createBiquadFilter();
	peak2.type = "peaking";
	peak2.type = "peaking";
	peak2.gain.value = 0.50;
	peak2.Q.value = 0.50;
	peak2.frequency.value = 1000;

	peak2FreqSlider.addEventListener("change", () => {	
		peak2.frequency.value = peak2FreqSlider.value;
		peak2FreqVal.textContent = Math.round(peak2.frequency.value);
	})

	peak2GainSlider.addEventListener("change", () => {
		peak2.gain.value = peak2GainSlider.value;
		peak2GainVal.textContent = peak2.gain.value.toFixed(2);
	})

	peak2QSlider.addEventListener("change", () => {
		peak2.Q.value = peak2QSlider.value;
		peak2QVal.textContent = peak2.Q.value.toFixed(2);
	})

	//High-Shelf
	const highShelf = ctx.createBiquadFilter();
	highShelf.type = "highshelf";
	highShelf.frequency.value = 1000;
	highShelf.gain.value = 8;

	highShelfFreqSlider.addEventListener("change", () => {	
		highShelf.frequency.value = highShelfFreqSlider.value;
		highShelfFreqVal.textContent = Math.round(highShelf.frequency.value);
	})

	highShelfGainSlider.addEventListener("change", () => {
		highShelf.gain.value = highShelfGainSlider.value;
		highShelfGainVal.textContent = highShelf.gain.value.toFixed(2);
	})

	let volume = ctx.createGain();
	volume.gain.value = .25;

	playSound.connect(lowShelf);
	playSound.connect(highShelf);
	playSound.connect(peak1);
	playSound.connect(peak2);
	lowShelf.connect(volume);
	highShelf.connect(volume);
	peak1.connect(volume);
	peak2.connect(volume);
	volume.connect(ctx.destination);
	playSound.start(ctx.currentTime);

	masterVolumeSlider.addEventListener("change", () => {
		volume.gain.value = masterVolumeSlider.value;
		masterVolVal.textContent = volume.gain.value.toFixed(2);
	})
}

function stop() {
	playSound.stop(ctx.currentTime);
}