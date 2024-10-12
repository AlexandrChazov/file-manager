import { arch, cpus, EOL, userInfo } from "node:os";
import { writeInvalidInput } from "../logs/index.js";

export function osCommands(arg) {
	switch (arg) {
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
}
