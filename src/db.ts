import { DataSource } from 'typeorm'

import * as entities from './entities'

import { DB_URL } from './config'

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: DB_URL,
    entities: Object.values(entities),
    //ssl: { rejectUnauthorized: false },
    poolSize: 5, // Limitar conexiones simultáneas
})