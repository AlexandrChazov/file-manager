import { homedir } from "os";

import {
	add,
	cat,
	cd,
	cp,
	compress,
	decompress,
	hash,
	insert,
	osCommands,
	ls,
	mv,
	rm,
	rn,
	username,
	writeCurrentDir,
	writeFailed,
	writeInvalidInput,
} from "./lib/index.js";

process.chdir(homedir());
process.stdout.write(`Welcome to the File Manager, ${username()}!\n`);
writeCurrentDir();
process.stdout.write("Enter a command.\n");

process.stdin.on("data", (buffer) => {
	const { command, arg, path1, path2 } = insert(buffer);
	switch (command) {
		case ".exit": {
			process.exit(0);
			break;
		}
		case "up": {
			process.chdir("..");
			break;
		}
		case "cd": {
			cd(arg);
			break;
		}
		case "ls": {
			ls();
			break;
		}
		case "cat": {
			cat(path1);
			break;
		}
		case "add": {
			add(path1);
			break;
		}
		case "rn": {
			rn(path1, path2);
			break;
		}
		case "cp": {
			cp(path1, path2);
			break;
		}
		case "mv": {
			mv(path1, path2);
			break;
		}
		case "rm": {
			rm(path1);
			break;
		}
		case "os": {
			osCommands(arg);
			break;
		}
		case "hash": {
			hash(path1);
			break;
		}
		case "compress": {
			compress(path1, path2);
			break;
		}
		case "decompress": {
			decompress(path1, path2);
			break;
		}
		default: {
			writeInvalidInput();
			return;
		}
	}
	writeCurrentDir();
});

process.on("uncaughtException", () => {
	writeFailed();
});

process.on("exit", () => {
	process.stdout.write(
		`Thank you for using File Manager, ${username()}, goodbye!\n`,
	);
});
