import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';

@Injectable()
export class TasksService {
    constructor(
        private readonly taskRepository: TaskRepository,
    ) { }

    async getTaskByID(id: string): Promise<Task> {
        return await this.taskRepository.getTaskByID(id);
    }

    async createNewTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto);
    }

    async deleteTaskById(id: string): Promise<Task> {
        return await this.taskRepository.deleteTaskById(id);
    }

    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async getTasksWithFilters(filterDto: SearchTaskDto): Promise<Task[]> {
        return await this.taskRepository.findWithFilters(filterDto);
    }
}