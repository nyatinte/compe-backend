
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCompetitionInput {
    title: string;
    description: string;
    image?: Nullable<URL>;
    startDate: Date;
    endDate: Date;
}

export class UpdateCompetitionInput {
    title?: Nullable<string>;
    description?: Nullable<string>;
    image?: Nullable<URL>;
    startDate?: Nullable<Date>;
    endDate?: Nullable<Date>;
}

export class CreateUserInput {
    name: string;
    email: EmailAddress;
    image?: Nullable<URL>;
}

export class UpdateUserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
    image?: Nullable<URL>;
}

export class Competition {
    id: number;
    title: string;
    description: string;
    image?: Nullable<URL>;
    startDate: Date;
    endDate: Date;
    isOpen: boolean;
    createdAt: DateTime;
    owner: User;
    updatedAt: DateTime;
}

export abstract class IQuery {
    abstract competitions(): Nullable<Competition>[] | Promise<Nullable<Competition>[]>;

    abstract competition(id: number): Nullable<Competition> | Promise<Nullable<Competition>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createCompetition(createCompetitionInput: CreateCompetitionInput): Competition | Promise<Competition>;

    abstract updateCompetition(id: number, updateCompetitionInput: UpdateCompetitionInput): Competition | Promise<Competition>;

    abstract removeCompetition(id: number): Nullable<Competition> | Promise<Nullable<Competition>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract createUserById(id: string, createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(id: string, updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id: string;
    name: string;
    email: EmailAddress;
    image?: Nullable<URL>;
    createdAt: DateTime;
    updatedAt: DateTime;
    OK: boolean;
}

export type DateTime = any;
export type URL = any;
export type EmailAddress = any;
type Nullable<T> = T | null;
