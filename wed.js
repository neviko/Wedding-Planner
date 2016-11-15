/*Ori Amir 305399420 ,Matan Antebi 303093587 ,Nevo Sayag 200484426 */

var flag=0; // represents if we have already wedding on localStorage ( 0=no , 1=yes)



// ************* Editwedding info functions ***************************** //


var updateWedInfoValues=function()
{
    //take values from input 
    var manName = $("#manIdUpdate").val();
    var womanName = $("#womanIdUpdate").val();
    var weddingDate=$("#weddingDateUpdate").val();
    var weedingLocation =$("#locationIdUpdate").val();

    //check the values
    if(manName=="" && womanName=="" &&  weddingDate=="" && weedingLocation=="")
    {
        sweetAlert("Wrong input", "All fields empty", "error");
        return;
    }    
    //check if date is llegael by private func checkDate
    var weDate  = new Date(weddingDate);
    if(checkDate(weDate)==-1)
    {
            sweetAlert("Wrong input", "Date is Illegal", "error");
            return;
    }

    //update the values by the input
    var wedInfo = JSON.parse(localStorage.getItem("WedInfo"));
    if(manName!="")
            wedInfo[0].manName=manName;
    if(womanName!="")
            wedInfo[0].womanName=womanName;
    if(weddingDate!="")
        wedInfo[0].weddingDate=weddingDate;
     if(weedingLocation!="")
        wedInfo[0].weedingLocation=weedingLocation;
        
    localStorage.setItem("WedInfo", JSON.stringify(wedInfo));

    fillPrimaryTable(); //paint again the table
    swal("Update Sucess!", "Your new values are saved(empty values not updated!)", "success")
    
    //insert the new values to the input box
    var wedInfo = JSON.parse(localStorage.getItem("WedInfo"));
    $("#manIdUpdate").val(wedInfo[0].manName);
    $("#womanIdUpdate").val(wedInfo[0].womanName);
    $("#weddingDateUpdate").val(wedInfo[0].weddingDate);
    $("#locationIdUpdate").val(wedInfo[0].weedingLocation);
    
}


var showNewOrEdit = function()//function that called when click on new/edit button
{
    //hide the othres div
    $(".primaryDiv").hide();
    $(".guestDiv").hide();
    $(".supDiv").hide();
    
    $('nav a').removeClass('active');
    $('#cmdNew').addClass('active');
    
    //check if exists alredy exists wedding
    if(flag==0)
        $(".newWeddingDiv").show();
    else
    {
        //put buttons unavalible
        $('#cmdPrimary').attr("disabled", false);
        $('#cmdGuests').attr("disabled", false);
        $('#cmdSup').attr("disabled", false);

        //change button new to edit
        $("#cmdNew").text("Edit");
        $(".newWeddingDiv").hide();
        $(".editWeedingDiv").show();

        $('nav a').removeClass('active');
        $('#cmdNew').addClass('active');

        var wedInfo = JSON.parse(localStorage.getItem("WedInfo"));

        //update the inputbox to the values
        $("#manIdUpdate").val(wedInfo[0].manName);
        $("#womanIdUpdate").val(wedInfo[0].womanName);
        $("#weddingDateUpdate").val(wedInfo[0].weddingDate);
        $("#locationIdUpdate").val(wedInfo[0].weedingLocation);
    }

}




// ************* END of  edit wedding info functions ***************************** //











// ************* Add  new wedding functions ***************************** //


var showNew=function() //function that show New Wedding page and hide te others
{
    $(".primaryDiv").hide();
    $(".guestDiv").hide();
    $(".editWeedingDiv").hide();
    $(".supDiv").hide();
    $(".newWeddingDiv").show();
    
    $('nav a').removeClass("active");
    $('#cmdNew').addClass("active");
    //put buttons unavalible
    if(localStorage.getItem("WedInfo") == undefined)
        {
              $('#cmdPrimary').attr("disabled", true);
            $('#cmdGuests').attr("disabled", true);
            $('#cmdSup').attr("disabled", true);
    
        }
  
    //put default values
    document.getElementById("manId").value = "";
    document.getElementById("womanId").value = "";
    document.getElementById("weddingDate").value = "";
    document.getElementById("locationId").value = "";


}


