import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-train',
  imports: [],
  templateUrl: './edit-train.component.html',
  styleUrl: './edit-train.component.sass'
})
export class EditTrainComponent implements OnInit {

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
