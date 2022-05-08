import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { MainService } from "./main.service";

import ItemsEntity from "../models/items.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

type MockType<T> = { [P in keyof T]?: jest.Mock<{}> };

const mockRepoFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}));

describe("MainService", () => {
  let service: MainService;
  let mockItemRepository: MockType<Repository<ItemsEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MainService,
        {
          provide: getRepositoryToken(ItemsEntity),
          useFactory: mockRepoFactory,
        },
      ],
    }).compile();

    service = module.get<MainService>(MainService);
    mockItemRepository = module.get(getRepositoryToken(ItemsEntity));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return an item", async () => {
    const item = { url: "a url", date: "a date", uuid: "djjjdke1334" };
    mockItemRepository.findOne.mockReturnValue(item);
    expect(await service.getItem(item.uuid)).toEqual(item);
    expect(mockItemRepository.findOne).toHaveBeenCalledWith({
      where: { uuid: item.uuid },
    });
  });
});
