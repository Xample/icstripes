import { IcstripesPage } from './app.po';

describe('icstripes App', function() {
  let page: IcstripesPage;

  beforeEach(() => {
    page = new IcstripesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
