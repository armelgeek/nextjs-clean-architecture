import {TodoRepository} from "@/domain/todo/repositories/TodoRepository";
import {TodoRepositoryImpl} from "@/infrastructure/todo/repositories/TodoRepositoryImpl";
import {Todo} from "@/domain/todo/entities/Todo";

export class getTodo {
    todoRepository: TodoRepository = new TodoRepositoryImpl();
    constructor() {
    }
     execute(params: any) {
        return this.todoRepository.getTodo(params);
    }
}
