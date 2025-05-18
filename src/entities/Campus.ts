import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, DeleteDateColumn, JoinColumn, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm';
import { University } from './University';
import { Zone } from './Zone';
import { AccessPermission } from './AccessPermission';
import { UnknownLicensePlateRecord } from './UnknownLicensePlateRecord';

@Entity("Campus")
export class Campus extends BaseEntity {
    @PrimaryGeneratedColumn()
    campus_id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ type: 'text' })
    address: string;

    @Column()
    university_id: number;

    @CreateDateColumn({})
    created_at: Date;

    @UpdateDateColumn({})
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;

    @ManyToOne(() => University, university => university.campuses)
    @JoinColumn({ name: 'university_id' })
    university: University;

    @OneToMany(() => Zone, zone => zone.campus)
    zones: Zone[];

    @OneToMany(() => AccessPermission, accessPermission => accessPermission.campus)
    accessPermissions: AccessPermission[];

    @OneToMany(() => UnknownLicensePlateRecord, record => record.campus)
    unknownLicensePlateRecords: UnknownLicensePlateRecord[];
}