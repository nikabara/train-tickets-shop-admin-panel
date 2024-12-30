import { CanActivateFn } from '@angular/router';

export const AccessGuard: CanActivateFn = (route, state) => {
  if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('isAuthed') && sessionStorage.getItem('isAuthed') === 'true') {
    return true;
  }

  return false;
};
