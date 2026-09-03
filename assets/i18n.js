/*
 * Language switcher: English (default) / Spanish (secondary).
 *
 * The markup holds the English copy. Any element that needs a translation
 * carries a data-es attribute with its Spanish text. The chosen language is
 * stored in localStorage so it survives navigation between pages.
 */
(function () {
    var STORAGE_KEY = 'spookydev-lang';
    var DEFAULT_LANG = 'en';

    function readLang() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            return saved === 'es' || saved === 'en' ? saved : DEFAULT_LANG;
        } catch (e) {
            return DEFAULT_LANG;
        }
    }

    function saveLang(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            /* storage unavailable: the language simply is not remembered */
        }
    }

    function apply(lang) {
        document.documentElement.lang = lang;

        var nodes = document.querySelectorAll('[data-es]');
        for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            if (!el.hasAttribute('data-en')) {
                el.setAttribute('data-en', el.textContent.replace(/\s+/g, ' ').trim());
            }
            el.textContent = el.getAttribute(lang === 'es' ? 'data-es' : 'data-en');
        }

        var toggles = document.querySelectorAll('.lang-toggle');
        for (var j = 0; j < toggles.length; j++) {
            var btn = toggles[j];
            var label = btn.querySelector('.lang-toggle-text');
            if (label) label.textContent = lang === 'es' ? 'EN' : 'ES';
            btn.setAttribute('aria-label', lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish');
        }
    }

    function init() {
        var lang = readLang();
        apply(lang);

        var toggles = document.querySelectorAll('.lang-toggle');
        for (var i = 0; i < toggles.length; i++) {
            toggles[i].addEventListener('click', function () {
                lang = lang === 'es' ? 'en' : 'es';
                saveLang(lang);
                apply(lang);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
