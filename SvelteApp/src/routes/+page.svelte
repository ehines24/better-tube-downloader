<script>
    import Article from './components/Article.svelte';
</script>

<div class="App">
    <header class="App-header">
      <h1>Better Youtube Downloader</h1>
    </header>

    <div class="cool-curve">
        <Article />
    </div>
    
</div>

<style>
.App {
  text-align: center;
  background-color: lightcoral;
}

.App-header {
  background-color: lightcoral;
  min-height: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: black;
}

.cool-curve {
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background-color: white;
  padding: 5px;
}
</style>