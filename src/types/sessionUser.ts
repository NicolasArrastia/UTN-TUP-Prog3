import { User } from "./user";

export interface SessionUser extends Omit<User, "password"> {}
