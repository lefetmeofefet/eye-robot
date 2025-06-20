import "./libraries/face-api.min.js"

async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
    video.srcObject = stream
    return new Promise(resolve => video.onloadedmetadata = resolve)
}

async function main() {
    await setupCamera()
    await faceapi.nets.tinyFaceDetector.loadFromUri('./models')
    await faceapi.nets.faceLandmark68TinyNet.loadFromUri('./models')  // 👁️ Load landmarks

    setInterval(async () => {
        const detection = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks(true)

        if (detection && detection.landmarks) {
            const landmarks = detection.landmarks

            const leftEye = landmarks.getLeftEye()
            const rightEye = landmarks.getRightEye()

            // 👁️ Get center point of each eye
            const left = averagePoint(leftEye)
            const right = averagePoint(rightEye)

            // 📏 Compute distance between eyes in pixels
            const dx = left.x - right.x
            const dy = left.y - right.y
            const eyeDistPx = Math.sqrt(dx * dx + dy * dy)

            const realEyeDistCm = 6.3
            const focalLengthPx = 600
            const distance = (realEyeDistCm * focalLengthPx) / eyeDistPx

            info.innerHTML = `
        Eye Distance: ${eyeDistPx.toFixed(1)} px<br>
        Estimated Distance: ${distance.toFixed(1)} cm
      `
        } else {
            info.textContent = "No face/landmarks detected"
        }
    }, 300)
}

// Utility: average point of eye landmarks
function averagePoint(points) {
    const sum = points.reduce((acc, pt) => ({ x: acc.x + pt.x, y: acc.y + pt.y }), { x: 0, y: 0 })
    return { x: sum.x / points.length, y: sum.y / points.length }
}

main()