import { createReadStream } from "node:fs";

export function cat(path) {
	let result = "";
	const readStream = createReadStream(path);
	readStream.on("data", (chunk) => {
		result = result.concat(chunk.toString());
	});
	readStream.on("end", () => {
		process.stdout.write(`${result}\n`);
	});
}
