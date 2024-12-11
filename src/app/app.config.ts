import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD__hDZbmHZ-ce5KF5DCd9wZ9VuONn8Xj4",
  authDomain: "train-tickets-shop.firebaseapp.com",
  projectId: "train-tickets-shop",
  storageBucket: "train-tickets-shop.firebasestorage.app",
  messagingSenderId: "9211983301",
  appId: "1:9211983301:web:154c09b65d9bb8901707ac",
  measurementId: "G-ZM5Z98SFPE"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
};
