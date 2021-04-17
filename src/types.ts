export enum AutomaLevel {
  Autometta,
  Automa,
  Automaszyna,
  Ultimaszyna,
}

export enum FactionSlug {
  Polania = "POL",
  Nordic = "NOR",
  Rusviet = "RUS",
  Crimea = "CRI",
  Saxony = "SAX",
  Togawa = "TOG",
  Albion = "ALB",
}

export interface Faction {
  slug: string | FactionSlug;
  name: string;
  color: string;
}

export interface Game {
  id: number;
  date: string;
  human: Player;
  automa: Player;
  modules?: {
    airship?: {
      aggressive: string;
      passive: string;
    };
    resolution?: string;
  };
}

export interface Player {
  id?: number;
  name?: string;
  faction: string | FactionSlug;
  playerMatId?: string;
  automaLevel?: AutomaLevel;
  winner?: boolean;
  score: number;
  stars?: number;
  popularity?: number;
  buildings?: number;
}
