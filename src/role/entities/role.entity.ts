import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @OneToMany(() => User, user => user.role)
    users: User[];
}
