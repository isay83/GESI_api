import { Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'
import { LicensePlate } from './LicensePlate'

@Entity("VehicleType")
export class VehicleType extends BaseEntity {
    @PrimaryGeneratedColumn()
    vehicle_type_id: number

    @Column({ length: 50 })
    name: string

    @Column({ type: 'text', nullable: true })
    description: string

    @CreateDateColumn({})
    created_at: Date

    @UpdateDateColumn({})
    updated_at: Date

    @OneToMany(() => LicensePlate, licensePlate => licensePlate.vehicleType)
    licensePlates: LicensePlate[]
}