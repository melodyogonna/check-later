import { Controller, Post } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  @Post("register")
  async register() {
    return "This action adds a new user";
  }
}
