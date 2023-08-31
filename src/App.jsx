import React, { useState } from 'react'
import NoSleep from 'nosleep.js'

import './App.css'


export default function App() {
	const [speed, setSpeed] = useState((0).toFixed(1))
	const [isStopped, setIsStopped] = useState(true)
	const [watchID, setWatchID] = useState(null)
	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	}

	var noSleep = new NoSleep()

	function onClick() {
		if (!watchID && isStopped) {
			setWatchID(navigator.geolocation.watchPosition(
				updatePosition, handleError, options
			))
			setIsStopped(false)
			noSleep.enable()
		}
		else {
			navigator.geolocation.clearWatch(watchID)
			setWatchID(null)
			setSpeed((0).toFixed(1))
			setIsStopped(true)
			noSleep.disable()
		}
	}

	function updatePosition(position) {
		if (isStopped) {
			setSpeed((0).toFixed(1))
		}
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

			<p id="tap">
				Tap to {isStopped ? 'start' : 'stop'}
			</p>
		</div>
	)
}
