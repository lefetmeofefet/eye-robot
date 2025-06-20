import express from 'express'
import {Config} from "./config.js";

const app = express()
app.use(express.static('frontend'))
app.use(express.json())


app.listen(Config.port, () => {
    console.log(`eye-robot is UP! http://localhost:${Config.port}`)
})
