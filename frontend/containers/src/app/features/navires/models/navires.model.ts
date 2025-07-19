export interface Navire {
  matricule_navire: string;
  nom: string;
  capacity?: number;
  created_at?: string;
  updated_at?: string;
}

export interface NavireCreateRequest {
  matricule_navire: number;
  nom: string;
  capacity?: number;
}

export interface NavireUpdateRequest {
  nom?: string;
  capacity?: number;
}
