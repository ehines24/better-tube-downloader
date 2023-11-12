<script>
    import AdvancedDropdown from "./AdvancedDropdown.svelte";
    import store from '../store.js';

    async function prepareVideo() {
      const url = document.getElementById('youtubeUrl').value;
      const loading = document.getElementById('loading');
      loading.style.display = "block";

      const response = await fetch("http://localhost:4000/api/get_link_data", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
      });
      const body = await response.json();
      const typeArr = [];
      const resArr = []
      const acodecArr = [];
      console.log(body);
      body.forEach(x => {
        if (typeArr.every(y => y!=x['EXT'])) {
          typeArr.push(x['EXT']);
        }
        if (resArr.every(y => y!=x['RESOLUTION'])) {
            resArr.push(x['RESOLUTION']);
        }
        if (acodecArr.every(y => y!=x['ACODEC'])) {
            acodecArr.push(x['ACODEC']);
        }
      });
      console.log(typeArr);
      store.update(x => {
        x = {type: [], res: [], acodec: []};
        typeArr.forEach( y => x["type"].push(y));
        resArr.forEach( y => x["res"].push(y));
        acodecArr.forEach( y => x["acodec"].push(y));
        return x;
      });

      loading.style.display = "none";
    }
    store.set({});
</script>

<div id="loading" style="display: none;">
    <img src="./loading.gif" alt="loading">
</div>

<article class="App-article">
    <p>
      Please enter the URL to a YouTube video that you want to download.
    </p>
    <div class="input-container">
          <input id="youtubeUrl" type="text" required="required" name="youtubeUrl" />
          <label id="youtubeUrlLabel" for="youtubeUrl">Youtube Link</label>		
      </div>
    
    <button id="prepBtn" on:click={prepareVideo}>Prepare Video Data</button>

    <AdvancedDropdown />

    <button id="cvtBtn">Convert & Download</button>
  </article>

<style>
#loading {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
}
#loading img {
    width: 100px;
    height: 100px;
}

.App-article {
  margin: auto;
  justify-content: center;
  justify-items: center;
  width: 50vw;
  font-size: calc(5px + 2vmin);
}

#cvtBtn, #prepBtn {
  margin: 10px;
  background-color: lightcoral;
  border-radius: 8px;
  border-style: none;
  color: black;
  cursor: pointer;
  font-size: 14px;
  height: 40px;
  outline: none;
  padding: 10px 16px;
  text-decoration: none;
  transition: color 100ms;
}
#cvtBtn:active, #prepBtn:active {
  background-color: #F082AC;
}
.input-container {
	position:relative;
	margin-bottom:25px;
}
.input-container label{
	position:absolute;
	top:0px;
	left:0px;
	font-size:16px;
  pointer-events:none;
	transition: all 0.5s ease-in-out;
}
.input-container input{ 
  border:0;
  border-bottom:1px solid #555;
  width:100%;
  padding:8px 0 5px 0;
  font-size:16px;
}
.input-container input:focus { 
 border:none;	
 outline:none;
 border-bottom:1px solid lightcoral;	
}

input:focus ~label, input:valid ~label {
  top: -12px;
  font-size: 12px;
}
</style>