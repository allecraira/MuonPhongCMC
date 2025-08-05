import { describe, it, expect, vi } from "vitest";
import {
  getCMCUniversityInfo,
  getCMCFaculties,
  getCMCStatistics,
  getCMCAchievements,
  getCMCFacilities,
  searchCMCInfo,
  getCMCContact
} from "@/lib/cmcApi";

describe('CMC API', () => {
  it('getCMCUniversityInfo returns university info object', async () => {
    const info = await getCMCUniversityInfo();
    expect(info).toHaveProperty('name');
    expect(info).toHaveProperty('faculties');
    expect(Array.isArray(info.faculties)).toBe(true);
  });

  it('getCMCFaculties returns array of faculties', async () => {
    const faculties = await getCMCFaculties();
    expect(Array.isArray(faculties)).toBe(true);
    expect(faculties[0]).toHaveProperty('id');
  });

  it('getCMCStatistics returns statistics object', async () => {
    const stats = await getCMCStatistics();
    expect(stats).toHaveProperty('totalStudents');
    expect(typeof stats.totalStudents).toBe('number');
  });

  it('getCMCAchievements returns array of achievements', async () => {
    const achievements = await getCMCAchievements();
    expect(Array.isArray(achievements)).toBe(true);
    expect(achievements[0]).toHaveProperty('year');
  });

  it('getCMCFacilities returns array of facilities', async () => {
    const facilities = await getCMCFacilities();
    expect(Array.isArray(facilities)).toBe(true);
    expect(facilities[0]).toHaveProperty('id');
  });

  it('searchCMCInfo returns array (can be empty)', async () => {
    const result = await searchCMCInfo('CNTT');
    expect(Array.isArray(result)).toBe(true);
  });

  it('getCMCContact returns contact info', () => {
    const contact = getCMCContact();
    expect(contact).toHaveProperty('phone');
    expect(contact).toHaveProperty('email');
  });
});