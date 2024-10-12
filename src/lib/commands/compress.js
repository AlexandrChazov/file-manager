import { createBrotliCompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
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
