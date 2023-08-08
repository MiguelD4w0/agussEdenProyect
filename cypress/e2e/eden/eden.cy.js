/// <reference types="cypress" />

import EdenEvent from "../../Page/edenEvent";
import EdenHome from "../../Page/edenHome"
import EdenHeader from "../../Page/edenHeader";

const edenEvent = new EdenEvent();
const edenHeader = new EdenHeader();
const edenHome = new EdenHome();

describe("test sobre la pagina eden entradas", ()=>{

    //it.only para solo ejecutar ese test, puede haber mas de un .only en el mismo describe
    it("Verificar subtitulos", () => {
        cy.visit("https://www.edenentradas.com.ar/sitio/contenido/inicio")

        const txtBuscar = "BUSCAR EVENTO";
        const txtCalendar = "CALENDARIO DE EVENTOS"

        //Usando PageObject
        edenHome.getSubTitles().first().should("contain.text", /*"BUSCAR EVENTO"*/ txtBuscar)
        edenHome.getSubTitles().last().should("contain.text", /*"CALENDARIO DE EVENTOS"*/ txtCalendar)

        //Sin usar PageObject
        //cy.get('h5').first().should("contain.text", "BUSCAR EVENTO")
        //cy.get('h5').last().should("contain.text", "CALENDARIO DE EVENTOS")
        
    })

    it("Verificar Menu", () => {
        cy.visit("https://www.edenentradas.com.ar/sitio/contenido/inicio")

        //Creamos un array para el menu 
        const menuBtn = ["HOME","TODOS","AGENDA DEL FINDE","RECITALES","TEATROS","CUARTETOS","FESTIVALES","SALAS"]; 

        //Usamos estructura Each
        edenHeader.getMenuButtons().each((button, $index) => {
            cy.wrap(button).should("contain.text", menuBtn[$index]);
        });

        /*edenHeader.getMenuButtons().each((button) => {
            cy.wrap(button).should("be.visible");
        });*/

        //edenHeader.getMenuButtons().eq(0).should("contain.text", /*"HOME"*/ menuBtn[0]);    
        //edenHeader.getMenuButtons().eq(1).should("contain.text", /*"TODOS"*/ menuBtn[1]);  
        //edenHeader.getMenuButtons().eq(2).should("contain.text", /*"AGENDA DEL FINDE"*/ menuBtn[2]);  
        //edenHeader.getMenuButtons().eq(3).should("contain.text", /*"RECITALES"*/ menuBtn[3]);  
        //edenHeader.getMenuButtons().eq(4).should("contain.text", /*"TEATROS"*/ menuBtn[4]);  
        //edenHeader.getMenuButtons().eq(5).should("contain.text", /*"CUARTETOS"*/ menuBtn[5]);  
        //edenHeader.getMenuButtons().eq(6).should("contain.text", /*"FESTIVALES"*/ menuBtn[6]);  
        //edenHeader.getMenuButtons().eq(7).should("contain.text", /*"SALAS"*/ menuBtn[7]);
        
        //cy.get('#navbar a').eq(0).should("contain.text", "HOME")    
        //cy.get('#navbar a').eq(1).should("contain.text", "TODOS")        
        //cy.get('#navbar a').eq(2).should("contain.text", "AGENDA DEL FINDE")        
        //cy.get('#navbar a').eq(3).should("contain.text", "RECITALES")        
        //cy.get('#navbar a').eq(4).should("contain.text", "TEATROS")
        //cy.get('#navbar a').eq(5).should("contain.text", "CUARTETOS")        
        //cy.get('#navbar a').eq(6).should("contain.text", "FESTIVALES")
        //cy.get('#navbar a').eq(7).should("contain.text", "SALAS")  eq() signigica igual a       
    });

    it("Verificar pagina recitales", () => {
        cy.visit("https://www.edenentradas.com.ar/");
        
        edenHeader.getMenuButtons().contains("RECITALES").click(); //Una forma de encontrar el boton mas optima
        //edenHeader.getMenuButtons().eq(3).click();
        //cy.get("#navbar a").eq(3).click();

        //para que uno pueda leer el codigo de manera facil
        //const newUrl = "https://www.edenentradas.com.ar/sitio/contenido/recitales";
        //url sirve para chekear en que url esta actualemente el usuario
        //cy.url().should("eq", newUrl);

        //en caso de que tengamos ambiente desa o test o prod podemos hacer
        //hacemos una comparacion de una Url parcial
        cy.url().should("include", "/sitio/contenido/recitales")
    });

    it("Verificar imagen del Logo", ()=>{
        cy.visit("https://www.edenentradas.com.ar");

        //con un .and puedo seguir haciendo verificaciones pero en este caso serian del tipo should
        edenHeader.getImageLogo().should("be.visible").and("have.prop", "naturalHeight").and("be.greaterThan", 0);

        const imgSource = "https://static.edenentradas.com.ar/sitio/images/logo.gif";
        edenHeader.getImageLogo().should("have.attr", "src", imgSource);
        edenHeader.getImageLogo().should("have.attr", "alt", "EdenEntradas");

    });

    it("Verificar el funcionamiento del Buscador", () => {
        cy.visit("https://www.edenentradas.com.ar");

        //Escribir en cualquier input que nos haga falta
        edenHeader.getSearchInput().type("Queen");
        edenHeader.getSearchSuggestion().click();

        const eventTxt = 'Experiencia Queen "Champions of the World Tour 23" ';
        edenEvent.getEventTitle().should("have.text", eventTxt);
    })
})