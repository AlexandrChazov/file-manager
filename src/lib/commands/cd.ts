import { join, resolve } from "path";

export function cd(arg: string): void {
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
