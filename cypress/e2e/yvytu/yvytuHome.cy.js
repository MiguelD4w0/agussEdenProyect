/// <reference types="cypress" />

//Escribir los test en el orden que van apareciendo en la web los elementos

const yvytuHome = require("../../Page/yvytu/yvytuHome");

describe("Test sobre la pagina de YVYTU", () => {

    beforeEach(() => {
        cy.visit("https://vientosdelaselva.com.ar");
    });

    it("Verfiicar Barra de Navegacion - Iterar en Botones pildora", () => {

        const arrayMenu = ["LA RESERVA", "CABAÑAS", "COMO LLEGAR", "CONTACTO", "DONÁ"];
        
        yvytuHome.getMenuPillButtons().each((boton, indice) =>{
            cy.wrap(boton).should("have.text", arrayMenu[indice]).and("be.visible");
        });
    });

    it("Verfiicar Barra de Navegacion - Iterar en Botones", () => {

        //incluye el primer boton que seria una imagen
        const arrayMenu = ["","LA RESERVA", "CABAÑAS", "COMO LLEGAR", "CONTACTO", "DONÁ"];
        
        yvytuHome.getMenuAllButtons().each((boton, indice) => {
            if(indice != 0){
                cy.wrap(boton).should("have.text", arrayMenu[indice]);
            }
        });
    });

    it("Verificar Imagenes del Banner Principal", () => {
        /*yvytuHome.getImagenesBanner().each((imagen) => {
            cy.wrap(imagen).should("exist");
        });
        cy.log("Revisar el test");
        yvytuHome.getImagenesBanner().eq(0).should("be.visible");
        yvytuHome.getImgButton().eq(1).click();
        yvytuHome.getImagenesBanner().eq(1).should("be.visible");
        yvytuHome.getImgButton().eq(2).click();
        yvytuHome.getImagenesBanner().eq(2).should("be.visible")
        yvytuHome.getImgButton().last().click();
        yvytuHome.getImagenesBanner().eq(3).should("be.visible")*/
        const bannerList = ["01.png", "02.png", "03.png", "04.png"];

        bannerList.forEach((banner, inx) => {
            yvytuHome
            .getCurrentImageBanner()
            .should(
                "have.class",
                `bg-[url('/public/images/header-gallery/${banner}')]`
            );

            yvytuHome
            .getImgButton()
            .its("length")
            .then((cantidad) => {
                if(cantidad != inx + 1){
                    yvytuHome
                        .getImgButton()
                        .eq(inx + 1)
                        .click();
                    cy.wait(1000);
                }
            });
        });
    });

    it("Verificar comportamiento del boton ir Arriba", () => {

        yvytuHome.getIrArribaButton().should("not.be.visible");
        yvytuHome.getGenericSubtitle().contains("Conocé una historia mágica.").scrollIntoView();

        yvytuHome.getIrArribaButton().should("be.visible").and("contain.text", "Ir arriba").click();

        /*yvytuHome.getIrArribaButton().should("be.visible");
        yvytuHome.getIrArribaButton().should("contain.text", "Ir arriba");
        yvytuHome.getIrArribaButton().click()*/

        yvytuHome.getMenuPillButtons().each((boton) =>{
            cy.wrap(boton).and("be.visible");
        });
        yvytuHome.getIrArribaButton().should("not.be.visible");

    });

    it("Verificar textos de la pagina", () =>{
        let inxPar = 0;

        //Leer el readme
    cy.fixture("textos_yvytu").then((txt_yvytu) => {
        //Se toma cada elemento definido dentro del arrayJson que está en fixtures
        txt_yvytu.forEach((elTexto, inx) => {
          cy.log(`**VALIDACIÓN DEL TITULO: ${inx + 1}**`);
          let yvyTitulo = elTexto.titulo;
          //Se splitea el título del JSON con espacio para tomar cada palabra individual
          yvyTitulo = yvyTitulo.split(" ");
          yvyTitulo.forEach((palabra) => {
            yvytuHome
              .getGenericSubtitle()
              .eq(inx + 1)
              .should("contain.text", palabra);
          });

           //Verificar Párrafos
        let yvyParrafos = elTexto.parrafos;
        //"Parrafos" en el json contiene multiples parrafos
        yvyParrafos.forEach((elParrafo) => {
          cy.log(`Validar Parrafo ${inxPar}: ${elParrafo}`);

          yvytuHome
            .getGenericParrafo()
            .eq(inxPar)
            .invoke("text")
            .then((parr) => {
              cy.log(`Parrafo sin modificar: ${parr}`);
              parr = parr.replace(/\s+/g, " ").trim();
              cy.log(`Parrafo modificado: ${parr}`);
              expect(parr).to.include(elParrafo);
            });
          inxPar++;
        });
      });
    });

        
       /*yvytuHome.getGenericSubtitle()
        .eq(1)
        .should("contain.text","\n            Conocé una historia mágica. Experimentá la resiliencia de la\n            naturaleza en su mayor dimensión.\n ");
        yvytuHome.getGenericParrafo().eq(0).invoke("text").then((texto) =>{
            cy.log(texto)
            if(texto.includes('La destrucción del ecosistema de selva atlántica durante las últimas décadas fue abismal. En paralelo, la protección que usualmente brindan los gobiernos es incompleta: en general se protegen áreas aisladas entre si (lo que denominamos islas) y los recursos para su protección efectiva suelen ser escasos. Las mayores "presiones" sobre las áreas protegidas son principalmente la caza y tala furtiva, las muertes en rutas, y la invasión de areas protegidas por actividades del hombre como ser ganadería.')){
                cy.log("El texto esta contenido")
            }else{
                cy.log("El texto No esta contenido")
            }
        });.should("contain.text", '\n            La destrucción del ecosistema de selva atlántica durante las últimas\n            décadas fue abismal. En paralelo, la protección que usualmente\n            brindan los gobiernos es incompleta: en general se protegen áreas\n            aisladas entre si (lo que denominamos islas) y los recursos para su\n            protección efectiva suelen ser escasos. Las mayores "presiones"\n            sobre las áreas protegidas son principalmente la caza y tala\n            furtiva, las muertes en rutas, y la invasión de areas protegidas por\n            actividades del hombre como ser ganadería.\n          ');*/
    });

    it("Verificar Boton de Reservar", () => {
        //attr significa atributo
        yvytuHome
        .getGenericButton()
        .contains("Reservar")
        .should("have.attr", "href", "https://wa.me/5493757454400")
        .and("have.attr", "target", "_blank");
        /*yvytuHome
        .getGenericButton()
        .should("have.attr", "target", "_blank");*/
        yvytuHome
        .getGenericButton()
        .contains("Reservar")
        .should(
           "have.css", 
           "Background", 
           "rgb(34, 153, 84) none repeat scroll 0% 0% / auto padding-box border-box"
        );
    });

    it("Verficar Reel de imagenes", () => {
        let arrayImagenes = ["frase01.png","noche.png","pasafauna.png","picaflor.png","carpincho.png","frase01.png","noche.png","pasafauna.png","picaflor.png","carpincho.png","frase01.png","noche.png","pasafauna.png","picaflor.png"];

        yvytuHome.getReelImagenes().each((imagenes, index) => {
            cy.wrap(imagenes).should("have.attr" , "src", `./public/images/gallery/${arrayImagenes[index]}`);
        });
        /*let newArray = [];
        yvytuHome.getReelImagenes().each((imagen, index) => {
            cy.wrap(imagen).invoke('attr','src').then((texto) => {
                //cy.log(texto); //imprimo una variable
                cy.log(texto);
                newArray.push(texto);
            });
        }).then(() => {
            cy.log(JSON.stringify(newArray));
        });    //.first().should("exist")  */
    });

    it("Verficar Imagenes de las Cabañas", () => {
        //el **** en cy-log es para que resalte el texto que tiene dentro en negrita
        cy.log("**Todas las Imagenes tienen como texto alternativo Imagen 1**");
        //En caso de que nuesto test falle y ese error este reportado en jira, ponemos un cy.log con el numero de incidencia
        cy.log("YVYTU-015 Error texto alternativo");
        yvytuHome.getimgCabaniaYaguarete()
        .should("have.attr", "src", "./public/images/cabana-gallery/01.png")
        .and("have.attr", "alt", "Imagen 1")
        yvytuHome.getImgCabanaArasari()
        .should("have.attr", "src", "./public/images/cabana-gallery/01.png")
        .and("have.attr", "alt", "Imagen 1")
    });

    it("Verificar Boton de Donar", () => {
        //attr significa atributo
        yvytuHome
        .getGenericButton()
        .contains("Donar")
        .should("have.attr", "href", "https://cafecito.app/reserva-yvytu")
        .and("have.attr", "target", "_blank");
        /*yvytuHome
        .getGenericButton()
        .should("have.attr", "target", "_blank");*/
        yvytuHome
        .getGenericButton()
        .contains("Donar")
        .should(
           "have.css", 
           "Background", 
           "rgb(34, 153, 84) none repeat scroll 0% 0% / auto padding-box border-box"
        );
    });

    it("Visual Testing de Yvytu usando Snapshhoot", () => {
        cy.compareSnapshot("home-page");
    });

    it("Visual Testing de Yvytu usando Snapshhoot en un elemento", () => {
        yvytuHome.getMenuPillButtons().parent().compareSnapshot("botones");
    });

    it("Visual testing del boton ir arriba", () => {
        /*yvytuHome
        .getGenericSubtitle()
        .contains("Conocé una historia mágica")
        .scrollIntoView();*/

        yvytuHome
        .getIrArribaButton().should("have.css", "background", "rgb(34, 153, 84) none repeat scroll 0% 0% / auto padding-box border-box")
    });

});