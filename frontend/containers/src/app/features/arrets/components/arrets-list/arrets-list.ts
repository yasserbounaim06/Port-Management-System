import { Component, OnInit } from '@angular/core';
import { Arret } from '../../models/arrets.model';
import { ArretsService } from '../../services/arrets.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-arrets-list',
  templateUrl: './arrets-list.html',
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [ArretsService], 
  styleUrls: ['./arrets-list.css'] 
})
export class ArretsList implements OnInit {

  arrets: Arret[] = [];

  constructor(private arretsService: ArretsService, private router: Router) { }

  ngOnInit(): void {
    this.getArrets();
  }

  getArrets(): void {
    this.arretsService.getArrets().subscribe((data: Arret[]) => {
      this.arrets = data;
    });
  }

  deleteArret(id: any) {
    this.arretsService.deleteArret(id).subscribe(() => {
      this.getArrets();
    });
  }
  
  editArret(id: any) {
    this.router.navigate(['/arrets/edit-arret', id]);
  }
}
