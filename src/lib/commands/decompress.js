import { createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { handleError } from "../logs/index.js";

export function decompress(path1, path2) {
	const brotli = createBrotliDecompress();
	const readStream = createReadStream(path1);
	const writeStream = createWriteStream(path2);
	readStream
		.on("error", handleError)
		.pipe(brotli)
		.pipe(writeStream)
		.on("error", handleError);
}
