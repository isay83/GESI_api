import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'
import { User } from './User'
import { AuthProvider } from './AuthProvider'

@Entity("ExternalUserAuthentication")
export class ExternalUserAuthentication extends BaseEntity {
    @PrimaryGeneratedColumn()
    authentication_id: number

    @Column()
    user_id: number

    @Column()
    provider_id: number

    @Column({ length: 255 })
    external_id: string

    @Column({ length: 100, nullable: true })
    provider_email: string

    @Column({ length: 255, nullable: true })
    access_token: string

    @Column({ length: 255, nullable: true })
    refresh_token: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    linked_at: Date

    @Column({ type: 'timestamp', nullable: true })
    last_login: Date

    @CreateDateColumn({})
    created_at: Date

    @UpdateDateColumn({})
    updated_at: Date

    @ManyToOne(() => User, user => user.externalAuthentications)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => AuthProvider, provider => provider.authentications)
    @JoinColumn({ name: 'provider_id' })
    provider: AuthProvider
}