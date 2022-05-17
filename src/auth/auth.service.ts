import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { CreateUserDto } from "./dto/user.dto";
import User from "../models/users.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async createUser(user: CreateUserDto) {
    const passwordHash = await bcrypt.hash(user.password, 2);
    user.password = passwordHash;
    const newuser = await this.userRepository.save(user);
    console.log(newuser);
    return newuser;
  }
}
