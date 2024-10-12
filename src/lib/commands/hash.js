import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { writeFailed } from "../logs/index.js";

export function hash(path) {
	const hash = createHash("sha256");
	const readStream = createReadStream(path);
	readStream.on("data", (chunk) => {
		hash.update(chunk);
	});
	readStream.on("error", () => {
		writeFailed();
	});
	readStream.on("end", () => {
		process.stdout.write(`${hash.digest("hex")}\n`);
	});
}
