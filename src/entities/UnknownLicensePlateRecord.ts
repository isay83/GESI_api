import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, BaseEntity } from 'typeorm'
import { Campus } from './Campus'

@Entity("UnknownLicensePlateRecord")
export class UnknownLicensePlateRecord extends BaseEntity {
    @PrimaryGeneratedColumn()
    record_id: number

    @Column({ length: 20 })
    plate_number: string

    @Column({ type: 'timestamp' })
    timestamp: Date

    @Column({ type: 'text', nullable: true })
    image_url: string

    @Column()
    campus_id: number

    @CreateDateColumn({})
    created_at: Date

    @ManyToOne(() => Campus, campus => campus.unknownLicensePlateRecords)
    @JoinColumn({ name: 'campus_id' })
    campus: Campus
}