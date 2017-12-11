// ==UserScript==
// @name         Pike13+
// @version      1.0
// @description  Adds some buttons to Pike13.
// @author       Alexander Sweet
// @match        https://*.pike13.com/today*
// @match        https://*.pike13.com/schedule*
// @run-at       document-load
// @require http://code.jquery.com/jquery-latest.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    //document.body.removeChild(script); // clean up
}

function AddButtons(){
    
    var back =$("#pagination > div.button.icon-arrow-left");
    var forward = $("#pagination > div.button.icon-arrow-right");

    var lw = $('<div class="button">LW</div>');
    lw.click(BackOneWeek);
    back.before(lw);

    var nw = $('<div class="button">NW</div>');
    nw.click(ForwardOneWeek);
    forward.after(nw);

    var today = $('<div class="button">Today</div>');
    today.click(GoToToday);
    forward.before(today);

    function BackOneWeek()
    {
        adjustDate(-7);
    }
    function ForwardOneWeek()
    {
        adjustDate(7);
    }

    function adjustDate(daysToAdd)
    {
        //scope.adjustDate(daysToAdd);
        angular.element($('#pagination')).scope().$apply(function(){angular.element($('#pagination')).scope().adjustDate(daysToAdd);});
    }

    function GoToToday()
    {
        angular.element($('#pagination')).scope().$apply(function(){angular.element($('#pagination')).scope().gotoDate(new Date());});
    }
}
$(window).load(function(){
    exec(AddButtons);
});
