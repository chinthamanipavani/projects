//login 
let loginBtn = document.getElementById("login");

loginBtn.addEventListener("click", () => {
    navigateToLoginPage();
});

function navigateToLoginPage() {
  
    window.location.href = "./login.html";
    
}
//guest login
document.getElementById('guest-login').addEventListener('click', () => {
  window.location.href=`./organizer.html`

});

//banner-carousel
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("#image img");
  let currentIndex = 0;
  const showNextImage = () => {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
  };

  const showPrevImage = () => {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex - 1 + images.length) % images.length; 
    images[currentIndex].classList.add("active");
  };

  images[currentIndex].classList.add("active");

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "<";
  prevBtn.onclick = showPrevImage;

  const nextBtn = document.createElement("button");
  nextBtn.textContent = ">";
  nextBtn.onclick = showNextImage;

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("carousel-btns");
  buttonsContainer.appendChild(prevBtn);
  buttonsContainer.appendChild(nextBtn);
  
  document.querySelector("#image").appendChild(buttonsContainer);

  setInterval(showNextImage, 5000); // Change the image every 5 seconds
});




// Example interaction effect
// const icons = document.querySelectorAll('.icon');
// icons.forEach(icon => {
//     icon.addEventListener('click', () => {
  
//       if (document.querySelector('.birthday-video')) return;

//       // Create the video section
//       const section = document.createElement('section');
//       section.className = 'birthday-video';
//       section.innerHTML = `
//           <h2>Birthday Celebration Highlights</h2>
//           <div class="video-container">
//             <iframe 
//               src="https://www.youtube.com/embed/QZnHb1RYg1E" 
//               title="A Magical Birthday Celebration" 
//               frameborder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//               allowfullscreen>
//             </iframe>
//           </div>
//       `;
//       document.body.appendChild(section);



//     });
// });

document.addEventListener('DOMContentLoaded', () => {
  const icons = document.querySelectorAll('.icon');

  icons.forEach(icon => {
    icon.addEventListener('click', () => {
     alert('clicked')
    })
  });
});









let container=document.getElementById("container")


let url="https://general-reinvented-pruner.glitch.me/events"
let url2="https://general-reinvented-pruner.glitch.me/more"
async function getData(){
try{
  let res=await fetch(url)
if(!res.ok){
  throw new Error("http error")
}
let result=await res.json()
console.log(result)
localStorage.setItem("products",JSON.stringify(result))
displayData(result)
displayButton(result)
}catch(err){
console.error(err.message)
}
}
function displayData(events){
  console.log(events)
  container.innerHTML=""
  events.forEach(obj=>{
   let {id,logo:{url},category,tickets,start:{timezone,month,local},online}=obj
    let item=document.createElement("div")
    item.className="item"
      item.innerHTML= `
   <img src="${url}" class="image">
 
   <p><b>${category}</b></p>
   <p><b>Mode : </b> ${online}</p>
   <p><b>Country : </b>${timezone}    <b>month</b>${month}<p>
      <p><b>Local : </b>${local}<p>
   `
   item.addEventListener("click", () => getMoreData(id));
   container.appendChild(item)
    
  })

}




let abortController;

async function getData2(){
  abortController = new AbortController();
  try {
    let res = await fetch(url2, { signal: abortController.signal });
    if (!res.ok) {
      throw new Error("HTTP error");
    }
    let result = await res.json();
    // Store the full product list in local storage
    localStorage.setItem("products", JSON.stringify(result));
    // Initially display all items
    displayData2(result);
    displayButton(result);
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      console.error(err.message);
    }
  }
}

function displayData2(result) {
  // Clear the container before displaying new items
  container.innerHTML = "";
  result.forEach(obj => {
    createItem(obj);
  });
}

function createItem(obj) {
  let { id, logo: { url }, category, tickets, start: { timezone, month, local }, online } = obj;
  let item = document.createElement("div");
  item.className = "item";
  item.innerHTML = `
    <img src="${url}" class="image">
    <p><b>${category}</b></p>
    <p><b>Mode : </b>${online}</p>
    <p><b>Country : </b>${timezone} <b>Month : </b>${month}</p>
    <p><b>Local : </b>${local}</p>
  `;
  item.addEventListener("click", () => getMoreData(id));
  container.appendChild(item);
}

document.addEventListener("DOMContentLoaded", () => {
  let seeMore = document.getElementById("seeMore");
  let seeLess = document.getElementById("seeLess");
  
  seeMore.addEventListener("click", () => {
    seeLess.style.display = "block";
    seeMore.style.display = "none";
    getData2();
  });
  
  seeLess.addEventListener("click", () => {
    if (abortController) {
      abortController.abort();
    }
    seeLess.style.display = "none";
    seeMore.style.display = "block";
    
    let products = JSON.parse(localStorage.getItem("products"));
    if (products) {
      container.innerHTML = ""; 
      products.slice(0, 8).forEach(obj => {
        createItem(obj);
      });
    }
  });
});


