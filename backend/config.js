import dotenv from 'dotenv'
import path from 'path'
import fs from "fs"


function findEnvFile() {
    let currentDir = process.cwd()

    while (true) {
        const envPath = path.join(currentDir, '.env')
        if (fs.existsSync(envPath)) {
            return envPath
        }

        const parentDir = path.dirname(currentDir)

        // If we've reached the root directory, stop
        if (currentDir === parentDir) {
            return null // .env file not found
        }
        currentDir = parentDir
    }
}

// Load the .env file
dotenv.config({
    path: findEnvFile(),
    override: true,
})

const Config = {
    port: process.env.PORT || 8081,
    hostname: process.env.HOSTNAME || "0.0.0.0",
    openAIApiKey: process.env.OPENAI_API_KEY,
}

export {Config}
