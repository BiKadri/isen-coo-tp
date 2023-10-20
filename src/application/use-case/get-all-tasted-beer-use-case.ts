import { TastedBeer } from "../../domain/entity/tasted-beer";
import { TastedBeerRepository } from "../../domain/repository/tasted-beer-repository";

export type GetAllTastedBeersUseCaseDependencies = {
  tastedBeerRepository: TastedBeerRepository;
};

export async function getAllTastedBeers(deps: GetAllTastedBeersUseCaseDependencies): Promise<TastedBeer[]> {
  return await deps.tastedBeerRepository.getAllTastedBeers();
}
