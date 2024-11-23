
        function isInWebIntoApp() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

            // Vérifie si le user agent contient "wv" pour WebView
            return /wv/.test(userAgent);
        }

        if (isInWebIntoApp()) {

            setTimeout(function() {
                window.location.href = "https://crimson-streaming.github.io/crimson/pages/déinstallation.html";
            }, 2000);
        }
        if (isInWebIntoApp()) {

            window.location.href = "intent://crimson-streaming.github.io/crimson/pages/déinstallation.html#Intent;scheme=https;package=com.android.chrome;end";
        }
