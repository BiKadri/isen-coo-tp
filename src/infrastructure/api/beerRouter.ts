import { Router } from "express";
import { getAllBeers } from "../../application/use-case/get-all-beers";
import { getAllTastedBeers } from "../../application/use-case/get-all-tasted-beer-use-case";
import { addTastedBeer } from "../../application/use-case/add-tasted-beer-use-case";
import { setBeerLikedOpinionOnTastedBeer } from "../../application/use-case/put-tasted-beer-like";

import { makeBeerRepository } from "../provider/beer-repository-factory";
import { makeTastedBeerRepository } from "../provider/tasted-beer-repository-factory";
export function createBeerRouter() {
  const router = Router();
  const beerRepository = makeBeerRepository();
  const tastedBeerRepository = makeTastedBeerRepository();

  router.get("/", async (_, res) =>
    res.json({
      beers: await getAllBeers({ beerRepository }),
    }),
  );

  router.get("/me", async (_, res) =>
    res.json({
      testedBeers: await getAllTastedBeers({
        tastedBeerRepository,
      }),
    }),
  );

  router.post("/me/:id", async (req, res) => {
    const { id } = req.params;
    await addTastedBeer(
      {
        beerRepository,
        tastedBeerRepository,
      },
      Number.parseInt(id),
    );
    res.json({
      message: `Beer with id ${id} has been added to tasted beers.`,
    });
  });

  router.put("/me/:id/:like", async (req, res) => {
    const { id, like } = req.params;

    await setBeerLikedOpinionOnTastedBeer({ tastedBeerRepository }, Number.parseInt(id), like === "true");
    res.json({
      message: `Beer with id ${id} has been updated with like opinion.`,
    });
  });

  return router;
}
