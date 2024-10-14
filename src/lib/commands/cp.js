import { createReadStream, createWriteStream } from "node:fs";
import { writeFailed } from "../logs/index.js";

export async function cp(path1, path2) {
	try {
		const readStream = createReadStream(path1);
		const writeStream = createWriteStream(path2);
		readStream.pipe(writeStream);
	} catch {
		writeFailed();
	}
}
