import { useState } from 'react';
import AdvancedDropdown from "./AdvancedDropdown.js";

async function prepareVideo(test, setTest) {
  const url = document.getElementById('youtubeUrl').value;
  console.log(url);
  const response = await fetch("http://localhost:4000/api/get_link_data", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  });
  const body = await response.json();
  let new_test = [].concat(body)
  console.log(new_test);
  setTest(new_test);
  // typeArr.forEach(x => setTest([
  //   ...test,x
  // ]));
  
}

export default () => {
  const [test, setTest] = useState([]);
    return (
        <article class="App-article">
        <p>
          Please enter the URL to a YouTube video that you want to download.
        </p>
        <div class="input-container">
		      <input id="youtubeUrl" type="text" required="required" />
		      <label id="youtubeUrlLabel">Youtube Link</label>		
	      </div>
        
        <button id="prepBtn" onClick={() => prepareVideo(test, setTest)}>Prepare Video Data</button>

        <AdvancedDropdown test={test}/>

        <button id="cvtBtn">Convert & Download</button>
      </article>
    );
}