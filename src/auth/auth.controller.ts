import { Controller, Post, Body, UsePipes } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/user.dto";
import { createUser } from "./validations/userSchema";
import { JoiValidationPipe } from "../pipes/joiValidationPipe";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @UsePipes(new JoiValidationPipe(createUser))
  async register(@Body() user: CreateUserDto) {
    const data = await this.authService.createUser(user);
    return {
      message: "User successfully created",
      data,
    };
  }
}
