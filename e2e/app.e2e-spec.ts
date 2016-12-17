import { StripesPage } from './app.po';

describe('stripes App', function() {
  let page: StripesPage;

  beforeEach(() => {
    page = new StripesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
