import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  postEmployee(data:any){
    return this._http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }));
  }

  getEmployees(){
    return this._http.get('http://localhost:3000/posts');
  }



  deleteEmployee(id:number){
    return this._http.delete<any>("http://localhost:3000/posts"+id).pipe(map((res:any)=>{
      return res;
    }
    )) 
    }
    //update restaurent data usimg put method
updateRestaurent(data:any ,id:number){
  return this._http.put<any>("http://localhost:3000/posts"+id,data).pipe(map((res:any)=>{
    return res;
  }
  )) 
  }
  
  }

