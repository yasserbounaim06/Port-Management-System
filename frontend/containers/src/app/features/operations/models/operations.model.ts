export interface Operation {
  id?: number;
  nom: string;
  type_operation?: 'chargement' | 'dechargement' | 'transbordement';
  statut?: 'planifiee' | 'en_cours' | 'terminee' | 'annulee';
  date_debut?: string; // ISO date string
  date_fin?: string;   // ISO date string
  id_navire?: number;
  containers?: number[]; // Array of container IDs
  engins?: number[]; // Array of engin matricules
  shifts?: number[]; // Array of shift IDs
  personnels?: number[]; // Array of personnel IDs
  created_at?: string;
  updated_at?: string;
}

export interface OperationCreateRequest {
  nom: string;
  type_operation?: 'chargement' | 'dechargement' | 'transbordement';
  statut?: 'planifiee' | 'en_cours' | 'terminee' | 'annulee';
  date_debut?: string;
  date_fin?: string;
  id_navire?: number;
  containers?: number[];
  engins?: number[];
  shifts?: number[];
  personnels?: number[];
}

export interface OperationUpdateRequest {
  nom?: string;
  type_operation?: 'chargement' | 'dechargement' | 'transbordement';
  statut?: 'planifiee' | 'en_cours' | 'terminee' | 'annulee';
  date_debut?: string;
  date_fin?: string;
  id_navire?: number;
  containers?: number[];
  engins?: number[];
  shifts?: number[];
  personnels?: number[];
}