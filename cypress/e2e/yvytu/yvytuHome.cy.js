/// <reference types="cypress" />

const yvytyHome = require("../../Page/yvytu/yvytuHome");

describe("Test sobre la pagina de YVYTU", () => {

    beforeEach(() => {
        cy.visit("https://vientosdelaselva.com.ar/");
    });

    it("Verfiicar Barra de Navegacion - Iterar en Botones pildora", () => {

        const arrayMenu = ["LA RESERVA", "CABAÑAS", "COMO LLEGAR", "CONTACTO", "DONÁ"];
        
        yvytyHome.getMenuPillButtons().each((boton, indice) =>{
            cy.wrap(boton).should("have.text", arrayMenu[indice]).and("be.visible");
        });
    });

    it("Verfiicar Barra de Navegacion - Iterar en Botones", () => {

        //incluye el primer boton que seria una imagen
        const arrayMenu = ["","LA RESERVA", "CABAÑAS", "COMO LLEGAR", "CONTACTO", "DONÁ"];
        
        yvytyHome.getMenuAllButtons().each((boton, indice) => {
            if(indice != 0){
                cy.wrap(boton).should("have.text", arrayMenu[indice]);
            }
        });
    });

    it("Verificar comportamiento del boton ir Arriba", () => {

        yvytyHome.getIrArribaButton().should("not.be.visible");
        yvytyHome.getGenericSubtitle().contains("Conocé una historia mágica.").scrollIntoView();

        yvytyHome.getIrArribaButton().should("be.visible").and("contain.text", "Ir arriba").click();

        /*yvytyHome.getIrArribaButton().should("be.visible");
        yvytyHome.getIrArribaButton().should("contain.text", "Ir arriba");
        yvytyHome.getIrArribaButton().click()*/

        yvytyHome.getMenuPillButtons().each((boton, indice) =>{
            cy.wrap(boton).and("be.visible");
        });

    });



});