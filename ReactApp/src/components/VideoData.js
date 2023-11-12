const resolution = ["480p", "720p", "1080p"];
const audioFormats = ["idk", "None"];

export default ({videoTypes}) => {
    const listVideoType = videoTypes.map(type =>
        <option value={type}> {type} </option>
    );
    const listResolution = resolution.map(type =>
        <option value={type}> {type} </option>
    );
    const listAudioFormats = audioFormats.map(type =>
        <option value={type}> {type} </option>
    );
    return (
        <div id="videoData">
            <label for="fileName">File Name: </label>
            <input name="fileName" /> <br />

            <label for="videoType">Type: </label>
            <select name="videoType">
                {listVideoType}
            </select> <br />

            <label for="resolution">Resolution: </label>
            <select name="resolution">
                {listResolution}
            </select> <br />

            <label for="trimStart">Trim Start: </label>
            <input type="number" name="trimStart" min="0" step="0.01" /> <br />
            <label for="trimEnd">Trim End: </label>
            <input type="number" name="trimEnd" min="0" step="0.01" /> <br />

            <label for="audioFormat">Audio Format: </label>
            <select name="audioFormat">
                {listAudioFormats}
            </select>
        </div>
    );
}