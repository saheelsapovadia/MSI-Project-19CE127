import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  URI: string = 'http://localhost:5000';
  token: any;
  helper: any;
  decodedToken: any;
  username: any;
  constructor(private http: HttpClient) {}

  login(email: any, password: any) {
    console.log(email, password);
    let response = this.http.post(
      this.URI + '/login',
      { email: email, password: password },
      { observe: 'response' }
    );
    return response;
  }
  register(email: any, password: any) {
    let response = this.http.post(
      this.URI + '/register',
      { email: email, password: password },
      { observe: 'response' }
    );
    return response;
  }
  getUsers() {
    let response = this.http.get(this.URI + '/getusers');
    return response;
  }
  addUser(res: any) {
    let data = {
      username: res.username,
      email: res.email,
      password: res.password,
      role: res.role,
    };
    console.log('backend service', data);
    let response = this.http.post(
      this.URI + '/adduser',
      {
        username: res.username,
        email: res.email,
        password: res.password,
        role: res.role,
      },
      { observe: 'response' }
    );
    return response;
  }

  deleteUser(id: any) {
    console.log('backend delete', id);
    return this.http.post(
      this.URI + '/deleteuser',
      { id: id },
      { observe: 'response' }
    );
  }
  updateUser(res: any, id: any) {
    console.log('res', res.users);
    let data = {
      id: id,
      projectname: res.projectName,
      deptcode: res.deptCode,
      users: res.users === 'string' ? res.users.split(',') : res.users,
      product: res.product,
      status: res.status == 1 ? true : false,
      cieareaid: res.cieAreaId,
      financeproductid: res.financeProductId,
    };
    console.log('backend update service', data);
    return this.http.post(
      this.URI + '/updateuser',
      {
        id: id,
        projectname: res.projectName,
        deptcode: res.departmentCode,
        users: res.users.type === 'string' ? res.users.split(',') : res.users,
        product: res.product,
        status: res.status == 1 ? true : false,
        cieareaid: res.cieAreaId,
        financeproductid: res.financeProductId,
      },
      { observe: 'response' }
    );
  }

  getProjects() {
    let response = this.http.get(this.URI + '/dashboard/getprojects');
    return response;
  }
  addProject(res: any) {
    let data = {
      projectname: res.projectName,
      deptcode: res.deptCode,
      users: res.users.type === 'string' ? res.users.split(',') : res.users,
      product: res.product,
      status: res.status == 1 ? true : false,
      cieareaid: res.cieAreaId,
      financeproductid: res.financeProductId,
    };
    console.log('backend service', data);
    let response = this.http.post(
      this.URI + '/dashboard/addproject',
      {
        projectname: res.projectName,
        deptcode: res.departmentCode,
        users: res.users.split(','),
        product: res.product,
        status: res.status == 1 ? true : false,
        cieareaid: res.cieAreaId,
        financeproductid: res.financeProductId,
      },
      { observe: 'response' }
    );
    return response;
  }
  uploadBulkProject(formData: any) {
    this.token = localStorage.getItem('jwtToken');
    this.helper = new JwtHelperService();
    this.decodedToken = this.helper.decodeToken(this.token);
    this.username = this.decodedToken.user.split(' ')[0];
    return this.http.post(this.URI + '/dashboard/uploadbulkproject', formData);
  }
  exportBulkProject() {
    return this.http.get(this.URI + '/dashboard/exportbulkprojects');
  }
  deleteProject(id: any) {
    console.log('backend delete', id);
    return this.http.post(
      this.URI + '/dashboard/deleteproject',
      { id: id },
      { observe: 'response' }
    );
  }
  updateProject(res: any, id: any) {
    console.log('res', res.users);
    let data = {
      id: id,
      projectname: res.projectName,
      deptcode: res.deptCode,
      users: res.users === 'string' ? res.users.split(',') : res.users,
      product: res.product,
      status: res.status == 1 ? true : false,
      cieareaid: res.cieAreaId,
      financeproductid: res.financeProductId,
    };
    console.log('backend update service', data);
    return this.http.post(
      this.URI + '/dashboard/updateproject',
      {
        id: id,
        projectname: res.projectName,
        deptcode: res.departmentCode,
        users: res.users.type === 'string' ? res.users.split(',') : res.users,
        product: res.product,
        status: res.status == 1 ? true : false,
        cieareaid: res.cieAreaId,
        financeproductid: res.financeProductId,
      },
      { observe: 'response' }
    );
  }
}
