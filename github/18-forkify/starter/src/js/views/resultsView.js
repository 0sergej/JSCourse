import View from './view';
import previewView from './previewView.js';

const ResultsView = class extends View {
    _parentElement = document.querySelector(`.results`);
    _errorMessage = `No recipes found for Your query! Please try again.`;
    _message = ``;

    _generateMarkup() {
        return this._data
            .map(result => previewView.render(result, false))
            .join(``);
    }
};

export default new ResultsView();
