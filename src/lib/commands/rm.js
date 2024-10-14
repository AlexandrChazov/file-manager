import { rm as fs_rm } from "node:fs/promises";
import { writeFailed } from "../logs/index.js";

export async function rm(path) {
	try {
		await fs_rm(path)
	} catch {
		writeFailed()
	}
}