var addNewWedding = function() //function that add a new wedding
{
    //take the values from the input
    var manName = $("#manId").val();
    var womanName = $("#womanId").val();
    var weddingDate=$("#weddingDate").val();
    var weedingLocation=$("#locationId").val();
    
    //check the input
    if(manName=="" || womanName=="" || weedingLocation=="" || weddingDate=="" )
    {
        sweetAlert("Wrong input", "You must fill all fileds", "error");
        return;
    }
    
    //check if the date is legal by sending to another method - checkDate that check it
    var weDate  = new Date(weddingDate); 
    if(checkDate(weDate)==-1)
    {
            sweetAlert("Wrong input", "Date is Illegal", "error");
            return;
    }
    //create a swal dialog that ask if to delete the current wedding and create a new one
    if(flag==1)
    {
        swal(
            {   title: "Are you sure?",   text: "All your wedding data will delete!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, delete it!",   cancelButtonText: "No, cancel plx!",   closeOnConfirm: false,   closeOnCancel: false }, function(isConfirm){   
                if (isConfirm) {
                     swal("Deleted!", "Your new wedding is created", "success"); 
                    deleteAndCreateWed(manName,womanName,weddingDate,weedingLocation);

                } 
                else{ swal("Cancelled", "Your wedding is save", "error");   } });
    }
    else //not exsist yet a wedding - > can create withot dialog
        deleteAndCreateWed(manName,womanName,weddingDate,weedingLocation);
    
    //put buttons unavalible
    $('#cmdPrimary').attr("disabled", false);
    $('#cmdGuests').attr("disabled", false);
    $('#cmdSup').attr("disabled", false);
    
}


var deleteAndCreateWed=function(manName,womanName,weddingDate,weedingLocation) //function that delete the current localStoarge and create new wedding with the info from input
{
         //delete all current data from localStoarge
        if(localStorage.getItem("WedInfo") != undefined)
                localStorage.removeItem("WedInfo");
        if(localStorage.getItem("Mission") != undefined)
                    localStorage.removeItem("Mission");
        if(localStorage.getItem("Guests") != undefined)
                    localStorage.removeItem("Guests");
         if(localStorage.getItem("Sup") != undefined)
                    localStorage.removeItem("Sup");
                
        //create a new empty objects and insert them to the localStoarge
         var wedInfo = [];
         var mission = [];
         var guests = [];
         var sup = [];

        localStorage.setItem("Mission", JSON.stringify(mission));
        localStorage.setItem("WedInfo", JSON.stringify(wedInfo));
        localStorage.setItem("Guests", JSON.stringify(guests));
        localStorage.setItem("Sup", JSON.stringify(sup));

                
        //creaate a new object of wedding info and insert him to localStoarge
        var wedInfo = {manName : manName, womanName:                                  womanName,weddingDate:weddingDate,weedingLocation:weedingLocation};

        var wedInfoStr = localStorage.getItem("WedInfo");
        var wedInfoStrObj = JSON.parse(wedInfoStr);
        wedInfoStrObj.push(wedInfo);
        localStorage.setItem("WedInfo", JSON.stringify(wedInfoStrObj));
                
                
        fillPrimaryTable();  //update the lables of weeding information!
        //show the primary page and hide the others 
        $(".primaryDiv").show();
        $(".newWeddingDiv").hide();
        $("#cmdNew").text("Edit"); //change name of button "new" to " edit "
    
        $('nav a').removeClass('active');
        $('#cmdPrimary').addClass('active');
    
        flag=1; // say that now we have a wedding info on localStoarge
}





// ************* End of Add  new wedding functions ***************************** //










// ************* Primary functions ***************************** //



var showPrimary = function() //function that show primary page and hide the others
{
        
        $(".newWeddingDiv").hide();
        $(".guestDiv").hide(); 
        $(".editWeedingDiv").hide();
        $(".supDiv").hide();
        $(".primaryDiv").show();
        fillPrimaryTable();
    
        $('nav a').removeClass('active');
        $('#cmdPrimary').addClass('active');
}



