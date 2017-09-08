webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"main\">\n  <div class=\"input-row\">\n\n    <div class=\"card\" *ngFor=\"let color of colors\">\n      <div class=\"header title {{ color }}\">\n        {{ color }}\n      </div>\n\n\n      <div class=\"card-content\">\n        <div class=\"hero-names\">\n          <div class=\"focus-hero-names\">\n              Focus Hero Names:\n          </div>\n\n          <div *ngFor=\"let name of names[color]; let i = index;\">\n\n            <div class=\"input-button-row\">\n              <input class=\"non-md\" type=\"text\" [(ngModel)]=\"names[color][i].name\">\n              <button class=\"remove\" md-icon-button (click)=\"names[color].splice(i, 1)\">\n                <!--<i class=\"material-icons\">&#xE15D;</i>-->\n                <i class=\"material-icons\">&#xE14C;</i>\n              </button>\n            </div>\n          </div>\n\n          <div class=\"align-right add-focus-row\">\n            <button md-button\n                    color=\"primary\"\n                    (click)=\"addHero(color)\">\n              Add Focus Hero\n              <!--<i class=\"material-icons\">&#xE146;</i>-->\n            </button>\n          </div>\n        </div>\n\n        <hr/>\n\n        <div class=\"form-row\">\n          <md-checkbox [(ngModel)]=\"simulator.shouldRoll[color]\">\n            <div class=\"checkbox-label\">\n              Summon {{ color }}\n            </div>\n          </md-checkbox>\n        </div>\n\n        <div class=\"conditions card-item\" *ngIf=\"simulator.shouldRoll[color]\">\n\n          <div class=\"condition\" *ngFor=\"let condition of simulator.stopConditions[color]; let i = index\">\n            <div *ngIf=\"i == 0\" class=\"stop-after-receiving\">\n              Stop after receiving:\n            </div>\n            <div *ngIf=\"i != 0\" class=\"and\">\n              and\n            </div>\n\n            <div class=\"condition-inner\">\n              <div class=\"remove\" (click)=\"simulator.stopConditions[color].splice(i, 1)\" title=\"Remove condition\">\n                <i class=\"material-icons\">&#xE14C;</i>\n              </div>\n              <div class=\"copies-of-row\">\n                <input type=\"number\" class=\"non-md\" [(ngModel)]=\"condition.count\"> <span> copies of</span>\n              </div>\n\n              <md-select [(ngModel)]=\"condition.index\">\n                <md-option *ngFor=\"let name of names[color]; let j = index\" [value]=\"j\">\n                  {{ name.name }}\n                </md-option>\n              </md-select>\n            </div>\n\n          </div>\n          <div class=\"align-right\">\n            <button md-button (click)=\"addCondition(color)\" color=\"primary\">\n              Add condition\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"submit-row\">\n    <div class=\"card\">\n      <strong>About:</strong>\n      <p>\n        This simulator allows you to create a summoning policy and\n        simulate thousands of possible summons in order approximate the probability distributions\n        over the number of each hero type you will receive.\n      </p>\n\n      <br/>\n\n      <strong>How To Use:</strong>\n      <p>\n        First, enter in the hero names of the banner you will be summoning from.\n        It is important to enter in all the heroes from all colors since they all\n        affect each other's probabilities.\n      </p>\n      <p>\n        Select which banners you wish to summon from and the conditions under which\n        you would stop summoning from them. Enter your number of orbs and begin summoning.\n      </p>\n\n      <br/>\n      <strong>Assumptions:</strong>\n      <p>\n        The simulator assumes that, given a rarity, the probability of each hero\n        that can be summoned at that rarity is the same, regardless of the color\n        of the hero.\n      </p>\n\n\n    </div>\n    <div class=\"card\">\n      <strong style=\"margin-bottom: 15px\">Parameters:</strong>\n      <md-form-field>\n        <input mdInput placeholder=\"Number of Orbs\" type=\"number\" [(ngModel)]=\"simulator.numOrbs\">\n      </md-form-field>\n      <md-form-field>\n        <input mdInput placeholder=\"Number of Simulations\" type=\"number\" [(ngModel)]=\"numTrials\">\n      </md-form-field>\n\n      <md-form-field>\n        <input mdInput\n               placeholder=\"Focus Base Probability\"\n               type=\"number\"\n               step=\"0.01\"\n               [(ngModel)]=\"simulator.baseProb.focus\">\n      </md-form-field>\n      <md-form-field>\n        <input mdInput\n               placeholder=\"Five Star Base Probability\"\n               type=\"number\"\n               step=\"0.01\"\n               [(ngModel)]=\"simulator.baseProb.five\">\n      </md-form-field>\n      <md-form-field>\n        <input mdInput\n               placeholder=\"Four Star Base Probability\"\n               type=\"number\"\n               step=\"0.01\"\n               [(ngModel)]=\"simulator.baseProb.four\">\n      </md-form-field>\n      <md-form-field>\n        <input mdInput\n               placeholder=\"Three Star Base Probability\"\n               type=\"number\"\n               step=\"0.01\"\n               [(ngModel)]=\"simulator.baseProb.three\">\n      </md-form-field>\n\n      <div class=\"align-right run-simulations-container\">\n        <button md-raised-button\n                [disabled]=\"runButtonDisabled\"\n                (click)=\"runSimulation()\" color=\"primary\">\n          Run Simulations\n        </button>\n      </div>\n    </div>\n  </div>\n\n\n  <div class=\"charts\" id=\"charts\">\n    <div class=\"chart-category-container\" *ngFor=\"let chartType of ['misc', 'focus', 'five', 'four', 'three']\">\n      <div class=\"chart-category\" *ngIf=\"charts[chartType].length\">\n        <div class=\"title\">\n          {{ chartTypeFullText[chartType] }} Percentages\n        </div>\n\n        <div class=\"charts-container\">\n          <div class='chart-container' *ngFor=\"let chartData of charts[chartType]; let i = index\">\n            <feh-chart\n                    [datasets]=\"chartData.datasets\"\n                    [title]=\"chartData.title\"\n                    [colors]=\"chartData.colors\"\n                    [labels]=\"chartData.labels\"></feh-chart>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#main {\n  display: inline-block;\n  width: 100%;\n  max-width: 1150px;\n  padding-top: 80px;\n  color: #555; }\n\n.align-right {\n  text-align: right; }\n  .align-right button {\n    display: inline-block !important; }\n\n.input-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  width: 100%;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start; }\n  .input-row .card {\n    width: 100%;\n    max-width: 275px; }\n\nbutton i {\n  color: #555;\n  transition: color 0.15s;\n  display: inline-block !important; }\n\nbutton.remove i {\n  color: #555;\n  transition: color 0.15s; }\n\nbutton.remove:hover i {\n  color: black; }\n\nbutton {\n  font-size: 0.8em;\n  text-transform: uppercase; }\n\ninput.non-md {\n  padding: 12px;\n  margin: 4px 0;\n  border: none;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.24), 0 1px 3px rgba(0, 0, 0, 0.12);\n  font-family: Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  color: #222;\n  font-size: 14px;\n  color: #555;\n  border-radius: 2px; }\n  input.non-md:focus {\n    outline: none;\n    background: rgba(0, 0, 0, 0.01);\n    transition: background 0.15s; }\n\n.card {\n  margin: 6px;\n  display: inline-block;\n  border: none;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.24), 0 1px 3px rgba(0, 0, 0, 0.12);\n  text-align: left;\n  background: white;\n  border-radius: 2px; }\n  .card .hero-names .non-md {\n    box-shadow: none !important;\n    border: 1px solid #CCC;\n    border-radius: 3px;\n    padding-top: 10px;\n    padding-bottom: 10px; }\n  .card .focus-hero-names {\n    text-transform: uppercase;\n    font-size: 12px;\n    margin-bottom: 12px; }\n  .card .header {\n    color: white;\n    padding: 20px; }\n    .card .header.red {\n      background: #cb6165; }\n    .card .header.green {\n      background: #57b457; }\n    .card .header.blue {\n      background: #545fb4; }\n    .card .header.colorless {\n      background: #929292; }\n  .card .card-content {\n    padding: 5px 20px 20px; }\n  .card hr {\n    margin: 16px 0;\n    border: none;\n    height: 1px;\n    width: 100%;\n    background: #BABABA; }\n  .card * {\n    display: block; }\n  .card .title {\n    font-size: 1.2em;\n    text-transform: uppercase;\n    margin-bottom: 12px; }\n  .card .input-row .label {\n    margin-bottom: 6px; }\n  .card .card-item {\n    margin-top: 12px; }\n  .card .add-focus-row {\n    margin-top: 10px; }\n  .card .input-button-row {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .card .input-button-row input {\n      -webkit-box-flex: 1;\n          -ms-flex-positive: 1;\n              flex-grow: 1; }\n  .card .stop-after-receiving {\n    text-transform: uppercase;\n    font-size: 12px;\n    margin: 24px 0 4px; }\n  .card .checkbox-label {\n    font-size: 12px;\n    text-transform: uppercase; }\n  .card .condition .and {\n    text-transform: uppercase;\n    text-align: center;\n    font-size: 12px;\n    margin: 8px 0; }\n  .card .condition .condition-inner {\n    padding: 16px 20px 24px;\n    margin: 16px -20px;\n    background: #faeeed;\n    background: #f3f3f3;\n    border-top: 1px solid #DDD;\n    border-bottom: 1px solid #DDD;\n    position: relative; }\n    .card .condition .condition-inner .remove {\n      display: block;\n      width: 20px;\n      height: 20px;\n      position: absolute;\n      top: 8px;\n      right: 12px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      transition: color 0.15s;\n      font-size: 10px;\n      color: #999; }\n      .card .condition .condition-inner .remove:hover {\n        cursor: pointer;\n        color: black; }\n    .card .condition .condition-inner .copies-of-row {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-pack: distribute;\n          justify-content: space-around;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      padding-right: 18px;\n      text-transform: uppercase;\n      font-size: 12px; }\n    .card .condition .condition-inner input[type='number'] {\n      max-width: 50px;\n      display: inline-block;\n      transition: box-shadow 0.15s;\n      background: white !important; }\n      .card .condition .condition-inner input[type='number']:focus {\n        background: white !important; }\n    .card .condition .condition-inner input {\n      display: inline-block; }\n    .card .condition .condition-inner span {\n      display: inline-block; }\n    .card .condition .condition-inner md-select {\n      padding-top: 8px; }\n\n.submit-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  margin-top: 20px; }\n  .submit-row .card {\n    padding: 30px;\n    margin: 26px 8px 20px;\n    border-top: 8px solid #e26c70;\n    width: 300px; }\n    .submit-row .card p {\n      line-height: 20px; }\n    .submit-row .card .run-simulations-container {\n      padding-top: 12px; }\n\n.charts {\n  max-width: 850px;\n  width: 100%;\n  display: inline-block;\n  padding-bottom: 200px; }\n  .charts .chart-category {\n    border-radius: 2px;\n    background: white;\n    padding: 30px;\n    margin: 24px 0; }\n    .charts .chart-category .title {\n      margin: 8px 0 24px;\n      font-size: 1.3em;\n      font-weight: bold;\n      text-transform: uppercase;\n      text-align: left;\n      padding-left: 30px; }\n    .charts .chart-category .charts-container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n      -ms-flex-pack: distribute;\n          justify-content: space-around; }\n      .charts .chart-category .charts-container .chart-container {\n        padding: 12px 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__simulator_simulator_model__ = __webpack_require__("../../../../../src/app/simulator/simulator.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__simulator_stopcondition_model__ = __webpack_require__("../../../../../src/app/simulator/stopcondition.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__simulator_constants__ = __webpack_require__("../../../../../src/app/simulator/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
        this.colors = ['red', 'blue', 'green', 'colorless'];
        this.simulator = new __WEBPACK_IMPORTED_MODULE_1__simulator_simulator_model__["a" /* Simulator */]();
        this.names = {};
        // charts: any[] = [];
        this.runButtonDisabled = false;
        this.numTrials = 1000;
        this.chartTypeFullText = {
            'misc': 'Misc',
            'focus': 'Focus',
            'four': 'Four Star',
            'five': 'Five Star',
            'three': 'Three Star'
        };
        this.names = {
            'red': [{ name: 'Ike' }],
            'blue': [{ name: 'Ninian' }],
            'green': [{ name: 'Julia' }],
            'colorless': [{ name: 'Genny' }]
        };
        this.simulator.numOrbs = 200;
        this.resetCharts();
    }
    AppComponent.prototype.addCondition = function (color) {
        var condition = new __WEBPACK_IMPORTED_MODULE_2__simulator_stopcondition_model__["a" /* StopCondition */]();
        condition.stopColor = color;
        condition.targetColor = color;
        this.simulator.stopConditions[color].push(condition);
    };
    AppComponent.prototype.addHero = function (color) {
        var capitalized = color.charAt(0).toUpperCase() + color.slice(1);
        this.names[color].push({ name: capitalized + ' Hero ' + (this.names[color].length + 1) });
        this.simulator.unitCounts.focus[color] = this.names[color].length;
    };
    AppComponent.prototype.trackByFn = function (index, item) {
        return index;
    };
    AppComponent.prototype.resetCharts = function () {
        this.charts = {
            'misc': [],
            'focus': [],
            'five': [],
            'four': [],
            'three': []
        };
    };
    AppComponent.prototype.runSimulation = function () {
        var _this = this;
        this.runButtonDisabled = true;
        var results = this.simulator.runTrials(this.numTrials);
        this.meetCondDataset = [];
        this.resetCharts();
        console.log("Your results");
        console.log(results);
        var shouldDisplayChart = false;
        // Meet condition chart
        __WEBPACK_IMPORTED_MODULE_3__simulator_constants__["a" /* Constants */].colors.forEach(function (color) {
            if (_this.simulator.shouldRoll[color] && _this.simulator.stopConditions[color].length) {
                _this.meetCondDataset.push({
                    label: color,
                    data: [results.conditions[color]]
                });
                shouldDisplayChart = true;
            }
            else {
                _this.meetCondDataset.push({
                    label: color,
                    data: [0]
                });
            }
        });
        if (shouldDisplayChart) {
            this.meetCondDataset.push({
                label: 'All Conditions Met',
                data: [results.conditions['all']]
            });
            console.log(this.meetCondDataset);
            this.charts.misc.push({
                datasets: this.meetCondDataset,
                labels: ['Probability of meeting condition'],
                colors: [
                    __WEBPACK_IMPORTED_MODULE_3__simulator_constants__["a" /* Constants */].colorCodes['red'],
                    __WEBPACK_IMPORTED_MODULE_3__simulator_constants__["a" /* Constants */].colorCodes['blue'],
                    __WEBPACK_IMPORTED_MODULE_3__simulator_constants__["a" /* Constants */].colorCodes['green'],
                    __WEBPACK_IMPORTED_MODULE_3__simulator_constants__["a" /* Constants */].colorCodes['colorless'],
                    '#333333'
                ],
                title: 'Probability of Meeting Conditions'
            });
        }
        // Number of each rarity chart other distribution charts
        var counts = results.counts;
        Object.keys(counts).forEach(function (rarity) {
            Object.keys(counts[rarity]).forEach(function (color) {
                if (!_this.simulator.shouldRoll[color]) {
                    return;
                }
                var units = counts[rarity][color];
                for (var i = 0; i < units.length; i++) {
                    var name = void 0;
                    if (rarity == 'focus') {
                        name = _this.names[color][i].name;
                    }
                    else {
                        name = color + ' ' + rarity + ' star';
                    }
                    var samples = units[i];
                    var chart = _this.samplesToChart(samples);
                    chart['title'] = name;
                    chart['colors'] = [__WEBPACK_IMPORTED_MODULE_3__simulator_constants__["a" /* Constants */].colorCodes[color]];
                    _this.charts[rarity].push(chart);
                }
            });
        });
        var allFocusChart = this.samplesToChart(results.allFocus);
        allFocusChart['title'] = "Total Focus";
        this.charts['focus'].push(allFocusChart);
        var allFivesChart = this.samplesToChart(results.allFives);
        allFivesChart['title'] = "Total Non-focus Five Stars";
        this.charts['five'].push(allFivesChart);
        this.runButtonDisabled = false;
    };
    AppComponent.prototype.samplesToChart = function (samples) {
        var chart = {
            datasets: [{
                    data: [],
                }],
            labels: [],
        };
        var min = 0;
        var max = Math.max.apply(null, samples);
        var numBuckets = Math.min(max - min + 1, this.numTrials / 5);
        var bucketSize = Math.floor((max - min + 1) / numBuckets);
        for (var j = 0; j < numBuckets; j++) {
            var lowerBound = min + j * bucketSize;
            var upperBound = min + (j + 1) * bucketSize - 1;
            if (lowerBound == upperBound) {
                chart.labels.push(lowerBound);
            }
            else {
                chart.labels.push(lowerBound + '-' + upperBound);
            }
            chart.datasets[0].data.push(0);
        }
        for (var j = 0; j < samples.length; j++) {
            var sample = samples[j];
            var bucketIndex = Math.floor((sample - min) / bucketSize);
            chart.datasets[0].data[bucketIndex] += 1 / this.numTrials;
        }
        return chart;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chart_chart_component__ = __webpack_require__("../../../../../src/app/chart/chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_charts__ = __webpack_require__("../../../../ng2-charts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__chart_chart_component__["a" /* ChartComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_6_ng2_charts__["ChartsModule"],
            __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_material__["a" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_material__["b" /* MdCheckboxModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_material__["c" /* MdInputModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_material__["d" /* MdSelectModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/chart/chart.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <canvas baseChart\n            width=\"300\"\n            height=\"200\"\n            [datasets]=\"datasets\"\n            [labels]=\"labels\"\n            [options]=\"barChartOptions\"\n            [legend]=\"legend\"\n            [colors]=\"colors\"\n\n            [chartType]=\"barChartType\"></canvas>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/chart/chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ChartComponent = (function () {
    function ChartComponent() {
        this.percents = true;
        this.labels = [1, 2, 3];
        this.datasets = [
            { data: [3, 2, 1], label: 'Red' }
        ];
        this.barChartType = 'bar';
        this.legend = false;
        // Setup options
        var ticks = {
            beginAtZero: true,
        };
        if (this.percents) {
            // ticks['max'] = 1;
            ticks['callback'] = function (value, index, values) {
                return '%' + (parseFloat(value) * 100).toFixed(0);
            };
        }
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            scales: {
                yAxes: [{
                        ticks: ticks,
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }],
                xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }]
            },
            responsive: true
        };
    }
    ChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.title) {
            this.barChartOptions['title'] = {
                display: true,
                text: this.title
            };
        }
        if (this.percents) {
            this.datasets.forEach(function (dataset) {
                for (var i = 0; i < dataset.data.length; i++) {
                    dataset.data[i] = dataset.data[i].toFixed(3);
                }
            });
        }
        if (this.colors) {
            var colors = this.colors;
            this.colors = [];
            colors.forEach(function (color) {
                _this.colors.push({ backgroundColor: color });
            });
        }
    };
    return ChartComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], ChartComponent.prototype, "percents", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], ChartComponent.prototype, "labels", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], ChartComponent.prototype, "datasets", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ChartComponent.prototype, "title", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], ChartComponent.prototype, "colors", void 0);
ChartComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'feh-chart',
        template: __webpack_require__("../../../../../src/app/chart/chart.component.html"),
    }),
    __metadata("design:paramtypes", [])
], ChartComponent);

//# sourceMappingURL=chart.component.js.map

/***/ }),

/***/ "../../../../../src/app/simulator/constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
var Constants = (function () {
    function Constants() {
    }
    return Constants;
}());

Constants.costs = [5, 4, 4, 4, 3];
Constants.rarities = ['focus', 'five', 'four', 'three'];
Constants.colors = ['red', 'blue', 'green', 'colorless'];
Constants.colorCodes = {
    'red': '#cb595f',
    'blue': '#5a6cc7',
    'green': '#59c959',
    'colorless': '#c9c9c9',
};
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../../../../../src/app/simulator/results.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Results; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("../../../../../src/app/simulator/constants.ts");

var Results = (function () {
    function Results(focusCounts) {
        this.conditionsMet = {};
        this.allConditionsMet = false;
        this.counts = Results.createEmptyCounts(focusCounts);
    }
    Results.createEmptyCounts = function (focusCounts) {
        var counts = {};
        var rarities = __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Constants */].rarities;
        var colors = __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Constants */].colors;
        for (var i = 0; i < rarities.length; i++) {
            counts[rarities[i]] = {};
            for (var j = 0; j < colors.length; j++) {
                var numValues = rarities[i] == 'focus' ? focusCounts[colors[j]] : 1;
                counts[rarities[i]][colors[j]] = [];
                for (var k = 0; k < numValues; k++) {
                    counts[rarities[i]][colors[j]].push(0);
                }
            }
        }
        return counts;
    };
    Results.prototype.add = function (color, rarity, index) {
        index = index || 0;
        this.counts[rarity][color][index] += 1;
    };
    return Results;
}());

