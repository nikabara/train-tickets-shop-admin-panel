import { Component, OnDestroy, OnInit } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result, BrowserMultiFormatReader } from '@zxing/library';
import { from, Observable, BehaviorSubject, Subscription, of } from 'rxjs';
import { switchMap, delay, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validate-qr',
  imports: [CommonModule],
  templateUrl: './validate-qr.component.html',
  styleUrl: './validate-qr.component.sass',
})
export class ValidateQrComponent implements OnInit, OnDestroy {
  private codeReader: BrowserMultiFormatReader | null = null;
  public result$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public error$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private scanSubscription: Subscription | null = null;

  public ticketId: string | null = '';

  ngOnInit(): void {
    this.startScanning();
  }

  ngOnDestroy(): void {
    this.stopScanning();
  }

  public startScanning(): void {
    this.codeReader = new BrowserMultiFormatReader();

    // Observable for device listing
    const devices$ = new Observable<string>((observer) => {
      this.codeReader
        ?.listVideoInputDevices()
        .then((devices) => {
          if (devices.length === 0) {
            observer.error('No camera found!');
          } else {
            observer.next(devices[0].deviceId); // Emit the first device ID
            observer.complete();
          }
        })
        .catch((err) => observer.error(`Camera error: ${err}`));
    });

    // Subscribe to the observable
    this.scanSubscription = devices$.subscribe({
      next: (deviceId) => this.startDecoding(deviceId),
      error: (err) => this.error$.next(err),
    });
  }

  private startDecoding(deviceId: string): void {
    const decode$ = new Observable<string>((observer) => {
      this.codeReader?.decodeFromVideoDevice(
        deviceId,
        'video-element',
        (result: Result | undefined, err: Error | undefined) => {
          if (result) {
            console.log(result) // <- here
            this.ticketId = result.getText();
            observer.next(result.getText()); // Emit the decoded text
          } else if (err) {
            observer.error(err); // Emit errors
          }
        }
      );
    });

    // Subscribe to the decoding observable with a delay
    this.scanSubscription?.add(
      decode$
        .pipe(
          switchMap((text) => 
            of(text).pipe(delay(2000)) // Add a 2-second delay
          ),
          catchError((err) => {
            console.error('Decoding error:', err);
            return of(null); // Handle errors gracefully
          })
        )
        .subscribe({
          next: (text) => {
            if (text) {
              this.result$.next(text); // Emit the delayed result
              console.log('Scanned result with delay:', text);
            }
          },
          error: (err) => console.error('Subscription error:', err),
        })
    );
  }

  public stopScanning(): void {
    // Unsubscribe from all subscriptions
    this.scanSubscription?.unsubscribe();

    // Stop the QR scanner
    this.codeReader?.reset();

    // Clear resources
    this.codeReader = null;
  }
}
