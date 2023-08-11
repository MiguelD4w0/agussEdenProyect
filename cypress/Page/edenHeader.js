/// <reference types="cypress" />

//Page Object de eden.cy
class EdenHeaderLocators {
    constructor(){

        //Botonera y Header principal
        this.imageLogo = "#header-logo";
        this.menuButtons = "#navbar a";

        //Seccion Ingreso/Registro
        this.ingresoButton = "li:nth-of-type(6) > .nav-link.text-white"; // no se que es opconal a[class="nav-link  text-white"] / li:nth-of-type(6) > a[class="nav-link  text-white"]

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

    /////////////////////////////////////////////////////////////////////

    //Seccion Ingreso/Registro
    getIngreso(){
        return cy.get("a").contains("Ingresar");//cy.get(this.locators.ingresoButton);
    }

    ////////////////////////////////////////////////////////////////////

    //Seccion de Busqueda
    getSearchInput(){
        return cy.get(this.locators.searchInput);
    }

    getSearchSuggestion(){
        return cy.get(this.locators.searchSuggestion);
    }


}