import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AuthService } from "./auth.service";
import Users from "../models/users.entity";
import { MockType } from "../shared/tests/types";
import { EntityExistsError } from "../shared/errors/errors";

const MockRepoFactory = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity),
}));

describe("AuthService", () => {
  let service: AuthService;
  let mockUserRepository: MockType<Repository<Users>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(Users), useFactory: MockRepoFactory },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    mockUserRepository = module.get(getRepositoryToken(Users));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("Test user creation", () => {
    it("Should create a user", async () => {
      const user = { username: "dkdk", password: "dkdk", email: "dkdk" };
      mockUserRepository.save.mockReturnValue(user);
      expect(await service.createUser(user)).toBe(user);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });
    it("Should throw an error if user already exists", async () => {
      const user = { username: "dkdk", password: "dkdk", email: "dkdk" };
      mockUserRepository.findOne.mockReturnValue(user);
      await expect(service.createUser(user)).rejects.toThrow(EntityExistsError);
    });
  });
});
