import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar-operations',
  templateUrl: './sidebar-operations.component.html',
  styleUrls: ['./sidebar-operations.component.css']
})
export class SidebarOperationsComponent {
  visibleSideBar: boolean = false;

  constructor(private router: Router) {
  }

  handleMyPreparedInterviewsBtn() {
    this.router.navigate(['/my-interviews'])
  }

  handleCreateInterviewBtn() {
    this.router.navigate(['/main-menu'])
  }
}
