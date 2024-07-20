import { Todo } from "@/domain/todo/entities/Todo";
import {TodoDto} from "@/infrastructure/todo/dtos/TodoDto";
export interface UpdateQueryType {
  id:  number | string;
}
export interface TodoRepository {
  createTodo(data: Todo): TodoDto;
  updateTodo(query:UpdateQueryType, data: Todo):TodoDto;
  getTodo(params: { userId: number, page: number}): TodoDto[];
  getRemainingTodo(id: string): TodoDto[];
}
