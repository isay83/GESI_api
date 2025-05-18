import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, DeleteDateColumn, JoinColumn, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm';
import { Campus } from './Campus';
import { ParkingSpace } from './ParkingSpace';
import { ParkingPreference } from './ParkingPreference';

@Entity("Zone")
export class Zone extends BaseEntity {
    @PrimaryGeneratedColumn()
    zone_id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column()
    campus_id: number;

    @CreateDateColumn({})
    created_at: Date;

    @UpdateDateColumn({})
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;

    @ManyToOne(() => Campus, campus => campus.zones)
    @JoinColumn({ name: 'campus_id' })
    campus: Campus;

    @OneToMany(() => ParkingSpace, parkingSpace => parkingSpace.zone)
    parkingSpaces: ParkingSpace[];

    @OneToMany(() => ParkingPreference, parkingPreference => parkingPreference.zone)
    parkingPreferences: ParkingPreference[];
}