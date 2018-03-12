const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const articleController = reuqire('../controllers/articleController');

describe('Article Controller - Handlers', function() {
  describe('populate', function() {});
  describe('getOne', function() {});
  describe('getAll', function() {});
  describe('getSaved', function() {});
});

describe('Article Controller - API Routes', function() {
  describe('getAllArticles', function() {});
  describe('getArticleById', function() {});
});

describe('Article Controller - HTML Routes', function() {
  describe('renderHome', function() {});
  describe('renderSaved', function() {});
  describe('renderOne', function() {});
});
