import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) {
  }

  base = '../api/todos/';

  login(email, password) {
    return this.http.post<any>(this.base + 'auth/login', {email, password});
  }

  guest() {
    return this.http.post<any>(this.base + 'auth/guest', {});
  }


  register(email, password, name) {
    return this.http.post<any>(this.base + 'auth/register', {email, password, name});
  }

  isLogin() {
    return this.http.get<any>(this.base + 'auth/isLogin');
  }

  logout() {
    localStorage.token = '';
    return of(true);
  }

  getLatestNumber(id) {
    return this.http.post<any>(this.base + 'auth/getLatestNumber', {id});
  }

  getNewNumber(caseNumber, orgNumber, url) {
    return this.http.post<any>(this.base + 'auth/getNewNumber', {case: caseNumber, org: orgNumber, url});
  }

  cancelNumber(numberId) {
    return this.http.post<any>(this.base + 'auth/cancelNumber', {id: numberId});
  }

  delayNumber(numberId) {
    return this.http.post<any>(this.base + 'auth/delayNumber', {id: numberId});
  }

  getOrgs() {
    return this.http.get<any>(this.base + 'auth/getOrgs');
  }

  addOrg(orgName) {
    return this.http.post<any>(this.base + 'auth/addOrg', {name: orgName});
  }

  deleteOrgByNum(orgID) {
    return this.http.post<any>(this.base + 'auth/deleteOrgByNum', {org: orgID});
  }

  deleteOrgByName(orgName) {
    return this.http.post<any>(this.base + 'auth/deleteOrgByName', {name: orgName});
  }

  getCases(orgID) {
    return this.http.post<any>(this.base + 'auth/getCases', {org: orgID});
  }

  addCase(orgID, caseName, caseID) {
    return this.http.post<any>(this.base + 'auth/addCase', {org: orgID, name: caseName, case: caseID});
  }

  deleteCaseByNum(orgID, caseID) {
    return this.http.post<any>(this.base + 'auth/deleteCaseByNum', {org: orgID, case: caseID});
  }

  deleteCaseByName(orgID, caseName) {
    return this.http.post<any>(this.base + 'auth/deleteCaseByName', {org: orgID, name: caseName});
  }

  getUsers() {
    return this.http.get<any>(this.base + 'auth/getUsers');
  }

  setUser(id, role, org) {
    return this.http.post<any>(this.base + 'auth/setUser', {id, role, org});
  }

  getNextNumber(org, cases, whereToGo) {
    return this.http.post<any>(this.base + 'auth/getNextNumber', {org, cases, whereToGo});
  }
}
