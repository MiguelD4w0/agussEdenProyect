/// <reference types="cypress" />

import EdenEvent from "../../Page/edenEvent";
import EdenHome from "../../Page/edenHome"
import EdenHeader from "../../Page/edenHeader";
import EdenIngreso from "../../Page/edenIngreso";

const edenSalas = require("../../Page/edenSalas");

const edenIngreso = new EdenIngreso();
const edenEvent = new EdenEvent();
const edenHeader = new EdenHeader();
const edenHome = new EdenHome();

//Import del utils
const utils = require("../../Page/utils");

describe("test sobre la pagina eden entradas", {tags: "@regression"}, ()=>{

    beforeEach(() =>{
        cy.openWeb();
        //const tamPantalla = Cypress.env("viewportdesktop").device;
        //cy.viewport(tamPantalla);

        //const tamPantalla = Cypress.env("viewportmobile").device;
        //cy.viewport(tamPantalla);

        //cy.visit("/")
    });

    //it.only para solo ejecutar ese test, puede haber mas de un .only en el mismo describe
    it("Verificar subtitulos", {tags: '@plp'}, () => {
        
        const txtBuscar = "BUSCAR EVENTO";
        const txtCalendar = "CALENDARIO DE EVENTOS"

        //Usando PageObject
        edenHome.getSubTitles().first().should("contain.text", /*"BUSCAR EVENTO"*/ txtBuscar)
        edenHome.getSubTitles().last().should("contain.text", /*"CALENDARIO DE EVENTOS"*/ txtCalendar)

        //Sin usar PageObject
        //cy.get('h5').first().should("contain.text", "BUSCAR EVENTO")
        //cy.get('h5').last().should("contain.text", "CALENDARIO DE EVENTOS")
        
    })

    it("Verificar Menu",{tags: ['@regression', "@smoke"]}, () => {

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
        //cy.visit("https://www.edenentradas.com.ar/");
        const newUrl = `${Cypress.config().baseUrl}sitio/contenido/recitales`;
        edenHeader.getMenuButtons().contains("RECITALES").click(); //Una forma de encontrar el boton mas optima
        //edenHeader.getMenuButtons().eq(3).click();
        //cy.get("#navbar a").eq(3).click();

        //para que uno pueda leer el codigo de manera facil
        //const newUrl = "https://www.edenentradas.com.ar/sitio/contenido/recitales";
        //url sirve para chekear en que url esta actualemente el usuario
        cy.url().should("eq", newUrl);

        //en caso de que tengamos ambiente desa o test o prod podemos hacer
        //hacemos una comparacion de una Url parcial
        cy.url().should("include", "/sitio/contenido/recitales")
    });

    it("Verificar imagen del Logo", ()=>{

        //con un .and puedo seguir haciendo verificaciones pero en este caso serian del tipo should
        edenHeader.getImageLogo().should("be.visible").and("have.prop", "naturalHeight").and("be.greaterThan", 0);

        const imgSource = "https://static.edenentradas.com.ar/sitio/images/logo.gif";
        edenHeader.getImageLogo().should("have.attr", "src", imgSource);
        edenHeader.getImageLogo().should("have.attr", "alt", "EdenEntradas");

    });
    

    it("Verificar el funcionamiento del Buscador", () => {

        //Escribir en cualquier input que nos haga falta
        edenHeader.getSearchInput().type("Queen");
        edenHeader.getSearchSuggestion().click();

        const eventTxt = 'Experiencia Queen "Champions of the World Tour 23" ';
        edenEvent.getEventTitle().should("have.text", eventTxt);
    })

    it("Jira-2012 Verificar Titulo de Salas", () => {
       
        edenHeader.getMenuButtons().contains("SALAS").click();
    });

    it("Calendario", () => {

        const nombresMeses = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ];
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth();
        const anioActual = fechaActual.getFullYear();
        const nombreMesActual = nombresMeses[mesActual];
        const diaActual = fechaActual.getDate();

        cy.log(nombreMesActual);//Por ejemplo Agosto
        cy.log(anioActual);//por ejemplo 2023
        cy.log(diaActual);//por ejemplo 4
        
        edenHome.getCalendarTitle().should("contain.text", nombreMesActual);
        edenHome.getCalendarTitle().should("contain.text", anioActual);

        edenHome
        .getCalendar()
        .find("td")
        .each((cuadradoDia, $inx) => {
            if($inx < diaActual){
                cy.wrap(cuadradoDia).should(
                   "have.class", 
                   "ui-datepicker-unselectable ui-state-disabled"
                );
                cy.log(`El día ${$inx} es no seleccionable`);
            }
        });
    });

    it("Calendario 2", () => {
        const [dia, mes, anio] = utils.getCompleteDate();
    
        edenHome.getCalendarTitle().should("contain.text", mes);
        edenHome.getCalendarTitle().should("contain.text", anio);
    
        edenHome
          .getCalendar()
          .find("td")
          .each((cuadradoDia, $inx) => {
            if ($inx < dia) {
              cy.wrap(cuadradoDia).should(
                "have.class",
                "ui-datepicker-unselectable ui-state-disabled"
              );
              cy.log(`El día ${$inx} es no seleccionable`);
            }
          });
      });

      it("Buscador Nuevo", () => {
        edenHeader.getSearchInput().type("Experiencia");
      });

    it("Verificar nombre de salas", () => {
        //cy.visit("https://www.edenentradas.com.ar/sitio/contenido/salas");

        const arrSalas = [
            "Plaza de la Musica",
            "Sala del Rey",
            "Refugio Guernica",
            "Captian Blue XL",
            "Teatro Cultural Cañanda",
            "Sala Agustín Tosco – Luz y Fuerza - Bº Centro",
            "Sala de Las Americas",
            "Studio Theater",
            "Casa Babylon",
        ];

        edenHeader.getMenuButtons().contains("SALAS").click();

        //Validacion de los titulos iterando por elemento
        edenSalas.getSalasBlock().each((block, $inx) => {
            cy.wrap(block).should("be.visible");
            cy.wrap(block).should("contain.text", titulosSalas[$inx]);
        });

        //Validacion de titulos por array
        arrSalas.forEach((titulo, $inx) => {
            edenSalas.getSalasBlock().eq($inx).should("contain.text", titulo);
        });
    });

    it("Verificar salas completo", () => {
    edenHeader.getMenuButtons().contains("SALAS").click();

    cy.fixture(`salas.json`).then((file) => {
        //Validación ITERANDO en ELEMENTOS
        file.forEach((salaData, $inx) => {
          edenSalas.getSalasBlock().eq($inx).should("be.visible");
          edenSalas.getSalasTitle().eq($inx).should("have.text", salaData.title);
          edenSalas
            .getSalasPuntoDeVenta()
            .eq($inx)
            .should("contain.text", salaData.address);
        });
    });
  });

    //Tarea que dejo Aguss
    it.skip("Verificar mensaje: Usuario o Contraseña incorrecta", () => {
        cy.visit("https://www.edenentradas.com.ar");
        edenHeader.getIngreso().click();

        edenIngreso.getCampoEmail().type("falso@gmail.com");
        edenIngreso.getCampoPassword().type("contraseña");

        edenIngreso.getBtnIngresar().click();
        edenIngreso.getMensajeError().should("have.text", "Usuario o Contraseña incorrecta");

    })






});