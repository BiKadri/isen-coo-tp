import { LocalTastedBeerRepository } from "./local/local-tasted-beer-repository";

export function makeTastedBeerRepository() {
  return new LocalTastedBeerRepository();
}
