const pageContent = document.querySelector('#content')
const speed = document.querySelector('#speed')

let watchID = null
const options = {enableHighAccuracy:true}

pageContent.addEventListener('click', () => {
  	// console.log(watchID)
	if (!watchID) {
        watchID = navigator.geolocation.watchPosition(
        updatePosition, handleError, options)
	}
    else {
        navigator.geolocation.clearWatch(watchID)
        watchID = null
        speed.textContent = 0
	}
})


function updatePosition(position) {
    if (position.coords.speed === null)
        return
  	speed.textContent = (position.coords.speed * 3.6).toFixed(1)
}


function handleError(error) {
	console.log(error.message)
}