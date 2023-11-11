import AdvancedDropdown from "./AdvancedDropdown.js";

async function prepareVideo() {
  const url = document.getElementById('youtubeUrl').value;
  console.log(url);
  const response = await fetch("http://localhost:4000/api/get_link_data", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  });
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