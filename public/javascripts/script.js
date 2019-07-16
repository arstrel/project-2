document.addEventListener('DOMContentLoaded', () => {
 
  let nextButton = document.getElementById('nextButton');
  let backButton = document.getElementById('backButton');
  let saveConfigButton = document.getElementById('save-config-btn')
  let netSalesInput = document.getElementById("net-sales");
  let regAutoGratInput = document.getElementById("20-auto-grat");
  let eventAutoGratInput = document.getElementById("event-auto-grat");
  let chargeTipInput = document.getElementById("charge-tip");
  let liquorInput = document.getElementById("liquor");
  let beerInput = document.getElementById("beer");
  let wineInput = document.getElementById("wine");
  let foodInput = document.getElementById("food");
  let foodRunnerSwitch = document.getElementById('foodRunnerYes');
  let bartenderSwitch = document.getElementById('bartenderSwitch');
  let eventTipDropdown = document.getElementById('eventTipPercentage');
  let numberOfServersDropdown = document.getElementById('numberOfServers');
  let reportId;

  saveConfigButton.onclick = function (e) {
    e.preventDefault();

    axios.post('/setup-save', {
      eventTipPercentage: +eventTipDropdown.value,
      tipoutPercentage: 0.02,
      tipoutfoodRunnerPercentage: 0.02,
      doTipFoodRunner: foodRunnerSwitch.checked,
      doTipBartender: bartenderSwitch.checked,
      numberOfServers: +numberOfServersDropdown.value
    })
    .then((report)=> {
      console.log(report);
      reportId = report.data._id;
      M.toast({html: `Configuration saved`})
    })
    .catch(error=> {
      M.toast({html: 'Something went wrong saving the config'})
      console.log(error)
    })

  }


  nextButton.onclick = function(e) {
    e.preventDefault();
    
    axios.post('/check-save', {
      //+ in front of input.value turns string to number
      netSales: +netSalesInput.value,
      regAutoGrat: +regAutoGratInput.value,
      eventAutoGrat: +eventAutoGratInput.value,
      chargeTip: +chargeTipInput.value,
      liquorTotal: +liquorInput.value,
      beerTotal: +beerInput.value,
      wineTotal: +wineInput.value,
      foodTotal: +foodInput.value
    })
    .then((check)=> {
      M.toast({html: `Check ${check.data._id} saved, ready for the next. Belong to report ${reportId}`});





    })
    .catch((error)=> {
      M.toast({html: 'Something went wrong creating a check'})
      console.log(error);
    });


    next();
  }
  backButton.onclick = function(e) {
    e.preventDefault();
    M.toast({html: 'Showing previous check'});
    back();
  }












































}, false);
