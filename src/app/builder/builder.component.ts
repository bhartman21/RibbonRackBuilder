import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RibbonDataService } from '../services/ribbon-data.service';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Ribbon, SelectedAward, UserRackProfile } from '../models/ribbon.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeaderComponent } from '../components/header/header.component';
import { RackVisualizerComponent } from '../components/rack-visualizer/rack-visualizer.component';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RackVisualizerComponent],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.css'
})
export class BuilderComponent implements OnInit {
  private ribbonData = inject(RibbonDataService);
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);

  readonly user = toSignal(this.authService.user$);
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
  readonly rackPin = signal(''); // New Security PIN signal
  readonly statusMessage = signal<string | null>(null); // Feedback status

  // Collapsed sections
  readonly collapsedSections = signal<Set<string>>(new Set());

  // Filtered ribbons based on search
  readonly filteredMcl = computed(() => this.filterRibbons(this.mclRibbons));
  readonly filteredModd = computed(() => this.filterRibbons(this.moddRibbons));
  readonly filteredConvention = computed(() => this.filterRibbons(this.conventionRibbons));
  readonly filteredState = computed(() => this.filterRibbons(this.stateRibbons));

  async ngOnInit(): Promise<void> {
    // Auth initialization is now handled by HeaderComponent
  }

  // Sorted selected awards for rack display
  readonly rackAwards = computed(() => {
    const awards = Array.from(this.selectedAwards().values());
    console.log(`Recomputing rackAwards: ${awards.length} items`);
    return [...awards].sort((a, b) => a.ribbon.id - b.ribbon.id);
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
    console.log('Toggling ribbon:', ribbon.id, ribbon.shortName);
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

  getLegendName(ribbon: Ribbon, award: SelectedAward): string {
    const base = ribbon.name.includes('Medal') ? `* ${ribbon.name}` : ribbon.name;
    return award.isFramed ? `${base} (w/ Gold Frame)` : base;
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

  async loadUserRack(): Promise<void> {
    const id = this.mclProfileId().trim();
    const pin = this.rackPin().trim();

    if (!id) {
      alert('Please enter a Profile ID to load.');
      return;
    }

    try {
      const profile = await this.profileService.getProfile(id);
      if (profile) {
        // PIN Verification removed for loading (publicly viewable)

        // Set state from profile
        this.memberName.set(profile.memberName || '');
        this.detachmentName.set(profile.detachmentName || '');
        this.detachmentNumber.set(profile.detachmentNumber || '');
        this.detachmentLocation.set(profile.detachmentLocation || '');
        this.email.set(profile.email || '');
        this.phone.set(profile.phone || '');
        // Do not load the PIN into the signal (as per user request)

        const awardMap = new Map<number, SelectedAward>();
        if (profile.awards) {
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
        }
        this.selectedAwards.set(awardMap);
        this.showStatus('Ribbon Rack loaded successfully.');
      } else {
        this.showStatus('No profile found with that ID.', true);
      }
    } catch (error: any) {
      console.error('Error loading Ribbon Rack:', error);
      this.showStatus('Error loading Ribbon Rack. Check connection.', true);
    }
  }

  private showStatus(msg: string, isError = false): void {
    this.statusMessage.set(msg);
    setTimeout(() => this.statusMessage.set(null), 5000);
  }

  async saveUserRack(): Promise<void> {
    const id = this.mclProfileId().trim();
    const name = this.memberName().trim();
    const pin = this.rackPin().trim();

    if (!id || !name) {
      this.showStatus('Profile ID and Member Name are required.', true);
      return;
    }

    if (!pin) {
      this.showStatus('Please set a Security PIN to protect your Ribbon Rack.', true);
      return;
    }

    try {
      console.log('Starting save process for ID:', id);

      // 1. First, check if the ID already exists
      const existing = await this.profileService.getProfile(id);

      if (existing && existing.pin && existing.pin !== pin) {
        this.showStatus('Incorrect PIN for your ID.', true);
        return;
      }

      // 2. Prepare data - ensuring no undefined values reach Firestore
      const awards = Array.from(this.selectedAwards().values()).map(a => {
        const item: any = {
          ribbonId: a.ribbon.id,
          count: a.count
        };
        if (a.marksmanshipLevel) item.marksmanshipLevel = a.marksmanshipLevel;
        if (a.isFramed !== undefined) item.isFramed = a.isFramed;
        return item;
      });

      const profilePayload: any = {
        profileId: id,
        pin: pin,
        memberName: name,
        detachmentName: this.detachmentName() || '',
        detachmentNumber: this.detachmentNumber() || '',
        detachmentLocation: this.detachmentLocation() || '',
        email: this.email() || '',
        phone: this.phone() || '',
        awards: awards
      };

      console.log('Saving profile payload:', profilePayload);

      // 3. Save to Firebase
      await this.profileService.saveProfile(profilePayload);
      this.showStatus('Ribbon Rack saved successfully!');
    } catch (error: any) {
      console.error('CRITICAL ERROR saving Ribbon Rack:', error);
      const errorMsg = error?.message || 'Check your internet connection or database permissions.';
      this.showStatus(`Error saving Ribbon Rack: ${errorMsg}`, true);
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
