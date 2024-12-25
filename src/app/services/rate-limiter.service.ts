import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RateLimiterService {
  private attempts = 0;
  private lastAttemptTime: number | null = null;
  private lockoutTime = 0.3 * 60 * 1000; // 1 minutes
  private maxAttempts = 5;

  canAttempt(): boolean {
    const now = Date.now();

    if (this.lastAttemptTime && now - this.lastAttemptTime < this.lockoutTime) {
      if (this.attempts >= this.maxAttempts && typeof localStorage !== 'undefined') {
        return false;
      }
    } else {
      this.resetAttempts();
    }

    return true;
  }

  recordAttempt(): void {
    const now = Date.now();

    if (!this.lastAttemptTime || now - this.lastAttemptTime >= this.lockoutTime) {
      this.resetAttempts();
    }

    this.lastAttemptTime = now;
    this.attempts++;
  }

  resetAttempts(): void {
    this.attempts = 0;
    this.lastAttemptTime = null;
  }
}
