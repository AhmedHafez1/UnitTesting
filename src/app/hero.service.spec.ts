import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Hero } from "./hero";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";

describe("HeroService", () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(["add", "clear"]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroService);
  });

  describe("getHero", () => {
    it("should call get with the correct url", () => {
      // Arrange
      const expectedUrl = "api/heroes/4";

      // Act
      heroService.getHero(4).subscribe();

      // Assert
      const req = httpTestingController.expectOne(expectedUrl);
      req.flush(<Hero>{ id: 4, name: "Mohamed", strength: 1225223132 });
      expect(req.request.method).toBe("GET");
      httpTestingController.verify();
    });
  });
});
