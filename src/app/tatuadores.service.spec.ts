import { TestBed } from '@angular/core/testing';

import { TatuadoresService } from './tatuadores.service';

describe('TatuadoresService', () => {
  let service: TatuadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TatuadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
