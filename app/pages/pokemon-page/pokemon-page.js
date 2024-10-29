import { CellsPageMixin as cellsPage } from '@cells/cells-page-mixin';
import { LitElement, html } from 'lit-element';
import styles from './pokemon-page-styles.js';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';
import '@bbva-experience-components/bbva-type-text/bbva-type-text.js';
import '@cells-demo/demo-web-template/demo-web-template.js';
import '@bbva-web-components/bbva-web-header-public-web/bbva-web-header-public-web.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer-language-list-item.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer.js';
import {
  bbvaFacebook,
  bbvaTwitter,
  bbvaInstagram,
  bbvaLinkedin,
  bbvaGoogleplus,
  bbvaPinterest,
  bbvaYoutube,
} from '@bbva-web-components/bbva-foundations-icons';
import '@meraki/app-pokemon/app-pokemon.js';


const footerIcons = {
  facebook: bbvaFacebook(),
  twitter: bbvaTwitter(),
  instagram: bbvaInstagram(),
  linkedin: bbvaLinkedin(),
  googleplus: bbvaGoogleplus(),
  pinterest: bbvaPinterest(),
  youtub: bbvaYoutube(),
};

const DEFAULT_I18N_KEYS = {
  menuTab1: 'login-page.menu-tab-1',
  menuTab2: 'login-page.menu-tab-2',
  menuAccess: 'login-page.menu-access',
  footerClaim: 'login-page.footer-claim',
};

class PokemonApp extends intl(cellsPage(LitElement)) {
  static get is() {
    return 'pokemon-page';
  }

  static get properties() {
    return {
      i18nKeys: {
        type: Object,
        attribute: false,
      },
    };
  }

  constructor() {
    super();
    this.i18nKeys = {};
  }


  static get styles() {
    return [ styles ];
  }

  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);

    window.IntlMsg.lang = localStorage.getItem('language') || 'es-US';
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }

    super.update && super.update(props);
  }


  render() {
    return html`
      <demo-web-template page-title="Pokémon App">
       <div slot="app-top-content">
       ${this._headerTpl}
       </div>

       <div slot="app-main-content" class="app-mains">
       <app-pokemon></app-pokemon>
      </div>

       <div slot="app-top-content" data-grid="full-width">
          ${this._footerTpl}
        </div>
       
     </demo-web-template>

    `;
  }

  get _headerTpl() {
    return html`
      <h1 class="hidden">login web template</h1>
      <bbva-web-header-public-web
        class="fixed-header"
        description="BBVA Home"
        logo-href="https://www.bbva.es"
        logo-target="_blank"
        register-href="https://www.bbva.es/general/hazte-cliente/abrir-cuenta-bancaria-online.html"
        register-target="_blank"
        selected-tab="0"
        show-login
        show-register
        show-search
        tab-2-label="${this.t(this._i18nKeys.menuTab2)}"
        tab-1-label="${this.t(this._i18nKeys.menuTab1)}"
        @tab-click="${this._onTabClick}"
      >

        <bbva-web-button-default
          aria-controls="${this._uniqueId}"
          aria-expanded="${this.showForm}"
          id="access"
          class="login"
          size="l"
          slot="login-desktop"
          variant="positive"
          @click="${this._onLoginClick}"
        >
          ${this.t(this._i18nKeys.menuAccess)}
        </bbva-web-button-default>
      </bbva-web-header-public-web> 
    `;
  }

  get _footerTpl() {
    return html`
      <bbva-web-module-footer
      class="fixed-footer"
        copyright="© 2022 Banco Bilbao Bizcaya Argentaria, S.A."
      >
        <bbva-web-module-footer-language-list-item
          slot="languages"
          ?selected="${window.IntlMsg.lang === 'es-ES'}"
          >Castellano</bbva-web-module-footer-language-list-item
        >
  
        <bbva-web-module-footer-language-list-item
          slot="languages"
          ?selected="${window.IntlMsg.lang === 'en-US'}"
          >English</bbva-web-module-footer-language-list-item
        >

        <bbva-web-link-list-item
          icon="${footerIcons.facebook}"
          icon-link
          variant="subdued"
          href="https://www.facebook.com/BBVAGroup/"
          target="_blank"
          slot="social-networks"
          >facebook</bbva-web-link-list-item
        >
      
        <bbva-web-link-list-item
          icon="${footerIcons.twitter}"
          icon-link
          variant="subdued"
          href="https://twitter.com/bbva"
          target="_blank"
          slot="social-networks"
          >twitter</bbva-web-link-list-item
        >
        <bbva-web-link-list-item
          icon="${footerIcons.instagram}"
          icon-link
          variant="subdued"
          href="https://www.instagram.com/bbva/"
          target="_blank"
          slot="social-networks"
          >instagram</bbva-web-link-list-item
        >
        <bbva-web-link-list-item
          icon="${footerIcons.linkedin}"
          icon-link
          variant="subdued"
          href="https://www.linkedin.com/company/bbva"
          target="_blank"
          slot="social-networks"
          >linkedin</bbva-web-link-list-item
        >
        <bbva-web-link-list-item
          icon="${footerIcons.pinterest}"
          icon-link
          variant="subdued"
          href="https://www.pinterest.es/grupobbva/"
          target="_blank"
          slot="social-networks"
          >pinterest</bbva-web-link-list-item
        >
        <bbva-web-link-list-item
          icon="${footerIcons.youtube}"
          icon-link
          variant="subdued"
          href="https://www.youtube.com/user/bbva"
          target="_blank"
          slot="social-networks"
          >youtube</bbva-web-link-list-item
        >

      </bbva-web-module-footer>
    `;
  }


}

window.customElements.define(PokemonApp.is, PokemonApp);
