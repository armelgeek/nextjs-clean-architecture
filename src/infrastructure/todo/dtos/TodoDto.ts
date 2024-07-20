import {Todo} from "@/domain/todo/entities/Todo";

export class TodoDto {
    constructor(
        public readonly userId: string,
        public readonly title: string,
        public readonly description: string,
    ) {}

    toDomain(): Todo {
        return new Todo(
            this.userId,
            this.title,
            this.description
        );
    }
}

