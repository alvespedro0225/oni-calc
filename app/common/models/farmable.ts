import type { Production } from "./production";

export interface Farmable {
  imagePath: string;
  name: string;
  id: string;
  production: Production[];
}
