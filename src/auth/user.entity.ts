import { Task } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    userName: string;

    @Column()
    password: string;

    @OneToMany(() => Task, (task) => task.user, { eager: true })
    tasks: Task[];
}