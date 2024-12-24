import { CommonModule } from '@angular/common';
import { SwaggerApiService } from './../../services/swagger-api.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-validate-ticket',
  imports: [FormsModule, CommonModule],
  templateUrl: './validate-ticket.component.html',
  styleUrl: './validate-ticket.component.sass'
})
export class ValidateTicketComponent {
  private swaggerApiService: SwaggerApiService = inject(SwaggerApiService);

  ticketId: string = '';

  ticketInfo: any;

  validateTicket(): void {
    this.ticketInfo = [];
    this.swaggerApiService.checkTicketStatus(this.ticketId).subscribe(
      (response) => {
        this.ticketInfo = response;
        console.log(this.ticketInfo);
      }
    )
  }
}
