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

	lowShelfFreqSlider.addEventListener("change", () => {	
		lowShelf.frequency.value = lowShelfFreqSlider.value * 100;
	})

	lowShelfGainSlider.addEventListener("change", () => {
		lowShelf.gain.value = lowShelfGainSlider.value;
	})

	//Peak1
	const peak1 = ctx.createBiquadFilter();
	peak1.type = "peaking";

	peak1FreqSlider.addEventListener("change", () => {	
		peak1.frequency.value = peak1FreqSlider.value * 100;
	})

	peak1GainSlider.addEventListener("change", () => {
		peak1.gain.value = peak1GainSlider.value;
	})

	peak1QSlider.addEventListener("change", () => {
		peak1.Q.value = peak1QSlider.value;
	})


	//Peak2
	const peak2 = ctx.createBiquadFilter();
	peak2.type = "peaking";

	peak2FreqSlider.addEventListener("change", () => {	
		peak2.frequency.value = peak2FreqSlider.value * 100;
	})

	peak2GainSlider.addEventListener("change", () => {
		peak2.gain.value = peak2GainSlider.value;
	})

	peak2QSlider.addEventListener("change", () => {
		peak2.Q.value = peak2QSlider.value;
	})



	//High-Shelf
	const highShelf = ctx.createBiquadFilter();
	highShelf.type = "highshelf";

	highShelfFreqSlider.addEventListener("change", () => {	
		highShelf.frequency.value = highShelfFreqSlider.value * 100;
	})

	highShelfGainSlider.addEventListener("change", () => {
		highShelf.gain.value = highShelfGainSlider.value;
	})

	let volume = ctx.createGain();
	

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
	})
}

function stop() {
	playSound.stop(ctx.currentTime);
}

//Create 1band lowshelf with gain and freq
