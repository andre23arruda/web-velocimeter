import React, { useState } from 'react'

import './App.css'


export default function App() {
	const [speed, setSpeed] = useState(0)

	let watchID = null
	const options = {enableHighAccuracy:true}

	function onClick() {
		if (!watchID) {
			watchID = navigator.geolocation.watchPosition(
			updatePosition, handleError, options)
		}
		else {
			navigator.geolocation.clearWatch(watchID)
			watchID = null
			setSpeed(0)
		}
	}

	function updatePosition(position) {
		if (position.coords.speed === null)
			return
		setSpeed((position.coords.speed * 3.6).toFixed(1))
	}


	function handleError(error) {
		console.log(error.message)
	}

	function speedColor() {
		if (speed > 100) {
			return 'orange'
		} else if (speed > 40) {
			return 'lightseagreen'
		}
		return '#444'
	}

	return (
		<div
			id="content"
			onClick={onClick}
			style={{ backgroundColor: speedColor() }}
		>
			<div id="speed">
				{ speed }
			</div>
			<div>Km/h</div>
		</div>
	)
}
