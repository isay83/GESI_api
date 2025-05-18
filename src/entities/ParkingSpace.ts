import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, DeleteDateColumn, JoinColumn, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm';
import { Zone } from './Zone';
import { ParkingSession } from './ParkingSession';

@Entity("ParkingSpace")
export class ParkingSpace extends BaseEntity {
    @PrimaryGeneratedColumn()
    parking_space_id: number;

    @Column({ length: 20 })
    number: string;

    @Column({ length: 20, default: 'available' })
    status: string;

    @Column()
    zone_id: number;

    @CreateDateColumn({})
    created_at: Date;

    @UpdateDateColumn({})
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;

    @ManyToOne(() => Zone, zone => zone.parkingSpaces)
    @JoinColumn({ name: 'zone_id' })
    zone: Zone;

    @OneToMany(() => ParkingSession, parkingSession => parkingSession.parkingSpace)
    parkingSessions: ParkingSession[];
}