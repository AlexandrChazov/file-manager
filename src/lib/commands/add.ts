import { writeFile } from "fs";
import { writeFailed } from "../logs";

export function add(path: string): void {
	writeFile(path, "", (err) => {
		if (err) {
			writeFailed();
		}
	});
}
