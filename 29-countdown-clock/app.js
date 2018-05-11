let countdown
const timerButtons = document.querySelectorAll('.timer__button')
const timerUI = document.querySelector('.display__time-left')
const endTimeUI = document.querySelector('.display__end-time') 

function timer (seconds) {
  clearInterval(countdown)
  
  const now = Date.now()
  const then = now + seconds * 1000
  
  displayTimeLeft(seconds) // because setInterval triggers only after 1s
  displayEndTime(then)
  
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft (seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  const formattedDisplay = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
  
  timerUI.textContent = formattedDisplay
}

function displayEndTime (timestamp) {
  const end = new Date(timestamp)
  const hours = end.getHours()
  const minutes = end.getMinutes()
  
  const americanHour = hours > 12 ? hours - 12 : hours
  
  endTimeUI.textContent = `Be back at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`
}

function setTimer () {
  const seconds = parseInt(this.dataset.time, 10)
  timer(seconds)
}

timerButtons.forEach(button => button.addEventListener('click', setTimer))
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault()
  
  const mins = this.minutes.value
  timer(mins * 60)
  this.reset()
})