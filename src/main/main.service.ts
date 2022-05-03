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

  async getItem(id: number) {
    return this.itemsRepository.findOne(id);
  }

  async updateItem(id: number, item: Items) {
    return this.itemsRepository.update(id, item);
  }
}
