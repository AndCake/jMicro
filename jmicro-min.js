jMicro=function(){var v="value",i="innerHTML",r="readystatechange",x=XMLHttpRequest,s='readyState',t="responseText";var a=function(e){return a.extend(typeof e=="string"&&document.getElementById(e)||e,a)};a.elize=function(a,b){var c=a;return function(){return c.apply(b,arguments)}};a.extend=function(b,c){b._m=1;for(var d in c)typeof c[d]=="function"&&(b[d]=a.elize(c[d],b));return b};a.listen=function(a,b){o=this["on"+a];this["on"+a]=function(a){return(typeof o!="function"||o(a)!==false)&&(b.apply(this,[a||window.event])===false?false:1)};return this};a.css=function(a){this.style.cssText+=";"+a;return this};a.down=function(b){return a(this.querySelector(b))};a.up=function(){return a(this.parentNode)};a.remove=function(){a(this).up().removeChild(this)};a.encode=function(a){var b=encodeURIComponent,c,d;if(typeof a=="string")return a;for(d in a)typeof a[d]!="function"&&(a[d][v]&&(c+="&"+a[d].name+"="+b(a[d][v]))||(c+="&"+d+"="+b(a[d][v]||a[d])));return c};a.set=function(a){var b=this;return b._m&&(b[v]!==undefined&&(b[v]=a)||(b[i]=a)||(b=a))&&b};a.get=function(b,c){var d=this,e;if(!b&&!c)return d[v]||d[i];(e=a(new x).listen(r,function(a){e[s]==4&&(d.set(e[t])||1)&&c&&c(e)})).open("GET",b,true);e.send(null)};a.post=function(b,c,d){var e=this,f;(f=a(new x).listen(r,function(a){f[s]==4&&(e.set(f[t])||1)&&d&&d(f)})).open("POST", b, true);f.setRequestHeader("Content-Type","application/x-www-form-urlencoded");f.send(a.encode(c))};a.create=function(n,b){var i,e=document.createElement(n);for(i in b)e[i]=b[i];e=a.extend(e,this);return e};a.add=function(c){var d=this;if(typeof(c)!="string")d.appendChild(c);else d[i]=d[i]+c;return d};return a}();