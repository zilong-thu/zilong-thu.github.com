(function($){
    var toTop = ($('#sidebar').height() - $(window).height()) + 60;
    // Caption
    $('.article-entry').each(function(i) {
        $(this).find('img').each(function() {
            if (this.alt && !(!!$.prototype.justifiedGallery && $(this).parent('.justified-gallery').length)) {
                $(this).after('<span class="caption">' + this.alt + '</span>');
            }

            // 对于已经包含在链接内的图片不适用lightGallery
            if ($(this).parent().prop("tagName") !== 'A') {
                // 关掉这个特性，因为不希望用户点到图片后就跳走了
                //$(this).wrap('<a href="' + this.src + '" title="' + this.alt + '" class="gallery-item"></a>');
            }
        });
    });
    if (typeof lightGallery != 'undefined') {
        var options = {
            selector: '.gallery-item',
        };
        $('.article-entry').each(function(i, entry) {
            lightGallery(entry, options);
        });
        lightGallery($('.article-gallery')[0], options);
    }
    if (!!$.prototype.justifiedGallery) {  // if justifiedGallery method is defined
        var options = {
            rowHeight: 140,
            margins: 4,
            lastRow: 'justify'
        };
        $('.justified-gallery').justifiedGallery(options);
    }

    // Profile card
    $(document).on('click', function () {
        $('#profile').removeClass('card');
    }).on('click', '#profile-anchor', function (e) {
        e.stopPropagation();
        $('#profile').toggleClass('card');
    }).on('click', '.profile-inner', function (e) {
        e.stopPropagation();
    });

    // To Top
    if ($('#sidebar').length) {
        $(document).on('scroll', function () {
            if ($(document).width() >= 800) {
                if(($(this).scrollTop() > toTop) && ($(this).scrollTop() > 0)) {
                    $('#toTop').fadeIn();
                    $('#toTop').css('left', $('#sidebar').offset().left);
                } else {
                    $('#toTop').fadeOut();
                }
            } else {
                $('#toTop').fadeIn();
                $('#toTop').css('right', 20);
            }
        }).on('click', '#toTop', function () {
            $('body, html').animate({ scrollTop: 0 }, 600);
        });
    }

    // TOC scroll spy: highlight the heading currently being read
    var $toc = $('#toc');
    if ($toc.length) {
        var tocItems = $toc.find('.toc-link').map(function () {
            var target = document.getElementById(decodeURIComponent(this.hash.slice(1)));
            return target ? { link: $(this), target: target } : null;
        }).get();
        var $activeLink = null;
        var ticking = false;

        var updateActiveToc = function () {
            ticking = false;
            var current = null;
            for (var i = 0; i < tocItems.length; i++) {
                // A heading counts as current once it passes the top quarter of the viewport
                if (tocItems[i].target.getBoundingClientRect().top <= window.innerHeight / 4) {
                    current = tocItems[i];
                } else {
                    break;
                }
            }
            var $link = current ? current.link : null;
            if ($link && $activeLink && $link[0] === $activeLink[0]) return;
            if ($activeLink) $activeLink.removeClass('active');
            $activeLink = $link;
            if (!$link) return;
            $link.addClass('active');

            // Keep the active item visible when the TOC itself scrolls
            var tocEl = $toc[0];
            // #toc is positioned, so it is the offsetParent of its links
            var linkTop = $link[0].offsetTop;
            if (linkTop < tocEl.scrollTop || linkTop > tocEl.scrollTop + tocEl.clientHeight - 30) {
                tocEl.scrollTop = linkTop - tocEl.clientHeight / 2;
            }
        };

        $(window).on('scroll resize', function () {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(updateActiveToc);
            }
        });
        updateActiveToc();
    }

})(jQuery);
