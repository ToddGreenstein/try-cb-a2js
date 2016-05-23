export class TryPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('try-app h1')).getText();
  }
}
