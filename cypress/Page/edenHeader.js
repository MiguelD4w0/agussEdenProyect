/// <reference types="cypress" />

//Page Object de eden.cy
class EdenHeaderLocators {
    constructor(){

        //Botonera y Header principal
        this.imageLogo = "#header-logo";
        this.menuButtons = "#navbar a";

        //Seccion de busqueda
        this.searchInput = "#espectaculoList"; //id
        this.searchSuggestion = ".ui-menu-item"; //clase
    }
}

export default class EdenHeader{
    constructor(){
        this.locators = new EdenHeaderLocators();
    }

    //Botonera y Header Principal
    getImageLogo(){
        return cy.get(this.locators.imageLogo);
    }

    getMenuButtons(){
        return cy.get(this.locators.menuButtons);
    }

    //Seccion de Busqueda
    getSearchInput(){
        return cy.get(this.locators.searchInput);
    }

    getSearchSuggestion(){
        return cy.get(this.locators.searchSuggestion);
    }
}