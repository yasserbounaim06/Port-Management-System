export interface Engin {
  matricule_engin: string;
  nom: string;
  type_engin?: string;
  statut?: 'disponible' | 'en_service' | 'maintenance' | 'hors_service';
  created_at?: string;
  updated_at?: string;
}

export interface EnginCreateRequest {
  matricule_engin: string;
  nom: string;
  type_engin?: string;
  statut?: 'disponible' | 'en_service' | 'maintenance' | 'hors_service';
}

export interface EnginUpdateRequest {
  nom?: string;
  type_engin?: string;
  statut?: 'disponible' | 'en_service' | 'maintenance' | 'hors_service';
}
