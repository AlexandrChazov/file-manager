import { access, constants, createReadStream, createWriteStream, rm } from "node:fs";
import { writeFailed } from "../logs/index.js";

export function mv(path1, path2) {
	access(path1, constants.F_OK, (err) => {
		if (err) {
			writeFailed();
		} else {
			access(path2, constants.F_OK, (err) => {
				if (!err) {
					writeFailed();
				} else {
					const readStream = createReadStream(path1);
					const writeStream = createWriteStream(path2);
					readStream.on("data", (chunk) => {
						writeStream.write(chunk);
					});
					readStream.on("close", () => {
						writeStream.close();
					});
					writeStream.on("close", () => {
						rm(path1, (err) => {
							if (err) writeFailed();
						});
					});
				}
			});
		}
	});
}
