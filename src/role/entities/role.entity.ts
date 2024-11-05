import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
@Entity()
export class Role {
    @PrimaryColumn()
    id:number;
    @Column()
    name:string;
    @OneToMany(() => User, user => user.role)
    users: User[];
}
