/// <reference types="cypress" />

const yvytyHome = require("../../Page/yvytu/yvytuHome");

describe("Test sobre la pagina de YVYTU", () => {

    it("Verfiicar Barra de Navegacion - Iterar en Botones pildora", () => {
        cy.visit("https://vientosdelaselva.com.ar/");

        const arrayMenu = ["LA RESERVA", "CABAÑAS", "COMO LLEGAR", "CONTACTO", "DONÁ"];
        
        yvytyHome.getMenuPillButtons().each((boton, indice) =>{
            cy.wrap(boton).should("have.text", arrayMenu[indice]).and("be.visible");
        });
    });

    it("Verfiicar Barra de Navegacion - Iterar en Botones", () => {
        cy.visit("https://vientosdelaselva.com.ar/");

        //incluye el primer boton que seria una imagen
        const arrayMenu = ["","LA RESERVA", "CABAÑAS", "COMO LLEGAR", "CONTACTO", "DONÁ"];
        
        yvytyHome.getMenuAllButtons().each((boton, indice) => {
            if(indice != 0){
                cy.wrap(boton).should("have.text", arrayMenu[indice]);
            }
        });
    });



});