import { createHash } from "crypto";
import { createReadStream } from "fs";
import { writeFailed } from "../logs";

export function hash(path: string): void {
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
