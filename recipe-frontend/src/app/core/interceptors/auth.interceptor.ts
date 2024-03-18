import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone the request and set 'withCredentials' to true to include cookies in the request.
  const cloneRequest = req.clone({
    withCredentials: true
  });

  // Pass the cloned request to the next interceptor and handle any errors that occur.
  return next(cloneRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // If the error status is 401 (Unauthorized), log the error.
      if (error.status === 401) {
        console.log(error);
      }
      // Continue propagating the error.
      return throwError(error);
    })
  );
};
