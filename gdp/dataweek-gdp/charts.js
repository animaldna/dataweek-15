var subtitles = {
    percentSub : "% of global GDP (annual)",
    realSub : "annual GDP"
};

var tooltips = {
    percent : "javascript:percentTooltip()",
    real : "javascript:realTooltip()"
};


/* PREPDRILLDOWN() */
function prepDrilldown(p){
    /* Get info from top level chart */
    var plotVals = zingchart.exec(p.id, 'getplotvalues', {
        plotid: p.plotid
    });
    var plotDetails = zingchart.exec(p.id, 'getobjectinfo', {
        object: 'plot',
        plotid: p.plotid
    });

    var newData = {
        values: plotVals,
        backgroundColor: plotDetails.backgroundColor1,
        text: plotDetails.text,
        id: p.plotid,
        scales:"scale-x,scale-y,scale-y-2"
    };  
    return newData;
}


/* PERCENT CHART CONFIG */
var percentConfig = {
    theme: "none",
    globals: {
        shadow: false
    },
    type: "area",
    stacked: true,
    stackType: "100%",
    title:{
        text:"Visualizing the global economy",
        textAlign:"left",
        fontSize:15,
        borderTop: "1px solid red", 
        offsetX: 8,
        paddingTop: 15,
        paddingLeft: 15,
        marginBottom:100
    },
    subtitle:{
        text: subtitles.percentSub,
        textAlign:"left",
        fontWeight:"normal",
        x:23,
        y:32
    },
    plotarea:{
      marginTop:110
    },
    scaleY: {
        values: "0:100:10",
        format: "%v%",
        guide:{
            visible:0
        }
    },
    scaleY2: {
        format: "%v%",
        values: "0:100:10",
        guide:{
            visible:0
        }
    },
    scaleX: {
        values: "1984:2014:1",
         guide:{
            visible:0
        }
    },
    plot: {
        "hover-mode": "plot",
        //segmentTrackers: false,
        "max-trackers": 100,
        "sampling-step": 20,
        "fast": true,
        hoverState: {
            backgroundColor:"#ea4204"
            //visible: false
        },
        activeArea: true,
        alphaArea:1,
        alpha: 1,
        lineWidth: 0,
        marker: {
            visible: false
        }
    },
    tooltip: {
        textAlign: "left",
        fontSize: 14,
        text: tooltips.percent,
        backgroundColor: "white",
        color: "#333",
        borderColor:"#dddddd",
        borderWidth: "1px"
    },
    shapes:[
      {
        type:"rectangle",
        id: "percent_btn",
        label:{
            text:"% of total",
            offsetX:15,
            color:"white",
            
            fontWeight:"bold"
        },
        cursor:"hand",
        borderColor:"red",
        borderWidth:1,
        backgroundColor:"red",
        height:25,
        width:65,
        offsetX:0,
        x:885,
        y:20
      },
      {
        type:"rectangle",
        cursor:"hand",
        id: "real_btn",
        label:{
            text:"Real value",
            offsetX:8
        },
        borderColor:"red",
        borderWidth:1,
        backgroundColor:"white",
        height:25,
        width:65,
        x:950,
        y:20
      },
      {
        type:"rect",
        backgroundColor:"red",
        width: 18,
        height: 60
      }
    ],
    labels:[
        {
            text:"Click a country to isolate",
            x: 50,
            y: 80,
            fontSize: 12,
            color:"red"
        }
    ],
    series: []
};

