import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleIdToRoleName'
})
export class RoleIdToRoleNamePipe implements PipeTransform {

  transform(value: number | null): string | null {
    if (typeof value !== 'number') {
      return value;
    }

    switch(value){
      case 1:
        return 'SuperAdmin'
      case 2:
        return 'Admin'
      case 3:
        return 'User'

      default:
        return 'Unidentified'
    }
  }

}
