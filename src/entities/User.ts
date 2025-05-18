import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn, DeleteDateColumn, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm'
import { Role } from './Role'
import { University } from './University'
import { UserCredentials } from './UserCredentials'
import { ExternalUserAuthentication } from './ExternalUserAuthentication'
import { LicensePlate } from './LicensePlate'
import { ParkingPreference } from './ParkingPreference'
import { AccessPermission } from './AccessPermission'

@Entity("User")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column({ length: 20, nullable: true })
    user_number: string

    @Column({ length: 50 })
    first_name: string

    @Column({ length: 50 })
    last_name: string

    @Column({ length: 100, unique: true })
    email: string

    @Column({ length: 20, nullable: true })
    phone: string

    @Column()
    role_id: number

    @Column()
    university_id: number

    @CreateDateColumn({})
    created_at: Date

    @UpdateDateColumn({})
    updated_at: Date

    @Column({ default: true })
    active: boolean

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role

    @ManyToOne(() => University, university => university.users)
    @JoinColumn({ name: 'university_id' })
    university: University

    @OneToOne(() => UserCredentials, credentials => credentials.user)
    credentials: UserCredentials

    @OneToMany(() => ExternalUserAuthentication, auth => auth.user)
    externalAuthentications: ExternalUserAuthentication[]

    @OneToMany(() => LicensePlate, licensePlate => licensePlate.user)
    licensePlates: LicensePlate[]

    @OneToMany(() => ParkingPreference, preference => preference.user)
    parkingPreferences: ParkingPreference[]

    @OneToMany(() => AccessPermission, permission => permission.user)
    accessPermissions: AccessPermission[]
}