/* PERCENT DRILLDOWN CONFIG */
var percentDrillConfig = {
    theme: "none",
    globals: {
        shadow: false
    },
    type: "area",
    stacked: true,
    stackType: "normal",
    title:{
        text:"Visualizing the global economy",
        textAlign:"left",
        fontSize:15,
        borderTop: "1px solid red", 
        offsetX: 8,
        paddingTop: 15,
        paddingLeft: 15,
        marginBottom:100
    },
    subtitle:{
        text: subtitles.percentSub,
        textAlign:"left",
        fontWeight:"normal",
        x:23,
        y:32
    },
    plotarea:{
      marginTop:110,
    },
    scaleY: {
        //format: "%v%",
        format:"javascript:percentScale()",
        guide:{
            visible:0
        }
    },
    scaleY2: {
        //format: "%v%",
        format:"javascript:percentScale()",
        guide:{
            visible:0
        }
    },
    scaleX: {
        values: "1984:2014:1",
         guide:{
            visible:0
        }
    },
    plot: {
        "hover-mode": "plot",
        //segmentTrackers: false,
        "max-trackers": 100,
        "sampling-step": 20,
        "fast": true,
        hoverState: {
            backgroundColor:"#ea4204"
            //visible: false
        },
        activeArea: true,
        alphaArea:1,
        alpha: 1,
        lineWidth: 0,
        marker: {
            visible: false
        }
    },
    tooltip: {
        textAlign: "left",
        fontSize: 14,
        text: tooltips.percent,
        backgroundColor: "white",
        color: "#333",
        borderColor:"#dddddd",
        borderWidth: "1px"
    },
    shapes:[
      {
        type:"rectangle",
        id: "percent_btn",
        cursor:"hand",
        label:{
            text:"% of total",
            offsetX:15,
            color:"white",
            
            fontWeight:"bold"
        },
        borderColor:"red",
        borderWidth:1,
        backgroundColor:"red",
        height:25,
        width:65,
        offsetX:0,
        x:885,
        y:20
      },
      {
        type:"rectangle",
        id: "real_btn",
        cursor:"hand",
        label:{
            text:"Real value",
            offsetX:8
        },
        borderColor:"red",
        borderWidth:1,
        backgroundColor:"white",
        height:25,
        width:65,
        x:950,
        y:20
      },
      {
        type:"rect",
        backgroundColor:"red",
        width: 18,
        height: 60
      },
      {
        type: "rectangle",
        id: "back_btn",
        cursor:"hand",
        height: 26,
        width: 30,
        x: 80,
        y: 80,
        backgroundColor: "red",
        label: {
            offsetX: -4,
            text: "<",
            color: "white",
            fontSize: 16,
            fontWeight: "bold"
        }
    }, 
    {
        type: "rectangle",
        id:"country_btn",
        height: 25,
        width: 90,
        x: 140,
        y: 80,
        borderWidth: 1,
        borderColor: "#DDDDDD",
        backgroundColor: "white",
        label: {
            textAlign: "center",
            maxWidth:89,
            text: "",
            "wrap-text": true,
            color: "#333",
            fontSize: 10,
        }
    }
    ],
    series: []
};

/* REAL CHART CONFIG */
var realConfig = {
    theme: "none",
    globals: {
        shadow: false
    },
    type: "area",
    stacked: true,
    stackType: "normal",
    title:{
        text:"Visualizing the global economy",
        textAlign:"left",
        fontSize:15,
        borderTop: "1px solid red", 
        offsetX: 8,
        paddingTop: 15,
        paddingLeft: 15,
        marginBottom:100
    },
    subtitle:{
        text: subtitles.realSub,
        textAlign:"left",
        fontWeight:"normal",
        x:23,
        y:32
    },
    plotarea:{
      marginTop:110,  
    },
    scaleY: {
        format:"javascript:realScale()",
        guide:{
            visible:0
        }
    },
    scaleY2: {
        values:"0:80000000000000:10000000000000",
        format:"javascript:realScale()",
        guide:{
            visible:0
        }
    },
    scaleX: {
        values: "1984:2014:1",
         guide:{
            visible:0
        }
    },
    plot: {
        "hover-mode": "plot",
        //segmentTrackers: false,
        "max-trackers": 100,
        "sampling-step": 20,
        "fast": true,
        hoverState: {
            backgroundColor:"#ea4204"
            //visible: false
        },
        activeArea: true,
        alphaArea:1,
        alpha: 1,
        lineWidth: 0,
        marker: {
            visible: false
        }
    },
    tooltip: {
        textAlign: "left",
        fontSize: 14,
        text:"javascript:realTooltip()",
        backgroundColor: "white",
        color: "#333",
        borderColor:"#dddddd",
        borderWidth: "1px"
    },
    shapes:[
      {
        type:"rectangle",
        id: "percent_btn",
        cursor:"hand",
        label:{
            text:"% of total",
            offsetX:15,
            fontWeight:"bold"
        },
        borderColor:"red",
        borderWidth:1,
        backgroundColor:"white",
        height:25,
        width:65,
        offsetX:0,
        x:885,
        y:20
      },
      {
        type:"rectangle",
        id: "real_btn",
        cursor:"hand",
        label:{
            text:"Real value",
            offsetX:8,
            color:"white"
        },
        borderColor:"red",
        borderWidth:1,
        backgroundColor:"red",
        height:25,
        width:65,
        x:950,
        y:20
      },
      {
        type:"rect",
        backgroundColor:"red",
        width: 18,
        height: 60
      }
    ],
    labels:[
        {
            text:"Click a country to isolate",
            x: 50,
            y: 80,
            fontSize: 12,
            color:"red"
        }
    ],
    series: []
};

