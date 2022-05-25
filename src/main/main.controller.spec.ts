import { Test, TestingModule } from "@nestjs/testing";
import { MainController } from "./main.controller";
import { MainService } from "./main.service";
import { MockType } from "../shared/tests/types";

const MockServiceFactory = jest.fn(() => ({
  createItem: jest.fn(),
}));

describe("MainController", () => {
  let controller: MainController;
  let mainService: MockType<MainService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainController],
      providers: [{ provide: MainService, useFactory: MockServiceFactory }],
    })
      .useMocker(() => jest.fn())
      .compile();

    controller = module.get<MainController>(MainController);
    mainService = module.get(MainService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Test item creation", () => {
    it("Should create an item", async () => {
      const result = { user: 1, url: "kdk" };
      const item = { user: "dkdk", url: "dkdk" };
      mainService.createItem.mockReturnValue(result);
      expect(await controller.createItem(item)).toBe(result);
    });
  });
});
