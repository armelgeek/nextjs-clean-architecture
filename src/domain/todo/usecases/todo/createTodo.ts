import {TodoRepository} from "@/domain/todo/repositories/TodoRepository";
import {TodoRepositoryImpl} from "@/infrastructure/todo/repositories/TodoRepositoryImpl";
import {Todo} from "@/domain/todo/entities/Todo";

export class CreateTodo {
    todoRepository: TodoRepository = new TodoRepositoryImpl();
    constructor() {

    }
    async execute(data:Todo) {
        return this.todoRepository.createTodo(data);
    }
}
