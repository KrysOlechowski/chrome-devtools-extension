console.log("PANEL.JS RUNNING...")
const numberOfCalls = document.getElementById("numberOfCalls")
let numberOfCallsCounter = 0

const checkEnv = (env) => {
   if (env.includes('prod-')) {
      return 'prod'
   } else if (env.includes('dev-')) {
      return 'dev'
   }
   return 'stage'
}


chrome.devtools.network.onRequestFinished.addListener(request => {
   request.getContent((body) => {
      if (request.request && request.request.url) {
         if (request.request.url.includes('collections') || request.request.url.includes('products')) {
            const env = checkEnv(request.request.url)
            console.log("mamy req z t3")
            numberOfCallsCounter++
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
               chrome.tabs.sendMessage(tabs[0].id, {
                  response: body,
                  env: env
               });
            });

            numberOfCalls.innerHTML = numberOfCallsCounter
         }
      }
   });
});
