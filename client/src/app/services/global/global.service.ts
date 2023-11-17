import { Injectable } from '@angular/core';
import { type HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private readonly _http: HttpClient) {}

  async loadHomeText(): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this._http
        .get<{ homeText: string }>('http://localhost:8080', { headers })
        .subscribe(
          (data) => {
            resolve(data.homeText);
          },
          (error) => {
            console.log(error);
            reject(error);
          },
        );
    });
  }
}
