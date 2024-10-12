import { access, constants, rm as fs_rm } from "node:fs";
import { writeFailed } from "../logs/index.js";

export function rm(path) {
	access(path, constants.F_OK, (err) => {
		if (err) {
			writeFailed();
		} else {
			fs_rm(path, (err) => {
				if (err) writeFailed();
			});
		}
	});
}
