const videoTypes = ["MP3"];

// Quality

export default () => {
    const listVideoType = videoTypes.map(type =>
        <option value={type}> {type} </option>
    );
    return (
        <div id="audioData">
            <label for="fileName">File Name: </label>
            <input name="fileName" /> <br />

            <label for="videoType">Type: </label>
            <select name="videoType">
                {listVideoType}
            </select> <br />

            <label for="trimStart">Trim Start: </label>
            <input type="number" name="trimStart" min="0" step="0.01" /> <br />
            <label for="trimEnd">Trim End: </label>
            <input type="number" name="trimEnd" min="0" step="0.01" /> <br />

            <input for="audioFormat">Audio Format: </input>
            <select name="audioFormat">
                {listAudioFormats}
            </select>

            <label for="title">Title: </label>
            <input name="title" />
            <label for="artist">Artist: </label>
            <input name="artist" />
            <label for="album">Album: </label>
            <input name="album" />
        </div>
    );
}