import { json2csv } from 'json-2-csv';
import fs from 'fs';
import path from 'path';

const toCSV = (arr) => json2csv(arr, (err, csv) => {
  if (err) return null;
  try {
    fs.writeFileSync(path.join(__dirname, '..', '..', 'Todos.csv'), csv, 'utf8');
    return 'success';
  } catch (error) {
    return null;
  }
});

export default toCSV;
