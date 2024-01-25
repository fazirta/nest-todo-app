## Description

Todo app CRUD with [Nest](https://github.com/nestjs/nest) framework, [Prisma](https://www.prisma.io/) ORM, [Postgres](https://www.postgresql.org/) database.

## Usage

### Creating a task

```HTTP
POST /tasks HTTP/1.1
Host: nest-todo-app-sf.vercel.app
Content-Type: application/x-www-form-urlencoded
Content-Length: 40

title=nonton&description=nonton%20drakor
```

### Reading all tasks

```HTTP
GET /tasks HTTP/1.1
Host: nest-todo-app-sf.vercel.app
```

### Reading a task by id

```HTTP
GET /tasks/3 HTTP/1.1
Host: nest-todo-app-sf.vercel.app
```

### Updating a task status

```HTTP
PATCH /tasks/3/status HTTP/1.1
Host: nest-todo-app-sf.vercel.app
Content-Type: application/x-www-form-urlencoded
Content-Length: 11

status=DONE
```

### Deleting a task

```HTTP
DELETE /tasks/2 HTTP/1.1
Host: nest-todo-app-sf.vercel.app
```

## Installation

```bash
$ npm install
```

## Generate Prisma

```bash
$ npx prisma generate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```