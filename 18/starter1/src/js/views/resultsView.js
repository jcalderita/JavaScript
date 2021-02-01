import PreviewView from './previewView.js';
import View from './previewView.js';

class ResultsView extends PreviewView {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again.';
  _Message = '';
}

export default new ResultsView();
