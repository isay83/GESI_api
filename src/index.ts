import "reflect-metadata"

import app from "./app"
import { AppDataSource } from './db'
import { API_PORT } from "./config"

async function main() {
    try {
        await AppDataSource.initialize()
        console.log("Database conected")
        app.listen(API_PORT)
        console.log('Server listening on port', API_PORT)
    } catch (error) {
        console.log(error)
    }
}

main()
