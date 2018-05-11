const video = document.querySelector('.viewer')
const togglerButton = document.querySelector('.toggle')
const skipButtons = document.querySelectorAll('[data-skip]')
const sliders = document.querySelectorAll('.player__slider')
const progressBarWrapper = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

function toggleButtonState () {
  togglerButton.textContent = video.paused ? '►' : '∥∥'
}

function toggleVideo () {
  video[video.paused ? 'play' : 'pause']()
}

function setProperty () {
  video[this.name] = this.value
}

function jumpToTime () {
  video.currentTime += parseFloat(this.dataset.skip)
}

function updateProgressUI () {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  progressBar.style.flexBasis = `${progressPercent}%`;
}

function setVideoTime (e) {
  video.currentTime = (e.offsetX / progressBarWrapper.offsetWidth) * video.duration
}

video.addEventListener('click', toggleVideo)
video.addEventListener('play', toggleButtonState)
video.addEventListener('pause', toggleButtonState)
video.addEventListener('timeupdate', updateProgressUI)
togglerButton.addEventListener('click', toggleVideo)
sliders.forEach(slider => slider.addEventListener('change', setProperty))
sliders.forEach(slider => slider.addEventListener('mousemove', setProperty))
skipButtons.forEach(button => button.addEventListener('click', jumpToTime))

let isDragging = false
progressBarWrapper.addEventListener('click', setVideoTime)
progressBarWrapper.addEventListener('mousemove', e => isDragging && setVideoTime(e))
progressBarWrapper.addEventListener('mousedown', () => isDragging = true)
progressBarWrapper.addEventListener('mouseup', () => isDragging = false)