var addMission=function()//function that add a new mission to the localStoarge and to the table of missions
{
    if(localStorage.getItem("Mission")== undefined) //check if exsists
    {
        var mission = [];
        localStorage.setItem("Mission", JSON.stringify(mission));
    }
    //create a build pop up with swal and check the input values
    swal({   title: "New Mission!",   text: "Insert your mission:",   type: "input",   showCancelButton: true,   closeOnConfirm: false,   animation: "pop",   inputPlaceholder: "Write something",confirmButtonText:"Insert" }, 
         function(inputValue)
         {
            if (inputValue === false) 
                return false;     
            if (inputValue === "") 
            {   
                swal.showInputError("You need to write something!");  
                return false;   
            } 
            swal({   title: "Wait",   text: "Mission Add sucsscfully",   timer: 500,   showConfirmButton: false });
            
            //initalize new object with the input values and insert him to localStoarge ( after get it out from localStoarge)
            var NewMission = inputValue;
            var isPerfomed = false;
            var miss = {mission : NewMission, isPerfomed:isPerfomed};
            var missStr = localStorage.getItem("Mission");
            var missObj = JSON.parse(missStr);
            missObj.push(miss);
            localStorage.setItem("Mission", JSON.stringify(missObj));
            fillPrimaryTable();    
    
        }); 

}

var fillPrimaryTable=function() //function that paint the table of missions and add the wedding info to the lables
{
     if(localStorage.getItem("Mission") != undefined) //check if exists missions
     {       
            var fin=0; //count how many missions is complete until now
            $("#missionTbl").find("tr:not(:first)").remove(); //remove all table except the first line
            var mission = JSON.parse(localStorage.getItem("Mission"));

            for(var i=0;i<mission.length;i++) //run on all missions and paint them to table
            {     
                //create a delete button to currnt mission
                 var button="  <button class='btn btn-xs btn-danger'  onclick='delFromTable("+i+",1)' type='button' id='idm"+i+"'>X</button>";
                
                if(mission[i].isPerfomed==true) //check if the checkBox is marked or not and create him
                {
                    var checkBox="<input type='checkbox' checked onclick='updateMissionChechBox("+i+")' id='"+i+"'>";
                    fin++;
                }
                else
                    var checkBox="<input type='checkbox' unchecked onclick='updateMissionChechBox("+i+")' id='"+i+"'>";

                //add a new row to the last line with checkbox and delete button
                var row = "<tr><td>" + (i+1) + "</td><td>" + mission[i].mission + "</td><td>" + checkBox+"</td><td>" +button+"</td></tr>";
                $("#missionTbl").find("tr:last").after(row);

           }
            //calculate how precent from the mission is complete until now and added this to the remainMissionLabel label 
           var c=0;
           if(mission.length!=0)
               c=Math.floor((fin/(mission.length))*100);
           else  
               c = 100;
         
          var tC="Total mission finished: "+c+"%";
          $("#remainMissionLabel").text(tC);

     }

    if(localStorage.getItem("WedInfo") != undefined) //check if exists info
    {          
            var wedInfo = JSON.parse(localStorage.getItem("WedInfo"));

            if(wedInfo.length>0) //check if exists couple
            {
                var weDate  = new Date((wedInfo[0].weddingDate)); //get the wedding date
                var cuDate=new Date(); //get the current date
                
                //calc how long time is left to the wedding frmo today
                var calac= weDate.getTime() - cuDate.getTime();
                var date= (calac / (1000*60*60*24));
                
                //insert all wedding information to their lables! 
                var names = wedInfo[0].manName + " & "+ wedInfo[0].womanName;
                var dateLabel=wedInfo[0].weddingDate;
                var loc=wedInfo[0].weedingLocation;

                if(date!=NaN)
                {
                    var remain=Math.floor(date) +" days remain to wedding";
                    $("#remainLabel").text(remain);
                }
                $("#coupleLabel").text(names);
                $("#dateLabel").text(dateLabel);
                $("#locLabel").text(loc);
            }
            
    }
    
}



