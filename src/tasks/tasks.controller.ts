import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

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
    createNewTask(@Body() createTaskDto:CreateTaskDto ):Task{
        return this.taskService.createNewTask(createTaskDto);
    }

    @Get('/:id')
    getTaskByID(@Param('id') id:string):Task{
        return this.taskService.getTaskById(id)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string):Task{
        return this.taskService.deleteTaskById(id);
    }
}
