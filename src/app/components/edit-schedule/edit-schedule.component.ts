import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-train',
  imports: [],
  templateUrl: './edit-schedule.component.html',
  styleUrl: './edit-schedule.component.sass'
})
export class EditScheduleComponent implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  public trainId: number | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');

      if (idString) {
        this.trainId = Number.parseInt(idString);
      }
    });
  }



}