function updateMissionChechBox(index) //function that updated the checkBox of Mission by click on him
{
    //get mission object from the localStoarge and check if the checkbox is check or not and update is perfomed by this
    var mission = JSON.parse(localStorage.getItem("Mission"));
    if(mission[index].isPerfomed==false)
        mission[index].isPerfomed=true;
    else
        mission[index].isPerfomed=false;
    
    localStorage.setItem("Mission", JSON.stringify(mission));
    fillPrimaryTable();
    
}




// ************* END of primary functions ***************************** //










// ************* Guests functions ***************************** //


var showGuests = function() //functin that show the guests paage and hide the others
{
    $(".newWeddingDiv").hide();
    $(".primaryDiv").hide();
    $(".editWeedingDiv").hide();
    $(".supDiv").hide();
    $(".guestDiv").show(); 
    $("#guestName").value=" ";
    fillGuestsTable();
    
    $('nav a').removeClass('active');
    $('#cmdGuests').addClass('active');
}

var addGuest=function()
{
    if(localStorage.getItem("Guests")== undefined) //check if exists already on localStoarge
    {
        var guests = [];
        localStorage.setItem("Guests", JSON.stringify(guests));
    }
    
    //take the values from the input and check them
    var guestName = $("#guestName").val();
    var numOfGuest = $("#numOfGuest").val();
    var isConfirm=false;

    if(guestName=="" || numOfGuest=="")
    {
       sweetAlert("Wrong input", "Need to fill all fields", "error");
       return;
    }

    if(isNaN($("#numOfGuest").val()))
    {
        sweetAlert("Wrong input", "Num of guests MUST be a number!", "error");
        return;
    }
    var a=parseInt(numOfGuest);
    if(a<1)
    {
       sweetAlert("Wrong input", "Num of guests MUST be bigger than 0", "error");
        return;
    }
    //create a new obeject ant initliaze him with the values ,than get out from localstoarge , return it back with the new obejct
    var guestInfo = {guestName : guestName, isConfirm:isConfirm, numOfGuest:numOfGuest};
    var guestStr = localStorage.getItem("Guests");
    var guestObj = JSON.parse(guestStr);
    guestObj.push(guestInfo);
    localStorage.setItem("Guests", JSON.stringify(guestObj));
    
    fillGuestsTable();
    
}

var fillGuestsTable=function() //function that paint the table of the Guests
{
    if(localStorage.getItem("Guests") != undefined)
    {       
        var counter=0; //sum the total guests 
        var confirm=0; //sum all the confirm
        var checkbox="";
        $("#guestsTbl").find("tr:not(:first)").remove(); //remove all table except first line
        var guests = JSON.parse(localStorage.getItem("Guests"));
        
        for(var k=0;k<guests.length;k++) //run on all guests and add to table
        {
            
            if(guests[k].numOfGuest == NaN || guests[k].numOfGuest=="")
                guests[k].numOfGuest = 1;
            
            var a=parseInt(guests[k].numOfGuest); //convery current numOfGuest to num
            counter+=a;
            
             if(guests[k].isConfirm==true) //for the checkBox ( come or not)
             {
                 checkBox="<input type='checkbox' checked onclick='updateGuestsChechBox("+k+")' id='guest"+k+"'>";
                 confirm+=a;                
             }
             else
                checkBox="<input type='checkbox' unchecked onclick='updateGuestsChechBox("+k+")' id='guest"+k+"'>";
            
            //create a delete button to every row 
             var button="  <button class='btn btn-xs btn-danger'  onclick='delFromTable("+k+",0)' type='button' id='id"+k+"'>X</button>";
            
           //add the row with the checkbox and the delete button to every row
            var row = "<tr><td>" + (k+1) + "</td><td>" + guests[k].guestName + "</td><td>" + guests[k].numOfGuest +"</td><td>"+ checkBox +"</td><td>"+button+ "</td></tr>";
            
           $("#guestsTbl").find("tr:last").after(row); //add to the last line

        }
        //add a row of total guest and confirm
        var total = "<tr><td>" +"Total" + "</td><td>" + ""+ "</td><td>" +counter +"</td><td>"+ confirm + "</td><td></td></tr>";
        $("#guestsTbl").find("tr:last").after(total);
        
        document.getElementById("guestName").value = "";
        document.getElementById("numOfGuest").value = "";
        document.getElementById("searchGuest").value = "";
        
   }
   
}



