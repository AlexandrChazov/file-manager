import { access, constants, createReadStream, createWriteStream } from "node:fs";
import { writeFailed } from "../logs/index.js";

export function cp(path1, path2) {
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
					readStream.pipe(writeStream);
				}
			});
		}
	});
}
