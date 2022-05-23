import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  employeeModelObj:EmployeeModel = new EmployeeModel();
  employeeData !: any;
  getAllData: any;
  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:['']
    });
    this.getEmployees();
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api.postEmployee(this.employeeModelObj).subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getEmployees();
    },
    err=>{
      console.log(err);
      alert('Something went wrong');
    });
  }

  getEmployees(){
    this.api.getEmployees().subscribe((res)=>{
      this.employeeData = res;
    },
    err=>{
      console.log(err);
    })
  }

  DeleteEmployee(i:any){
    this.api.deleteEmployee(i.id).subscribe(res=>{
      alert("record deleted sucessfully")
  this.getAllData(); //quick refresh data
    })
  }
}