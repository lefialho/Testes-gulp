"use strict";!function(){$(".modal-img").hide(),console.log(moment().format());var e=document.querySelector(".modal-img");e.addEventListener("click",function(){e.classList.contains("active")?e.classList.remove("active"):e.classList.add("active")})}(),function(){var t=document.querySelector(".abrir-modal"),c=document.querySelector(".modal");t.addEventListener("click",function(e){e.preventDefault(),c.classList.contains("active")?(c.classList.remove("active"),t.innerText="Abrir Modal"):(c.classList.add("active"),t.innerText="Fechar Modal")})}();