import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RibbonDataService } from './services/ribbon-data.service';
import { StarCalculatorService } from './services/star-calculator.service';
import { ProfileService } from './services/profile.service';
import { AuthService } from './services/auth.service';
import { Ribbon, SelectedAward, StarDevice, UserRackProfile } from './models/ribbon.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [TitleCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private ribbonData = inject(RibbonDataService);
  private starCalc = inject(StarCalculatorService);
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);

  readonly user = toSignal(this.authService.user$);
  readonly authEmail = signal('');
  readonly isAuthLoading = signal(false);
  readonly authError = signal('');
  readonly selectorOpen = signal(false);

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
  readonly mclProfileId = signal('');
  readonly email = signal('');
  readonly phone = signal('');

  // Collapsed sections
  readonly collapsedSections = signal<Set<string>>(new Set());

  // Filtered ribbons based on search
  readonly filteredMcl = computed(() => this.filterRibbons(this.mclRibbons));
  readonly filteredModd = computed(() => this.filterRibbons(this.moddRibbons));
  readonly filteredConvention = computed(() => this.filterRibbons(this.conventionRibbons));
  readonly filteredState = computed(() => this.filterRibbons(this.stateRibbons));

  async ngOnInit(): Promise<void> {
    // Check if we're landing from an auth link
    try {
      await this.authService.completeSignIn();
    } catch (error: any) {
      const msg = error?.message || 'Failed to complete sign-in. Please try again.';
      this.authError.set(msg);
    }
  }

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

  toggleSelector(): void {
    this.selectorOpen.update(v => !v);
  }

  async login(): Promise<void> {
    const email = this.authEmail().trim();
    if (!email) {
      this.authError.set('Please enter your email address.');
      return;
    }

    this.authError.set('');
    this.isAuthLoading.set(true);
    try {
      await this.authService.sendSignInLink(email);
      alert(`A sign-in link has been sent to ${email}. Check your inbox (and spam folder).`);
    } catch (error: any) {
      const msg = error?.code === 'auth/invalid-email'
        ? 'Please enter a valid email address.'
        : error?.message || 'Failed to send sign-in link. Please try again.';
      this.authError.set(msg);
    } finally {
      this.isAuthLoading.set(false);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
    } catch (error) {
      alert('Failed to log out.');
    }
  }

  async loadUserRack(): Promise<void> {
    const id = this.mclProfileId().trim();
    if (!id) {
      alert('Please enter a Profile ID to load.');
      return;
    }

    try {
      const profile = await this.profileService.getProfile(id);
      if (profile) {
        // Load data into signals
        this.memberName.set(profile.memberName);
        this.detachmentName.set(profile.detachmentName);
        this.detachmentNumber.set(profile.detachmentNumber);
        this.detachmentLocation.set(profile.detachmentLocation);
        this.email.set(profile.email || '');
        this.phone.set(profile.phone || '');

        // Load awards
        const awardMap = new Map<number, SelectedAward>();
        for (const a of profile.awards) {
          const ribbon = this.allRibbons.find(r => r.id === a.ribbonId);
          if (ribbon) {
            awardMap.set(a.ribbonId, {
              ribbon,
              count: a.count,
              marksmanshipLevel: a.marksmanshipLevel,
              isFramed: a.isFramed
            });
          }
        }
        this.selectedAwards.set(awardMap);
        //alert('Rack loaded successfully!');
      } else {
        alert('No profile found for this ID.');
      }
    } catch (error) {
      console.error('Error loading rack:', error);
      alert('Failed to load rack. Please check your connection.');
    }
  }

  async saveUserRack(): Promise<void> {
    const id = this.mclProfileId().trim();
    if (!id) {
      alert('Please enter a Profile ID to save.');
      return;
    }

    const awards = Array.from(this.selectedAwards().values()).map(a => {
      const item: any = {
        ribbonId: Number(a.ribbon.id),
        count: Number(a.count) || 1
      };
      if (a.marksmanshipLevel) {
        item.marksmanshipLevel = String(a.marksmanshipLevel);
      }
      if (typeof a.isFramed === 'boolean') {
        item.isFramed = a.isFramed;
      }
      return item;
    });

    const profileData: any = {
      profileId: String(id),
      memberName: String(this.memberName() || ''),
      detachmentName: String(this.detachmentName() || ''),
      detachmentNumber: String(this.detachmentNumber() || ''),
      detachmentLocation: String(this.detachmentLocation() || ''),
      email: String(this.email() || ''),
      phone: String(this.phone() || ''),
      awards: awards
    };

    // Final safety check: remove any keys that are still undefined
    Object.keys(profileData).forEach(key => {
      if (profileData[key] === undefined) {
        delete profileData[key];
      }
    });

    try {
      console.log('Attempting to save profile data:', profileData);
      await this.profileService.saveProfile(profileData);
      alert('Rack saved to database successfully!');
    } catch (error) {
      console.error('Error saving rack:', error);
      alert('Failed to save rack. Please check the console for details.');
    }
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
