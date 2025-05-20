import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
    @UseGuards(AuthGuard())
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
    getTasks(
        @Query() filterDto: SearchTaskDto,
        @GetUser() user: User): Promise<Task[]> {

        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto, user);
        } else {
        return this.taskService.getAllTasks();
    }
    }

    @Post('/create')
    createNewTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User): Promise<Task> {
        return this.taskService.createNewTask(createTaskDto, user);
    }

    @Get('/:id')
    getTaskByID(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return this.taskService.getTaskByID(id, user)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return this.taskService.deleteTaskById(id, user);
    }
}
