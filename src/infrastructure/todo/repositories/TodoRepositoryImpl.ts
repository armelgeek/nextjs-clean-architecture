import {
    TodoRepository,
    UpdateQueryType
} from "@/domain/todo/repositories/TodoRepository";
import {Todo} from "@/domain/todo/entities/Todo";
import {TodoDataSource} from "@/infrastructure/todo/datasources/TodoDataSource";
import {TodoDto} from "@/infrastructure/todo/dtos/TodoDto";

export class TodoRepositoryImpl implements TodoRepository {
    todDataSource = new TodoDataSource();
    constructor() {}
    // @ts-ignore
    createTodo(data: Todo): TodoDto {
      return this.todDataSource.createTodo(data)
    }

    getRemainingTodo(id: string): TodoDto[] {
        return this.todDataSource.getTodos()
    }

    getTodo(params: { userId: number; page: number }): TodoDto[] {
        return this.todDataSource.getTodos()
    }
    // @ts-ignore
    async updateTodo(query: UpdateQueryType, data: Todo): TodoDto {
        return this.todDataSource.createTodo(data)
    }

}
