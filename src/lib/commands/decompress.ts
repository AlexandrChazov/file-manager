import { createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { handleError } from "../logs";

export function decompress(path1: string, path2: string): void {
	const brotli = createBrotliDecompress();
	const readStream = createReadStream(path1);
	const writeStream = createWriteStream(path2);
	readStream
		.on("error", handleError)
		.pipe(brotli)
		.pipe(writeStream)
		.on("error", handleError);
}
