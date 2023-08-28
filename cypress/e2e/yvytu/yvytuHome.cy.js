/// <reference types="cypress" />

describe("Test sobre la pagina de YVYTU", () => {

    it("Verfiicar Barra de Navegacion - Iterar en Botones pildora", () => {
        cy.visit("https://vientosdelaselva.com.ar/");

        const arrayMenu = ["LA RESERVA", "CABAÑAS", "COMO LLEGAR", "CONTACTO", "DONÁ"];
        
        cy.get('a[class*="rounded-full py-2 px-4"]').each((boton, indice) =>{
            cy.wrap(boton).should("have.text", arrayMenu[indice]).and("be.visible");
        });
    });

    it.only("Verfiicar Barra de Navegacion - Iterar en Botones", () => {
        cy.visit("https://vientosdelaselva.com.ar/");

        const arrayMenu = ["","LA RESERVA", "CABAÑAS", "COMO LLEGAR", "CONTACTO", "DONÁ"];
        
        cy.get("nav#menu-nav a").each((boton, indice) => {
            if(indice != 0){
                cy.wrap(boton).should("have.text", arrayMenu[indice]);
            }
        });
    });



});