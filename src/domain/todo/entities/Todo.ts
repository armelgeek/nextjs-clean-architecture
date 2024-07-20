export class Todo {
  constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly description: string
  ) {}

  isValid(): boolean {
    return (
        this.name.length > 0 &&
        this.description.length > 0
    );
  }
}
