/// <reference types="cypress" />

//Page Object de eden.cy
class EdenEventLocatores {
    constructor(){
        this.eventTitle = ".fechas-funciones span";
    }
}

export default class EdenEvent{
    constructor(){
        this.locators = new EdenEventLocatores();
    }

    getEventTitle(){
        return cy.get(this.locators.eventTitle).first();
    }
}