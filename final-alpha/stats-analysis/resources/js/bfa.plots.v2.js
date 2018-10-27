/* Global Constants
============================================= */
const SVG_WIDTH = 1100;
const SVG_HEIGHT = 700;

const X_AXIS = "X";
const Y_AXIS = "Y";

const selectYurl = "http://bootcamp.brogard.io:5051/years";

const NDX = "ndx";
const YR2011 = 2011;

/* Global Var
============================================= */
var xLinearScale,
    yLinearScale,
    xLabelsGroup,
    yLabelsGroup,
    xAxis,
    yAxis;

var plot,
    plotLabel,
    plotTip,
    plotGroup,
    bottomAxis,
    leftAxis;

    
//****************** init *****************************//
renderSelectY(selectYurl);

var selectY = d3.select("#bfa--select-y");
var selectR = d3.selectAll("input[name='bfa--radio-button']");

var selectXaxis = `${YR2011}_${selectR.node().value}`;
var selectYaxis = `${YR2011}_${NDX}`;

var margin = {
    top: 20,
    bottom: 120,
    left: 120,
    right: 40
};

var width = SVG_WIDTH - margin.left - margin.right;
var height = SVG_HEIGHT - margin.top - margin.bottom;

var svg = d3.select(".chart")
    .append("svg")
    .attr("width", SVG_WIDTH)
    .attr("height", SVG_HEIGHT)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chart = svg.append("g");

var div = d3.select(".chart")
    .append("div")
    .attr("class", "chart-tooltip")
    .style("opacity", 0);    


//****************** Event Listeners ******************//
d3.csv("resources/data/output-summary.csv", function(error, DATASET) {

    // Initial scale
    xLinearScale = xScale(selectXaxis, DATASET);
    yLinearScale = yScale(selectYaxis, DATASET);

    // Initial axis
    bottomAxis = d3.axisBottom(xLinearScale);
    leftAxis = d3.axisLeft(yLinearScale);

    // plot group: data, label, tooltip
    plotGroup = chart.append("g");

    // label group: x/y axis selectable datapoints
    xLabelsGroup = chart.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    yLabelsGroup = chart.append("g")
        .attr("transform", "rotate(-90)");

    // plot: data points
    plot = plotGroup.selectAll("circle")
        .data(DATASET)
        .enter()
        .append("circle")
        .attr("cx", function(data) {
            return xLinearScale(data[selectXaxis]);
        })
        .attr("cy", function(data) {
            return yLinearScale(data[selectYaxis]);
        })
        .attr("r", 12)
        .attr("fill", "#0F5DAA")
        .attr("opacity", ".65");

    // plot: state label
    //plotLabel = plotGroup.append("text")
    //    .selectAll("tspan")
    //    .data(DATASET)
    //    .enter()
    //    .append("tspan")
    //    .attr("x", function(data) {
    //        return xLinearScale(data[selectXaxis] - 0);
    //    })
    //    .attr("y", function(data) {
    //        return yLinearScale(data[selectYaxis] - 0.22);
    //    })
    //    .text(function(data) {
    //        return data.abbr;
    //    });
        
    // plot: tooltip
    plotTip = plotGroup.selectAll("circle, tspan")
        .on("mouseover", function(data) {
            div.transition()
                .duration(100)
                .style("opacity", 0.9);
            div.html(`<table class="table table-sm table-bordered table-dark">
                      <tr><th colspan="2">${data.store.bold()}</th></tr>
                      <tr><th>label</th><td>$${data[selectXaxis]}</td></tr>
                      <tr><th>label</th><td>$${data[selectYaxis]}</td></tr>
                      </table>`)
                .style("top", (d3.event.pageY - 0) + "px")
                .style("left", (d3.event.pageX) + 10 + "px");
        })
        .on("mouseout", function() {
            div.transition()
                .duration(1800)
                .style("opacity", 0);
        });

    // display axis
    xAxis = chart.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    yAxis = chart.append("g")
        .call(leftAxis);


    //****************** chart --- Event Listeners ******************//
    selectR.on("change", function() {
        var thisSelectY = selectY.node().value;
        var thisSelectR = this.value;
        
        var selected = `${thisSelectY}_${thisSelectR}`;
        
        xLinearScale = xScale(selected, DATASET);
        xAxis = renderXaxis(xLinearScale, xAxis);
        plot = renderPlot(plot, xLinearScale, selected, X_AXIS);
        
        selectXaxis = selected;
 
    });

    selectY.on("change", function() {
        var thisSelectR = selectR.node().value;
        var thisSelectY = this.value;
        
        var selected = `${thisSelectY}_${NDX}`;
        
        selectXaxis = `${thisSelectY}_${thisSelectR}`;
        selectYaxis = selected;        
   
        xLinearScale = xScale(selectXaxis, DATASET);
        yLinearScale = yScale(selectYaxis, DATASET);
    
        xAxis = renderXaxis(xLinearScale, xAxis);
        yAxis = renderYaxis(yLinearScale, yAxis);
   
        plot = renderPlotXY(plot, xLinearScale, yLinearScale, selectXaxis, selectYaxis);
   
    });
});


