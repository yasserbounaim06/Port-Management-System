export interface Container {
  id?: number;
  container_number: string;
  iso_code?: string;
  other_info?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContainerCreateRequest {
  container_number: string;
  iso_code?: string;
  other_info?: string;
}

export interface ContainerUpdateRequest {
  container_number?: string;
  iso_code?: string;
  other_info?: string;
}
