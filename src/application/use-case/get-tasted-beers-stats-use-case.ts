import { Stat } from "../../domain/entity/stat";
import { BeerColorIntensity } from "../../domain/enum/beer-color-intensity";
import { TastedBeerRepository } from "../../domain/repository/tasted-beer-repository";

export type GetTastedBeersStatsDependencies = {
  tastedBeerRepository: TastedBeerRepository;
};

export async function getTastedBeersStats(deps: GetTastedBeersStatsDependencies): Promise<Stat> {
  const tastedBeers = await deps.tastedBeerRepository.getAllTastedBeers();
  const tastedBeersLiked = tastedBeers.filter((tastedBeer) => tastedBeer.hasLiked === true);

  const tastedBeersLength = tastedBeers.length;
  const tastedBeersLikedLength = tastedBeersLiked.length;

  let tastedBeersAlcoholSum = 0;
  tastedBeers.forEach((tastedBeer) => {
    tastedBeersAlcoholSum += tastedBeer.alcoholByVolume || 0;
  });

  const tastedBeersHighBitterness = tastedBeers.sort(
    (tastedBeer1, tastedBeer2) => tastedBeer2.bitterness - tastedBeer1.bitterness,
  );

  const colorCount: { [key in BeerColorIntensity]: number } = {} as { [key in BeerColorIntensity]: number };

  for (const color in BeerColorIntensity) {
    if (isNaN(Number(color))) {
      colorCount[color as BeerColorIntensity] = 0;
    }
  }

  for (const tastedBeer of tastedBeers) {
    tastedBeer.color && colorCount[tastedBeer.color]++;
  }

  const sortedColors = Object.entries(colorCount).map(([color, count]) => ({ color, count }));
  sortedColors.sort((a, b) => b.count - a.count);

  const preferedColor = sortedColors[0].color;

  return {
    pourcentage: `${(tastedBeersLikedLength / tastedBeersLength) * 100} %`,
    alcoholAverage: (tastedBeersAlcoholSum / tastedBeersLength).toFixed(2),
    threeHighBitterness: tastedBeersHighBitterness.slice(0, 3),
    preferedColor,
  };
}
