import { RequestEntity } from "src/request/entities/request.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
@Entity()
export class User {
    @PrimaryColumn()
    dni:number;
    @Column()
    name:string;
    @Column()
    lastname:string;
    @Column()
    password:string;
    @ManyToOne(() => Role, role => role.users, { onDelete: 'SET NULL' })
    role: Role;
    @OneToMany(() => RequestEntity, request => request.resident)
    residents: RequestEntity[];
    @OneToMany(() => RequestEntity, request => request.visitor)
    visitors: RequestEntity[];
    
}
