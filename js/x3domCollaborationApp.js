function X3DOMCollaborationApp() {
    console.log("starting " + this)
	
	try {
	//	var socket = io.connect('http://rbyte.no-ip.biz:8080')
		var socket = io.connect('http://webcollaborationapp.steven_birr.c9.io')
//		var socket = io.connect('http://localhost:8080')
		
		socket.on('connect', function () {
			x3domCollaborationApp.log("Client has connected to the server!")
		})

		socket.on('callFromRemote', function(data) {
			var dataParsed = JSON.parse(data)
			// this is of course completely unsafe to do ... but its simple
			eval(dataParsed[0]+'.'+dataParsed[1]+'.apply('+dataParsed[0]+', dataParsed[2])')
		})
		
		socket.on('myText', function(data) {
			console.log(data)
		})

		this.callOnRemote = function(context, func, args) {
			var toBeSend = this.stringify([context, func, args])
	//		console.log("sending: "+context+'.'+func+'.apply('+context+', '+args+')')
	//		console.log("stringified: "+toBeSend)
			socket.emit("mySyncChannel", toBeSend)
		}

		this.stringify = function(object) {
			var finished = false
			window.setTimeout(function () {
				if (!finished)
					console.log("stringifying failed!!!")
			}, 50)
			var toBeSend = JSON.stringify(object)
			finished = true
			return toBeSend
		}

		this.sendText = function(txt) {
			this.log("< " + txt)
			socket.emit("myTextChannel", txt)
		}
		
		//	this.sendText("hard coded msg :)")
	} catch(err) {
		console.log("X3DOMCollaborationApp: COULD NOT estabilsh server connection.")
		// so they dont throw errors
		this.callOnRemote = function() {}
		this.sendText = function() {}
	}

}
