import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { User } from 'src/auth/user.entity';
import { Logger } from 'nestjs-pino';

@Injectable()
export class TasksService {
    constructor(
        private readonly taskRepository: TaskRepository,
        private readonly logger: Logger
    ) { }

    async getTaskByID(id: string, user: User): Promise<Task> {
        this.logger.log(`Fetching task with ID: ${id}`);
        return await this.taskRepository.getTaskByID(id, user);
    }

    async createNewTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        this.logger.log(`Creating new task with title: ${createTaskDto.title}`);
        return await this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTaskById(id: string, user: User): Promise<Task> {
        return await this.taskRepository.deleteTaskById(id, user);
    }

    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async getTasksWithFilters(filterDto: SearchTaskDto, user: User): Promise<Task[]> {
        return await this.taskRepository.findWithFilters(filterDto, user);
    }
}