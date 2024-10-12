import { createBrotliCompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { handleError } from "../logs/index.js";

export function compress(path1, path2) {
	const brotli = createBrotliCompress();
	const readStream = createReadStream(path1);
	const writeStream = createWriteStream(path2);
	readStream
		.on("error", handleError)
		.pipe(brotli)
		.pipe(writeStream)
		.on("error", handleError);
}
