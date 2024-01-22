import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { getTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { Task, TaskStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    async getTasks(
        @Query(ValidationPipe) filterDto: getTasksFilterDto
    ): Promise<Task[]> {
        if (Object.keys(filterDto).length) {
            return await this.tasksService.getTasksWithFilters(filterDto);
        }
        return this.tasksService.getAllTasks();
    }

    @Get("/:id")
    async getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
        return await this.tasksService.getTaskById(id);
    }

    @Delete("/:id")
    async deleteTask(@Param("id", ParseIntPipe) id: number): Promise<void> {
        await this.tasksService.deleteTask(id);
    }

    @Patch("/:id/status")
    async updateTaskStatus(
        @Param("id", ParseIntPipe) id: number,
        @Body("status", TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Task> {
        return await this.tasksService.updateTaskStatus(id, status);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.tasksService.createTask(createTaskDto);
    }
}
