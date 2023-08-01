import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const onHeadingClick = (isChild, template) => {
    let symbol = '';
    if (isChild) {
        let content = template.querySelector('.content');
        content.classList.toggle("active");
        if (content.style.display === "block") {
            content.style.display = "none";
            content.style.maxHeight = 0;
            symbol = '+';
        }
        else {
            content.style.display = "block";
            content.style.maxHeight = (content.scrollHeight + 100) + "px";
            symbol = '−';
        }
    }
    return symbol;
}

const createShowToastEvent = (titleTxt, variantType, msgTxt) => {
    return new ShowToastEvent({
        title: titleTxt,
        message: msgTxt,
        variant: variantType
    });
}


const validateFields = (inputFields) => {
    let isValid = true;
    inputFields.forEach(inputField => {
        if (!inputField.checkValidity()) {
            inputField.reportValidity();
            inputField.focus();
            isValid = false;
        }
    });
    return isValid;
}


export { onHeadingClick, createShowToastEvent, validateFields };

export default class EdfCommonUtils extends LightningElement {

}