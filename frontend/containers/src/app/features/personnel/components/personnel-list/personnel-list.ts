import { Component, OnInit } from '@angular/core';
import { Personnel } from '../../models/personnel.model';
import { PersonnelService } from '../../services/personnel.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-personnel-list',
  templateUrl: './personnel-list.html',
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [PersonnelService], 
  styleUrls: ['./personnel-list.css'] 
})
export class PersonnelList implements OnInit {

  personnel: Personnel[] = [];

  constructor(private personnelService: PersonnelService, private router: Router) { }

  ngOnInit(): void {
    this.getPersonnel();
  }

  getPersonnel(): void {
    this.personnelService.getPersonnel().subscribe((data: Personnel[]) => {
      this.personnel = data;
    });
  }

  deletePersonnel(id: any) {
    this.personnelService.deletePersonnel(id).subscribe(() => {
      this.getPersonnel();
    });
  }
  
  editPersonnel(id: any) {
    this.router.navigate(['/personnel/edit-personnel', id]);
  }
}
