export interface Ribbon {
  id: number;
  name: string;
  shortName: string;
  category: 'mcl' | 'modd' | 'convention';
  imageUrl: string;
  cssGradient?: string;
  starType: 'gold_5_16' | 'bronze_3_16';
  orientation?: 'blue_inboard' | 'red_inboard';
  specialDevice?: 'fmf' | 'bronze_a';
  isMarksmanship?: boolean;
  singleIssue?: boolean;
  hasFrame?: boolean;
}

export interface SelectedAward {
  ribbon: Ribbon;
  count: number;
  marksmanshipLevel?: 'marksman' | 'sharpshooter' | 'expert' | 'master' | 'high_master';
  isFramed?: boolean;
}

export interface StarDevice {
  type: 'gold' | 'silver' | 'bronze';
  size: 'large' | 'small';  // large = 5/16", small = 3/16"
  count: number;
}
