import { RegistrationAppPage } from './app.po';

describe('registration-app App', function() {
  let page: RegistrationAppPage;

  beforeEach(() => {
    page = new RegistrationAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
