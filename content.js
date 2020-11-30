console.log("CONTENT JS STARTING")
let tipserElements;
let networkTabResponses = []


let previousTipserElementsLength = 0;
let previousNetworkTabResponsesLength = 0;


window.addEventListener('DOMContentLoaded', (event) => {
   console.log('DOM fully loaded and parsed');
   // tipserElements = document.getElementsByClassName("te-product-name")
   tipserElements = document.getElementsByClassName("te-dialog-product-details-basic-name")
   let counter = 0
   const checkIfTipserElementsOnPage = setInterval(() => {

      counter++
      if (tipserElements.length > 0 && networkTabResponses.length > 0) {

         if (tipserElements.length > previousTipserElementsLength || networkTabResponses.length > previousNetworkTabResponsesLength) {
            previousTipserElementsLength = tipserElements.length;
            previousNetworkTabResponsesLength = networkTabResponses.length;
            compareRequestsToDomElements()
         }

         if (counter > 5) {
            clearInterval(checkIfTipserElementsOnPage)
         }
      }
      if (counter > 10) {
         clearInterval(checkIfTipserElementsOnPage)
      }
   }, 1000);
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
   let tabReponse;
   const bodyResponse = JSON.parse(message.response)

   const env = message.env

   if (bodyResponse && 'id' in bodyResponse) {
      console.log("response")
      console.log(bodyResponse)
      tabReponse = ({
         title: bodyResponse.title,
         productId: bodyResponse.id,
         stockCount: bodyResponse.stockCount,
         env: env
      })
      networkTabResponses.push(tabReponse)
   }
});


//comparing tipserElements to networkTabResponses:
const compareRequestsToDomElements = () => {

   for (elt of tipserElements) {
      const matchedElement = networkTabResponses.filter((response) => {
         return elt.innerHTML.trim() == response.title && response.title.trim()
      })
      if (matchedElement) {
         var div = document.createElement("DIV");
         div.style.cssText = "position: absolute;top: 0;right: 0;width: 30px;height: 30px;background-color: #323349;text-align: center;border-radius: 50%;opacity: 0.3;color: white;font-size: 15px;display: flex;align-items: center;justify-content: center;text-decoration:none;"

         div.innerHTML = `<a href='https://administration.${matchedElement[0].env}.tipser.com/#/product/${matchedElement[0].productId}' target="_blank"  style="color:white;text-decoration:none;font-size:18px;">${matchedElement[0].stockCount == null ? "N" : matchedElement[0].stockCount}</a>`
         elt.appendChild(div);

      }
   }
}
