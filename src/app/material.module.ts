import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';

//angular material 
import { PasswordModule } from 'primeng/password';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from 'primeng/dragdrop';


@NgModule({
  declarations: [],
  exports: [
    InputSwitchModule,
    CalendarModule,
    ProgressSpinnerModule,
    TagModule,
    RadioButtonModule,
    PasswordModule,
    TableModule,
    DragDropModule,
    ToastModule,
    CardModule,
    DropdownModule,
    ColorPickerModule,
    DynamicDialogModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    CommonModule,
    ReactiveFormsModule,
    //angular material
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,

  ],
})
export class MaterialModule { }
