import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { randomUUID } from 'crypto';

@Injectable()
export class TasksService {
    private tasks:Task[]=[];

    getAllTasks():Task[]{
        return this.tasks;
    }
    createNewTask(title:string,description:string):Task{
        const task:Task={
            id:randomUUID(),
            title,
            description,
            status:TaskStatus.OPEN
        }
        console.log({task})
        this.tasks.push(task);
        return task;
    }
}
