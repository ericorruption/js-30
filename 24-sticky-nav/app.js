const nav = document.getElementById('main')
const topOfNav = nav.offsetTop

function setNavState () {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px'
    document.body.classList.add('is-nav-fixed')
  } else {
    document.body.style.paddingTop = 0 
    document.body.classList.remove('is-nav-fixed')
  }
}

document.addEventListener('scroll', setNavState)