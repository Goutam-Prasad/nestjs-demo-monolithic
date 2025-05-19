import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.status-enum';
import { SearchTaskDto } from './dto/search-task.dto';

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

    async findWithFilters(filterDto: SearchTaskDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` },
            );
        }
        const tasks = await query.getMany();
        if (!tasks.length) {
            throw new NotFoundException('No tasks found with the given filters');
        } return tasks;
    }
}