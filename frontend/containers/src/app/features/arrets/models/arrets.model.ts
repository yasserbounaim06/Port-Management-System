export interface Arret {
  id?: number;
  description: string;
  duree?: number; // Duration in minutes
  type_arret?: 'technique' | 'operationnel' | 'urgence';
  created_at?: string;
  updated_at?: string;
}

export interface ArretCreateRequest {
  description: string;
  duree?: number;
  type_arret?: 'technique' | 'operationnel' | 'urgence';
}

export interface ArretUpdateRequest {
  description?: string;
  duree?: number;
  type_arret?: 'technique' | 'operationnel' | 'urgence';
}
