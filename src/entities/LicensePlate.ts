import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, DeleteDateColumn, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm'
import { User } from './User'
import { VehicleType } from './VehicleType'
import { ParkingSession } from './ParkingSession'

@Entity("LicensePlate")
export class LicensePlate extends BaseEntity {
    @PrimaryGeneratedColumn()
    license_plate_id: number

    @Column({ length: 20 })
    plate_number: string

    @Column()
    user_id: number

    @Column()
    vehicle_type_id: number

    @Column({ default: true })
    active: boolean

    @CreateDateColumn({})
    created_at: Date

    @UpdateDateColumn({})
    updated_at: Date

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date

    @ManyToOne(() => User, user => user.licensePlates)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => VehicleType, vehicleType => vehicleType.licensePlates)
    @JoinColumn({ name: 'vehicle_type_id' })
    vehicleType: VehicleType

    @OneToMany(() => ParkingSession, session => session.licensePlate)
    parkingSessions: ParkingSession[]
}