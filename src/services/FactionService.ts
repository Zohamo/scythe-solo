import factions from "@/assets/json/factions.json";
import { Faction } from "@/types";

export default {
  getFactions(): Faction[] {
    return factions;
  },
};
