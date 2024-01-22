import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TasksService {
    constructor(private prismaService: PrismaService) { }
}
