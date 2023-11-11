const audioTypes = ["MP3"];
const audioFormats = ["idk", "None"];

// Quality

export default () => {
    const listAudioType = audioTypes.map(type =>
        <option value={type}> {type} </option>
    );
    const listAudioFormats = audioFormats.map(type =>
        <option value={type}> {type} </option>
    );
    return (
        <div id="audioData" class="hideVidAudData">
            <label for="fileName">File Name: </label>
            <input name="fileName" /> <br />

            <label for="videoType">Type: </label>
            <select name="videoType">
                {listAudioType}
            </select> <br />

            <label for="trimStart">Trim Start: </label>
            <input type="number" name="trimStart" min="0" step="0.01" /> <br />
            <label for="trimEnd">Trim End: </label>
            <input type="number" name="trimEnd" min="0" step="0.01" /> <br />

            <label for="audioFormat">Audio Format: </label>
            <select name="audioFormat">
                {listAudioFormats}
            </select> <br />

            <label for="title">Title: </label>
            <input name="title" /> <br />
            <label for="artist">Artist: </label>
            <input name="artist" /> <br />
            <label for="album">Album: </label>
            <input name="album" /> <br />
        </div>
    );
}