/// <reference types="cypress" />

const edenHeader2 = require("../../Page/edenHeader2"); // el que llego
const edenHome2 = require("../../Page/edenHome2"); // primero que estubo

describe("test sobre la pagina eden entradas", ()=>{

    beforeEach(() =>{

        //const tamPantalla = Cypress.env("viewportdesktop").device;
        //cy.viewport(tamPantalla);

        const tamPantalla = Cypress.env("viewportmobile").device;
        cy.viewport(tamPantalla);

        cy.visit("/")
    });

    it("Verificar subtitulos", () => {
        //cy.visit("https://www.edenentradas.com.ar/sitio/contenido/inicio")

        edenHome2.getSubTitles().first().should("contain.text", "BUSCAR EVENTO")
        edenHome2.getSubTitles().last().should("contain.text", "CALENDARIO DE EVENTOS")

        //cy.get('h5').first().should("contain.text", "BUSCAR EVENTO")
        //cy.get('h5').last().should("contain.text", "CALENDARIO DE EVENTOS")
        
    });

    it("Verificar Menu", () => {
        //cy.visit("https://www.edenentradas.com.ar/sitio/contenido/inicio")

        //Usaremos un Array para el Menu
        const menuBtn = ["HOME","TODOS","AGENDA DEL FINDE","RECITALES","TEATROS","CUARTETOS","FESTIVALES","SALAS"]; 

        //Usaremos una estructura ForEach
        menuBtn.forEach((txtButton, $index) => {
            edenHeader2.getMenuButtons().eq($index).should("contain.text", txtButton);
        });

        //USANDO PAGE OBJECT 2 osea el otro estilo 
        edenHeader2.getMenuButtons().eq(0).should("contain.text", "HOME")
        edenHeader2.getMenuButtons().eq(1).should("contain.text", "TODOS")
        edenHeader2.getMenuButtons().eq(2).should("contain.text", "AGENDA DEL FINDE")
        edenHeader2.getMenuButtons().eq(3).should("contain.text", "RECITALES")
        edenHeader2.getMenuButtons().eq(4).should("contain.text", "TEATROS")
        edenHeader2.getMenuButtons().eq(5).should("contain.text", "CUARTETOS")
        edenHeader2.getMenuButtons().eq(6).should("contain.text", "FESTIVALES")
        edenHeader2.getMenuButtons().eq(7).should("contain.text", "SALAS")

        //SIN USAR PAGE OBJECT
        /*cy.get('#navbar a').eq(0).should("contain.text", "HOME")    
        cy.get('#navbar a').eq(1).should("contain.text", "TODOS")        
        cy.get('#navbar a').eq(2).should("contain.text", "AGENDA DEL FINDE")        
        cy.get('#navbar a').eq(3).should("contain.text", "RECITALES")        
        cy.get('#navbar a').eq(4).should("contain.text", "TEATROS")
        cy.get('#navbar a').eq(5).should("contain.text", "CUARTETOS")        
        cy.get('#navbar a').eq(6).should("contain.text", "FESTIVALES")
        cy.get('#navbar a').eq(7).should("contain.text", "SALAS") */       
    
    });

    it("Verificar pagina de recitales", () => {
        //cy.visit("https://www.edenentradas.com.ar/");

        edenHeader2.getMenuButtons().eq(3).click();
    });
})