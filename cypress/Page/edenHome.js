/// <reference types="cypress" />

//Page Object de eden.cy
class EdenHomeLocatores {
    constructor(){
        this.subTitles = "h5"
    }
}

export default class EdenHome{
    constructor(){
        this.locators = new EdenHomeLocatores();
    }

    getSubTitles(){
        return cy.get(this.locators.subTitles);
    }
}