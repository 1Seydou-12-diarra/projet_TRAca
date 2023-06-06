import { Component, OnInit } from '@angular/core';
import { Importateur } from '../../shared/model/importateur/importateur.model';
import { ImportateurService } from '../../shared/service/importateur/importateur.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-importateur',
  templateUrl: './importateur.component.html',
  styleUrls: ['./importateur.component.scss']
})
export class ImportateurComponent implements OnInit {
  importateur:Importateur;
  importateurs: Importateur[]=[];
  selectedImportateurs:Importateur[];
  
  constructor(
    private importateurService: ImportateurService,
    private messageService: MessageService,
  ){}
  
  ngOnInit(): void {
    this.recupererImportateur();
  }
    
  recupererImportateur(): void {
    this.importateurService.recupererImportateur().subscribe({
      next: data =>{
        this.importateurs = data;
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
          sticky: true,
        });
      }
    })
  }
}