var searchGuests=function() // function that serach guest by name every time when click on serach inputBox
{
     ///the function work like fillGuestsTable execpt the lines that shed paint just the wanted people from the input box 
     if(localStorage.getItem("Guests") != undefined)
     {
   
        var guests = JSON.parse(localStorage.getItem("Guests"));
        var guestName = $("#searchGuest").val();
        var counter=0;
        var confirm=0;
        $("#guestsTbl").find("tr:not(:first)").remove();
         var checkBox="";
        for(var k=0;k<guests.length;k++)
        {
            //take just the guests that equale to what insert in serach input
            var res = (guests[k].guestName).substring(0,guestName.length ); 
            //check also Upper letters and low letters
            var upCase=res.toUpperCase();
            var lowCasw=res.toLocaleLowerCase();
            
            //if the guestName equel to value in inputBox show all the wanted 
            if(upCase==guestName || lowCasw==guestName || guestName=="")
            {

                if(guests[k].numOfGuest == NaN || guests[k].numOfGuest=="")
                    guests[k].numOfGuest = 1;
                var a=parseInt(guests[k].numOfGuest);
                counter+=a;
                
                if(guests[k].isConfirm==true)
                {
                     checkBox="<input type='checkbox' checked onclick='updateGuestsChechBox("+k+")' id='guest"+k+"'>";
                    confirm+=a;                
                }
                else
                     checkBox="<input type='checkbox' unchecked onclick='updateGuestsChechBox("+k+")' id='guest"+k+"'>";
                
                var button="  <button class='btn btn-xs btn-danger'  onclick='delFromTable("+k+",0)' type='button' id='idmi"+k+"'>X</button>";    
                
                var row = "<tr><td>" + (k+1) + "</td><td>" + guests[k].guestName + "</td><td>" + guests[k].numOfGuest +"</td><td>"+ checkBox + "</td><td>"+button+"</td></tr>";
                $("#guestsTbl").find("tr:last").after(row);
            }

        
        }
        var total = "<tr><td>" +"total" + "</td><td>" + ""+ "</td><td>" +counter +"</td><td>"+ confirm + "</td></tr>";
        $("#guestsTbl").find("tr:last").after(total);
          
    }
    
}


function updateGuestsChechBox(index) //function that updated the checkBox of Guests by click on him
{
    //get guests object from the localStoarge and check if the checkbox is check or not and update is perfomed by this
    var g = JSON.parse(localStorage.getItem("Guests"));
    if(g[index].isConfirm==false)
        g[index].isConfirm=true;
    else
        g[index].isConfirm=false;
    
    localStorage.setItem("Guests", JSON.stringify(g)); 
    fillGuestsTable();
}


// ***************  End of Guests functions *************** //








// ***************  Suppliers functions *************** //


var addSup = function()  //function that add a new sup to the localStoarge and than to the table
{
    if(localStorage.getItem("Sup")== undefined)
    {
        var sup = [];
        localStorage.setItem("Sup", JSON.stringify(sup));
    }
    
    var kindSup = $("#mySelect").val();
    var supName = $("#supName").val();
    var amount = $("#amount").val();
    var paid = $("#paid").val();
    
    //check that the input is ok
     if (supName== "" || amount=="" || paid=="")
     {
          sweetAlert("Wrong input", "Some field is miss", "error");
          return;
     }
     if (isNaN(amount) || isNaN(paid))
     {
          sweetAlert("Wrong input", "Amount & Paid MUST be a numbers", "error");
          return;
      }
   
     var tAmount=parseInt(amount); //convert amount to number 
     var tPaid=parseInt(paid); //convert paid to number
     if (tAmount<1 || tPaid<0 )    
     {
           sweetAlert("Wrong input", "Amount must be bigger than 0,Paid must be equel or bigger than 0", "error");
            return;
     }
     if (tPaid>tAmount)
     {
            sweetAlert("Wrong input", "Paid can't be bigger than amount", "error");
            return;
     }
    
    //create a new object-sup and initalize him with the values from the input
     var sup = {kindSup:kindSup, supName:supName, amount:amount, paid:paid};
    
    //pull the Sup string from localStorage ,convert it to object and push to the object the new object to there , than return the new object to localStoarge after convert
     var supStr = localStorage.getItem("Sup");
     var supObj = JSON.parse(supStr);
     supObj.push(sup);
     localStorage.setItem("Sup", JSON.stringify(supObj));
    
     fillSupTable(); //call the function fillTable that paintes the sup table
    
}