/* REAL DRILLDOWN CONFIG */
var realDrillConfig = {
    theme: "none",
    globals: {
        shadow: false
    },
    type: "area",
    stacked: true,
    stackType: "normal",
    title:{
        text:"Visualizing the global economy",
        textAlign:"left",
        fontSize:15,
        borderTop: "1px solid red", 
        offsetX: 8,
        paddingTop: 15,
        paddingLeft: 15,
        marginBottom:100
    },
    subtitle:{
        text: subtitles.realSub,
        textAlign:"left",
        fontWeight:"normal",
        x:23,
        y:32
    },
    plotarea:{
      marginTop:110
    },
    scaleY: {
        format:"javascript:realScale()",
        guide:{
            visible:0
        }
    },
    scaleY2: {
        format:"javascript:realScale()",
        guide:{
            visible:0
        }
    },
    scaleX: {
        values: "1984:2014:1",
         guide:{
            visible:0
        }
    },
    plot: {
        "hover-mode": "plot",
        "max-trackers": 100,
        "sampling-step": 20,
        "fast": true,
        hoverState: {
            //backgroundColor:"#ea4204"
            visible:false
        },
        activeArea: true,
        alphaArea:1,
        alpha: 1,
        lineWidth: 0,
        marker: {
            visible: false
        }
    },
    tooltip: {
        textAlign: "left",
        fontSize: 14,
        text:"javascript:realTooltip()",
        backgroundColor: "white",
        color: "#333",
        borderColor:"#dddddd",
        borderWidth: "1px"
    },
    shapes:[
      {
        type:"rectangle",
        id: "percent_btn",
        cursor:"hand",
        label:{
            text:"% of total",
            offsetX:15,
            fontWeight:"bold"
        },
        borderColor:"red",
        borderWidth:1,
        backgroundColor:"white",
        height:25,
        width:65,
        offsetX:0,
        x:885,
        y:20
      },
      {
        type:"rectangle",
        id: "real_btn",
        cursor:"hand",
        label:{
            text:"Real value",
            offsetX:8,
            color:"white"
        },
        borderColor:"red",
        borderWidth:1,
        backgroundColor:"red",
        height:25,
        width:65,
        x:950,
        y:20
      },
      {
        type:"rect",
        backgroundColor:"red",
        width: 18,
        height: 60
      },
      {
        type: "rectangle",
        id: "back_btn",
        cursor:"hand",
        height: 26,
        width: 30,
        x: 80,
        y: 80,
        backgroundColor: "red",
        label: {
            offsetX: -4,
            text: "<",
            color: "white",
            fontSize: 16,
            fontWeight: "bold"
        }
    },
    {
        type: "rectangle",
        height: 25,
        width: 90,
        x: 140,
        y: 80,
        borderWidth: 1,
        borderColor: "#DDDDDD",
        backgroundColor: "white",
        label: {
            textAlign: "center",
            maxWidth:89,
            text: "",
            "wrap-text": true,
            color: "#333",
            fontSize: 10,
        }
    }],
    series: []
};