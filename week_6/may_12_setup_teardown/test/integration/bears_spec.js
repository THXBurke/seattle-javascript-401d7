describe('all the bears', function() {
  it('it should create a bear', function() {
    browser.get('http://localhost:5000');
    element(by.model('bearsctrl.newBear.name')).sendKeys('test bear');
    element(by.id('createbear')).click();
    element.all(by.css('#bearlist:first-child')).getText(function(text) {
      expect(text).toEqual('test bear is a bear who likes salmons');
    });
  });
});
