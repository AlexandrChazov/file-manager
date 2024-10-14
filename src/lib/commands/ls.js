import { readdir, stat } from "node:fs/promises";

export async function ls() {
	const items = await readdir(process.cwd());
	const directories = [];
	const files = [];
	const promises = [];

	items.forEach((item) => {
		promises.push(stat(item).then((result) => ({ Stats: result, item })));
	});

	const stats = await Promise.allSettled(promises);

	stats.forEach(({ status, value }) => {
		if (status === "fulfilled") {
			const { Stats, item } = value;
			const isDirectory = Stats?.isDirectory();
			if (isDirectory) {
				directories.push(item);
			} else {
				files.push(item);
			}
		}
	})

	directories.sort();
	files.sort();

	const output = [];
	directories.forEach((dir) => output.push({ Name: dir, Type: "directory" }));
	files.forEach((file) => output.push({ Name: file, Type: "file" }));
	console.table(output);
}
