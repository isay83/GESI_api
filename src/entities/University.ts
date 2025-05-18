import { Column, Entity, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm';
import { Campus } from './Campus';
import { User } from './User';

@Entity("University")
export class University extends BaseEntity {
    @PrimaryGeneratedColumn()
    university_id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, nullable: true })
    contact_email: string;

    @Column({ length: 20, nullable: true })
    contact_phone: string;

    @CreateDateColumn({})
    created_at: Date;

    @UpdateDateColumn({})
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;

    @OneToMany(() => Campus, campus => campus.university)
    campuses: Campus[];

    @OneToMany(() => User, user => user.university)
    users: User[];
}