import { TestBed } from '@angular/core/testing';

import { ImportateurService } from './importateur.service';

describe('ImportateurService', () => {
  let service: ImportateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
