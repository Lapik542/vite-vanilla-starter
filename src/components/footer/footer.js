import template from './footer.html?raw'
import './footer.scss'

class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template
    this.querySelector('.footer__year').textContent = new Date().getFullYear()
  }
}

customElements.define('app-footer', AppFooter)
