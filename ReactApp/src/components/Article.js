import AdvancedDropdown from "./AdvancedDropdown.js";

function prepareVideo() {
  const url = document.getElementById('youtubeUrl').value;
  console.log(url);
}

export default () => {
    return (
        <article class="App-article">
        <p>
          Please enter the URL to a YouTube video that you want to download.
        </p>
        <input id="youtubeUrl" name="Youtube Link" placeholder="Youtube Link"></input>
        
        <button id="prepBtn" onClick={prepareVideo}>Prepare Video Data</button>

        <AdvancedDropdown />

        <button id="cvtBtn">Convert</button>
      </article>
    );
}