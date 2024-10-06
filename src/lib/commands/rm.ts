import { access, constants, rm as fs_rm } from "fs";
import { writeFailed } from "../logs";

export function rm(path: string): void {
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
