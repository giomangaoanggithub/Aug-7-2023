<!-- make a wordcloud chart -->
<!DOCTYPE html>
<!DOCTYPE html>
<html>

<head>
    <title></title>
    <script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-base.min.js"></script>
    <script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-tag-cloud.min.js"></script>
    <style type="text/css">
    /* html,
    body, */
    .word {
        width: 100%;
        height: 100%;
    }
    </style>
</head>

<body>
    <div style="padding: 5vh">
        <div id="word1" class="word"></div>
        <div id="word2" class="word"></div>
    </div>

</body>

</html>




<script>
anychart.onDocumentReady(function() {
    var data = [{
            "x": "Mandarin chinese",
            "value": 1095456,
            category: "",
            color: "green"
        },
        {
            "x": "English",
            "value": 983000000,
            category: ""
        },
        {
            "x": "Hindustani",
            "value": 544000000,
            category: ""
        },
        {
            "x": "Spanish",
            "value": 527000000,
            category: ""
        },
        {
            "x": "Arabic",
            "value": 422000000,
            category: ""
        },
        {
            "x": "Malay",
            "value": 281000000,
            category: ""
        },
        {
            "x": "Russian",
            "value": 267000000,
            category: ""
        },
        {
            "x": "Bengali",
            "value": 261000000,
            category: ""
        },
        {
            "x": "Portuguese",
            "value": 229000000,
            category: ""
        },
        {
            "x": "French",
            "value": 229000000,
            category: ""
        },
        {
            "x": "Hausa",
            "value": 150000000,
            category: ""
        },
        {
            "x": "Punjabi",
            "value": 148000000,
            category: ""
        },
        {
            "x": "Japanese",
            "value": 129000000,
            category: ""
        },
        {
            "x": "German",
            "value": 129000000,
            category: ""
        },
        {
            "x": "Persian",
            "value": 121000000,
            category: ""
        }
    ];
    // create a tag (word) cloud chart
    var chart = anychart.tagCloud(data);
    //initial for colors
    var customcolor = anychart.scales.linearColor();
    //add colors
    customcolor.colors(["blue", 'yellow', "red", "green"]);
    // set the color scale as the color scale of the chart
    chart.colorScale(customcolor);
    // set a chart title
    // chart.title("my title");
    // set an array of angles at which the words will be laid out
    chart.angles([0, 0, 0]);
    // enable a color range
    // chart.colorRange(true);
    // set the color range length
    chart.colorRange().length('45%');

    // display the word cloud chart
    chart.container('word1');
    chart.draw();
});

eval(`
anychart.onDocumentReady(function() {
    var data = [{
            x: "learning",
            value: 80,
            category: "red"
        },
        {
            x: "includes",
            value: 56,
            category: "rgb(0,255,0)"
        },
        {
            x: "lists",
            value: 44,
            category: "red"
        },
        {
            x: "meaning",
            value: 40,
            category: "red"
        },
        {
            x: "useful",
            value: 36,
            category: "blue"
        },
        {
            x: "different",
            value: 32,
            category: "blue"
        },
        {
            x: "grammar",
            value: 28,
            category: "red"
        },
        {
            x: "teaching",
            value: 24,
            category: "red"
        },
        {
            x: "example",
            value: 20,
            category: "green"
        },
        {
            x: "thing",
            value: 12,
            category: "blue"
        }
    ];
    var chart = anychart.tagCloud(data);
    var customColorScale = anychart.scales.ordinalColor();
    customColorScale.colors(["red", "rgb(0,255,0)", "blue", "green"]);
    chart.colorScale(customColorScale);
    chart.angles([0, 0, 0]);
    chart.container('word2');
    chart.draw();
});
`);
</script>