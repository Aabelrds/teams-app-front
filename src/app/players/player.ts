import { Team } from "../teams/team";

export class Player {
  id!: number;
  name!: string;
  surName!: string;
  city!: string;
  country!: string;
  image!: string;
  team!: Team;
}

