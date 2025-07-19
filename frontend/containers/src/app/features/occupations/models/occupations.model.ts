export interface Occupation {
  id?: number;
  matricule_engin: number;
  id_operation: number;
  heure_debut?: string; // ISO date string
  heure_fin?: string;   // ISO date string
  created_at?: string;
}

export interface OccupationCreateRequest {
  matricule_engin: number;
  id_operation: number;
  heure_debut?: string;
  heure_fin?: string;
}

export interface OccupationUpdateRequest {
  matricule_engin?: number;
  id_operation?: number;
  heure_debut?: string;
  heure_fin?: string;
}
