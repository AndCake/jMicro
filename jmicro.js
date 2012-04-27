/**
 * Copyright (c) 2012 Robert Kunze [rk.klatcher at gmail dot com]
 * Licensed under the MIT license
 */
jMicro = function () {
    var value = "value", innerhtml = "innerHTML", readystatechange = "readystatechange", xmlhttprequest = XMLHttpRequest, readystate = 'readyState', responsetext = "responseText", 
	a = function (element) {
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

    a.listen = function (eventName, callback) {
        original = this["on" + eventName];
        this["on" + eventName] = function (event) {
            return (typeof original != "function" || original(event) !== false) && (callback.apply(this, [event || window.event]) === false ? false : true)
        };
        return this
    };

    a.css = function (style) {
        this.style.cssText += ";" + style;
        return this
    };

    a.down = function (selector) {
        return a(this.querySelector(selector))
    };

    a.up = function () {
        return a(this.parentNode)
    };

    a.remove = function () {
        a(this).up().removeChild(this)
    };

    a.encode = function (data) {
        var component = encodeURIComponent,
            content, all;
        if (typeof data == "string") return data;
        for (all in data) 
            typeof data[all] != "function" && (data[all][value] && (content += "&" + data[all].name + "=" + component(data[all][value])) || (content += "&" + all + "=" + component(data[all][value] || data[all])));
        return content
    };

    a.set = function (data) {
        var element = this;
        return element._m && (element[value] !== undefined && (element[value] = data) || (element[innerhtml] = data) || (element = data)) && element
    };

    a.get = function (url, callback) {
        var element = this,
            xmlrequest;
    	if(!url && !callback)return element[value] || element[innerhtml];
        (xmlrequest = a(new xmlhttprequest).listen(readystatechange, function (a) {
            xmlrequest[readystate] == 4 && (element.set(xmlrequest[responsetext]) || true) && callback && callback(xmlrequest)
        })).open("GET", url, true);
        xmlrequest.send(null)
    };

    a.post = function (url, data, callback) {
        var element = this,
            xmlrequest;
        (xmlrequest = a(new xmlhttprequest).listen(readystatechange, function (a) {
            xmlrequest[readystate] == 4 && (element.set(xmlrequest[responsetext]) || true) && callback && callback(xmlrequest)
        })).open("POST", url, true);
        xmlrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlrequest.send(a.encode(data))
    };

    a.create = function(tagName, attributes) {
        var element = document.createElement(tagName),all;
	for(all in attributes) 
	    element[all] = attributes[all];
	element = a.extend(element, this);
	return element;
    };
    
    a.add = function(content) {
        var element = this;
	if (typeof(content) != "string")
	    element.appendChild(content);
	else 
	    element[innerhtml] = element[innerhtml] + content;
	return element;
    };    

    return a
}();
