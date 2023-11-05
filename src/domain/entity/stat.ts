import { TastedBeer } from "./tasted-beer";

export type StatDependencies = {
  pourcentage: string;
  alcoholAverage: string;
  threeHighBitterness: TastedBeer[];
  preferedColor: string;
};

export class Stat {
  public pourcentage: string;
  public alcoholAverage: string;
  public threeHighBitterness: TastedBeer[];
  public preferedColor: string;

  constructor({ pourcentage, alcoholAverage, threeHighBitterness, preferedColor }: StatDependencies) {
    this.pourcentage = pourcentage;
    this.alcoholAverage = alcoholAverage;
    this.threeHighBitterness = threeHighBitterness;
    this.preferedColor = preferedColor;
  }
}
