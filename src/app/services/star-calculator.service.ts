import { Injectable } from '@angular/core';
import { StarDevice, SelectedAward } from '../models/ribbon.model';

@Injectable({ providedIn: 'root' })
export class StarCalculatorService {

  /**
   * Calculate star devices for a given award based on Enclosure 4 rules.
   *
   * For Hero, Distinguished Citizen (G/S/B), and Distinguished Service (ids 1-5):
   *   - Each additional award = 5/16" Gold Star
   *   - 5 Gold Stars → 1 Silver Star
   *
   * For ALL other medals and ribbons:
   *   - Each additional award = 3/16" Bronze Star
   *   - 5 Bronze Stars → 1 Silver Star
   *   - 5 Silver Stars → 1 Gold Star
   */
  calculateStars(award: SelectedAward): StarDevice[] {
    if (award.ribbon.isMarksmanship && award.marksmanshipLevel) {
      return this.calculateMarksmanshipDevices(award.marksmanshipLevel);
    }

    const additionalAwards = award.count - 1;
    if (additionalAwards <= 0) return [];

    const isTopTier = award.ribbon.id >= 1 && award.ribbon.id <= 5;

    if (isTopTier) {
      return this.calculateTopTierStars(additionalAwards);
    } else {
      return this.calculateStandardStars(additionalAwards);
    }
  }

  /**
   * Top-tier awards (Hero, Distinguished Citizen, Distinguished Service):
   * 5/16" Gold Stars, 5 Gold = 1 Silver
   */
  private calculateTopTierStars(count: number): StarDevice[] {
    const devices: StarDevice[] = [];
    const silver = Math.floor(count / 5);
    const gold = count % 5;

    if (silver > 0) {
      devices.push({ type: 'silver', size: 'large', count: silver });
    }
    if (gold > 0) {
      devices.push({ type: 'gold', size: 'large', count: gold });
    }
    return devices;
  }

  /**
   * Standard awards:
   * 3/16" Bronze Stars, 5 Bronze = 1 Silver, 5 Silver = 1 Gold
   */
  private calculateStandardStars(count: number): StarDevice[] {
    const devices: StarDevice[] = [];
    const gold = Math.floor(count / 25);
    const remainAfterGold = count % 25;
    const silver = Math.floor(remainAfterGold / 5);
    const bronze = remainAfterGold % 5;

    if (gold > 0) {
      devices.push({ type: 'gold', size: 'small', count: gold });
    }
    if (silver > 0) {
      devices.push({ type: 'silver', size: 'small', count: silver });
    }
    if (bronze > 0) {
      devices.push({ type: 'bronze', size: 'small', count: bronze });
    }
    return devices;
  }

  /**
   * Marksmanship qualifications (Enclosure 4, Note 5):
   * - Marksman: no device
   * - Sharpshooter: 1 Bronze Star
   * - Expert: 1 Silver Star
   * - Master: 1 Gold Star
   * - High Master: 2 Gold Stars
   */
  private calculateMarksmanshipDevices(
    level: 'marksman' | 'sharpshooter' | 'expert' | 'master' | 'high_master'
  ): StarDevice[] {
    switch (level) {
      case 'marksman':
        return [];
      case 'sharpshooter':
        return [{ type: 'bronze', size: 'small', count: 1 }];
      case 'expert':
        return [{ type: 'silver', size: 'small', count: 1 }];
      case 'master':
        return [{ type: 'gold', size: 'small', count: 1 }];
      case 'high_master':
        return [{ type: 'gold', size: 'small', count: 2 }];
    }
  }

  /**
   * Get the total number of individual star icons to render
   */
  getTotalStarCount(devices: StarDevice[]): number {
    return devices.reduce((sum, d) => sum + d.count, 0);
  }
}
