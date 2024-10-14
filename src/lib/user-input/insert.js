import { delimiter, join, resolve } from "node:path";

export function insert(input) {
	const args = input.toString().trim().split(" ");
	const inputString = input.toString();
	const command = inputString.match(/^\s*\w+\s+/)[0];

	const withoutCommand = inputString.replace(command, "");

	const arg = (withoutCommand.match(/--\w+/) || "")[0];

	// Whitespaces can be used in pathname
	const path = resolve(join(...withoutCommand.split(delimiter))).trim();

	return {
		command: command.trim(),
		arg,
		path,
		path1: resolve(join(args[1] || "")),
		path2: resolve(join(args[2] || "")),
	};
}