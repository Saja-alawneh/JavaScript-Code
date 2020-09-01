const _ = require('lodash');
const fs = require('fs');
// declare the four quarters days range
var q1=90;
var q2=180;
var q3=270;
var q4=365;

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

//read the JSON file for aal the Patients
let rawdata = require("./data.json");
let data= JSON.parse(JSON.stringify(rawdata));

item = data[0]
key = Object.keys(item)[0]
//Store patients data into an array called patientdata
patientdata= item[key]


//documentDate is a string. Convert documnetDate which is a string to a date object
// I added an element to the array called  NewDate to store the date object for each document
for( j = 0; j < patientdata.length; j++){
    patientdata[j]['NewDate']=new Date (patientdata[j]['documentDate']);
    
    //To view all the NewDate for all the documents for each patient in the cohort 
    //console.log(patientdata[j]['patientId'],' ', patientdata[j]['documentDate'], ' ', patientdata[j]['NewDate'])
}
//sort the patientdata by the new date object 

patientDataSorted=_.sortBy(patientdata, ['NewDate']);
// This  to check if the patientDataSorted has the documents sorted by the NewDate 
//for( j = 0; j < patientDataSorted.length; j++){
  //  console.log(patientDataSorted[j]['patientId'],' ', patientdata[j]['NewDate'], ' ', patientDataSorted[j]['NewDate']);
//} 

// Group the data using patientId
var patientGroups = _(patientDataSorted)
            .groupBy(x => x.patientId)
            .map((value, key ) => ({patientId: key, data: value}))
            .value();
            
   // console.log(patientGroups)

// To detemine the Year and Quarter for each document for each patient in the cohort

for (i= 0; i< patientGroups.length; i++)
{
    for (j=1; j<patientGroups[i].data.length; j++)
    {
        patientGroups[i].data[0]['Year']= 'Y1'; // first document for each patient is the starting date (Y1 and Q1)
        patientGroups[i].data[0]['Quarter']= 'Q1';
        //substract each document date from the start date to align all the documents date for each patient according to the starting point
        var diff = Math.abs((patientGroups[i].data[0]['NewDate']- patientGroups[i].data[j]['NewDate'])/86400000);
        var diff1= Math.floor(diff);
        var docYear= Math.ceil(diff1/365); //to calculate the number of years where the documents distributed for each patient
        
        let y = docYear;
        while (y >= 1)
        {
            patientGroups[i].data[j]['Year']= 'Y' + docYear; 
            y--;
        }
    
        //to calculate the quarter 
        // example : if the document is located in Year 2 and the difference between the first date and the current date is 488 days
        // Then to assign the quarter, I will use the following formula
        // docQuarter = Abs[(2-1)*365 - 488] = 123 (Quarter 2)
        docQuarter= Math.abs((docYear-1) * 365 -diff1);

        if (docQuarter <= q1){
            patientGroups[i].data[j]['Quarter']= 'Q1';
        }
        else if (docQuarter > q1 && docQuarter<= q2)
        {
            patientGroups[i].data[j]['Quarter']= 'Q2';
        }
        
        else if (docQuarter > q2 && docQuarter<= q3)
        {
            patientGroups[i].data[j]['Quarter']= 'Q3';
        }
        else 
        {
            patientGroups[i].data[j]['Quarter']= 'Q4';}


    }
}
//Calculate total number of years in the cohort
var totalDaysDiff= Math.abs((patientDataSorted[0]['NewDate']- patientDataSorted[patientDataSorted.length-1]['NewDate'])/86400000);
var totalNumYear= Math.ceil(totalDaysDiff/365);
console.log('first Date in the cohort:', patientDataSorted[0]['NewDate'])
console.log('Last Date in the cohort:', patientDataSorted[patientDataSorted.length-1]['NewDate'])
console.log ('number of Days:', totalDaysDiff);
console.log('number of years:', totalNumYear);

//console.log(patientGroups[1].data)

 let lableCountsYear=[];
 
// Here where I need your help 
// to aggregate  all documents for each patient, 
// the goal here is to calculate the counts for each semnatic group (Finding, Procedure, Drug, Disorder, Lab, Others) in each quarter/year 
 
