import { Component, computed, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RibbonDataService } from './services/ribbon-data.service';
import { StarCalculatorService } from './services/star-calculator.service';
import { Ribbon, SelectedAward, StarDevice } from './models/ribbon.model';

@Component({
  selector: 'app-root',
  imports: [TitleCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private ribbonData = inject(RibbonDataService);
  private starCalc = inject(StarCalculatorService);

  readonly allRibbons = this.ribbonData.ribbons;
  readonly mclRibbons = this.ribbonData.getRibbonsByCategory('mcl');
  readonly moddRibbons = this.ribbonData.getRibbonsByCategory('modd');
  readonly conventionRibbons = this.ribbonData.getRibbonsByCategory('convention');
  readonly stateRibbons = this.ribbonData.getRibbonsByCategory('state');

  // Track selected awards: Map<ribbonId, SelectedAward>
  readonly selectedAwards = signal<Map<number, SelectedAward>>(new Map());

  // Search filter
  readonly searchQuery = signal('');

  // Member Info
  readonly memberName = signal('');
  readonly detachmentName = signal('');
  readonly detachmentNumber = signal('');
  readonly detachmentLocation = signal('');

  // Collapsed sections
  readonly collapsedSections = signal<Set<string>>(new Set());

  // Filtered ribbons based on search
  readonly filteredMcl = computed(() => this.filterRibbons(this.mclRibbons));
  readonly filteredModd = computed(() => this.filterRibbons(this.moddRibbons));
  readonly filteredConvention = computed(() => this.filterRibbons(this.conventionRibbons));
  readonly filteredState = computed(() => this.filterRibbons(this.stateRibbons));

  // Sorted selected awards for rack display
  readonly rackAwards = computed(() => {
    const awards = Array.from(this.selectedAwards().values());
    return awards.sort((a, b) => a.ribbon.id - b.ribbon.id);
  });

  // Rack rows (3 per row, partial row on top)
  readonly rackRows = computed(() => {
    const awards = this.rackAwards();
    if (awards.length === 0) return [];

    const rows: SelectedAward[][] = [];
    const perRow = 3;
    const remainder = awards.length % perRow;

    let startIndex = 0;
    if (remainder > 0) {
      rows.push(awards.slice(0, remainder));
      startIndex = remainder;
    }

    for (let i = startIndex; i < awards.length; i += perRow) {
      rows.push(awards.slice(i, i + perRow));
    }
    return rows;
  });

  readonly totalSelected = computed(() => this.selectedAwards().size);

  private filterRibbons(ribbons: Ribbon[]): Ribbon[] {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return ribbons;
    return ribbons.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.shortName.toLowerCase().includes(q)
    );
  }

  isSelected(ribbonId: number): boolean {
    return this.selectedAwards().has(ribbonId);
  }

  getAwardCount(ribbonId: number): number {
    return this.selectedAwards().get(ribbonId)?.count ?? 0;
  }

  getMarksmanshipLevel(ribbonId: number): string {
    return this.selectedAwards().get(ribbonId)?.marksmanshipLevel ?? 'marksman';
  }

  toggleAward(ribbon: Ribbon): void {
    const map = new Map(this.selectedAwards());
    if (map.has(ribbon.id)) {
      map.delete(ribbon.id);
    } else {
      const award: SelectedAward = { ribbon, count: 1 };
      if (ribbon.isMarksmanship) {
        award.marksmanshipLevel = 'marksman';
      }
      map.set(ribbon.id, award);
    }
    this.selectedAwards.set(map);
  }

  updateCount(ribbonId: number, delta: number): void {
    const map = new Map(this.selectedAwards());
    const award = map.get(ribbonId);
    if (!award) return;
    const newCount = Math.max(1, award.count + delta);
    map.set(ribbonId, { ...award, count: newCount });
    this.selectedAwards.set(map);
  }

  setMarksmanshipLevel(ribbonId: number, level: string): void {
    const map = new Map(this.selectedAwards());
    const award = map.get(ribbonId);
    if (!award) return;
    map.set(ribbonId, {
      ...award,
      marksmanshipLevel: level as SelectedAward['marksmanshipLevel']
    });
    this.selectedAwards.set(map);
  }

  setFramed(ribbonId: number, isFramed: boolean): void {
    const map = new Map(this.selectedAwards());
    const award = map.get(ribbonId);
    if (!award) return;
    map.set(ribbonId, { ...award, isFramed });
    this.selectedAwards.set(map);
  }

  isFramed(ribbonId: number): boolean {
    return this.selectedAwards().get(ribbonId)?.isFramed ?? false;
  }

  getStars(award: SelectedAward): StarDevice[] {
    return this.starCalc.calculateStars(award);
  }

  getStarArray(award: SelectedAward): { type: string; size: string }[] {
    const devices = this.getStars(award);
    const result: { type: string; size: string }[] = [];
    for (const device of devices) {
      for (let i = 0; i < device.count; i++) {
        result.push({ type: device.type, size: device.size });
      }
    }
    return result;
  }

  getLegendName(ribbon: Ribbon, award: SelectedAward): string {
    const base = ribbon.name.includes('Medal') ? `* ${ribbon.name}` : ribbon.name;
    return award.isFramed ? `${base} (w/ Gold Frame)` : base;
  }

  getStarsDescription(award: SelectedAward): string {
    const devices = this.getStars(award);
    if (devices.length === 0) return '';
    
    return devices.map(d => {
      const sizeStr = d.size === 'large' ? '5/16"' : '3/16"';
      const typeStr = d.type.charAt(0).toUpperCase() + d.type.slice(1);
      return `${d.count}x ${sizeStr} ${typeStr} Star${d.count > 1 ? 's' : ''}`;
    }).join(', ');
  }

  toggleSection(section: string): void {
    const sections = new Set(this.collapsedSections());
    if (sections.has(section)) {
      sections.delete(section);
    } else {
      sections.add(section);
    }
    this.collapsedSections.set(sections);
  }

  isSectionCollapsed(section: string): boolean {
    return this.collapsedSections().has(section);
  }

  clearAll(): void {
    this.selectedAwards.set(new Map());
  }

  onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  getRibbonStyle(ribbon: Ribbon): Record<string, string> {
    return {
      backgroundImage: `url('ribbons/${ribbon.imageUrl}')`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  }

  printRack(): void {
    window.print();
  }
}
