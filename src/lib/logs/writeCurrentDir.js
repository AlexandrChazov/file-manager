export function writeCurrentDir() {
	process.stdout.write(`You are currently in ${process.cwd()}\n`);
}
