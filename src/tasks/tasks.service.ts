import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { getTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task, TaskStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
    constructor(private prismaService: PrismaService) { }

    async getAllTasks(): Promise<Task[]> {
        const tasks: Task[] = await this.prismaService.task.findMany();

        return tasks;
    }

    async getTasksWithFilters(filterDto: getTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = this.prismaService.task.findMany({
                where: {
                    status: status,
                },
            });
        }

        if (search) {
            tasks = this.prismaService.task.findMany({
                where: {
                    title: {
                        contains: search,
                    },
                    description: {
                        contains: search,
                    },
                },
            });
        }

        return tasks;
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.prismaService.task.findUnique({
            where: {
                id: id,
            },
        });

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }

        return found;
    }

    async deleteTask(id: number): Promise<void> {
        await this.prismaService.task.delete({
            where: {
                id: id,
            },
        });
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task: Task = await this.prismaService.task.update({
            where: {
                id: id,
            },
            data: {
                status: status,
            },
        });
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task: Task = await this.prismaService.task.create({
            data: {
                title,
                description,
                status: TaskStatus.OPEN,
            },
        });

        return {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
        };
    }
}
