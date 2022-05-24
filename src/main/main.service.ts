import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { add } from "date-fns";

import { EntityNotFoundError } from "../shared/errors/errors";
import Items from "../models/items.entity";
import User from "../models/users.entity";
import { CreateItemDto } from "./dto/items.dto";

@Injectable()
export class MainService {
  constructor(
    @InjectRepository(Items)
    private readonly itemsRepository: Repository<Items>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createItem(item: CreateItemDto): Promise<Items> {
    const user = await this.userRepository.findOne({
      uuid: item.user,
    });
    if (!user) {
      throw new EntityNotFoundError("User not found");
    }
    const dueDate = add(new Date(), { hours: 6 });
    const newItem = await this.itemsRepository.save({
      ...item,
      user,
      dueDate,
    });

    return newItem;
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
