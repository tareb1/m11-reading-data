// Main JavaScript File

// You'll have to wait for you page to load to assign events to the elements created in your index.html file
$(function() {
    // Use $.get to read in your `data/students.csv` dataset: remember, you must be running a local server
    $.get('data/students.csv', function(data, error) {
        // Parse the data using Papa.parse
        var data = Papa.parse(data, {
            header: true
        }).data;


        // Use jQuery to create a table, and store that in a variable
        var table = $('<table></table>');
        table.addClass('table');

        // Append a table header for each key in your first observation
        Object.keys(data[0]).forEach(function(d) {
            var th = $('<th>' + d + '</th>');
            table.append(th);
        });

        // Iterate through your array and create a new table row for each element in your array
        data.forEach(function(d) {
            var tr = $('<tr>');

            // Add a cell (<td>) for each key/value pair in your object
            Object.keys(d).forEach(function(dd) {
                tr.append($('<td>' + d[dd] + '</td>'));
            })

            table.append(tr)
        });

        // Select your `sandbox` section, and append your table to it
        $('#sandbox').append(table)
    });
});
