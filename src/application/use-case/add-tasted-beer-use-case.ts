import { TastedBeer } from "../../domain/entity/tasted-beer";
import { BeerRepository } from "./../../domain/repository/beer-repository";
import { TastedBeerRepository } from "../../domain/repository/tasted-beer-repository";

export type AddTastedBeerUseCaseDependencies = {
  beerRepository: BeerRepository;
  tastedBeerRepository: TastedBeerRepository;
};

export async function addTastedBeer(deps: AddTastedBeerUseCaseDependencies, idToAdd: number): Promise<void> {
  const { beerRepository, tastedBeerRepository } = deps;
  const hasAlreadyTasted = await tastedBeerRepository
    .getAllTastedBeers()
    .then((tastedBeers) => tastedBeers.some(({ id }) => id === idToAdd))
    .then((hasAlreadyTasted) => hasAlreadyTasted);

  if (hasAlreadyTasted) {
    console.log("hasAlreadyTasted");
    return;
  }
  const beerToAdd = await beerRepository.getBeerById(idToAdd);
  console.log(beerToAdd);
  if (!beerToAdd) {
    throw new Error("Not found");
  }
  const tastedBeerToAdd = new TastedBeer({
    id: beerToAdd.id,
    name: beerToAdd.name,
  });

  if (beerToAdd.urlImage) {
    tastedBeerToAdd.urlImage = beerToAdd.urlImage;
  }
  if (beerToAdd.description) {
    tastedBeerToAdd.description = beerToAdd.description;
  }
  if (beerToAdd.alcoholByVolume) {
    tastedBeerToAdd.alcoholByVolume = beerToAdd.alcoholByVolume;
  }
  if (beerToAdd.bitterness) {
    tastedBeerToAdd.bitterness = beerToAdd.bitterness;
  }
  if (beerToAdd.color) {
    tastedBeerToAdd.color = beerToAdd.color;
  }
  await tastedBeerRepository.addTastedBeer(tastedBeerToAdd);
}
