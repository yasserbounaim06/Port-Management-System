import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService, User } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Port Manager';
  user: User | null = null;
  allowedSections: string[] = [];

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getCurrentUserValue();
    this.allowedSections = this.authService.getAccessibleSections();
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      this.allowedSections = this.authService.getAccessibleSections();
    });
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  hasSection(section: string): boolean {
    return this.allowedSections.includes(section);
  }
}
