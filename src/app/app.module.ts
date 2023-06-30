import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { ToastrModule } from 'ngx-toastr';

import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlankComponent } from './containers/blank/blank.component';
import { LayoutsComponent } from './containers/layouts/layouts.component';
import { SidebarComponent } from './containers/layouts/sidebar/sidebar.component';
import { HeaderComponent } from './containers/layouts/header/header.component';
import { BrandingComponent } from './containers/layouts/sidebar/branding.component';
import { AppNavItemComponent } from './containers/layouts/sidebar/nav-item/nav-item.component';
import { AuthInterceptor } from './shared/services/auth-interceptor.service';


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
    ToastrModule.forRoot()
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ]
})
export class AppModule { }
