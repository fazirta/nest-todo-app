import { Prisma } from "@prisma/client"

export class Task implements Prisma.TaskCreateInput {
    id: number;
    title: string;
    description: string;
    status: string;
}

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}
