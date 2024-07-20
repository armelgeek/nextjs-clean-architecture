
export abstract class BaseEntity {
    id = 0;
    pk() {
        return `${this.id}`;
    }
}


