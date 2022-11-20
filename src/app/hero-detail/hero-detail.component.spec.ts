import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { Location } from "@angular/common";
import { Hero } from "../hero";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe("HeroDetailComponent", () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLocation;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);
    mockActivatedRoute = { snapshot: { paramMap: { get: () => "3" } } };

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
  });

  it("should render the h2 element with the hero name", () => {
    // Arrange
    mockHeroService.getHero.and.returnValue(
      of({
        id: 3,
        name: "Omar",
        strength: 2800,
      } as Hero)
    );

    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement.querySelector("h2").textContent).toContain(
      "OMAR"
    );
  });
});
