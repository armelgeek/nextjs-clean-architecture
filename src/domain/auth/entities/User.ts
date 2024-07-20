export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly emailVerified: string,
        public readonly image: string,
        public readonly role: string
    ) {}
}
