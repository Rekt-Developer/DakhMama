!function(e) {
    "use strict";

    var s = e(".top-bar").length > 0 ? e(".top-bar").height() : 0;

    // Fonction pour gérer le comportement dynamique de la navbar sur grands écrans
    function handleLargeScreen() {
        e(window).on("scroll.large", function() {
            if (e(window).scrollTop() > 200 + s) {
                e(".header-section").removeAttr("style").addClass("pin");
            } else {
                e(".header-section").css({ top: -e(window).scrollTop() }).removeClass("pin");
            }
            if (e(window).scrollTop() > 150 + s) {
                e(".header-section").addClass("before");
            } else {
                e(".header-section").removeClass("before");
            }
        });
    }

    // Fonction pour gérer le comportement fixe de la navbar sur écrans étroits
    function handleSmallScreen() {
        e(window).off("scroll.large"); // Supprime les événements liés aux grands écrans
        e(".header-section").addClass("pin").css({
            position: "fixed",
            top: "0",
            width: "100%"
        });
    }

    // Fonction principale pour gérer le comportement selon la largeur de l'écran
    function updateNavbar() {
        if (e(window).width() > 1000) {
            e(".header-section").removeClass("pin").removeAttr("style"); // Réinitialise pour les grands écrans
            handleLargeScreen(); // Active le comportement dynamique
        } else {
            handleSmallScreen(); // Active le comportement fixe
        }
    }

    // Exécuter lors du chargement et du redimensionnement
    updateNavbar();
    e(window).resize(updateNavbar);

    // Gestion des clics pour le menu, recherche et panier
    e(".vfx-item-nav li a, .vfx-item-nav li span.arrow").click(function() {
        var parent = e(this).parent();
        parent.hasClass("hover") ? parent.removeClass("hover") : parent.addClass("hover");
    });

    e(".search-parent > a, .cart-parent > a").click(function() {
        var parent = e(this).parent();
        var isSearch = parent.hasClass("search-parent");

        parent.hasClass("active") ? parent.removeClass("active") : parent.addClass("active");
        e(isSearch ? ".cart-parent" : ".search-parent").removeClass("active");
        e("#menu").removeClass("in");
    });

    e(".close-btn").click(function() {
        e(".search-parent, .cart-parent").removeClass("active");
        e("#menu li").removeClass("hover");
    });

    e(".menu-icon").click(function() {
        e(".search-parent, .cart-parent").removeClass("active");
    });

    e("#menu li").click(function() {
        if (e(window).width() < 1001) {
            e(".search-parent, .cart-parent").removeClass("active");
        }
    });
}(jQuery);
