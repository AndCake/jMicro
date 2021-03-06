=============
jMicro v0.0.3
=============

jMicro is a micro javascript framework with a super-small footprint (818 Bytes gzipped) and capable of doing the most important things that a typical javascript framework should do. This framework is best suited for the mobile sector due to it's size and the fact that it's not fully backwards compatible to old Internet Explorer versions. It has a similar syntax to PrototypeJS. See the API documentation below. A small example on how this looks like::

  var $ = jMicro;
  // attach a click handler for the mybutton element
  $("mybutton").listen("click", function(event) {
  	// do an AJAX post to the server, sending the values of the form elements
  	$("content").post("cgi-bin/postTarget.cgi", $("connectForm").elements);
  	return false;	// cancel event bubbling
  });


API Documentation
-----------------

| ``jMicro(element) -> jMicro``
- element (String|Object) - the ID of an element which should be retrieved or the element itself

This function retrieves a jMicro object, which wraps an element (DOM or any other). You can then access all the methods that belong to jMicro objects.

*Example*:: 

  <div id="mydiv"></div>
  <script type="text/javascript">
  	jMicro("mydiv").appendChild(document.createTextNode("Test"));
  </script>

|
|
| ``jMicro#listen(event, callback) -> jMicro``
- event (String) - the event name to add an event listener for (like "click" or "submit")

binds an event listener of the current element to it. Handlers are attached to the currently selected elements in the jMicro object, so those elements must exist at the point the call to .listen() occurs. By returning false within the callback function, event bubbling can be stopped. The functions returns a jMicro object of the element that the event was attached at.

*Example*::

  <div id="si">Hello, World!</div>
  <script type="text/javascript">
    $("si").listen("click", function(event) { 
      alert("Clicked!");
    });
  </script> 

This example demonstrates how to attach a click event to a div.

|
|
| ``jMicro#css(style) -> jMicro``

- style (String) - the CSS style description that should be applied to the current element

Sets the current element's style to the given one. Existing style definitions won't be removed before adding the style definition. The function returns a jMicro object of the element the styles were applied to.

*Example*::

  <div id="si" style="color: blue; font-style: italic;">Hello, World!</div>
  <script type="text/javascript">
    jMicro("si").css("color: red");
  </script>

After the function is executed, the color of the text will be red instead of blue, but it will remain italic.

|
|
| ``jMicro#down(selector) -> jMicro``

- selector (String) - CSS selector

retrieves the element given by the CSS selector relative to the current element. The function returns a jMicro object of the element that was retrieved.

*Example*::

  <div id="si">
    <ul>
      <li>Test 1</li>
      <li>Test 2</li>
    </ul>
  </div>
  <script type="text/javascript">
    alert( jMicro("si").down("li:last-child").get() );
  </script>

The example will show an alert window with "Test 2" printed on it.

|
|
| ``jMicro#up() -> jMicro``

Retrieves the current element's parent node and wraps it into a jMicro object. That one is returned.

*Example*::

  <div>
    <ul>
      <li>Test 1</li>
      <li id="me">Test 2</li>
    </ul>
  </div>
  <script type="text/javascript">
    alert(jMicro("me").up().tagName);
  </script>

The example will show an alert window with "UL" appearing in there, as that is the LI's parent node.

|
|
| ``jMicro#remove() -> void``
  
Removes the current element from the DOM tree.

*Example*::

  <div>Test <p id="me">another one</p></div>
  <script type="text/javascript">
    jMicro("me").remove();
  </script>

The resulting page will only show "Test", as the P tag is completely removed from the DOM.

|
|
| ``jMicro.encode(data) -> String``

- data (Array|Object) - an array of elements or a hash map containing the data to be encoded

Encodes an array of form elements or a hash map into POST body format / GET parameter format.

*Example*::

  <script type="text/javascript">
    alert( jMicro.encode([{
      name: "Test User",
      email: "me@example.org"
    }]) );
  </script>

