class YvytuHome{
    getMenuPillButtons() {
        return cy.get('a[class*="rounded-full py-2 px-4"]');
    }

    getMenuAllButtons(){
        return cy.get("nav#menu-nav a");
    }
}

export default new YvytuHome();