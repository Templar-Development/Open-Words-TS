import { Parser } from './src/parser';

const parser = new Parser();
let output: any = parser.parseLine("curres", "lte", true);
let jsonOutput = JSON.stringify(output, null, 2);

console.log(jsonOutput);
