// "scripts": ["background.js"],
// "persistent": false przeczytać o tym...
var contextMenuItem = {
   "id": "open",
   "title": "open",
   "contexts": ["all"],
   "type": "radio"
}

chrome.contextMenus.create(contextMenuItem)

chrome.contextMenus.onClicked.addListener(function (clickData) {
   console.log(clickData)
   if (clickData.menuItemId == "open" && clickData.selectionText) {
      console.log('EVENTPAGE.JS')

   }
})
