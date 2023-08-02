import { TestBed } from '@angular/core/testing';

import { TatuajesdestacadosService } from './tatuajesdestacados.service';

describe('TatuajesdestacadosService', () => {
  let service: TatuajesdestacadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TatuajesdestacadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
