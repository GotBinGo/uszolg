import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { _ } from 'underscore';
import { TextInputModalComponent } from '../text-input-modal/text-input-modal.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RoleModalComponent } from '../role-modal/role-modal.component';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private servicesService: ServicesService, public dialog: MatDialog, private matSnackBar: MatSnackBar) { }

  orgs = [];
  cases = [];
  users = [];
  objectKeys = Object.keys;

  selectedOrgIndex = null;

  ngOnInit() {
    this.servicesService.getOrgs().subscribe(a => {
      this.orgs = a;
    });
    this.servicesService.getUsers().subscribe(a => {
      this.users = a;
    });
  }

  tabChange() {
    this.servicesService.getOrgs().subscribe(a => {
      this.orgs = a;
    });
    this.servicesService.getUsers().subscribe(a => {
      this.users = a;
    });
  }

  add() {
    const dialogRef = this.dialog.open(TextInputModalComponent, {
      width: '80%',
      maxWidth: '500px',
      data: {title: 'New organization', text: 'What should be the name of the new organization?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.servicesService.addOrg(result).subscribe(x => {
          if (x.err) {
            this.matSnackBar.open('Duplicate organization name.', '', { duration: 2000 });
          } else {
            this.servicesService.getOrgs().subscribe(a => {
              this.orgs = a;
            });
          }
        });
      } else if (result === null || result === undefined) {

      } else {
        this.matSnackBar.open('Invalid organization name.', '', { duration: 2000 });
      }
    });
  }

  addCase() {
    const dialogRef = this.dialog.open(TextInputModalComponent, {
      width: '80%',
      maxWidth: '500px',
      data: {title: 'New case', text: 'What should be the name of the new case?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.servicesService.addCase(this.orgs[this.selectedOrgIndex].org, result, 3).subscribe(x => {
          if (x.err) {
            this.matSnackBar.open('Duplicate organization name.', '', { duration: 2000 });
          } else {
            this.servicesService.getCases(this.orgs[this.selectedOrgIndex].org).subscribe(a => {
              this.cases = a;
            });
          }
        });
      } else if (result === null || result === undefined) {

      } else {
        this.matSnackBar.open('Invalid organization name.', '', { duration: 2000 });
      }
    });
  }

  onOrgSelect(i) {
    this.selectedOrgIndex = i;
    this.servicesService.getCases(this.orgs[i].org).subscribe(x => {
      this.cases = x;
    });
  }

  back() {
    this.selectedOrgIndex = null;
    this.cases = [];
  }

  onUserSelect(i) {
    const dialogRef = this.dialog.open(RoleModalComponent, {
      width: '80%',
      maxWidth: '500px',
      data: {
        title: 'Edit user role',
        text: 'What should be the role of ' + this.users[i].name + '?',
        user: this.users[i],
        role: this.users[i].role,
        orgs: this.orgs}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.servicesService.getUsers().subscribe(a => {
          this.users = a;
        });
      } else {
      }
    });
  }

}
