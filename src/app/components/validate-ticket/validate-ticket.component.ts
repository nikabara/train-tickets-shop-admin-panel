import { CommonModule } from '@angular/common';
import { SwaggerApiService } from './../../services/swagger-api.service';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TicketService } from '../../services/AppServices/ticket.service';
import { UserService } from '../../services/AppServices/user.service';
import { SeatService } from '../../services/AppServices/seat.service';
import { PaymentStatusPipe } from "../../pipes/payment-status.pipe";


@Component({
  selector: 'app-validate-ticket',
  imports: [FormsModule, CommonModule, PaymentStatusPipe],
  templateUrl: './validate-ticket.component.html',
  styleUrl: './validate-ticket.component.sass'
})
export class ValidateTicketComponent  {

  private readonly ticketService: TicketService = inject(TicketService);
  private readonly userService: UserService = inject(UserService);
  private readonly seatService: SeatService = inject(SeatService);

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  ticketNumber: string = '';

  ticketInfo: any;

  userInfo: any;

  seatInfo:  any;

  validateTicket(): void {
    this.ticketInfo = [];

    this.ticketService.GetTicket(this.ticketNumber).subscribe({
      next: (ticketResponse) => {
        if (ticketResponse.isSuccess) {
          this.ticketInfo = ticketResponse.data;
          console.log(this.ticketInfo);

          this.userService.GetUser(this.ticketInfo.userId).subscribe({
            next: (userResponse) => {
              this.userInfo = userResponse.data;
              console.log(this.userInfo);

              this.seatService.GetSeat(this.ticketInfo.seatId).subscribe({
                next: (seatResponse) => {
                  this.seatInfo = seatResponse.data;
                  console.log(this.seatInfo);
                }
              })
            }
          });
        }
      }
    })
  }

  totalPrice(): number {
    let sum: number = 0;

    for (let i = 0; i < this.ticketInfo.persons.length; i++) {
      sum += this.ticketInfo.persons[i].seat.price;
    }

    return sum;
  }

  generatePDF() {
    const element = this.pdfContent.nativeElement;

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190; // A4 page width in mm
      const pageHeight = 277; // A4 page height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 20;

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

      // Save the PDF
      pdf.save('invoice.pdf');
    });
  }

  print() {
    const printContents = this.pdfContent.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;

    // Replace the body content with the section to print
    document.body.innerHTML = printContents;
    window.print();

    // Restore the original body content after printing
    document.body.innerHTML = originalContents;
  }
}
