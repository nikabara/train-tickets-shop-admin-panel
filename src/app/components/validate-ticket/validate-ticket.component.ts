import { CommonModule } from '@angular/common';
import { SwaggerApiService } from './../../services/swagger-api.service';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-validate-ticket',
  imports: [FormsModule, CommonModule],
  templateUrl: './validate-ticket.component.html',
  styleUrl: './validate-ticket.component.sass'
})
export class ValidateTicketComponent {
  private swaggerApiService: SwaggerApiService = inject(SwaggerApiService);

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

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
