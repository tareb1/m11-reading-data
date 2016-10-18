// Main JavaScript File

// You'll have to wait for you page to load to assign events to the elements created in your index.html file
$(function() {
    // Use $.get to read in your `data/students.csv` dataset: remember, you must be running a local server

    $.get('data/students.csv', function(data,error) {

        // Parse the data using Papa.parse
        console.log(data);
        var parsedData = Papa.parse(data, {
          header: true
        }).data; // data means converting the complex data given to the data we want

        console.log(parsedData);

        // Use jQuery to create a table, and store that in a variable
        var table = $('<table></table>');
        table.addClass('table'); // bootstrap class for tables

        // Append a table header for each key in your first observation
        var keys = Object.keys(parsedData[0]);
        console.log(keys); // ["student_id", "exam1", "exam2"]

        keys.forEach(function(d) {
            var tableHeader = $('<th>' + d + '</th>');
            table.append(tableHeader);
        });



        // Iterate through your array and create a new table row for each element in your array

        parsedData.forEach(function(row) {
          var tableRow = $('<tr>');

          // Add a cell (<td>) for each key/value pair in your object
          var parsedDataKeys = Object.keys(row);
          console.log(parsedDataKeys);

          parsedDataKeys.forEach(function(dd) {
            tableRow.append($('<td>' + row[dd] + '</td>')); /* wtf? */
          })

          table.append(tableRow)
      });



        // Select your `sandbox` section, and append your table to it
        $('#sandbox').append(table)

    });
});
