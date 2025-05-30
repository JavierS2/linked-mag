// src/app/interceptors/auth.interceptor.ts
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('token');

  // Lista de rutas protegidas donde debe agregarse el token
  const protectedRoutes = [
    `${environment.apiBaseUrl}/prueba`,
  ];

  const isProtected = protectedRoutes.some(url => req.url.startsWith(url));

  if (token && isProtected) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }

  return next(req);
}
