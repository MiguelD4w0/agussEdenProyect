/// <reference types="cypress" />

const yvytyHome = require("../../Page/yvytu/yvytuHome");

describe("Test sobre la pagina de YVYTU", () => {

    beforeEach(() => {
        cy.visit("https://vientosdelaselva.com.ar");
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

    it("Verificar Boton de Reservar", () => {
        //attr significa atributo
        yvytyHome
        .getGenericButton()
        .contains("Reservar")
        .should("have.attr", "href", "https://wa.me/5493757454400")
        .and("have.attr", "target", "_blank");
        /*yvytyHome
        .getGenericButton()
        .should("have.attr", "target", "_blank");*/
        yvytyHome
        .getGenericButton()
        .contains("Reservar")
        .should(
           "have.css", 
           "Background", 
           "rgb(34, 153, 84) none repeat scroll 0% 0% / auto padding-box border-box"
        );
    });



});