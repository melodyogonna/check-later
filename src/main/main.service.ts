import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import Items from "../models/items.entity";

@Injectable()
export class MainService {
  constructor(
    @InjectRepository(Items)
    private readonly itemsRepository: Repository<Items>
  ) {}

  async createItem(item: Items) {
    return this.itemsRepository.save(item);
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
