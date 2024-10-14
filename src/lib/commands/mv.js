import { basename, join } from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { rm } from "node:fs/promises";
import { handleError } from "../logs/index.js";

export function mv(path1, path2) {
	try {
		const readStream = createReadStream(path1);
		const writeStream = createWriteStream(join(path2, basename(path1)));
		readStream.on("data", (chunk) => {
			writeStream.write(chunk);
		});
		readStream.on("close", () => {
			writeStream.close();
		});
		writeStream.on("close", () => {
			rm(path1);
		});
	} catch {
		handleError()
	}
}
