export interface Allocations{
    recruitment: number;
    brotherhood: number;
    pnm_process: number;
    projects: number;
    special_events: number;
}

export interface Budget {
  id: number;
  allocations: Allocations
}