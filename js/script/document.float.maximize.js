/*
	var doc = document.getElementById('id');
	docFloatMaximize(doc);
*/

function docFloatMaximize(doc) {
    if (!doc) {
        console.error('Not found the document.');
        return;
    }

    this.setParent = function(target) {
        var parent = target.parentElement;
        if (parent.tagName === 'BODY' || parent.tagName === 'HTML') {
            return;
        }

        var _siblings = this.siblings(parent);
        if (_siblings && _siblings.length) {
            this.hideSibling(_siblings);
        }

        if (parent) {
            this.parentStyle(parent);
            this.setParent(parent);
        }
    };

    this.parentStyle = function(parent) {
        parent.style.width = '100%';
        parent.style.height = '100%';
    };

    this.hideSibling = function(o) {
        for (var i = 0; i < o.length; i++) {
            o[i].style.display = 'none';
        }
    };

    this.siblings = function(o) {
        var a = [],
            p = o.previousSibling;

        while (p) {
            if (p.nodeType === 1) {
                a.push(p);
            }
            p = p.previousSibling;
        }

        a.reverse();
        var n = o.nextSibling;
        while (n) {
            if (n.nodeType === 1) {
                a.push(n);
            }
            n = n.nextSibling;
        }

        return a;
    };

    this.initStyle = function(o) {
        o = o || doc;

        o.style.position = 'fixed';
        o.style.top = '0';
        o.style.left = '0';
        o.style.right = '0';
        o.style.bottom = '0';
        o.style.width = '100%';
        o.style.height = '100%';
        o.style.margin = '0';
        o.style.padding = '0';
        o.style.zIndex = '9999';
        o.style.border = '0';
        o.style.background = 'rgb(0, 0, 0)';
        document.body.style.overflow = 'hidden';
    };

    this.setParent(doc);
    this.initStyle();
}
