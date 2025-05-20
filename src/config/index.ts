import dotenv from 'dotenv'

dotenv.config()

export const API_PORT = process.env.API_PORT ? parseInt(process.env.API_PORT) : 3000

export const DB_TYPE = process.env.DB_HOST || 'postgres'
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USER = process.env.DB_USER || 'gesi_god'
export const DB_PASS = process.env.DB_PASS || 'gesi_god'
export const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5433
export const DB_NAME = process.env.DB_NAME || 'gesi'
export const DB_URL = process.env.DB_URL || `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

export const INTERNAL_DB_URL = process.env.INTERNAL_DB_URL || 'postgres://gesi_god:gesi_god@localhost:5433/gesi'
export const EXTERNAL_DB_URL = process.env.EXTERNAL_DB_URL || 'postgres://gesi_god:gesi_god@localhost:5433/gesi'