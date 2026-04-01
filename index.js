const apiKey = "afy1M9Nf1jmcMEeKNqm2cAYboPQRjJQCfihhnAP4"

const imgContainer = document.getElementById("imgContainer")

async function apod() {
    let dateInput = document.getElementById("dateInput").value

    const todaysDate  = new Date()
    const today = todaysDate.toISOString().split("T")[0]

    if (dateInput > today) {
        imgContainer.innerHTML = `
            <div style="padding:20px;">
                <h2 style="color:#00eaff;">Not Yet Available</h2>
                <p>APOD for <b>${dateInput}</b> will be released on that day</p>
            </div>
        `
        return
    }


    imgContainer.innerHTML = `<div id="loader"></div>`

    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateInput}`

    try {
        const res = await fetch(url)
        const data = await res.json()




        if (data.media_type === "image") {
            imgContainer.innerHTML = `
                <h2 class="title">${data.title}</h2>
                <img class="apod-img" src="${data.url}" loading="lazy">
                <p class="description">${data.explanation}</p>
            `

            const img = document.querySelector(".apod-img")
            img.onload = () => img.classList.add("loaded")
        }


        else if (data.media_type === "video") {


            if (
                data.url.includes("youtube") ||
                data.url.includes("youtu.be") ||
                data.url.includes("vimeo")
            ) {
                imgContainer.innerHTML = `
                    <h2 class="title">${data.title}</h2>
                    <div class="video-wrapper">
                        <iframe 
                            src="${data.url}" 
                            frameborder="0" 
                            allow="autoplay; encrypted-media"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <p class="description">${data.explanation}</p>
                `
            } else {

                imgContainer.innerHTML = `
                    <h2 class="title">${data.title}</h2>
                    <p style="color:#ffcc00;">This video cannot be embedded</p>
                    
                    <a href="${data.url}" target="_blank" class="watch-btn">
                        Watch Video
                    </a>

                    <p class="description">${data.explanation}</p>
                `
            }
        }

    } catch (err) {
        imgContainer.innerHTML = `<p>Error loading</p>`
        console.error(err)
    }
}
document.getElementById("btn").addEventListener("click", apod)


