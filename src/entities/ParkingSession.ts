import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm'
import { ParkingSpace } from './ParkingSpace'
import { LicensePlate } from './LicensePlate'

@Entity("ParkingSession")
export class ParkingSession extends BaseEntity {
    @PrimaryGeneratedColumn()
    session_id: number

    @Column()
    parking_space_id: number

    @Column({ nullable: true })
    license_plate_id: number

    @Column({ type: 'timestamp' })
    entry_time: Date

    @Column({ type: 'timestamp', nullable: true })
    exit_time: Date

    @Column({ length: 20, default: 'active' })
    status: string

    @CreateDateColumn({})
    created_at: Date

    @UpdateDateColumn({})
    updated_at: Date

    @ManyToOne(() => ParkingSpace, parkingSpace => parkingSpace.parkingSessions)
    @JoinColumn({ name: 'parking_space_id' })
    parkingSpace: ParkingSpace

    @ManyToOne(() => LicensePlate, licensePlate => licensePlate.parkingSessions, { nullable: true })
    @JoinColumn({ name: 'license_plate_id' })
    licensePlate: LicensePlate
}