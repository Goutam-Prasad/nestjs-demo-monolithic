import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    /**
     * we can also do taskService:TaskService then 
     * constructor( taskService:TasksService){
     * this.taskService=taskService
    }
     */
    constructor(private readonly taskService: TasksService) {

    }

    @Get()
    getTasks(@Query() filterDto: SearchTaskDto): Promise<Task[]> {

        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto);
        } else {
        return this.taskService.getAllTasks();
    }
    }

    @Post('/create')
    createNewTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createNewTask(createTaskDto);
    }

    @Get('/:id')
    getTaskByID(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTaskByID(id)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.deleteTaskById(id);
    }
}
