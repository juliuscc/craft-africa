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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var stats = __webpack_require__(1);
	var economics = __webpack_require__(4);
	var formInteraction = __webpack_require__(5);
	// const containerCalculator2 = require('./calculation-form/containerCalculator')
	var ajax = __webpack_require__(6);

	var jsonCache = {};
	var calcObj = {};

	ajax.loadJSON('/data/stats').then(function (json) {
		jsonCache = json;

		var formdata = formInteraction.extractFormData();

		calcObj.stats = stats.getCalculationStats(formdata, jsonCache);
		calcObj.economics = economics.getEconomics(calcObj);

		calcObj.stats.distributionLock = ['tap', 'bottle'];

		formInteraction.updateDistributionSliders(calcObj.stats);
	}).catch(function (msg) {
		console.log(msg);
	});

	// test
	document.querySelector('.calculation-form .calculate-button').addEventListener('click', function () {
		var formdata = formInteraction.extractFormData();
		calcObj.stats = stats.getCalculationStats(formdata, jsonCache);
		calcObj.economics = economics.getEconomics(calcObj);

		// containerCalculator2.getBeerProductionModules(data)
		// containerCalculator2.getPercentage(calcObj.calculationStats)
		console.log('calc: ', calcObj);
	});

	// more test
	document.querySelectorAll('.calculation-form .container-distribution').forEach(function (e) {
		e.addEventListener('input', function () {
			formInteraction.updateDistributionSliders(calcObj.stats, e);
		});
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var container = __webpack_require__(2);
	var beerTypes = __webpack_require__(3);

	/* Private
	__________________________________________________________________________________*/

	// Get the number of liters of each container type.
	function getDistributionVolume(stats) {
		// Both values are selected by the form
		var volume = stats.volume,
		    distribution = stats.distribution;


		if (volume.total && distribution) {
			return {
				tap: volume.total * distribution.tap,
				keg: volume.total * distribution.keg,
				bottle: volume.total * distribution.bottle
			};
		}
		return {};
	}

	/* Public interface
	__________________________________________________________________________________*/

	// Get the stats used in the calculation
	function getCalculationStats(inputData, defaultData) {
		var stats = defaultData;

		// extending the object
		Object.assign(stats, inputData);

		// Calculating the amount of each type (in liters)
		stats.volume = getDistributionVolume(stats);

		// Aquirering modules
		stats.containers = container.getConfiguration(stats);

		// Add the beer unit costs
		stats.beertype.current = stats.beertype.options[0]; // Todo change this?
		stats.beertype.current.costs = beerTypes.getProductionCost();

		return stats;
	}
	/* Exporting module
	__________________________________________________________________________________*/

	module.exports = {
		getCalculationStats: getCalculationStats
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	/* Private functions
	_____________________________________________________________________________*/

	// Get the smallest production module for this beer production capacity
	function getProductionModules(calculationStats) {
		return calculationStats;
	}

	// Get the modules required for fermenting the beer
	function getFermentingModules(calculationStats) {
		return calculationStats;
	}

	// Get the addon modules
	function getAddonsModules(calculationStats) {
		return calculationStats;
	}

	/* Public interface
	_____________________________________________________________________________*/

	// Calculates how much water the configuration cleans each month
	function getWaterCleaningCapacity(calculationStats) {
		return calculationStats;
	}

	// Caculate the enegey production from the solar panel
	function getEnergyProduction(calculationStats) {
		return calculationStats;
	}

	// Get the cost of the current container configuration
	function getCost(calculationStats) {
		return calculationStats;
	}

	// Get a new container configuration
	// Calculate the list of all modules required for this production capacity
	function getConfiguration(calculationStats) {
		var production = getProductionModules(calculationStats);
		var fermenting = getFermentingModules(calculationStats);
		var addons = getAddonsModules(calculationStats);
		var all = [];

		return { production: production, fermenting: fermenting, addons: addons, all: all };
	}

	module.exports = {
		getConfiguration: getConfiguration,
		getWaterCleaningCapacity: getWaterCleaningCapacity,
		getEnergyProduction: getEnergyProduction,
		getCost: getCost
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	// Get the "relative" production volume.
	// This can be used to estimate fermenting needs
	function getRelativeProductionVolume(stats) {
		// How many percent of the timeunit used in the containers
		// does the current beer make up.
		// If beer fermenting time is greater, we will scale up the
		// relative volume.
		var scaleFactor = stats.beerType.current.fermentingTime / stats.containers.fermentingTime;

		return stats.volume.total * scaleFactor;
	}

	// Get the costs for resources per liter beer
	function getProductionCost(stats) {
		// Variables from db or changed by user
		var ingredientsCosts = stats.ingredientsCosts,
		    beerType = stats.beerType;


		if (ingredientsCosts && beerType.current) {
			var costs = {
				hops: ingredientsCosts.hops * beerType.current.hops,
				malt: ingredientsCosts.malt * beerType.current.malt,
				co2: ingredientsCosts.co2 * beerType.current.co2
			};

			costs.total = costs.hops + costs.malt + costs.co2;

			return costs;
		}
		return {};
	}

	module.exports = {
		getRelativeProductionVolume: getRelativeProductionVolume,
		getProductionCost: getProductionCost
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var container = __webpack_require__(2);

	/* Private
	__________________________________________________________________________________*/

	// Get the costs for producing the current amounts.
	function getVariableCosts(stats) {
		// volume and ingredientscosts needs to be calculated. The rest is from form or db
		var containerProductionCosts = stats.containerProductionCosts,
		    volume = stats.volume,
		    ingredientsCosts = stats.ingredientsCosts;


		if (volume && ingredientsCosts && volume.total && containerProductionCosts) {
			var costs = {
				kegPrice: containerProductionCosts.keg * volume.keg,
				tapPrice: containerProductionCosts.tap * volume.tap,
				bottlePrice: containerProductionCosts.bottle * volume.bottle,
				ingredients: ingredientsCosts.total * volume.total
			};

			costs.total = costs.kegPrice + costs.tapPrice + costs.bottlePrice + costs.ingredients;

			return costs;
		}
		return {};
	}

	// Get the fixed costs for producing the current setup.
	function getFixedCosts(stats) {
		// Modules needs to be gathered before
		if (stats.modules) {
			var costs = {
				rent: container.getCost(stats)
			};

			return costs;
		}
		return {};
	}

	// Calculate the total income from distribution and prices
	function getIncome(stats) {
		// volume needs to be calculated before
		var containerLiterPrice = stats.containerLiterPrice,
		    volume = stats.volume;


		var incomes = {};

		if (containerLiterPrice && volume) {
			var kegPrice = containerLiterPrice.keg * volume.keg;
			var tapPrice = containerLiterPrice.tap * volume.tap;
			var bottlePrice = containerLiterPrice.bottle * volume.bottle;

			incomes.total = kegPrice + tapPrice + bottlePrice;
			return incomes;
		}
		return {};
	}

	/* public interface
	__________________________________________________________________________________*/

	// Get the revenue distribution
	function getEconomics(stats) {
		var economics = {
			incomes: getIncome(stats).total,
			fixedCosts: getFixedCosts(stats).total,
			variableCosts: getVariableCosts(stats).total
		};

		economics.profit = economics.incomes - economics.fixedCosts - economics.variableCosts;

		return economics;
	}

	module.exports = {
		getEconomics: getEconomics
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	// Calculate new position of distribution
	function getNewDistribution(calculationStats) {
		var volumeLeft = 1.0;

		var active = -1;
		var inactive = -1;
		var locked = -1;

		// Create a copy and remove the current slider
		var tempData = [];
		var tempNames = [];
		Object.keys(calculationStats.distribution).forEach(function (el, index) {
			tempData.push(calculationStats.distribution[el]);
			tempNames.push(el);

			// Extracting key status
			if (el === calculationStats.distributionLock[0]) {
				locked = index;
			} else if (el === calculationStats.distributionLock[1]) {
				inactive = index;
			} else {
				active = index;
			}
		});

		volumeLeft -= tempData[locked];

		// Try to remove everything from the slider moved least resently

		// Calculate the updated value
		volumeLeft -= tempData[inactive];
		tempData[active] = volumeLeft;

		if (tempData[active] > 1) {
			console.log('Something went wrong. Larger than 1');
		} else if (tempData[active] < 0) {
			tempData[inactive] += tempData[active];
			tempData[active] = 0;
		}

		// Create the return data
		var data = {};
		tempNames.forEach(function (element, index) {
			data[element] = tempData[index];
		});

		return data;
	}

	function extractFormData() {
		// Extract form data and insert it into a object
		var formdata = new FormData(document.querySelector('form.calculation-form'));
		var entries = formdata.entries();
		var dataObject = { distribution: {} };

		/* eslint-disable no-restricted-syntax */
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var entry = _step.value;

				switch (entry[0]) {
					case 'keg':
						dataObject.distribution[entry[0]] = parseFloat(entry[1]);
						break;
					case 'bottle':
						dataObject.distribution[entry[0]] = parseFloat(entry[1]);
						break;
					case 'tap':
						dataObject.distribution[entry[0]] = parseFloat(entry[1]);
						break;

					default:
						if (entry[1] % 1 === 0) {
							dataObject[entry[0]] = parseInt(entry[1], 10);
						} else {
							dataObject[entry[0]] = parseFloat(entry[1]);
						}
						break;
				}
			}
			/* eslint-enable no-restricted-syntax */
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return dataObject;
	}

	function loadFormInputs(calculationStats) {
		var stats = calculationStats;

		// Loading values from form
		document.querySelectorAll('.calculation-form .container-distribution').forEach(function (el) {
			stats.distribution[el.name] = parseFloat(el.value);
		});
	}

	function saveFormInputs(calculationStats) {
		// Assigning values to form
		document.querySelectorAll('.calculation-form .container-distribution').forEach(function (el) {
			/* eslint-disable no-param-reassign */
			el.value = calculationStats.distribution[el.name];
			/* eslint-enable no-param-reassign */
		});
	}

	function updateDistributionSliders(calculationStats, event) {
		var stats = calculationStats;

		loadFormInputs(stats);

		// Change tracking status
		if (event) {
			if (event.name !== stats.distributionLock[0]) {
				stats.distributionLock[1] = stats.distributionLock[0];
			}
			// Add current
			stats.distributionLock[0] = event.name;
		} else {
			stats.distributionLock = ['tap', 'bottle'];
		}

		// Calculate
		stats.distribution = getNewDistribution(stats);

		saveFormInputs(stats);
	}

	module.exports = {
		loadFormInputs: loadFormInputs,
		saveFormInputs: saveFormInputs,
		getNewDistribution: getNewDistribution,
		updateDistributionSliders: updateDistributionSliders,
		extractFormData: extractFormData
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	function loadJSON(url) {
		return new Promise(function (resolve, reject) {
			var httpRequest = new XMLHttpRequest();

			try {
				// Opera 8.0+, Firefox, Chrome, Safari
				httpRequest = new XMLHttpRequest();
			} catch (e) {
				// Internet Explorer Browsers
				try {
					httpRequest = new window.ActiveXObject('Msxml2.XMLHTTP');
				} catch (e1) {
					try {
						httpRequest = new window.ActiveXObject('Microsoft.XMLHTTP');
					} catch (e2) {
						reject('Unsupported browser');
					}
				}
			}

			// Setting receive callback
			httpRequest.onreadystatechange = function () {
				if (httpRequest.readyState === 4) {
					if (httpRequest.status === 200) {
						var jsonObj = JSON.parse(httpRequest.responseText);
						resolve(jsonObj);
					} else {
						reject('Resource not found: ' + url);
					}
				}
			};

			httpRequest.open('GET', url, true);
			httpRequest.send();
		});
	}

	module.exports = {
		loadJSON: loadJSON
	};

/***/ })
/******/ ]);