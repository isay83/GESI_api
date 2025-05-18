import { DataSource } from 'typeorm'

import { AccessPermission } from './entities/AccessPermission'
import { AuthProvider } from './entities/AuthProvider'
import { Campus } from './entities/Campus'
import { ExternalUserAuthentication } from './entities/ExternalUserAuthentication'
import { LicensePlate } from './entities/LicensePlate'
import { ParkingPreference } from './entities/ParkingPreference'
import { ParkingSession } from './entities/ParkingSession'
import { ParkingSpace } from './entities/ParkingSpace'
import { Role } from './entities/Role'
import { University } from './entities/University'
import { UnknownLicensePlateRecord } from './entities/UnknownLicensePlateRecord'
import { User } from './entities/User'
import { UserCredentials } from './entities/UserCredentials'
import { VehicleType } from './entities/VehicleType'
import { Zone } from './entities/Zone'

import { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_NAME } from './config'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    database: DB_NAME,
    entities: [AccessPermission, AuthProvider, Campus, ExternalUserAuthentication, LicensePlate, ParkingPreference, ParkingSession, ParkingSpace, Role, University, UnknownLicensePlateRecord, User, UserCredentials, VehicleType, Zone],
    logging: true
})