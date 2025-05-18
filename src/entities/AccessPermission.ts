import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm'
import { User } from './User'
import { Campus } from './Campus'

@Entity("AccessPermission")
export class AccessPermission extends BaseEntity {
    @PrimaryGeneratedColumn()
    access_id: number

    @Column()
    user_id: number

    @Column()
    campus_id: number

    @Column({ type: 'date' })
    start_date: Date

    @Column({ type: 'date', nullable: true })
    end_date: Date

    @CreateDateColumn({})
    created_at: Date

    @UpdateDateColumn({})
    updated_at: Date

    @ManyToOne(() => User, user => user.accessPermissions)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Campus, campus => campus.accessPermissions)
    @JoinColumn({ name: 'campus_id' })
    campus: Campus
}