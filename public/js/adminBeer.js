/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	function disableSubmit(isDisabled) {
		var submitButton = document.querySelector('[name="submit"]');
		if (isDisabled) {
			submitButton.setAttribute('disabled', isDisabled);
		} else {
			submitButton.removeAttribute('disabled');
		}
	}

	function isNumber(e) {
		e.preventDefault();
		console.log(e);

		if (isNaN(e.target.value)) {
			this.classList.add('incorrectInput');
			disableSubmit(true);
		} else {
			this.classList.remove('incorrectInput');
			disableSubmit(false);
		}
	}

	function rowEdited(e) {
		e.preventDefault();
		var row = this.parentNode;
		var status = row.querySelector('[name="status"]');
		row.classList.add('edited');
		status.setAttribute('value', 'edited');
	}

	var editedRow = document.querySelectorAll('.textbox');
	editedRow.forEach(function (textbox) {
		return textbox.addEventListener('change', rowEdited);
	});

	var checkIfNumber = document.querySelectorAll('.number');
	checkIfNumber.forEach(function (textbox) {
		return textbox.addEventListener('change', isNumber);
	});

/***/ })
/******/ ]);