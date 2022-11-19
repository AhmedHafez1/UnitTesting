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

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should create a hero component for each hero", () => {
    // Arrange
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

  it("should call Hero service delete method when Hero delete method is called", () => {
    // Arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    mockHeroService.deleteHero.and.returnValue(of(HEROES[0]));

    // Act
    fixture.detectChanges();
    const heroesDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    heroesDEs[0]
      .query(By.css("button"))
      .triggerEventHandler("click", { stopPropagation: () => {} });

    // Assert
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[0]);
  });

  it("should add a new hero to the list when the add button is clicked", () => {
    // Arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    mockHeroService.addHero.and.returnValue(
      of({ id: 5, name: "Abdo", strength: 250 } as Hero)
    );

    // Act
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(
      By.css("input")
    ).nativeElement;
    const buttonDebugElement = fixture.debugElement.query(By.css("button"));
    inputElement.value = "Abdo";
    buttonDebugElement.triggerEventHandler("click", undefined);
    fixture.detectChanges();

    // Assert
    expect(
      fixture.debugElement.query(By.css("ul")).nativeElement.textContent
    ).toContain("Abdo");
  });
});
