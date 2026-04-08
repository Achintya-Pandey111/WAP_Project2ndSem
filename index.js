import {Api as apiKey} from "./config.js"

const imgContainer = document.getElementById("imgContainer")

let galleryData = []

async function apod() {
    let dateInput = document.getElementById("dateInput").value;

    const today = new Date().toISOString().split("T")[0];

    if (!dateInput) {
        alert("Please select a date");
        return;
    }

    if (dateInput > today) {
        imgContainer.innerHTML = `
            <div style="padding:20px;">
                <h2 style="color:#00eaff;">Not Yet Available</h2>
                <p>APOD for <b>${dateInput}</b> will be released on that day</p>
            </div>
        `;
        return;
    }

    imgContainer.innerHTML = `<div id="loader"></div>`;

    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateInput}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.media_type === "image") {
            imgContainer.innerHTML = `
                <button onclick="location.reload()">⬅ Back</button>
                <h2 class="title">${data.title}</h2>
                <img class="apod-img" src="${data.url}" loading="lazy">
                <p class="description">${data.explanation}</p>
            `;

            const img = document.querySelector(".apod-img");
            img.onload = () => img.classList.add("loaded");
        }

        else if (data.media_type === "video") {
            imgContainer.innerHTML = `
                <button onclick="location.reload()">⬅ Back</button>
                <h2 class="title">${data.title}</h2>
                <iframe src="${data.url}" allowfullscreen></iframe>
                <p class="description">${data.explanation}</p>
            `;
        }

    } catch (err) {
        imgContainer.innerHTML = `<p>Error loading</p>`;
        console.error(err);
    }
}
document.getElementById("btn").addEventListener("click", apod)


async function loadGallery() {
  imgContainer.innerHTML = `<div id="loader"></div>`;

  const end = new Date();
  const start = new Date();

  start.setDate(end.getDate() - 32);

  const startDate = start.toISOString().split("T")[0];
  const endDate = end.toISOString().split("T")[0];

  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    galleryData = data.reverse()
    sortGallery("new")

  } catch (err) {
    imgContainer.innerHTML = `<p>Error loading gallery</p>`;
    console.error(err);
  }
}


function renderGallery(dataArray) {
  imgContainer.innerHTML = ""; 

  dataArray.forEach(item => {
    if (item.media_type !== "image") return;

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${item.url}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.date}</p>
    `;

    imgContainer.appendChild(card);
  });
}

function sortGallery(type) {
  let sorted = [...galleryData]

  if (type === "new") {
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  else if (type === "old") {
    sorted.sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  else if (type === "az") {
    sorted.sort((a, b) => a.title.localeCompare(b.title))
  }

  renderGallery(sorted)
}

document.getElementById("sortSelect").addEventListener("change", (e) => {
  sortGallery(e.target.value)
})

loadGallery();