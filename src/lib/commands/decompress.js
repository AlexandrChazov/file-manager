import { createBrotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { handleError } from "../logs/index.js";

export async function decompress(path1, path2) {
	const brotli = createBrotliDecompress();
	const readStream = createReadStream(path1);
	const writeStream = createWriteStream(path2);

	await pipeline(readStream, brotli, writeStream).catch(handleError);
}
