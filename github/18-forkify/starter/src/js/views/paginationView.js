import View from './view';
import icons from 'url:../../img/icons.svg';

const PaginationView = class extends View {
    _parentElement = document.querySelector(`.pagination`);

    addHandlerClick(handler) {
        this._parentElement.addEventListener(`click`, function (e) {
            const btn = e.target.closest(`.btn--inline`);
            if (!btn) return;

            const goToPage = +btn.dataset.goto;

            handler(goToPage);
        });
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );

        // Page 1, and there are other pages
        if (curPage === numPages && numPages > 1) return this._btnPrev(curPage);

        // Last page
        if (curPage === 1 && numPages > 1) return this._btnNext(curPage);

        // Other page
        if (curPage < numPages)
            return `
            ${this._btnNext(curPage)}
            ${this._btnPrev(curPage)}
            `;

        // Page 1, and there are NO other pages
        return ``;
    }

    _btnNext(curPage) {
        return `
            <button data-goto="${
                curPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    }

    _btnPrev(curPage) {
        return `
            <button data-goto="${
                curPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
            `;
    }
};

export default new PaginationView();
