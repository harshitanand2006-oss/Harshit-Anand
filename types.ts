export enum ViewState {
  HOME = 'HOME',
  DONATE = 'DONATE',
  TRACK = 'TRACK',
  DASHBOARD = 'DASHBOARD',
  NGOS = 'NGOS'
}

export enum DonationType {
  CLOTHES = 'Clothes',
  STATIONERY = 'Stationery',
  BOOKS = 'Books',
  TOYS = 'Toys',
  OTHER = 'Other'
}

export interface ProblemSolution {
  id: number;
  problem: string;
  solution: string;
  iconName: string;
}

export interface NgoProfile {
  id: string;
  name: string;
  verified: boolean;
  rating: number;
  focus: DonationType[];
  location: string;
  description: string;
}

export interface DonationRecord {
  id: string;
  type: DonationType;
  status: 'Pending Pickup' | 'Picked Up' | 'In Transit' | 'Delivered' | 'Distributed';
  date: string;
  impactStory?: string;
}
