import ObjectsToCsv from 'objects-to-csv';
import logger from '../config/logger';
/**
* @description This method exports json data to csv
* @param {object} arr arrays of data
* @returns {object} data
*/
const toCSV = async (arr) => {
  try {
    const csv = new ObjectsToCsv(arr);
    await csv.toDisk(`${__dirname}/../../todos.csv`);
    return null;
  } catch (error) {
    logger.error(error.stack);
    return error;
  }
};

export default toCSV;
