
/**
 * Represents a SatCat.
 */
export class SatCat extends Array {
  /**
   * Constructs a SatCatHandler object.
   * @param {Array<Object>} satCatData - The SatCat data.
   */
  constructor(satCatData) {
    /**
     * The SatCat data.
     * @type {Array<Object>}
     * @private
     */
    super();
    for (let i=0; i<satCatData.length; i++) {
      this.push(satCatData[i]);
    }
  }

  /**
   * Loads the SatCat data from a local file.
   * @param {string} pathToSatCatFile - The path to the SatCat file.
   * @return {Promise<SatCatHandler>} The SatCat data as a handler object.
   */
  static async fromLocalFile(pathToSatCatFile) {
    const fs = require('fs');
    const util = require('util');
    const readFile = util.promisify(fs.readFile);
    const satCatData = await readFile(pathToSatCatFile, 'utf8');
    return new SatCat(JSON.parse(satCatData));
  }

  /**
   * Filters the SatCat data by object types.
   * @param {Array<string>} objectTypes - The object types to filter by.
   * @return {Array<Object>} The filtered SatCat data.
   * @example
   * // Returns satellites with an object type of 'PAYLOAD' or 'ROCKET BODY'.
   * const plAndRocketBody = handler.filterByTypes(['PAYLOAD', 'ROCKET BODY']);
   * @example
   * // Returns all satellites with an object type of 'DEBRIS' or 'UNKNOWN'.
   * const debrisAndUnknownSats = handler.filterByTypes(['DEBRIS', 'UNKNOWN']);
   * @example
   * // Returns all satellites with an object type of 'TBA'.
   * const tbaSats = handler.filterByTypes(['TBA']);
  */
  filterByTypes(objectTypes) {
    return this.filter((sat) => objectTypes.includes(sat.OBJECT_TYPE));
  }

  /**
   * Filters the SatCat by name patterns
   * @param {string} pattern - The pattern to filter by.
   * @return {Array<Object>} The filtered SatCat data.
   * @example
   * // Returns all satellites with a name that starts with 'STARLINK'.
   * const starlinkSats = handler.filterByNamePattern('^STARLINK');
   * @example
   * // Returns all satellites with a name that ends with 'A'.
   * const aSats = handler.filterByNamePattern('A$');
   * @example
   * // Returns all satellites with a name that contains 'STARLINK'.
   * const starlinkSats = handler.filterByNamePattern('STARLINK');
   */
  filterByNamePattern(pattern) {
    const regex = new RegExp(pattern, 'i');
    return this.filter((sat) => regex.test(sat.SATNAME));
  }

  /**
   * Filters the SatCat by country codes.
   * @param {Array<string>} countryCodes - The country codes to filter by.
   * @return {Array<Object>} The filtered SatCat data.
   * @example
   * // Returns all satellites with a country code of 'US' or 'JP'.
   * const usAndJpSats = handler.filterByCountryCodes(['US', 'JP']);
   */
  filterByCountryCodes(countryCodes) {
    return this.filter((sat) => countryCodes.includes(sat.COUNTRY));
  }
  /**
   * Filters the SatCat for objects that are still on orbit.
   * @return {Array<Object>} The filtered SatCat data.
   * @example
   * // Returns all satellites that are still on orbit.
   * const stillOnOrbit = handler.filterByStillOnOrbit();
   */
  filterByStillOnOrbit() {
    return this.filter((sat) => sat.DECAY === null);
  }

  /**
   * Filters the SatCat for objects that launched in a given year.
   * @param {Array<number>} years - The years to filter by.
   * @return {Array<Object>} The filtered SatCat data.
   * @example
   * // Returns all satellites that launched in 2019 or 2020.
   * const launchedIn2019or2020 = handler.filterByLaunchYears([2019, 2020]);
   */
  filterByLaunchYears(years) {
    return this.filter((sat) => years.includes(Number(sat.LAUNCH_YEAR)));
  }

  /**
   * Filters the SatCat for objects that launched in a given year range.
   * @param {number} startYear - The start year to filter by.
   * @param {number} endYear - The end year to filter by.
   * @return {Array<Object>} The filtered SatCat data.
   * @example
   * // Returns all satellites that launched between 2018 and 2020.
   * const launchedIn2018To2020 = handler.filterByLaunchYearRange(2018, 2020);
   */
  filterByLaunchYearRange(startYear, endYear) {
    return this.filter((sat) => {
      const launchYear = Number(sat.LAUNCH_YEAR);
      return launchYear >= startYear && launchYear <= endYear;
    });
  }

  /**
   * Filters the SatCat for objects that have a perigee less than or equal to
   * a given value.
   * @param {number} maxPerigee - The maximum perigee to filter by.
   * @return {Array<Object>} The filtered SatCat data.
   * @example
   * // Returns all satellites with a perigee less than or equal to 200 km.
   * const perigeeLessThan200 = handler.filterByMaxPerigee(200);
   */
  filterByMaxPerigee(maxPerigee) {
    return this.filter((sat) => {
      const perigee = Number(sat.PERIGEE);
      return perigee <= maxPerigee;
    });
  }

  /**
   * Filters the SatCat for objects that have an apogee greater than or equal to
   * a given value.
   * @param {number} minApogee - The minimum apogee to filter by.
   * @return {Array<Object>} The filtered SatCat data.
   * @example
   * // Returns all satellites with an apogee greater than or equal to 200 km.
   * const apogeeGreaterThan200 = handler.filterByMinApogee(200);
   */
  filterByMinApogee(minApogee) {
    return this.filter((sat) => {
      const apogee = Number(sat.APOGEE);
      return apogee >= minApogee;
    });
  }

  /**
   * Filters the SatCat for objects with a given NORAD ID.
   * @param {Array<number>} noradIds - The NORAD IDs to filter by.
   * @return {Array<Object>} The filtered SatCat data.
   */
  filterByNoradIds(noradIds) {
    return this.filter((sat) => noradIds.includes(sat.NORAD_CAT_ID));
  }
};
