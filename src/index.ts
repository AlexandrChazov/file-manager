import { createHash } from "crypto";
import {
	access,
	constants,
	createReadStream,
	createWriteStream,
	readdir,
	rename,
	rm,
	statSync,
	writeFile,
} from "fs";
import { arch, homedir, cpus, EOL, userInfo } from "os";
import { join, resolve } from "path";

import { parseArgs } from "./parseArgs";
import { writeCurrentDir } from "./writeCurrentDir";
import { writeFailed } from "./writeFailed";
import { args } from "./args";
import { writeInvalidInput } from "./writeInvalidInput";

const username = parseArgs();
process.chdir(homedir());

process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
writeCurrentDir();
process.stdout.write("Enter a command.\n");

process.stdin.on("data", (buffer) => {
	const { command, arg1, path1, path2 } = args(buffer);
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
			if (arg1 === "..") {
				process.chdir(arg1);
			} else {
				const isRelative = arg1[0] === ".";
				const newPath = isRelative
					? join(process.cwd(), arg1.slice(2))
					: resolve(arg1.slice(2));
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
		case "cat": {
			let result = "";
			const readStream = createReadStream(path1);
			readStream.on("data", (chunk) => {
				result = result.concat(chunk.toString());
			});
			readStream.on("end", () => {
				process.stdout.write(`${result}\n`);
			});
			break;
		}
		case "add": {
			writeFile(path1, "", (err) => {
				if (err) {
					writeFailed();
				}
			});
			break;
		}
		case "rn": {
			access(path1, constants.F_OK, (err) => {
				if (err) writeFailed();
				access(path2, constants.F_OK, (err) => {
					if (!err) writeFailed();
					rename(path1, path2, (err) => {
						if (err) writeFailed();
					});
				});
			});
			break;
		}
		case "cp": {
			access(path1, constants.F_OK, (err) => {
				if (err) writeFailed();
				access(path2, constants.F_OK, (err) => {
					if (!err) writeFailed();
					const readStream = createReadStream(path1);
					const writeStream = createWriteStream(path2);
					readStream.pipe(writeStream);
				});
			});
			break;
		}
		case "mv": {
			access(path1, constants.F_OK, (err) => {
				if (err) writeFailed();
				access(path2, constants.F_OK, (err) => {
					if (!err) writeFailed();
					const readStream = createReadStream(path1);
					const writeStream = createWriteStream(path2);
					readStream.on("data", (chunk) => {
						writeStream.write(chunk);
					});
					readStream.on("close", () => {
						writeStream.close();
					});
					writeStream.on("close", () => {
						rm(path1, (err) => {
							if (err) writeFailed();
						});
					});
				});
			});
			break;
		}
		case "rm": {
			access(path1, constants.F_OK, (err) => {
				if (err) writeFailed();
				rm(path1, (err) => {
					if (err) writeFailed();
				});
			});
			break;
		}
		case "os": {
			switch (arg1) {
				case "--EOL": {
					process.stdout.write(`${JSON.stringify(EOL)}\n`);
					break;
				}
				case "--cpus": {
					const cores = cpus();
					process.stdout.write(`overall amount of CPUS: ${cores.length}\n`);
					cores.forEach((core) => {
						process.stdout.write(`model: ${core.model}\n`);
						process.stdout.write(`clock rate: ${core.speed / 1000} GHz\n`);
					});
					break;
				}
				case "--homedir": {
					process.stdout.write(`${userInfo().homedir}\n`);
					break;
				}
				case "--username": {
					process.stdout.write(`${userInfo().username}\n`);
					break;
				}
				case "--architecture": {
					process.stdout.write(`${arch()}\n`);
					break;
				}
				default: {
					writeInvalidInput();
				}
			}
			break;
		}
		case "hash": {
			const hash = createHash("sha256");
			const readStream = createReadStream(path1);
			readStream.on("data", (chunk) => {
				hash.update(chunk);
			});
			readStream.on("error", () => {
				writeFailed();
			});
			readStream.on("end", () => {
				process.stdout.write(`${hash.digest("hex")}\n`);
			});
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
		`Thank you for using File Manager, ${username}, goodbye!\n`,
	);
});
