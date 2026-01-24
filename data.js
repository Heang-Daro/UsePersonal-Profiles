const icon = document.getElementById("icon");
const html = document.documentElement;
toggleBtn.addEventListener('click', () => {
    const theme = html.getAttribute("toggleBtn");
  if(html.getAttribute("data-bs-theme")=="light")
    {
    html.setAttribute("data-bs-theme","dark");
    icon.textContent ="light_mode";
    toggleBtn.style.backgroundColor="gray"
  } 
  else {
     html.setAttribute("data-bs-theme","light");
    icon.textContent ="dark_mode";
     toggleBtn.style.backgroundColor="lightgray";
  }

});

  

function SendMessage(e) {
    e.preventDefault(); // prevent page reload
    const status = document.getElementById('status');
    
    emailjs.init("joOoGBpGqC1421j1a"); 
    
    emailjs.sendForm('service_jvm4aiz', 'template_qo9fsgf', e.target)
    .then(function(){
        alert("Message sented successfully!!")
        e.target.reset();
    }, function(error){
        
        alert("Failed to send message. Please try agian!!");
        console.error(error);
    });
}
document.getElementById("contractForm").addEventListener("submit", SendMessage);