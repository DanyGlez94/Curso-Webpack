import Template from '@templates/Template.js';
import '@styles/main.css';
// import './styles/test.scss'; Para sass
import '@styles/vars.styl';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
