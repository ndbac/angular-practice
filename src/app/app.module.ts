import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoModule } from './modules/todo/todo.module';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RoutesModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, RouterOutlet, RoutesModule, TodoModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
