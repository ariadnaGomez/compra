/* jshint -W117, -W030, -W098 */
'use strict';

function getVisibleElements(elem) {
    return elem.isDisplayed();
}

describe('Menu', function() {
    var toggleMenu = element.all(by.css('.ion-navicon')).filter(getVisibleElements).first();
    var titleHeader = element.all(by.css('.title.header-item')).filter(getVisibleElements).first();

    beforeEach(function() {
        browser.get('#/');
        toggleMenu.click();
    });

});
