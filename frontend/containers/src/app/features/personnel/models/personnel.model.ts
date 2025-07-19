export interface Personnel {
  id?: number;
  nom: string;
  prenom: string;
  poste: string;
  id_shift?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PersonnelCreateRequest {
  nom: string;
  prenom: string;
  poste: string;
  id_shift?: number;
}

export interface PersonnelUpdateRequest {
  nom?: string;
  prenom?: string;
  poste?: string;
  id_shift?: number;
}
