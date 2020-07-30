import { TestBed, async, inject } from '@angular/core/testing';

import { UsuarioGuard } from './usuario.guard';

describe('UsuarioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioGuard]
    });
  });

  it('should ...', inject([UsuarioGuard], (guard: UsuarioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
