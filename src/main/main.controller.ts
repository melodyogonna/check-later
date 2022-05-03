import { Controller, Get, Post, Put } from "@nestjs/common";

import { MainService } from "./main.service";

@Controller("main")
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get()
  getItems() {
    return this.mainService.getItems();
  }

  @Get("/:id")
  getItem(id: number) {
    return this.mainService.getItem(id);
  }
}
