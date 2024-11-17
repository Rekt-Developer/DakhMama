(function(e) {
    "use strict";
    
    // Vérification de la hauteur de la top bar si elle existe
    var s = e(".top-bar").length > 0 ? e(".top-bar").height() : 0;
    
    // Gestion du comportement de la navbar pendant le scroll
    var a = 0;
    e(window).scroll(function() {
      if (e(window).width() > 1000) {
        if (e(window).scrollTop() > 200 + s) {
          // Applique la classe 'pin' pour fixer la navbar en haut
          e(".header-section").addClass("pin");
        } else {
          // Remet la navbar à sa position normale lorsque l'on est en haut
          e(".header-section").removeClass("pin");
        }
        
        // Applique un autre style pour la navbar si on descend plus bas
        if (e(window).scrollTop() > 150 + s) {
          e(".header-section").addClass("before");
        } else {
          e(".header-section").removeClass("before");
        }
      } else {
        // Lorsque la largeur est petite (mobile), on ajuste la navbar en fonction du scroll
        if (e(window).scrollTop() < a) {
          e(".header-section").removeClass("pin");
          a = 0;
        }
        if (e(window).scrollTop() > s) {
          e(".header-section").addClass("pin");
        } else {
          e(".header-section").removeClass("pin");
        }
      }
    });
    
    // Assurez-vous que la navbar reste fixée à son état au début
    e(window).scrollTop() > 150 + s ? e(".header-section").addClass("pin") : e(".header-section").removeClass("pin");
    
  })(jQuery);
  