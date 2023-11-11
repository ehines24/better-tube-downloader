import VideoData from "./VideoData";
import AudioData from "./AudioData";

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

    const vid = document.getElementById('videoData');
    const aud = document.getElementById('audioData');
    switch(type) {
        case 0: // VIDEO
            audBtn.classList.remove("vidAudBtnActive");
            vidBtn.classList.add("vidAudBtnActive");

            aud.classList.add("hideVidAudData");
            vid.classList.remove("hideVidAudData");
            break;
        case 1: //AUDIO
            vidBtn.classList.remove("vidAudBtnActive");
            audBtn.classList.add("vidAudBtnActive");

            vid.classList.add("hideVidAudData");
            aud.classList.remove("hideVidAudData");
            break;
    }
}

export default () => {
    return (
        <div>
            <button id="advBtn" onClick={showAdvanced}>Advanced &#x25C2;</button><br />
            <div id="advData" style={{display: showAdv? "block" : "none"}}>
                <button id="vidBtn" class="vidAudBtn vidAudBtnActive" onClick={() => swapData(0)}>Video</button>
                <button id="audBtn" class="vidAudBtn" onClick={() => swapData(1)}>Audio</button>

                <br />

                <VideoData />
                <AudioData />

            </div>
        </div>
    );
}