import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.status-enum';

@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private readonly dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async createTask({ title, description }: CreateTaskDto): Promise<Task> {
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        await this.save(task);
        return task;
    }

    async getTaskByID(id: string): Promise<Task> {
        const task = await this.findOneBy({ id });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    async deleteTaskById(id: string): Promise<Task> {
        const task = await this.getTaskByID(id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        await this.remove(task);
        return task;
    }
}