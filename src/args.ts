import { join } from "path";

export function args(data: Buffer): Args {
	const args = data.toString().trim().split(" ");
	return {
		command: args[0],
		arg1: args[1],
		path1: join(process.cwd(), args[1] || ""),
		path2: join(process.cwd(), args[2] || ""),
	};
}

interface Args {
	command: string;
	arg1: string;
	path1: string;
	path2: string;
}
