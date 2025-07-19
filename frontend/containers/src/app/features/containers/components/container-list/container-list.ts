import { Component, OnInit } from '@angular/core';
import { Container } from '../../models/user.model';
import { ContainerService } from '../../services/container.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.html',
  imports: [CommonModule, HttpClientModule, RouterModule], // added imports array
  providers: [ContainerService], 
  styleUrls: ['./container-list.css'] 
})
export class ContainerList implements OnInit {

  containers: Container[] = [];

  constructor(private ContainerService: ContainerService, private router: Router) { }

  ngOnInit(): void {
    this.getContainers();
  }

  getContainers(): void { // changed return type to void
    this.ContainerService.getContainers().subscribe((data: Container[]) => {
      this.containers = data;
      // console.log(this.users);
    });
  }

  deleteContainer(id: any) {
    this.ContainerService.deleteContainers(id).subscribe(() => {
      this.getContainers();
    });
  }
  
  editContainer(id: any) {
    this.router.navigate(['/edit-container', id]);
  }

}
