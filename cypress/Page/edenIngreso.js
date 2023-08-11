/// <reference types="cypress" />

//Page Object de eden.cy
class EdenIngresoLocators{
    constructor(){

        this.campoEmail = "#email";
        this.campoPassword = "#clave" ;
        this.btnIngresar = "#continuar";
        this.mensajeError = "[class='col-12 alert alert-danger'] li"; //no se que es creo que la clase
       
    }
}

export default class EdenIngreso{
    constructor(){
        this.locators = new EdenIngresoLocators ();
    }

    getCampoEmail(){
        return cy.get(this.locators.campoEmail);
    }

    getCampoPassword(){
        return cy.get(this.locators.campoPassword);
    }

    getBtnIngresar(){
        return cy.get(this.locators.btnIngresar);
    }

    getMensajeError(){
        return cy.get(this.locators.mensajeError);
    }
}