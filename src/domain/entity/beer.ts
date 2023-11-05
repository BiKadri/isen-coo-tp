import { BeerColorIntensity } from "../enum/beer-color-intensity";

export type BeerDependencies = {
  id: number;
  name: string;
};

export class Beer {
  public id: number;
  public name: string;
  public description?: string;
  public urlImage?: string;
  public alcoholByVolume = 0;
  public bitterness = 0;
  public color = BeerColorIntensity.UNKNOW;

  constructor({ id, name }: BeerDependencies) {
    this.id = id;
    this.name = name;
  }
}
