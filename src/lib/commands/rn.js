import { access, constants, rename } from "fs";
import { writeFailed } from "../logs/index.js";

export function rn(path1, path2) {
	access(path1, constants.F_OK, (err) => {
		if (err) {
			writeFailed();
		} else {
			access(path2, constants.F_OK, (err) => {
				if (!err) {
					writeFailed();
				} else {
					rename(path1, path2, (err) => {
						if (err) writeFailed();
					});
				}
			});
		}
	});
}
