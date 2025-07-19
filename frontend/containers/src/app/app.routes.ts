import { provideRouter, Routes } from '@angular/router';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { App } from './app';

// Container Components
import { ContainerList } from './features/containers/components/container-list/container-list';
import { ContainerCreate } from './features/containers/components/container-create/container-create';
import { ContainerUpdate } from './features/containers/components/container-update/container-update';

// Personnel Components
import { PersonnelList } from './features/personnel/components/personnel-list/personnel-list';
import { PersonnelCreate } from './features/personnel/components/personnel-create/personnel-create';
import { PersonnelUpdate } from './features/personnel/components/personnel-update/personnel-update';

// Shifts Components
import { ShiftsList } from './features/shifts/components/shifts-list/shifts-list';
import { ShiftsCreate } from './features/shifts/components/shifts-create/shifts-create';
import { ShiftsUpdate } from './features/shifts/components/shifts-update/shifts-update';

// Navires Components
import { NaviresList } from './features/navires/components/navires-list/navires-list';
import { NaviresCreate } from './features/navires/components/navires-create/navires-create';
import { NaviresUpdate } from './features/navires/components/navires-update/navires-update';

// Engins Components
import { EnginsList } from './features/engins/components/engins-list/engins-list';
import { EnginsCreate } from './features/engins/components/engins-create/engins-create';
import { EnginsUpdate } from './features/engins/components/engins-update/engins-update';

// Arrets Components
import { ArretsList } from './features/arrets/components/arrets-list/arrets-list';
import { ArretsCreate } from './features/arrets/components/arrets-create/arrets-create';
import { ArretsUpdate } from './features/arrets/components/arrets-update/arrets-update';

// Operations Components
import { OperationsList } from './features/operations/components/operations-list/operations-list';
import { OperationsCreate } from './features/operations/components/operations-create/operations-create';
import { OperationsUpdate } from './features/operations/components/operations-update/operations-update';

// Missions Components
import { MissionsList } from './features/missions/components/missions-list/missions-list';
import { MissionsCreate } from './features/missions/components/missions-create/missions-create';
import { MissionsUpdate } from './features/missions/components/missions-update/missions-update';

// Occupations Components
import { OccupationsList } from './features/occupations/components/occupations-list/occupations-list';
import { OccupationsCreate } from './features/occupations/components/occupations-create/occupations-create';
import { OccupationsUpdate } from './features/occupations/components/occupations-update/occupations-update';

// Dashboard Component - Create a simple dashboard for now

import { DashboardComponent } from './layout/dashboard/dashboard';
// Import LoginComponent
import { LoginComponent } from './features/auth/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  // Default route - redirect to login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Login route
  { path: 'login', component: LoginComponent },

  // Dashboard route (protected)
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // Container routes (protected)
  { path: 'containers', component: ContainerList, canActivate: [AuthGuard] },
  { path: 'containers/create', component: ContainerCreate, canActivate: [AuthGuard] },
  { path: 'containers/edit-container/:id', component: ContainerUpdate, canActivate: [AuthGuard] },

  // Personnel routes (protected)
  { path: 'personnel', component: PersonnelList, canActivate: [AuthGuard] },
  { path: 'personnel/create', component: PersonnelCreate, canActivate: [AuthGuard] },
  { path: 'personnel/edit-personnel/:id', component: PersonnelUpdate, canActivate: [AuthGuard] },

  // Shifts routes (protected)
  { path: 'shifts', component: ShiftsList, canActivate: [AuthGuard] },
  { path: 'shifts/create', component: ShiftsCreate, canActivate: [AuthGuard] },
  { path: 'shifts/edit-shift/:id', component: ShiftsUpdate, canActivate: [AuthGuard] },

  // Navires routes (protected)
  { path: 'navires', component: NaviresList, canActivate: [AuthGuard] },
  { path: 'navires/create', component: NaviresCreate, canActivate: [AuthGuard] },
  { path: 'navires/edit-navire/:matricule', component: NaviresUpdate, canActivate: [AuthGuard] },

  // Engins routes (protected)
  { path: 'engins', component: EnginsList, canActivate: [AuthGuard] },
  { path: 'engins/create', component: EnginsCreate, canActivate: [AuthGuard] },
  { path: 'engins/edit-engin/:matricule', component: EnginsUpdate, canActivate: [AuthGuard] },

  // Arrets routes (protected)
  { path: 'arrets', component: ArretsList, canActivate: [AuthGuard] },
  { path: 'arrets/create', component: ArretsCreate, canActivate: [AuthGuard] },
  { path: 'arrets/edit-arret/:id', component: ArretsUpdate, canActivate: [AuthGuard] },

  // Operations routes (protected)
  { path: 'operations', component: OperationsList, canActivate: [AuthGuard] },
  { path: 'operations/create', component: OperationsCreate, canActivate: [AuthGuard] },
  { path: 'operations/edit-operation/:id', component: OperationsUpdate, canActivate: [AuthGuard] },

  // Missions routes (protected)
  { path: 'missions', component: MissionsList, canActivate: [AuthGuard] },
  { path: 'missions/create', component: MissionsCreate, canActivate: [AuthGuard] },
  { path: 'missions/edit-mission/:id', component: MissionsUpdate, canActivate: [AuthGuard] },

  // Occupations routes (protected)
  { path: 'occupations', component: OccupationsList, canActivate: [AuthGuard] },
  { path: 'occupations/create', component: OccupationsCreate, canActivate: [AuthGuard] },
  { path: 'occupations/edit-occupation/:id', component: OccupationsUpdate, canActivate: [AuthGuard] },

  // Wildcard route - redirect to login
  { path: '**', redirectTo: '/login' }
];

export const AppRoutes = provideRouter(routes);
