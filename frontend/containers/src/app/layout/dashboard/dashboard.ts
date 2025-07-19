import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContainerService } from '../../features/containers/services/container.service';
import { PersonnelService } from '../../features/personnel/services/personnel.service';
import { NaviresService } from '../../features/navires/services/navires.service';
import { OperationsService } from '../../features/operations/services/operations.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  statCards = [
    { key: 'containers', title: 'Containers', subtitle: 'Total Active', icon: 'fas fa-box', bg: 'bg-primary', count: '-' },
    { key: 'personnel', title: 'Personnel', subtitle: 'On Duty', icon: 'fas fa-user-friends', bg: 'bg-success', count: '-' },
    { key: 'navires', title: 'Navires', subtitle: 'In Port', icon: 'fas fa-ship', bg: 'bg-info', count: '-' },
    { key: 'operations', title: 'Operations', subtitle: 'Today', icon: 'fas fa-tasks', bg: 'bg-warning', count: '-' }
  ];

  navTiles = [
    { key: 'containers', label: 'Containers', route: '/containers', icon: 'fas fa-box', border: 'primary', description: 'Manage container inventory' },
    { key: 'personnel', label: 'Personnel', route: '/personnel', icon: 'fas fa-user-friends', border: 'success', description: 'Staff management system' },
    { key: 'navires', label: 'Navires', route: '/navires', icon: 'fas fa-ship', border: 'info', description: 'Ship fleet management' },
    { key: 'engins', label: 'Engins', route: '/engins', icon: 'fas fa-cogs', border: 'secondary', description: 'Equipment tracking' },
    { key: 'operations', label: 'Operations', route: '/operations', icon: 'fas fa-tasks', border: 'warning', description: 'Active port operations' },
    { key: 'arrets', label: 'Arrêts', route: '/arrets', icon: 'fas fa-pause-circle', border: 'danger', description: 'Downtime management' },
    { key: 'missions', label: 'Missions', route: '/missions', icon: 'fas fa-clipboard-list', border: 'dark', description: 'Task assignments' },
    { key: 'occupations', label: 'Occupations', route: '/occupations', icon: 'fas fa-calendar-check', border: 'primary', description: 'Resource scheduling' }
  ];

  filteredStatCards: typeof this.statCards = [];
  filteredNavTiles: typeof this.navTiles = [];

  constructor(
    private containerService: ContainerService,
    private personnelService: PersonnelService,
    private naviresService: NaviresService,
    private operationsService: OperationsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.containerService.getContainers().subscribe(containers => {
      this.statCards[0].count = containers.length.toLocaleString();
    });
    this.personnelService.getPersonnel().subscribe(personnel => {
      this.statCards[1].count = personnel.length.toLocaleString();
    });
    this.naviresService.getNavires().subscribe(navires => {
      this.statCards[2].count = navires.length.toLocaleString();
    });
    this.operationsService.getOperations().subscribe(operations => {
      this.statCards[3].count = operations.length.toLocaleString();
    });

    const allowedSections = this.authService.getAccessibleSections();
    this.filteredStatCards = this.statCards.filter(card => allowedSections.includes(card.key));
    this.filteredNavTiles = this.navTiles.filter(tile => allowedSections.includes(tile.key));
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString();
  }
}
