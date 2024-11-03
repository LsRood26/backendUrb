//import { VisitStatus } from "src/types/requests";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
export enum VisitStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}
@Entity()
export class RequestEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    datetime:string;
    @Column({type:'text'})
    photo:string;
    @Column({
        type: 'enum',
        enum: VisitStatus,
        default: VisitStatus.PENDING,
    })
    status: VisitStatus;
    @ManyToOne(() => User, user => user.residents, { onDelete: 'SET NULL' })
    resident: User;
    @ManyToOne(() => User, user => user.visitors, { onDelete: 'SET NULL' })
    visitor: User;
    

}
