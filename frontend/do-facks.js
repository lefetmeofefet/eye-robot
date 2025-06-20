async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
    const img = await faceapi.fetchImage('your-photo.jpg')
    const detection = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
    if (detection) {
        const faceWidthInPixels = detection.box.width
        console.log("Face width (px):", faceWidthInPixels)
    }
}
loadModels()