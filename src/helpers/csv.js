import { json2csv } from 'json-2-csv';
import fs from 'fs';
import path from 'path';

/**
* @description This method exports json data to csv
* @param {object} arr arrays of data
* @returns {object} data
*/
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
