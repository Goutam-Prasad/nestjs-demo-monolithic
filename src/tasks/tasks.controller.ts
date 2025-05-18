import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

@Controller('tasks')
export class TasksController {
    /**
     * we can also do taskService:TaskService then 
     * constructor( taskService:TasksService){
     * this.taskService=taskService
    }
     */
    constructor(private taskService:TasksService){

    }

    @Get()
    getAllTasks():Task[]{
        return this.taskService.getAllTasks();
    }

    @Post('/create')
    createNewTask(@Body('title') title:string,@Body('description') description:string):Task{
        console.log({title,description});
        return this.taskService.createNewTask(title,description);
    }
}
