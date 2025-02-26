const play = document.getElementById('play');
const music = document.querySelector('audio');
const img  = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const prev = document.getElementById('prev');
const next = document.getElementById('next'); 
const repeat = document.getElementById('repeat');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let updateTimer;

const songs = [{
    name: 'music-1',
    title: '1',
    artist: '1'
},
{
    name: 'music-2',
    title: '2',
    artist: '2'
},
{
    name: 'music-3',
    title: '3',
    artist: '3'
},
{
    name: 'music-4',
    title: '4',
    artist: '4'
},
{
    name: 'music-5',
    title: '5',
    artist: '5'
}
]

let isPlaying = false;
let isRepeat = false;

const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play',  'fa-pause');
    img.classList.add('rotate');
};

const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    img.classList.remove('rotate');
};

play.addEventListener('click', () => {
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
});

const loadSong = (songs) => {
    clearInterval(updateTimer);
    reset();

    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = 'music/' + songs.name + '.m4a';
    img.src = 'images/' + songs.name + '.jpg';

    music.addEventListener('loadeddata', ()=> {
        updateTimer = setInterval(setUpdate, 1000);
    });

    music.addEventListener('ended', () => {
        if(isRepeat){
            music.currentTime = 0;
            playMusic();
        }else{
            nextSong();
        }
    });
}

let songIndex = 0;

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length; 
    loadSong(songs[songIndex]);
    console.log(1);
    
    playMusic();
}
const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; 
    loadSong(songs[songIndex]);
    console.log(2);
    
    playMusic();
}

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);

repeat.addEventListener('click', () => {
    isRepeat = !isRepeat;
    if(isRepeat){
        repeat.classList.add('active');
    }else{
        repeat.classList.remove('active');
    }
});

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function seekTo(){
    let seekTo = music.duration * (seek_slider.value / 100);
    music.currentTime = seekTo;
}
function setVolume(){
    music.volume = volume_slider.value / 10;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(music.duration)){
        seekPosition = (music.currentTime / music.duration) * 100;
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(music.currentTime / 60);
        let currentSeconds = Math.floor(music.currentTime % 60);
        let durationMinutes = Math.floor(music.duration / 60);
        let durationSeconds = Math.floor(music.duration % 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds;}
        if(durationSeconds < 10) {durationSeconds = "0" + durationSeconds;}
        if(durationMinutes < 10) {durationMinutes = "0" + durationMinutes;}
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes;}

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

loadSong(songs[songIndex]);