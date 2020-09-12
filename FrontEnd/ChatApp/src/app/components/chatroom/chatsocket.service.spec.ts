import { TestBed } from '@angular/core/testing';

import { ChatsocketService } from './chatsocket.service';

describe('ChatsocketService', () => {
  let service: ChatsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
