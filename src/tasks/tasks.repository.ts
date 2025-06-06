import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.status-enum';
import { SearchTaskDto } from './dto/search-task.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private readonly dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async createTask({ title, description }: CreateTaskDto, user: User): Promise<Task> {
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user
        });

        await this.save(task);
        return task;
    }

    async getTaskByID(id: string, user: User): Promise<Task> {
        const task = await this.findOneBy({ id, user });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    async deleteTaskById(id: string, user: User): Promise<Task> {
        const task = await this.getTaskByID(id, user);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        await this.remove(task);
        return task;
    }
    async findWithFilters(filterDto: SearchTaskDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        query.where({ user });
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