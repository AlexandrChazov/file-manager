import { homedir } from "node:os";

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

process.stdin.on("data", (inputBuffer) => {
	const { arg, command, path, path1, path2 } = insert(inputBuffer);
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
			cd(path);
			break;
		}
		case "ls": {
			ls();
			break;
		}
		case "cat": {
			cat(path);
			break;
		}
		case "add": {
			add(path);
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
			rm(path);
			break;
		}
		case "os": {
			osCommands(arg);
			break;
		}
		case "hash": {
			hash(path);
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
