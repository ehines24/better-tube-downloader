import VideoData from "./VideoData";

let showAdv = true;
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

export default () => {
    return (
        <div>
            <button id="advBtn" onClick={showAdvanced}>Advanced &#x25C2;</button><br />
            <div id="advData" style={{display: showAdv? "block" : "none"}}>
              <select name="file-type">
                <option name="video">Video</option>
                <option name="audio">Audio</option>
              </select>

              <VideoData />

            </div>
        </div>
    );
}