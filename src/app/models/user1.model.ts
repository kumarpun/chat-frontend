export class User {
    username: string;
    password: string;
    role: {
        type: string,
        enum: ['admin', 'employee']
    };
}
