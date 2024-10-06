import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export function readCsvFile(fileName: string) {
  const filePath = path.join(process.cwd(), 'data', fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });
  return records;
}