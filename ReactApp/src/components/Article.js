import AdvancedDropdown from "./AdvancedDropdown.js";

export default () => {
    return (
        <article class="App-article">
        <p>
          Please enter the URL to a YouTube video that you want to download.
        </p>
        <input id="youtubeUrl" name="Youtube Link" placeholder="Youtube Link"></input>
        
        <AdvancedDropdown />

        <button id="cvtBtn">Convert</button>
      </article>
    );
}