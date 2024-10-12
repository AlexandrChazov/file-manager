import { join } from "path";

export function insert(data) {
	const args = data.toString().trim().split(" ");
	return {
		command: args[0],
		arg: args[1],
		path1: join(process.cwd(), args[1] || ""),
		path2: join(process.cwd(), args[2] || ""),
	};
}
