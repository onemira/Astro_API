let mainImage = {}
let updateLaunching = []
let temp = {}
let index = 0
let total = 0

const nasa = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(resp => {
      return resp.json()
    })
    .then(apod => {
      mainImage = apod
      console.log(mainImage)
      document.querySelector('.main-image').style.backgroundImage = `url(${mainImage.url})`
      // ----------------------------------------------
      let temp = mainImage.copyright ===
        null ? 'copyright: no copyright' : mainImage.copyright
      document.querySelector('.copyright').textContent = temp + ' | ' + ' title: ' + mainImage.title
    })
}
const spaceX = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(resp => {
      return resp.json()
    })
    .then(upcoming => {
      updateLaunching = upcoming
      console.log(updateLaunching)
      document.querySelector('.test').textContent = updateLaunching[0].mission_name
      document.querySelector('.unix').textContent = updateLaunching[0].details
      document.querySelector('.utc').textContent = updateLaunching[0].launch_date_utc
      document.querySelector('.siteName').textContent = updateLaunching[0].launch_site.site_name_long
      total = updateLaunching.length - 1

      let temp = updateLaunching[0].details ===
        null ? 'No description available yet' : updateLaunching[0].details
      document.querySelector('.unix').textContent = temp
    })
}

const updateSpaceX = () => {
  index++
  console.log(total)
  if (index <= total) {
    document.querySelector('.test').textContent = updateLaunching[index].mission_name
    document.querySelector('.unix').textContent = updateLaunching[index].details
    document.querySelector('.utc').textContent = updateLaunching[index].launch_date_utc
    document.querySelector('.siteName').textContent = updateLaunching[index].launch_site.site_name_long
  }
}

// CountDownTimer('utc', 'countdown');

const CountDownTimer = () => {
  let end = new Date(dt, '#countdown');

  let _second = 1000;
  let _minute = _second * 60;
  let _hour = _minute * 60;
  let _day = _hour * 24;
  let timer;

  const showRemaining = () => {
    let now = new Date();
    let distance = end - now;

    let days = Math.floor(distance / _day);
    let hours = Math.floor((distance % _day) / _hour);
    let minutes = Math.floor((distance % _hour) / _minute);
    let seconds = Math.floor((distance % _minute) / _second);

    document.getElementsById('#countdown').innerHTML = days + 'days';
    document.getElementById('#countdown').innerHTML += hours + 'hours';
    document.getElementById('#countdown').innerHTML += minutes + 'mins';
    document.getElementById('#countdown').innerHTML += seconds + 'seconds';
  }

  timer = setInterval(showRemaining, 1000);
}

document.addEventListener('DOMContentLoaded', nasa)
document.addEventListener('DOMContentLoaded', spaceX)
document.querySelector('.btn-left').addEventListener('click', updateSpaceX)
document.querySelector('.btn-right').addEventListener('click', updateSpaceX)