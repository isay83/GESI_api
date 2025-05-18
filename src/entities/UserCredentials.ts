import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm'
import { User } from './User'

@Entity("UserCredentials")
export class UserCredentials extends BaseEntity {
    @PrimaryGeneratedColumn()
    credential_id: number

    @Column()
    user_id: number

    @Column({ length: 255 })
    password_hash: string

    @Column({ length: 100 })
    salt: string

    @CreateDateColumn({})
    created_at: Date

    @UpdateDateColumn({})
    updated_at: Date

    @OneToOne(() => User, user => user.credentials)
    @JoinColumn({ name: 'user_id' })
    user: User
}