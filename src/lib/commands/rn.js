import { dirname, join, basename } from "node:path";
import { rename } from "node:fs/promises";
import { writeFailed } from "../logs/index.js";

export async function rn(path1, path2) {
	try {
		await rename(path1, join(dirname(path1), basename(path2)));
	} catch {
		writeFailed();
	}
}
