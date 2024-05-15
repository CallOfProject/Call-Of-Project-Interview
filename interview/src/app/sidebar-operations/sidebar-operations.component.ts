import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-sidebar-operations',
    templateUrl: './sidebar-operations.component.html',
    styleUrls: ['./sidebar-operations.component.css']
})
export class SidebarOperationsComponent {
    visibleSideBar: boolean = false;
    username: string = ""

    constructor(private router: Router) {
        this.username = localStorage.getItem("username")
    }

    handleMyPreparedInterviewsBtn() {
        this.router.navigate(['/my-interviews'])
    }

    handleCreateInterviewBtn() {
        this.router.navigate(['/main-menu'])
    }

    logout() {
        localStorage.clear()
        sessionStorage.clear()
        this.router.navigate(['/login'])
    }
}
