import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { TryAppComponent } from '../app/try.component';

beforeEachProviders(() => [TryAppComponent]);

describe('App: Try', () => {
  it('should create the app',
      inject([TryAppComponent], (app: TryAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'try works!\'',
      inject([TryAppComponent], (app: TryAppComponent) => {
    expect(app.title).toEqual('try works!');
  }));
});
