import "dotenv/config";
import { db } from "./index";
import { categories } from "./schema";

const initial = [
  { name: "Autos", slug: "autos", position: 0 },
  { name: "Camionetas", slug: "camionetas", position: 1 },
  { name: "Camiones", slug: "camiones", position: 2 },
  { name: "Vial y Agrícola", slug: "vial-y-agricola", position: 3 },
];

async function main() {
  await db.insert(categories).values(initial).onConflictDoNothing();
  console.log("Categorías iniciales cargadas.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
