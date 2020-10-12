(function () {
    var tocContent = document.getElementById("TableOfContents");
    if (!tocContent) return;
    do {
        var li,
            ul = tocContent.querySelector("ul");
        if (!ul) {
            break;
        }
        if (ul.childElementCount !== 1) break;
        li = ul.firstElementChild;
        if (li.tagName !== "LI") break;
        ul.outerHTML = li.innerHTML;
    } while (tocContent.childElementCount >= 1);
})();

var toc = document.getElementById("toc-slider");
var topWrapper = document.getElementById("body-wrapper").offsetTop;
if (toc != null && topWrapper != null) {
    toc.classList.remove("toc-fixed");
    window.addEventListener("scroll", scrollcatelogHandler);
    function scrollcatelogHandler(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;
        var scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > topWrapper - 15) {
            toc.classList.add("toc-fixed");
        } else {
            toc.classList.remove("toc-fixed");
        }
    }
}

window.onload = function (e) {
    let orgHtmls = document.querySelectorAll("h1,h2,h3,h4,h5");
    window.addEventListener("scroll", function (e) {
        let scrollTop = window.pageYOffset;
        for (let i = 0; i < orgHtmls.length; i++) {
            const seg = orgHtmls[i];
            let nextSeg = orgHtmls.length > i + 1 ? orgHtmls[i + 1] : null;            
            let currentTag = null;
            if (nextSeg) {                
                if ( scrollTop > seg.offsetTop - 40 && scrollTop < nextSeg.offsetTop) {
                    currentTag = seg;
                }
            } else {
                if (scrollTop > seg.offsetTop - 40) {
                    currentTag = seg;
                }
            }
            if (currentTag) {
                let element = document
                    .getElementById("toc-slider")
                    .querySelectorAll("a");
                for (const ele of element) {
                    ele.classList.remove("highlighted");
                }
                let ele2 = document
                    .getElementById("toc-slider")
                    .querySelector("a[href='#" + seg.id + "']");
                if (ele2) {
                    ele2.classList.add("highlighted");
                }
            }
        }
    });
};
