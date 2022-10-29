import { Role } from "./role.model";

export class User {
  constructor(
    public id: number,
    public username: string,
    public role: string,
    public address: string,
    public name: string
  ) {}
}
