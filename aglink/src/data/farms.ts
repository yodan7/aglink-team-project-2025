import { readFileSync } from "fs";
import { Farm } from "@/types";

export default function getFarmsByDiagnosis(type: string): Farm[] | undefined {
  try {
    const fileContent = readFileSync("src/data/mock-farms.json", "utf8");
    console.log(fileContent);

    const dummyData: Farm[] = JSON.parse(fileContent);

    // Filter farms by diagnosis type

    return dummyData;
  } catch (error) {
    console.error("Error reading file", error);
    return undefined;
  }
}
