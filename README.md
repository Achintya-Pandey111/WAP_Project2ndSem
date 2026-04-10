# NASA APOD Viewer

This project is a simple web application that displays NASA's Astronomy Picture of the Day (APOD). It allows users to view a specific day's image or browse a gallery of recent images.

## Features

* Fetch APOD for a selected date
* Display image or video with title and description
* Show last 30+ days of APOD images in a gallery
* Sort gallery by newest, oldest, or alphabetical order
* Background video for visual appeal
* Loading animation and basic error handling

## Tech Stack

* HTML
* CSS
* JavaScript (ES Modules)
* NASA APOD API

## Project Structure

```
.
├── index.html
├── index.css
├── index.js
├── config.js
└── backgroundVideo/
```

## How It Works

* The main page loads a gallery of recent APOD images on startup 
* Users can select a date and click "Get APOD" to fetch a specific entry
* The app uses the NASA APOD API to retrieve data
* Depending on the media type, it renders either an image or a video

## Setup Instructions

1. Clone the repository
2. Create a `config.js` file in the root directory:

   ```js
   export const Api = "YOUR_API_KEY";
   ```
3. Open `index.html` in a browser or deploy it

## API

This project uses the NASA APOD API:
https://api.nasa.gov/

You will need an API key, which can be obtained from the NASA API website.

## Notes

* The API may occasionally return errors (e.g., 503). Basic error handling is included.
* The background video is stored locally and should not be ignored in version control.
* The app uses ES module imports, so the script is loaded with `type="module"` in HTML 

## Future Improvements

* Better UI/UX design
* Caching results to reduce API calls
* Improved error messages
* Mobile responsiveness enhancements
* Option to view full image details in a modal

## License

This project is for learning purposes.
