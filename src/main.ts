import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base'

registerLicense('Ngo9BigBOggjHTQxAR8/V1JFaF1cXGFCf1JpRmNGfV5ycUVOalxXTnRYUiweQnxTdEBiWH1dcHxVQGJbV0dxV0leYg==');

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