//# sourceMappingURL=results.model.js.map

/***/ }),

/***/ "../../../../../src/app/simulator/simulator.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Simulator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("../../../../../src/app/simulator/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__results_model__ = __webpack_require__("../../../../../src/app/simulator/results.model.ts");



var Simulator = (function () {
    function Simulator() {
        this.numOrbs = 500;
        this.shouldRoll = { 'red': true, 'blue': true, 'green': true, 'colorless': true };
        this.baseProb = {
            'focus': .03,
            'five': .03,
            'four': .58,
            'three': .36
        };
        this.unitCounts = {
            'focus': { 'red': 1, 'blue': 1, 'green': 1, 'colorless': 1 },
            'five': { 'red': 29, 'blue': 21, 'green': 17, 'colorless': 19 },
            'four': { 'red': 28, 'blue': 24, 'green': 18, 'colorless': 24 },
            'three': { 'red': 15, 'blue': 12, 'green': 9, 'colorless': 13 }
        };
        this.stopConditions = {
            'red': [],
            'blue': [],
            'green': [],
            'colorless': []
        };
        this.colorGivenRarityDist = {};
        var rarities = __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Constants */].rarities;
        var colors = __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Constants */].colors;
        for (var i = 0; i < rarities.length; i++) {
            var distribution = {};
            this.colorGivenRarityDist[rarities[i]] = distribution;
            var total = 0;
            for (var j = 0; j < colors.length; j++) {
                total += this.unitCounts[rarities[i]][colors[j]];
            }
            for (var j = 0; j < colors.length; j++) {
                distribution[colors[j]] = this.unitCounts[rarities[i]][colors[j]] / total;
            }
        }
    }
    Simulator.prototype.runTrial = function () {
        var _this = this;
        var results = new __WEBPACK_IMPORTED_MODULE_1__results_model__["a" /* Results */](this.unitCounts['focus']);
        var targetColors = [];
        var rollsWithoutFiveStar = 0;
        Object.keys(this.shouldRoll).forEach(function (color) {
            if (_this.shouldRoll[color]) {
                targetColors.push(color);
            }
        });
        var orbsRemaining = this.numOrbs;
        while (orbsRemaining > 5) {
            if (targetColors.length == 0) {
                break;
            }
            // A single roll
            var stones = [];
            var pityRate = Math.floor(rollsWithoutFiveStar / 5) * 0.0025;
            var nonFiveProb = this.baseProb['five'] + this.baseProb['four'];
            var rarityDistribution = {
                'focus': this.baseProb['focus'] + pityRate,
                'five': this.baseProb['five'] + pityRate,
                'four': this.baseProb['four'] - (this.baseProb['four'] * 2 * pityRate / nonFiveProb),
                'three': this.baseProb['three'] - (this.baseProb['three'] * 2 * pityRate / nonFiveProb)
            };
            for (var i = 0; i < 5; i++) {
                var rarity = this.sampleDistribution(rarityDistribution);
                stones.push({
                    'color': this.selectColorGivenRarity(rarity),
                    'rarity': rarity
                });
            }
            var rollIndex = 0;
            var desiredColorExists = false;
            for (var i = 0; i < stones.length; i++) {
                if (targetColors.indexOf(stones[i]['color']) != -1) {
                    desiredColorExists = true;
                    break;
                }
            }
            for (var i = 0; i < stones.length; i++) {
                var color = stones[i]['color'];
                var rarity = stones[i]['rarity'];
                if (targetColors.indexOf(color) != -1 || (!desiredColorExists && rollIndex == 1)) {
                    if (orbsRemaining >= __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Constants */].costs[rollIndex]) {
                        orbsRemaining -= __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Constants */].costs[rollIndex];
                        if (rarity == 'focus') {
                            var numFocus = this.unitCounts['focus'][color];
                            var focusIndex = Math.floor(Math.random() * numFocus);
                            results.add(color, rarity, focusIndex);
                        }
                        else {
                            results.add(color, rarity, 0);
                        }
                        if (rarity != 'focus' && rarity != 'five') {
                            rollsWithoutFiveStar += 1;
                        }
                        else {
                            rollsWithoutFiveStar = 0;
                        }
                    }
                    if (this.stopConditions[color].length != 0
                        && this.conditionsMet(this.stopConditions[color], results)) {
                        targetColors.splice(targetColors.indexOf(color), 1);
                    }
                }
                rollIndex += 1;
            }
        }
        var allConditionsMet = true;
        for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Constants */].colors.length; i++) {
            var color = __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Constants */].colors[i];
            results.conditionsMet[color] =
                this.conditionsMet(this.stopConditions[color], results);
            if (this.stopConditions[color].length &&
                !this.conditionsMet(this.stopConditions[color], results)) {
                allConditionsMet = false;
            }
        }
        results.allConditionsMet = allConditionsMet;
        return results;
    };
    Simulator.prototype.conditionsMet = function (conditions, results) {
        for (var i = 0; i < conditions.length; i++) {
            if (!conditions[i].conditionMet(results)) {
                return false;
            }
        }
        return true;
    };
    Simulator.prototype.runTrials = function (numTrials) {
        var _this = this;
        var counts = 0;
        var conditionMetCount = {
            'red': 0, 'blue': 0, 'green': 0, 'colorless': 0, 'all': 0
        };
        var totalCounts;
        var allFives = [];
        var allFocus = [];
        var _loop_1 = function (i) {
            var results = this_1.runTrial();
            var totalFives = 0;
            Object.keys(results.counts['five']).forEach(function (color) {
                totalFives += _this.sum(results.counts['five'][color]);
            });
            var totalFocus = 0;
            Object.keys(results.counts['focus']).forEach(function (color) {
                totalFocus += _this.sum(results.counts['focus'][color]);
            });
            allFives.push(totalFives);
            allFocus.push(totalFocus);
            if (!totalCounts) {
                totalCounts = __WEBPACK_IMPORTED_MODULE_1__results_model__["a" /* Results */].createEmptyCounts(this_1.unitCounts['focus']);
            }
            else {
                var counts_1 = results.counts;
                Object.keys(counts_1).forEach(function (rarity) {
                    Object.keys(counts_1[rarity]).forEach(function (color) {
                        for (var j = 0; j < counts_1[rarity][color].length; j++) {
                            if (totalCounts[rarity][color][j] == 0) {
                                totalCounts[rarity][color][j] = []; // Hack to reuse initialization code
                            }
                            totalCounts[rarity][color][j].push(counts_1[rarity][color][j]);
                        }
                    });
                });
            }
            for (var i_1 = 0; i_1 < __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Constants */].colors.length; i_1++) {
                var color = __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Constants */].colors[i_1];
                conditionMetCount[color] += results.conditionsMet[color] ? 1 : 0;
            }
            conditionMetCount['all'] += results.allConditionsMet ? 1 : 0;
        };
        var this_1 = this;
        for (var i = 0; i < numTrials; i++) {
            _loop_1(i);
        }
        Object.keys(conditionMetCount).forEach(function (key) {
            conditionMetCount[key] /= numTrials;
        });
        return {
            'conditions': conditionMetCount,
            'counts': totalCounts,
            'allFives': allFives,
            'allFocus': allFocus
        };
    };
    Simulator.prototype.selectColorGivenRarity = function (rarity) {
        return this.sampleDistribution(this.colorGivenRarityDist[rarity]);
    };
    Simulator.prototype.sum = function (list) {
        var sum = 0;
        for (var i = 0; i < list.length; i++) {
            sum += list[i];
        }
        return sum;
    };
    Simulator.prototype.sampleDistribution = function (distribution) {
        var rand = Math.random();
        var total = 0;
        for (var key in distribution) {
            if (distribution.hasOwnProperty(key)) {
                total += distribution[key];
                if (rand < total) {
                    return key;
                }
            }
        }
        var keys = Object.keys(distribution);
        return keys[Math.floor(Math.random() * keys.length)];
    };
    return Simulator;
}());

// const simulator = new Simulator();
// let results = simulator.runTrials(1);
// console.log(results);
//# sourceMappingURL=simulator.model.js.map

/***/ }),

/***/ "../../../../../src/app/simulator/stopcondition.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StopCondition; });
var StopCondition = (function () {
    function StopCondition() {
        this.index = 0;
        this.count = 1;
        this.targetColor = 'blue'; // Color to watch for condition
        this.stopColor = 'blue'; // Color to stop rolling if condition met
    }
    StopCondition.prototype.conditionMet = function (results) {
        return results.counts['focus'][this.targetColor][this.index] >= this.count;
    };
    return StopCondition;
}());

//# sourceMappingURL=stopcondition.model.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map