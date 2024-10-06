import { readdir, statSync } from "fs";

export function ls() {
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
		directories.forEach((dir) => output.push({ Name: dir, Type: "directory" }));
		files.forEach((file) => output.push({ Name: file, Type: "file" }));
		console.table(output);
	});
}
