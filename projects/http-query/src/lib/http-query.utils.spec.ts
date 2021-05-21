import { initialQuery } from './http-query.helpers';
import { isQueryInProgress, isQueryGroupInProgress, isQueryInProgress$ } from './http-query.utils';
import { of } from 'rxjs';

describe('http-query.utils', () => {
  it('#isQueryInProgress checks if query is in progress', () => {
    expect(isQueryInProgress([
      { ...initialQuery, isInProgress: false },
      { ...initialQuery, isInProgress: false },
    ])).toEqual(false);

    expect(isQueryInProgress([
      { ...initialQuery, isInProgress: false },
      { ...initialQuery, isInProgress: true },
    ])).toEqual(true);

    expect(isQueryInProgress([
      { ...initialQuery, isInProgress: true },
      { ...initialQuery, isInProgress: true },
    ])).toEqual(true);
  });

  it('#isQueryGroupInProgress checks if query group is in progress', () => {
    expect(isQueryGroupInProgress({
      firstQuery: { ...initialQuery, isInProgress: false },
      secondQuery: { ...initialQuery, isInProgress: false },
    })).toEqual(false);

    expect(isQueryGroupInProgress({
      firstQuery: { ...initialQuery, isInProgress: true },
      secondQuery: { ...initialQuery, isInProgress: false },
    })).toEqual(true);

    expect(isQueryGroupInProgress({
      firstQuery: { ...initialQuery, isInProgress: true },
      secondQuery: { ...initialQuery, isInProgress: true },
    })).toEqual(true);
  });

  it('#isQueryInProgress$ checks if query observables is in progress', (done) => {
    isQueryInProgress$([
      of({ ...initialQuery, isInProgress: false }),
      of({ ...initialQuery, isInProgress: true }),
    ]).subscribe({
      next: value => {
        expect(value).toEqual(true);
        done();
      }
    });
  });

  it('#isQueryInProgress$ checks if query observables is not in progress', (done) => {
    isQueryInProgress$([
      of( { ...initialQuery, isInProgress: false }),
      of( { ...initialQuery, isInProgress: false }),
    ]).subscribe({
      next: value => {
        expect(value).toEqual(false);
        done();
      }
    });
  });
});

