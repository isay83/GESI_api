import { Column, Entity, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm'
import { User } from './User'

@Entity("Role")
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    role_id: number

    @Column({ length: 50 })
    name: string

    @CreateDateColumn({})
    created_at: Date

    @UpdateDateColumn({})
    updated_at: Date

    @OneToMany(() => User, user => user.role)
    users: User[]
}