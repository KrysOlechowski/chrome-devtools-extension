console.log("DEVTOOLS RUNNING")
chrome.devtools.panels.create("Tipser", "tipser.png", "panel.html", function (panel) {
   console.log("Panel created + panel :")
   console.log(panel)
});
// chrome.devtools.panels.elements.createSidebarPane("My Sidebar",
//    function (sidebar) {
//       // sidebar initialization code here
//       sidebar.setObject({ some_data: "Some data to show" });
//    });
