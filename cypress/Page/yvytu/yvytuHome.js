class YvytuHome{
    //Botones de Header
    getMenuPillButtons() {
        return cy.get('a[class*="rounded-full py-2 px-4"]');
    }

    getMenuAllButtons(){
        return cy.get("nav#menu-nav a");
    }

    //Banner de Imagenes
    getGenericSubtitle(){
        return cy.get("h2");
    }

    getGenericButton(){
        return cy.get("a");
    }

    //Seccion de Textos


    //Boton ir Arriba
    getIrArribaButton(){
        return cy.get("#btn-scroll-top");
    }

    //Reel de Imagenes
    getReelImagenes(){
        return cy.get('[class="slick-list draggable"]').eq(1).find("img");
    }

    //Cabañas
    getimgCabaniaYaguarete(){
        return cy.get("#slick-slide00");
    }

    getImgCabanaArasari(){
        return cy.get("#slick-slide10");
    }

    //Como llegar

    //Contacto

    //Colabora

    //Sponsor 

    //Redes

    //Footer

}

export default new YvytuHome();