jMicro = function () {
    var a = function (element) {
            return a.extend(typeof element == "string" && document.getElementById(element) || element, a)
        };
    a.elize = function (a, b) {
        var c = a;
        return function () {
            return c.apply(b, arguments)
        }
    };
    a.extend = function (b, c) {
        b._m = 1;
        for (var d in c) typeof c[d] == "function" && (b[d] = a.elize(c[d], b));
        return b
    };
    a.listen = function (a, b) {
        o = this["on" + a];
        this["on" + a] = function (a) {
            return (typeof o != "function" || o(a) !== false) && (b.apply(this, [a || window.event]) === false ? false : true)
        };
        return this
    };
    a.css = function (a) {
        this.style.cssText += ";" + a;
        return this
    };
    a.down = function (b) {
        return a(this.querySelector(b))
    };
    a.up = function () {
        return a(this.parentNode)
    };
    a.remove = function () {
        a(this).up().removeChild(this)
    };
    a.encode = function (a) {
        var b = encodeURIComponent,
            c, d;
        if (typeof a == "string") return a;
        for (d in a) typeof a[d] != "function" && (a[d].value && (c += "&" + a[d].name + "=" + b(a[d].value)) || (c += "&" + d + "=" + b(a[d].value || a[d])));
        return c
    };
    a.set = function (a) {
        var b = this;
        return b._m && (b.value !== undefined && (b.value = a) || (b.innerHTML = a) || (b = a)) && b
    };
    a.get = function (b, callback) {
        var d = this,
            e;
        (e = a(new XMLHttpRequest).listen("readystatechange", function (a) {
            e.readyState == 4 && (d.set(e.responseText) || true) && c && c(e)
        })).open("GET", b, true);
        e.send(null)
    };
    a.post = function (b, c, d) {
        var e = this,
            f;
        (f = a(new XMLHttpRequest).listen("readystatechange", function (a) {
            f.readyState == 4 && (e.set(f.responseText) || true) && d && d(f)
        })).open("POST", b, true);
        f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        f.send(a.encode(c))
    };
    return a
}();