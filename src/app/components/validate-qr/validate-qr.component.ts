import { Component } from '@angular/core';

@Component({
  selector: 'app-validate-qr',
  imports: [],
  templateUrl: './validate-qr.component.html',
  styleUrl: './validate-qr.component.sass'
})
export class ValidateQrComponent {
  public qrResultString!: string;  // Variable to hold the QR code data

  // Optionally: This can be used to display any additional data or QR code info
  onScanSuccess(result: string) {
    this.qrResultString = result; // Store the QR code result
  }
}
