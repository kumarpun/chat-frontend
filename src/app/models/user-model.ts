export class User {
    name: string;
    email: string;
    password: string;
    role: {
        type: string,
        enum: ['admin', 'employee']
    };
}
