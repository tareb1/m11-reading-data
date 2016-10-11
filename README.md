# Module 11: Reading data

## Overview
As the size and complexity of a website increases, web-content is often driven by an underlying data source. Whether it's a simple table, a complex visualization, or a tweet, the data for your page is best stored somewhere else, and loaded into your site.

There are numerous approaches for querying data into a web application, and this module introduces three common methods. These were selected because of their popularity, usability with different data types, and ability to be integrated into various applications.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Contents**

- [Resources](#resources)
- [Asynchronous Requests](#asynchronous-requests)
  - [Callback Functions](#callback-functions)
  - [Method Chaining](#method-chaining)
- [jQuery AJAX Calls](#jquery-ajax-calls)
- [PapaParse](#papaparse)
- [D3 Methods](#d3-methods)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Resources

- [jQuery GET and POST methods](http://www.w3schools.com/jquery/jquery_ajax_get_post.asp) (_w3schools_)
- [jQuery AJAX Docs](http://api.jquery.com/jQuery.ajax/)
- [jQuery Shorthand Docs](https://api.jquery.com/category/ajax/shorthand-methods/)
- [jQuery Defered Objects](http://api.jquery.com/category/deferred-object/)
- [JavaScript Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [D3.csv Docs](https://github.com/mbostock/d3/wiki/CSV)

## Asynchronous Requests
In order to ensure a smooth browser experience, most data request methods are structured (or defaulted) to occur **asynchronously**. Essentially, this means that the code that follows your data request will run before information has been returned to your page. As a result, you are unable to reference the requested information in your subsequent lines of code because they will execute **_before the request completes_**. In pseudo code, it looks something like this:

```javascript
// Define a global variable to store our data
var myData;

// Define `getData` as a function that performs an AJAX request,
// and sets the variable `myData` equal to the data that is retrieved
var getData = function() {

  // Go and get data (syntax describe below)
  var requestedData = ASYNC-DATA-REQUEST; // pseudo-code here

  // Set your global variable `myData` to the returned values
  myData; = requestedData;
};

// Run the `getData` function
getData();

// Log the `myData` variable: prints "undefined", because `getData` had not yet retrieved the data
console.log(myData);
```

### Callback Functions

 This can introduce a significant challenge for people getting started with JavaScript. However, there is a standard and straightforward solution to this challenge: the use of **callback** functions. A callback function will execute _**after**_ a request is complete. This is perhaps best explained through an AJAX call example (more detail on that below):

 ```javascript
// A global variable to hold your data
var myData;

// A method that accepts two parameters: a URL to a data resource,
// and a `callback` function, which will be executed when the server request completes:
$.get('PATH-TO-DATA', function(data, error) {

  // Set `mData` as the data returned by your request
  myData = data;

  // Run a function that uses `myData`.
  buildPage();
});
 ```

The second parameter to the function about is our **callback** function. It will wait for the request to come back, and use the information returned by the request inside of the function body. AJAX requests typically pass two parameters into their callback function. In the example above, we use the variable names `error`, which contains information about what may have caused a rejection, and `data`, which contains the information returned by the call. Note, you can use an anonymous function for your callback (as in the example above), or using a named function, as seen here:

```javascript
// A global variable to hold your data
var myData;

// A callback function to process the data retrieved by the AJAX call
var processData = function(error, data) {

  // Set `mData` as the data returned by your request
  myData = data;

  // Run a function that uses `myData`.
  buildPage();
};

// A method that accepts two parameters: a URL to a data resource,
// and a `callback` function, which will be executed when the server request completes:
$.get('PATH-TO-DATA', processData);
```

### Method Chaining
Another common structure for working with asynchronous requests is to **chain** different methods together. You'll notice in the example above we didn't work with the object _returned_ by our AJAX call (we just performed operations with the data _within_ it). However, working with the object returned by the AJAX call provides us with a cleaner syntax for describing our requests and queueing up multiple requests.

The object that is returned by an AJAX call is called a _Promise_, which is a request that is expected to complete, but has not yet completed ([more info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)). Promise objects, also referred to as [defered objects](http://api.jquery.com/deferred/), have a variety of accessible methods that allow us to _chain_ multiple requests together (i.e., do this, then do this, then do this, etc.). While this example explains the jQuery AJAX syntax, many libraries leverage the concept of a promise to chain together multiple requests:

```javascript
// Stage an AJAX request, and THEN do something with the results
$.get('PATH-TO-DATA').then(
 // Function that executes if the initial request was successful:
 function(data) {
  // Do something with the data that was returned
 },

 // Function that executes if the initial request failed:
 function(error) {
  // Process the error that you received
 }
);
```

The **awesome** part about promises is that they return promises! This means you can link together multiple requests, which is a common tasks when working with some REST APIs. For example, in the Spotify API, you may have to perform an initial search for an artist using a search term, and then get the ID of that artist to get that artists top albums. In pseudo-code:

```javascript
// Stage an AJAX request that searches for a particular artist
$.get('SEARCH-BY-NAME').then(
  // Function that executes if the initial request was successful:
  function(searchData) {

    // Get the id of the top artist
    var topArtistId = searchData[0].id;

    // Return a request that uses the topArtistId:
    return $.get('GET-ARTIST-INFO/' + topArtistId);
  }
).then(
 // Function that executes if the GET-ARTIST-INFO request was successful:
 function(artistData) {
  // Do something with your artist data
 }
);

```

## jQuery AJAX Calls
AJAX stands for **A**synchronous **J**avaScript **A**nd **X**ML. This family of methods provides developers a series of tools for loading data into a web application without reloading the page. The jQuery library provides a simplified syntax for interacting with data being provided by other servers. It provides methods for both retrieving information (`get`) and well as sending information (`post`) to servers. This module focuses on the `get` method, which is actually just a [shorthand](https://api.jquery.com/category/ajax/shorthand-methods/) for a generalized AJAX call.

The simplest approach for requesting data is to provide a URL to a specified data resource. For example, you may want to navigate to the URL of a REST API that returns data given the parameters specified in the URL.

```
$.get('PATH-TO-DATA', callback);
```

Here is an example of using the [Spotify API](https://developer.spotify.com/web-api/) to retrieve information about artists that match a query for "adele".

```javascript
$.get('https://api.spotify.com/v1/search?q=adele&type=artist', function(error, data) {
 // Log the information that was returned
 console.log(data);
});
```

## PapaParse
In order to use the data that you've loaded, you'll need to **parse** it into a usable format. For example, `.csv` files may be interpreted as single string elements, that are _comma-separated_. While it would be possible for you to write the code to parse the data yourself, it's likely that you would struggle with (or overlook) some edge cases (also, no need to reinvent the wheel).

There are many libraries out there for parsing `.csv` data, and PapaParse is one of the more popular options. Once you load in the library via CDN, its implementation within a data request is simple:

```javascript
    $.get("data/filename.csv", function(data, error) {
    // Parse the data
    var parsedData = Papa.parse(data, {
        header: true // Indicates that the first row in the .csv file is the column name
    }).data; // Get the data property from the parsing
```

For practice using jQuery AJAX calls with PapaParse, see [exercise-1](exercise-1).

## D3 Methods
The D3 visualization library provides a variety of methods for parsing data stored in specified formats. Here, we'll explain how to use the `d3.csv` method to read comma-seperated-values files. In order to read `.csv` files into a browser, you **must be running a local server**, as your browser does not have permission to read .csv files directly from your machine. Imagine you had a `.csv` that held this tabular data:


| student_id |	exam1	| exam2 |
| ------------- |  ------------- |------------- |
| 38462	| 0.85	| 0.89 |
| 82838 |	0.92	| 0.92 |
|48573	| 0.85	| 0.8 |
| 34983	| 0.74	| 0.76 |
| 43026	| 0.92	| 0.88 |
| 23487	| 0.71	| 0.79 |
| 23473	| 0.83	| 0.88 |

THe `d3.csv` method would allow you to read this into your application, and would return an **array of objects**, where each row in the `.csv` file is an object whose keys are your columns names (in this case, `student_id`, `exam1`, and `exam2`). Here's the syntax for making the request (keep in mind, this is also an **asynchronous** call):

```javascript
d3.csv('PATH-TO-DATA.csv', function(error, data){
  console.log(data[0]); // {student_id:"38462", exam1:".085", exam2:"0.89"}

  // Do something with your data here
});

```

For practice using D3 methods to read in data, see [exercise-2](exercise-2).
