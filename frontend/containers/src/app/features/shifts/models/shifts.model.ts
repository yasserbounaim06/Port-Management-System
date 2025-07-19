export interface Shift {
  id?: number;
  horaire_debut: string; // Format: "HH:MM"
  horaire_fin: string;   // Format: "HH:MM"
  nom?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ShiftCreateRequest {
  horaire_debut: string;
  horaire_fin: string;
  nom?: string;
}

export interface ShiftUpdateRequest {
  horaire_debut?: string;
  horaire_fin?: string;
  nom?: string;
}
