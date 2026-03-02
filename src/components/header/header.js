import template from './header.html?raw'
import './header.scss'

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template

    const currentPath = window.location.pathname

    this.querySelectorAll('.header__link').forEach(link => {
      const linkPath = new URL(link.href).pathname
      const isHome = linkPath === '/' && currentPath === '/'
      const isOther = linkPath !== '/' && currentPath.startsWith(linkPath)

      if (isHome || isOther) {
        link.classList.add('header__link--active')
      }
    })

    this.querySelector('.header__burger').addEventListener('click', () => {
      this.querySelector('.header__nav').classList.toggle('header__nav--open')
    })
  }
}

customElements.define('app-header', AppHeader)
