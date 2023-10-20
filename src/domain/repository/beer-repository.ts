import { Beer } from "../entity/beer";

export interface BeerRepository {
  getAllBeers(): Promise<Beer[]>;

  getBeerById(id: number): Promise<Beer | null>;
}
