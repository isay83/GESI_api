import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import accessPermissionRoutes from './routes/accessPermission.routes'
import authProviderRoutes from './routes/authProvider.routes'
import campusRoutes from './routes/campus.routes'
import externalUserAuthenticationRoutes from './routes/externalUserAuthentication.routes'
import licensePlateRoutes from './routes/licensePlate.routes'
import parkingPreferenceRoutes from './routes/parkingPreference.routes'
import parkingSessionRoutes from './routes/parkingSession.routes'
import parkingSpaceRoutes from './routes/parkingSpace.routes'
import roleRoutes from './routes/role.routes'
import universityRoutes from './routes/university.routes'
import unknownLicensePlateRecordRoutes from './routes/unknownLicensePlateRecord.routes'
import userRoutes from './routes/user.routes'
import userCredentialsRoutes from './routes/userCredentials.routes'
import vehicleTypeRoutes from './routes/vehicleType.routes'
import zoneRoutes from './routes/zone.routes'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(accessPermissionRoutes)
app.use(authProviderRoutes)
app.use(campusRoutes)
app.use(externalUserAuthenticationRoutes)
app.use(licensePlateRoutes)
app.use(parkingPreferenceRoutes)
app.use(parkingSessionRoutes)
app.use(parkingSpaceRoutes)
app.use(roleRoutes)
app.use(universityRoutes)
app.use(unknownLicensePlateRecordRoutes)
app.use(userRoutes)
app.use(userCredentialsRoutes)
app.use(vehicleTypeRoutes)
app.use(zoneRoutes)

export default app