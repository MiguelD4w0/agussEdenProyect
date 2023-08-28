class YvytuHome{
    getMenuPillButtons() {
        return cy.get('a[class*="rounded-full py-2 px-4"]');
    }

    getMenuAllButtons(){
        return cy.get("nav#menu-nav a");
    }

    getIrArribaButton(){
        return cy.get("#btn-scroll-top");
    }

    getGenericSubtitle(){
        return cy.get("h2");
    }
}

export default new YvytuHome();