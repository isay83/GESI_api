import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'
import { User } from './User'
import { Zone } from './Zone'

@Entity("ParkingPreference")
export class ParkingPreference extends BaseEntity {
    @PrimaryGeneratedColumn()
    preference_id: number

    @Column()
    user_id: number

    @Column()
    zone_id: number

    @Column({ type: 'time', nullable: true })
    start_time: Date

    @Column({ type: 'time', nullable: true })
    end_time: Date

    @Column({ default: true })
    notify: boolean

    @CreateDateColumn({})
    created_at: Date

    @UpdateDateColumn({})
    updated_at: Date

    @ManyToOne(() => User, user => user.parkingPreferences)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Zone, zone => zone.parkingPreferences)
    @JoinColumn({ name: 'zone_id' })
    zone: Zone
}