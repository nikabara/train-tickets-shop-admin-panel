import { Component, inject, Input, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import { FirebaseService } from '../../../services/firebase.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-info',
  imports: [DatePipe],
  templateUrl: './info.component.html',
  styleUrl: './info.component.sass'
})
export class InfoComponent implements OnInit {
  @Input() data!: any;

  private firebaseService: FirebaseService = inject(FirebaseService);

  ngOnInit(): void {
    console.log(this.data, 'ss')
  }

  deleteInfo(): void {
    Swal.fire({
      icon: 'question',
      title: "Are you sure you want to delete this item?",
      showConfirmButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      showDenyButton: true,
      denyButtonText: "Cancel",
      denyButtonColor: "green",
      preConfirm:() => {
        this.firebaseService.deleteInfo(this.data.id).subscribe(
          (response) => {
            console.log(response);
          }
        )
      } 
    });
  }

  editPost(): void {
    Swal.fire({
      icon: 'info',
      title: 'Edit Post functionality has not yet been added',
    })
    throw Error("Function not yet implemented : ../src/app/components/dashboard/info/info.component.ts");
  }
}


// "https://www.n-able.com/wp-content/uploads/2021/04/blog-local_admin_rights.jpeg"