import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cloneRequest = req.clone({
    withCredentials: true
  });

  return next(cloneRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      debugger;
      if (error.status === 401) {
        console.log(error)
      }
      return throwError(error)
    })
  );
};
