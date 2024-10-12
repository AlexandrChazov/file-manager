import { join, resolve } from "node:path";

export function cd(arg) {
	if (arg === "..") {
		process.chdir(arg);
	} else {
		const isRelative = arg[0] === ".";
		const newPath = isRelative
			? join(process.cwd(), arg.slice(2))
			: resolve(arg.slice(2));
		process.chdir(newPath);
	}
}
