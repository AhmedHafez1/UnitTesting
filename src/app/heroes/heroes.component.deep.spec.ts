import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

describe("HeroesComponent (Deep)", () => {
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
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });
  });

  it("should create a hero component for each hero", () => {
    // Arrange
    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // Act (execute ngOninit)
    fixture.detectChanges();
    const heroesDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    // Assert
    expect(heroesDEs.length).toBe(4);

    heroesDEs.forEach((element, i) => {
      expect(element.componentInstance.hero).toEqual(HEROES[i]);
    });
  });
});