var fillSupTable=function() //function that paintes the SupTable
{
    if(localStorage.getItem("Sup") != undefined)
    {
        var sumAmount=0; // represent the total aomunt
        var sumPaid=0; // represent the total paid
        $("#supTbl").find("tr:not(:first)").remove(); //remove all the table execpt the first line
        var sups = JSON.parse(localStorage.getItem("Sup")); //get out from localStoarge
        for (var t=0; t<sups.length; t++)
        {        
            var button="<button type='button' class='btn-xs btn-success' onclick='ShowUpdateSup("+t+")' id = 'updateSupPopUp"+t+"'>Update</button>"; //add a button of update to every line
                
            //calac the current summry of amount and paid
            var sumAmountTemp = parseInt(sups[t].amount);
            var sumPaidTemp = parseInt(sups[t].paid);
            sumAmount+=sumAmountTemp;
            sumPaid+=sumPaidTemp;
            var c=sups[t].amount-sups[t].paid;
            
            //add the row to the last line
            var row = "<tr><td>" + (t+1) + "</td><td>" + sups[t].kindSup + "</td><td>" + sups[t].supName +"</td><td>"+sups[t].amount +"</td><td>" + sups[t].paid + "</td><td>" +c  + "</td><td>"+button+"</td></tr>";            
            $("#supTbl").find("tr:last").after(row);

        }
        //add the summary values from the table 
        var total = "<tr><td>" + "Total" + "</td><td>" + "" + "</td><td>" + "" +"</td><td>"+sumAmount +"</td><td>" + sumPaid+ "</td><td>" + (sumAmount-sumPaid )  + "</td><td></td></tr>"; 
        $("#supTbl").find("tr:last").after(total);
        
        //initalize the values to be empty
        document.getElementById("supName").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("paid").value = "";
        
        
    } 
}
    
var closePopUp=function() //function that close the popUp of the update Sup
{
    $(".updateSupDiv").hide();
    $(".popUpSup").hide();
}

var showSup = function() //function that show the sup page and hide the others
{
    $(".primaryDiv").hide();
    $(".guestDiv").hide();
    $(".editWeedingDiv").hide();
    $(".newWeddingDiv").hide();
    $(".supDiv").show();
    fillSupTable();
    
    $('nav a').removeClass('active');
    $('#cmdSup').addClass('active');
}



function ShowUpdateSup(index) //function that add update&delte button to updateSupllier page and show the update page
{
    
    $("#tblUpdateSup").find("tr:last").remove(); //remove last line from table of updateSup
    $(".updateSupDiv").show();
    $(".popUpSup").show();
    
    //put the values into the input box
    var sup = JSON.parse(localStorage.getItem("Sup"));
    $("#supplierNameUpdate").val(sup[index].supName);
    $("#amountUpdate").val(sup[index].amount);
    $("#paidUpdate").val(sup[index].paid);
    
    
    var updBut="<button type='button' class='btn btn-info' onclick='updateSupValues("+index+")' id='cmdUpd'>Update Supllier</button>"; //create update button
    
    //row includede update & delete button
    var row="<tr><td>" +"<button type='button' class='btn btn-danger' onclick='delFromTable("+index+",2)' id='cmdDelSup'>delete Supllier</button>"+ "</td><td>"+updBut+"</td></tr>";

    $("#tblUpdateSup").find("tr:last").after(row);
    
}

 //function that update supllier values by index that represnts num of line to updete in tha table
