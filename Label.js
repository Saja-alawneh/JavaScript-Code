
const _ = require('lodash');
const fs = require('fs');
var q1=90;
var q2=180;
var q3=270;
var q4=365;
//read the JSON file for Patient 1
let rawdata = require("./data-P1.json");
let data= JSON.parse(JSON.stringify(rawdata));
item = data[0] 
key = Object.keys(item)[0]
//Store patient 1 data into an array called patientdata
patientdata= item[key]
//sort the patientdata by the documentDate 
patientDataSorted=_.sortBy(patientdata, ['documentDate']);

console.log('Sorted data',patientDataSorted );



//documentDate is a string. Convert documnetDate which is a string to a date variable
for( j = 0; j < patientDataSorted.length; j++){
    patientDataSorted[j]['NewDate']=new Date (patientDataSorted[j]['documentDate']);
    console.log (patientDataSorted[j]['documentDate'],'  ',patientDataSorted[j]['NewDate']);
}
    //Define a new array to store the patientId, Year, Quarter, labels counts per quarter.
    let patientLabels =[];
    
    // set the start date of the timeline of the sorted array
    patientDataSorted[0]['Year']= 'Y1';
    patientDataSorted[0]['Quarter']= 'Q1';
    
    // define variabels to count labels for each quarter
    totalFindingQ1= 0;
    totalDisorderQ1=0;
    totalDrugQ1=0;
    totalLabQ1=0;
    totalProcdureQ1=0;
    totalOthersQ1=0;

    totalFindingQ2= 0;
    totalDisorderQ2=0;
    totalDrugQ2=0;
    totalLabQ2=0;
    totalProcdureQ2=0;
    totalOthersQ2=0;

    totalFindingQ3= 0;
    totalDisorderQ3=0;
    totalDrugQ3=0;
    totalLabQ3=0;
    totalProcdureQ3=0;
    totalOthersQ3=0;

    totalFindingQ4= 0;
    totalDisorderQ4=0;
    totalDrugQ4=0;
    totalLabQ4=0;
    totalProcdureQ4=0;
    totalOthersQ4=0;
    //Calculate difference between the start document date and the other documents
    // This will calculate the number of Years  assign each document to the Year and the quarter in that year
    for( i = 1; i < patientDataSorted.length; i++){
    var diff = Math.abs((patientDataSorted[0]['NewDate']- patientDataSorted[i]['NewDate'])/86400000);
    var diff1= Math.floor(diff);
    var docYear= Math.ceil(diff1/365);
    let y = docYear;
    while (y >= 1)
        {
            patientDataSorted[i]['Year']= 'Y' + docYear;
           // patientLabels[i]['Year']='Y' + docYear;
            
            y--;
        }
        
        // to calculate the quarter 
        // example : if the document is located in Year 2 and the difference between the first date and the current date is 488 days
        // Then to assign the quarter, I will use the following formula
        // docQuarter = Abs[(2-1)*365 - 488] = 123 (Quarter 2)
        docQuarter= Math.abs((docYear-1) * 365 -diff1);
        console.log('Quarter are ')
        console.log(docQuarter);
        // to assign the quarter and calculate  each label counts per quarter
        // Add them to the patientLabels array
        if (docQuarter <= q1){
        patientDataSorted[i]['Quarter']= 'Q1';
        patientDataSorted[i]['totalFindingQ1']= totalFindingQ1 + patientDataSorted[i]['labelCounts']['FindingCount'];
        patientDataSorted[i]['totalDisorderQ1']= totalDisorderQ1 + patientDataSorted[i]['labelCounts']['DisorderCount'];
        patientDataSorted[i]['totalDrugQ1']= totalDrugQ1 + patientDataSorted[i]['labelCounts']['DrugCount'];
        patientDataSorted[i]['totalLabQ1']= totalLabQ1 + patientDataSorted[i]['labelCounts']['LabCount'];
        patientDataSorted[i]['totalProcdureQ1']= totalProcdureQ1 + patientDataSorted[i]['labelCounts']['ProcedureCount'];
        patientDataSorted[i]['totalOthersQ1']= totalOthersQ1 + patientDataSorted[i]['labelCounts']['OtherCount'];
        
        }
        else if (docQuarter > q1 && docQuarter<= q2)
        {
        patientDataSorted[i]['Quarter']= 'Q2';
        patientDataSorted[i]['totalFindingQ2']= totalFindingQ2 + patientDataSorted[i]['labelCounts']['FindingCount'];
        patientDataSorted[i]['totalDisorderQ2']= totalDisorderQ2 + patientDataSorted[i]['labelCounts']['DisorderCount'];
        patientDataSorted[i]['totalDrugQ2']= totalDrugQ2 + patientDataSorted[i]['labelCounts']['DrugCount'];
        patientDataSorted[i]['totalLabQ2']= totalLabQ2 + patientDataSorted[i]['labelCounts']['LabCount'];
        patientDataSorted[i]['totalProcdureQ2']= totalProcdureQ2 + patientDataSorted[i]['labelCounts']['ProcedureCount'];
        patientDataSorted[i]['totalOthersQ2']= totalOthersQ2 + patientDataSorted[i]['labelCounts']['OtherCount'];
        }
        
        else if (docQuarter > q2 && docQuarter<= q3)
        {
        patientDataSorted[i]['Quarter']= 'Q3';
        patientDataSorted[i]['totalFindingQ3']= totalFindingQ3 + patientDataSorted[i]['labelCounts']['FindingCount'];
        patientDataSorted[i]['totalDisorderQ3']= totalDisorderQ3 + patientDataSorted[i]['labelCounts']['DisorderCount'];
        patientDataSorted[i]['totalDrugQ3']= totalDrugQ3 + patientDataSorted[i]['labelCounts']['DrugCount'];
        patientDataSorted[i]['totalLabQ3']= totalLabQ3 + patientDataSorted[i]['labelCounts']['LabCount'];
        patientDataSorted[i]['totalProcdureQ3']= totalProcdureQ3 + patientDataSorted[i]['labelCounts']['ProcedureCount'];
        patientDataSorted[i]['totalOthersQ3']= totalOthersQ3 + patientDataSorted[i]['labelCounts']['OtherCount'];
        
        }
        else 
        {
        patientDataSorted[i]['Quarter']= 'Q4';
        patientDataSorted[i]['totalFindingQ4']= totalFindingQ4 + patientDataSorted[i]['labelCounts']['FindingCount'];
        patientDataSorted[i]['totalDisorderQ4']= totalDisorderQ4 + patientDataSorted[i]['labelCounts']['DisorderCount'];
        patientDataSorted[i]['totalDrugQ4']= totalDrugQ4 + patientDataSorted[i]['labelCounts']['DrugCount'];
        patientDataSorted[i]['totalLabQ4']= totalLabQ4 + patientDataSorted[i]['labelCounts']['LabCount'];
        patientDataSorted[i]['totalProcdureQ4']= totalProcdureQ4 + patientDataSorted[i]['labelCounts']['ProcedureCount'];
        patientDataSorted[i]['totalOthersQ4']= totalOthersQ4 + patientDataSorted[i]['labelCounts']['OtherCount'];
        
        }
    }
    console.log(patientDataSorted);

    for( j = 0; j < patientDataSorted.length; j++){
        if ( patientDataSorted[j].totalFindingQ1 !=undefined) {
            patientLabels.push({patientId: patientDataSorted[j].patientId}, {Year: patientDataSorted[j]['Year']},
            {Quarter:patientDataSorted[j]['Quarter']}, {totalFindingQ1:patientDataSorted[j]['totalFindingQ1']})
        }
        if ( patientDataSorted[j].totalDrugQ1 !=undefined) {
            patientLabels.push({patientId: patientDataSorted[j]['patientId']}, {Year: patientDataSorted[j]['Year']},
            {Quarter:patientDataSorted[j]['Quarter']}, {totalDrugQ1:patientDataSorted[j]['totalDrugQ1']})
            }
        if ( patientDataSorted[j].totalDisorderQ1 !=undefined) {
            patientLabels.push({patientId: patientDataSorted[j]['patientId']}, {Year: patientDataSorted[j]['Year']},
            {Quarter:patientDataSorted[j]['Quarter']}, {totalDisorderQ1:patientDataSorted[j]['totalDisorderQ1']})
            }
        if ( patientDataSorted[j].totalLabQ1 !=undefined) {
            patientLabels.push({patientId: patientDataSorted[j]['patientId']}, {Year: patientDataSorted[j]['Year']},
            {Quarter:patientDataSorted[j]['Quarter']}, {totalLabQ1:patientDataSorted[j]['totalLabQ1']})
            }

        if ( patientDataSorted[j].totalProcedureQ1 !=undefined) {
            patientLabels.push({patientId: patientDataSorted[j]['patientId']}, {Year: patientDataSorted[j]['Year']},
            {Quarter:patientDataSorted[j]['Quarter']}, {totalProcedureQ1:patientDataSorted[j]['totalProcedureQ1']})
            }
        if ( patientDataSorted[j].totalOtherQ1 !=undefined) {
                patientLabels.push({patientId: patientDataSorted[j]['patientId']}, {Year: patientDataSorted[j]['Year']},
                {Quarter:patientDataSorted[j]['Quarter']}, {totalOtherQ1:patientDataSorted[j]['totalOthersQ1']})
                }
            }

    console.log(patientLabels);
    //console.log(patientLabels.length)
    //console.log(JSON.stringify(patientLabels))