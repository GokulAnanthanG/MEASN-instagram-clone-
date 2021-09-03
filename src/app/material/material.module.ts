import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//material
import {MatToolbarModule} from '@angular/material/toolbar';
 import {MatIconModule} from '@angular/material/icon';
 import {MatButtonModule} from '@angular/material/button'
 import {MatCardModule} from '@angular/material/card'
 import {MatListModule} from '@angular/material/list'
 import {MatGridListModule} from '@angular/material/grid-list'
 import {MatDividerModule} from '@angular/material/divider'
 import {MatTooltipModule} from '@angular/material/tooltip'
 import {MatMenuModule} from '@angular/material/menu'
 import {MatDialogModule} from '@angular/material/dialog'
 import {MatFormFieldModule} from '@angular/material/form-field'
 import { MatInputModule} from '@angular/material/input'
 import { FormsModule} from '@angular/forms';
 import { MatSnackBarModule} from '@angular/material/snack-bar'
 import {MatSelectModule} from '@angular/material/select'
 import {MatAutocompleteModule} from '@angular/material/autocomplete';
const material=[MatToolbarModule
,MatIconModule,
MatButtonModule,
MatCardModule,
MatListModule,
MatGridListModule,
MatDividerModule,
MatTooltipModule,
MatMenuModule,
MatDialogModule,
MatFormFieldModule,
MatInputModule,
FormsModule,
MatSnackBarModule,
MatSelectModule,
MatAutocompleteModule
 ]

@NgModule({
  
  declarations: [],
  imports: [
    material
  ],exports:[
    material
  ]
})
export class MaterialModule { }
