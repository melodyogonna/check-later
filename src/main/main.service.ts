import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import Items from "../models/items.entity";
import { CreateItemDto } from "./dto/items.dto";

@Injectable()
export class MainService {
  constructor(
    @InjectRepository(Items)
    private readonly itemsRepository: Repository<Items>
  ) {}

  async createItem(item: CreateItemDto): Promise<Items> {
    const user = await this.getItem(item.userId);
    if (!user) {
      throw new Error("User not found");
    }
    return this.itemsRepository.save({
      ...item,
      user,
    });
  }

  async getItems() {
    return this.itemsRepository.find();
  }

  async getItem(uuid: string) {
    return this.itemsRepository.findOne({ where: { uuid } });
  }

  async updateItem(id: number, item: Items) {
    return this.itemsRepository.update(id, item);
  }
}
