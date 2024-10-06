import { access, constants, createReadStream, createWriteStream } from "fs";
import { writeFailed } from "../logs";

export function cp(path1: string, path2: string): void {
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
