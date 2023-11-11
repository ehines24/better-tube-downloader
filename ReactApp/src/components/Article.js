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
        <div class="input-container">
		      <input id="youtubeUrl" type="text" required="required" />
		      <label id="youtubeUrlLabel">Youtube Link</label>		
	      </div>
        
        <button id="prepBtn" onClick={prepareVideo}>Prepare Video Data</button>

        <AdvancedDropdown />

        <button id="cvtBtn">Convert & Download</button>
      </article>
    );
}