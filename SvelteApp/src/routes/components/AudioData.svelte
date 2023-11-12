<script>
    import store from '../store.js';
    import { vidAudStore } from '../store.js';

    let audioTypeArr = ["MP3"];
    // let resolutionArr = [];
    let acodecArr = [];
    let display = "none";

    store.subscribe(x => {
        if (
    //         x.hasOwnProperty("type") &&
    //         x.hasOwnProperty("res") &&
            x.hasOwnProperty("acodec")
        ) {
    //         videoTypeArr = x["type"];
    //         resolutionArr = x["res"];
            acodecArr = x["acodec"];
        }
        return x;
    });
    vidAudStore.subscribe(x => {
        display = x==1? "block" : "none";
        return x;
    })
</script>

<div id="audioData" style="display:{display}">
    <label for="fileName">File Name: </label>
    <input name="fileName" /> <br />

    <label for="audioType">Type: </label>
    <select name="audioType">
        {#each audioTypeArr as item}
            <option>{item}</option>
        {/each}
    </select> <br />

    <label for="trimStart">Trim Start: </label>
    <input type="number" name="trimStart" min="0" step="0.01" /> <br />
    <label for="trimEnd">Trim End: </label>
    <input type="number" name="trimEnd" min="0" step="0.01" /> <br />

    <label for="audioFormat">Audio Format: </label>
    <select name="audioFormat">
        {#each acodecArr as item}
            <option>{item}</option>
        {/each}
    </select> <br />

    <label for="title">Title: </label>
    <input name="title" /> <br />
    <label for="artist">Artist: </label>
    <input name="artist" /> <br />
    <label for="album">Album: </label>
    <input name="album" /> <br />
</div>

<style>
#audioData {
  overflow: auto;
}
</style>