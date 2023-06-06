import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferentielRoutingModule } from './referentiel-routing.module';
import { ImportateurComponent } from './importateur/importateur.component';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import {DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { EditorModule } from 'primeng/editor';
import { ImportateurModalComponent } from './importateur/importateur-modal/importateur-modal.component';

@NgModule({
  declarations: [
    ImportateurComponent,
    ImportateurModalComponent
  ],
  imports: [
    CommonModule,
    ReferentielRoutingModule,
    ToastModule,
    TableModule,
    DialogModule,
    ReactiveFormsModule,
    ButtonModule,
    ToolbarModule,
    TooltipModule,
    EditorModule
  
  ]
})
export class ReferentielModule { }
