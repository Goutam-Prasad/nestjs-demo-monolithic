import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks:Task[]=[];

    getAllTasks():Task[]{
        return this.tasks;
    }
    getTaskById(id:string):Task{
        return this.tasks.find((task)=>task.id===id)

    }
    createNewTask(createTaskDto:CreateTaskDto):Task{
        const {title,description}=createTaskDto;
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

    deleteTaskById(id:string){
        let deletedTask:Task=this.tasks.find((task)=>task.id===id);
        this.tasks.filter((task)=>task.id!=id);
        return deletedTask;
    }
}
