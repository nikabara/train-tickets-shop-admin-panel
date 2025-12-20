import { Component, importProvidersFrom, inject, OnInit } from '@angular/core';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { VagonService } from '../../services/AppServices/vagon.service';
import { VagonTypePipe } from "../../pipes/vagon-type.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vagon-details',
  imports: [VagonTypePipe, CommonModule],
  templateUrl: './vagon-details.component.html',
  styleUrl: './vagon-details.component.sass'
})
export class VagonDetailsComponent implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly vagonService: VagonService = inject(VagonService);

  public vagonId: number | undefined;

  public vagon: any | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');

      if (idString) {
        this.vagonId = Number.parseInt(idString);

        this.vagonService.GetVagon(this.vagonId).subscribe({
          next: (response) => {
            this.vagon = response.data;
            console.log(this.vagon);
          }
        })
      }
    })
  }

}
