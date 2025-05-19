/**
 * getRecords - Helper function to get records from a MongoDB collection
 * @param {*} db database connection object
 * @param {*} collection database collection name
 * @param {*} query query object to filter records
 * @param {*} pageIndex page index for pagination
 * @param {*} limit limit for number of records per page
 * @returns list of records or error message
 */
export async function getRecords(db, collection, query, pageIndex = 1, limit) {
  const skip = (pageIndex - 1) * limit;
  const records = await db?.collection(collection)
    .find(query)
    .skip(skip)
    .limit(limit)
    .toArray();

  if (!records) {
    return {
      message: "No records found",
      errorCode: "RECORDS_NOT_FOUND",
    };
  }
  return records;
}
