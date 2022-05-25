import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { CreateUserDto, LoginUserDto } from "./dto/user.dto";
import User from "../models/users.entity";
import { EntityExistsError } from "../shared/errors/errors";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async createUser(user: CreateUserDto) {
    const { email } = user;
    const userExists = await this.userRepository.findOne(
      { email },
      { select: ["id"] }
    );
    if (userExists) {
      throw new EntityExistsError("User already exists");
    }

    const passwordHash = await bcrypt.hash(user.password, 2);
    user.password = passwordHash;
    const newuser = await this.userRepository.save(user);
    return newuser;
  }

  async loginUser(login: LoginUserDto) {}
}
