// eslint-disable-next-line import/no-extraneous-dependencies
import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MainService } from "./main.service";

import ItemsEntity from "../models/items.entity";
import UserEntity from "../models/users.entity";
import { EntityNotFoundError } from "../shared/errors/errors";

type MockType<T> = { [P in keyof T]?: jest.Mock<{}> };

const mockRepoFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity),
}));

describe("MainService", () => {
  let service: MainService;
  let mockItemRepository: MockType<Repository<ItemsEntity>>;
  let mockUserRepository: MockType<Repository<UserEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MainService,
        {
          provide: getRepositoryToken(ItemsEntity),
          useFactory: mockRepoFactory,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: mockRepoFactory,
        },
      ],
    }).compile();

    service = module.get<MainService>(MainService);
    mockItemRepository = module.get(getRepositoryToken(ItemsEntity));
    mockUserRepository = module.get(getRepositoryToken(UserEntity));
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

  describe("Test item creation", () => {
    it("should create an item", async () => {
      const item = {
        url: "a url",
        date: "a date",
        uuid: "djjjdke1334",
        user: "a user",
      };
      mockUserRepository.findOne.mockReturnValue(item);
      mockItemRepository.save.mockReturnValue(item);
      expect(await service.createItem(item)).toEqual(item);
      expect(mockItemRepository.save).toHaveBeenCalled();
    });

    it("should throw an error if user is not found", async () => {
      const item = {
        url: "a url",
        date: "a date",
        uuid: "djjjdke1334",
        user: "a user",
      };
      mockUserRepository.findOne.mockReturnValue(null);
      const newItem = await service.createItem(item);
      expect(newItem).toMatch(
        'User "a user" not found. Please create a user first.'
      );
    });
  });
});
