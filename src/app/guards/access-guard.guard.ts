import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';
import { JwtService } from '../services/JWT/jwt.service';
import { inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';

export const AccessGuard: CanActivateFn = (route, state): Observable<boolean> => {

  const authService: AuthService = inject(AuthService);
  const jwtService: JwtService = inject(JwtService);

  const jwt_token: string | null = localStorage.getItem('jwt_access_token');

  // 1. If token is missing, immediately return an Observable that resolves to false.
  if (!jwt_token) {
    console.log("Token missing, access denied.");
    return of(false); // 'of' creates an Observable that immediately emits false
  }

  // 2. If token exists, proceed with the API call and use .pipe() and .map()
  const userId = jwtService.getClaim(jwt_token, 'nameid');

  // Return the Observable chain
  return authService.VerifyUserAdmin(userId).pipe(
    map((response: any) => {
      console.log(response)
      // 3. Map the API response structure to the required boolean
      if (response && (response.data.userRoleName === "Admin" || response.data.userRoleName === "SuperAdmin")) {
        console.log("Access granted (Verified Admin/Role)");
        return true;
      }
      console.log("Access denied (Invalid Role)");
      return false;
    })
    // 4. Handle API errors (e.g., server down or 401 response)
    // catchError is also useful here, but the 'map' handles the error structure
    // If VerifyUserAdmin throws an error, the Observable completes with an error.
    // You should typically handle this with catchError or a switchMap/catch mechanism
    // but the simplest fix is to let map handle the success path.
    // To handle true errors (401, 500, etc.), use catchError:
    // , catchError(() => of(false))
  );
};