for(y=1; y<totalNumYear; y++) // Loop through the number of years in the cohort
{
    for(i=0; i<patientGroups.length; i++) //loop through the patients (47 patients)
    {
        for(j=0;j<data.length; j++)// loop through the documents for each patients
        {
            if(patientGroups[i].data[j]['Year'].includes('Y'+ y) && patientGroups[i].data[j]['Quarter'].includes('Q1'))
            {   
                patientGroups[i]['totalFindingQ1']= totalFindingQ1 + patientGroups[i].data[j]['labelCounts']['FindingCount'];
                patientGroups[i]['totalDisorderQ1']= totalDisorderQ1 + patientGroups[i].data[j]['labelCounts']['DisorderCount'];
                patientGroups[i]['totalDrugQ1']= totalDrugQ1 + patientGroups[i].data[j]['labelCounts']['DrugCount'];
                patientGroups[i]['totalLabQ1']= totalLabQ1 + patientGroups[i].data[j]['labelCounts']['LabCount'];
                patientGroups[i]['totalProcdureQ1']= totalProcdureQ1 + patientGroups[i].data[j]['labelCounts']['ProcedureCount'];
                patientGroups[i]['totalOthersQ1']= totalOthersQ1 + patientGroups[i].data[j]['labelCounts']['OtherCount'];
        
            }
            else if (patientGroups[i].data[j]['Year'].includes('Y'+ y) && patientGroups[i].data[j]['Quarter'].includes(Q2))
            {
        
                patientGroups[i]['totalFindingQ2']= totalFindingQ2 + patientGroups[i].data[j]['labelCounts']['FindingCount'];
                patientGroups[i]['totalDisorderQ2']= totalDisorderQ2 + patientGroups[i].data[j]['labelCounts']['DisorderCount'];
                patientGroups[i]['totalDrugQ2']= totalDrugQ2 + patientGroups[i].data[j]['labelCounts']['DrugCount'];
                patientGroups[i]['totalLabQ2']= totalLabQ2 + patientGroups[i].data[j]['labelCounts']['LabCount'];
                patientGroups[i]['totalProcdureQ2']= totalProcdureQ2 + patientGroups[i].data[j]['labelCounts']['ProcedureCount'];
                patientGroups[i]['totalOthersQ2']= totalOthersQ2 + patientGroups[i].data[j]['labelCounts']['OtherCount'];
                
            }
        
            else if (patientGroups[i].data[j]['Year'].includes('Y'+ y) && patientGroups[i].data[j]['Quarter'].includes(Q3))
            {
                patientGroups[i]['totalFindingQ3']= totalFindingQ3 + patientGroups[i].data[j]['labelCounts']['FindingCount'];
                patientGroups[i]['totalDisorderQ3']= totalDisorderQ3 + patientGroups[i].data[j]['labelCounts']['DisorderCount'];
                patientGroups[i]['totalDrugQ3']= totalDrugQ3 + patientGroups[i].data[j]['labelCounts']['DrugCount'];
                patientGroups[i]['totalLabQ3']= totalLabQ3 + patientGroups[i].data[j]['labelCounts']['LabCount'];
                patientGroups[i]['totalProcdureQ3']= totalProcdureQ3 + patientGroups[i].data[j]['labelCounts']['ProcedureCount'];
                patientGroups[i]['totalOthersQ3']= totalOthersQ3 + patientGroups[i].data[j]['labelCounts']['OtherCount'];
        
            }
            else 
            {
                patientGroups[i]['totalFindingQ4']= totalFindingQ4 + patientGroups[i].data[j]['labelCounts']['FindingCount'];
                patientGroups[i]['totalDisorderQ4']= totalDisorderQ4 + patientGroups[i].data[j]['labelCounts']['DisorderCount'];
                patientGroups[i]['totalDrugQ4']= totalDrugQ4 + patientGroups[i].data[j]['labelCounts']['DrugCount'];
                patientGroups[i]['totalLabQ4']= totalLabQ4 + patientGroups[i].data[j]['labelCounts']['LabCount'];
                patientGroups[i]['totalProcdureQ4']= totalProcdureQ4 + patientGroups[i].data[j]['labelCounts']['ProcedureCount'];
                patientGroups[i]['totalOthersQ4']= totalOthersQ4 + patientGroups[i].data[j]['labelCounts']['OtherCount'];
        
                }
            }
        
        
       lableCountsYear.push ({Year: 'Y'+y}, { totalFindingQ1: patientGroups[i]['totalFindingQ1']}, 
        {totalDisorderQ1: patientGroups[i]['totalDisorderQ1']}, {totalDrugQ1: patientGroups[i]['totalDrugQ1'] }, 
        {totalLabQ1: patientGroups[i]['totalLabQ1']}, {totalProcdureQ1: patientGroups[i]['totalProcdureQ1']}, 
        {totalOthersQ1: patientGroups[i]['totalOthersQ1'] }, {totalFindingQ2:patientGroups[i]['totalFindingQ2']},
        {totalDisorderQ2: patientGroups[i]['totalDisorderQ2']}, {totalDrugQ2: patientGroups[i]['totalDrugQ2']},
        {totalLabQ2: patientGroups[i]['totalLabQ2']}, {totalProcdureQ2: patientGroups[i]['totalProcdureQ2']},
        {totalOthersQ2: patientGroups[i]['totalOthersQ2']}, { totalFindingQ3:patientGroups[i]['totalFindingQ3']}, 
        {totalDisorderQ3: patientGroups[i]['totalDisorderQ3']}, {totalDrugQ3: patientGroups[i]['totalDrugQ3'] }, 
        {totalLabQ3: patientGroups[i].data[j]['totalLabQ3']}, {totalProcdureQ3: patientGroups[i].data[j]['totalProcdureQ3']}, 
        {totalOthersQ3: patientGroups[i]['totalOthersQ3'] },{ totalFindingQ4:patientGroups[i]['totalFindingQ4']}, 
        {totalDisorderQ4: patientGroups[i]['totalOthersQ1']}, {totalDrugQ4: patientGroups[i]['totalDrugQ4'] }, 
        {totalLabQ4: patientGroups[i]['totalLabQ4']}, {totalProcdureQ4: patientGroups[i]['totalProcdureQ4']}, 
        {totalOthersQ4: patientGroups[i]['totalOthersQ4'] })
        }
     }
    //I still also need to aggregate all patients for quarter/year








    