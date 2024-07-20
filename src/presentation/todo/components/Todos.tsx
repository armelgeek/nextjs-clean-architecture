
import NewTodo from './NewTodo';
import {getTodo} from "@/domain/todo/usecases/todo/getTodo";
import {Todo} from "@/domain/todo/entities/Todo";
import {TodoDto} from "@/infrastructure/todo/dtos/TodoDto";

export default function TodoList() {
    const todos =  new getTodo().execute(null);


    return (
        <div>
            {todos.map((todo: TodoDto) => (
                <p key={todo.title}>{todo.userId}</p>
            ))}
            <NewTodo />
        </div>
    );
}
