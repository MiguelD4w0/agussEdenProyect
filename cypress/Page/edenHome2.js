//Page Object de eden2.cy
class EdenHome2{

    getSubTitles(){
        return cy.get("h5");
    }
}

export default new EdenHome2();