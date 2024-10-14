import { writeFile } from "node:fs/promises";
import { writeFailed } from "../logs/index.js";

export async function add(path) {
	try {
		await writeFile(path, "");
	} catch {
		writeFailed();
	}
}
