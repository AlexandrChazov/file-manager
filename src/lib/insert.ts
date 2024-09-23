import { join } from "path";

export function insert(data: Buffer): Args {
	const args = data.toString().trim().split(" ");
	return {
		command: args[0],
		arg: args[1],
		path1: join(process.cwd(), args[1] || ""),
		path2: join(process.cwd(), args[2] || ""),
	};
}

interface Args {
	command: string;
	arg: string;
	path1: string;
	path2: string;
}
