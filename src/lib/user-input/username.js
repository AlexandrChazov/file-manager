export function username() {
	let result = "";
	const args = process.argv;
	for (let i = 0; i < args.length; i++) {
		if (args[i].startsWith("--username=")) {
			result = args[i].slice("--username=".length);
			break;
		}
	}
	return result;
}
