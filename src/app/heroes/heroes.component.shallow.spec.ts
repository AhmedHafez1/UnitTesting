import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe("HeroesComponent", () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let HEROES: Hero[];
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 3, name: "Yosuf", strength: 1000 },
      { id: 2, name: "Mariam", strength: 1200 },
      { id: 1, name: "Omar", strength: 1500 },
      { id: 4, name: "Nader", strength: 400 },
    ];

    mockHeroService = jasmine.createSpyObj([
      "deleteHero",
      "getHeroes",
      "addHero",
      "getHero",
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  it("should set the heroes property", () => {
    // Arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // Act
    fixture.detectChanges();

    // Assert
    expect(component.heroes).toEqual(HEROES);
  });
});
