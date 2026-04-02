import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ribbon, SelectedAward, StarDevice } from '../../models/ribbon.model';
import { StarCalculatorService } from '../../services/star-calculator.service';

@Component({
  selector: 'app-rack-visualizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rack-visualizer.component.html',
  styleUrl: './rack-visualizer.component.css'
})
export class RackVisualizerComponent {
  private starCalc = inject(StarCalculatorService);

  readonly awards = input.required<SelectedAward[]>();
  readonly showLegend = input<boolean>(true);

  readonly rackAwards = computed(() => {
    return [...this.awards()].sort((a, b) => a.ribbon.id - b.ribbon.id);
  });

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

  getRibbonStyle(ribbon: Ribbon): Record<string, string> {
    return {
      backgroundImage: `url('ribbons/${ribbon.imageUrl}')`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  }

  getStarArray(award: SelectedAward): { type: string; size: string }[] {
    const devices = this.starCalc.calculateStars(award);
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
    const devices = this.starCalc.calculateStars(award);
    if (devices.length === 0) return '';

    return devices.map(d => {
      const sizeStr = d.size === 'large' ? '5/16"' : '3/16"';
      const typeStr = d.type.charAt(0).toUpperCase() + d.type.slice(1);
      return `${d.count}x ${sizeStr} ${typeStr} Star${d.count > 1 ? 's' : ''}`;
    }).join(', ');
  }
}