function getMoreData(id){
  console.log("hai")
  window.location.href=`./index2.html?id=${id}`
}

getData2()
getData()
//filter
function displayButton(events){
 main.innerHTML=`<option value="all">Categories</option>`
let categoryArr=events.map(obj=>obj.category)
// console.log(categoryArr)
Array.from(new Set(categoryArr)).forEach(ele=>{
  // console.log(ele)
  let option=document.createElement("option")
  option.value=ele
  option.innerHTML=ele
  main.appendChild(option)
})
main.addEventListener("change",function (){
  let ele=main.value
  let products = JSON.parse(localStorage.getItem("products"));
  if(ele==="all"){
    displayData(products)

}
else{
    filterData(ele,products)
}
container.scrollIntoView({ behavior: "smooth" });
})
}
function filterData(ele,events){
  let category=events.filter(obj=>obj.category===ele)
  displayData(category)
}

//about
function toggleServices() {
  const list = document.getElementById('services');
  const arrow = document.getElementById('arrow');
  list.classList.toggle('show');
  arrow.classList.toggle('rotate');
}
//search
let searchInput = document.getElementById("search-input");
// Trigger filtering only when Enter is pressed
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    let query = searchInput.value.trim().toLowerCase();
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let filtered = products.filter(obj =>
      obj.category.toLowerCase().includes(query) ||
      obj.start.timezone.toLowerCase().includes(query) || 
      obj.start.month.toLowerCase().includes(query) ||
      obj.start.local.toLowerCase().includes(query) ||     
      obj.online.toLowerCase().includes(query)             
    );
    if (filtered.length > 0) {
      displayData(filtered);
      container.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("No matching event found.");
    }
    searchInput.value = "";
    searchInput.focus();
  }
});

// Accordion logic
const ac = document.querySelectorAll(".accordion");
ac.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");
        const panel = button.nextElementSibling;
        panel.style.display = (panel.style.display === "block") ? "none" : "block";
    });
});


// Accordion logic
const acc = document.querySelectorAll(".accordion");
acc.forEach(button => {
button.addEventListener("click", () => {
    button.classList.toggle("active");
    const panel = button.nextElementSibling;
    panel.style.display = (panel.style.display === "block") ? "none" : "block";
});
});

// Create Event logic
const form = document.querySelector("form");
const eventList = document.getElementById("eventList");

form.addEventListener("submit", function (e) {
e.preventDefault(); // Prevent page reload

// Get all input values
const inputs = form.querySelectorAll("input");
const eventData = {};
inputs.forEach(input => {
    const key = input.placeholder.replace(/\s+/g, '');
    eventData[key] = input.value;
});

// Create event card
const card = document.createElement("div");
card.style.border = "1px solid #ccc";
card.style.borderRadius = "10px";
card.style.padding = "20px";
card.style.marginTop = "10px";
card.style.backgroundColor = "#fff";
card.innerHTML = `
    <h3>${eventData.EventName}</h3>
    <p><strong>Title:</strong> ${eventData.Title}</p>
    <p><strong>Description:</strong> ${eventData.Description}</p>
    <p><strong>City:</strong> ${eventData.City}</p>
    <p><strong>Organizer:</strong> ${eventData.OrganizerName}</p>
    <p><strong>Followers:</strong> ${eventData.Followers}</p>
    <p><strong>Follow:</strong> ${eventData.Follow}</p>
    <p><strong>Category:</strong> ${eventData.Category}</p>
    <p><strong>Online:</strong> ${eventData.Online}</p>
    <p><strong>URL:</strong> ${eventData.URL}</p>
    <p><strong>Area:</strong> ${eventData.Area}</p>
    <p><strong>Timezone:</strong> ${eventData.Timezone}</p>
    <p><strong>Time:</strong> ${eventData.Time}</p>
    <p><strong>Week:</strong> ${eventData.Week}</p>
    <p><strong>Month:</strong> ${eventData.Month}</p>
    <p><strong>Local:</strong> ${eventData.Local}</p>
    <p><strong>UTC:</strong> ${eventData.UTC}</p>
    <p><strong>Hours:</strong> ${eventData.Hours}</p>
    <p><strong>Age:</strong> ${eventData.Age}</p>
    <p><strong>Parking:</strong> ${eventData.Parking}</p>
`;

// Append to event list
container.appendChild(card);

// Optionally clear form
form.reset();
});