This example will show an alert window that prints out something like "&name=Test+User&email=me%64example.org".

|
|
| ``jMicro#set(content) -> Object``

- content (String) - the value to set

Sets the value attribute or the innerHTML of the current element to the specified value. In case the current element is a form element, it will set it's value attribute, else it will try to set it's innerHTML. The returned object is a jMicro object of the current element.

*Example*::

  <div id="me"></div>
  <input type="hidden" name="foo"/>
  <script type="text/javascript">
    jMicro("me").set("Test").up().down("input").set("bar");    
  </script>

This example will set make the DIV tag with ID "me" contain the text "Test" and change the INPUT field to have a value of "bar".

|
|
| ``jMicro#get([url[, callback]]) -> void|String``
|
| ``jMicro.get(url[, callback]) -> void``

- url (String) - the URL to load
- callback (Function) - the callback function to execute once the content has been loaded successfully.

This function will do an AJAX request to load the specified URL. The XMLHttpRequest object is passed to the callback function. If there is a current element, the jMicro#set() function will be called automatically onto it with the responseText as content. This will happen before the callback is executed. In case all parameters are omitted, this method will return the current item's content (in case it's a form field, it will be the value, else the content is represented through the tag's innerHTML). 

*Example*::

  <input type="text" name="foo" id="me"/>
  <script type="text/javascript">
    jMicro("me").get("bar.txt");
    jMicro.get("cgi-bin/listPages.cgi", function(req) {
      alert("Loaded: "+req.responseText);
    });
    alert("content of 'me': "+jMicro("me").get());
  </script>

This example does two AJAX requests: the first one loads the content of bar.txt into the input field. The second one will show an alert window with the result of another page. The third call of the get function will alert the value of element "me".

|
|
| ``jMicro#post(url, data[, callback]) -> void``
|
| ``jMicro.post(url, data[, callback]) -> void``

- url (String) - the URL to post to
- data (Array|Object) - an array of elements or a hash map containing the data to be encoded
- callback (Function) - the callback function to execute once the POST did succeed.

The function will do an AJAX POST request. It will POST the given data to the specified URL. In case a callback function is provided, that one will be called with the first parameter being the XMLHttpRequest object containing the server's answer. If there is a current element, the jMicro#set() function will be called automatically onto it with the responseText as content. This will happen before the callback is executed.

*Example*::

  <form id="connectForm">
    <input type="text" name="user" value="test user"/>
    <input type="password" name="pass" value="1234321"/>
    <input type="date" name="loginDate" value="2012-03-09"/>
    <div id="content"></div>
  </form>
  <script type="text/javascript">
    jMicro("content").post("cgi-bin/postTarget.cgi", jMicro("connectForm").elements);
  </script>

The example will do a POST request to a CGI page and write the results into the DIV with ID "content". The data that is posted to the server, contains all form fields.

|
|
| ``jMicro.create(tagName, attributes) -> jMicro``

- tagName (String) - the name of the tag to be created
- attributes (Object) - a JSON object describing the attributes the newly created element, should be <name>:<value>

The function creates a new DOM element, but does not add it to the DOM tree. The new element will receive all the attributes given. The DOM element created is wrapped into a jMicro object and returned.

*Example*::

  <script type="text/javascript">
    var img = jMicro.create("img", {src: "static/images/test.png", alt: ""});
    jMicro(document.body).add(img);
  </script>

The example will create a new IMG tag and append it to the document's body.

|
|
| ``jMicro#add(data) -> jMicro``

- data (String|jMicro|DOMElement) - the data to be added/appended to the current element

The method appends the given data to the current element. The element the data has been appended to is returned as a jMicro object.

*Example*::

  <div id="content"></div>
  <script type="text/javascript">
    jMicro("content").add("test").add(jMicro.create("hr"));
  </script>

The example will insert the text "test" into the div with the ID "content". After that, it will also add a <HR> tag to it.
