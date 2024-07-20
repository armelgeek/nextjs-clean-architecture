import {TodoDto} from "@/infrastructure/todo/dtos/TodoDto";
import {Todo} from "@/domain/todo/entities/Todo";

interface TodoRemoteDataSource {
    createTodo(data:Todo): TodoDto;
    getTodos(): TodoDto[];
}

export class TodoDataSource implements TodoRemoteDataSource{
     getTodos(): TodoDto[] {

        const todo = new TodoDto(
                    "1",
                    "Magic Sneakers",
                    "The best shoes for your feet ! (and your wallet)"
                );
        return [todo];
    }
    createTodo(data: Todo): TodoDto {
         const todo = new TodoDto(
                        data.id,
                        data.name,
                        data.description
                );
        return  todo;
    }
}