/* Functions
============================================= */

/*
 * calculates x scale bases on min/max values
 *
 * @param axis, dataset
 * @return xLinearScale
 */
function xScale(axis, dataset) {
    var min = d3.min(dataset, function(obj) {
        return +obj[axis] * 0.75;
    });
    var max = d3.max(dataset, function(obj) {
        return +obj[axis] * 1;
    });
    var xls = d3.scaleLinear().range([0, width]).domain([min, max]);
    return xls;
}

/*
 * calculates y scale bases on min/max values
 *
 * @param axis, dataset
 * @return yLinearScale
 */
function yScale(axis, dataset) {
    var min = d3.min(dataset, function(obj) {
        return +obj[axis] * 0.75;
    });
    var max = d3.max(dataset, function(obj) {
        return +obj[axis] * 1;
    });
    var yls = d3.scaleLinear().range([height, 0]).domain([min, max]);
    return yls;
}

/*
 * onChange: renders x axis scale
 *
 * @param scale, axis
 * @return axis
 */
function renderXaxis(scale, axis) {
    var bottomAxis = d3.axisBottom(scale);
    axis.transition()
        .duration(1000)
        .call(bottomAxis);

    return axis;
}

/*
 * onChange: renders y axis scale
 *
 * @param scale, axis
 * @return axis
 */
function renderYaxis(scale, axis) {
    var leftAxis = d3.axisLeft(scale);
    axis.transition()
        .duration(1000)
        .call(leftAxis);

    return axis;
}

/*
 * onChange: renders plot points for x/y axis
 *
 * @param plot, scale, selection, axis
 * @return plot
 */
function renderPlot(plot, scale, selection, axis) {

    if (axis === X_AXIS) {
        plot.transition()
            .duration(1000)
            .attr("cx", function(data) {
                return scale(data[selection]);
            });
    }

    if (axis === Y_AXIS) {
        plot.transition()
            .duration(1000)
            .attr("cy", function(data) {
                return scale(data[selection]);
            });
    }

    return plot;
}

function renderPlotXY(plot, xScale, yScale, selectXaxis, selectYaxis) {

        plot.transition()
            .duration(1000)
            .attr("cx", function(data) {
                return xScale(data[selectXaxis]);
            })
            .attr("cy", function(data) {
                return yScale(data[selectYaxis]);
            });        

    return plot;
}


/*
 * onChange: renders "state" value in plot for x/y axis
 *
 * @param plotLabel, scale, selection, axis
 * @return plotLabel
 */
function renderPlotLabel(plotLabel, scale, selection, axis) {
    if (axis === X_AXIS) {
        plotLabel.transition()
            .duration(1000)
            .attr("x", function(data) {
                return scale(data[selection]);
            });
    }

    if (axis === Y_AXIS) {
        plotLabel.transition()
            .duration(1000)
            .attr("y", function(data) {
                return scale(data[selection] - 0.22);
            });
    }

    return plotLabel;
}


/*
 * populates select dropdowns
 */
function renderSelectX(selectXurl){
    d3.json(selectXurl, function(data) {
        d3.select("#bfa--select-x")
          .selectAll("option")
          .data(data)
          .enter()
          .append("option")
          .text(function (d) {
               return d;
          }).attr("value", function(d) {
               return d;
          });
    });      
}

function renderSelectY(selectYurl){
    d3.json(selectYurl, function(data) {  
        d3.select("#bfa--select-y")
          .selectAll("option")
          .data(data)
          .enter()
          .append("option")
          .text(function (d) {
               return d;
          }).attr("value", function(d) {
               return d;
          });      
    });
}

