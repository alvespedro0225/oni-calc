import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("", "routes/home.tsx", [
    route("/buildings", "routes/buildings.tsx"),
    route("/critters", "routes/critters.tsx"),
    route("/duplicants", "routes/duplicants.tsx"),
    route("/geysers", "routes/geysers.tsx"),
    route("/plants", "routes/plants.tsx"),
    route("/recipes", "routes/recipes.tsx"),
  ]),
] satisfies RouteConfig;
