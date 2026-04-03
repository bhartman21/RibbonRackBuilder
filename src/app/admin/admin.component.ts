import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { RibbonDataService } from '../services/ribbon-data.service';
import { UserRackProfile, SelectedAward } from '../models/ribbon.model';
import { HeaderComponent } from '../components/header/header.component';
import { RackVisualizerComponent } from '../components/rack-visualizer/rack-visualizer.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, RackVisualizerComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  private profileService = inject(ProfileService);
  private ribbonData = inject(RibbonDataService);

  readonly profiles = signal<UserRackProfile[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string>('');

  // Filtering & Sorting State
  readonly searchTerm = signal<string>('');
  readonly sortField = signal<string>('profileId');
  readonly sortOrder = signal<'asc' | 'desc'>('asc');

  // Computed signal for the filtered and sorted list
  readonly filteredProfiles = computed(() => {
    let result = [...this.profiles()];

    // 1. Filtering
    const term = this.searchTerm().toLowerCase().trim();
    if (term) {
      result = result.filter(p => 
        p.profileId?.toLowerCase().includes(term) ||
        p.memberName?.toLowerCase().includes(term) ||
        p.detachmentName?.toLowerCase().includes(term) ||
        p.detachmentNumber?.toLowerCase().includes(term) ||
        p.detachmentLocation?.toLowerCase().includes(term) ||
        p.email?.toLowerCase().includes(term) ||
        p.phone?.toLowerCase().includes(term)
      );
    }

    // 2. Sorting
    const field = this.sortField();
    const order = this.sortOrder();

    result.sort((a: any, b: any) => {
      let valA = a[field] ?? '';
      let valB = b[field] ?? '';

      // Handle numeric fields if necessary (profileId is string but looks numeric)
      if (field === 'profileId') {
        const numA = parseInt(valA, 10);
        const numB = parseInt(valB, 10);
        if (!isNaN(numA) && !isNaN(numB)) {
          valA = numA;
          valB = numB;
        }
      } else {
        valA = valA.toString().toLowerCase();
        valB = valB.toString().toLowerCase();
      }

      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  });

  // Editing state
  readonly editingProfile = signal<UserRackProfile | null>(null);

  // View state
  readonly viewingProfile = signal<UserRackProfile | null>(null);
  readonly viewingAwards = computed(() => {
    const profile = this.viewingProfile();
    if (!profile) return [];
    
    const awards: SelectedAward[] = [];
    for (const a of profile.awards) {
      const ribbon = this.ribbonData.ribbons.find(r => r.id === a.ribbonId);
      if (ribbon) {
        awards.push({
          ribbon,
          count: a.count,
          marksmanshipLevel: a.marksmanshipLevel,
          isFramed: a.isFramed
        });
      }
    }
    return awards;
  });

  async ngOnInit() {
    await this.loadProfiles();
  }

  async loadProfiles() {
    this.loading.set(true);
    try {
      const data = await this.profileService.getAllProfiles();
      this.profiles.set(data);
    } catch (e: any) {
      this.error.set('Failed to load profiles: ' + e.message);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteProfile(profileId: string) {
    if (confirm(`Are you sure you want to delete profile ${profileId}?`)) {
      try {
        await this.profileService.deleteProfile(profileId);
        await this.loadProfiles();
      } catch (e: any) {
        alert('Failed to delete: ' + e.message);
      }
    }
  }

  editProfile(profile: UserRackProfile) {
    this.editingProfile.set({ ...profile });
  }

  cancelEdit() {
    this.editingProfile.set(null);
  }

  async saveEdit() {
    const profile = this.editingProfile();
    if (!profile) return;

    try {
      await this.profileService.updateProfilePersonalDetails(profile.profileId, {
        memberName: profile.memberName,
        detachmentName: profile.detachmentName,
        detachmentNumber: profile.detachmentNumber,
        detachmentLocation: profile.detachmentLocation,
        email: profile.email,
        phone: profile.phone,
        pin: profile.pin
      });
      this.editingProfile.set(null);
      await this.loadProfiles();
    } catch (e: any) {
      alert('Failed to save changes: ' + e.message);
    }
  }

  updateField(event: Event, field: keyof UserRackProfile) {
    const el = event.target as HTMLInputElement;
    const profile = this.editingProfile();
    if (profile) {
      this.editingProfile.set({ ...profile, [field]: el.value });
    }
  }

  onSearchInput(event: Event) {
    const el = event.target as HTMLInputElement;
    this.searchTerm.set(el.value);
  }

  toggleSort(field: string) {
    if (this.sortField() === field) {
      this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortOrder.set('asc');
    }
  }

  viewRack(profile: UserRackProfile) {
    this.viewingProfile.set(profile);
  }

  closeView() {
    this.viewingProfile.set(null);
  }

  // PIN visibility state Tracker
  readonly visiblePins = signal<Set<string>>(new Set());

  togglePinVisibility(profileId: string) {
    this.visiblePins.update(currentSet => {
      const newSet = new Set(currentSet);
      if (newSet.has(profileId)) {
        newSet.delete(profileId);
      } else {
        newSet.add(profileId);
      }
      return newSet;
    });
  }
}
