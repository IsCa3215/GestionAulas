export interface UserEntity {
    name:   string;
    age:    number;
    email:  string;
    token:  string;
    course: string;
    grade:  string;
    module: string;
    events: any[];
}

export interface UserEntityLogin {
    email: string;
    password: string;
}

