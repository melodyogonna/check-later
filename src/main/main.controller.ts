import { Controller, Get, Post, Put, Body, UsePipes } from "@nestjs/common";

import { MainService } from "./main.service";
import { CreateItemsDto } from "./dto/items.dto";
import { JoiValidationPipe } from "../pipes/joiValidationPipe";
import { itemsSchema, ItemsSchema } from "./validations/itemsSchema";

@Controller("items")
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

  @Post()
  @UsePipes(new JoiValidationPipe(itemsSchema))
  createItem(@Body() item: CreateItemsDto) {
    return this.mainService.createItem(item);
  }
}
