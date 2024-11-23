import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user:any;
  token:any;
  constructor(
    private router: Router,
    public http: HttpClient,
  ) {
    this.getLocalStorage();
  }

  getLocalStorage() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
  
    console.log("Token:", token);
    console.log("User:", user);
  
    if (token) {
      try {
        this.user = (user && user !== 'undefined') ? JSON.parse(user) : null;
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        this.user = null; // Asigna null en caso de error
      }
      this.token = token;
    } else {
      this.user = null;
      this.token = null;
    }
  }
  

  login(email: string, password: string) {
    let URL = URL_SERVICIOS + "/auth/login";
    return this.http.post(URL, { email: email, password: password }).pipe(
      map((auth: any) => {
        console.log('API Response:', auth); // Verifica qué datos estás recibiendo
        const result = this.saveLocalStorage(auth);
        return result;
      }),
      catchError((error: any) => {
        console.log('API Error:', error);
        return of(undefined);
      })
    );
  }
  

  saveLocalStorage(auth: any) {
    if (auth && auth.access_token) {
      console.log('Saving to localStorage:', {
        token: auth.access_token,
        user: auth.user
      });
      localStorage.setItem("token", auth.access_token);
      localStorage.setItem("user", JSON.stringify(auth.user));
      localStorage.setItem('authenticated', 'true');
      return true;
    }
    return false;
  }
  

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem('authenticated');
    this.router.navigate([routes.login]);
  }
}
