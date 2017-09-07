import { FehSimulatorPage } from './app.po';

describe('feh-simulator App', () => {
  let page: FehSimulatorPage;

  beforeEach(() => {
    page = new FehSimulatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
