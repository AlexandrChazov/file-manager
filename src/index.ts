import { readdir, statSync } from "fs";
import { homedir } from "os";
import { join, resolve } from "path";

import { parseArgs } from "./parseArgs";
import { writeCurrentDir } from "./writeCurrentDir";

const username = parseArgs();
process.chdir(homedir());

process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
writeCurrentDir();
process.stdout.write("Enter a command.\n");

process.stdin.on("data", (data) => {
	const args = data.toString().trim().split(" ");
	const commandName = args[0];
	const arg = args[1];
	switch (commandName) {
		case ".exit": {
			process.exit(0);
			break;
		}
		case "up": {
			process.chdir("..");
			break;
		}
		case "cd": {
			if (arg === "..") {
				process.chdir(arg);
			} else {
				const isRelative = arg[0] === ".";
				const newPath = isRelative
					? join(process.cwd(), arg.slice(2).trim())
					: resolve(arg.slice(2).trim());
				process.chdir(newPath);
			}
			break;
		}
		case "ls": {
			readdir(".", (err, items) => {
				const directories = [];
				const files = [];
				items.forEach((item) => {
					const stats = statSync(item);
					const isDirectory = stats.isDirectory();
					if (isDirectory) {
						directories.push(item);
					} else {
						files.push(item);
					}
				});
				directories.sort();
				files.sort();

				const output = [];
				directories.forEach((dir) =>
					output.push({ Name: dir, Type: "directory" }),
				);
				files.forEach((file) => output.push({ Name: file, Type: "file" }));
				console.table(output);
			});
			break;
		}
		default: {
			process.stdout.write("Invalid input\n");
			return;
		}
	}
	writeCurrentDir();
});

process.on("uncaughtException", () => {
	process.stdout.write("Operation failed\n");
});

process.on("exit", () => {
	process.stdout.write(
		`Thank you for using File Manager, ${username}, goodbye!\n`,
	);
});
