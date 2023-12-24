import {SatCat} from '../src/data-handlers/SatCatHandler';

describe('SatCat', () => {
  const satCatPath = './src/data/satcat.json';
  describe('loadFromLocalFile', () => {
    it('should load the SatCat data from a local file', async () => {
      const satcat = await SatCat.fromLocalFile(satCatPath);
      expect(satcat[0].SATNAME).toBe('SL-1 R/B');
      expect(satcat.length).toBe(58534);
    });
  });

  describe('filterByTypes', () => {
    it('should filter the SatCat data by object types', async () => {
      const satcat = await SatCat.fromLocalFile(satCatPath);
      const filtered = satcat.filterByTypes(['PAYLOAD', 'ROCKET BODY']);
      expect(filtered.length).toBe(23178);
    });
  });

  describe('filterByNamePattern', () => {
    it('should filter the SatCat data by name patterns', async () => {
      const satcat = await SatCat.fromLocalFile(satCatPath);
      const filtered = satcat.filterByNamePattern('STARLINK');
      expect(filtered.length).toBe(5545);
    });
  });

  describe('filterByLaunchYear', () => {
    it('should filter the SatCat data by launch years', async () => {
      const satcat = await SatCat.fromLocalFile(satCatPath);
      const filtered = satcat.filterByLaunchYears([2019, 2020]);
      expect(filtered.length).toBe(2219);
    });
  });

  describe('filterByLaunchYearRange', () => {
    it('should filter the SatCat data by launch year ranges', async () => {
      const satcat = await SatCat.fromLocalFile(satCatPath);
      const filtered = satcat.filterByLaunchYearRange(2019, 2020);
      expect(filtered.length).toBe(2219);
    });
  });

  describe('filterByCountryCodes', () => {
    it('should filter the SatCat data by country codes', async () => {
      const satcat = await SatCat.fromLocalFile(satCatPath);
      const filtered = satcat.filterByCountryCodes(['US', 'CA']);
      const filtered2 = filtered.filterByCountryCodes(['US']);
      const filtered3 = filtered.filterByCountryCodes(['CA']);
      expect(filtered.length).toBe(20450);
      expect(filtered2.length).toBe(20349);
      expect(filtered3.length).toBe(101);
    });
  });

  describe('filterByMaxPerigee', () => {
    it('should filter the SatCat data by maximum perigee', async () => {
      const satcat = await SatCat.fromLocalFile(satCatPath);
      const filtered = satcat.filterByMaxPerigee(500);
      expect(filtered.length).toBe(32466);
    });
  });

  describe('filterByMinApogee', () => {
    it('should filter the SatCat data by minimum apogee', async () => {
      const satcat = await SatCat.fromLocalFile(satCatPath);
      const filtered = satcat.filterByMinApogee(500);
      expect(filtered.length).toBe(31031);
    });
  });

  describe('filterByNoradIds', () => {
    it('should filter the SatCat data by NORAD IDs', async () => {
      const satcat = await SatCat.fromLocalFile(satCatPath);
      const filtered = satcat.filterByNoradIds(['25544', '40000']);
      expect(filtered.length).toBe(2);
      expect(filtered[0].SATNAME).toBe('ISS (ZARYA)');
      expect(filtered[1].SATNAME).toBe('FENGYUN 2C DEB');
    });
  });
});
