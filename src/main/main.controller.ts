import { Controller, Get, Post, Put, Body, UsePipes } from "@nestjs/common";

import { MainService } from "./main.service";
import { CreateItemDto } from "./dto/items.dto";
import { JoiValidationPipe } from "../pipes/joiValidationPipe";
import { itemsSchema } from "./validations/itemsSchema";

@Controller("items")
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get()
  getItems() {
    return this.mainService.getItems();
  }

  @Get("/:uuid")
  getItem(uuid: string) {
    return this.mainService.getItem(uuid);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(itemsSchema))
  createItem(@Body() item: CreateItemDto) {
    return this.mainService.createItem(item);
  }
}
