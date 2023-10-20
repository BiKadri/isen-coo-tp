import { TastedBeerRepository } from "../../domain/repository/tasted-beer-repository";

export type AddTastedBeerUseCaseDependencies = {
  tastedBeerRepository: TastedBeerRepository;
};

export async function setBeerLikedOpinionOnTastedBeer(
  deps: AddTastedBeerUseCaseDependencies,
  idToAdd: number,
  hasLiked: boolean,
): Promise<void> {
  return await deps.tastedBeerRepository.setBeerLikedOpinionOnTastedBeer(idToAdd, hasLiked);
}