function updateSupValues(index)
{
    //take the values from the input box
    var supName=$("#supplierNameUpdate").val();
    var amount=$("#amountUpdate").val();
    var paid=$("#paidUpdate").val();

    //check the input
    if (supName== "" || amount=="" || paid=="")
     {
          sweetAlert("Wrong input", "Some field is miss", "error");
            return;
     }
     if (isNaN(amount) || isNaN(paid) )
     {
          sweetAlert("Wrong input", "Amount&paid MUST be a numbers", "error");
            return;
     }
     var tAmount=parseInt(amount); //convert amount to num
     var tPaid=parseInt(paid); //convery paid to num
    
     if (tPaid<0 ||tAmount<1)
     {
         sweetAlert("Wrong input", "Amount must be bigger than 0,Paid must be equel or bigger than 0", "error");
          return;
     }
    
     if (tPaid>tAmount)
     {
            sweetAlert("Wrong input", "Paid can't be bigger than amount", "error");
            return;
     }

    //get out the Sup from localStorage and update the right value by index
     var g = JSON.parse(localStorage.getItem("Sup"));
     g[index].supName=supName;
     g[index].amount=amount;
     g[index].paid=paid;
     localStorage.setItem("Sup", JSON.stringify(g));

     fillSupTable(); //paint again the sup table
    
    //hide the update page
     $(".updateSupDiv").hide();
     $(".popUpSup").hide();
    
}






// ***************  End of Suppliers functions *************** //








// ************* Generl functions ***************************** //



function checkDate(wantedDate) //function that check if date is llegal and return 1 if yes
{
    if(wantedDate=="")
        return -1;
    
    var nowDate  = new Date(); //get current Date
    var wanD=new Date(wantedDate); //get the wanted get 
    
    //cheeck if the date is ok
    var calac= wanD.getTime() - nowDate.getTime();
    if( calac<0)
        return -1;
    
    return 1;    
}


//function that delete object from localstorage. idnum=number of object to delete , choise=from whice localStorage to delete (0-guests,1-missions ,2-sup) 
function delFromTable(idnum,choise) 
{
    var n="";
    if(choise==0)
        n="Guests";
    else if(choise==1)
        n="Mission";
    else if(choise==2)
        n="Sup";
    
    //get out the wanted item from the localStorage and delete the wanted object by idnum
    var array = JSON.parse(localStorage.getItem(n));
    array.splice(idnum,1);
    //return the new array to the localStorage withot the wanted item
    localStorage.setItem(n, JSON.stringify(array));
    
    //need to paint again the wanted table
    if(choise==0)
       fillGuestsTable();
    if(choise==1)
        fillPrimaryTable();
    else
    {
         $(".updateSupDiv").hide();
         $(".popUpSup").hide();
         fillSupTable();
    }
        
    
}


var loadPage = function()  //function that called when loading the page!
{
    //check whice page to load->the edit or new wedding by checking if exists already wedInfo object on local stoarge
    var wedInfo = JSON.parse(localStorage.getItem("WedInfo"));
    if(wedInfo!=undefined && wedInfo.length>0)
    {
               flag=1;
                showNewOrEdit();  
    }
    else
       showNew(); 
    
    
    //connect Suppliers page buttons to their functions 
    $("#cmdSup").click(showSup); //when click on suppliers on nav
    $("#cmdAddSup").click(addSup); //when adding new supllier
    $("#closePopUp").click(closePopUp); //when close the popUp of update

    
    
     //connect Guests page buttons to their functions 
    $("#cmdGuests").click(showGuests);//when click on suppliers on nav
    $("#cmdAddGuest").click(addGuest); //when adding new guest
   // $("#searchGuest").click(searchGuests); //when serching a guest

     //when the press ic click on Serach inputBox the serachGuests function called
     $("#searchGuest").keypress(searchGuests);
     $("#searchGuest").keydown(searchGuests); 
     $("#searchGuest").keyup(searchGuests);

    //connect Primary page buttons to their functions 
    $("#cmdPrimary").click(showPrimary); //when click on primary on nav
    $("#cmdAddMission").click(addMission); //when adding now mission

    
    //connect new/edit Wedding page buttons to their functions 
    $("#createNewCouple").click(showNew);//when clicking on button "create new wedding"
    $("#cmdAddNewWed").click(addNewWedding); //when clicking on new wedding button
    $("#cmdNew").click(showNewOrEdit); // when clicking on edit/new button
    $("#cmdUpdateCouple").click(updateWedInfoValues); //when clicking on button "update" on edit page
    
};

// *************End of Generl functions ***************************** //