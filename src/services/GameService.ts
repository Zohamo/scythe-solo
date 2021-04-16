import games from "@/assets/json/games.json";
import { Game } from "@/types";

export default {
  getGames(): Game[] {
    return games;
  },
};
