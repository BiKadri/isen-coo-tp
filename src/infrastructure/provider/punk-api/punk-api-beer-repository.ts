import axios, { AxiosInstance } from "axios";
import { Beer } from "../../../domain/entity/beer";
import { BeerRepository } from "../../../domain/repository/beer-repository";
import { PunkAPIBeerDeserializer } from "./punk-api-beer-deserializer";

export class PunkAPIBeerRepository implements BeerRepository {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: "https://api.punkapi.com/v2/",
    });
  }

  async getAllBeers(): Promise<Beer[]> {
    try {
      const { data } = await this.http.get("/beers");

      if (!data?.length) {
        return [];
      }
      return data.map((punkApiBeer: any) => PunkAPIBeerDeserializer.deserialize(punkApiBeer));
    } catch (err) {
      return [];
    }
  }

  async getBeerById(id: number): Promise<Beer | null> {
    try {
      const { data } = await this.http.get(`/beers/${id}`);

      if (!data?.length) {
        return null;
      }

      return PunkAPIBeerDeserializer.deserialize(data[0]);
    } catch (err) {
      return null;
    }
  }
}
