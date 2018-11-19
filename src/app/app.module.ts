import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppComponent} from './app.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatCardModule, MatInputModule} from '@angular/material'
import {ReactiveFormsModule} from '@angular/forms';
import { LineItemComponent } from './line-item/line-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LineItemComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
