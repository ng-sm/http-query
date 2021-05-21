import { TestBed } from '@angular/core/testing';
import { HttpQueryFacade } from './http-query.facade';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState } from './http-query.state';

describe('http-query.facade', () => {
  let httpQueryFacade: HttpQueryFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        HttpQueryFacade,
        provideMockStore({ initialState }),
      ]
    });

    httpQueryFacade = TestBed.inject(HttpQueryFacade);
    store = TestBed.inject(MockStore);
  });

  it('should trigger "dispatch" action', () => {
    const storeSpyOn = spyOn(store, 'dispatch');

    httpQueryFacade.dispatch({ type: 'TEST' });

    expect(storeSpyOn).toHaveBeenCalled();
  });
});
