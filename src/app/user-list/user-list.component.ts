import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {PannesService} from "../services/pannes/pannes.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnChanges {
  @Input() groupFilters: Object;
  @Input() searchByKeyword: string;
  users: any[] = [];
  filteredUsers: any[] = [];
  constructor(private panneService: PannesService,
              private ref: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.loadUsers();
  }
  ngOnChanges(): void {
    if (this.groupFilters) this.filterUserList(this.groupFilters, this.users);
  }
  filterUserList(filters: any, users: any): void {
    this.filteredUsers = this.users;
    const keys = Object.keys(filters);
    const filterUser = user => {
      let result = keys.map(key => {
        if (!~key.indexOf('date')) {
          if(user[key]) {
            return String(user[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())
          } else {
            return false;
          }
        }
      });
      result = result.filter(it => it !== undefined);
      if (filters['ageto'] && filters['agefrom']) {
        if (user['date']) {
          if (+user['date'] >= +filters['agefrom'] && +user['date'] <= +filters['ageto']) {
            result.push(true);
          } else {
            result.push(false);
          }
        } else {
          result.push(false);
        }
      }
      return result.reduce((acc, cur: any) => { return acc & cur }, 1)
    }
    this.filteredUsers = this.users.filter(filterUser);
  }
  loadUsers(): void {
    this.panneService.getAllPannes()
        .subscribe(users => this.users = users);
    this.filteredUsers = this.filteredUsers.length > 0 ? this.filteredUsers : this.users;
  }
}
