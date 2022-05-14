import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import User from "../models/user.model";

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: Repository<User>) {}

  async createUser(user: any) {
    return this.userRepository.create(user);
  }
}
