//banner-carousel








  // LOGIN
let loginBtn = document.getElementById("login");
loginBtn.addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", "true"); // sets login state
    navigateToLoginPage();
});
function navigateToLoginPage() {
    window.location.href = "./login.html";
}
document.getElementById("guest-login").addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", "false"); 
    navigateToGuestLoginPage(); 
});

function navigateToGuestLoginPage() {
    window.location.href = "./organizer.html"; 
}




  const container = document.getElementById("container");
  
   const url = "https://vivacious-harsh-sandwich.glitch.me/events";
  const url2 = "https://vivacious-harsh-sandwich.glitch.me/more";
  

  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const pageIndicator = document.getElementById("pageIndicator");
  const main = document.getElementById("main");

  let currentPage = 1;
  const itemsPerPage = 8;
  let allEvents = [];
  let filteredEvents = [];
  let abortController;

  async function getData() {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP error");
      const result = await res.json();
      localStorage.setItem("products", JSON.stringify(result));
      allEvents = result;
      filteredEvents = result;
      renderPage();
      displayButton(allEvents); // Populate dropdown
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getData2() {
    abortController = new AbortController();
    try {
      const res = await fetch(url2, { signal: abortController.signal });
      if (!res.ok) throw new Error("HTTP error");
      const result = await res.json();
      localStorage.setItem("products", JSON.stringify(result));
      allEvents = result;
      filteredEvents = result;
      renderPage();
      displayButton(allEvents); 
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err.message);
      }
    }
  }

  function renderPage() {
    container.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedEvents = filteredEvents.slice(start, start + itemsPerPage);
    paginatedEvents.forEach(createItem);
    updatePaginationUI();
  }

  function updatePaginationUI() {
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    pageIndicator.textContent = `${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
  }

  function createItem(obj) {
    const {
      id,
      logo: { url },
      category,
      tickets,
      start: { timezone, month, local },
      online,
    } = obj;
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
      <img src="${url}" class="image" />
      <p><b>${category}</b></p>
      <p><b>Mode: </b>${online}</p>
      <p><b>Country: </b>${timezone} <b>Month:</b> ${month}</p>
      <p><b>Local: </b>${local}</p>
    `;
    item.addEventListener("click", () => getMoreData(id));
    container.appendChild(item);
  }

  function getMoreData(id) {
    console.log("Navigating to index2.html with ID:", id);
    window.location.href = `./index2.html?id=${id}`;
  }

  // Pagination
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderPage();
    }
  });

  // See More / See Less
  document.addEventListener("DOMContentLoaded", () => {
    const seeMore = document.getElementById("seeMore");
    // const seeLess = document.getElementById("seeLess");

    seeMore.addEventListener("click", () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) {
        alert("Please log in to see more events.");
        return;
      }
      
      currentPage = 1;
      getData2();
        seeMore.style.display = "none";
    });

   

    getData(); // Initial fetch
  });










  
  // Filter Dropdown
  function displayButton(events) {
    main.innerHTML = `<option value="all">Categories</option>`;
    const categoryArr = events.map((obj) => obj.category);
    Array.from(new Set(categoryArr)).forEach((ele) => {
      const option = document.createElement("option");
      option.value = ele;
      option.textContent = ele;
      main.appendChild(option);
    });

    main.addEventListener("change", function () {
      const selected = main.value;
      const products = JSON.parse(localStorage.getItem("products"));
      if (selected === "all") {
        displayData(products);
      } else {
        filterData(selected, products);
      }
      container.scrollIntoView({ behavior: "smooth" });
    });
  }

  function filterData(category, events) {
    const filtered = events.filter((obj) => obj.category === category);
    displayData(filtered);
  }

  function displayData(events) {
    filteredEvents = events;
    currentPage = 1;
    renderPage();
  }

//about
function toggleServices() {
  const list = document.getElementById('services');
  const arrow = document.getElementById('arrow');
  list.classList.toggle('show');
  arrow.classList.toggle('rotate');
}





document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
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
});











// contact
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  alert("Thank you for contacting us, " + name + "!");
  this.reset();
});

// cards

  function openVideo(url) {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");
    const source = document.getElementById("videoSource");
    source.src = url;
    video.load();
    modal.style.display = "flex";
  }

  // Close modal on click (X)
  document.querySelector(".close-btn").onclick = () => {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");
    modal.style.display = "none";
    video.pause();
  };

  // Close when clicking outside the video
  window.onclick = (e) => {
    const modal = document.getElementById("videoModal");
    if (e.target === modal) {
      modal.style.display = "none";
      document.getElementById("modalVideo").pause();
    }
  };




















