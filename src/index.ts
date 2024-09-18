import { parseArgs } from './parseArgs';

const username = parseArgs();
process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
process.stdin.on('data', () => {});
