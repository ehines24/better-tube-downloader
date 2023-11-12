<script>
    import VideoData from './VideoData.svelte';
    import AudioData from './AudioData.svelte';
    import { vidAudStore } from '../store.js';
    
    let showAdv = false;
    function showAdvanced() {
        if (showAdv) {
            // Hide advanced
            document.getElementById("advBtn").textContent = `Advanced \u25C2`; //or \u25C4
            document.getElementById("advData").style.display = "none";
        } else {
            // Shows advanced
            document.getElementById("advBtn").textContent = `Advanced \u25BE`; //or \u25BC
            document.getElementById("advData").style.display = "block";
        }
        showAdv = !showAdv;
    }

    function swapData(type) {
        const vidBtn = document.getElementById('vidBtn');
        const audBtn = document.getElementById('audBtn');
        switch(type) {
            case 0: // VIDEO
                audBtn.classList.remove("vidAudBtnActive");
                vidBtn.classList.add("vidAudBtnActive");

                vidAudStore.update(x => {
                    x = 0;
                    return x;
                });
                break;
            case 1: //AUDIO
                vidBtn.classList.remove("vidAudBtnActive");
                audBtn.classList.add("vidAudBtnActive");

                vidAudStore.update(x => {
                    x = 1;
                    return x;
                });
                break;
        }
    }
    vidAudStore.set(0);
</script>

<div>
    <button id="advBtn" on:click={showAdvanced}>Advanced &#x25C2;</button><br />
    <div id="advData" style="display:none">
        <button id="vidBtn" class="vidAudBtn vidAudBtnActive" on:click={() => swapData(0)}>Video</button>
        <button id="audBtn" class="vidAudBtn" on:click={() => swapData(1)}>Audio</button>
        <br />

        <VideoData style="display:none" />
        <AudioData />

    </div>
</div>

<style>
#advBtn {
  border-style: none;
  background-color: white;
  width: 50%;
  font-size: medium;
}

.vidAudBtn {
  border: none;
  border-bottom: 2px solid black;
  background-color: white;
  width: 25%;
  padding: 5px;
}
.vidAudBtnActive {
  background-color: lightgray;
}
</style>