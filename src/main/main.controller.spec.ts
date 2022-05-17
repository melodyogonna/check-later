import { Test, TestingModule } from "@nestjs/testing";
import { MainController } from "./main.controller";
import { MainService } from "./main.service";

describe("MainController", () => {
  let controller: MainController;
  let mainService: MainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainController],
      providers: [MainService],
    }).compile();

    controller = module.get<MainController>(MainController);
    mainService = module.get<MainService>(MainService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Test item creation", () => {
    it("Should create an item", async () => {
      const result = { user: 1, url: "kdk" };
      const item = { user: "dkdk", url: "dkdk" };
      jest
        .spyOn(mainService, "createItem")
        .mockImplementation(async () => result);
      expect(await controller.createItem(item)).toBe(result);
    });
  });
});
