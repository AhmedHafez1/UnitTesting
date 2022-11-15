import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroesComponent } from "./heroes.component";

describe("HeroesComponent", () => {
  let HEROES: Hero[];
  let component: HeroesComponent;
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

    component = new HeroesComponent(mockHeroService);
  });

  describe("delete", () => {
    it("should remove one hero from the list", () => {
      // Arrange
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = [...HEROES];

      // Act
      component.delete(component.heroes[3]);

      // Assert
      const isDeleted = component.heroes.every(
        (hero) => hero.id !== HEROES[3].id
      );
      expect(isDeleted).toBe(true);
    });

    it("should call deleteHero", () => {
      // Arrange
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = [...HEROES];

      // Act
      const deletedHero = component.heroes[3];
      component.delete(deletedHero);

      // Assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(deletedHero);
    });
  });
});
