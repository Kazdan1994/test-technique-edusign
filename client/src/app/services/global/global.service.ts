import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private _http: HttpClient) { }

  loadHomeText() {
    return new Promise<string>((resolve, reject) => {

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this._http.get(`http://localhost:8080`, { headers: headers })
        .subscribe((data: any) => {
          resolve(data.homeText);
        }, error => {
          console.log(error);
          reject(error);
        });
    });
  }


}
