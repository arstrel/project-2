document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');
 
  let nextButton = document.getElementById('nextButton');
  let backButton = document.getElementById('backButton');
  nextButton.onclick = function(e) {
    e.preventDefault();
    M.toast({html: 'Check saved, enter the next'});
    


    next();
  }
  backButton.onclick = function(e) {
    e.preventDefault();
    M.toast({html: 'Showing previous check'});
    back();
  }












































}, false);
