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
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';

import { BlankComponent } from './containers/blank/blank.component';
import { LayoutsComponent } from './containers/layouts/layouts.component';
import { SidebarComponent } from './containers/layouts/sidebar/sidebar.component';
import { HeaderComponent } from './containers/layouts/header/header.component';
import { BrandingComponent } from './containers/layouts/sidebar/branding.component';
import { AppNavItemComponent } from './containers/layouts/sidebar/nav-item/nav-item.component';
import { NgxUiLoaderConfig } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: 'three-bounce',
  fgsColor: '#5d87ff',
  pbThickness: 5,
  pbColor: '#5d87ff',
  overlayColor: 'rgba(255, 255, 255, 0.8)',
};

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
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true })
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule {
}
