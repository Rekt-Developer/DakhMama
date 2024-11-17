(function(e) {
    "use strict";
    
    // Initialiser la hauteur de la top-bar (si elle existe)
    var s = e(".top-bar").length > 0 ? e(".top-bar").height() : 0;
    
    // Gérer les clics sur les éléments du menu
    e(".vfx-item-nav li a").click(function() {
        var parent = e(this).parent();
        parent.toggleClass("hover");
    });
    
    e(".vfx-item-nav li span.arrow").click(function() {
        var parent = e(this).parent();
        parent.toggleClass("hover");
    });
    
    e(".search-parent > a").click(function() {
        var parent = e(this).parent();
        parent.toggleClass("active");
        e(".cart-parent").removeClass("active");
        e("#menu").removeClass("in");
    });
    
    e(".cart-parent > a").click(function() {
        var parent = e(this).parent();
        parent.toggleClass("active");
        e(".search-parent").removeClass("active");
        e("#menu").removeClass("in");
    });
    
    e(".close-btn").click(function() {
        e(".search-parent").removeClass("active");
        e("#menu li").removeClass("hover");
        e(".cart-parent").removeClass("active");
    });
    
    e(".menu-icon").click(function() {
        e(".search-parent").removeClass("active");
        e(".cart-parent").removeClass("active");
    });
    
    e("#menu li").click(function() {
        if (e(window).width() < 1001) {
            e(".search-parent").removeClass("active");
            e(".cart-parent").removeClass("active");
        }
    });

    // Gérer le comportement de la navbar au scroll
    var a = 0;
    e(window).scroll(function() {
        if (e(window).width() > 1000) {
            if (e(window).scrollTop() > 200 + s) {
                // Applique la classe 'pin' pour fixer la navbar en haut
                e(".header-section").addClass("pin");
            } else {
                // Remet la navbar à sa position normale
                e(".header-section").removeClass("pin");
            }
        }

        // Réinitialiser la navbar et menu si la fenêtre est trop petite
        if (e(window).width() < 1001) {
            if (e(window).scrollTop() < a) {
                e(".header-section").addClass("off").removeClass("woff").removeAttr("style");
                e("#menu").removeClass("in");
                e(".search-parent").removeClass("active");
                e(".cart-parent").removeClass("active");
                a = 0;
            }
        }

        // Gérer l'état de la navbar quand on scrolle
        if (e(window).scrollTop() > s) {
            e(".header-section").hasClass("woff") || e(".header-section").addClass("pin-start").addClass("off");
        } else {
            e(".header-section").removeClass("pin-start").removeClass("off");
        }
    });

    // Assurez-vous que la navbar reste fixée en haut au démarrage
    if (e(window).scrollTop() > 150 + s) {
        e(".header-section").addClass("pin");
    } else {
        e(".header-section").removeClass("pin");
    }

    // Gérer la réinitialisation de la navbar lors du redimensionnement de la fenêtre
    e(window).resize(function() {
        if (e(window).width() > 1000) {
            e(".header-section").removeAttr("style");
        }
    });

    // Gérer le clic sur l'icône du menu pour afficher/masquer le menu
    e(".menu-icon").click(function() {
        if (e("#menu").hasClass("in")) {
            e(".header-section").addClass("off").removeClass("woff").removeAttr("style");
            if (e(window).scrollTop() > s) {
                e(".header-section").hasClass("woff") || e(".header-section").addClass("pin-start").addClass("off");
            } else {
                e(".header-section").removeClass("pin-start").removeClass("off");
            }
        } else {
            a = e(window).scrollTop();
            e(".header-section").removeClass("off").addClass("woff").css({top: e(window).scrollTop()});
        }
    });

    // Gérer le clic sur l'icône du panier pour afficher/masquer le panier
    e(".cart-parent > a").click(function() {
        if (e(window).width() < 1001) {
            if (e(".cart-parent").hasClass("active")) {
                a = e(window).scrollTop();
                e(".header-section").removeClass("off").addClass("woff").css({top: e(window).scrollTop()});
            } else {
                e(".header-section").addClass("off").removeClass("woff").removeAttr("style");
                if (e(window).scrollTop() > s) {
                    e(".header-section").hasClass("woff") || e(".header-section").addClass("pin-start").addClass("off");
                } else {
                    e(".header-section").removeClass("pin-start").removeClass("off");
                }
            }
        }
    });

    // Gérer le clic sur l'icône de recherche pour afficher/masquer la recherche
    e(".search-parent > a").click(function() {
        if (e(window).width() < 1001) {
            if (e(".search-parent").hasClass("active")) {
                a = e(window).scrollTop();
                e(".header-section").removeClass("off").addClass("woff").css({top: e(window).scrollTop()});
            } else {
                e(".header-section").addClass("off").removeClass("woff").removeAttr("style");
                if (e(window).scrollTop() > s) {
                    e(".header-section").hasClass("woff") || e(".header-section").addClass("pin-start").addClass("off");
                } else {
                    e(".header-section").removeClass("pin-start").removeClass("off");
                }
            }
        }
    });
})(jQuery);
