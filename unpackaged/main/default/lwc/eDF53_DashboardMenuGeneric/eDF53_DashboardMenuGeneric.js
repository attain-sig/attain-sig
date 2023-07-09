import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class EDF53_DashboardMenuGeneric extends NavigationMixin(LightningElement) {

    @api labelThankYou;
    @track pills = [];
    @api pillNames;
    @api pillURLs;

    navigateTo(event) {
        let navigateTo = event.currentTarget.dataset.navigateto;
        console.log(navigateTo);
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: navigateTo
            }
        });
    }

    connectedCallback() {
        let names = this.pillNames.split('|');
        let urls = this.pillURLs.split('|');
        for (let i = 0; i < names.length; i++) {
            let pill = {};
            pill.name = names[i].trim();
            pill.url = urls[i].trim();
            pill.counter = ''+i;
            if (pill.url == 'home') pill.counter = ' ';
            this.pills.push(pill);
        }
    }

}