const gallery = document.getElementById("gallery")

async function loadCity(city){

gallery.innerHTML=""

const res = await fetch(`/media/${city}`)
const files = await res.json()

files.forEach(file=>{

const path = `/media/${city}/${file}`

/* IMAGE */

if(file.match(/\.(jpg|jpeg|png|webp)$/i)){

const img=document.createElement("img")

img.src=path

img.onclick=()=>openViewer(path,"image")

gallery.appendChild(img)

}

/* VIDEO */

if(file.match(/\.(mp4|mov|webm)$/i)){

const video=document.createElement("video")

video.src=path

video.muted=true
video.loop=true
video.playsInline=true

video.addEventListener("click",()=>{

openViewer(path,"video")

})

gallery.appendChild(video)

}

})

}


/* VIEWER */

const viewer=document.getElementById("viewer")
const viewerImg=document.getElementById("viewerImg")
const viewerVideo=document.getElementById("viewerVideo")

function openViewer(src,type){

viewer.classList.add("open")

viewerImg.style.display="none"
viewerVideo.style.display="none"

viewerVideo.pause()
viewerVideo.src=""

if(type==="video"){

viewerVideo.src=src
viewerVideo.style.display="block"
viewerVideo.play()

}else{

viewerImg.src=src
viewerImg.style.display="block"

}

}

document.querySelector(".closeViewer").onclick=()=>{

viewer.classList.remove("open")

viewerVideo.pause()
viewerVideo.src=""

}

const video = document.getElementById("viewerVideo")
const playBtn = document.getElementById("playBtn")
const progress = document.getElementById("progressBar")
const progressContainer = document.querySelector(".progressContainer")
const timeLabel = document.getElementById("time")

/* play pause */

playBtn.onclick = () => {

if(video.paused){

video.play()
playBtn.innerText="❚❚"

}else{

video.pause()
playBtn.innerText="▶"

}

}

/* progress */

video.addEventListener("timeupdate",()=>{

const percent = (video.currentTime / video.duration) * 100

progress.style.width = percent + "%"

const minutes = Math.floor(video.currentTime / 60)
const seconds = Math.floor(video.currentTime % 60)

timeLabel.innerText = minutes + ":" + String(seconds).padStart(2,"0")

})

/* seek */

progressContainer.onclick = (e)=>{

const width = progressContainer.clientWidth

const clickX = e.offsetX

video.currentTime = (clickX / width) * video.duration

}


/* swipe gestures */

let startX = 0
let startY = 0

viewer.addEventListener("touchstart",(e)=>{

startX = e.touches[0].clientX
startY = e.touches[0].clientY

})

viewer.addEventListener("touchend",(e)=>{

let endX = e.changedTouches[0].clientX
let endY = e.changedTouches[0].clientY

let diffX = endX - startX
let diffY = endY - startY

/* swipe down close */

if(diffY > 120){

viewer.classList.remove("open")

viewerVideo.pause()
viewerVideo.src=""

}

/* swipe left right */

if(Math.abs(diffX) > 120){

if(diffX < 0){

nextMedia()

}else{

prevMedia()

}

}

})

let mediaList = []
let currentIndex = 0 

function nextMedia(){

currentIndex++

if(currentIndex >= mediaList.length){

currentIndex = 0

}

openViewer(`/media/${currentCity}/${mediaList[currentIndex]}`)

}

function prevMedia(){

currentIndex--

if(currentIndex < 0){

currentIndex = mediaList.length - 1

}

openViewer(`/media/${currentCity}/${mediaList[currentIndex]}`)

}

video.onloadedmetadata = () => {
if(video.videoHeight > video.videoWidth){
video.classList.add("vertical")
}
}