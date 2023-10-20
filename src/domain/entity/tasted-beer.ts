import { Beer, BeerDependencies } from "./beer";

export class TastedBeer extends Beer {
  public hasLiked = false;

  constructor({ id, name }: BeerDependencies) {
    super({ id, name });
  }
}
