import { Component, OnInit } from '@angular/core';
import { Engin } from '../../models/engins.model';
import { EnginsService } from '../../services/engins.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-engins-list',
  templateUrl: './engins-list.html',
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [EnginsService], 
  styleUrls: ['./engins-list.css'] 
})
export class EnginsList implements OnInit {

  engins: Engin[] = [];

  constructor(private enginsService: EnginsService, private router: Router) { }

  ngOnInit(): void {
    this.getEngins();
  }

  getEngins(): void {
    this.enginsService.getEngins().subscribe((data: Engin[]) => {
      this.engins = data;
    });
  }

  deleteEngin(matricule: any) {
    this.enginsService.deleteEngin(matricule).subscribe(() => {
      this.getEngins();
    });
  }
  
  editEngin(matricule: any) {
    this.router.navigate(['/engins/edit-engin', matricule]);
  }
}
