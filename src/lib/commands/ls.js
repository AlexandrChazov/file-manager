import { readdir, statSync } from "node:fs";

export function ls() {
	readdir(process.cwd(), (err, items) => {
		const directories = [];
		const files = [];
		items.forEach((item) => {
			try {
				const stats = statSync(item, { throwIfNoEntry: false });
				const isDirectory = stats.isDirectory();
				if (isDirectory) {
					directories.push(item);
				} else {
					files.push(item);
				}
			} catch {}
		});
		directories.sort();
		files.sort();

		const output = [];
		directories.forEach((dir) => output.push({ Name: dir, Type: "directory" }));
		files.forEach((file) => output.push({ Name: file, Type: "file" }));
		console.table(output);
	});
}
