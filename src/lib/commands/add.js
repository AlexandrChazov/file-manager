import { writeFile } from "node:fs";
import { writeFailed } from "../logs/index.js";

export function add(path) {
	writeFile(path, "", (err) => {
		if (err) {
			writeFailed();
		}
	});
}
