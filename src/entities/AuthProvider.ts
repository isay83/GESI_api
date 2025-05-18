import { Column, Entity, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm'
import { ExternalUserAuthentication } from './ExternalUserAuthentication'

@Entity("AuthProvider")
export class AuthProvider extends BaseEntity {
    @PrimaryGeneratedColumn()
    provider_id: number

    @Column({ length: 50 })
    name: string

    @Column({ default: true })
    active: boolean

    @CreateDateColumn({})
    created_at: Date

    @UpdateDateColumn({})
    updated_at: Date

    @OneToMany(() => ExternalUserAuthentication, auth => auth.provider)
    authentications: ExternalUserAuthentication[]
}