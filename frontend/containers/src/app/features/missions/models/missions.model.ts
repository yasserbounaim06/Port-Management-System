export interface Mission {
  id?: number;
  id_personnel: number;
  id_operation: number;
  role?: string;
  created_at?: string;
}

export interface MissionCreateRequest {
  id_personnel: number;
  id_operation: number;
  role?: string;
}

export interface MissionUpdateRequest {
  id_personnel?: number;
  id_operation?: number;
  role?: string;
}
