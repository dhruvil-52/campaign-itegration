import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { AuthInterceptor } from './shared/services/auth-interceptor.service';

import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { ToastrModule } from 'ngx-toastr';


import { BlankComponent } from './containers/blank/blank.component';
import { LayoutsComponent } from './containers/layouts/layouts.component';
import { SidebarComponent } from './containers/layouts/sidebar/sidebar.component';
import { HeaderComponent } from './containers/layouts/header/header.component';
import { BrandingComponent } from './containers/layouts/sidebar/branding.component';
import { AppNavItemComponent } from './containers/layouts/sidebar/nav-item/nav-item.component';

import { environment } from 'src/environments/environment';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { FacebookLoginProvider } from '@abacritt/angularx-social-login';

const fbLoginOptions = {
  scope: 'email,public_profile',
  return_scopes: true,
  enable_profile_selector: true,
  version: 'v17.0',
  config_id: "1201682481257707"
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    ToastrModule.forRoot(),
    SocialLoginModule
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookAppId, fbLoginOptions)
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
})
export class AppModule {
  constructor() {
    console.log(environment.facebookAppId)
  }
}
