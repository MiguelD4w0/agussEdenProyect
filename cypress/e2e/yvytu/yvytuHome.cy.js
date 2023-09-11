/// <reference types="cypress" />

//Escribir los test en el orden que van apareciendo en la web los elementos

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

    it("Verificar Imagenes del Banner Principal", () => {
        /*yvytyHome.getImagenesBanner().each((imagen) => {
            cy.wrap(imagen).should("exist");
        });*/
        cy.log("Revisar el test");
        yvytyHome.getImagenesBanner().eq(0).should("be.visible");
        yvytyHome.getImgButton().eq(1).click();
        yvytyHome.getImagenesBanner().eq(1).should("be.visible");
        yvytyHome.getImgButton().eq(2).click();
        yvytyHome.getImagenesBanner().eq(2).should("be.visible")
        yvytyHome.getImgButton().last().click();
        yvytyHome.getImagenesBanner().eq(3).should("be.visible")
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

    it("Verificar textos de la pagina", () =>{
        yvytyHome.getGenericSubtitle()
        .eq(1)
        .should("contain.text","\n            Conocé una historia mágica. Experimentá la resiliencia de la\n            naturaleza en su mayor dimensión.\n ");
        yvytyHome.getGenericParrafo().eq(0).invoke("text").then((texto) =>{
            cy.log(texto)
            if(texto.includes('La destrucción del ecosistema de selva atlántica durante las últimas décadas fue abismal. En paralelo, la protección que usualmente brindan los gobiernos es incompleta: en general se protegen áreas aisladas entre si (lo que denominamos islas) y los recursos para su protección efectiva suelen ser escasos. Las mayores "presiones" sobre las áreas protegidas son principalmente la caza y tala furtiva, las muertes en rutas, y la invasión de areas protegidas por actividades del hombre como ser ganadería.')){
                cy.log("El texto esta contenido")
            }else{
                cy.log("El texto No esta contenido")
            }
        });/*.should("contain.text", '\n            La destrucción del ecosistema de selva atlántica durante las últimas\n            décadas fue abismal. En paralelo, la protección que usualmente\n            brindan los gobiernos es incompleta: en general se protegen áreas\n            aisladas entre si (lo que denominamos islas) y los recursos para su\n            protección efectiva suelen ser escasos. Las mayores "presiones"\n            sobre las áreas protegidas son principalmente la caza y tala\n            furtiva, las muertes en rutas, y la invasión de areas protegidas por\n            actividades del hombre como ser ganadería.\n          ');*/
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

    it("Verficar Reel de imagenes", () => {
        let arrayImagenes = ["frase01.png","noche.png","pasafauna.png","picaflor.png","carpincho.png","frase01.png","noche.png","pasafauna.png","picaflor.png","carpincho.png","frase01.png","noche.png","pasafauna.png","picaflor.png"];

        yvytyHome.getReelImagenes().each((imagenes, index) => {
            cy.wrap(imagenes).should("have.attr" , "src", `./public/images/gallery/${arrayImagenes[index]}`);
        });
        /*let newArray = [];
        yvytyHome.getReelImagenes().each((imagen, index) => {
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
        yvytyHome.getimgCabaniaYaguarete()
        .should("have.attr", "src", "./public/images/cabana-gallery/01.png")
        .and("have.attr", "alt", "Imagen 1")
        yvytyHome.getImgCabanaArasari()
        .should("have.attr", "src", "./public/images/cabana-gallery/01.png")
        .and("have.attr", "alt", "Imagen 1")
    });

    it("Verificar Boton de Donar", () => {
        //attr significa atributo
        yvytyHome
        .getGenericButton()
        .contains("Donar")
        .should("have.attr", "href", "https://cafecito.app/reserva-yvytu")
        .and("have.attr", "target", "_blank");
        /*yvytyHome
        .getGenericButton()
        .should("have.attr", "target", "_blank");*/
        yvytyHome
        .getGenericButton()
        .contains("Donar")
        .should(
           "have.css", 
           "Background", 
           "rgb(34, 153, 84) none repeat scroll 0% 0% / auto padding-box border-box"
        );
    });



});