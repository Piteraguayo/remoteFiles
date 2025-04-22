(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    (g.bitmovin || (g.bitmovin = {})).playerui = f();
  }
})(function () {
  var define, module, exports;
  /**
   ******************** 3CatInfo suplemental code to control UI
   */

  const cat3InfoBitmovinUI = {
    settingsButton: null,
    airPlayButton: null,
    playBacktimeLabel: null
  }

  const messageToRN = (message) => {
    window.bitmovin.customMessageHandler.sendSynchronous(message)
  }

  const cat3InfoSetUIElements = () => {
    const settingsButton = document.querySelector('.bmpui-ui-settingstogglebutton');
    if (settingsButton) {
      cat3InfoBitmovinUI.settingsButton = settingsButton;
      messageToRN("READY cat3InfoSetUIElements")
    }

    const airPlayButton = document.querySelector('.bmpui-ui-airplaytogglebutton');

    if (airPlayButton) {
      cat3InfoBitmovinUI.airPlayButton = airPlayButton;
      messageToRN("AIR PLAY BUTTON cat3InfoSetUIElements")
    }

    const playBacktimeLabel = document.querySelector(
      '.bmpui-ui-playbacktimelabel'
    );

    if (playBacktimeLabel) {
      cat3InfoBitmovinUI.playBacktimeLabel = playBacktimeLabel;
      messageToRN("PLAYBACK 22222 TIME LABEL cat3InfoSetUIElements")
    } else {
      messageToRN("NOOOOO 333333 ha encontrado PLAYBACK TIME LABEL")
    }
  }

  const showHideAirPlayButton = (showButton) => {
    messageToRN("SHOW HIDE AIR PLAY BUTTON")
    if (cat3InfoBitmovinUI.airPlayButton) {
      if (showButton) {
        cat3InfoBitmovinUI.airPlayButton.style.display = 'block !important';
      } else {
        cat3InfoBitmovinUI.airPlayButton.style.display = 'none !important';
      }
    }
  }

  const showHidePlaybackTimeLabel = (showLabel) => {
    messageToRN("SHOW HIDE PLAYBACK TIME LABEL")
    if (cat3InfoBitmovinUI.playBacktimeLabel) {
      if (showLabel) {
        cat3InfoBitmovinUI.playBacktimeLabel.style.display = 'block !important';
      } else {
        cat3InfoBitmovinUI.playBacktimeLabel.style.display = 'none !important';
      }
    }
  }

  const cat3InfoOnPlayerReady = () => {
    messageToRN("PLAYER IS READY1111: " + document.body.innerHTML)
    cat3InfoSetUIElements();
    showHideAirPlayButton(false);
    showHidePlaybackTimeLabel(true);
  }

  const onFloatingModeChanged = (data) => {
    cat3InfoSetUIElements(); // force to find elements

    if (cat3InfoBitmovinUI.settingsButton) {
      cat3InfoBitmovinUI.settingsButton.style.position = 'absolute';
      cat3InfoBitmovinUI.settingsButton.style.right = '10px';
      cat3InfoBitmovinUI.settingsButton.style.top = '10px';

      messageToRN("He encontrado el botón settings" + data)
    }    
  }
  window.bitmovin.customMessageHandler.on(
    "floatingModeChanged",
    onFloatingModeChanged
  );

  window.bitmovin.customMessageHandler.on(
    "3CatInfoBitMovinReady",
    cat3InfoOnPlayerReady
  );

  /**
   ******************** END 3CatInfo suplemental code to control UI ********************
   */
  return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw ((f.code = "MODULE_NOT_FOUND"), f);
        }
        var l = (n[o] = { exports: {} });
        t[o][0].call(
          l.exports,
          function (e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          },
          l,
          l.exports,
          e,
          t,
          n,
          r
        );
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  })(
    {
      1: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.ArrayUtils = void 0;
          var ArrayUtils;
          (function (ArrayUtils) {
            /**
             * Removes an item from an array.
             * @param array the array that may contain the item to remove
             * @param item the item to remove from the array
             * @returns {any} the removed item or null if it wasn't part of the array
             */
            function remove(array, item) {
              var index = array.indexOf(item);
              if (index > -1) {
                return array.splice(index, 1)[0];
              } else {
                return null;
              }
            }
            ArrayUtils.remove = remove;
          })((ArrayUtils = exports.ArrayUtils || (exports.ArrayUtils = {})));
        },
        {},
      ],
      2: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.AudioTrackSwitchHandler = void 0;
          var i18n_1 = require("./localization/i18n");
          /**
           * Helper class to handle all audio tracks related events
           *
           * This class listens to player events as well as the `ListSelector` event if selection changed
           */
          var AudioTrackSwitchHandler = /** @class */ (function () {
            function AudioTrackSwitchHandler(player, element, uimanager) {
              var _this = this;
              this.addAudioTrack = function (event) {
                var audioTrack = event.track;
                if (!_this.listElement.hasItem(audioTrack.id)) {
                  _this.listElement.addItem(
                    audioTrack.id,
                    i18n_1.i18n.getLocalizer(audioTrack.label),
                    true
                  );
                }
              };
              this.removeAudioTrack = function (event) {
                var audioTrack = event.track;
                if (_this.listElement.hasItem(audioTrack.id)) {
                  _this.listElement.removeItem(audioTrack.id);
                }
              };
              this.selectCurrentAudioTrack = function () {
                var currentAudioTrack = _this.player.getAudio();
                // HLS streams don't always provide this, so we have to check
                if (currentAudioTrack) {
                  _this.listElement.selectItem(currentAudioTrack.id);
                }
              };
              this.refreshAudioTracks = function () {
                var audioTracks = _this.player.getAvailableAudio();
                var audioTrackToListItem = function (audioTrack) {
                  return { key: audioTrack.id, label: audioTrack.label };
                };
                _this.listElement.synchronizeItems(
                  audioTracks.map(audioTrackToListItem)
                );
                _this.selectCurrentAudioTrack();
              };
              this.player = player;
              this.listElement = element;
              this.uimanager = uimanager;
              this.bindSelectionEvent();
              this.bindPlayerEvents();
              this.refreshAudioTracks();
            }
            AudioTrackSwitchHandler.prototype.bindSelectionEvent = function () {
              var _this = this;
              this.listElement.onItemSelected.subscribe(function (_, value) {
                _this.player.setAudio(value);
              });
            };
            AudioTrackSwitchHandler.prototype.bindPlayerEvents = function () {
              // Update selection when selected track has changed
              this.player.on(
                this.player.exports.PlayerEvent.AudioChanged,
                this.selectCurrentAudioTrack
              );
              // Update tracks when source goes away
              this.player.on(
                this.player.exports.PlayerEvent.SourceUnloaded,
                this.refreshAudioTracks
              );
              // Update tracks when the period within a source changes
              this.player.on(
                this.player.exports.PlayerEvent.PeriodSwitched,
                this.refreshAudioTracks
              );
              // Update tracks when a track is added or removed
              this.player.on(
                this.player.exports.PlayerEvent.AudioAdded,
                this.addAudioTrack
              );
              this.player.on(
                this.player.exports.PlayerEvent.AudioRemoved,
                this.removeAudioTrack
              );
              this.uimanager
                .getConfig()
                .events.onUpdated.subscribe(this.refreshAudioTracks);
            };
            return AudioTrackSwitchHandler;
          })();
          exports.AudioTrackSwitchHandler = AudioTrackSwitchHandler;
        },
        { "./localization/i18n": 93 },
      ],
      3: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.BrowserUtils = void 0;
          var BrowserUtils = /** @class */ (function () {
            function BrowserUtils() {}
            Object.defineProperty(BrowserUtils, "isMobile", {
              // isMobile only needs to be evaluated once (it cannot change during a browser session)
              // Mobile detection according to Mozilla recommendation: "In summary, we recommend looking for the string â€œMobiâ€
              // anywhere in the User Agent to detect a mobile device."
              // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
              get: function () {
                if (!this.windowExists()) {
                  return false;
                }
                return (
                  navigator &&
                  navigator.userAgent &&
                  /Mobi/.test(navigator.userAgent)
                );
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(BrowserUtils, "isChrome", {
              get: function () {
                if (!this.windowExists()) {
                  return false;
                }
                return (
                  navigator &&
                  navigator.userAgent &&
                  /Chrome/.test(navigator.userAgent)
                );
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(BrowserUtils, "isAndroid", {
              get: function () {
                if (!this.windowExists()) {
                  return false;
                }
                return (
                  navigator &&
                  navigator.userAgent &&
                  /Android/.test(navigator.userAgent) &&
                  !this.isHisense
                );
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(BrowserUtils, "isIOS", {
              get: function () {
                if (!this.windowExists()) {
                  return false;
                }
                return (
                  navigator &&
                  navigator.userAgent &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent)
                );
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(BrowserUtils, "isMacIntel", {
              get: function () {
                if (!this.windowExists()) {
                  return false;
                }
                return (
                  navigator &&
                  navigator.userAgent &&
                  navigator.platform === "MacIntel"
                );
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(BrowserUtils, "isHisense", {
              get: function () {
                if (!this.windowExists()) {
                  return false;
                }
                return (
                  navigator &&
                  navigator.userAgent &&
                  /Hisense/.test(navigator.userAgent)
                );
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(BrowserUtils, "isPlayStation", {
              get: function () {
                if (!this.windowExists()) {
                  return false;
                }
                return (
                  navigator &&
                  navigator.userAgent &&
                  /PlayStation/i.test(navigator.userAgent)
                );
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(BrowserUtils, "isWebOs", {
              get: function () {
                if (!this.windowExists()) {
                  return false;
                }
                return (
                  navigator &&
                  navigator.userAgent &&
                  (navigator.userAgent.includes("Web0S") ||
                    navigator.userAgent.includes("NetCast"))
                );
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(BrowserUtils, "isTizen", {
              get: function () {
                if (!this.windowExists()) {
                  return false;
                }
                return (
                  navigator &&
                  navigator.userAgent &&
                  /Tizen/.test(navigator.userAgent)
                );
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(BrowserUtils, "isTouchSupported", {
              // https://hacks.mozilla.org/2013/04/detecting-touch-its-the-why-not-the-how/
              get: function () {
                if (!this.windowExists()) {
                  return false;
                }
                return (
                  "ontouchstart" in window ||
                  (navigator &&
                    navigator.userAgent &&
                    (navigator.maxTouchPoints > 0 ||
                      navigator.msMaxTouchPoints > 0))
                );
              },
              enumerable: false,
              configurable: true,
            });
            BrowserUtils.windowExists = function () {
              return typeof window !== "undefined";
            };
            return BrowserUtils;
          })();
          exports.BrowserUtils = BrowserUtils;
        },
        {},
      ],
      4: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.AdClickOverlay = void 0;
          var clickoverlay_1 = require("./clickoverlay");
          /**
           * A simple click capture overlay for clickThroughUrls of ads.
           */
          var AdClickOverlay = /** @class */ (function (_super) {
            __extends(AdClickOverlay, _super);
            function AdClickOverlay() {
              return (_super !== null && _super.apply(this, arguments)) || this;
            }
            AdClickOverlay.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var clickThroughCallback = null;
              player.on(player.exports.PlayerEvent.AdStarted, function (event) {
                var ad = event.ad;
                _this.setUrl(ad.clickThroughUrl);
                clickThroughCallback = ad.clickThroughUrlOpened;
              });
              // Clear click-through URL when ad has finished
              var adFinishedHandler = function () {
                _this.setUrl(null);
              };
              player.on(
                player.exports.PlayerEvent.AdFinished,
                adFinishedHandler
              );
              player.on(
                player.exports.PlayerEvent.AdSkipped,
                adFinishedHandler
              );
              player.on(player.exports.PlayerEvent.AdError, adFinishedHandler);
              this.onClick.subscribe(function () {
                // Pause the ad when overlay is clicked
                player.pause("ui-ad-click-overlay");
                if (clickThroughCallback) {
                  clickThroughCallback();
                }
              });
            };
            return AdClickOverlay;
          })(clickoverlay_1.ClickOverlay);
          exports.AdClickOverlay = AdClickOverlay;
        },
        { "./clickoverlay": 16 },
      ],
      5: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.AdMessageLabel = void 0;
          var label_1 = require("./label");
          var stringutils_1 = require("../stringutils");
          var i18n_1 = require("../localization/i18n");
          /**
           * A label that displays a message about a running ad, optionally with a countdown.
           */
          var AdMessageLabel = /** @class */ (function (_super) {
            __extends(AdMessageLabel, _super);
            function AdMessageLabel(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-label-ad-message",
                  text: i18n_1.i18n.getLocalizer("ads.remainingTime"),
                },
                _this.config
              );
              return _this;
            }
            AdMessageLabel.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              var text = config.text;
              var updateMessageHandler = function () {
                _this.setText(
                  stringutils_1.StringUtils.replaceAdMessagePlaceholders(
                    i18n_1.i18n.performLocalization(text),
                    null,
                    player
                  )
                );
              };
              var adStartHandler = function (event) {
                var uiConfig = event.ad.uiConfig;
                text = (uiConfig && uiConfig.message) || config.text;
                updateMessageHandler();
                player.on(
                  player.exports.PlayerEvent.TimeChanged,
                  updateMessageHandler
                );
              };
              var adEndHandler = function () {
                player.off(
                  player.exports.PlayerEvent.TimeChanged,
                  updateMessageHandler
                );
              };
              player.on(player.exports.PlayerEvent.AdStarted, adStartHandler);
              player.on(player.exports.PlayerEvent.AdSkipped, adEndHandler);
              player.on(player.exports.PlayerEvent.AdError, adEndHandler);
              player.on(player.exports.PlayerEvent.AdFinished, adEndHandler);
            };
            return AdMessageLabel;
          })(label_1.Label);
          exports.AdMessageLabel = AdMessageLabel;
        },
        { "../localization/i18n": 93, "../stringutils": 112, "./label": 33 },
      ],
      6: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.AdSkipButton = void 0;
          var button_1 = require("./button");
          var stringutils_1 = require("../stringutils");
          /**
           * A button that is displayed during ads and can be used to skip the ad.
           */
          var AdSkipButton = /** @class */ (function (_super) {
            __extends(AdSkipButton, _super);
            function AdSkipButton(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-button-ad-skip",
                  untilSkippableMessage: "Skip ad in {remainingTime}",
                  skippableMessage: "Skip ad",
                },
                _this.config
              );
              return _this;
            }
            AdSkipButton.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              var untilSkippableMessage = config.untilSkippableMessage;
              var skippableMessage = config.skippableMessage;
              var skipOffset = -1;
              var updateSkipMessageHandler = function () {
                _this.show();
                // Update the skip message on the button
                if (player.getCurrentTime() < skipOffset) {
                  _this.setText(
                    stringutils_1.StringUtils.replaceAdMessagePlaceholders(
                      untilSkippableMessage,
                      skipOffset,
                      player
                    )
                  );
                  _this.disable();
                } else {
                  _this.setText(skippableMessage);
                  _this.enable();
                }
              };
              var adStartHandler = function (event) {
                var ad = event.ad;
                skipOffset = ad.skippableAfter;
                untilSkippableMessage =
                  (ad.uiConfig && ad.uiConfig.untilSkippableMessage) ||
                  config.untilSkippableMessage;
                skippableMessage =
                  (ad.uiConfig && ad.uiConfig.skippableMessage) ||
                  config.skippableMessage;
                // Display this button only if ad is skippable.
                // Non-skippable ads will return -1 for skippableAfter for player version < v8.3.0.
                if (typeof skipOffset === "number" && skipOffset >= 0) {
                  updateSkipMessageHandler();
                  player.on(
                    player.exports.PlayerEvent.TimeChanged,
                    updateSkipMessageHandler
                  );
                } else {
                  _this.hide();
                }
              };
              var adEndHandler = function () {
                player.off(
                  player.exports.PlayerEvent.TimeChanged,
                  updateSkipMessageHandler
                );
              };
              player.on(player.exports.PlayerEvent.AdStarted, adStartHandler);
              player.on(player.exports.PlayerEvent.AdSkipped, adEndHandler);
              player.on(player.exports.PlayerEvent.AdError, adEndHandler);
              player.on(player.exports.PlayerEvent.AdFinished, adEndHandler);
              this.onClick.subscribe(function () {
                // Try to skip the ad (this only works if it is skippable so we don't need to take extra care of that here)
                player.ads.skip();
              });
            };
            return AdSkipButton;
          })(button_1.Button);
          exports.AdSkipButton = AdSkipButton;
        },
        { "../stringutils": 112, "./button": 12 },
      ],
      7: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.AirPlayToggleButton = void 0;
          var togglebutton_1 = require("./togglebutton");
          var i18n_1 = require("../localization/i18n");
          /**
           * A button that toggles Apple AirPlay.
           */
          var AirPlayToggleButton = /** @class */ (function (_super) {
            __extends(AirPlayToggleButton, _super);
            function AirPlayToggleButton(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-airplaytogglebutton",
                  text: i18n_1.i18n.getLocalizer("appleAirplay"),
                },
                _this.config
              );
              return _this;
            }
            AirPlayToggleButton.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              if (!player.isAirplayAvailable) {
                // If the player does not support Airplay (player 7.0), we just hide this component and skip configuration
                this.hide();
                return;
              }
              this.onClick.subscribe(function () {
                if (player.isAirplayAvailable()) {
                  player.showAirplayTargetPicker();
                } else {
                  if (console) {
                    console.log("AirPlay unavailable");
                  }
                }
              });
              var airPlayAvailableHandler = function () {
                if (player.isAirplayAvailable()) {
                  _this.show();
                } else {
                  _this.hide();
                }
              };
              var airPlayChangedHandler = function () {
                if (player.isAirplayActive()) {
                  _this.on();
                } else {
                  _this.off();
                }
              };
              player.on(
                player.exports.PlayerEvent.AirplayAvailable,
                airPlayAvailableHandler
              );
              player.on(
                player.exports.PlayerEvent.AirplayChanged,
                airPlayChangedHandler
              );
              // Startup init
              airPlayAvailableHandler(); // Hide button if AirPlay is not available
              airPlayChangedHandler();
            };
            return AirPlayToggleButton;
          })(togglebutton_1.ToggleButton);
          exports.AirPlayToggleButton = AirPlayToggleButton;
        },
        { "../localization/i18n": 93, "./togglebutton": 76 },
      ],
      8: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.AudioQualitySelectBox = void 0;
          var selectbox_1 = require("./selectbox");
          var i18n_1 = require("../localization/i18n");
          /**
           * A select box providing a selection between 'auto' and the available audio qualities.
           */
          var AudioQualitySelectBox = /** @class */ (function (_super) {
            __extends(AudioQualitySelectBox, _super);
            function AudioQualitySelectBox(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-audioqualityselectbox"],
                },
                _this.config
              );
              return _this;
            }
            AudioQualitySelectBox.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var selectCurrentAudioQuality = function () {
                _this.selectItem(player.getAudioQuality().id);
              };
              var updateAudioQualities = function () {
                var audioQualities = player.getAvailableAudioQualities();
                _this.clearItems();
                // Add entry for automatic quality switching (default setting)
                _this.addItem("auto", i18n_1.i18n.getLocalizer("auto"));
                // Add audio qualities
                for (
                  var _i = 0, audioQualities_1 = audioQualities;
                  _i < audioQualities_1.length;
                  _i++
                ) {
                  var audioQuality = audioQualities_1[_i];
                  _this.addItem(audioQuality.id, audioQuality.label);
                }
                // Select initial quality
                selectCurrentAudioQuality();
              };
              this.onItemSelected.subscribe(function (sender, value) {
                player.setAudioQuality(value);
              });
              // Update qualities when audio track has changed
              player.on(
                player.exports.PlayerEvent.AudioChanged,
                updateAudioQualities
              );
              // Update qualities when source goes away
              player.on(
                player.exports.PlayerEvent.SourceUnloaded,
                updateAudioQualities
              );
              // Update qualities when the period within a source changes
              player.on(
                player.exports.PlayerEvent.PeriodSwitched,
                updateAudioQualities
              );
              // Update quality selection when quality is changed (from outside)
              player.on(
                player.exports.PlayerEvent.AudioQualityChanged,
                selectCurrentAudioQuality
              );
              if (player.exports.PlayerEvent.AudioQualityAdded) {
                // Update qualities when their availability changed
                // TODO: remove any cast after next player release
                player.on(
                  player.exports.PlayerEvent.AudioQualityAdded,
                  updateAudioQualities
                );
                player.on(
                  player.exports.PlayerEvent.AudioQualityRemoved,
                  updateAudioQualities
                );
              }
              uimanager
                .getConfig()
                .events.onUpdated.subscribe(updateAudioQualities);
            };
            return AudioQualitySelectBox;
          })(selectbox_1.SelectBox);
          exports.AudioQualitySelectBox = AudioQualitySelectBox;
        },
        { "../localization/i18n": 93, "./selectbox": 48 },
      ],
      9: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.AudioTrackListBox = void 0;
          var listbox_1 = require("./listbox");
          var audiotrackutils_1 = require("../audiotrackutils");
          /**
           * A element that is similar to a select box where the user can select a subtitle
           */
          var AudioTrackListBox = /** @class */ (function (_super) {
            __extends(AudioTrackListBox, _super);
            function AudioTrackListBox() {
              return (_super !== null && _super.apply(this, arguments)) || this;
            }
            AudioTrackListBox.prototype.configure = function (
              player,
              uimanager
            ) {
              _super.prototype.configure.call(this, player, uimanager);
              new audiotrackutils_1.AudioTrackSwitchHandler(
                player,
                this,
                uimanager
              );
            };
            return AudioTrackListBox;
          })(listbox_1.ListBox);
          exports.AudioTrackListBox = AudioTrackListBox;
        },
        { "../audiotrackutils": 2, "./listbox": 34 },
      ],
      10: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.AudioTrackSelectBox = void 0;
          var selectbox_1 = require("./selectbox");
          var audiotrackutils_1 = require("../audiotrackutils");
          /**
           * A select box providing a selection between available audio tracks (e.g. different languages).
           */
          var AudioTrackSelectBox = /** @class */ (function (_super) {
            __extends(AudioTrackSelectBox, _super);
            function AudioTrackSelectBox(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-audiotrackselectbox"],
                },
                _this.config
              );
              return _this;
            }
            AudioTrackSelectBox.prototype.configure = function (
              player,
              uimanager
            ) {
              _super.prototype.configure.call(this, player, uimanager);
              new audiotrackutils_1.AudioTrackSwitchHandler(
                player,
                this,
                uimanager
              );
            };
            return AudioTrackSelectBox;
          })(selectbox_1.SelectBox);
          exports.AudioTrackSelectBox = AudioTrackSelectBox;
        },
        { "../audiotrackutils": 2, "./selectbox": 48 },
      ],
      11: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.BufferingOverlay = void 0;
          var container_1 = require("./container");
          var component_1 = require("./component");
          var timeout_1 = require("../timeout");
          /**
           * Overlays the player and displays a buffering indicator.
           */
          var BufferingOverlay = /** @class */ (function (_super) {
            __extends(BufferingOverlay, _super);
            function BufferingOverlay(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.indicators = [
                new component_1.Component({
                  tag: "div",
                  cssClass: "ui-buffering-overlay-indicator",
                  role: "img",
                }),
                new component_1.Component({
                  tag: "div",
                  cssClass: "ui-buffering-overlay-indicator",
                  role: "img",
                }),
                new component_1.Component({
                  tag: "div",
                  cssClass: "ui-buffering-overlay-indicator",
                  role: "img",
                }),
              ];
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-buffering-overlay",
                  hidden: true,
                  components: _this.indicators,
                  showDelayMs: 1000,
                },
                _this.config
              );
              return _this;
            }
            BufferingOverlay.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              var overlayShowTimeout = new timeout_1.Timeout(
                config.showDelayMs,
                function () {
                  _this.show();
                }
              );
              var showOverlay = function () {
                overlayShowTimeout.start();
              };
              var hideOverlay = function () {
                overlayShowTimeout.clear();
                _this.hide();
              };
              player.on(player.exports.PlayerEvent.StallStarted, showOverlay);
              player.on(player.exports.PlayerEvent.StallEnded, hideOverlay);
              player.on(player.exports.PlayerEvent.Play, showOverlay);
              player.on(player.exports.PlayerEvent.Playing, hideOverlay);
              player.on(player.exports.PlayerEvent.Paused, hideOverlay);
              player.on(player.exports.PlayerEvent.Seek, showOverlay);
              player.on(player.exports.PlayerEvent.Seeked, hideOverlay);
              player.on(player.exports.PlayerEvent.TimeShift, showOverlay);
              player.on(player.exports.PlayerEvent.TimeShifted, hideOverlay);
              player.on(player.exports.PlayerEvent.SourceUnloaded, hideOverlay);
              // Show overlay if player is already stalled at init
              if (player.isStalled()) {
                this.show();
              }
            };
            return BufferingOverlay;
          })(container_1.Container);
          exports.BufferingOverlay = BufferingOverlay;
        },
        { "../timeout": 114, "./component": 18, "./container": 19 },
      ],
      12: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.Button = void 0;
          var component_1 = require("./component");
          var dom_1 = require("../dom");
          var eventdispatcher_1 = require("../eventdispatcher");
          var i18n_1 = require("../localization/i18n");
          /**
           * A simple clickable button.
           */
          var Button = /** @class */ (function (_super) {
            __extends(Button, _super);
            function Button(config) {
              var _this = _super.call(this, config) || this;
              _this.buttonEvents = {
                onClick: new eventdispatcher_1.EventDispatcher(),
              };
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-button",
                  role: "button",
                  tabIndex: 0,
                },
                _this.config
              );
              return _this;
            }
            Button.prototype.toDomElement = function () {
              var _this = this;
              var buttonElementAttributes = {
                id: this.config.id,
                "aria-label": i18n_1.i18n.performLocalization(
                  this.config.ariaLabel || this.config.text
                ),
                class: this.getCssClasses(),
                type: "button",
                /**
                 * WCAG20 standard to display if a button is pressed or not
                 */
                "aria-pressed": "false",
                tabindex: this.config.tabIndex.toString(),
              };
              if (this.config.role != null) {
                buttonElementAttributes["role"] = this.config.role;
              }
              // Create the button element with the text label
              var buttonElement = new dom_1.DOM(
                "button",
                buttonElementAttributes
              ).append(
                new dom_1.DOM("span", {
                  class: this.prefixCss("label"),
                }).html(i18n_1.i18n.performLocalization(this.config.text))
              );
              // Listen for the click event on the button element and trigger the corresponding event on the button component
              buttonElement.on("click", function () {
                _this.onClickEvent();
              });
              return buttonElement;
            };
            /**
             * Sets text on the label of the button.
             * @param text the text to put into the label of the button
             */
            Button.prototype.setText = function (text) {
              this.getDomElement()
                .find("." + this.prefixCss("label"))
                .html(i18n_1.i18n.performLocalization(text));
            };
            Button.prototype.onClickEvent = function () {
              this.buttonEvents.onClick.dispatch(this);
            };
            Object.defineProperty(Button.prototype, "onClick", {
              /**
               * Gets the event that is fired when the button is clicked.
               * @returns {Event<Button<Config>, NoArgs>}
               */
              get: function () {
                return this.buttonEvents.onClick.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            return Button;
          })(component_1.Component);
          exports.Button = Button;
        },
        {
          "../dom": 86,
          "../eventdispatcher": 88,
          "../localization/i18n": 93,
          "./component": 18,
        },
      ],
      13: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.CastStatusOverlay = void 0;
          var container_1 = require("./container");
          var label_1 = require("./label");
          var i18n_1 = require("../localization/i18n");
          /**
           * Overlays the player and displays the status of a Cast session.
           */
          var CastStatusOverlay = /** @class */ (function (_super) {
            __extends(CastStatusOverlay, _super);
            function CastStatusOverlay(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.statusLabel = new label_1.Label({
                cssClass: "ui-cast-status-label",
              });
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-cast-status-overlay",
                  components: [_this.statusLabel],
                  hidden: true,
                },
                _this.config
              );
              return _this;
            }
            CastStatusOverlay.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              player.on(
                player.exports.PlayerEvent.CastWaitingForDevice,
                function (event) {
                  _this.show();
                  // Get device name and update status text while connecting
                  var castDeviceName = event.castPayload.deviceName;
                  _this.statusLabel.setText(
                    i18n_1.i18n.getLocalizer("connectingTo", {
                      castDeviceName: castDeviceName,
                    })
                  );
                }
              );
              player.on(
                player.exports.PlayerEvent.CastStarted,
                function (event) {
                  // Session is started or resumed
                  // For cases when a session is resumed, we do not receive the previous events and therefore show the status panel
                  // here too
                  _this.show();
                  var castDeviceName = event.deviceName;
                  _this.statusLabel.setText(
                    i18n_1.i18n.getLocalizer("playingOn", {
                      castDeviceName: castDeviceName,
                    })
                  );
                }
              );
              player.on(
                player.exports.PlayerEvent.CastStopped,
                function (event) {
                  // Cast session gone, hide the status panel
                  _this.hide();
                }
              );
            };
            return CastStatusOverlay;
          })(container_1.Container);
          exports.CastStatusOverlay = CastStatusOverlay;
        },
        { "../localization/i18n": 93, "./container": 19, "./label": 33 },
      ],
      14: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.CastToggleButton = void 0;
          var togglebutton_1 = require("./togglebutton");
          var i18n_1 = require("../localization/i18n");
          /**
           * A button that toggles casting to a Cast receiver.
           */
          var CastToggleButton = /** @class */ (function (_super) {
            __extends(CastToggleButton, _super);
            function CastToggleButton(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-casttogglebutton",
                  text: i18n_1.i18n.getLocalizer("googleCast"),
                },
                _this.config
              );
              return _this;
            }
            CastToggleButton.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.onClick.subscribe(function () {
                if (player.isCastAvailable()) {
                  if (player.isCasting()) {
                    player.castStop();
                  } else {
                    player.castVideo();
                  }
                } else {
                  if (console) {
                    console.log("Cast unavailable");
                  }
                }
              });
              var castAvailableHander = function () {
                if (player.isCastAvailable()) {
                  _this.show();
                } else {
                  _this.hide();
                }
              };
              player.on(
                player.exports.PlayerEvent.CastAvailable,
                castAvailableHander
              );
              // Toggle button 'on' state
              player.on(
                player.exports.PlayerEvent.CastWaitingForDevice,
                function () {
                  _this.on();
                }
              );
              player.on(player.exports.PlayerEvent.CastStarted, function () {
                // When a session is resumed, there is no CastStart event, so we also need to toggle here for such cases
                _this.on();
              });
              player.on(player.exports.PlayerEvent.CastStopped, function () {
                _this.off();
              });
              // Startup init
              castAvailableHander(); // Hide button if Cast not available
              if (player.isCasting()) {
                this.on();
              }
            };
            return CastToggleButton;
          })(togglebutton_1.ToggleButton);
          exports.CastToggleButton = CastToggleButton;
        },
        { "../localization/i18n": 93, "./togglebutton": 76 },
      ],
      15: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.CastUIContainer = void 0;
          var uicontainer_1 = require("./uicontainer");
          var timeout_1 = require("../timeout");
          /**
           * The base container for Cast receivers that contains all of the UI and takes care that the UI is shown on
           * certain playback events.
           */
          var CastUIContainer = /** @class */ (function (_super) {
            __extends(CastUIContainer, _super);
            function CastUIContainer(config) {
              return _super.call(this, config) || this;
            }
            CastUIContainer.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              /*
               * Show UI on Cast devices at certain playback events
               *
               * Since a Cast receiver does not have a direct HCI, we show the UI on certain playback events to give the user
               * a chance to see on the screen what's going on, e.g. on play/pause or a seek the UI is shown and the user can
               * see the current time and position on the seek bar.
               * The UI is shown permanently while playback is paused, otherwise hides automatically after the configured
               * hide delay time.
               */
              var isUiShown = false;
              var hideUi = function () {
                uimanager.onControlsHide.dispatch(_this);
                isUiShown = false;
              };
              this.castUiHideTimeout = new timeout_1.Timeout(
                config.hideDelay,
                hideUi
              );
              var showUi = function () {
                if (!isUiShown) {
                  uimanager.onControlsShow.dispatch(_this);
                  isUiShown = true;
                }
              };
              var showUiPermanently = function () {
                showUi();
                _this.castUiHideTimeout.clear();
              };
              var showUiWithTimeout = function () {
                showUi();
                _this.castUiHideTimeout.start();
              };
              var showUiAfterSeek = function () {
                if (player.isPlaying()) {
                  showUiWithTimeout();
                } else {
                  showUiPermanently();
                }
              };
              player.on(player.exports.PlayerEvent.Play, showUiWithTimeout);
              player.on(player.exports.PlayerEvent.Paused, showUiPermanently);
              player.on(player.exports.PlayerEvent.Seek, showUiPermanently);
              player.on(player.exports.PlayerEvent.Seeked, showUiAfterSeek);
              uimanager
                .getConfig()
                .events.onUpdated.subscribe(showUiWithTimeout);
            };
            CastUIContainer.prototype.release = function () {
              _super.prototype.release.call(this);
              this.castUiHideTimeout.clear();
            };
            return CastUIContainer;
          })(uicontainer_1.UIContainer);
          exports.CastUIContainer = CastUIContainer;
        },
        { "../timeout": 114, "./uicontainer": 78 },
      ],
      16: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.ClickOverlay = void 0;
          var button_1 = require("./button");
          /**
           * A click overlay that opens an url in a new tab if clicked.
           */
          var ClickOverlay = /** @class */ (function (_super) {
            __extends(ClickOverlay, _super);
            function ClickOverlay(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-clickoverlay",
                  role: _this.config.role,
                },
                _this.config
              );
              return _this;
            }
            ClickOverlay.prototype.initialize = function () {
              _super.prototype.initialize.call(this);
              this.setUrl(this.config.url);
              var element = this.getDomElement();
              element.on("click", function () {
                if (element.data("url")) {
                  window.open(element.data("url"), "_blank");
                }
              });
            };
            /**
             * Gets the URL that should be followed when the watermark is clicked.
             * @returns {string} the watermark URL
             */
            ClickOverlay.prototype.getUrl = function () {
              return this.getDomElement().data("url");
            };
            ClickOverlay.prototype.setUrl = function (url) {
              if (url === undefined || url == null) {
                url = "";
              }
              this.getDomElement().data("url", url);
            };
            return ClickOverlay;
          })(button_1.Button);
          exports.ClickOverlay = ClickOverlay;
        },
        { "./button": 12 },
      ],
      17: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.CloseButton = void 0;
          var button_1 = require("./button");
          var i18n_1 = require("../localization/i18n");
          /**
           * A button that closes (hides) a configured component.
           */
          var CloseButton = /** @class */ (function (_super) {
            __extends(CloseButton, _super);
            function CloseButton(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-closebutton",
                  text: i18n_1.i18n.getLocalizer("close"),
                },
                _this.config
              );
              return _this;
            }
            CloseButton.prototype.configure = function (player, uimanager) {
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              this.onClick.subscribe(function () {
                config.target.hide();
              });
            };
            return CloseButton;
          })(button_1.Button);
          exports.CloseButton = CloseButton;
        },
        { "../localization/i18n": 93, "./button": 12 },
      ],
      18: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.Component = void 0;
          var guid_1 = require("../guid");
          var dom_1 = require("../dom");
          var eventdispatcher_1 = require("../eventdispatcher");
          var i18n_1 = require("../localization/i18n");
          /**
           * The base class of the UI framework.
           * Each component must extend this class and optionally the config interface.
           */
          var Component = (exports.Component = /** @class */ (function () {
            /**
             * Constructs a component with an optionally supplied config. All subclasses must call the constructor of their
             * superclass and then merge their configuration into the component's configuration.
             * @param config the configuration for the component
             */
            function Component(config) {
              if (config === void 0) {
                config = {};
              }
              /**
               * The list of events that this component offers. These events should always be private and only directly
               * accessed from within the implementing component.
               *
               * Because TypeScript does not support private properties with the same name on different class hierarchy levels
               * (i.e. superclass and subclass cannot contain a private property with the same name), the default naming
               * convention for the event list of a component that should be followed by subclasses is the concatenation of the
               * camel-cased class name + 'Events' (e.g. SubClass extends Component => subClassEvents).
               * See {@link #componentEvents} for an example.
               *
               * Event properties should be named in camel case with an 'on' prefix and in the present tense. Async events may
               * have a start event (when the operation starts) in the present tense, and must have an end event (when the
               * operation ends) in the past tense (or present tense in special cases (e.g. onStart/onStarted or onPlay/onPlaying).
               * See {@link #componentEvents#onShow} for an example.
               *
               * Each event should be accompanied with a protected method named by the convention eventName + 'Event'
               * (e.g. onStartEvent), that actually triggers the event by calling {@link EventDispatcher#dispatch dispatch} and
               * passing a reference to the component as first parameter. Components should always trigger their events with these
               * methods. Implementing this pattern gives subclasses means to directly listen to the events by overriding the
               * method (and saving the overhead of passing a handler to the event dispatcher) and more importantly to trigger
               * these events without having access to the private event list.
               * See {@link #onShow} for an example.
               *
               * To provide external code the possibility to listen to this component's events (subscribe, unsubscribe, etc.),
               * each event should also be accompanied by a public getter function with the same name as the event's property,
               * that returns the {@link Event} obtained from the event dispatcher by calling {@link EventDispatcher#getEvent}.
               * See {@link #onShow} for an example.
               *
               * Full example for an event representing an example action in a example component:
               *
               * <code>
               * // Define an example component class with an example event
               * class ExampleComponent extends Component<ComponentConfig> {
               *
               *     private exampleComponentEvents = {
               *         onExampleAction: new EventDispatcher<ExampleComponent, NoArgs>()
               *     }
               *
               *     // constructor and other stuff...
               *
               *     protected onExampleActionEvent() {
               *        this.exampleComponentEvents.onExampleAction.dispatch(this);
               *    }
               *
               *    get onExampleAction(): Event<ExampleComponent, NoArgs> {
               *        return this.exampleComponentEvents.onExampleAction.getEvent();
               *    }
               * }
               *
               * // Create an instance of the component somewhere
               * var exampleComponentInstance = new ExampleComponent();
               *
               * // Subscribe to the example event on the component
               * exampleComponentInstance.onExampleAction.subscribe(function (sender: ExampleComponent) {
               *     console.log('onExampleAction of ' + sender + ' has fired!');
               * });
               * </code>
               */
              this.componentEvents = {
                onShow: new eventdispatcher_1.EventDispatcher(),
                onHide: new eventdispatcher_1.EventDispatcher(),
                onHoverChanged: new eventdispatcher_1.EventDispatcher(),
                onEnabled: new eventdispatcher_1.EventDispatcher(),
                onDisabled: new eventdispatcher_1.EventDispatcher(),
              };
              // Create the configuration for this component
              this.config = this.mergeConfig(
                config,
                {
                  tag: "div",
                  id: "bmpui-id-" + guid_1.Guid.next(),
                  cssPrefix: "bmpui",
                  cssClass: "ui-component",
                  cssClasses: [],
                  hidden: false,
                  disabled: false,
                },
                {}
              );
            }
            /**
             * Initializes the component, e.g. by applying config settings.
             * This method must not be called from outside the UI framework.
             *
             * This method is automatically called by the {@link UIInstanceManager}. If the component is an inner component of
             * some component, and thus encapsulated abd managed internally and never directly exposed to the UIManager,
             * this method must be called from the managing component's {@link #initialize} method.
             */
            Component.prototype.initialize = function () {
              this.hidden = this.config.hidden;
              this.disabled = this.config.disabled;
              // Hide the component at initialization if it is configured to be hidden
              if (this.isHidden()) {
                this.hidden = false; // Set flag to false for the following hide() call to work (hide() checks the flag)
                this.hide();
              }
              // Disable the component at initialization if it is configured to be disabled
              if (this.isDisabled()) {
                this.disabled = false; // Set flag to false for the following disable() call to work (disable() checks the flag)
                this.disable();
              }
            };
            /**
             * Configures the component for the supplied Player and UIInstanceManager. This is the place where all the magic
             * happens, where components typically subscribe and react to events (on their DOM element, the Player, or the
             * UIInstanceManager), and basically everything that makes them interactive.
             * This method is called only once, when the UIManager initializes the UI.
             *
             * Subclasses usually overwrite this method to add their own functionality.
             *
             * @param player the player which this component controls
             * @param uimanager the UIInstanceManager that manages this component
             */
            Component.prototype.configure = function (player, uimanager) {
              var _this = this;
              this.onShow.subscribe(function () {
                uimanager.onComponentShow.dispatch(_this);
              });
              this.onHide.subscribe(function () {
                uimanager.onComponentHide.dispatch(_this);
              });
              // Track the hovered state of the element
              this.getDomElement().on("mouseenter", function () {
                _this.onHoverChangedEvent(true);
              });
              this.getDomElement().on("mouseleave", function () {
                _this.onHoverChangedEvent(false);
              });
            };
            /**
             * Releases all resources and dependencies that the component holds. Player, DOM, and UIManager events are
             * automatically removed during release and do not explicitly need to be removed here.
             * This method is called by the UIManager when it releases the UI.
             *
             * Subclasses that need to release resources should override this method and call super.release().
             */
            Component.prototype.release = function () {
              // Nothing to do here, override where necessary
            };
            /**
             * Generate the DOM element for this component.
             *
             * Subclasses usually overwrite this method to extend or replace the DOM element with their own design.
             */
            Component.prototype.toDomElement = function () {
              var element = new dom_1.DOM(this.config.tag, {
                id: this.config.id,
                class: this.getCssClasses(),
                role: this.config.role,
              });
              return element;
            };
            /**
             * Returns the DOM element of this component. Creates the DOM element if it does not yet exist.
             *
             * Should not be overwritten by subclasses.
             *
             * @returns {DOM}
             */
            Component.prototype.getDomElement = function () {
              if (!this.element) {
                this.element = this.toDomElement();
              }
              return this.element;
            };
            /**
             * Checks if this component has a DOM element.
             */
            Component.prototype.hasDomElement = function () {
              return Boolean(this.element);
            };
            Component.prototype.setAriaLabel = function (label) {
              this.setAriaAttr("label", i18n_1.i18n.performLocalization(label));
            };
            Component.prototype.setAriaAttr = function (name, value) {
              this.getDomElement().attr("aria-".concat(name), value);
            };
            /**
             * Merges a configuration with a default configuration and a base configuration from the superclass.
             *
             * @param config the configuration settings for the components, as usually passed to the constructor
             * @param defaults a default configuration for settings that are not passed with the configuration
             * @param base configuration inherited from a superclass
             * @returns {Config}
             */
            Component.prototype.mergeConfig = function (
              config,
              defaults,
              base
            ) {
              // Extend default config with supplied config
              var merged = Object.assign({}, base, defaults, config);
              // Return the extended config
              return merged;
            };
            /**
             * Helper method that returns a string of all CSS classes of the component.
             *
             * @returns {string}
             */
            Component.prototype.getCssClasses = function () {
              var _this = this;
              // Merge all CSS classes into single array
              var flattenedArray = [this.config.cssClass].concat(
                this.config.cssClasses
              );
              // Prefix classes
              flattenedArray = flattenedArray.map(function (css) {
                return _this.prefixCss(css);
              });
              // Join array values into a string
              var flattenedString = flattenedArray.join(" ");
              // Return trimmed string to prevent whitespace at the end from the join operation
              return flattenedString.trim();
            };
            Component.prototype.prefixCss = function (cssClassOrId) {
              return this.config.cssPrefix + "-" + cssClassOrId;
            };
            /**
             * Returns the configuration object of the component.
             * @returns {Config}
             */
            Component.prototype.getConfig = function () {
              return this.config;
            };
            /**
             * Hides the component if shown.
             * This method basically transfers the component into the hidden state. Actual hiding is done via CSS.
             */
            Component.prototype.hide = function () {
              if (!this.hidden) {
                this.hidden = true;
                this.getDomElement().addClass(
                  this.prefixCss(Component.CLASS_HIDDEN)
                );
                this.onHideEvent();
              }
            };
            /**
             * Shows the component if hidden.
             */
            Component.prototype.show = function () {
              if (this.hidden) {
                this.getDomElement().removeClass(
                  this.prefixCss(Component.CLASS_HIDDEN)
                );
                this.hidden = false;
                this.onShowEvent();
              }
            };
            /**
             * Determines if the component is hidden.
             * @returns {boolean} true if the component is hidden, else false
             */
            Component.prototype.isHidden = function () {
              return this.hidden;
            };
            /**
             * Determines if the component is shown.
             * @returns {boolean} true if the component is visible, else false
             */
            Component.prototype.isShown = function () {
              return !this.isHidden();
            };
            /**
             * Toggles the hidden state by hiding the component if it is shown, or showing it if hidden.
             */
            Component.prototype.toggleHidden = function () {
              if (this.isHidden()) {
                this.show();
              } else {
                this.hide();
              }
            };
            /**
             * Disables the component.
             * This method basically transfers the component into the disabled state. Actual disabling is done via CSS or child
             * components. (e.g. Button needs to unsubscribe click listeners)
             */
            Component.prototype.disable = function () {
              if (!this.disabled) {
                this.disabled = true;
                this.getDomElement().addClass(
                  this.prefixCss(Component.CLASS_DISABLED)
                );
                this.onDisabledEvent();
              }
            };
            /**
             * Enables the component.
             * This method basically transfers the component into the enabled state. Actual enabling is done via CSS or child
             * components. (e.g. Button needs to subscribe click listeners)
             */
            Component.prototype.enable = function () {
              if (this.disabled) {
                this.getDomElement().removeClass(
                  this.prefixCss(Component.CLASS_DISABLED)
                );
                this.disabled = false;
                this.onEnabledEvent();
              }
            };
            /**
             * Determines if the component is disabled.
             * @returns {boolean} true if the component is disabled, else false
             */
            Component.prototype.isDisabled = function () {
              return this.disabled;
            };
            /**
             * Determines if the component is enabled.
             * @returns {boolean} true if the component is enabled, else false
             */
            Component.prototype.isEnabled = function () {
              return !this.isDisabled();
            };
            /**
             * Determines if the component is currently hovered.
             * @returns {boolean} true if the component is hovered, else false
             */
            Component.prototype.isHovered = function () {
              return this.hovered;
            };
            /**
             * Fires the onShow event.
             * See the detailed explanation on event architecture on the {@link #componentEvents events list}.
             */
            Component.prototype.onShowEvent = function () {
              this.componentEvents.onShow.dispatch(this);
            };
            /**
             * Fires the onHide event.
             * See the detailed explanation on event architecture on the {@link #componentEvents events list}.
             */
            Component.prototype.onHideEvent = function () {
              this.componentEvents.onHide.dispatch(this);
            };
            /**
             * Fires the onEnabled event.
             * See the detailed explanation on event architecture on the {@link #componentEvents events list}.
             */
            Component.prototype.onEnabledEvent = function () {
              this.componentEvents.onEnabled.dispatch(this);
            };
            /**
             * Fires the onDisabled event.
             * See the detailed explanation on event architecture on the {@link #componentEvents events list}.
             */
            Component.prototype.onDisabledEvent = function () {
              this.componentEvents.onDisabled.dispatch(this);
            };
            /**
             * Fires the onHoverChanged event.
             * See the detailed explanation on event architecture on the {@link #componentEvents events list}.
             */
            Component.prototype.onHoverChangedEvent = function (hovered) {
              this.hovered = hovered;
              this.componentEvents.onHoverChanged.dispatch(this, {
                hovered: hovered,
              });
            };
            Object.defineProperty(Component.prototype, "onShow", {
              /**
               * Gets the event that is fired when the component is showing.
               * See the detailed explanation on event architecture on the {@link #componentEvents events list}.
               * @returns {Event<Component<Config>, NoArgs>}
               */
              get: function () {
                return this.componentEvents.onShow.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(Component.prototype, "onHide", {
              /**
               * Gets the event that is fired when the component is hiding.
               * See the detailed explanation on event architecture on the {@link #componentEvents events list}.
               * @returns {Event<Component<Config>, NoArgs>}
               */
              get: function () {
                return this.componentEvents.onHide.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(Component.prototype, "onEnabled", {
              /**
               * Gets the event that is fired when the component is enabling.
               * See the detailed explanation on event architecture on the {@link #componentEvents events list}.
               * @returns {Event<Component<Config>, NoArgs>}
               */
              get: function () {
                return this.componentEvents.onEnabled.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(Component.prototype, "onDisabled", {
              /**
               * Gets the event that is fired when the component is disabling.
               * See the detailed explanation on event architecture on the {@link #componentEvents events list}.
               * @returns {Event<Component<Config>, NoArgs>}
               */
              get: function () {
                return this.componentEvents.onDisabled.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(Component.prototype, "onHoverChanged", {
              /**
               * Gets the event that is fired when the component's hover-state is changing.
               * @returns {Event<Component<Config>, ComponentHoverChangedEventArgs>}
               */
              get: function () {
                return this.componentEvents.onHoverChanged.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            /**
             * The classname that is attached to the element when it is in the hidden state.
             * @type {string}
             */
            Component.CLASS_HIDDEN = "hidden";
            /**
             * The classname that is attached to the element when it is in the disabled state.
             * @type {string}
             */
            Component.CLASS_DISABLED = "disabled";
            return Component;
          })());
        },
        {
          "../dom": 86,
          "../eventdispatcher": 88,
          "../guid": 91,
          "../localization/i18n": 93,
        },
      ],
      19: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.Container = void 0;
          var component_1 = require("./component");
          var dom_1 = require("../dom");
          var arrayutils_1 = require("../arrayutils");
          var i18n_1 = require("../localization/i18n");
          /**
           * A container component that can contain a collection of child components.
           * Components can be added at construction time through the {@link ContainerConfig#components} setting, or later
           * through the {@link Container#addComponent} method. The UIManager automatically takes care of all components, i.e. it
           * initializes and configures them automatically.
           *
           * In the DOM, the container consists of an outer <div> (that can be configured by the config) and an inner wrapper
           * <div> that contains the components. This double-<div>-structure is often required to achieve many advanced effects
           * in CSS and/or JS, e.g. animations and certain formatting with absolute positioning.
           *
           * DOM example:
           * <code>
           *     <div class='ui-container'>
           *         <div class='container-wrapper'>
           *             ... child components ...
           *         </div>
           *     </div>
           * </code>
           */
          var Container = /** @class */ (function (_super) {
            __extends(Container, _super);
            function Container(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-container",
                  components: [],
                },
                _this.config
              );
              _this.componentsToAdd = [];
              _this.componentsToRemove = [];
              return _this;
            }
            /**
             * Adds a child component to the container.
             * @param component the component to add
             */
            Container.prototype.addComponent = function (component) {
              this.config.components.push(component);
              this.componentsToAdd.push(component);
            };
            /**
             * Removes a child component from the container.
             * @param component the component to remove
             * @returns {boolean} true if the component has been removed, false if it is not contained in this container
             */
            Container.prototype.removeComponent = function (component) {
              if (
                arrayutils_1.ArrayUtils.remove(
                  this.config.components,
                  component
                ) != null
              ) {
                this.componentsToRemove.push(component);
                return true;
              } else {
                return false;
              }
            };
            /**
             * Gets an array of all child components in this container.
             * @returns {Component<ComponentConfig>[]}
             */
            Container.prototype.getComponents = function () {
              return this.config.components;
            };
            /**
             * Removes all child components from the container.
             */
            Container.prototype.removeComponents = function () {
              for (
                var _i = 0, _a = this.getComponents().slice();
                _i < _a.length;
                _i++
              ) {
                var component = _a[_i];
                this.removeComponent(component);
              }
            };
            /**
             * Updates the DOM of the container with the current components.
             */
            Container.prototype.updateComponents = function () {
              /* We cannot just clear the container to remove all elements and then re-add those that should stay, because
               * IE looses the innerHTML of unattached elements, leading to empty elements within the container (e.g. missing
               * subtitle text in SubtitleLabel).
               * Instead, we keep a list of elements to add and remove, leaving remaining elements alone. By keeping them in
               * the DOM, their content gets preserved in all browsers.
               */
              var component;
              while ((component = this.componentsToRemove.shift())) {
                component.getDomElement().remove();
              }
              while ((component = this.componentsToAdd.shift())) {
                this.innerContainerElement.append(component.getDomElement());
              }
            };
            Container.prototype.toDomElement = function () {
              // Create the container element (the outer <div>)
              var containerElement = new dom_1.DOM(this.config.tag, {
                id: this.config.id,
                class: this.getCssClasses(),
                role: this.config.role,
                "aria-label": i18n_1.i18n.performLocalization(
                  this.config.ariaLabel
                ),
              });
              // Create the inner container element (the inner <div>) that will contain the components
              var innerContainer = new dom_1.DOM(this.config.tag, {
                class: this.prefixCss("container-wrapper"),
              });
              this.innerContainerElement = innerContainer;
              for (
                var _i = 0, _a = this.config.components;
                _i < _a.length;
                _i++
              ) {
                var initialComponent = _a[_i];
                this.componentsToAdd.push(initialComponent);
              }
              this.updateComponents();
              containerElement.append(innerContainer);
              return containerElement;
            };
            return Container;
          })(component_1.Component);
          exports.Container = Container;
        },
        {
          "../arrayutils": 1,
          "../dom": 86,
          "../localization/i18n": 93,
          "./component": 18,
        },
      ],
      20: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.ControlBar = void 0;
          var container_1 = require("./container");
          var uiutils_1 = require("../uiutils");
          var spacer_1 = require("./spacer");
          var i18n_1 = require("../localization/i18n");
          var browserutils_1 = require("../browserutils");
          var settingspanel_1 = require("./settingspanel");
          /**
           * A container for main player control components, e.g. play toggle button, seek bar, volume control, fullscreen toggle
           * button.
           */
          var ControlBar = /** @class */ (function (_super) {
            __extends(ControlBar, _super);
            function ControlBar(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-controlbar",
                  hidden: true,
                  role: "region",
                  ariaLabel: i18n_1.i18n.getLocalizer("controlBar"),
                },
                _this.config
              );
              return _this;
            }
            ControlBar.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              // Counts how many components are hovered and block hiding of the control bar
              var hoverStackCount = 0;
              var isSettingsPanelShown = false;
              // only enabling this for non-mobile platforms without touch input. enabling this
              // for touch devices causes the UI to not disappear after hideDelay seconds.
              // Instead, it will stay visible until another manual interaction is performed.
              if (
                uimanager.getConfig().disableAutoHideWhenHovered &&
                !browserutils_1.BrowserUtils.isMobile
              ) {
                // Track hover status of child components
                uiutils_1.UIUtils.traverseTree(this, function (component) {
                  // Do not track hover status of child containers or spacers, only of 'real' controls
                  if (
                    component instanceof container_1.Container ||
                    component instanceof spacer_1.Spacer
                  ) {
                    return;
                  }
                  // Subscribe hover event and keep a count of the number of hovered children
                  component.onHoverChanged.subscribe(function (_, args) {
                    if (args.hovered) {
                      hoverStackCount++;
                    } else {
                      hoverStackCount--;
                    }
                  });
                });
              }
              if (browserutils_1.BrowserUtils.isMobile) {
                uimanager.onComponentShow.subscribe(function (component) {
                  if (component instanceof settingspanel_1.SettingsPanel) {
                    isSettingsPanelShown = true;
                  }
                });
                uimanager.onComponentHide.subscribe(function (component) {
                  if (component instanceof settingspanel_1.SettingsPanel) {
                    isSettingsPanelShown = false;
                  }
                });
              }
              uimanager.onControlsShow.subscribe(function () {
                _this.show();
              });
              uimanager.onPreviewControlsHide.subscribe(function (
                sender,
                args
              ) {
                // Cancel the hide event if hovered child components block hiding or if the settings panel is active on mobile.
                args.cancel =
                  args.cancel || hoverStackCount > 0 || isSettingsPanelShown;
              });
              uimanager.onControlsHide.subscribe(function () {
                _this.hide();
              });
            };
            return ControlBar;
          })(container_1.Container);
          exports.ControlBar = ControlBar;
        },
        {
          "../browserutils": 3,
          "../localization/i18n": 93,
          "../uiutils": 118,
          "./container": 19,
          "./settingspanel": 49,
          "./spacer": 56,
        },
      ],
      21: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.AdCounter = void 0;
          var label_1 = require("../label");
          /**
           * A label that displays a message about a running ad, optionally with a countdown.
           */
          var AdCounter = /** @class */ (function (_super) {
            __extends(AdCounter, _super);
            function AdCounter(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-label-ad-counter", "ui-label-ad-message"],
                  text: "Anunci {adIndex} de {adsLength}",
                },
                _this.config
              );
              return _this;
            }
            AdCounter.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              var text = String(config.text);
              var adNumber = 1;
              var adsNumber = 1;
              var updateMessageHandler = function (adCount, adsCounter) {
                _this.setText(
                  text
                    .replace("{adIndex}", String(adCount))
                    .replace("{adsLength}", String(adsCounter))
                );
              };
              var updateCount = function () {
                if (adNumber < adsNumber) {
                  adNumber = adNumber + 1;
                }
                updateMessageHandler(adNumber, adsNumber);
              };
              updateMessageHandler(adNumber, adsNumber);
              player.on(player.exports.PlayerEvent.AdFinished, updateCount);
              player.on(player.exports.PlayerEvent.AdSkipped, updateCount);
              player.on(
                player.exports.PlayerEvent.AdBreakStarted,
                function (event) {
                  adsNumber = event.adBreak.ads.filter(function (ad) {
                    return ad.data.adTitle !== "InVPAID";
                  }).length;
                  if (adsNumber > 1) {
                    _this.show();
                  }
                  updateMessageHandler(adNumber, adsNumber);
                }
              );
              player.on(
                player.exports.PlayerEvent.AdBreakFinished,
                function () {
                  _this.hide();
                  adsNumber = 1;
                  adNumber = 1;
                  updateMessageHandler(adNumber, adsNumber);
                }
              );
            };
            return AdCounter;
          })(label_1.Label);
          exports.AdCounter = AdCounter;
        },
        { "../label": 33 },
      ],
      22: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.AdSkipButton = void 0;
          var button_1 = require("../button");
          var stringutils_1 = require("../../stringutils");
          /**
           * A button that is displayed during ads and can be used to skip the ad.
           */
          var AdSkipButton = /** @class */ (function (_super) {
            __extends(AdSkipButton, _super);
            function AdSkipButton(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-button-ad-skip",
                  untilSkippableMessage: "Skip ad in {remainingTime}",
                  skippableMessage: "Skip ad",
                },
                _this.config
              );
              return _this;
            }
            AdSkipButton.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              var untilSkippableMessage = config.untilSkippableMessage;
              var skippableMessage = config.skippableMessage;
              var skipOffset = -1;
              var duration = -1;
              var updateSkipMessageHandler = function () {
                _this.show();
                // Update the skip message on the button
                if (player.getCurrentTime() < skipOffset) {
                  _this.setText(
                    stringutils_1.StringUtils.replaceAdMessagePlaceholders(
                      untilSkippableMessage,
                      skipOffset,
                      player
                    )
                  );
                  _this.disable();
                } else {
                  _this.setText(skippableMessage);
                  _this.enable();
                }
              };
              var adStartHandler = function (event) {
                var ad = event.ad;
                skipOffset = ad.skippableAfter;
                duration = ad.duration;
                untilSkippableMessage =
                  (ad.uiConfig && ad.uiConfig.untilSkippableMessage) ||
                  config.untilSkippableMessage;
                skippableMessage =
                  (ad.uiConfig && ad.uiConfig.skippableMessage) ||
                  config.skippableMessage;
                // Display this button only if ad is skippable.
                // Non-skippable ads will return -1 for skippableAfter for player version < v8.3.0.
                if (
                  typeof skipOffset === "number" &&
                  skipOffset >= 0 &&
                  skipOffset < duration
                ) {
                  updateSkipMessageHandler();
                  player.on(
                    player.exports.PlayerEvent.TimeChanged,
                    updateSkipMessageHandler
                  );
                } else {
                  _this.hide();
                }
              };
              var adEndHandler = function () {
                player.off(
                  player.exports.PlayerEvent.TimeChanged,
                  updateSkipMessageHandler
                );
              };
              player.on(player.exports.PlayerEvent.AdStarted, adStartHandler);
              player.on(player.exports.PlayerEvent.AdSkipped, adEndHandler);
              player.on(player.exports.PlayerEvent.AdError, adEndHandler);
              player.on(player.exports.PlayerEvent.AdFinished, adEndHandler);
              this.onClick.subscribe(function () {
                // Try to skip the ad (this only works if it is skippable so we don't need to take extra care of that here)
                player.ads.skip();
              });
            };
            return AdSkipButton;
          })(button_1.Button);
          exports.AdSkipButton = AdSkipButton;
        },
        { "../../stringutils": 112, "../button": 12 },
      ],
      23: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.BufferingOverlay = void 0;
          var container_1 = require("../container");
          var component_1 = require("../component");
          var timeout_1 = require("../../timeout");
          /**
           * Overlays the player and displays a buffering indicator.
           */
          var BufferingOverlay = /** @class */ (function (_super) {
            __extends(BufferingOverlay, _super);
            function BufferingOverlay(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.indicators = [
                new component_1.Component({
                  tag: "div",
                  cssClass: "ui-buffering-overlay-indicator",
                  role: "img",
                }),
                new component_1.Component({
                  tag: "div",
                  cssClass: "ui-buffering-overlay-indicator",
                  role: "img",
                }),
                new component_1.Component({
                  tag: "div",
                  cssClass: "ui-buffering-overlay-indicator",
                  role: "img",
                }),
              ];
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-buffering-overlay",
                  hidden: true,
                  components: _this.indicators,
                  showDelayMs: 1000,
                },
                _this.config
              );
              return _this;
            }
            BufferingOverlay.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var recommendations = uimanager.getConfig().recommendations;
              var config = this.getConfig();
              var overlayShowTimeout = new timeout_1.Timeout(
                config.showDelayMs,
                function () {
                  _this.show();
                }
              );
              var showOverlay = function () {
                overlayShowTimeout.start();
              };
              var hideOverlay = function () {
                overlayShowTimeout.clear();
                _this.hide();
              };
              player.on(player.exports.PlayerEvent.StallStarted, showOverlay);
              player.on(player.exports.PlayerEvent.StallEnded, hideOverlay);
              player.on(player.exports.PlayerEvent.Play, showOverlay);
              player.on(player.exports.PlayerEvent.Playing, hideOverlay);
              player.on(player.exports.PlayerEvent.Paused, hideOverlay);
              player.on(player.exports.PlayerEvent.Seek, showOverlay);
              player.on(player.exports.PlayerEvent.Seeked, hideOverlay);
              player.on(player.exports.PlayerEvent.TimeShift, showOverlay);
              player.on(player.exports.PlayerEvent.TimeShifted, hideOverlay);
              player.on(player.exports.PlayerEvent.SourceUnloaded, hideOverlay);
              player.on(
                player.exports.PlayerEvent.PlaybackFinished,
                function () {
                  if (recommendations.length > 0) {
                    showOverlay();
                  }
                }
              );
              // Show overlay if player is already stalled at init
              if (player.isStalled()) {
                this.show();
              }
            };
            return BufferingOverlay;
          })(container_1.Container);
          exports.BufferingOverlay = BufferingOverlay;
        },
        { "../../timeout": 114, "../component": 18, "../container": 19 },
      ],
      24: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.ControlsOverlay = void 0;
          var button_1 = require("../button");
          var container_1 = require("../container");
          var playbacktogglebutton_1 = require("../playbacktogglebutton");
          var i18n_1 = require("../../localization/i18n");
          /**
           * Overlays the player and displays error messages.
           */
          var ControlsOverlay = /** @class */ (function (_super) {
            __extends(ControlsOverlay, _super);
            function ControlsOverlay(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.playbackToggleButton =
                new playbacktogglebutton_1.PlaybackToggleButton();
              _this.forwardButton = new button_1.Button({
                cssClasses: ["ui-forwardbutton", "ui-button"],
                ariaLabel: i18n_1.i18n.getLocalizer("forwardButton"),
              });
              _this.rewindButton = new button_1.Button({
                cssClasses: ["ui-rewindbutton", "ui-button"],
                ariaLabel: i18n_1.i18n.getLocalizer("rewindButton"),
              });
              _this.startOverButton = new button_1.Button({
                hidden: true,
                cssClasses: ["ui-startoverbutton", "ui-button"],
                ariaLabel: i18n_1.i18n.getLocalizer("startOverButton"),
              });
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-controls-overlay",
                  components: [
                    _this.startOverButton,
                    _this.rewindButton,
                    _this.playbackToggleButton,
                    _this.forwardButton,
                  ],
                },
                _this.config
              );
              return _this;
            }
            ControlsOverlay.prototype.configure = function (player) {
              var _this = this;
              var isLive = false;
              this.rewindButton.onClick.subscribe(function () {
                if (isLive) {
                  player.timeShift(player.getTimeShift() - 10);
                } else {
                  player.seek(Math.max(0, player.getCurrentTime() - 10));
                }
              });
              this.forwardButton.onClick.subscribe(function () {
                if (player.isLive()) {
                  player.timeShift(Math.min(0, player.getTimeShift() + 10));
                } else {
                  player.seek(
                    Math.min(player.getDuration(), player.getCurrentTime() + 10)
                  );
                }
              });
              this.startOverButton.onClick.subscribe(function () {
                var event = new CustomEvent("startOver", {
                  detail: { actiu: true },
                });
                dispatchEvent(event);
              });
              player.on(player.exports.PlayerEvent.SourceLoaded, function () {
                isLive = player.isLive();
                if (
                  isLive &&
                  (window.location.hash === "" ||
                    window.location.hash.indexOf("desplacament") < 0)
                ) {
                  _this.startOverButton.show();
                }
              });
            };
            return ControlsOverlay;
          })(container_1.Container);
          exports.ControlsOverlay = ControlsOverlay;
        },
        {
          "../../localization/i18n": 93,
          "../button": 12,
          "../container": 19,
          "../playbacktogglebutton": 40,
        },
      ],
      25: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.PlaybackTimeLabel = exports.PlaybackTimeLabelMode = void 0;
          var label_1 = require("../label");
          var playerutils_1 = require("../../playerutils");
          var stringutils_1 = require("../../stringutils");
          var i18n_1 = require("../../localization/i18n");
          var PlaybackTimeLabelMode;
          (function (PlaybackTimeLabelMode) {
            /**
             * Displays the current time
             */
            PlaybackTimeLabelMode[(PlaybackTimeLabelMode["CurrentTime"] = 0)] =
              "CurrentTime";
            /**
             * Displays the duration of the content
             */
            PlaybackTimeLabelMode[(PlaybackTimeLabelMode["TotalTime"] = 1)] =
              "TotalTime";
            /**
             * Displays the current time and the duration of the content
             * Format: ${currentTime} / ${totalTime}
             */
            PlaybackTimeLabelMode[
              (PlaybackTimeLabelMode["CurrentAndTotalTime"] = 2)
            ] = "CurrentAndTotalTime";
            /**
             * Displays the remaining time of the content
             */
            PlaybackTimeLabelMode[
              (PlaybackTimeLabelMode["RemainingTime"] = 3)
            ] = "RemainingTime";
          })(
            (PlaybackTimeLabelMode =
              exports.PlaybackTimeLabelMode ||
              (exports.PlaybackTimeLabelMode = {}))
          );
          /**
           * A label that display the current playback time and the total time through {@link PlaybackTimeLabel#setTime setTime}
           * or any string through {@link PlaybackTimeLabel#setText setText}.
           */
          var PlaybackTimeLabel = /** @class */ (function (_super) {
            __extends(PlaybackTimeLabel, _super);
            function PlaybackTimeLabel(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-playbacktimelabel",
                  timeLabelMode: PlaybackTimeLabelMode.CurrentAndTotalTime,
                  hideInLivePlayback: false,
                },
                _this.config
              );
              return _this;
            }
            PlaybackTimeLabel.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              var live = false;
              var liveCssClass = this.prefixCss("ui-playbacktimelabel-live");
              var liveEdgeCssClass = this.prefixCss(
                "ui-playbacktimelabel-live-edge"
              );
              var minWidth = 0;
              var liveClickHandler = function () {
                if (window.location.hash !== "") {
                  var event_1 = new CustomEvent("startOver", {
                    detail: { actiu: false },
                  });
                  dispatchEvent(event_1);
                } else {
                  player.timeShift(0);
                }
              };
              var updateLiveState = function () {
                // Player is playing a live stream when the duration is infinite
                live = player.isLive();
                // Attach/detach live marker class
                if (live) {
                  _this.getDomElement().addClass(liveCssClass);
                  _this.setText(i18n_1.i18n.getLocalizer("live"));
                  if (config.hideInLivePlayback) {
                    _this.hide();
                  }
                  _this.onClick.subscribe(liveClickHandler);
                  updateLiveTimeshiftState();
                } else {
                  _this.getDomElement().removeClass(liveCssClass);
                  _this.getDomElement().removeClass(liveEdgeCssClass);
                  _this.show();
                  _this.onClick.unsubscribe(liveClickHandler);
                }
              };
              var updateLiveTimeshiftState = function () {
                if (!live) {
                  return;
                }
                // The player is only at the live edge iff the stream is not shifted and it is actually playing or playback has
                // never been started (meaning it isn't paused). A player that is paused is always behind the live edge.
                // An exception is made for live streams without a timeshift window, because here we "stop" playback instead
                // of pausing it (from a UI perspective), so we keep the live edge indicator on because a play would always
                // resume at the live edge.
                var isTimeshifted = player.getTimeShift() < 0;
                var isTimeshiftAvailable = player.getMaxTimeShift() < 0;
                if (
                  !isTimeshifted &&
                  (!player.isPaused() || !isTimeshiftAvailable)
                ) {
                  _this.getDomElement().addClass(liveEdgeCssClass);
                } else {
                  _this.getDomElement().removeClass(liveEdgeCssClass);
                }
              };
              var liveStreamDetector =
                new playerutils_1.PlayerUtils.LiveStreamDetector(
                  player,
                  uimanager
                );
              liveStreamDetector.onLiveChanged.subscribe(function (
                sender,
                args
              ) {
                live = args.live;
                updateLiveState();
              });
              liveStreamDetector.detect(); // Initial detection
              var playbackTimeHandler = function () {
                if (!live && player.getDuration() !== Infinity) {
                  _this.setTime(
                    playerutils_1.PlayerUtils.getCurrentTimeRelativeToSeekableRange(
                      player
                    ),
                    player.getDuration()
                  );
                }
                // To avoid 'jumping' in the UI by varying label sizes due to non-monospaced fonts,
                // we gradually increase the min-width with the content to reach a stable size.
                var width = _this.getDomElement().width();
                if (width > minWidth) {
                  minWidth = width;
                  _this.getDomElement().css({
                    "min-width": minWidth + "px",
                  });
                }
              };
              var updateTimeFormatBasedOnDuration = function () {
                // Set time format depending on source duration
                _this.timeFormat =
                  Math.abs(
                    player.isLive()
                      ? player.getMaxTimeShift()
                      : player.getDuration()
                  ) >= 3600
                    ? stringutils_1.StringUtils.FORMAT_HHMMSS
                    : stringutils_1.StringUtils.FORMAT_MMSS;
                playbackTimeHandler();
              };
              player.on(
                player.exports.PlayerEvent.TimeChanged,
                playbackTimeHandler
              );
              player.on(
                player.exports.PlayerEvent.Ready,
                updateTimeFormatBasedOnDuration
              );
              player.on(player.exports.PlayerEvent.Seeked, playbackTimeHandler);
              player.on(
                player.exports.PlayerEvent.TimeShift,
                updateLiveTimeshiftState
              );
              player.on(
                player.exports.PlayerEvent.TimeShifted,
                updateLiveTimeshiftState
              );
              player.on(
                player.exports.PlayerEvent.Playing,
                updateLiveTimeshiftState
              );
              player.on(
                player.exports.PlayerEvent.Paused,
                updateLiveTimeshiftState
              );
              player.on(
                player.exports.PlayerEvent.StallStarted,
                updateLiveTimeshiftState
              );
              player.on(
                player.exports.PlayerEvent.StallEnded,
                updateLiveTimeshiftState
              );
              var init = function () {
                // Reset min-width when a new source is ready (especially for switching VOD/Live modes where the label content
                // changes)
                minWidth = 0;
                _this.getDomElement().css({
                  "min-width": null,
                });
                updateTimeFormatBasedOnDuration();
              };
              uimanager.getConfig().events.onUpdated.subscribe(init);
              init();
            };
            /**
             * Sets the current playback time and total duration.
             * @param playbackSeconds the current playback time in seconds
             * @param durationSeconds the total duration in seconds
             */
            PlaybackTimeLabel.prototype.setTime = function (
              playbackSeconds,
              durationSeconds
            ) {
              var currentTime = stringutils_1.StringUtils.secondsToTime(
                playbackSeconds,
                this.timeFormat
              );
              var totalTime = stringutils_1.StringUtils.secondsToTime(
                durationSeconds,
                this.timeFormat
              );
              switch (this.config.timeLabelMode) {
                case PlaybackTimeLabelMode.CurrentTime:
                  this.setText("".concat(currentTime));
                  break;
                case PlaybackTimeLabelMode.TotalTime:
                  this.setText("".concat(totalTime));
                  break;
                case PlaybackTimeLabelMode.CurrentAndTotalTime:
                  this.setText("".concat(currentTime, " / ").concat(totalTime));
                  break;
                case PlaybackTimeLabelMode.RemainingTime:
                  var remainingTime = stringutils_1.StringUtils.secondsToTime(
                    durationSeconds - playbackSeconds,
                    this.timeFormat
                  );
                  this.setText("".concat(remainingTime));
                  break;
              }
            };
            /**
             * Sets the current time format
             * @param timeFormat the time format
             */
            PlaybackTimeLabel.prototype.setTimeFormat = function (timeFormat) {
              this.timeFormat = timeFormat;
            };
            return PlaybackTimeLabel;
          })(label_1.Label);
          exports.PlaybackTimeLabel = PlaybackTimeLabel;
        },
        {
          "../../localization/i18n": 93,
          "../../playerutils": 99,
          "../../stringutils": 112,
          "../label": 33,
        },
      ],
      26: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.RecommendationOverlay = void 0;
          var container_1 = require("../container");
          var component_1 = require("../component");
          var dom_1 = require("../../dom");
          var stringutils_1 = require("../../stringutils");
          var hugereplaybutton_1 = require("../hugereplaybutton");
          var button_1 = require("../button");
          var label_1 = require("../label");
          var eventdispatcher_1 = require("../../eventdispatcher");
          var i18n_1 = require("../../localization/i18n");
          /**
           * Overlays the player and displays recommended videos.
           */
          var RecommendationOverlay = /** @class */ (function (_super) {
            __extends(RecommendationOverlay, _super);
            function RecommendationOverlay(config, player) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              var that = _this;
              _this.paused = false;
              _this.replayButton = new hugereplaybutton_1.HugeReplayButton();
              var closeButton = new button_1.Button({
                cssClass: "ui-mosaictancabutton bmpui-ui-button",
              });
              closeButton.onClick.subscribe(function () {
                that.hide();
                if (that.paused) {
                  player.play();
                  that.paused = false;
                }
              });
              var labelMosaic = new label_1.Label({
                cssClass: "ui-mosaicetiqueta",
              });
              labelMosaic.setText(i18n_1.i18n.getLocalizer("next"));
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-recommendation-overlay",
                  hidden: true,
                  components: [labelMosaic, _this.replayButton, closeButton],
                },
                _this.config
              );
              _this.openMosaic = function () {
                if (player.isPlaying()) {
                  player.pause();
                  _this.paused = true;
                }
                _this.show();
              };
              return _this;
            }
            RecommendationOverlay.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var clearRecommendations = function () {
                for (
                  var _i = 0, _a = _this.getComponents().slice();
                  _i < _a.length;
                  _i++
                ) {
                  var component = _a[_i];
                  if (component instanceof RecommendationItem) {
                    _this.removeComponent(component);
                  }
                }
                _this.updateComponents();
                _this
                  .getDomElement()
                  .removeClass(_this.prefixCss("recommendations"));
              };
              var recommendations = uimanager.getConfig().recommendations;
              var setupRecommendations = function () {
                clearRecommendations();
                if (recommendations.length > 0) {
                  var index = 1;
                  for (
                    var _i = 0, recommendations_1 = recommendations;
                    _i < recommendations_1.length;
                    _i++
                  ) {
                    var item = recommendations_1[_i];
                    _this.addComponent(
                      new RecommendationItem({
                        itemConfig: item,
                        cssClasses: ["recommendation-item-" + index++],
                      })
                    );
                  }
                  _this.updateComponents(); // create container DOM elements
                  _this
                    .getDomElement()
                    .addClass(_this.prefixCss("recommendations"));
                } else {
                  _this.removeComponents();
                  _this.addComponent(_this.replayButton);
                }
              };
              uimanager
                .getConfig()
                .events.onUpdated.subscribe(setupRecommendations);
              // Remove recommendations and hide overlay when source is unloaded
              player.on(player.exports.PlayerEvent.SourceUnloaded, function () {
                clearRecommendations();
                _this.hide();
              });
              // Display recommendations when playback has finished
              player.on(
                player.exports.PlayerEvent.PlaybackFinished,
                function () {
                  if (recommendations.length === 0) {
                    _this.show();
                  }
                }
              );
              // Hide recommendations when playback starts, e.g. a restart
              player.on(player.exports.PlayerEvent.Play, function () {
                _this.hide();
              });
              // Init on startup
              setupRecommendations();
            };
            return RecommendationOverlay;
          })(container_1.Container);
          exports.RecommendationOverlay = RecommendationOverlay;
          /**
           * An item of the {@link RecommendationOverlay}. Used only internally in {@link RecommendationOverlay}.
           */
          var RecommendationItem = /** @class */ (function (_super) {
            __extends(RecommendationItem, _super);
            function RecommendationItem(config) {
              var _this = _super.call(this, config) || this;
              _this.buttonEvents = {
                onClick: new eventdispatcher_1.EventDispatcher(),
              };
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-recommendation-item",
                  itemConfig: null, // this must be passed in from outside
                },
                _this.config
              );
              return _this;
            }
            RecommendationItem.prototype.toDomElement = function () {
              var config = this.config.itemConfig;
              var itemElement = new dom_1.DOM("button", {
                id: this.config.id,
                class: this.getCssClasses(),
              }).css({
                "background-image": "url(".concat(config.thumbnail, ")"),
              });
              var bgElement = new dom_1.DOM("div", {
                class: this.prefixCss("background"),
              });
              itemElement.append(bgElement);
              var titleElement = new dom_1.DOM("span", {
                class: this.prefixCss("title"),
              }).append(
                new dom_1.DOM("span", {
                  class: this.prefixCss("innertitle"),
                }).html(config.title)
              );
              itemElement.append(titleElement);
              var timeElement = new dom_1.DOM("span", {
                class: this.prefixCss("duration"),
              }).append(
                new dom_1.DOM("span", {
                  class: this.prefixCss("innerduration"),
                }).html(
                  config.duration
                    ? stringutils_1.StringUtils.secondsToTime(config.duration)
                    : ""
                )
              );
              itemElement.append(timeElement);
              itemElement.on("click", function () {
                var info = {
                  slug: config.slug,
                  idint: config.idint,
                };
                var event = new CustomEvent("changeVideo", {
                  detail: info,
                });
                dispatchEvent(event);
              });
              return itemElement;
            };
            return RecommendationItem;
          })(component_1.Component);
        },
        {
          "../../dom": 86,
          "../../eventdispatcher": 88,
          "../../localization/i18n": 93,
          "../../stringutils": 112,
          "../button": 12,
          "../component": 18,
          "../container": 19,
          "../hugereplaybutton": 31,
          "../label": 33,
        },
      ],
      27: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.UpnextItem = void 0;
          var component_1 = require("../component");
          var dom_1 = require("../../dom");
          var i18n_1 = require("../../localization/i18n");
          var stringutils_1 = require("../../stringutils");
          var UpnextItem = /** @class */ (function (_super) {
            __extends(UpnextItem, _super);
            function UpnextItem(config) {
              var _this =
                _super.call(this, {
                  cssClasses: ["ui-up-next-item"],
                  hidden: true,
                }) || this;
              _this.closed = false;
              _this.label = i18n_1.i18n.getLocalizer("next");
              _this.itemConfig = config;
              return _this;
            }
            UpnextItem.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var duration = 0;
              var resta = 0;
              if (this.itemConfig) {
                player.on(player.exports.PlayerEvent.Play, function () {
                  _this.hide();
                });
                player.on(player.exports.PlayerEvent.SourceLoaded, function () {
                  duration = player.getDuration();
                  resta =
                    duration *
                    (_this.itemConfig.positionPercentatgeOffset / 100);
                });
                player.on(
                  player.exports.PlayerEvent.TimeChanged,
                  function (event) {
                    if (duration === 0) {
                      duration = player.getDuration();
                    }
                    resta =
                      duration *
                      (_this.itemConfig.positionPercentatgeOffset / 100);
                    duration - event.time <= resta && !_this.closed
                      ? _this.show()
                      : _this.hide();
                  }
                );
              }
            };
            // Custom design of the button
            UpnextItem.prototype.toDomElement = function () {
              var _this = this;
              var itemElement = new dom_1.DOM("div", {
                id: this.config.id,
                class: this.getCssClasses(),
              });
              if (this.itemConfig) {
                var nextButton = new dom_1.DOM("button", {
                  class: this.prefixCss("up-next-thumbnail"),
                }).css({
                  "background-image": "url(".concat(
                    this.itemConfig.thumbnail,
                    ")"
                  ),
                });
                nextButton.on("click", function () {
                  var info = {
                    idint: _this.itemConfig.idint,
                    slug: _this.itemConfig.slug,
                  };
                  var event = new CustomEvent("changeVideo", {
                    detail: info,
                  });
                  dispatchEvent(event);
                });
                itemElement.append(nextButton);
                var closeButton = new dom_1.DOM("button", {
                  class: "bmpui-up-next-close bmpui-ui-button",
                });
                closeButton.on("click", function () {
                  _this.closed = true;
                  _this.hide();
                });
                itemElement.append(closeButton);
                var bgElement = new dom_1.DOM("div", {
                  class: this.prefixCss("background"),
                });
                nextButton.append(bgElement);
                var labelElement = new dom_1.DOM("span", {
                  class: this.prefixCss("label"),
                }).append(
                  new dom_1.DOM("span", {
                    class: this.prefixCss("innerlabel"),
                  }).html(i18n_1.i18n.performLocalization(this.label))
                );
                nextButton.append(labelElement);
                var titleElement = new dom_1.DOM("span", {
                  class: this.prefixCss("label"),
                }).append(
                  new dom_1.DOM("span", {
                    class: this.prefixCss("innerlabel"),
                  }).html(this.itemConfig.title)
                );
                nextButton.append(titleElement);
                var timeElement = new dom_1.DOM("span", {
                  class: this.prefixCss("title"),
                }).append(
                  new dom_1.DOM("span", {
                    class: this.prefixCss("innertitle"),
                  }).html(
                    this.itemConfig.duration
                      ? stringutils_1.StringUtils.secondsToTime(
                          this.itemConfig.duration
                        )
                      : ""
                  )
                );
                nextButton.append(timeElement);
              }
              return itemElement;
            };
            return UpnextItem;
          })(component_1.Component);
          exports.UpnextItem = UpnextItem;
        },
        {
          "../../dom": 86,
          "../../localization/i18n": 93,
          "../../stringutils": 112,
          "../component": 18,
        },
      ],
      28: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.ErrorMessageOverlay = void 0;
          var container_1 = require("./container");
          var label_1 = require("./label");
          var tvnoisecanvas_1 = require("./tvnoisecanvas");
          var errorutils_1 = require("../errorutils");
          var mobilev3playerapi_1 = require("../mobilev3playerapi");
          /**
           * Overlays the player and displays error messages.
           */
          var ErrorMessageOverlay = /** @class */ (function (_super) {
            __extends(ErrorMessageOverlay, _super);
            function ErrorMessageOverlay(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.errorLabel = new label_1.Label({
                cssClass: "ui-errormessage-label",
              });
              _this.tvNoiseBackground = new tvnoisecanvas_1.TvNoiseCanvas();
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-errormessage-overlay",
                  components: [_this.tvNoiseBackground, _this.errorLabel],
                  hidden: true,
                },
                _this.config
              );
              return _this;
            }
            ErrorMessageOverlay.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              var handleErrorMessage = function (event, message) {
                var customizedMessage = customizeErrorMessage(
                  uimanager.getConfig().errorMessages || config.messages,
                  event
                );
                if (customizedMessage) {
                  message = customizedMessage;
                }
                _this.display(message);
              };
              if ((0, mobilev3playerapi_1.isMobileV3PlayerAPI)(player)) {
                var errorEventHandler = function (event) {
                  var message =
                    errorutils_1.ErrorUtils.defaultMobileV3ErrorMessageTranslator(
                      event
                    );
                  handleErrorMessage(event, message);
                };
                player.on(
                  mobilev3playerapi_1.MobileV3PlayerEvent.PlayerError,
                  errorEventHandler
                );
                player.on(
                  mobilev3playerapi_1.MobileV3PlayerEvent.SourceError,
                  errorEventHandler
                );
              } else {
                player.on(player.exports.PlayerEvent.Error, function (event) {
                  var message =
                    errorutils_1.ErrorUtils.defaultWebErrorMessageTranslator(
                      event
                    );
                  handleErrorMessage(event, message);
                });
              }
              player.on(
                player.exports.PlayerEvent.SourceLoaded,
                function (event) {
                  if (_this.isShown()) {
                    _this.tvNoiseBackground.stop();
                    _this.hide();
                  }
                }
              );
            };
            ErrorMessageOverlay.prototype.display = function (errorMessage) {
              this.errorLabel.setText(errorMessage);
              this.tvNoiseBackground.start();
              this.show();
            };
            ErrorMessageOverlay.prototype.release = function () {
              _super.prototype.release.call(this);
              // Canvas rendering must be explicitly stopped, else it just continues forever and hogs resources
              this.tvNoiseBackground.stop();
            };
            return ErrorMessageOverlay;
          })(container_1.Container);
          exports.ErrorMessageOverlay = ErrorMessageOverlay;
          function customizeErrorMessage(errorMessages, event) {
            if (!errorMessages) {
              return undefined;
            }
            // Process message vocabularies
            if (typeof errorMessages === "function") {
              // Translation function for all errors
              return errorMessages(event);
            }
            if (errorMessages[event.code]) {
              // It's not a translation function, so it must be a map of strings or translation functions
              var customMessage = errorMessages[event.code];
              return typeof customMessage === "string"
                ? customMessage
                : customMessage(event);
            }
          }
        },
        {
          "../errorutils": 87,
          "../mobilev3playerapi": 98,
          "./container": 19,
          "./label": 33,
          "./tvnoisecanvas": 77,
        },
      ],
      29: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.FullscreenToggleButton = void 0;
          var togglebutton_1 = require("./togglebutton");
          var i18n_1 = require("../localization/i18n");
          /**
           * A button that toggles the player between windowed and fullscreen view.
           */
          var FullscreenToggleButton = /** @class */ (function (_super) {
            __extends(FullscreenToggleButton, _super);
            function FullscreenToggleButton(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-fullscreentogglebutton",
                  text: i18n_1.i18n.getLocalizer("fullscreen"),
                },
                _this.config
              );
              return _this;
            }
            FullscreenToggleButton.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var isFullScreenAvailable = function () {
                return player.isViewModeAvailable(
                  player.exports.ViewMode.Fullscreen
                );
              };
              var fullscreenStateHandler = function () {
                player.getViewMode() === player.exports.ViewMode.Fullscreen
                  ? _this.on()
                  : _this.off();
              };
              var fullscreenAvailabilityChangedHandler = function () {
                isFullScreenAvailable() ? _this.show() : _this.hide();
              };
              player.on(
                player.exports.PlayerEvent.ViewModeChanged,
                fullscreenStateHandler
              );
              // Available only in our native SDKs for now
              if (player.exports.PlayerEvent.ViewModeAvailabilityChanged) {
                player.on(
                  player.exports.PlayerEvent.ViewModeAvailabilityChanged,
                  fullscreenAvailabilityChangedHandler
                );
              }
              uimanager
                .getConfig()
                .events.onUpdated.subscribe(
                  fullscreenAvailabilityChangedHandler
                );
              this.onClick.subscribe(function () {
                if (!isFullScreenAvailable()) {
                  if (console) {
                    console.log("Fullscreen unavailable");
                  }
                  return;
                }
                var targetViewMode =
                  player.getViewMode() === player.exports.ViewMode.Fullscreen
                    ? player.exports.ViewMode.Inline
                    : player.exports.ViewMode.Fullscreen;
                player.setViewMode(targetViewMode);
              });
              // Startup init
              fullscreenAvailabilityChangedHandler();
              fullscreenStateHandler();
            };
            return FullscreenToggleButton;
          })(togglebutton_1.ToggleButton);
          exports.FullscreenToggleButton = FullscreenToggleButton;
        },
        { "../localization/i18n": 93, "./togglebutton": 76 },
      ],
      30: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.HugePlaybackToggleButton = void 0;
          var playbacktogglebutton_1 = require("./playbacktogglebutton");
          var dom_1 = require("../dom");
          var i18n_1 = require("../localization/i18n");
          /**
           * A button that overlays the video and toggles between playback and pause.
           */
          var HugePlaybackToggleButton = /** @class */ (function (_super) {
            __extends(HugePlaybackToggleButton, _super);
            function HugePlaybackToggleButton(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-hugeplaybacktogglebutton",
                  text: i18n_1.i18n.getLocalizer("playPause"),
                  role: "button",
                },
                _this.config
              );
              return _this;
            }
            HugePlaybackToggleButton.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              // Update button state through API events
              _super.prototype.configure.call(this, player, uimanager, false);
              // Set enterFullscreenOnInitialPlayback if set in the uimanager config
              if (
                typeof uimanager.getConfig()
                  .enterFullscreenOnInitialPlayback === "boolean"
              ) {
                this.config.enterFullscreenOnInitialPlayback =
                  uimanager.getConfig().enterFullscreenOnInitialPlayback;
              }
              var togglePlayback = function () {
                if (player.isPlaying() || _this.isPlayInitiated) {
                  player.pause("ui");
                } else {
                  player.play("ui");
                }
              };
              var toggleFullscreen = function () {
                if (
                  player.getViewMode() === player.exports.ViewMode.Fullscreen
                ) {
                  player.setViewMode(player.exports.ViewMode.Inline);
                } else {
                  player.setViewMode(player.exports.ViewMode.Fullscreen);
                }
              };
              var firstPlay = true;
              var clickTime = 0;
              var doubleClickTime = 0;
              /*
               * YouTube-style toggle button handling
               *
               * The goal is to prevent a short pause or playback interval between a click, that toggles playback, and a
               * double click, that toggles fullscreen. In this naive approach, the first click would e.g. start playback,
               * the second click would be detected as double click and toggle to fullscreen, and as second normal click stop
               * playback, which results is a short playback interval with max length of the double click detection
               * period (usually 500ms).
               *
               * To solve this issue, we defer handling of the first click for 200ms, which is almost unnoticeable to the user,
               * and just toggle playback if no second click (double click) has been registered during this period. If a double
               * click is registered, we just toggle the fullscreen. In the first 200ms, undesired playback changes thus cannot
               * happen. If a double click is registered within 500ms, we undo the playback change and switch fullscreen mode.
               * In the end, this method basically introduces a 200ms observing interval in which playback changes are prevented
               * if a double click happens.
               */
              this.onClick.subscribe(function () {
                // Directly start playback on first click of the button.
                // This is a required workaround for mobile browsers where video playback needs to be triggered directly
                // by the user. A deferred playback start through the timeout below is not considered as user action and
                // therefore ignored by mobile browsers.
                if (firstPlay) {
                  // Try to start playback. Then we wait for Play and only when it arrives, we disable the firstPlay flag.
                  // If we disable the flag here, onClick was triggered programmatically instead of by a user interaction, and
                  // playback is blocked (e.g. on mobile devices due to the programmatic play() call), we loose the chance to
                  // ever start playback through a user interaction again with this button.
                  togglePlayback();
                  if (_this.config.enterFullscreenOnInitialPlayback) {
                    player.setViewMode(player.exports.ViewMode.Fullscreen);
                  }
                  return;
                }
                var now = Date.now();
                if (now - clickTime < 200) {
                  // We have a double click inside the 200ms interval, just toggle fullscreen mode
                  toggleFullscreen();
                  doubleClickTime = now;
                  return;
                } else if (now - clickTime < 500) {
                  // We have a double click inside the 500ms interval, undo playback toggle and toggle fullscreen mode
                  toggleFullscreen();
                  togglePlayback();
                  doubleClickTime = now;
                  return;
                }
                clickTime = now;
                setTimeout(function () {
                  if (Date.now() - doubleClickTime > 200) {
                    // No double click detected, so we toggle playback and wait what happens next
                    togglePlayback();
                  }
                }, 200);
              });
              player.on(player.exports.PlayerEvent.Play, function () {
                // Playback has really started, we can disable the flag to switch to normal toggle button handling
                firstPlay = false;
              });
              player.on(player.exports.PlayerEvent.Warning, function (event) {
                if (
                  event.code ===
                  player.exports.WarningCode.PLAYBACK_COULD_NOT_BE_STARTED
                ) {
                  // if playback could not be started, reset the first play flag as we need the user interaction to start
                  firstPlay = true;
                }
              });
              var suppressPlayButtonTransitionAnimation = function () {
                // Disable the current animation
                _this.setTransitionAnimationsEnabled(false);
                // Enable the transition animations for the next state change
                _this.onToggle.subscribeOnce(function () {
                  _this.setTransitionAnimationsEnabled(true);
                });
              };
              // Hide the play button animation when the UI is loaded (it should only be animated on state changes)
              suppressPlayButtonTransitionAnimation();
              var isAutoplayEnabled =
                player.getConfig().playback &&
                Boolean(player.getConfig().playback.autoplay);
              // We only know if an autoplay attempt is upcoming if the player is not yet ready. It the player is already ready,
              // the attempt might be upcoming or might have already happened, but we don't have to handle that because we can
              // simply rely on isPlaying and the play state events.
              var isAutoplayUpcoming = !player.getSource() && isAutoplayEnabled;
              // Hide the play button when the player is already playing or autoplay is upcoming
              if (player.isPlaying() || isAutoplayUpcoming) {
                // Hide the play button (switch to playing state)
                this.on();
                // Disable the animation of the playing state switch
                suppressPlayButtonTransitionAnimation();
                // Show the play button without an animation if a play attempt is blocked
                player.on(player.exports.PlayerEvent.Warning, function (event) {
                  if (
                    event.code ===
                    player.exports.WarningCode.PLAYBACK_COULD_NOT_BE_STARTED
                  ) {
                    suppressPlayButtonTransitionAnimation();
                  }
                });
              }
            };
            HugePlaybackToggleButton.prototype.toDomElement = function () {
              var buttonElement = _super.prototype.toDomElement.call(this);
              // Add child that contains the play button image
              // Setting the image directly on the button does not work together with scaling animations, because the button
              // can cover the whole video player are and scaling would extend it beyond. By adding an inner element, confined
              // to the size if the image, it can scale inside the player without overshooting.
              buttonElement.append(
                new dom_1.DOM("div", {
                  class: this.prefixCss("image"),
                })
              );
              return buttonElement;
            };
            /**
             * Enables or disables the play state transition animations of the play button image. Can be used to suppress
             * animations.
             * @param {boolean} enabled true to enable the animations (default), false to disable them
             */
            HugePlaybackToggleButton.prototype.setTransitionAnimationsEnabled =
              function (enabled) {
                var noTransitionAnimationsClass = this.prefixCss(
                  "no-transition-animations"
                );
                if (enabled) {
                  this.getDomElement().removeClass(noTransitionAnimationsClass);
                } else if (
                  !this.getDomElement().hasClass(noTransitionAnimationsClass)
                ) {
                  this.getDomElement().addClass(noTransitionAnimationsClass);
                }
              };
            return HugePlaybackToggleButton;
          })(playbacktogglebutton_1.PlaybackToggleButton);
          exports.HugePlaybackToggleButton = HugePlaybackToggleButton;
        },
        {
          "../dom": 86,
          "../localization/i18n": 93,
          "./playbacktogglebutton": 40,
        },
      ],
      31: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.HugeReplayButton = void 0;
          var button_1 = require("./button");
          var dom_1 = require("../dom");
          var i18n_1 = require("../localization/i18n");
          /**
           * A button to play/replay a video.
           */
          var HugeReplayButton = /** @class */ (function (_super) {
            __extends(HugeReplayButton, _super);
            function HugeReplayButton(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-hugereplaybutton",
                  text: i18n_1.i18n.getLocalizer("replay"),
                },
                _this.config
              );
              return _this;
            }
            HugeReplayButton.prototype.configure = function (
              player,
              uimanager
            ) {
              _super.prototype.configure.call(this, player, uimanager);
              this.onClick.subscribe(function () {
                player.play("ui");
              });
            };
            HugeReplayButton.prototype.toDomElement = function () {
              var buttonElement = _super.prototype.toDomElement.call(this);
              // Add child that contains the play button image
              // Setting the image directly on the button does not work together with scaling animations, because the button
              // can cover the whole video player are and scaling would extend it beyond. By adding an inner element, confined
              // to the size if the image, it can scale inside the player without overshooting.
              buttonElement.append(
                new dom_1.DOM("div", {
                  class: this.prefixCss("image"),
                })
              );
              return buttonElement;
            };
            return HugeReplayButton;
          })(button_1.Button);
          exports.HugeReplayButton = HugeReplayButton;
        },
        { "../dom": 86, "../localization/i18n": 93, "./button": 12 },
      ],
      32: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.ItemSelectionList = void 0;
          var listselector_1 = require("./listselector");
          var dom_1 = require("../dom");
          var i18n_1 = require("../localization/i18n");
          var ItemSelectionList = (exports.ItemSelectionList =
            /** @class */ (function (_super) {
              __extends(ItemSelectionList, _super);
              function ItemSelectionList(config) {
                if (config === void 0) {
                  config = {};
                }
                var _this = _super.call(this, config) || this;
                _this.config = _this.mergeConfig(
                  config,
                  {
                    tag: "ul",
                    cssClass: "ui-itemselectionlist",
                  },
                  _this.config
                );
                return _this;
              }
              ItemSelectionList.prototype.isActive = function () {
                return this.items.length > 1;
              };
              ItemSelectionList.prototype.toDomElement = function () {
                var listElement = new dom_1.DOM("ul", {
                  id: this.config.id,
                  class: this.getCssClasses(),
                });
                this.listElement = listElement;
                this.updateDomItems();
                return listElement;
              };
              ItemSelectionList.prototype.updateDomItems = function (
                selectedValue
              ) {
                var _this = this;
                if (selectedValue === void 0) {
                  selectedValue = null;
                }
                // Delete all children
                this.listElement.empty();
                var selectedListItem = null;
                var selectItem = function (listItem) {
                  listItem.addClass(
                    _this.prefixCss(ItemSelectionList.CLASS_SELECTED)
                  );
                };
                var deselectItem = function (listItem) {
                  listItem.removeClass(
                    _this.prefixCss(ItemSelectionList.CLASS_SELECTED)
                  );
                };
                var _loop_1 = function (item) {
                  var listItem = new dom_1.DOM("li", {
                    type: "li",
                    class: this_1.prefixCss("ui-selectionlistitem"),
                  }).append(
                    new dom_1.DOM("a", {}).html(
                      i18n_1.i18n.performLocalization(item.label)
                    )
                  );
                  if (!selectedListItem) {
                    if (selectedValue == null) {
                      // If there is no pre-selected value, select the first one
                      selectedListItem = listItem;
                    } else if (String(selectedValue) === item.key) {
                      // convert selectedValue to string to catch 'null'/null case
                      selectedListItem = listItem;
                    }
                  }
                  // Handle list item selections
                  listItem.on("click", function () {
                    // Deselect the previous item (if there was a selected item)
                    if (selectedListItem) {
                      deselectItem(selectedListItem);
                    }
                    // Select the clicked item
                    selectedListItem = listItem;
                    selectItem(listItem);
                    // Fire the event
                    _this.onItemSelectedEvent(item.key, false);
                  });
                  // Select default item
                  if (selectedListItem) {
                    selectItem(selectedListItem);
                  }
                  this_1.listElement.append(listItem);
                };
                var this_1 = this;
                for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                  var item = _a[_i];
                  _loop_1(item);
                }
              };
              ItemSelectionList.prototype.onItemAddedEvent = function (value) {
                _super.prototype.onItemAddedEvent.call(this, value);
                this.updateDomItems(this.selectedItem);
              };
              ItemSelectionList.prototype.onItemRemovedEvent = function (
                value
              ) {
                _super.prototype.onItemRemovedEvent.call(this, value);
                this.updateDomItems(this.selectedItem);
              };
              ItemSelectionList.prototype.onItemSelectedEvent = function (
                value,
                updateDomItems
              ) {
                if (updateDomItems === void 0) {
                  updateDomItems = true;
                }
                _super.prototype.onItemSelectedEvent.call(this, value);
                if (updateDomItems) {
                  this.updateDomItems(value);
                }
              };
              ItemSelectionList.CLASS_SELECTED = "selected";
              return ItemSelectionList;
            })(listselector_1.ListSelector));
        },
        { "../dom": 86, "../localization/i18n": 93, "./listselector": 35 },
      ],
      33: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.Label = void 0;
          var component_1 = require("./component");
          var dom_1 = require("../dom");
          var eventdispatcher_1 = require("../eventdispatcher");
          var i18n_1 = require("../localization/i18n");
          /**
           * A simple text label.
           *
           * DOM example:
           * <code>
           *     <span class='ui-label'>...some text...</span>
           * </code>
           */
          var Label = /** @class */ (function (_super) {
            __extends(Label, _super);
            function Label(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.labelEvents = {
                onClick: new eventdispatcher_1.EventDispatcher(),
                onTextChanged: new eventdispatcher_1.EventDispatcher(),
              };
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-label",
                },
                _this.config
              );
              _this.text = _this.config.text;
              return _this;
            }
            Label.prototype.toDomElement = function () {
              var _this = this;
              var tagName = this.config.for != null ? "label" : "span";
              var labelElement = new dom_1.DOM(tagName, {
                id: this.config.id,
                for: this.config.for,
                class: this.getCssClasses(),
              }).html(i18n_1.i18n.performLocalization(this.text));
              labelElement.on("click", function () {
                _this.onClickEvent();
              });
              return labelElement;
            };
            /**
             * Set the text on this label.
             * @param text
             */
            Label.prototype.setText = function (text) {
              if (text === this.text) {
                return;
              }
              this.text = text;
              var localizedText = i18n_1.i18n.performLocalization(text);
              this.getDomElement().html(localizedText);
              this.onTextChangedEvent(localizedText);
            };
            /**
             * Gets the text on this label.
             * @return {string} The text on the label
             */
            Label.prototype.getText = function () {
              return i18n_1.i18n.performLocalization(this.text);
            };
            /**
             * Clears the text on this label.
             */
            Label.prototype.clearText = function () {
              this.getDomElement().html("");
              this.onTextChangedEvent(null);
            };
            /**
             * Tests if the label is empty and does not contain any text.
             * @return {boolean} True if the label is empty, else false
             */
            Label.prototype.isEmpty = function () {
              return !this.text;
            };
            /**
             * Fires the {@link #onClick} event.
             * Can be used by subclasses to listen to this event without subscribing an event listener by overwriting the method
             * and calling the super method.
             */
            Label.prototype.onClickEvent = function () {
              this.labelEvents.onClick.dispatch(this);
            };
            /**
             * Fires the {@link #onClick} event.
             * Can be used by subclasses to listen to this event without subscribing an event listener by overwriting the method
             * and calling the super method.
             */
            Label.prototype.onTextChangedEvent = function (text) {
              this.labelEvents.onTextChanged.dispatch(this, text);
            };
            Object.defineProperty(Label.prototype, "onClick", {
              /**
               * Gets the event that is fired when the label is clicked.
               * @returns {Event<Label<LabelConfig>, NoArgs>}
               */
              get: function () {
                return this.labelEvents.onClick.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(Label.prototype, "onTextChanged", {
              /**
               * Gets the event that is fired when the text on the label is changed.
               * @returns {Event<Label<LabelConfig>, string>}
               */
              get: function () {
                return this.labelEvents.onTextChanged.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            return Label;
          })(component_1.Component);
          exports.Label = Label;
        },
        {
          "../dom": 86,
          "../eventdispatcher": 88,
          "../localization/i18n": 93,
          "./component": 18,
        },
      ],
      34: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.ListBox = void 0;
          var togglebutton_1 = require("./togglebutton");
          var listselector_1 = require("./listselector");
          var dom_1 = require("../dom");
          var arrayutils_1 = require("../arrayutils");
          /**
           * A element to select a single item out of a list of available items.
           *
           * DOM example:
           * <code>
           *   <div class='ui-listbox'>
           *     <button class='ui-listbox-button'>label</button>
           *     ...
           *   </div
           * </code>
           */
          // TODO: change ListSelector to extends container in v4 to improve usage of ListBox.
          //       Currently we are creating the dom element of the list box with child elements manually here.
          //       But this functionality is already covered within the Container component.
          var ListBox = /** @class */ (function (_super) {
            __extends(ListBox, _super);
            function ListBox(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.components = [];
              _this.removeListBoxDomItem = function (_, key) {
                var component = _this.getComponentForKey(key);
                if (component) {
                  component.getDomElement().remove();
                  arrayutils_1.ArrayUtils.remove(_this.components, component);
                }
              };
              _this.addListBoxDomItem = function (_, key) {
                var component = _this.getComponentForKey(key);
                var newItem = _this.getItemForKey(key);
                if (component) {
                  // Update existing component
                  component.setText(newItem.label);
                } else {
                  var listBoxItemButton_1 =
                    _this.buildListBoxItemButton(newItem);
                  listBoxItemButton_1.onClick.subscribe(function () {
                    _this.handleSelectionChange(listBoxItemButton_1);
                  });
                  _this.components.push(listBoxItemButton_1);
                  _this.listBoxElement.append(
                    listBoxItemButton_1.getDomElement()
                  );
                }
              };
              _this.refreshSelectedItem = function () {
                // This gets called twice because the first time is triggered when the user clicks on the ListBoxItemButton. And the
                // second call comes from the player event when the actual item is selected (Subtitle / AudioTrack in this case).
                // As this is a generic component we can't prohibit this behaviour. We need to treat this component as it acts
                // independent from PlayerEvents and on the other hand we need to react to PlayerEvents as it could be triggered
                // from outside.
                for (var _i = 0, _a = _this.items; _i < _a.length; _i++) {
                  var item = _a[_i];
                  var component = _this.getComponentForKey(item.key);
                  if (component) {
                    String(component.key) === String(_this.selectedItem)
                      ? component.on()
                      : component.off();
                  }
                }
              };
              _this.handleSelectionChange = function (sender) {
                _this.onItemSelectedEvent(sender.key);
              };
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-listbox",
                },
                _this.config
              );
              return _this;
            }
            ListBox.prototype.configure = function (player, uimanager) {
              // Subscribe before super call to receive initial events
              this.onItemAdded.subscribe(this.addListBoxDomItem);
              this.onItemRemoved.subscribe(this.removeListBoxDomItem);
              this.onItemSelected.subscribe(this.refreshSelectedItem);
              _super.prototype.configure.call(this, player, uimanager);
            };
            ListBox.prototype.toDomElement = function () {
              var listBoxElement = new dom_1.DOM("div", {
                id: this.config.id,
                class: this.getCssClasses(),
              });
              this.listBoxElement = listBoxElement;
              this.createListBoxDomItems();
              this.refreshSelectedItem();
              return listBoxElement;
            };
            ListBox.prototype.createListBoxDomItems = function () {
              // Delete all children
              this.listBoxElement.empty();
              this.components = [];
              // Add updated children
              for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                this.addListBoxDomItem(this, item.key);
              }
            };
            ListBox.prototype.buildListBoxItemButton = function (listItem) {
              return new ListBoxItemButton({
                key: listItem.key,
                text: listItem.label,
                ariaLabel: listItem.ariaLabel,
              });
            };
            ListBox.prototype.getComponentForKey = function (key) {
              return this.components.find(function (c) {
                return key === c.key;
              });
            };
            return ListBox;
          })(listselector_1.ListSelector);
          exports.ListBox = ListBox;
          var ListBoxItemButton = /** @class */ (function (_super) {
            __extends(ListBoxItemButton, _super);
            function ListBoxItemButton(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-listbox-button",
                  onClass: "selected",
                  offClass: "",
                },
                _this.config
              );
              return _this;
            }
            Object.defineProperty(ListBoxItemButton.prototype, "key", {
              get: function () {
                return this.config.key;
              },
              enumerable: false,
              configurable: true,
            });
            return ListBoxItemButton;
          })(togglebutton_1.ToggleButton);
        },
        {
          "../arrayutils": 1,
          "../dom": 86,
          "./listselector": 35,
          "./togglebutton": 76,
        },
      ],
      35: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          var __assign =
            (this && this.__assign) ||
            function () {
              __assign =
                Object.assign ||
                function (t) {
                  for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s)
                      if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                  }
                  return t;
                };
              return __assign.apply(this, arguments);
            };
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.ListSelector = void 0;
          var component_1 = require("./component");
          var eventdispatcher_1 = require("../eventdispatcher");
          var arrayutils_1 = require("../arrayutils");
          var i18n_1 = require("../localization/i18n");
          var ListSelector = /** @class */ (function (_super) {
            __extends(ListSelector, _super);
            function ListSelector(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.listSelectorEvents = {
                onItemAdded: new eventdispatcher_1.EventDispatcher(),
                onItemRemoved: new eventdispatcher_1.EventDispatcher(),
                onItemSelected: new eventdispatcher_1.EventDispatcher(),
              };
              _this.config = _this.mergeConfig(
                config,
                {
                  items: [],
                  cssClass: "ui-listselector",
                },
                _this.config
              );
              _this.items = _this.config.items;
              return _this;
            }
            ListSelector.prototype.getItemIndex = function (key) {
              for (var index in this.items) {
                if (key === this.items[index].key) {
                  return parseInt(index);
                }
              }
              return -1;
            };
            /**
             * Returns all current items of this selector.
             * * @returns {ListItem[]}
             */
            ListSelector.prototype.getItems = function () {
              return this.items;
            };
            /**
             * Checks if the specified item is part of this selector.
             * @param key the key of the item to check
             * @returns {boolean} true if the item is part of this selector, else false
             */
            ListSelector.prototype.hasItem = function (key) {
              return this.getItemIndex(key) > -1;
            };
            /**
             * Adds an item to this selector by doing a sorted insert or by appending the element to the end of the list of items.
             * If an item with the specified key already exists, it is replaced.
             * @param key the key of the item to add
             * @param label the (human-readable) label of the item to add
             * @param sortedInsert whether the item should be added respecting the order of keys
             * @param ariaLabel custom aria label for the listItem
             */
            ListSelector.prototype.addItem = function (
              key,
              label,
              sortedInsert,
              ariaLabel
            ) {
              if (sortedInsert === void 0) {
                sortedInsert = false;
              }
              if (ariaLabel === void 0) {
                ariaLabel = "";
              }
              var listItem = __assign(
                { key: key, label: i18n_1.i18n.performLocalization(label) },
                ariaLabel && { ariaLabel: ariaLabel }
              );
              // Apply filter function
              if (this.config.filter && !this.config.filter(listItem)) {
                return;
              }
              // Apply translator function
              if (this.config.translator) {
                listItem.label = this.config.translator(listItem);
              }
              // Try to remove key first to get overwrite behavior and avoid duplicate keys
              this.removeItem(key); // This will trigger an ItemRemoved and an ItemAdded event
              // Add the item to the list
              if (sortedInsert) {
                var index = this.items.findIndex(function (entry) {
                  return entry.key > key;
                });
                if (index < 0) {
                  this.items.push(listItem);
                } else {
                  this.items.splice(index, 0, listItem);
                }
              } else {
                this.items.push(listItem);
              }
              this.onItemAddedEvent(key);
            };
            /**
             * Removes an item from this selector.
             * @param key the key of the item to remove
             * @returns {boolean} true if removal was successful, false if the item is not part of this selector
             */
            ListSelector.prototype.removeItem = function (key) {
              var index = this.getItemIndex(key);
              if (index > -1) {
                arrayutils_1.ArrayUtils.remove(this.items, this.items[index]);
                this.onItemRemovedEvent(key);
                return true;
              }
              return false;
            };
            /**
             * Selects an item from the items in this selector.
             * @param key the key of the item to select
             * @returns {boolean} true is the selection was successful, false if the selected item is not part of the selector
             */
            ListSelector.prototype.selectItem = function (key) {
              if (key === this.selectedItem) {
                // itemConfig is already selected, suppress any further action
                return true;
              }
              var index = this.getItemIndex(key);
              if (index > -1) {
                this.selectedItem = key;
                this.onItemSelectedEvent(key);
                return true;
              }
              return false;
            };
            /**
             * Returns the key of the selected item.
             * @returns {string} the key of the selected item or null if no item is selected
             */
            ListSelector.prototype.getSelectedItem = function () {
              return this.selectedItem;
            };
            /**
             * Returns the items for the given key or undefined if no item with the given key exists.
             * @param key the key of the item to return
             * @returns {ListItem} the item with the requested key. Undefined if no item with the given key exists.
             */
            ListSelector.prototype.getItemForKey = function (key) {
              return this.items.find(function (item) {
                return item.key === key;
              });
            };
            /**
             * Synchronize the current items of this selector with the given ones. This will remove and add items selectively.
             * For each removed item the ItemRemovedEvent and for each added item the ItemAddedEvent will be triggered. Favour
             * this method over using clearItems and adding all items again afterwards.
             * @param newItems
             */
            ListSelector.prototype.synchronizeItems = function (newItems) {
              var _this = this;
              newItems
                .filter(function (item) {
                  return !_this.hasItem(item.key);
                })
                .forEach(function (item) {
                  return _this.addItem(
                    item.key,
                    item.label,
                    item.sortedInsert,
                    item.ariaLabel
                  );
                });
              this.items
                .filter(function (item) {
                  return (
                    newItems.filter(function (i) {
                      return i.key === item.key;
                    }).length === 0
                  );
                })
                .forEach(function (item) {
                  return _this.removeItem(item.key);
                });
            };
            /**
             * Removes all items from this selector.
             */
            ListSelector.prototype.clearItems = function () {
              // local copy for iteration after clear
              var items = this.items;
              // clear items
              this.items = [];
              // clear the selection as the selected item is also removed
              this.selectedItem = null;
              // fire events
              for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                this.onItemRemovedEvent(item.key);
              }
            };
            /**
             * Returns the number of items in this selector.
             * @returns {number}
             */
            ListSelector.prototype.itemCount = function () {
              return Object.keys(this.items).length;
            };
            ListSelector.prototype.onItemAddedEvent = function (key) {
              this.listSelectorEvents.onItemAdded.dispatch(this, key);
            };
            ListSelector.prototype.onItemRemovedEvent = function (key) {
              this.listSelectorEvents.onItemRemoved.dispatch(this, key);
            };
            ListSelector.prototype.onItemSelectedEvent = function (key) {
              this.listSelectorEvents.onItemSelected.dispatch(this, key);
            };
            Object.defineProperty(ListSelector.prototype, "onItemAdded", {
              /**
               * Gets the event that is fired when an item is added to the list of items.
               * @returns {Event<ListSelector<Config>, string>}
               */
              get: function () {
                return this.listSelectorEvents.onItemAdded.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(ListSelector.prototype, "onItemRemoved", {
              /**
               * Gets the event that is fired when an item is removed from the list of items.
               * @returns {Event<ListSelector<Config>, string>}
               */
              get: function () {
                return this.listSelectorEvents.onItemRemoved.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(ListSelector.prototype, "onItemSelected", {
              /**
               * Gets the event that is fired when an item is selected from the list of items.
               * @returns {Event<ListSelector<Config>, string>}
               */
              get: function () {
                return this.listSelectorEvents.onItemSelected.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            return ListSelector;
          })(component_1.Component);
          exports.ListSelector = ListSelector;
        },
        {
          "../arrayutils": 1,
          "../eventdispatcher": 88,
          "../localization/i18n": 93,
          "./component": 18,
        },
      ],
      36: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.MetadataLabel = exports.MetadataLabelContent = void 0;
          var label_1 = require("./label");
          /**
           * Enumerates the types of content that the {@link MetadataLabel} can display.
           */
          var MetadataLabelContent;
          (function (MetadataLabelContent) {
            /**
             * Title of the data source.
             */
            MetadataLabelContent[(MetadataLabelContent["Title"] = 0)] = "Title";
            /**
             * Description fo the data source.
             */
            MetadataLabelContent[(MetadataLabelContent["Description"] = 1)] =
              "Description";
          })(
            (MetadataLabelContent =
              exports.MetadataLabelContent ||
              (exports.MetadataLabelContent = {}))
          );
          /**
           * A label that can be configured to display certain metadata.
           */
          var MetadataLabel = /** @class */ (function (_super) {
            __extends(MetadataLabel, _super);
            function MetadataLabel(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: [
                    "label-metadata",
                    "label-metadata-" +
                      MetadataLabelContent[config.content].toLowerCase(),
                  ],
                },
                _this.config
              );
              return _this;
            }
            MetadataLabel.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              var uiconfig = uimanager.getConfig();
              var init = function () {
                switch (config.content) {
                  case MetadataLabelContent.Title:
                    _this.setText(uiconfig.metadata.title);
                    break;
                  case MetadataLabelContent.Description:
                    _this.setText(uiconfig.metadata.description);
                    break;
                }
              };
              var unload = function () {
                _this.setText(null);
              };
              // Init label
              init();
              // Clear labels when source is unloaded
              player.on(player.exports.PlayerEvent.SourceUnloaded, unload);
              uimanager.getConfig().events.onUpdated.subscribe(init);
            };
            return MetadataLabel;
          })(label_1.Label);
          exports.MetadataLabel = MetadataLabel;
        },
        { "./label": 33 },
      ],
      37: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.PictureInPictureToggleButton = void 0;
          var togglebutton_1 = require("./togglebutton");
          var i18n_1 = require("../localization/i18n");
          /**
           * A button that toggles Apple macOS picture-in-picture mode.
           */
          var PictureInPictureToggleButton = /** @class */ (function (_super) {
            __extends(PictureInPictureToggleButton, _super);
            function PictureInPictureToggleButton(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-piptogglebutton",
                  text: i18n_1.i18n.getLocalizer("pictureInPicture"),
                },
                _this.config
              );
              return _this;
            }
            PictureInPictureToggleButton.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var isPictureInPictureAvailable = function () {
                return player.isViewModeAvailable(
                  player.exports.ViewMode.PictureInPicture
                );
              };
              var pictureInPictureStateHandler = function () {
                player.getViewMode() ===
                player.exports.ViewMode.PictureInPicture
                  ? _this.on()
                  : _this.off();
              };
              var pictureInPictureAvailabilityChangedHandler = function () {
                isPictureInPictureAvailable() ? _this.show() : _this.hide();
              };
              player.on(
                player.exports.PlayerEvent.ViewModeChanged,
                pictureInPictureStateHandler
              );
              // Available only in our native SDKs for now
              if (player.exports.PlayerEvent.ViewModeAvailabilityChanged) {
                player.on(
                  player.exports.PlayerEvent.ViewModeAvailabilityChanged,
                  pictureInPictureAvailabilityChangedHandler
                );
              }
              uimanager
                .getConfig()
                .events.onUpdated.subscribe(
                  pictureInPictureAvailabilityChangedHandler
                );
              this.onClick.subscribe(function () {
                if (!isPictureInPictureAvailable()) {
                  if (console) {
                    console.log("PIP unavailable");
                  }
                  return;
                }
                var targetViewMode =
                  player.getViewMode() ===
                  player.exports.ViewMode.PictureInPicture
                    ? player.exports.ViewMode.Inline
                    : player.exports.ViewMode.PictureInPicture;
                player.setViewMode(targetViewMode);
              });
              // Startup init
              pictureInPictureAvailabilityChangedHandler(); // Hide button if PIP not available
              pictureInPictureStateHandler();
            };
            return PictureInPictureToggleButton;
          })(togglebutton_1.ToggleButton);
          exports.PictureInPictureToggleButton = PictureInPictureToggleButton;
        },
        { "../localization/i18n": 93, "./togglebutton": 76 },
      ],
      38: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.PlaybackSpeedSelectBox = void 0;
          var selectbox_1 = require("./selectbox");
          var i18n_1 = require("../localization/i18n");
          /**
           * A select box providing a selection of different playback speeds.
           */
          var PlaybackSpeedSelectBox = /** @class */ (function (_super) {
            __extends(PlaybackSpeedSelectBox, _super);
            function PlaybackSpeedSelectBox(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.defaultPlaybackSpeeds = [0.25, 0.5, 1, 1.5, 2];
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-playbackspeedselectbox"],
                },
                _this.config
              );
              return _this;
            }
            PlaybackSpeedSelectBox.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.addDefaultItems();
              this.onItemSelected.subscribe(function (sender, value) {
                player.setPlaybackSpeed(parseFloat(value));
                _this.selectItem(value);
              });
              var setDefaultValue = function () {
                var playbackSpeed = player.getPlaybackSpeed();
                _this.setSpeed(playbackSpeed);
              };
              player.on(
                player.exports.PlayerEvent.PlaybackSpeedChanged,
                setDefaultValue
              );
              uimanager.getConfig().events.onUpdated.subscribe(setDefaultValue);
            };
            PlaybackSpeedSelectBox.prototype.setSpeed = function (speed) {
              if (!this.selectItem(String(speed))) {
                // a playback speed was set which is not in the list, add it to the list to show it to the user
                this.clearItems();
                this.addDefaultItems([speed]);
                this.selectItem(String(speed));
              }
            };
            PlaybackSpeedSelectBox.prototype.addDefaultItems = function (
              customItems
            ) {
              var _this = this;
              if (customItems === void 0) {
                customItems = [];
              }
              var sortedSpeeds = this.defaultPlaybackSpeeds
                .concat(customItems)
                .sort();
              sortedSpeeds.forEach(function (element) {
                if (element !== 1) {
                  _this.addItem(String(element), "".concat(element, "x"));
                } else {
                  _this.addItem(
                    String(element),
                    i18n_1.i18n.getLocalizer("normal")
                  );
                }
              });
            };
            PlaybackSpeedSelectBox.prototype.clearItems = function () {
              this.items = [];
              this.selectedItem = null;
            };
            return PlaybackSpeedSelectBox;
          })(selectbox_1.SelectBox);
          exports.PlaybackSpeedSelectBox = PlaybackSpeedSelectBox;
        },
        { "../localization/i18n": 93, "./selectbox": 48 },
      ],
      39: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.PlaybackTimeLabel = exports.PlaybackTimeLabelMode = void 0;
          var label_1 = require("./label");
          var playerutils_1 = require("../playerutils");
          var stringutils_1 = require("../stringutils");
          var i18n_1 = require("../localization/i18n");
          var PlaybackTimeLabelMode;
          (function (PlaybackTimeLabelMode) {
            /**
             * Displays the current time
             */
            PlaybackTimeLabelMode[(PlaybackTimeLabelMode["CurrentTime"] = 0)] =
              "CurrentTime";
            /**
             * Displays the duration of the content
             */
            PlaybackTimeLabelMode[(PlaybackTimeLabelMode["TotalTime"] = 1)] =
              "TotalTime";
            /**
             * Displays the current time and the duration of the content
             * Format: ${currentTime} / ${totalTime}
             */
            PlaybackTimeLabelMode[
              (PlaybackTimeLabelMode["CurrentAndTotalTime"] = 2)
            ] = "CurrentAndTotalTime";
            /**
             * Displays the remaining time of the content
             */
            PlaybackTimeLabelMode[
              (PlaybackTimeLabelMode["RemainingTime"] = 3)
            ] = "RemainingTime";
          })(
            (PlaybackTimeLabelMode =
              exports.PlaybackTimeLabelMode ||
              (exports.PlaybackTimeLabelMode = {}))
          );
          /**
           * A label that display the current playback time and the total time through {@link PlaybackTimeLabel#setTime setTime}
           * or any string through {@link PlaybackTimeLabel#setText setText}.
           */
          var PlaybackTimeLabel = /** @class */ (function (_super) {
            __extends(PlaybackTimeLabel, _super);
            function PlaybackTimeLabel(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-playbacktimelabel",
                  timeLabelMode: PlaybackTimeLabelMode.CurrentAndTotalTime,
                  hideInLivePlayback: false,
                },
                _this.config
              );
              return _this;
            }
            PlaybackTimeLabel.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              var live = false;
              var liveCssClass = this.prefixCss("ui-playbacktimelabel-live");
              var liveEdgeCssClass = this.prefixCss(
                "ui-playbacktimelabel-live-edge"
              );
              var minWidth = 0;
              var liveClickHandler = function () {
                player.timeShift(0);
              };
              var updateLiveState = function () {
                // Player is playing a live stream when the duration is infinite
                live = player.isLive();
                // Attach/detach live marker class
                if (live) {
                  _this.getDomElement().addClass(liveCssClass);
                  _this.setText(i18n_1.i18n.getLocalizer("live"));
                  if (config.hideInLivePlayback) {
                    _this.hide();
                  }
                  _this.onClick.subscribe(liveClickHandler);
                  updateLiveTimeshiftState();
                } else {
                  _this.getDomElement().removeClass(liveCssClass);
                  _this.getDomElement().removeClass(liveEdgeCssClass);
                  _this.show();
                  _this.onClick.unsubscribe(liveClickHandler);
                }
              };
              var updateLiveTimeshiftState = function () {
                if (!live) {
                  return;
                }
                // The player is only at the live edge iff the stream is not shifted and it is actually playing or playback has
                // never been started (meaning it isn't paused). A player that is paused is always behind the live edge.
                // An exception is made for live streams without a timeshift window, because here we "stop" playback instead
                // of pausing it (from a UI perspective), so we keep the live edge indicator on because a play would always
                // resume at the live edge.
                var isTimeshifted = player.getTimeShift() < 0;
                var isTimeshiftAvailable = player.getMaxTimeShift() < 0;
                if (
                  !isTimeshifted &&
                  (!player.isPaused() || !isTimeshiftAvailable)
                ) {
                  _this.getDomElement().addClass(liveEdgeCssClass);
                } else {
                  _this.getDomElement().removeClass(liveEdgeCssClass);
                }
              };
              var liveStreamDetector =
                new playerutils_1.PlayerUtils.LiveStreamDetector(
                  player,
                  uimanager
                );
              liveStreamDetector.onLiveChanged.subscribe(function (
                sender,
                args
              ) {
                live = args.live;
                updateLiveState();
              });
              liveStreamDetector.detect(); // Initial detection
              var playbackTimeHandler = function () {
                if (!live && player.getDuration() !== Infinity) {
                  _this.setTime(
                    playerutils_1.PlayerUtils.getCurrentTimeRelativeToSeekableRange(
                      player
                    ),
                    player.getDuration()
                  );
                }
                // To avoid 'jumping' in the UI by varying label sizes due to non-monospaced fonts,
                // we gradually increase the min-width with the content to reach a stable size.
                var width = _this.getDomElement().width();
                if (width > minWidth) {
                  minWidth = width;
                  _this.getDomElement().css({
                    "min-width": minWidth + "px",
                  });
                }
              };
              var updateTimeFormatBasedOnDuration = function () {
                // Set time format depending on source duration
                _this.timeFormat =
                  Math.abs(
                    player.isLive()
                      ? player.getMaxTimeShift()
                      : player.getDuration()
                  ) >= 3600
                    ? stringutils_1.StringUtils.FORMAT_HHMMSS
                    : stringutils_1.StringUtils.FORMAT_MMSS;

                playbackTimeHandler();
              };
              player.on(
                player.exports.PlayerEvent.TimeChanged,
                playbackTimeHandler
              );
              player.on(
                player.exports.PlayerEvent.Ready,
                updateTimeFormatBasedOnDuration
              );
              player.on(player.exports.PlayerEvent.Seeked, playbackTimeHandler);
              player.on(
                player.exports.PlayerEvent.TimeShift,
                updateLiveTimeshiftState
              );
              player.on(
                player.exports.PlayerEvent.TimeShifted,
                updateLiveTimeshiftState
              );
              player.on(
                player.exports.PlayerEvent.Playing,
                updateLiveTimeshiftState
              );
              player.on(
                player.exports.PlayerEvent.Paused,
                updateLiveTimeshiftState
              );
              player.on(
                player.exports.PlayerEvent.StallStarted,
                updateLiveTimeshiftState
              );
              player.on(
                player.exports.PlayerEvent.StallEnded,
                updateLiveTimeshiftState
              );
              var init = function () {
                // Reset min-width when a new source is ready (especially for switching VOD/Live modes where the label content
                // changes)
                minWidth = 0;
                _this.getDomElement().css({
                  "min-width": null,
                });
                updateTimeFormatBasedOnDuration();
              };
              uimanager.getConfig().events.onUpdated.subscribe(init);
              init();
            };
            /**
             * Sets the current playback time and total duration.
             * @param playbackSeconds the current playback time in seconds
             * @param durationSeconds the total duration in seconds
             */
            PlaybackTimeLabel.prototype.setTime = function (
              playbackSeconds,
              durationSeconds
            ) {
              var currentTime = stringutils_1.StringUtils.secondsToTime(
                playbackSeconds,
                this.timeFormat
              );
              var totalTime = stringutils_1.StringUtils.secondsToTime(
                durationSeconds,
                this.timeFormat
              );
              switch (this.config.timeLabelMode) {
                case PlaybackTimeLabelMode.CurrentTime:
                  this.setText("".concat(currentTime));
                  break;
                case PlaybackTimeLabelMode.TotalTime:
                  this.setText("".concat(totalTime));
                  break;
                case PlaybackTimeLabelMode.CurrentAndTotalTime:
                  this.setText("".concat(currentTime, " / ").concat(totalTime));
                  break;
                case PlaybackTimeLabelMode.RemainingTime:
                  var remainingTime = stringutils_1.StringUtils.secondsToTime(
                    durationSeconds - playbackSeconds,
                    this.timeFormat
                  );
                  this.setText("".concat(remainingTime));
                  break;
              }
            };
            /**
             * Sets the current time format
             * @param timeFormat the time format
             */
            PlaybackTimeLabel.prototype.setTimeFormat = function (timeFormat) {
              this.timeFormat = timeFormat;
            };
            return PlaybackTimeLabel;
          })(label_1.Label);
          exports.PlaybackTimeLabel = PlaybackTimeLabel;
        },
        {
          "../localization/i18n": 93,
          "../playerutils": 99,
          "../stringutils": 112,
          "./label": 33,
        },
      ],
      40: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.PlaybackToggleButton = void 0;
          var togglebutton_1 = require("./togglebutton");
          var playerutils_1 = require("../playerutils");
          var i18n_1 = require("../localization/i18n");
          /**
           * A button that toggles between playback and pause.
           */
          var PlaybackToggleButton = (exports.PlaybackToggleButton =
            /** @class */ (function (_super) {
              __extends(PlaybackToggleButton, _super);
              function PlaybackToggleButton(config) {
                if (config === void 0) {
                  config = {};
                }
                var _this = _super.call(this, config) || this;
                _this.config = _this.mergeConfig(
                  config,
                  {
                    cssClass: "ui-playbacktogglebutton",
                    text: i18n_1.i18n.getLocalizer("play"),
                    onAriaLabel: i18n_1.i18n.getLocalizer("pause"),
                    offAriaLabel: i18n_1.i18n.getLocalizer("play"),
                  },
                  _this.config
                );
                _this.isPlayInitiated = false;
                return _this;
              }
              PlaybackToggleButton.prototype.configure = function (
                player,
                uimanager,
                handleClickEvent
              ) {
                var _this = this;
                if (handleClickEvent === void 0) {
                  handleClickEvent = true;
                }
                _super.prototype.configure.call(this, player, uimanager);
                // Set enterFullscreenOnInitialPlayback if set in the uimanager config
                if (
                  typeof uimanager.getConfig()
                    .enterFullscreenOnInitialPlayback === "boolean"
                ) {
                  this.config.enterFullscreenOnInitialPlayback =
                    uimanager.getConfig().enterFullscreenOnInitialPlayback;
                }
                var isSeeking = false;
                var firstPlay = true;
                // Handler to update button state based on player state
                var playbackStateHandler = function () {
                  // If the UI is currently seeking, playback is temporarily stopped but the buttons should
                  // not reflect that and stay as-is (e.g indicate playback while seeking).
                  if (isSeeking) {
                    return;
                  }
                  if (player.isPlaying() || _this.isPlayInitiated) {
                    _this.on();
                  } else {
                    _this.off();
                  }
                };
                // Call handler upon these events
                player.on(player.exports.PlayerEvent.Play, function (e) {
                  _this.isPlayInitiated = true;
                  firstPlay = false;
                  playbackStateHandler();
                });
                player.on(player.exports.PlayerEvent.Paused, function (e) {
                  _this.isPlayInitiated = false;
                  playbackStateHandler();
                });
                player.on(player.exports.PlayerEvent.Playing, function (e) {
                  _this.isPlayInitiated = false;
                  playbackStateHandler();
                });
                // after unloading + loading a new source, the player might be in a different playing state (from playing into stopped)
                player.on(
                  player.exports.PlayerEvent.SourceLoaded,
                  playbackStateHandler
                );
                uimanager
                  .getConfig()
                  .events.onUpdated.subscribe(playbackStateHandler);
                player.on(
                  player.exports.PlayerEvent.SourceUnloaded,
                  playbackStateHandler
                );
                // when playback finishes, player turns to paused mode
                player.on(
                  player.exports.PlayerEvent.PlaybackFinished,
                  playbackStateHandler
                );
                player.on(
                  player.exports.PlayerEvent.CastStarted,
                  playbackStateHandler
                );
                // When a playback attempt is rejected with warning 5008, we switch the button state back to off
                // This is required for blocked autoplay, because there is no Paused event in such case
                player.on(player.exports.PlayerEvent.Warning, function (event) {
                  if (
                    event.code ===
                    player.exports.WarningCode.PLAYBACK_COULD_NOT_BE_STARTED
                  ) {
                    _this.isPlayInitiated = false;
                    firstPlay = true;
                    _this.off();
                  }
                });
                var updateLiveState = function () {
                  var showStopToggle =
                    player.isLive() &&
                    !playerutils_1.PlayerUtils.isTimeShiftAvailable(player);
                  if (showStopToggle) {
                    _this
                      .getDomElement()
                      .addClass(
                        _this.prefixCss(PlaybackToggleButton.CLASS_STOPTOGGLE)
                      );
                  } else {
                    _this
                      .getDomElement()
                      .removeClass(
                        _this.prefixCss(PlaybackToggleButton.CLASS_STOPTOGGLE)
                      );
                  }
                };
                // Detect absence of timeshifting on live streams and add tagging class to convert button icons to play/stop
                var timeShiftDetector =
                  new playerutils_1.PlayerUtils.TimeShiftAvailabilityDetector(
                    player
                  );
                var liveStreamDetector =
                  new playerutils_1.PlayerUtils.LiveStreamDetector(
                    player,
                    uimanager
                  );
                timeShiftDetector.onTimeShiftAvailabilityChanged.subscribe(
                  function () {
                    return updateLiveState();
                  }
                );
                liveStreamDetector.onLiveChanged.subscribe(function () {
                  return updateLiveState();
                });
                timeShiftDetector.detect(); // Initial detection
                liveStreamDetector.detect();
                if (handleClickEvent) {
                  // Control player by button events
                  // When a button event triggers a player API call, events are fired which in turn call the event handler
                  // above that updated the button state.
                  this.onClick.subscribe(function () {
                    if (player.isPlaying() || _this.isPlayInitiated) {
                      player.pause("ui");
                    } else {
                      player.play("ui");
                      if (
                        firstPlay &&
                        _this.config.enterFullscreenOnInitialPlayback
                      ) {
                        player.setViewMode(player.exports.ViewMode.Fullscreen);
                      }
                    }
                  });
                }
                // Track UI seeking status
                uimanager.onSeek.subscribe(function () {
                  isSeeking = true;
                });
                uimanager.onSeeked.subscribe(function () {
                  isSeeking = false;
                });
                // Startup init
                playbackStateHandler();
              };
              PlaybackToggleButton.CLASS_STOPTOGGLE = "stoptoggle";
              return PlaybackToggleButton;
            })(togglebutton_1.ToggleButton));
        },
        {
          "../localization/i18n": 93,
          "../playerutils": 99,
          "./togglebutton": 76,
        },
      ],
      41: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.PlaybackToggleOverlay = void 0;
          var container_1 = require("./container");
          var hugeplaybacktogglebutton_1 = require("./hugeplaybacktogglebutton");
          /**
           * Overlays the player and displays error messages.
           */
          var PlaybackToggleOverlay = /** @class */ (function (_super) {
            __extends(PlaybackToggleOverlay, _super);
            function PlaybackToggleOverlay(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.playbackToggleButton =
                new hugeplaybacktogglebutton_1.HugePlaybackToggleButton({
                  enterFullscreenOnInitialPlayback: Boolean(
                    config.enterFullscreenOnInitialPlayback
                  ),
                });
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-playbacktoggle-overlay",
                  components: [_this.playbackToggleButton],
                },
                _this.config
              );
              return _this;
            }
            return PlaybackToggleOverlay;
          })(container_1.Container);
          exports.PlaybackToggleOverlay = PlaybackToggleOverlay;
        },
        { "./container": 19, "./hugeplaybacktogglebutton": 30 },
      ],
      42: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.RecommendationOverlay = void 0;
          var container_1 = require("./container");
          var component_1 = require("./component");
          var dom_1 = require("../dom");
          var stringutils_1 = require("../stringutils");
          var hugereplaybutton_1 = require("./hugereplaybutton");
          /**
           * Overlays the player and displays recommended videos.
           */
          var RecommendationOverlay = /** @class */ (function (_super) {
            __extends(RecommendationOverlay, _super);
            function RecommendationOverlay(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.replayButton = new hugereplaybutton_1.HugeReplayButton();
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-recommendation-overlay",
                  hidden: true,
                  components: [_this.replayButton],
                },
                _this.config
              );
              return _this;
            }
            RecommendationOverlay.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var clearRecommendations = function () {
                for (
                  var _i = 0, _a = _this.getComponents().slice();
                  _i < _a.length;
                  _i++
                ) {
                  var component = _a[_i];
                  if (component instanceof RecommendationItem) {
                    _this.removeComponent(component);
                  }
                }
                _this.updateComponents();
                _this
                  .getDomElement()
                  .removeClass(_this.prefixCss("recommendations"));
              };
              var setupRecommendations = function () {
                clearRecommendations();
                var recommendations = uimanager.getConfig().recommendations;
                if (recommendations.length > 0) {
                  var index = 1;
                  for (
                    var _i = 0, recommendations_1 = recommendations;
                    _i < recommendations_1.length;
                    _i++
                  ) {
                    var item = recommendations_1[_i];
                    _this.addComponent(
                      new RecommendationItem({
                        itemConfig: item,
                        cssClasses: ["recommendation-item-" + index++],
                      })
                    );
                  }
                  _this.updateComponents(); // create container DOM elements
                  _this
                    .getDomElement()
                    .addClass(_this.prefixCss("recommendations"));
                }
              };
              uimanager
                .getConfig()
                .events.onUpdated.subscribe(setupRecommendations);
              // Remove recommendations and hide overlay when source is unloaded
              player.on(player.exports.PlayerEvent.SourceUnloaded, function () {
                clearRecommendations();
                _this.hide();
              });
              // Display recommendations when playback has finished
              player.on(
                player.exports.PlayerEvent.PlaybackFinished,
                function () {
                  _this.show();
                }
              );
              // Hide recommendations when playback starts, e.g. a restart
              player.on(player.exports.PlayerEvent.Play, function () {
                _this.hide();
              });
              // Init on startup
              setupRecommendations();
            };
            return RecommendationOverlay;
          })(container_1.Container);
          exports.RecommendationOverlay = RecommendationOverlay;
          /**
           * An item of the {@link RecommendationOverlay}. Used only internally in {@link RecommendationOverlay}.
           */
          var RecommendationItem = /** @class */ (function (_super) {
            __extends(RecommendationItem, _super);
            function RecommendationItem(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-recommendation-item",
                  itemConfig: null, // this must be passed in from outside
                },
                _this.config
              );
              return _this;
            }
            RecommendationItem.prototype.toDomElement = function () {
              var config = this.config.itemConfig;
              var itemElement = new dom_1.DOM("a", {
                id: this.config.id,
                class: this.getCssClasses(),
                href: config.url,
              }).css({
                "background-image": "url(".concat(config.thumbnail, ")"),
              });
              var bgElement = new dom_1.DOM("div", {
                class: this.prefixCss("background"),
              });
              itemElement.append(bgElement);
              var titleElement = new dom_1.DOM("span", {
                class: this.prefixCss("title"),
              }).append(
                new dom_1.DOM("span", {
                  class: this.prefixCss("innertitle"),
                }).html(config.title)
              );
              itemElement.append(titleElement);
              var timeElement = new dom_1.DOM("span", {
                class: this.prefixCss("duration"),
              }).append(
                new dom_1.DOM("span", {
                  class: this.prefixCss("innerduration"),
                }).html(
                  config.duration
                    ? stringutils_1.StringUtils.secondsToTime(config.duration)
                    : ""
                )
              );
              itemElement.append(timeElement);
              return itemElement;
            };
            return RecommendationItem;
          })(component_1.Component);
        },
        {
          "../dom": 86,
          "../stringutils": 112,
          "./component": 18,
          "./container": 19,
          "./hugereplaybutton": 31,
        },
      ],
      43: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.ReplayButton = void 0;
          var button_1 = require("./button");
          var i18n_1 = require("../localization/i18n");
          var playerutils_1 = require("../playerutils");
          /**
           * A button to play/replay a video.
           */
          var ReplayButton = /** @class */ (function (_super) {
            __extends(ReplayButton, _super);
            function ReplayButton(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-replaybutton",
                  text: i18n_1.i18n.getLocalizer("replay"),
                },
                _this.config
              );
              return _this;
            }
            ReplayButton.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              if (player.isLive()) {
                this.hide();
              }
              var liveStreamDetector =
                new playerutils_1.PlayerUtils.LiveStreamDetector(
                  player,
                  uimanager
                );
              liveStreamDetector.onLiveChanged.subscribe(function (
                sender,
                args
              ) {
                if (args.live) {
                  _this.hide();
                } else {
                  _this.show();
                }
              });
              this.onClick.subscribe(function () {
                if (!player.hasEnded()) {
                  player.seek(0);
                  // Not calling `play` will keep the play/pause state as is
                } else {
                  // If playback has already ended, calling `play` will automatically restart from the beginning
                  player.play("ui");
                }
              });
            };
            return ReplayButton;
          })(button_1.Button);
          exports.ReplayButton = ReplayButton;
        },
        { "../localization/i18n": 93, "../playerutils": 99, "./button": 12 },
      ],
      44: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SeekBar = void 0;
          var groupplaybackapi_1 = require("./../groupplaybackapi");
          var component_1 = require("./component");
          var dom_1 = require("../dom");
          var eventdispatcher_1 = require("../eventdispatcher");
          var timeout_1 = require("../timeout");
          var playerutils_1 = require("../playerutils");
          var stringutils_1 = require("../stringutils");
          var seekbarcontroller_1 = require("./seekbarcontroller");
          var i18n_1 = require("../localization/i18n");
          var browserutils_1 = require("../browserutils");
          var timelinemarkershandler_1 = require("./timelinemarkershandler");
          var seekbarbufferlevel_1 = require("./seekbarbufferlevel");
          /**
           * A seek bar to seek within the player's media. It displays the current playback position, amount of buffed data, seek
           * target, and keeps status about an ongoing seek.
           *
           * The seek bar displays different 'bars':
           *  - the playback position, i.e. the position in the media at which the player current playback pointer is positioned
           *  - the buffer position, which usually is the playback position plus the time span that is already buffered ahead
           *  - the seek position, used to preview to where in the timeline a seek will jump to
           */
          var SeekBar = (exports.SeekBar = /** @class */ (function (_super) {
            __extends(SeekBar, _super);
            function SeekBar(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              /**
               * Buffer of the the current playback position. The position must be buffered in case the element
               * needs to be refreshed with {@link #refreshPlaybackPosition}.
               * @type {number}
               */
              _this.playbackPositionPercentage = 0;
              _this.isUserSeeking = false;
              _this.seekBarEvents = {
                /**
                 * Fired when a scrubbing seek operation is started.
                 */
                onSeek: new eventdispatcher_1.EventDispatcher(),
                /**
                 * Fired during a scrubbing seek to indicate that the seek preview (i.e. the video frame) should be updated.
                 */
                onSeekPreview: new eventdispatcher_1.EventDispatcher(),
                /**
                 * Fired when a scrubbing seek has finished or when a direct seek is issued.
                 */
                onSeeked: new eventdispatcher_1.EventDispatcher(),
              };
              _this.seekWhileScrubbing = function (sender, args) {
                if (args.scrubbing) {
                  _this.seek(args.position);
                }
              };
              _this.getTargetSeekPosition = function (percentage) {
                var target;
                if (_this.player.isLive()) {
                  var maxTimeShift = _this.player.getMaxTimeShift();
                  target = maxTimeShift - maxTimeShift * (percentage / 100);
                } else {
                  var seekableRangeStart =
                    playerutils_1.PlayerUtils.getSeekableRangeStart(
                      _this.player,
                      0
                    );
                  var relativeSeekTarget =
                    _this.player.getDuration() * (percentage / 100);
                  target = relativeSeekTarget + seekableRangeStart;
                }
                return target;
              };
              _this.seek = function (percentage) {
                var targetPlaybackPosition =
                  _this.getTargetSeekPosition(percentage);
                if (_this.player.isLive()) {
                  _this.player.timeShift(targetPlaybackPosition, "ui");
                } else {
                  _this.player.seek(targetPlaybackPosition, "ui");
                }
              };
              var keyStepIncrements = _this.config.keyStepIncrements || {
                leftRight: 1,
                upDown: 5,
              };
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-seekbar",
                  vertical: false,
                  smoothPlaybackPositionUpdateIntervalMs: 50,
                  keyStepIncrements: keyStepIncrements,
                  ariaLabel: i18n_1.i18n.getLocalizer("seekBar"),
                  tabIndex: 0,
                  snappingRange: 1,
                  enableSeekPreview: true,
                },
                _this.config
              );
              _this.label = _this.config.label;
              return _this;
            }
            SeekBar.prototype.initialize = function () {
              _super.prototype.initialize.call(this);
              if (this.hasLabel()) {
                this.getLabel().initialize();
              }
            };
            SeekBar.prototype.setAriaSliderMinMax = function (min, max) {
              this.getDomElement().attr("aria-valuemin", min);
              this.getDomElement().attr("aria-valuemax", max);
            };
            SeekBar.prototype.setAriaSliderValues = function () {
              if (this.seekBarType === seekbarcontroller_1.SeekBarType.Live) {
                var timeshiftValue = Math.ceil(
                  this.player.getTimeShift()
                ).toString();
                this.getDomElement().attr("aria-valuenow", timeshiftValue);
                this.getDomElement().attr(
                  "aria-valuetext",
                  ""
                    .concat(
                      i18n_1.i18n.performLocalization(
                        i18n_1.i18n.getLocalizer("seekBar.timeshift")
                      ),
                      " "
                    )
                    .concat(
                      i18n_1.i18n.performLocalization(
                        i18n_1.i18n.getLocalizer("seekBar.value")
                      ),
                      ": "
                    )
                    .concat(timeshiftValue)
                );
              } else if (
                this.seekBarType === seekbarcontroller_1.SeekBarType.Vod
              ) {
                var ariaValueText = ""
                  .concat(
                    stringutils_1.StringUtils.secondsToText(
                      this.player.getCurrentTime()
                    ),
                    " "
                  )
                  .concat(
                    i18n_1.i18n.performLocalization(
                      i18n_1.i18n.getLocalizer("seekBar.durationText")
                    ),
                    " "
                  )
                  .concat(
                    stringutils_1.StringUtils.secondsToText(
                      this.player.getDuration()
                    )
                  );
                this.getDomElement().attr(
                  "aria-valuenow",
                  Math.floor(this.player.getCurrentTime()).toString()
                );
                this.getDomElement().attr("aria-valuetext", ariaValueText);
              }
            };
            SeekBar.prototype.getPlaybackPositionPercentage = function () {
              if (this.player.isLive()) {
                return (
                  100 -
                  (100 / this.player.getMaxTimeShift()) *
                    this.player.getTimeShift()
                );
              }
              return (
                (100 / this.player.getDuration()) *
                this.getRelativeCurrentTime()
              );
            };
            SeekBar.prototype.updateBufferLevel = function (
              playbackPositionPercentage
            ) {
              var bufferLoadedPercentageLevel;
              if (this.player.isLive()) {
                // Always show full buffer for live streams
                bufferLoadedPercentageLevel = 100;
              } else {
                bufferLoadedPercentageLevel =
                  playbackPositionPercentage +
                  (0, seekbarbufferlevel_1.getMinBufferLevel)(this.player);
              }
              this.setBufferPosition(bufferLoadedPercentageLevel);
            };
            SeekBar.prototype.configure = function (
              player,
              uimanager,
              configureSeek
            ) {
              var _this = this;
              if (configureSeek === void 0) {
                configureSeek = true;
              }
              _super.prototype.configure.call(this, player, uimanager);
              this.player = player;
              // Apply scaling transform to the backdrop bar to have all bars rendered similarly
              // (the call must be up here to be executed for the volume slider as well)
              this.setPosition(this.seekBarBackdrop, 100);
              // Add seekbar controls to the seekbar
              var seekBarController = new seekbarcontroller_1.SeekBarController(
                this.config.keyStepIncrements,
                player,
                uimanager.getConfig().volumeController
              );
              seekBarController.setSeekBarControls(
                this.getDomElement(),
                function () {
                  return _this.seekBarType;
                }
              );
              // The configureSeek flag can be used by subclasses to disable configuration as seek bar. E.g. the volume
              // slider is reusing this component but adds its own functionality, and does not need the seek functionality.
              // This is actually a hack, the proper solution would be for both seek bar and volume sliders to extend
              // a common base slider component and implement their functionality there.
              if (!configureSeek) {
                this.seekBarType = seekbarcontroller_1.SeekBarType.Volume;
                return;
              }
              uimanager.onControlsShow.subscribe(function () {
                _this.isUiShown = true;
              });
              uimanager.onControlsHide.subscribe(function () {
                _this.isUiShown = false;
              });
              var isPlaying = false;
              var scrubbing = false;
              var isPlayerSeeking = false;
              var suspension;
              // Update playback and buffer positions
              var playbackPositionHandler = function (event, forceUpdate) {
                if (event === void 0) {
                  event = null;
                }
                if (forceUpdate === void 0) {
                  forceUpdate = false;
                }
                if (_this.isUserSeeking) {
                  // We caught a seek preview seek, do not update the seekbar
                  return;
                }
                var playbackPositionPercentage =
                  _this.getPlaybackPositionPercentage();
                _this.updateBufferLevel(playbackPositionPercentage);
                // The segment request finished is used to help the playback position move, when the smooth playback position is not enabled.
                // At the same time when the user is scrubbing, we also move the position of the seekbar to display a preview during scrubbing.
                // When the user is scrubbing we do not record this as a user seek operation, as the user has yet to finish their seek,
                // but we should not move the playback position to not create a jumping behaviour.
                if (
                  scrubbing &&
                  event &&
                  event.type ===
                    player.exports.PlayerEvent.SegmentRequestFinished &&
                  playbackPositionPercentage !==
                    _this.playbackPositionPercentage
                ) {
                  playbackPositionPercentage = _this.playbackPositionPercentage;
                }
                if (player.isLive()) {
                  if (player.getMaxTimeShift() === 0) {
                    // This case must be explicitly handled to avoid division by zero
                    _this.setPlaybackPosition(100);
                  } else {
                    if (!_this.isSeeking()) {
                      _this.setPlaybackPosition(playbackPositionPercentage);
                    }
                    _this.setAriaSliderMinMax(
                      player.getMaxTimeShift().toString(),
                      "0"
                    );
                  }
                } else {
                  // Update playback position only in paused state or in the initial startup state where player is neither
                  // paused nor playing. Playback updates are handled in the Timeout below.
                  var isInInitialStartupState =
                    _this.config.smoothPlaybackPositionUpdateIntervalMs ===
                      SeekBar.SMOOTH_PLAYBACK_POSITION_UPDATE_DISABLED ||
                    forceUpdate ||
                    player.isPaused();
                  var isNeitherPausedNorPlaying =
                    player.isPaused() === player.isPlaying();
                  if (
                    (isInInitialStartupState || isNeitherPausedNorPlaying) &&
                    !_this.isSeeking()
                  ) {
                    _this.setPlaybackPosition(playbackPositionPercentage);
                  }
                  _this.setAriaSliderMinMax(
                    "0",
                    player.getDuration().toString()
                  );
                }
                if (_this.isUiShown) {
                  _this.setAriaSliderValues();
                }
              };
              // Update seekbar upon these events
              // init playback position when the player is ready
              player.on(
                player.exports.PlayerEvent.Ready,
                playbackPositionHandler
              );
              // update playback position when it changes
              player.on(
                player.exports.PlayerEvent.TimeChanged,
                playbackPositionHandler
              );
              // update bufferlevel when buffering is complete
              player.on(
                player.exports.PlayerEvent.StallEnded,
                playbackPositionHandler
              );
              // update playback position when a timeshift has finished
              player.on(
                player.exports.PlayerEvent.TimeShifted,
                playbackPositionHandler
              );
              // update bufferlevel when a segment has been downloaded
              player.on(
                player.exports.PlayerEvent.SegmentRequestFinished,
                playbackPositionHandler
              );
              this.configureLivePausedTimeshiftUpdater(
                player,
                uimanager,
                playbackPositionHandler
              );
              // Seek handling
              var onPlayerSeek = function () {
                isPlayerSeeking = true;
                _this.setSeeking(true);
                scrubbing = false;
              };
              var onPlayerSeeked = function (event, forceUpdate) {
                if (event === void 0) {
                  event = null;
                }
                if (forceUpdate === void 0) {
                  forceUpdate = false;
                }
                isPlayerSeeking = false;
                _this.setSeeking(false);
                // update playback position when a seek has finished
                playbackPositionHandler(event, forceUpdate);
              };
              var restorePlayingState = function () {
                // Continue playback after seek if player was playing when seek started
                if (isPlaying) {
                  // use the same issuer here as in the pause on seek
                  player.play("ui-seek");
                }
              };
              player.on(player.exports.PlayerEvent.Seek, onPlayerSeek);
              player.on(player.exports.PlayerEvent.Seeked, onPlayerSeeked);
              player.on(player.exports.PlayerEvent.TimeShift, onPlayerSeek);
              player.on(player.exports.PlayerEvent.TimeShifted, onPlayerSeeked);
              var isGroupPlaybackAPIAvailable = function (player) {
                return !!player.groupPlayback;
              };
              this.onSeek.subscribe(function (sender) {
                // track seeking status so we can catch events from seek preview seeks
                _this.isUserSeeking = true;
                // Notify UI manager of started seek
                uimanager.onSeek.dispatch(sender);
                if (
                  isGroupPlaybackAPIAvailable(player) &&
                  player.groupPlayback.hasJoined() &&
                  !suspension
                ) {
                  suspension = player.groupPlayback.beginSuspension(
                    groupplaybackapi_1.GroupPlaybackSuspensionReason
                      .UserIsScrubbing
                  );
                }
                // Save current playback state before performing the seek
                if (!isPlayerSeeking) {
                  isPlaying = player.isPlaying();
                  // Pause playback while seeking
                  if (isPlaying) {
                    // use a different issuer here, as play/pause on seek is not "really" triggerd by the user
                    player.pause("ui-seek");
                  }
                }
              });
              this.onSeekPreview.subscribe(function (sender, args) {
                // Notify UI manager of seek preview
                uimanager.onSeekPreview.dispatch(sender, args);
                scrubbing = args.scrubbing;
              });
              // Set enableSeekPreview if set in the uimanager config
              if (
                typeof uimanager.getConfig().enableSeekPreview === "boolean"
              ) {
                this.config.enableSeekPreview =
                  uimanager.getConfig().enableSeekPreview;
              }
              // Rate-limited scrubbing seek
              if (this.config.enableSeekPreview) {
                this.onSeekPreview.subscribeRateLimited(
                  this.seekWhileScrubbing,
                  200
                );
              }
              this.onSeeked.subscribe(function (sender, percentage) {
                _this.isUserSeeking = false;
                // Do the seek
                _this.seek(percentage);
                // Notify UI manager of finished seek
                uimanager.onSeeked.dispatch(sender);
                // Continue playback after seek if player was playing when seek started
                restorePlayingState();
                if (
                  isGroupPlaybackAPIAvailable(player) &&
                  player.groupPlayback.hasJoined() &&
                  suspension
                ) {
                  var proposedPlaybackTime =
                    _this.getTargetSeekPosition(percentage);
                  player.groupPlayback.endSuspension(suspension, {
                    proposedPlaybackTime: proposedPlaybackTime,
                  });
                  suspension = undefined;
                }
              });
              if (this.hasLabel()) {
                // Configure a seekbar label that is internal to the seekbar)
                this.getLabel().configure(player, uimanager);
              }
              // Hide seekbar for live sources without timeshift
              var isLive = false;
              var hasTimeShift = false;
              var switchVisibility = function (isLive, hasTimeShift) {
                if (isLive && !hasTimeShift) {
                  _this.hide();
                } else {
                  _this.show();
                }
                playbackPositionHandler(null, true);
                _this.refreshPlaybackPosition();
              };
              var liveStreamDetector =
                new playerutils_1.PlayerUtils.LiveStreamDetector(
                  player,
                  uimanager
                );
              liveStreamDetector.onLiveChanged.subscribe(function (
                sender,
                args
              ) {
                isLive = args.live;
                if (isLive && _this.smoothPlaybackPositionUpdater != null) {
                  _this.smoothPlaybackPositionUpdater.clear();
                  _this.seekBarType = seekbarcontroller_1.SeekBarType.Live;
                } else {
                  _this.seekBarType = seekbarcontroller_1.SeekBarType.Vod;
                }
                switchVisibility(isLive, hasTimeShift);
              });
              var timeShiftDetector =
                new playerutils_1.PlayerUtils.TimeShiftAvailabilityDetector(
                  player
                );
              timeShiftDetector.onTimeShiftAvailabilityChanged.subscribe(
                function (sender, args) {
                  hasTimeShift = args.timeShiftAvailable;
                  switchVisibility(isLive, hasTimeShift);
                }
              );
              // Initial detection
              liveStreamDetector.detect();
              timeShiftDetector.detect();
              // Refresh the playback position when the player resized or the UI is configured. The playback position marker
              // is positioned absolutely and must therefore be updated when the size of the seekbar changes.
              player.on(player.exports.PlayerEvent.PlayerResized, function () {
                _this.refreshPlaybackPosition();
              });
              // Additionally, when this code is called, the seekbar is not part of the UI yet and therefore does not have a size,
              // resulting in a wrong initial position of the marker. Refreshing it once the UI is configured solved this issue.
              uimanager.onConfigured.subscribe(function () {
                _this.refreshPlaybackPosition();
              });
              // It can also happen when a new source is loaded
              player.on(player.exports.PlayerEvent.SourceLoaded, function () {
                _this.refreshPlaybackPosition();
              });
              // Add markers when a source is loaded or update when a marker is added or removed
              uimanager.getConfig().events.onUpdated.subscribe(function () {
                playbackPositionHandler();
              });
              // Set the snappingRange if set in the uimanager config
              if (
                typeof uimanager.getConfig().seekbarSnappingRange === "number"
              ) {
                this.config.snappingRange =
                  uimanager.getConfig().seekbarSnappingRange;
              }
              // Initialize seekbar
              playbackPositionHandler(); // Set the playback position
              this.setBufferPosition(0);
              this.setSeekPosition(0);
              if (
                this.config.smoothPlaybackPositionUpdateIntervalMs !==
                SeekBar.SMOOTH_PLAYBACK_POSITION_UPDATE_DISABLED
              ) {
                this.configureSmoothPlaybackPositionUpdater(player, uimanager);
              }
              // Initialize markers
              this.initializeTimelineMarkers(player, uimanager);
            };
            SeekBar.prototype.initializeTimelineMarkers = function (
              player,
              uimanager
            ) {
              var _this = this;
              var timelineMarkerConfig = {
                cssPrefix: this.config.cssPrefix,
                snappingRange: this.config.snappingRange,
              };
              this.timelineMarkersHandler =
                new timelinemarkershandler_1.TimelineMarkersHandler(
                  timelineMarkerConfig,
                  function () {
                    return _this.seekBar.width();
                  },
                  this.seekBarMarkersContainer
                );
              this.timelineMarkersHandler.initialize(player, uimanager);
            };
            /**
             * Update seekbar while a live stream with DVR window is paused.
             * The playback position stays still and the position indicator visually moves towards the back.
             */
            SeekBar.prototype.configureLivePausedTimeshiftUpdater = function (
              player,
              uimanager,
              playbackPositionHandler
            ) {
              var _this = this;
              // Regularly update the playback position while the timeout is active
              this.pausedTimeshiftUpdater = new timeout_1.Timeout(
                1000,
                playbackPositionHandler,
                true
              );
              // Start updater when a live stream with timeshift window is paused
              player.on(player.exports.PlayerEvent.Paused, function () {
                if (player.isLive() && player.getMaxTimeShift() < 0) {
                  _this.pausedTimeshiftUpdater.start();
                }
              });
              // Stop updater when playback continues (no matter if the updater was started before)
              player.on(player.exports.PlayerEvent.Play, function () {
                return _this.pausedTimeshiftUpdater.clear();
              });
            };
            SeekBar.prototype.configureSmoothPlaybackPositionUpdater =
              function (player, uimanager) {
                var _this = this;
                /*
                 * Playback position update
                 *
                 * We do not update the position directly from the TimeChanged event, because it arrives very jittery and
                 * results in a jittery position indicator since the CSS transition time is statically set.
                 * To work around this issue, we maintain a local playback position that is updated in a stable regular interval
                 * and kept in sync with the player.
                 */
                var currentTimeSeekBar = 0;
                var currentTimePlayer = 0;
                var updateIntervalMs = 50;
                var currentTimeUpdateDeltaSecs = updateIntervalMs / 1000;
                this.smoothPlaybackPositionUpdater = new timeout_1.Timeout(
                  updateIntervalMs,
                  function () {
                    if (_this.isSeeking()) {
                      return;
                    }
                    currentTimeSeekBar += currentTimeUpdateDeltaSecs;
                    try {
                      currentTimePlayer = _this.getRelativeCurrentTime();
                    } catch (error) {
                      // Detect if the player has been destroyed and stop updating if so
                      if (
                        error instanceof
                        player.exports.PlayerAPINotAvailableError
                      ) {
                        _this.smoothPlaybackPositionUpdater.clear();
                      }
                      // If the current time cannot be read it makes no sense to continue
                      return;
                    }
                    // Sync currentTime of seekbar to player
                    var currentTimeDelta =
                      currentTimeSeekBar - currentTimePlayer;
                    // If the delta is larger that 2 secs, directly jump the seekbar to the
                    // player time instead of smoothly fast forwarding/rewinding.
                    if (Math.abs(currentTimeDelta) > 2) {
                      currentTimeSeekBar = currentTimePlayer;
                    }
                    // If currentTimeDelta is negative and below the adjustment threshold,
                    // the player is ahead of the seekbar and we 'fast forward' the seekbar
                    else if (currentTimeDelta <= -currentTimeUpdateDeltaSecs) {
                      currentTimeSeekBar += currentTimeUpdateDeltaSecs;
                    }
                    // If currentTimeDelta is positive and above the adjustment threshold,
                    // the player is behind the seekbar and we 'rewind' the seekbar
                    else if (currentTimeDelta >= currentTimeUpdateDeltaSecs) {
                      currentTimeSeekBar -= currentTimeUpdateDeltaSecs;
                    }
                    var playbackPositionPercentage =
                      (100 / player.getDuration()) * currentTimeSeekBar;
                    _this.setPlaybackPosition(playbackPositionPercentage);
                  },
                  true
                );
                var startSmoothPlaybackPositionUpdater = function () {
                  if (!player.isLive()) {
                    currentTimeSeekBar = _this.getRelativeCurrentTime();
                    _this.smoothPlaybackPositionUpdater.start();
                  }
                };
                var stopSmoothPlaybackPositionUpdater = function () {
                  _this.smoothPlaybackPositionUpdater.clear();
                };
                player.on(
                  player.exports.PlayerEvent.Play,
                  startSmoothPlaybackPositionUpdater
                );
                player.on(
                  player.exports.PlayerEvent.Playing,
                  startSmoothPlaybackPositionUpdater
                );
                player.on(
                  player.exports.PlayerEvent.Paused,
                  stopSmoothPlaybackPositionUpdater
                );
                player.on(
                  player.exports.PlayerEvent.PlaybackFinished,
                  stopSmoothPlaybackPositionUpdater
                );
                player.on(player.exports.PlayerEvent.Seeked, function () {
                  currentTimeSeekBar = _this.getRelativeCurrentTime();
                });
                player.on(
                  player.exports.PlayerEvent.SourceUnloaded,
                  stopSmoothPlaybackPositionUpdater
                );
                if (player.isPlaying()) {
                  startSmoothPlaybackPositionUpdater();
                }
              };
            SeekBar.prototype.getRelativeCurrentTime = function () {
              return playerutils_1.PlayerUtils.getCurrentTimeRelativeToSeekableRange(
                this.player
              );
            };
            SeekBar.prototype.release = function () {
              _super.prototype.release.call(this);
              if (this.smoothPlaybackPositionUpdater) {
                // object must not necessarily exist, e.g. in volume slider subclass
                this.smoothPlaybackPositionUpdater.clear();
              }
              if (this.pausedTimeshiftUpdater) {
                this.pausedTimeshiftUpdater.clear();
              }
              if (this.config.enableSeekPreview) {
                this.onSeekPreview.unsubscribe(this.seekWhileScrubbing);
              }
            };
            SeekBar.prototype.toDomElement = function () {
              var _this = this;
              if (this.config.vertical) {
                this.config.cssClasses.push("vertical");
              }
              var seekBarContainer = new dom_1.DOM("div", {
                id: this.config.id,
                class: this.getCssClasses(),
                role: "slider",
                "aria-label": i18n_1.i18n.performLocalization(
                  this.config.ariaLabel
                ),
                tabindex: this.config.tabIndex.toString(),
              });
              var seekBar = new dom_1.DOM("div", {
                class: this.prefixCss("seekbar"),
              });
              this.seekBar = seekBar;
              // Indicator that shows the buffer fill level
              var seekBarBufferLevel = new dom_1.DOM("div", {
                class: this.prefixCss("seekbar-bufferlevel"),
              });
              this.seekBarBufferPosition = seekBarBufferLevel;
              // Indicator that shows the current playback position
              var seekBarPlaybackPosition = new dom_1.DOM("div", {
                class: this.prefixCss("seekbar-playbackposition"),
              });
              this.seekBarPlaybackPosition = seekBarPlaybackPosition;
              // A marker of the current playback position, e.g. a dot or line
              var seekBarPlaybackPositionMarker = new dom_1.DOM("div", {
                class: this.prefixCss("seekbar-playbackposition-marker"),
              });
              this.seekBarPlaybackPositionMarker =
                seekBarPlaybackPositionMarker;
              // Indicator that show where a seek will go to
              var seekBarSeekPosition = new dom_1.DOM("div", {
                class: this.prefixCss("seekbar-seekposition"),
              });
              this.seekBarSeekPosition = seekBarSeekPosition;
              // Indicator that shows the full seekbar
              var seekBarBackdrop = new dom_1.DOM("div", {
                class: this.prefixCss("seekbar-backdrop"),
              });
              this.seekBarBackdrop = seekBarBackdrop;
              var seekBarChapterMarkersContainer = new dom_1.DOM("div", {
                class: this.prefixCss("seekbar-markers"),
              });
              this.seekBarMarkersContainer = seekBarChapterMarkersContainer;
              seekBar.append(
                this.seekBarBackdrop,
                this.seekBarBufferPosition,
                this.seekBarSeekPosition,
                this.seekBarPlaybackPosition,
                this.seekBarMarkersContainer,
                this.seekBarPlaybackPositionMarker
              );
              var seeking = false;
              // Define handler functions so we can attach/remove them later
              var mouseTouchMoveHandler = function (e) {
                e.preventDefault();
                // Avoid propagation to VR handler
                if (_this.player.vr != null) {
                  e.stopPropagation();
                }
                var targetPercentage = 100 * _this.getOffset(e);
                _this.setSeekPosition(targetPercentage);
                _this.setPlaybackPosition(targetPercentage);
                _this.onSeekPreviewEvent(targetPercentage, true);
              };
              var mouseTouchUpHandler = function (e) {
                e.preventDefault();
                // Remove handlers, seek operation is finished
                new dom_1.DOM(document).off(
                  "touchmove mousemove",
                  mouseTouchMoveHandler
                );
                new dom_1.DOM(document).off(
                  "touchend mouseup",
                  mouseTouchUpHandler
                );
                var targetPercentage = 100 * _this.getOffset(e);
                var snappedChapter =
                  _this.timelineMarkersHandler &&
                  _this.timelineMarkersHandler.getMarkerAtPosition(
                    targetPercentage
                  );
                _this.setSeeking(false);
                seeking = false;
                // Fire seeked event
                _this.onSeekedEvent(
                  snappedChapter ? snappedChapter.position : targetPercentage
                );
              };
              // A seek always start with a touchstart or mousedown directly on the seekbar.
              // To track a mouse seek also outside the seekbar (for touch events this works automatically),
              // so the user does not need to take care that the mouse always stays on the seekbar, we attach the mousemove
              // and mouseup handlers to the whole document. A seek is triggered when the user lifts the mouse key.
              // A seek mouse gesture is thus basically a click with a long time frame between down and up events.
              seekBar.on("touchstart mousedown", function (e) {
                var isTouchEvent =
                  browserutils_1.BrowserUtils.isTouchSupported &&
                  _this.isTouchEvent(e);
                // Prevent selection of DOM elements (also prevents mousedown if current event is touchstart)
                e.preventDefault();
                // Avoid propagation to VR handler
                if (_this.player.vr != null) {
                  e.stopPropagation();
                }
                _this.setSeeking(true); // Set seeking class on DOM element
                seeking = true; // Set seek tracking flag
                // Fire seeked event
                _this.onSeekEvent();
                // Add handler to track the seek operation over the whole document
                new dom_1.DOM(document).on(
                  isTouchEvent ? "touchmove" : "mousemove",
                  mouseTouchMoveHandler
                );
                new dom_1.DOM(document).on(
                  isTouchEvent ? "touchend" : "mouseup",
                  mouseTouchUpHandler
                );
              });
              // Display seek target indicator when mouse hovers or finger slides over seekbar
              seekBar.on("touchmove mousemove", function (e) {
                e.preventDefault();
                if (seeking) {
                  mouseTouchMoveHandler(e);
                }
                var position = 100 * _this.getOffset(e);
                _this.setSeekPosition(position);
                _this.onSeekPreviewEvent(position, false);
                if (_this.hasLabel() && _this.getLabel().isHidden()) {
                  _this.getLabel().show();
                }
              });
              // Hide seek target indicator when mouse or finger leaves seekbar
              seekBar.on("touchend mouseleave", function (e) {
                e.preventDefault();
                _this.setSeekPosition(0);
                if (_this.hasLabel()) {
                  _this.getLabel().hide();
                }
              });
              seekBarContainer.append(seekBar);
              if (this.label) {
                seekBarContainer.append(this.label.getDomElement());
              }
              return seekBarContainer;
            };
            /**
             * Gets the horizontal offset of a mouse/touch event point from the left edge of the seek bar.
             * @param eventPageX the pageX coordinate of an event to calculate the offset from
             * @returns {number} a number in the range of [0, 1], where 0 is the left edge and 1 is the right edge
             */
            SeekBar.prototype.getHorizontalOffset = function (eventPageX) {
              var elementOffsetPx = this.seekBar.offset().left;
              var widthPx = this.seekBar.width();
              var offsetPx = eventPageX - elementOffsetPx;
              var offset = (1 / widthPx) * offsetPx;
              return this.sanitizeOffset(offset);
            };
            /**
             * Gets the vertical offset of a mouse/touch event point from the bottom edge of the seek bar.
             * @param eventPageY the pageX coordinate of an event to calculate the offset from
             * @returns {number} a number in the range of [0, 1], where 0 is the bottom edge and 1 is the top edge
             */
            SeekBar.prototype.getVerticalOffset = function (eventPageY) {
              var elementOffsetPx = this.seekBar.offset().top;
              var widthPx = this.seekBar.height();
              var offsetPx = eventPageY - elementOffsetPx;
              var offset = (1 / widthPx) * offsetPx;
              return 1 - this.sanitizeOffset(offset);
            };
            /**
             * Gets the mouse or touch event offset for the current configuration (horizontal or vertical).
             * @param e the event to calculate the offset from
             * @returns {number} a number in the range of [0, 1]
             * @see #getHorizontalOffset
             * @see #getVerticalOffset
             */
            SeekBar.prototype.getOffset = function (e) {
              if (
                browserutils_1.BrowserUtils.isTouchSupported &&
                this.isTouchEvent(e)
              ) {
                if (this.config.vertical) {
                  return this.getVerticalOffset(
                    e.type === "touchend"
                      ? e.changedTouches[0].pageY
                      : e.touches[0].pageY
                  );
                } else {
                  return this.getHorizontalOffset(
                    e.type === "touchend"
                      ? e.changedTouches[0].pageX
                      : e.touches[0].pageX
                  );
                }
              } else if (e instanceof MouseEvent) {
                if (this.config.vertical) {
                  return this.getVerticalOffset(e.pageY);
                } else {
                  return this.getHorizontalOffset(e.pageX);
                }
              } else {
                if (console) {
                  console.warn("invalid event");
                }
                return 0;
              }
            };
            /**
             * Sanitizes the mouse offset to the range of [0, 1].
             *
             * When tracking the mouse outside the seek bar, the offset can be outside the desired range and this method
             * limits it to the desired range. E.g. a mouse event left of the left edge of a seek bar yields an offset below
             * zero, but to display the seek target on the seek bar, we need to limit it to zero.
             *
             * @param offset the offset to sanitize
             * @returns {number} the sanitized offset.
             */
            SeekBar.prototype.sanitizeOffset = function (offset) {
              // Since we track mouse moves over the whole document, the target can be outside the seek range,
              // and we need to limit it to the [0, 1] range.
              if (offset < 0) {
                offset = 0;
              } else if (offset > 1) {
                offset = 1;
              }
              return offset;
            };
            /**
             * Sets the position of the playback position indicator.
             * @param percent a number between 0 and 100 as returned by the player
             */
            SeekBar.prototype.setPlaybackPosition = function (percent) {
              this.playbackPositionPercentage = percent;
              // Set position of the bar
              this.setPosition(this.seekBarPlaybackPosition, percent);
              // Set position of the marker
              var totalSize = this.config.vertical
                ? this.seekBar.height() -
                  this.seekBarPlaybackPositionMarker.height()
                : this.seekBar.width();
              var px = (totalSize / 100) * percent;
              if (this.config.vertical) {
                px =
                  this.seekBar.height() -
                  px -
                  this.seekBarPlaybackPositionMarker.height();
              }
              var style = this.config.vertical
                ? // -ms-transform required for IE9
                  // -webkit-transform required for Android 4.4 WebView
                  {
                    transform: "translateY(" + px + "px)",
                    "-ms-transform": "translateY(" + px + "px)",
                    "-webkit-transform": "translateY(" + px + "px)",
                  }
                : {
                    transform: "translateX(" + px + "px)",
                    "-ms-transform": "translateX(" + px + "px)",
                    "-webkit-transform": "translateX(" + px + "px)",
                  };
              this.seekBarPlaybackPositionMarker.css(style);
            };
            /**
             * Refreshes the playback position. Can be used by subclasses to refresh the position when
             * the size of the component changes.
             */
            SeekBar.prototype.refreshPlaybackPosition = function () {
              this.setPlaybackPosition(this.playbackPositionPercentage);
            };
            /**
             * Sets the position until which media is buffered.
             * @param percent a number between 0 and 100
             */
            SeekBar.prototype.setBufferPosition = function (percent) {
              this.setPosition(this.seekBarBufferPosition, percent);
            };
            /**
             * Sets the position where a seek, if executed, would jump to.
             * @param percent a number between 0 and 100
             */
            SeekBar.prototype.setSeekPosition = function (percent) {
              this.setPosition(this.seekBarSeekPosition, percent);
            };
            /**
             * Set the actual position (width or height) of a DOM element that represent a bar in the seek bar.
             * @param element the element to set the position for
             * @param percent a number between 0 and 100
             */
            SeekBar.prototype.setPosition = function (element, percent) {
              var scale = percent / 100;
              // When the scale is exactly 1 or very near 1 (and the browser internally rounds it to 1), browsers seem to render
              // the elements differently and the height gets slightly off, leading to mismatching heights when e.g. the buffer
              // level bar has a width of 1 and the playback position bar has a width < 1. A jittering buffer level around 1
              // leads to an even worse flickering effect.
              // Various changes in CSS styling and DOM hierarchy did not solve the issue so the workaround is to avoid a scale
              // of exactly 1.
              if (scale >= 0.99999 && scale <= 1.00001) {
                scale = 0.99999;
              }
              var style = this.config.vertical
                ? // -ms-transform required for IE9
                  // -webkit-transform required for Android 4.4 WebView
                  {
                    transform: "scaleY(" + scale + ")",
                    "-ms-transform": "scaleY(" + scale + ")",
                    "-webkit-transform": "scaleY(" + scale + ")",
                  }
                : {
                    transform: "scaleX(" + scale + ")",
                    "-ms-transform": "scaleX(" + scale + ")",
                    "-webkit-transform": "scaleX(" + scale + ")",
                  };
              element.css(style);
            };
            /**
             * Puts the seek bar into or out of seeking state by adding/removing a class to the DOM element. This can be used
             * to adjust the styling while seeking.
             *
             * @param seeking should be true when entering seek state, false when exiting the seek state
             */
            SeekBar.prototype.setSeeking = function (seeking) {
              if (seeking) {
                this.getDomElement().addClass(
                  this.prefixCss(SeekBar.CLASS_SEEKING)
                );
              } else {
                this.getDomElement().removeClass(
                  this.prefixCss(SeekBar.CLASS_SEEKING)
                );
              }
            };
            /**
             * Checks if the seek bar is currently in the seek state.
             * @returns {boolean} true if in seek state, else false
             */
            SeekBar.prototype.isSeeking = function () {
              return this.getDomElement().hasClass(
                this.prefixCss(SeekBar.CLASS_SEEKING)
              );
            };
            /**
             * Checks if the seek bar has a {@link SeekBarLabel}.
             * @returns {boolean} true if the seek bar has a label, else false
             */
            SeekBar.prototype.hasLabel = function () {
              return this.label != null;
            };
            /**
             * Gets the label of this seek bar.
             * @returns {SeekBarLabel} the label if this seek bar has a label, else null
             */
            SeekBar.prototype.getLabel = function () {
              return this.label;
            };
            SeekBar.prototype.onSeekEvent = function () {
              this.seekBarEvents.onSeek.dispatch(this);
            };
            SeekBar.prototype.onSeekPreviewEvent = function (
              percentage,
              scrubbing
            ) {
              var snappedMarker =
                this.timelineMarkersHandler &&
                this.timelineMarkersHandler.getMarkerAtPosition(percentage);
              var seekPositionPercentage = percentage;
              if (snappedMarker) {
                if (snappedMarker.duration > 0) {
                  if (percentage < snappedMarker.position) {
                    // Snap the position to the start of the interval if the seek is within the left snap margin
                    // We know that we are within a snap margin when we are outside the marker interval but still
                    // have a snappedMarker
                    seekPositionPercentage = snappedMarker.position;
                  } else if (
                    percentage >
                    snappedMarker.position + snappedMarker.duration
                  ) {
                    // Snap the position to the end of the interval if the seek is within the right snap margin
                    seekPositionPercentage =
                      snappedMarker.position + snappedMarker.duration;
                  }
                } else {
                  // Position markers always snap to their marker position
                  seekPositionPercentage = snappedMarker.position;
                }
              }
              if (this.label) {
                this.label.getDomElement().css({
                  left: seekPositionPercentage + "%",
                });
              }
              this.seekBarEvents.onSeekPreview.dispatch(this, {
                scrubbing: scrubbing,
                position: seekPositionPercentage,
                marker: snappedMarker,
              });
            };
            SeekBar.prototype.onSeekedEvent = function (percentage) {
              this.seekBarEvents.onSeeked.dispatch(this, percentage);
            };
            Object.defineProperty(SeekBar.prototype, "onSeek", {
              /**
               * Gets the event that is fired when a scrubbing seek operation is started.
               * @returns {Event<SeekBar, NoArgs>}
               */
              get: function () {
                return this.seekBarEvents.onSeek.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(SeekBar.prototype, "onSeekPreview", {
              /**
               * Gets the event that is fired during a scrubbing seek (to indicate that the seek preview, i.e. the video frame,
               * should be updated), or during a normal seek preview when the seek bar is hovered (and the seek target,
               * i.e. the seek bar label, should be updated).
               * @returns {Event<SeekBar, SeekPreviewEventArgs>}
               */
              get: function () {
                return this.seekBarEvents.onSeekPreview.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(SeekBar.prototype, "onSeeked", {
              /**
               * Gets the event that is fired when a scrubbing seek has finished or when a direct seek is issued.
               * @returns {Event<SeekBar, number>}
               */
              get: function () {
                return this.seekBarEvents.onSeeked.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            SeekBar.prototype.onShowEvent = function () {
              _super.prototype.onShowEvent.call(this);
              // Refresh the position of the playback position when the seek bar becomes visible. To correctly set the position,
              // the DOM element must be fully initialized an have its size calculated, because the position is set as an absolute
              // value calculated from the size. This required size is not known when it is hidden.
              // For such cases, we refresh the position here in onShow because here it is guaranteed that the component knows
              // its size and can set the position correctly.
              this.refreshPlaybackPosition();
            };
            /**
             * Checks if TouchEvent is supported.
             * @returns {boolean} true if TouchEvent not undefined, else false
             */
            SeekBar.prototype.isTouchEvent = function (e) {
              return window.TouchEvent && e instanceof TouchEvent;
            };
            SeekBar.SMOOTH_PLAYBACK_POSITION_UPDATE_DISABLED = -1;
            /**
             * The CSS class that is added to the DOM element while the seek bar is in 'seeking' state.
             */
            SeekBar.CLASS_SEEKING = "seeking";
            return SeekBar;
          })(component_1.Component));
        },
        {
          "../browserutils": 3,
          "../dom": 86,
          "../eventdispatcher": 88,
          "../localization/i18n": 93,
          "../playerutils": 99,
          "../stringutils": 112,
          "../timeout": 114,
          "./../groupplaybackapi": 90,
          "./component": 18,
          "./seekbarbufferlevel": 45,
          "./seekbarcontroller": 46,
          "./timelinemarkershandler": 74,
        },
      ],
      45: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.getMinBufferLevel = void 0;
          function getMinBufferLevel(player) {
            var playerDuration = player.getDuration();
            var videoBufferLength = player.getVideoBufferLength();
            var audioBufferLength = player.getAudioBufferLength();
            // Calculate the buffer length which is the smaller length of the audio and video buffers. If one of these
            // buffers is not available, we set it's value to MAX_VALUE to make sure that the other real value is taken
            // as the buffer length.
            var bufferLength = Math.min(
              videoBufferLength != null ? videoBufferLength : Number.MAX_VALUE,
              audioBufferLength != null ? audioBufferLength : Number.MAX_VALUE
            );
            // If both buffer lengths are missing, we set the buffer length to zero
            if (bufferLength === Number.MAX_VALUE) {
              bufferLength = 0;
            }
            return (100 / playerDuration) * bufferLength;
          }
          exports.getMinBufferLevel = getMinBufferLevel;
        },
        {},
      ],
      46: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SeekBarController = exports.SeekBarType = void 0;
          var uiutils_1 = require("../uiutils");
          var SeekBarType;
          (function (SeekBarType) {
            SeekBarType[(SeekBarType["Vod"] = 0)] = "Vod";
            SeekBarType[(SeekBarType["Live"] = 1)] = "Live";
            SeekBarType[(SeekBarType["Volume"] = 2)] = "Volume";
          })((SeekBarType = exports.SeekBarType || (exports.SeekBarType = {})));
          var coerceValueIntoRange = function (value, range, cb) {
            if (value < range.min) {
              cb(range.min);
            } else if (value > range.max) {
              cb(range.max);
            } else {
              cb(value);
            }
          };
          var SeekBarController = /** @class */ (function () {
            function SeekBarController(
              keyStepIncrements,
              player,
              volumeController
            ) {
              this.keyStepIncrements = keyStepIncrements;
              this.player = player;
              this.volumeController = volumeController;
            }
            SeekBarController.prototype.arrowKeyControls = function (
              currentValue,
              range,
              valueUpdate
            ) {
              var _this = this;
              var controlValue = Math.floor(currentValue);
              return {
                left: function () {
                  return coerceValueIntoRange(
                    controlValue - _this.keyStepIncrements.leftRight,
                    range,
                    valueUpdate
                  );
                },
                right: function () {
                  return coerceValueIntoRange(
                    controlValue + _this.keyStepIncrements.leftRight,
                    range,
                    valueUpdate
                  );
                },
                up: function () {
                  return coerceValueIntoRange(
                    controlValue + _this.keyStepIncrements.upDown,
                    range,
                    valueUpdate
                  );
                },
                down: function () {
                  return coerceValueIntoRange(
                    controlValue - _this.keyStepIncrements.upDown,
                    range,
                    valueUpdate
                  );
                },
                home: function () {
                  return coerceValueIntoRange(range.min, range, valueUpdate);
                },
                end: function () {
                  return coerceValueIntoRange(range.max, range, valueUpdate);
                },
              };
            };
            SeekBarController.prototype.seekBarControls = function (type) {
              if (type === SeekBarType.Live) {
                return this.arrowKeyControls(
                  this.player.getTimeShift(),
                  { min: this.player.getMaxTimeShift(), max: 0 },
                  this.player.timeShift
                );
              } else if (type === SeekBarType.Vod) {
                return this.arrowKeyControls(
                  this.player.getCurrentTime(),
                  { min: 0, max: this.player.getDuration() },
                  this.player.seek
                );
              } else if (
                type === SeekBarType.Volume &&
                this.volumeController != null
              ) {
                var volumeTransition = this.volumeController.startTransition();
                return this.arrowKeyControls(
                  this.player.getVolume(),
                  { min: 0, max: 100 },
                  volumeTransition.finish.bind(volumeTransition)
                );
              }
            };
            SeekBarController.prototype.setSeekBarControls = function (
              domElement,
              type
            ) {
              var _this = this;
              domElement.on("keydown", function (e) {
                var controls = _this.seekBarControls(type());
                switch (e.keyCode) {
                  case uiutils_1.UIUtils.KeyCode.LeftArrow: {
                    controls.left();
                    e.preventDefault();
                    break;
                  }
                  case uiutils_1.UIUtils.KeyCode.RightArrow: {
                    controls.right();
                    e.preventDefault();
                    break;
                  }
                  case uiutils_1.UIUtils.KeyCode.UpArrow: {
                    controls.up();
                    e.preventDefault();
                    break;
                  }
                  case uiutils_1.UIUtils.KeyCode.DownArrow: {
                    controls.down();
                    e.preventDefault();
                    break;
                  }
                  case uiutils_1.UIUtils.KeyCode.Home: {
                    controls.home();
                    e.preventDefault();
                    break;
                  }
                  case uiutils_1.UIUtils.KeyCode.End: {
                    controls.end();
                    e.preventDefault();
                    break;
                  }
                  case uiutils_1.UIUtils.KeyCode.Space: {
                    _this.player.isPlaying()
                      ? _this.player.pause()
                      : _this.player.play();
                    e.preventDefault();
                    break;
                  }
                }
              });
            };
            return SeekBarController;
          })();
          exports.SeekBarController = SeekBarController;
        },
        { "../uiutils": 118 },
      ],
      47: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SeekBarLabel = void 0;
          var container_1 = require("./container");
          var label_1 = require("./label");
          var component_1 = require("./component");
          var stringutils_1 = require("../stringutils");
          var imageloader_1 = require("../imageloader");
          var playerutils_1 = require("../playerutils");
          /**
           * A label for a {@link SeekBar} that can display the seek target time, a thumbnail, and title (e.g. chapter title).
           */
          var SeekBarLabel = /** @class */ (function (_super) {
            __extends(SeekBarLabel, _super);
            function SeekBarLabel(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.appliedMarkerCssClasses = [];
              _this.handleSeekPreview = function (sender, args) {
                if (_this.player.isLive()) {
                  var maxTimeShift = _this.player.getMaxTimeShift();
                  var timeShiftPreview =
                    maxTimeShift - maxTimeShift * (args.position / 100);
                  _this.setTime(timeShiftPreview);
                  // In case of a live stream the player expects the time passed into the getThumbnail as a wallClockTime and not
                  // as a relative timeShift value.
                  var convertTimeShiftPreviewToWallClockTime = function (
                    targetTimeShift
                  ) {
                    var currentTimeShift = _this.player.getTimeShift();
                    var currentTime = _this.player.getCurrentTime();
                    var wallClockTimeOfLiveEdge =
                      currentTime - currentTimeShift;
                    return wallClockTimeOfLiveEdge + targetTimeShift;
                  };
                  var wallClockTime =
                    convertTimeShiftPreviewToWallClockTime(timeShiftPreview);
                  _this.setThumbnail(_this.player.getThumbnail(wallClockTime));
                } else {
                  var time = _this.player.getDuration() * (args.position / 100);
                  _this.setTime(time);
                  var seekableRangeStart =
                    playerutils_1.PlayerUtils.getSeekableRangeStart(
                      _this.player,
                      0
                    );
                  var absoluteSeekTarget = time + seekableRangeStart;
                  _this.setThumbnail(
                    _this.player.getThumbnail(absoluteSeekTarget)
                  );
                }
                if (args.marker) {
                  _this.setTitleText(args.marker.marker.title);
                } else {
                  _this.setTitleText(null);
                }
                // Remove CSS classes from previous marker
                if (_this.appliedMarkerCssClasses.length > 0) {
                  _this
                    .getDomElement()
                    .removeClass(_this.appliedMarkerCssClasses.join(" "));
                  _this.appliedMarkerCssClasses = [];
                }
                // Add CSS classes of current marker
                if (args.marker) {
                  var cssClasses = (args.marker.marker.cssClasses || []).map(
                    function (cssClass) {
                      return _this.prefixCss(cssClass);
                    }
                  );
                  _this.getDomElement().addClass(cssClasses.join(" "));
                  _this.appliedMarkerCssClasses = cssClasses;
                }
              };
              _this.timeLabel = new label_1.Label({
                cssClasses: ["seekbar-label-time"],
              });
              _this.titleLabel = new label_1.Label({
                cssClasses: ["seekbar-label-title"],
              });
              _this.thumbnail = new component_1.Component({
                cssClasses: ["seekbar-thumbnail"],
                role: "img",
              });
              _this.thumbnailImageLoader = new imageloader_1.ImageLoader();
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-seekbar-label",
                  components: [
                    new container_1.Container({
                      components: [
                        _this.thumbnail,
                        new container_1.Container({
                          components: [_this.titleLabel, _this.timeLabel],
                          cssClass: "seekbar-label-metadata",
                        }),
                      ],
                      cssClass: "seekbar-label-inner",
                    }),
                  ],
                  hidden: true,
                },
                _this.config
              );
              return _this;
            }
            SeekBarLabel.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.player = player;
              this.uiManager = uimanager;
              uimanager.onSeekPreview.subscribeRateLimited(
                this.handleSeekPreview,
                100
              );
              var init = function () {
                // Set time format depending on source duration
                _this.timeFormat =
                  Math.abs(
                    player.isLive()
                      ? player.getMaxTimeShift()
                      : player.getDuration()
                  ) >= 3600
                    ? stringutils_1.StringUtils.FORMAT_HHMMSS
                    : stringutils_1.StringUtils.FORMAT_MMSS;
                // Set initial state of title and thumbnail to handle sourceLoaded when switching to a live-stream
                _this.setTitleText(null);
                _this.setThumbnail(null);
              };
              uimanager.getConfig().events.onUpdated.subscribe(init);
              init();
            };
            /**
             * Sets arbitrary text on the label.
             * @param text the text to show on the label
             */
            SeekBarLabel.prototype.setText = function (text) {
              this.timeLabel.setText(text);
            };
            /**
             * Sets a time to be displayed on the label.
             * @param seconds the time in seconds to display on the label
             */
            SeekBarLabel.prototype.setTime = function (seconds) {
              this.setText(
                stringutils_1.StringUtils.secondsToTime(
                  seconds,
                  this.timeFormat
                )
              );
            };
            /**
             * Sets the text on the title label.
             * @param text the text to show on the label
             */
            SeekBarLabel.prototype.setTitleText = function (text) {
              if (text === void 0) {
                text = "";
              }
              this.titleLabel.setText(text);
            };
            /**
             * Sets or removes a thumbnail on the label.
             * @param thumbnail the thumbnail to display on the label or null to remove a displayed thumbnail
             */
            SeekBarLabel.prototype.setThumbnail = function (thumbnail) {
              var _this = this;
              if (thumbnail === void 0) {
                thumbnail = null;
              }
              var thumbnailElement = this.thumbnail.getDomElement();
              if (thumbnail == null) {
                thumbnailElement.css({
                  "background-image": null,
                  display: null,
                  width: null,
                  height: null,
                });
              } else {
                // We use the thumbnail image loader to make sure the thumbnail is loaded and it's size is known before be can
                // calculate the CSS properties and set them on the element.
                this.thumbnailImageLoader.load(
                  thumbnail.url,
                  function (url, width, height) {
                    // can be checked like that because x/y/w/h are either all present or none
                    // https://www.w3.org/TR/media-frags/#naming-space
                    if (thumbnail.x !== undefined) {
                      thumbnailElement.css(
                        _this.thumbnailCssSprite(thumbnail, width, height)
                      );
                    } else {
                      thumbnailElement.css(
                        _this.thumbnailCssSingleImage(thumbnail, width, height)
                      );
                    }
                  }
                );
              }
            };
            SeekBarLabel.prototype.thumbnailCssSprite = function (
              thumbnail,
              width,
              height
            ) {
              var thumbnailCountX = width / thumbnail.width;
              var thumbnailCountY = height / thumbnail.height;
              var thumbnailIndexX = thumbnail.x / thumbnail.width;
              var thumbnailIndexY = thumbnail.y / thumbnail.height;
              var sizeX = 100 * thumbnailCountX;
              var sizeY = 100 * thumbnailCountY;
              var offsetX = 100 * thumbnailIndexX;
              var offsetY = 100 * thumbnailIndexY;
              var aspectRatio = (1 / thumbnail.width) * thumbnail.height;
              // The thumbnail size is set by setting the CSS 'width' and 'padding-bottom' properties. 'padding-bottom' is
              // used because it is relative to the width and can be used to set the aspect ratio of the thumbnail.
              // A default value for width is set in the stylesheet and can be overwritten from there or anywhere else.
              return {
                display: "inherit",
                "background-image": "url(".concat(thumbnail.url, ")"),
                "padding-bottom": "".concat(100 * aspectRatio, "%"),
                "background-size": "".concat(sizeX, "% ").concat(sizeY, "%"),
                "background-position": "-"
                  .concat(offsetX, "% -")
                  .concat(offsetY, "%"),
              };
            };
            SeekBarLabel.prototype.thumbnailCssSingleImage = function (
              thumbnail,
              width,
              height
            ) {
              var aspectRatio = (1 / width) * height;
              return {
                display: "inherit",
                "background-image": "url(".concat(thumbnail.url, ")"),
                "padding-bottom": "".concat(100 * aspectRatio, "%"),
                "background-size": "100% 100%",
                "background-position": "0 0",
              };
            };
            SeekBarLabel.prototype.release = function () {
              _super.prototype.release.call(this);
              this.uiManager.onSeekPreview.unsubscribe(this.handleSeekPreview);
            };
            return SeekBarLabel;
          })(container_1.Container);
          exports.SeekBarLabel = SeekBarLabel;
        },
        {
          "../imageloader": 92,
          "../playerutils": 99,
          "../stringutils": 112,
          "./component": 18,
          "./container": 19,
          "./label": 33,
        },
      ],
      48: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SelectBox = void 0;
          var listselector_1 = require("./listselector");
          var dom_1 = require("../dom");
          var i18n_1 = require("../localization/i18n");
          /**
           * A simple select box providing the possibility to select a single item out of a list of available items.
           *
           * DOM example:
           * <code>
           *     <select class='ui-selectbox'>
           *         <option value='key'>label</option>
           *         ...
           *     </select>
           * </code>
           */
          var SelectBox = /** @class */ (function (_super) {
            __extends(SelectBox, _super);
            function SelectBox(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-selectbox",
                },
                _this.config
              );
              return _this;
            }
            SelectBox.prototype.toDomElement = function () {
              var _this = this;
              var selectElement = new dom_1.DOM("select", {
                id: this.config.id,
                class: this.getCssClasses(),
                "aria-label": i18n_1.i18n.performLocalization(
                  this.config.ariaLabel
                ),
              });
              this.selectElement = selectElement;
              this.updateDomItems();
              selectElement.on("change", function () {
                var value = selectElement.val();
                _this.onItemSelectedEvent(value, false);
              });
              return selectElement;
            };
            SelectBox.prototype.updateDomItems = function (selectedValue) {
              if (selectedValue === void 0) {
                selectedValue = null;
              }
              // Delete all children
              this.selectElement.empty();
              // Add updated children
              for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                var optionElement = new dom_1.DOM("option", {
                  value: String(item.key),
                }).html(i18n_1.i18n.performLocalization(item.label));
                if (item.key === String(selectedValue)) {
                  // convert selectedValue to string to catch 'null'/null case
                  optionElement.attr("selected", "selected");
                }
                this.selectElement.append(optionElement);
              }
            };
            SelectBox.prototype.onItemAddedEvent = function (value) {
              _super.prototype.onItemAddedEvent.call(this, value);
              this.updateDomItems(this.selectedItem);
            };
            SelectBox.prototype.onItemRemovedEvent = function (value) {
              _super.prototype.onItemRemovedEvent.call(this, value);
              this.updateDomItems(this.selectedItem);
            };
            SelectBox.prototype.onItemSelectedEvent = function (
              value,
              updateDomItems
            ) {
              if (updateDomItems === void 0) {
                updateDomItems = true;
              }
              _super.prototype.onItemSelectedEvent.call(this, value);
              if (updateDomItems) {
                this.updateDomItems(value);
              }
            };
            return SelectBox;
          })(listselector_1.ListSelector);
          exports.SelectBox = SelectBox;
        },
        { "../dom": 86, "../localization/i18n": 93, "./listselector": 35 },
      ],
      49: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SettingsPanel = void 0;
          var container_1 = require("./container");
          var selectbox_1 = require("./selectbox");
          var timeout_1 = require("../timeout");
          var eventdispatcher_1 = require("../eventdispatcher");
          var settingspanelpage_1 = require("./settingspanelpage");
          var NavigationDirection;
          (function (NavigationDirection) {
            NavigationDirection[(NavigationDirection["Forwards"] = 0)] =
              "Forwards";
            NavigationDirection[(NavigationDirection["Backwards"] = 1)] =
              "Backwards";
          })(NavigationDirection || (NavigationDirection = {}));
          /**
           * A panel containing a list of {@link SettingsPanelPage items}.
           *
           * To configure pages just pass them in the components array.
           *
           * Example:
           *  let settingsPanel = new SettingsPanel({
           *    hidden: true,
           *  });
           *
           *  let settingsPanelPage = new SettingsPanelPage({
           *    components: [â€¦]
           *  });
           *
           *  let secondSettingsPanelPage = new SettingsPanelPage({
           *    components: [â€¦]
           *  });
           *
           *  settingsPanel.addComponent(settingsPanelPage);
           *  settingsPanel.addComponent(secondSettingsPanelPage);
           *
           * For an example how to navigate between pages @see SettingsPanelPageNavigatorButton
           */
          var SettingsPanel = (exports.SettingsPanel = /** @class */ (function (
            _super
          ) {
            __extends(SettingsPanel, _super);
            function SettingsPanel(config) {
              var _this = _super.call(this, config) || this;
              _this.navigationStack = [];
              _this.settingsPanelEvents = {
                onSettingsStateChanged: new eventdispatcher_1.EventDispatcher(),
              };
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-settings-panel",
                  hideDelay: 3000,
                  pageTransitionAnimation: true,
                },
                _this.config
              );
              _this.activePage = _this.getRootPage();
              return _this;
            }
            SettingsPanel.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              uimanager.onControlsHide.subscribe(function () {
                return _this.hideHoveredSelectBoxes();
              });
              if (config.hideDelay > -1) {
                this.hideTimeout = new timeout_1.Timeout(
                  config.hideDelay,
                  function () {
                    _this.hide();
                    _this.hideHoveredSelectBoxes();
                  }
                );
                this.getDomElement().on("mouseenter", function () {
                  // On mouse enter clear the timeout
                  _this.hideTimeout.clear();
                });
                this.getDomElement().on("mouseleave", function () {
                  // On mouse leave activate the timeout
                  _this.hideTimeout.reset();
                });
                this.getDomElement().on("focusin", function () {
                  _this.hideTimeout.clear();
                });
                this.getDomElement().on("focusout", function () {
                  _this.hideTimeout.reset();
                });
              }
              this.onHide.subscribe(function () {
                if (config.hideDelay > -1) {
                  // Clear timeout when hidden from outside
                  _this.hideTimeout.clear();
                }
                // Since we don't reset the actual navigation here we need to simulate a onInactive event in case some panel
                // needs to do something when they become invisible / inactive.
                _this.activePage.onInactiveEvent();
              });
              this.onShow.subscribe(function () {
                // Reset navigation when te panel gets visible to avoid a weird animation when hiding
                _this.resetNavigation(true);
                // Since we don't need to navigate to the root page again we need to fire the onActive event when the settings
                // panel gets visible.
                _this.activePage.onActiveEvent();
                if (config.hideDelay > -1) {
                  // Activate timeout when shown
                  _this.hideTimeout.start();
                }
              });
              // pass event from root page through
              this.getRootPage().onSettingsStateChanged.subscribe(function () {
                _this.onSettingsStateChangedEvent();
              });
              this.updateActivePageClass();
            };
            /**
             * Returns the current active / visible page
             * @return {SettingsPanelPage}
             */
            SettingsPanel.prototype.getActivePage = function () {
              return this.activePage;
            };
            /**
             * Sets the
             * @deprecated Use {@link setActivePage} instead
             * @param index
             */
            SettingsPanel.prototype.setActivePageIndex = function (index) {
              this.setActivePage(this.getPages()[index]);
            };
            /**
             * Adds the passed page to the navigation stack and makes it visible.
             * Use {@link popSettingsPanelPage} to navigate backwards.
             *
             * Results in no-op if the target page is the current page.
             * @params page
             */
            SettingsPanel.prototype.setActivePage = function (targetPage) {
              if (targetPage === this.getActivePage()) {
                console.warn(
                  "Page is already the current one ... skipping navigation"
                );
                return;
              }
              this.navigateToPage(
                targetPage,
                this.getActivePage(),
                NavigationDirection.Forwards,
                !this.config.pageTransitionAnimation
              );
            };
            /**
             * Resets the navigation stack by navigating back to the root page and displaying it.
             */
            SettingsPanel.prototype.popToRootSettingsPanelPage = function () {
              this.resetNavigation(this.config.pageTransitionAnimation);
            };
            /**
             * Removes the current page from the navigation stack and makes the previous one visible.
             * Results in a no-op if we are already on the root page.
             */
            SettingsPanel.prototype.popSettingsPanelPage = function () {
              if (this.navigationStack.length === 0) {
                console.warn(
                  "Already on the root page ... skipping navigation"
                );
                return;
              }
              var targetPage =
                this.navigationStack[this.navigationStack.length - 2];
              // The root part isn't part of the navigation stack so handle it explicitly here
              if (!targetPage) {
                targetPage = this.getRootPage();
              }
              this.navigateToPage(
                targetPage,
                this.activePage,
                NavigationDirection.Backwards,
                !this.config.pageTransitionAnimation
              );
            };
            /**
             * Checks if there are active settings within the root page of the settings panel.
             * An active setting is a setting that is visible and enabled, which the user can interact with.
             * @returns {boolean} true if there are active settings, false if the panel is functionally empty to a user
             */
            SettingsPanel.prototype.rootPageHasActiveSettings = function () {
              return this.getRootPage().hasActiveSettings();
            };
            /**
             * Return all configured pages
             * @returns {SettingsPanelPage[]}
             */
            SettingsPanel.prototype.getPages = function () {
              return this.config.components.filter(function (component) {
                return (
                  component instanceof settingspanelpage_1.SettingsPanelPage
                );
              });
            };
            Object.defineProperty(
              SettingsPanel.prototype,
              "onSettingsStateChanged",
              {
                get: function () {
                  return this.settingsPanelEvents.onSettingsStateChanged.getEvent();
                },
                enumerable: false,
                configurable: true,
              }
            );
            SettingsPanel.prototype.release = function () {
              _super.prototype.release.call(this);
              if (this.hideTimeout) {
                this.hideTimeout.clear();
              }
            };
            // Support adding settingsPanelPages after initialization
            SettingsPanel.prototype.addComponent = function (component) {
              if (
                this.getPages().length === 0 &&
                component instanceof settingspanelpage_1.SettingsPanelPage
              ) {
                this.activePage = component;
              }
              _super.prototype.addComponent.call(this, component);
            };
            SettingsPanel.prototype.updateActivePageClass = function () {
              var _this = this;
              this.getPages().forEach(function (page) {
                if (page === _this.activePage) {
                  page
                    .getDomElement()
                    .addClass(_this.prefixCss(SettingsPanel.CLASS_ACTIVE_PAGE));
                } else {
                  page
                    .getDomElement()
                    .removeClass(
                      _this.prefixCss(SettingsPanel.CLASS_ACTIVE_PAGE)
                    );
                }
              });
            };
            SettingsPanel.prototype.resetNavigation = function (
              resetNavigationOnShow
            ) {
              var sourcePage = this.getActivePage();
              var rootPage = this.getRootPage();
              if (sourcePage) {
                // Since the onInactiveEvent was already fired in the onHide we need to suppress it here
                if (!resetNavigationOnShow) {
                  sourcePage.onInactiveEvent();
                }
              }
              this.navigationStack = [];
              this.animateNavigation(
                rootPage,
                sourcePage,
                resetNavigationOnShow
              );
              this.activePage = rootPage;
              this.updateActivePageClass();
            };
            SettingsPanel.prototype.navigateToPage = function (
              targetPage,
              sourcePage,
              direction,
              skipAnimation
            ) {
              this.activePage = targetPage;
              if (direction === NavigationDirection.Forwards) {
                this.navigationStack.push(targetPage);
              } else {
                this.navigationStack.pop();
              }
              this.animateNavigation(targetPage, sourcePage, skipAnimation);
              this.updateActivePageClass();
              targetPage.onActiveEvent();
              sourcePage.onInactiveEvent();
            };
            /**
             * @param targetPage
             * @param sourcePage
             * @param skipAnimation This is just an internal flag if we want to have an animation. It is set true when we reset
             * the navigation within the onShow callback of the settingsPanel. In this case we don't want an actual animation but
             * the recalculation of the dimension of the settingsPanel.
             * This is independent of the pageTransitionAnimation flag.
             */
            SettingsPanel.prototype.animateNavigation = function (
              targetPage,
              sourcePage,
              skipAnimation
            ) {
              if (!this.config.pageTransitionAnimation) {
                return;
              }
              var settingsPanelDomElement = this.getDomElement();
              var settingsPanelHTMLElement = this.getDomElement().get(0);
              // get current dimension
              var settingsPanelWidth = settingsPanelHTMLElement.scrollWidth;
              var settingsPanelHeight = settingsPanelHTMLElement.scrollHeight;
              // calculate target size of the settings panel
              sourcePage.getDomElement().css("display", "none");
              this.getDomElement().css({ width: "", height: "" }); // let css auto settings kick in again
              var targetPageHtmlElement = targetPage.getDomElement().get(0);
              // clone the targetPage DOM element so that we can calculate the width / height how they will be after
              // switching the page. We are using a clone to prevent (mostly styling) side-effects on the real DOM element
              var clone = targetPageHtmlElement.cloneNode(true);
              // append to parent so we get the 'real' size
              var containerWrapper = targetPageHtmlElement.parentNode;
              containerWrapper.appendChild(clone);
              // set clone visible
              clone.style.display = "block";
              // collect target dimension
              var targetSettingsPanelWidth =
                settingsPanelHTMLElement.scrollWidth;
              var targetSettingsPanelHeight =
                settingsPanelHTMLElement.scrollHeight;
              // remove clone from the DOM
              clone.parentElement.removeChild(clone); // .remove() is not working in IE
              sourcePage.getDomElement().css("display", "");
              // set the values back to the current ones that the browser animates it (browsers don't animate 'auto' values)
              settingsPanelDomElement.css({
                width: settingsPanelWidth + "px",
                height: settingsPanelHeight + "px",
              });
              if (!skipAnimation) {
                // We need to force the browser to reflow between setting the width and height that we actually get a animation
                this.forceBrowserReflow();
              }
              // set the values to the target dimension
              settingsPanelDomElement.css({
                width: targetSettingsPanelWidth + "px",
                height: targetSettingsPanelHeight + "px",
              });
            };
            SettingsPanel.prototype.forceBrowserReflow = function () {
              // Force the browser to reflow the layout
              // https://gist.github.com/paulirish/5d52fb081b3570c81e3a
              this.getDomElement().get(0).offsetLeft;
            };
            /**
             * Hack for IE + Firefox
             * when the settings panel fades out while an item of a select box is still hovered, the select box will not fade out
             * while the settings panel does. This would leave a floating select box, which is just weird
             */
            SettingsPanel.prototype.hideHoveredSelectBoxes = function () {
              this.getComputedItems().forEach(function (item) {
                if (
                  item.isActive() &&
                  item.setting instanceof selectbox_1.SelectBox
                ) {
                  var selectBox_1 = item.setting;
                  var oldDisplay_1 = selectBox_1.getDomElement().css("display");
                  if (oldDisplay_1 === "none") {
                    // if oldDisplay is already 'none', no need to set to 'none' again. It could lead to race condition
                    // wherein the display is irreversibly set to 'none' when browser tab/window is not active because
                    // requestAnimationFrame is either delayed or paused in some browsers in inactive state
                    return;
                  }
                  // updating the display to none marks the select-box as inactive, so it will be hidden with the rest
                  // we just have to make sure to reset this as soon as possible
                  selectBox_1.getDomElement().css("display", "none");
                  if (window.requestAnimationFrame) {
                    requestAnimationFrame(function () {
                      selectBox_1.getDomElement().css("display", oldDisplay_1);
                    });
                  } else {
                    // IE9 has no requestAnimationFrame, set the value directly. It has no optimization about ignoring DOM-changes
                    // between animationFrames
                    selectBox_1.getDomElement().css("display", oldDisplay_1);
                  }
                }
              });
            };
            // collect all items from all pages (see hideHoveredSelectBoxes)
            SettingsPanel.prototype.getComputedItems = function () {
              var allItems = [];
              for (var _i = 0, _a = this.getPages(); _i < _a.length; _i++) {
                var page = _a[_i];
                allItems.push.apply(allItems, page.getItems());
              }
              return allItems;
            };
            SettingsPanel.prototype.getRootPage = function () {
              return this.getPages()[0];
            };
            SettingsPanel.prototype.onSettingsStateChangedEvent = function () {
              this.settingsPanelEvents.onSettingsStateChanged.dispatch(this);
            };
            SettingsPanel.CLASS_ACTIVE_PAGE = "active";
            return SettingsPanel;
          })(container_1.Container));
        },
        {
          "../eventdispatcher": 88,
          "../timeout": 114,
          "./container": 19,
          "./selectbox": 48,
          "./settingspanelpage": 51,
        },
      ],
      50: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SettingsPanelItem = void 0;
          var container_1 = require("./container");
          var component_1 = require("./component");
          var eventdispatcher_1 = require("../eventdispatcher");
          var label_1 = require("./label");
          var selectbox_1 = require("./selectbox");
          var listbox_1 = require("./listbox");
          var videoqualityselectbox_1 = require("./videoqualityselectbox");
          var audioqualityselectbox_1 = require("./audioqualityselectbox");
          var playbackspeedselectbox_1 = require("./playbackspeedselectbox");
          /**
           * An item for a {@link SettingsPanelPage},
           * Containing an optional {@link Label} and a component that configures a setting.
           * If the components is a {@link SelectBox} it will handle the logic of displaying it or not
           */
          var SettingsPanelItem = /** @class */ (function (_super) {
            __extends(SettingsPanelItem, _super);
            function SettingsPanelItem(label, setting, config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.settingsPanelItemEvents = {
                onActiveChanged: new eventdispatcher_1.EventDispatcher(),
              };
              _this.setting = setting;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-settings-panel-item",
                  role: "menuitem",
                },
                _this.config
              );
              if (label !== null) {
                if (label instanceof component_1.Component) {
                  _this.label = label;
                } else {
                  _this.label = new label_1.Label({
                    text: label,
                    for: _this.setting.getConfig().id,
                  });
                }
                _this.addComponent(_this.label);
              }
              _this.addComponent(_this.setting);
              return _this;
            }
            SettingsPanelItem.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              if (
                this.setting instanceof selectbox_1.SelectBox ||
                this.setting instanceof listbox_1.ListBox
              ) {
                var handleConfigItemChanged = function () {
                  if (
                    !(_this.setting instanceof selectbox_1.SelectBox) &&
                    !(_this.setting instanceof listbox_1.ListBox)
                  ) {
                    return;
                  }
                  // The minimum number of items that must be available for the setting to be displayed
                  // By default, at least two items must be available, else a selection is not possible
                  var minItemsToDisplay = 2;
                  // Audio/video quality select boxes contain an additional 'auto' mode, which in combination with a single
                  // available quality also does not make sense
                  if (
                    (_this.setting instanceof
                      videoqualityselectbox_1.VideoQualitySelectBox &&
                      _this.setting.hasAutoItem()) ||
                    _this.setting instanceof
                      audioqualityselectbox_1.AudioQualitySelectBox
                  ) {
                    minItemsToDisplay = 3;
                  }
                  if (_this.setting.itemCount() < minItemsToDisplay) {
                    // Hide the setting if no meaningful choice is available
                    _this.hide();
                  } else if (
                    _this.setting instanceof
                      playbackspeedselectbox_1.PlaybackSpeedSelectBox &&
                    !uimanager.getConfig().playbackSpeedSelectionEnabled
                  ) {
                    // Hide the PlaybackSpeedSelectBox if disabled in config
                    _this.hide();
                  } else {
                    _this.show();
                  }
                  // Visibility might have changed and therefore the active state might have changed so we fire the event
                  // TODO fire only when state has really changed (e.g. check if visibility has really changed)
                  _this.onActiveChangedEvent();
                  _this.getDomElement().attr("aria-haspopup", "true");
                };
                this.setting.onItemAdded.subscribe(handleConfigItemChanged);
                this.setting.onItemRemoved.subscribe(handleConfigItemChanged);
                // Initialize hidden state
                handleConfigItemChanged();
              }
            };
            /**
             * Checks if this settings panel item is active, i.e. visible and enabled and a user can interact with it.
             * @returns {boolean} true if the panel is active, else false
             */
            SettingsPanelItem.prototype.isActive = function () {
              return this.isShown();
            };
            SettingsPanelItem.prototype.onActiveChangedEvent = function () {
              this.settingsPanelItemEvents.onActiveChanged.dispatch(this);
            };
            Object.defineProperty(
              SettingsPanelItem.prototype,
              "onActiveChanged",
              {
                /**
                 * Gets the event that is fired when the 'active' state of this item changes.
                 * @see #isActive
                 * @returns {Event<SettingsPanelItem, NoArgs>}
                 */
                get: function () {
                  return this.settingsPanelItemEvents.onActiveChanged.getEvent();
                },
                enumerable: false,
                configurable: true,
              }
            );
            return SettingsPanelItem;
          })(container_1.Container);
          exports.SettingsPanelItem = SettingsPanelItem;
        },
        {
          "../eventdispatcher": 88,
          "./audioqualityselectbox": 8,
          "./component": 18,
          "./container": 19,
          "./label": 33,
          "./listbox": 34,
          "./playbackspeedselectbox": 38,
          "./selectbox": 48,
          "./videoqualityselectbox": 79,
        },
      ],
      51: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SettingsPanelPage = void 0;
          var container_1 = require("./container");
          var settingspanelitem_1 = require("./settingspanelitem");
          var eventdispatcher_1 = require("../eventdispatcher");
          var browserutils_1 = require("../browserutils");
          /**
           * A panel containing a list of {@link SettingsPanelItem items} that represent labelled settings.
           */
          var SettingsPanelPage = (exports.SettingsPanelPage =
            /** @class */ (function (_super) {
              __extends(SettingsPanelPage, _super);
              function SettingsPanelPage(config) {
                var _this = _super.call(this, config) || this;
                _this.settingsPanelPageEvents = {
                  onSettingsStateChanged:
                    new eventdispatcher_1.EventDispatcher(),
                  onActive: new eventdispatcher_1.EventDispatcher(),
                  onInactive: new eventdispatcher_1.EventDispatcher(),
                };
                _this.config = _this.mergeConfig(
                  config,
                  {
                    cssClass: "ui-settings-panel-page",
                    role: "menu",
                  },
                  _this.config
                );
                return _this;
              }
              SettingsPanelPage.prototype.configure = function (
                player,
                uimanager
              ) {
                var _this = this;
                _super.prototype.configure.call(this, player, uimanager);
                // Fire event when the state of a settings-item has changed
                var settingsStateChangedHandler = function () {
                  _this.onSettingsStateChangedEvent();
                  // Attach marker class to last visible item
                  var lastShownItem = null;
                  for (
                    var _i = 0, _a = _this.getItems();
                    _i < _a.length;
                    _i++
                  ) {
                    var component = _a[_i];
                    component
                      .getDomElement()
                      .removeClass(
                        _this.prefixCss(SettingsPanelPage.CLASS_LAST)
                      );
                    if (component.isShown()) {
                      lastShownItem = component;
                    }
                  }
                  if (lastShownItem) {
                    lastShownItem
                      .getDomElement()
                      .addClass(_this.prefixCss(SettingsPanelPage.CLASS_LAST));
                  }
                };
                for (var _i = 0, _a = this.getItems(); _i < _a.length; _i++) {
                  var component = _a[_i];
                  component.onActiveChanged.subscribe(
                    settingsStateChangedHandler
                  );
                }
              };
              SettingsPanelPage.prototype.hasActiveSettings = function () {
                for (var _i = 0, _a = this.getItems(); _i < _a.length; _i++) {
                  var component = _a[_i];
                  if (component.isActive()) {
                    return true;
                  }
                }
                return false;
              };
              SettingsPanelPage.prototype.getItems = function () {
                return this.config.components.filter(function (component) {
                  return (
                    component instanceof settingspanelitem_1.SettingsPanelItem
                  );
                });
              };
              SettingsPanelPage.prototype.onSettingsStateChangedEvent =
                function () {
                  this.settingsPanelPageEvents.onSettingsStateChanged.dispatch(
                    this
                  );
                };
              Object.defineProperty(
                SettingsPanelPage.prototype,
                "onSettingsStateChanged",
                {
                  get: function () {
                    return this.settingsPanelPageEvents.onSettingsStateChanged.getEvent();
                  },
                  enumerable: false,
                  configurable: true,
                }
              );
              SettingsPanelPage.prototype.onActiveEvent = function () {
                var activeItems = this.getItems().filter(function (item) {
                  return item.isActive();
                });
                this.settingsPanelPageEvents.onActive.dispatch(this);
                // Disable focus for iOS and iPadOS 13. They open select boxes automatically on focus and we want to avoid that.
                if (
                  activeItems.length > 0 &&
                  !browserutils_1.BrowserUtils.isIOS &&
                  !(
                    browserutils_1.BrowserUtils.isMacIntel &&
                    browserutils_1.BrowserUtils.isTouchSupported
                  )
                ) {
                  activeItems[0].getDomElement().focusToFirstInput();
                }
              };
              Object.defineProperty(SettingsPanelPage.prototype, "onActive", {
                get: function () {
                  return this.settingsPanelPageEvents.onActive.getEvent();
                },
                enumerable: false,
                configurable: true,
              });
              SettingsPanelPage.prototype.onInactiveEvent = function () {
                this.settingsPanelPageEvents.onInactive.dispatch(this);
              };
              Object.defineProperty(SettingsPanelPage.prototype, "onInactive", {
                get: function () {
                  return this.settingsPanelPageEvents.onInactive.getEvent();
                },
                enumerable: false,
                configurable: true,
              });
              SettingsPanelPage.CLASS_LAST = "last";
              return SettingsPanelPage;
            })(container_1.Container));
        },
        {
          "../browserutils": 3,
          "../eventdispatcher": 88,
          "./container": 19,
          "./settingspanelitem": 50,
        },
      ],
      52: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SettingsPanelPageBackButton = void 0;
          var settingspanelpagenavigatorbutton_1 = require("./settingspanelpagenavigatorbutton");
          var SettingsPanelPageBackButton = /** @class */ (function (_super) {
            __extends(SettingsPanelPageBackButton, _super);
            function SettingsPanelPageBackButton(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-settingspanelpagebackbutton",
                  text: "back",
                },
                _this.config
              );
              return _this;
            }
            SettingsPanelPageBackButton.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.onClick.subscribe(function () {
                _this.popPage();
              });
            };
            return SettingsPanelPageBackButton;
          })(
            settingspanelpagenavigatorbutton_1.SettingsPanelPageNavigatorButton
          );
          exports.SettingsPanelPageBackButton = SettingsPanelPageBackButton;
        },
        { "./settingspanelpagenavigatorbutton": 53 },
      ],
      53: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SettingsPanelPageNavigatorButton = void 0;
          var button_1 = require("./button");
          /**
           * Can be used to navigate between SettingsPanelPages
           *
           * Example:
           *  let settingPanelNavigationButton = new SettingsPanelPageNavigatorButton({
           *    container: settingsPanel,
           *    targetPage: settingsPanelPage,
           *  });
           *
           *  settingsPanelPage.addComponent(settingPanelNavigationButton);
           *
           * Don't forget to add the settingPanelNavigationButton to the settingsPanelPage.
           */
          var SettingsPanelPageNavigatorButton = /** @class */ (function (
            _super
          ) {
            __extends(SettingsPanelPageNavigatorButton, _super);
            function SettingsPanelPageNavigatorButton(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(config, {}, _this.config);
              _this.container = _this.config.container;
              _this.targetPage = _this.config.targetPage;
              return _this;
            }
            /**
             * navigate one level back
             */
            SettingsPanelPageNavigatorButton.prototype.popPage = function () {
              this.container.popSettingsPanelPage();
            };
            /**
             * navigate to the target page
             */
            SettingsPanelPageNavigatorButton.prototype.pushTargetPage =
              function () {
                this.container.setActivePage(this.targetPage);
              };
            return SettingsPanelPageNavigatorButton;
          })(button_1.Button);
          exports.SettingsPanelPageNavigatorButton =
            SettingsPanelPageNavigatorButton;
        },
        { "./button": 12 },
      ],
      54: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SettingsPanelPageOpenButton = void 0;
          var settingspanelpagenavigatorbutton_1 = require("./settingspanelpagenavigatorbutton");
          var i18n_1 = require("../localization/i18n");
          var SettingsPanelPageOpenButton = /** @class */ (function (_super) {
            __extends(SettingsPanelPageOpenButton, _super);
            function SettingsPanelPageOpenButton(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-settingspanelpageopenbutton",
                  text: i18n_1.i18n.getLocalizer("open"),
                  role: "menuitem",
                },
                _this.config
              );
              return _this;
            }
            SettingsPanelPageOpenButton.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.getDomElement().attr("aria-haspopup", "true");
              this.getDomElement().attr(
                "aria-owns",
                this.config.targetPage.getConfig().id
              );
              this.onClick.subscribe(function () {
                _this.pushTargetPage();
              });
            };
            return SettingsPanelPageOpenButton;
          })(
            settingspanelpagenavigatorbutton_1.SettingsPanelPageNavigatorButton
          );
          exports.SettingsPanelPageOpenButton = SettingsPanelPageOpenButton;
        },
        {
          "../localization/i18n": 93,
          "./settingspanelpagenavigatorbutton": 53,
        },
      ],
      55: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SettingsToggleButton = void 0;
          var togglebutton_1 = require("./togglebutton");
          var settingspanel_1 = require("./settingspanel");
          var arrayutils_1 = require("../arrayutils");
          var i18n_1 = require("../localization/i18n");
          /**
           * A button that toggles visibility of a settings panel.
           */
          var SettingsToggleButton = /** @class */ (function (_super) {
            __extends(SettingsToggleButton, _super);
            function SettingsToggleButton(config) {
              var _this = _super.call(this, config) || this;
              _this.visibleSettingsPanels = [];
              if (!config.settingsPanel) {
                throw new Error("Required SettingsPanel is missing");
              }
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-settingstogglebutton",
                  text: i18n_1.i18n.getLocalizer("settings"),
                  settingsPanel: null,
                  autoHideWhenNoActiveSettings: true,
                  role: "pop-up button",
                },
                _this.config
              );
              /**
               * WCAG20 standard defines which popup menu (element id) is owned by the button
               */
              _this
                .getDomElement()
                .attr(
                  "aria-owns",
                  config.settingsPanel.getActivePage().getConfig().id
                );
              /**
               * WCAG20 standard defines that a button has a popup menu bound to it
               */
              _this.getDomElement().attr("aria-haspopup", "true");
              return _this;
            }
            SettingsToggleButton.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              var settingsPanel = config.settingsPanel;
              this.onClick.subscribe(function () {
                // only hide other `SettingsPanel`s if a new one will be opened
                if (!settingsPanel.isShown()) {
                  // Hide all open SettingsPanels before opening this button's panel
                  // (We need to iterate a copy because hiding them will automatically remove themselves from the array
                  // due to the subscribeOnce above)
                  _this.visibleSettingsPanels
                    .slice()
                    .forEach(function (settingsPanel) {
                      return settingsPanel.hide();
                    });
                }
                settingsPanel.toggleHidden();
              });
              settingsPanel.onShow.subscribe(function () {
                // Set toggle status to on when the settings panel shows
                _this.on();
              });
              settingsPanel.onHide.subscribe(function () {
                // Set toggle status to off when the settings panel hides
                _this.off();
              });
              // Ensure that only one `SettingPanel` is visible at once
              // Keep track of shown SettingsPanels
              uimanager.onComponentShow.subscribe(function (sender) {
                if (sender instanceof settingspanel_1.SettingsPanel) {
                  _this.visibleSettingsPanels.push(sender);
                  sender.onHide.subscribeOnce(function () {
                    return arrayutils_1.ArrayUtils.remove(
                      _this.visibleSettingsPanels,
                      sender
                    );
                  });
                }
              });
              // Handle automatic hiding of the button if there are no settings for the user to interact with
              if (config.autoHideWhenNoActiveSettings) {
                // Setup handler to show/hide button when the settings change
                var settingsPanelItemsChangedHandler = function () {
                  if (settingsPanel.rootPageHasActiveSettings()) {
                    if (_this.isHidden()) {
                      _this.show();
                    }
                  } else {
                    if (_this.isShown()) {
                      _this.hide();
                    }
                  }
                };
                // Wire the handler to the event
                settingsPanel.onSettingsStateChanged.subscribe(
                  settingsPanelItemsChangedHandler
                );
                // Call handler for first init at startup
                settingsPanelItemsChangedHandler();
              }
            };
            return SettingsToggleButton;
          })(togglebutton_1.ToggleButton);
          exports.SettingsToggleButton = SettingsToggleButton;
        },
        {
          "../arrayutils": 1,
          "../localization/i18n": 93,
          "./settingspanel": 49,
          "./togglebutton": 76,
        },
      ],
      56: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.Spacer = void 0;
          var component_1 = require("./component");
          /**
           * A dummy component that just reserves some space and does nothing else.
           */
          var Spacer = /** @class */ (function (_super) {
            __extends(Spacer, _super);
            function Spacer(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-spacer",
                },
                _this.config
              );
              return _this;
            }
            Spacer.prototype.onShowEvent = function () {
              // disable event firing by overwriting and not calling super
            };
            Spacer.prototype.onHideEvent = function () {
              // disable event firing by overwriting and not calling super
            };
            Spacer.prototype.onHoverChangedEvent = function (hovered) {
              // disable event firing by overwriting and not calling super
            };
            return Spacer;
          })(component_1.Component);
          exports.Spacer = Spacer;
        },
        { "./component": 18 },
      ],
      57: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SubtitleListBox = void 0;
          var listbox_1 = require("./listbox");
          var subtitleutils_1 = require("../subtitleutils");
          /**
           * A element that is similar to a select box where the user can select a subtitle
           */
          var SubtitleListBox = /** @class */ (function (_super) {
            __extends(SubtitleListBox, _super);
            function SubtitleListBox() {
              return (_super !== null && _super.apply(this, arguments)) || this;
            }
            SubtitleListBox.prototype.configure = function (player, uimanager) {
              _super.prototype.configure.call(this, player, uimanager);
              new subtitleutils_1.SubtitleSwitchHandler(
                player,
                this,
                uimanager
              );
            };
            return SubtitleListBox;
          })(listbox_1.ListBox);
          exports.SubtitleListBox = SubtitleListBox;
        },
        { "../subtitleutils": 113, "./listbox": 34 },
      ],
      58: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SubtitleRegionContainer =
            exports.SubtitleRegionContainerManager =
            exports.SubtitleLabel =
            exports.SubtitleOverlay =
              void 0;
          var container_1 = require("./container");
          var label_1 = require("./label");
          var controlbar_1 = require("./controlbar");
          var eventdispatcher_1 = require("../eventdispatcher");
          var dom_1 = require("../dom");
          var i18n_1 = require("../localization/i18n");
          var vttutils_1 = require("../vttutils");
          /**
           * Overlays the player to display subtitles.
           */
          var SubtitleOverlay = (exports.SubtitleOverlay =
            /** @class */ (function (_super) {
              __extends(SubtitleOverlay, _super);
              function SubtitleOverlay(config) {
                if (config === void 0) {
                  config = {};
                }
                var _this = _super.call(this, config) || this;
                _this.preprocessLabelEventCallback =
                  new eventdispatcher_1.EventDispatcher();
                _this.previewSubtitleActive = false;
                _this.previewSubtitle = new SubtitleLabel({
                  text: i18n_1.i18n.getLocalizer("subtitle.example"),
                });
                _this.config = _this.mergeConfig(
                  config,
                  {
                    cssClass: "ui-subtitle-overlay",
                  },
                  _this.config
                );
                return _this;
              }
              SubtitleOverlay.prototype.configure = function (
                player,
                uimanager
              ) {
                var _this = this;
                _super.prototype.configure.call(this, player, uimanager);
                var subtitleManager = new ActiveSubtitleManager();
                this.subtitleManager = subtitleManager;
                this.subtitleContainerManager =
                  new SubtitleRegionContainerManager(this);
                player.on(
                  player.exports.PlayerEvent.CueEnter,
                  function (event) {
                    var label = _this.generateLabel(event);
                    subtitleManager.cueEnter(event, label);
                    _this.preprocessLabelEventCallback.dispatch(event, label);
                    if (_this.previewSubtitleActive) {
                      _this.subtitleContainerManager.removeLabel(
                        _this.previewSubtitle
                      );
                    }
                    _this.show();
                    _this.subtitleContainerManager.addLabel(
                      label,
                      _this.getDomElement().size()
                    );
                    _this.updateComponents();
                    if (uimanager.getConfig().forceSubtitlesIntoViewContainer) {
                      _this.handleSubtitleCropping(label);
                    }
                  }
                );
                player.on(
                  player.exports.PlayerEvent.CueUpdate,
                  function (event) {
                    var label = _this.generateLabel(event);
                    var labelToReplace = subtitleManager.cueUpdate(
                      event,
                      label
                    );
                    _this.preprocessLabelEventCallback.dispatch(event, label);
                    if (labelToReplace) {
                      _this.subtitleContainerManager.replaceLabel(
                        labelToReplace,
                        label
                      );
                    }
                    if (uimanager.getConfig().forceSubtitlesIntoViewContainer) {
                      _this.handleSubtitleCropping(label);
                    }
                  }
                );
                player.on(player.exports.PlayerEvent.CueExit, function (event) {
                  var labelToRemove = subtitleManager.cueExit(event);
                  if (labelToRemove) {
                    _this.subtitleContainerManager.removeLabel(labelToRemove);
                    _this.updateComponents();
                  }
                  if (!subtitleManager.hasCues) {
                    if (!_this.previewSubtitleActive) {
                      _this.hide();
                    } else {
                      _this.subtitleContainerManager.addLabel(
                        _this.previewSubtitle
                      );
                      _this.updateComponents();
                    }
                  }
                });
                var subtitleClearHandler = function () {
                  _this.hide();
                  _this.subtitleContainerManager.clear();
                  subtitleManager.clear();
                  _this.removeComponents();
                  _this.updateComponents();
                };
                var clearInactiveCues = function () {
                  var removedActiveCues = subtitleManager.clearInactiveCues(
                    player.getCurrentTime()
                  );
                  removedActiveCues.forEach(function (toRemove) {
                    _this.subtitleContainerManager.removeLabel(toRemove.label);
                  });
                };
                player.on(
                  player.exports.PlayerEvent.AudioChanged,
                  subtitleClearHandler
                );
                player.on(
                  player.exports.PlayerEvent.SubtitleEnabled,
                  subtitleClearHandler
                );
                player.on(
                  player.exports.PlayerEvent.SubtitleDisabled,
                  subtitleClearHandler
                );
                player.on(player.exports.PlayerEvent.Seeked, clearInactiveCues);
                player.on(
                  player.exports.PlayerEvent.TimeShifted,
                  clearInactiveCues
                );
                player.on(
                  player.exports.PlayerEvent.PlaybackFinished,
                  subtitleClearHandler
                );
                player.on(
                  player.exports.PlayerEvent.SourceUnloaded,
                  subtitleClearHandler
                );
                uimanager.onComponentShow.subscribe(function (component) {
                  if (component instanceof controlbar_1.ControlBar) {
                    _this
                      .getDomElement()
                      .addClass(
                        _this.prefixCss(
                          SubtitleOverlay.CLASS_CONTROLBAR_VISIBLE
                        )
                      );
                  }
                });
                uimanager.onComponentHide.subscribe(function (component) {
                  if (component instanceof controlbar_1.ControlBar) {
                    _this
                      .getDomElement()
                      .removeClass(
                        _this.prefixCss(
                          SubtitleOverlay.CLASS_CONTROLBAR_VISIBLE
                        )
                      );
                  }
                });
                this.configureCea608Captions(player, uimanager);
                // Init
                subtitleClearHandler();
              };
              SubtitleOverlay.prototype.detectCroppedSubtitleLabel = function (
                labelElement
              ) {
                var parent = this.getDomElement().get(0);
                var childRect = labelElement.getBoundingClientRect();
                var parentRect = parent.getBoundingClientRect();
                return {
                  top: childRect.top < parentRect.top,
                  right: childRect.right > parentRect.right,
                  bottom: childRect.bottom > parentRect.bottom,
                  left: childRect.left < parentRect.left,
                };
              };
              SubtitleOverlay.prototype.handleSubtitleCropping = function (
                label
              ) {
                var labelDomElement = label.getDomElement();
                var cropDetection = this.detectCroppedSubtitleLabel(
                  labelDomElement.get(0)
                );
                if (cropDetection.top) {
                  labelDomElement.css("top", "0");
                  labelDomElement.removeCss("bottom");
                }
                if (cropDetection.right) {
                  labelDomElement.css("right", "0");
                  labelDomElement.removeCss("left");
                }
                if (cropDetection.bottom) {
                  labelDomElement.css("bottom", "0");
                  labelDomElement.removeCss("top");
                }
                if (cropDetection.left) {
                  labelDomElement.css("left", "0");
                  labelDomElement.removeCss("right");
                }
              };
              SubtitleOverlay.prototype.generateLabel = function (event) {
                // Sanitize cue data (must be done before the cue ID is generated in subtitleManager.cueEnter / update)
                if (event.position) {
                  // Sometimes the positions are undefined, we assume them to be zero
                  event.position.row = event.position.row || 0;
                  event.position.column = event.position.column || 0;
                }
                var label = new SubtitleLabel({
                  // Prefer the HTML subtitle text if set, else try generating a image tag as string from the image attribute,
                  // else use the plain text
                  text:
                    event.html ||
                    ActiveSubtitleManager.generateImageTagText(event.image) ||
                    event.text,
                  vtt: event.vtt,
                  region: event.region,
                  regionStyle: event.regionStyle,
                });
                return label;
              };
              SubtitleOverlay.prototype.configureCea608Captions = function (
                player,
                uimanager
              ) {
                var _this = this;
                // The calculated font size
                var fontSize = 0;
                // The required letter spacing spread the text characters evenly across the grid
                var fontLetterSpacing = 0;
                // Flag telling if a font size calculation is required of if the current values are valid
                var fontSizeCalculationRequired = true;
                // Flag telling if the CEA-608 mode is enabled
                var enabled = false;
                var updateCEA608FontSize = function () {
                  var dummyLabel = new SubtitleLabel({ text: "X" });
                  dummyLabel.getDomElement().css({
                    // By using a large font size we do not need to use multiple letters and can get still an
                    // accurate measurement even though the returned size is an integer value
                    "font-size": "200px",
                    "line-height": "200px",
                    visibility: "hidden",
                  });
                  _this.addComponent(dummyLabel);
                  _this.updateComponents();
                  _this.show();
                  var dummyLabelCharWidth = dummyLabel.getDomElement().width();
                  var dummyLabelCharHeight = dummyLabel
                    .getDomElement()
                    .height();
                  var fontSizeRatio =
                    dummyLabelCharWidth / dummyLabelCharHeight;
                  _this.removeComponent(dummyLabel);
                  _this.updateComponents();
                  if (!_this.subtitleManager.hasCues) {
                    _this.hide();
                  }
                  // We subtract 1px here to avoid line breaks at the right border of the subtitle overlay that can happen
                  // when texts contain whitespaces. It's probably some kind of pixel rounding issue in the browser's
                  // layouting, but the actual reason could not be determined. Aiming for a target width - 1px would work in
                  // most browsers, but Safari has a "quantized" font size rendering with huge steps in between so we need
                  // to subtract some more pixels to avoid line breaks there as well.
                  var subtitleOverlayWidth = _this.getDomElement().width() - 10;
                  var subtitleOverlayHeight = _this.getDomElement().height();
                  // The size ratio of the letter grid
                  var fontGridSizeRatio =
                    (dummyLabelCharWidth * SubtitleOverlay.CEA608_NUM_COLUMNS) /
                    (dummyLabelCharHeight * SubtitleOverlay.CEA608_NUM_ROWS);
                  // The size ratio of the available space for the grid
                  var subtitleOverlaySizeRatio =
                    subtitleOverlayWidth / subtitleOverlayHeight;
                  if (subtitleOverlaySizeRatio > fontGridSizeRatio) {
                    // When the available space is wider than the text grid, the font size is simply
                    // determined by the height of the available space.
                    fontSize =
                      subtitleOverlayHeight / SubtitleOverlay.CEA608_NUM_ROWS;
                    // Calculate the additional letter spacing required to evenly spread the text across the grid's width
                    var gridSlotWidth =
                      subtitleOverlayWidth / SubtitleOverlay.CEA608_NUM_COLUMNS;
                    var fontCharWidth = fontSize * fontSizeRatio;
                    fontLetterSpacing = gridSlotWidth - fontCharWidth;
                  } else {
                    // When the available space is not wide enough, texts would vertically overlap if we take
                    // the height as a base for the font size, so we need to limit the height. We do that
                    // by determining the font size by the width of the available space.
                    fontSize =
                      subtitleOverlayWidth /
                      SubtitleOverlay.CEA608_NUM_COLUMNS /
                      fontSizeRatio;
                    fontLetterSpacing = 0;
                  }
                  // Update font-size of all active subtitle labels
                  for (
                    var _i = 0, _a = _this.getComponents();
                    _i < _a.length;
                    _i++
                  ) {
                    var label = _a[_i];
                    if (label instanceof SubtitleLabel) {
                      label.getDomElement().css({
                        "font-size": "".concat(fontSize, "px"),
                        "letter-spacing": "".concat(fontLetterSpacing, "px"),
                      });
                    }
                  }
                };
                player.on(
                  player.exports.PlayerEvent.PlayerResized,
                  function () {
                    if (enabled) {
                      updateCEA608FontSize();
                    } else {
                      fontSizeCalculationRequired = true;
                    }
                  }
                );
                this.preprocessLabelEventCallback.subscribe(function (
                  event,
                  label
                ) {
                  var isCEA608 = event.position != null;
                  if (!isCEA608) {
                    // Skip all non-CEA608 cues
                    return;
                  }
                  if (!enabled) {
                    enabled = true;
                    _this
                      .getDomElement()
                      .addClass(_this.prefixCss(SubtitleOverlay.CLASS_CEA_608));
                    // We conditionally update the font size by this flag here to avoid updating every time a subtitle
                    // is added into an empty overlay. Because we reset the overlay when all subtitles are gone, this
                    // would trigger an unnecessary update every time, but it's only required under certain conditions,
                    // e.g. after the player size has changed.
                    if (fontSizeCalculationRequired) {
                      updateCEA608FontSize();
                      fontSizeCalculationRequired = false;
                    }
                  }
                  label.getDomElement().css({
                    left: "".concat(
                      event.position.column *
                        SubtitleOverlay.CEA608_COLUMN_OFFSET,
                      "%"
                    ),
                    top: "".concat(
                      event.position.row * SubtitleOverlay.CEA608_ROW_OFFSET,
                      "%"
                    ),
                    "font-size": "".concat(fontSize, "px"),
                    "letter-spacing": "".concat(fontLetterSpacing, "px"),
                  });
                });
                var reset = function () {
                  _this
                    .getDomElement()
                    .removeClass(
                      _this.prefixCss(SubtitleOverlay.CLASS_CEA_608)
                    );
                  enabled = false;
                };
                player.on(player.exports.PlayerEvent.CueExit, function () {
                  if (!_this.subtitleManager.hasCues) {
                    // Disable CEA-608 mode when all subtitles are gone (to allow correct formatting and
                    // display of other types of subtitles, e.g. the formatting preview subtitle)
                    reset();
                  }
                });
                player.on(player.exports.PlayerEvent.SourceUnloaded, reset);
                player.on(player.exports.PlayerEvent.SubtitleEnabled, reset);
                player.on(player.exports.PlayerEvent.SubtitleDisabled, reset);
              };
              SubtitleOverlay.prototype.enablePreviewSubtitleLabel =
                function () {
                  if (!this.subtitleManager.hasCues) {
                    this.previewSubtitleActive = true;
                    this.subtitleContainerManager.addLabel(
                      this.previewSubtitle
                    );
                    this.updateComponents();
                    this.show();
                  }
                };
              SubtitleOverlay.prototype.removePreviewSubtitleLabel =
                function () {
                  if (this.previewSubtitleActive) {
                    this.previewSubtitleActive = false;
                    this.subtitleContainerManager.removeLabel(
                      this.previewSubtitle
                    );
                    this.updateComponents();
                  }
                };
              SubtitleOverlay.CLASS_CONTROLBAR_VISIBLE = "controlbar-visible";
              SubtitleOverlay.CLASS_CEA_608 = "cea608";
              // The number of rows in a cea608 grid
              SubtitleOverlay.CEA608_NUM_ROWS = 15;
              // The number of columns in a cea608 grid
              SubtitleOverlay.CEA608_NUM_COLUMNS = 32;
              // The offset in percent for one row (which is also the height of a row)
              SubtitleOverlay.CEA608_ROW_OFFSET =
                100 / SubtitleOverlay.CEA608_NUM_ROWS;
              // The offset in percent for one column (which is also the width of a column)
              SubtitleOverlay.CEA608_COLUMN_OFFSET =
                100 / SubtitleOverlay.CEA608_NUM_COLUMNS;
              return SubtitleOverlay;
            })(container_1.Container));
          var SubtitleLabel = /** @class */ (function (_super) {
            __extends(SubtitleLabel, _super);
            function SubtitleLabel(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-subtitle-label",
                },
                _this.config
              );
              return _this;
            }
            Object.defineProperty(SubtitleLabel.prototype, "vtt", {
              get: function () {
                return this.config.vtt;
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(SubtitleLabel.prototype, "region", {
              get: function () {
                return this.config.region;
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(SubtitleLabel.prototype, "regionStyle", {
              get: function () {
                return this.config.regionStyle;
              },
              enumerable: false,
              configurable: true,
            });
            return SubtitleLabel;
          })(label_1.Label);
          exports.SubtitleLabel = SubtitleLabel;
          var ActiveSubtitleManager = /** @class */ (function () {
            function ActiveSubtitleManager() {
              this.activeSubtitleCueMap = {};
              this.activeSubtitleCueCount = 0;
            }
            /**
             * Calculates a unique ID for a subtitle cue, which is needed to associate an CueEnter with its CueExit
             * event so we can remove the correct subtitle in CueExit when multiple subtitles are active at the same time.
             * The start time plus the text should make a unique identifier, and in the only case where a collision
             * can happen, two similar texts will be displayed at a similar time and a similar position (or without position).
             * The start time should always be known, because it is required to schedule the CueEnter event. The end time
             * must not necessarily be known and therefore cannot be used for the ID.
             * @param event
             * @return {string}
             */
            ActiveSubtitleManager.calculateId = function (event) {
              var id = event.start + "-" + event.text;
              if (event.position) {
                id += "-" + event.position.row + "-" + event.position.column;
              }
              return id;
            };
            ActiveSubtitleManager.prototype.cueEnter = function (event, label) {
              this.addCueToMap(event, label);
            };
            ActiveSubtitleManager.prototype.cueUpdate = function (
              event,
              label
            ) {
              var labelToReplace = this.popCueFromMap(event);
              if (labelToReplace) {
                this.addCueToMap(event, label);
                return labelToReplace;
              }
              return undefined;
            };
            ActiveSubtitleManager.prototype.addCueToMap = function (
              event,
              label
            ) {
              var id = ActiveSubtitleManager.calculateId(event);
              // Create array for id if it does not exist
              this.activeSubtitleCueMap[id] =
                this.activeSubtitleCueMap[id] || [];
              // Add cue
              this.activeSubtitleCueMap[id].push({
                event: event,
                label: label,
              });
              this.activeSubtitleCueCount++;
            };
            ActiveSubtitleManager.prototype.popCueFromMap = function (event) {
              var id = ActiveSubtitleManager.calculateId(event);
              var activeSubtitleCues = this.activeSubtitleCueMap[id];
              if (activeSubtitleCues && activeSubtitleCues.length > 0) {
                // Remove cue
                /* We apply the FIFO approach here and remove the oldest cue from the associated id. When there are multiple cues
                 * with the same id, there is no way to know which one of the cues is to be deleted, so we just hope that FIFO
                 * works fine. Theoretically it can happen that two cues with colliding ids are removed at different times, in
                 * the wrong order. This rare case has yet to be observed. If it ever gets an issue, we can take the unstable
                 * cue end time (which can change between CueEnter and CueExit IN CueUpdate) and use it as an
                 * additional hint to try and remove the correct one of the colliding cues.
                 */
                var activeSubtitleCue = activeSubtitleCues.shift();
                this.activeSubtitleCueCount--;
                return activeSubtitleCue.label;
              }
            };
            /**
             * Removes all active cues which don't enclose the given time
             * @param time the time for which subtitles should remain
             */
            ActiveSubtitleManager.prototype.clearInactiveCues = function (
              time
            ) {
              var _this = this;
              var removedCues = [];
              Object.keys(this.activeSubtitleCueMap).forEach(function (key) {
                var activeCues = _this.activeSubtitleCueMap[key];
                activeCues.forEach(function (cue) {
                  if (time < cue.event.start || time > cue.event.end) {
                    _this.popCueFromMap(cue.event);
                    removedCues.push(cue);
                  }
                });
              });
              return removedCues;
            };
            ActiveSubtitleManager.generateImageTagText = function (imageData) {
              if (!imageData) {
                return;
              }
              var imgTag = new dom_1.DOM("img", {
                src: imageData,
              });
              imgTag.css("width", "100%");
              return imgTag.get(0).outerHTML; // return the html as string
            };
            /**
             * Returns the label associated with an already added cue.
             * @param event
             * @return {SubtitleLabel}
             */
            ActiveSubtitleManager.prototype.getCues = function (event) {
              var id = ActiveSubtitleManager.calculateId(event);
              var activeSubtitleCues = this.activeSubtitleCueMap[id];
              if (activeSubtitleCues && activeSubtitleCues.length > 0) {
                return activeSubtitleCues.map(function (cue) {
                  return cue.label;
                });
              }
            };
            /**
             * Removes the subtitle cue from the manager and returns the label that should be removed from the subtitle overlay,
             * or null if there is no associated label existing (e.g. because all labels have been {@link #clear cleared}.
             * @param event
             * @return {SubtitleLabel|null}
             */
            ActiveSubtitleManager.prototype.cueExit = function (event) {
              return this.popCueFromMap(event);
            };
            Object.defineProperty(ActiveSubtitleManager.prototype, "cueCount", {
              /**
               * Returns the number of active subtitle cues.
               * @return {number}
               */
              get: function () {
                // We explicitly count the cues to save an Array.reduce on every cueCount call (which can happen frequently)
                return this.activeSubtitleCueCount;
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(ActiveSubtitleManager.prototype, "hasCues", {
              /**
               * Returns true if there are active subtitle cues, else false.
               * @return {boolean}
               */
              get: function () {
                return this.cueCount > 0;
              },
              enumerable: false,
              configurable: true,
            });
            /**
             * Removes all subtitle cues from the manager.
             */
            ActiveSubtitleManager.prototype.clear = function () {
              this.activeSubtitleCueMap = {};
              this.activeSubtitleCueCount = 0;
            };
            return ActiveSubtitleManager;
          })();
          var SubtitleRegionContainerManager = /** @class */ (function () {
            /**
             * @param subtitleOverlay Reference to the subtitle overlay for adding and removing the containers.
             */
            function SubtitleRegionContainerManager(subtitleOverlay) {
              this.subtitleOverlay = subtitleOverlay;
              this.subtitleRegionContainers = {};
              this.subtitleOverlay = subtitleOverlay;
            }
            SubtitleRegionContainerManager.prototype.getRegion = function (
              label
            ) {
              if (label.vtt) {
                return {
                  regionContainerId:
                    label.vtt.region && label.vtt.region.id
                      ? label.vtt.region.id
                      : "vtt",
                  regionName: "vtt",
                };
              }
              return {
                regionContainerId: label.region || "default",
                regionName: label.region || "default",
              };
            };
            /**
             * Creates and wraps a subtitle label into a container div based on the subtitle region.
             * If the subtitle has positioning information it is added to the container.
             * @param label The subtitle label to wrap
             */
            SubtitleRegionContainerManager.prototype.addLabel = function (
              label,
              overlaySize
            ) {
              var _a = this.getRegion(label),
                regionContainerId = _a.regionContainerId,
                regionName = _a.regionName;
              var cssClasses = ["subtitle-position-".concat(regionName)];
              if (label.vtt && label.vtt.region) {
                cssClasses.push("vtt-region-".concat(label.vtt.region.id));
              }
              if (!this.subtitleRegionContainers[regionContainerId]) {
                var regionContainer = new SubtitleRegionContainer({
                  cssClasses: cssClasses,
                });
                this.subtitleRegionContainers[regionContainerId] =
                  regionContainer;
                if (label.regionStyle) {
                  regionContainer
                    .getDomElement()
                    .attr("style", label.regionStyle);
                } else if (label.vtt && !label.vtt.region) {
                  /**
                   * If there is no region present to wrap the Cue Box, the Cue box becomes the
                   * region itself. Therefore the positioning values have to come from the box.
                   */
                  regionContainer.getDomElement().css("position", "static");
                } else {
                  // getDomElement needs to be called at least once to ensure the component exists
                  regionContainer.getDomElement();
                }
                for (var regionContainerId_1 in this.subtitleRegionContainers) {
                  this.subtitleOverlay.addComponent(
                    this.subtitleRegionContainers[regionContainerId_1]
                  );
                }
              }
              this.subtitleRegionContainers[regionContainerId].addLabel(
                label,
                overlaySize
              );
            };
            SubtitleRegionContainerManager.prototype.replaceLabel = function (
              previousLabel,
              newLabel
            ) {
              var regionContainerId =
                this.getRegion(previousLabel).regionContainerId;
              this.subtitleRegionContainers[regionContainerId].removeLabel(
                previousLabel
              );
              this.subtitleRegionContainers[regionContainerId].addLabel(
                newLabel
              );
            };
            /**
             * Removes a subtitle label from a container.
             */
            SubtitleRegionContainerManager.prototype.removeLabel = function (
              label
            ) {
              var regionContainerId;
              if (label.vtt) {
                regionContainerId =
                  label.vtt.region && label.vtt.region.id
                    ? label.vtt.region.id
                    : "vtt";
              } else {
                regionContainerId = label.region || "default";
              }
              this.subtitleRegionContainers[regionContainerId].removeLabel(
                label
              );
              // Remove container if no more labels are displayed
              if (this.subtitleRegionContainers[regionContainerId].isEmpty()) {
                this.subtitleOverlay.removeComponent(
                  this.subtitleRegionContainers[regionContainerId]
                );
                delete this.subtitleRegionContainers[regionContainerId];
              }
            };
            /**
             * Removes all subtitle containers.
             */
            SubtitleRegionContainerManager.prototype.clear = function () {
              for (var regionName in this.subtitleRegionContainers) {
                this.subtitleOverlay.removeComponent(
                  this.subtitleRegionContainers[regionName]
                );
              }
              this.subtitleRegionContainers = {};
            };
            return SubtitleRegionContainerManager;
          })();
          exports.SubtitleRegionContainerManager =
            SubtitleRegionContainerManager;
          var SubtitleRegionContainer = /** @class */ (function (_super) {
            __extends(SubtitleRegionContainer, _super);
            function SubtitleRegionContainer(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.labelCount = 0;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "subtitle-region-container",
                },
                _this.config
              );
              return _this;
            }
            SubtitleRegionContainer.prototype.addLabel = function (
              labelToAdd,
              overlaySize
            ) {
              this.labelCount++;
              if (labelToAdd.vtt) {
                if (labelToAdd.vtt.region && overlaySize) {
                  vttutils_1.VttUtils.setVttRegionStyles(
                    this,
                    labelToAdd.vtt.region,
                    overlaySize
                  );
                }
                vttutils_1.VttUtils.setVttCueBoxStyles(labelToAdd, overlaySize);
              }
              this.addComponent(labelToAdd);
              this.updateComponents();
            };
            SubtitleRegionContainer.prototype.removeLabel = function (
              labelToRemove
            ) {
              this.labelCount--;
              this.removeComponent(labelToRemove);
              this.updateComponents();
            };
            SubtitleRegionContainer.prototype.isEmpty = function () {
              return this.labelCount === 0;
            };
            return SubtitleRegionContainer;
          })(container_1.Container);
          exports.SubtitleRegionContainer = SubtitleRegionContainer;
        },
        {
          "../dom": 86,
          "../eventdispatcher": 88,
          "../localization/i18n": 93,
          "../vttutils": 120,
          "./container": 19,
          "./controlbar": 20,
          "./label": 33,
        },
      ],
      59: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SubtitleSelectBox = void 0;
          var selectbox_1 = require("./selectbox");
          var subtitleutils_1 = require("../subtitleutils");
          var i18n_1 = require("../localization/i18n");
          /**
           * A select box providing a selection between available subtitle and caption tracks.
           */
          var SubtitleSelectBox = /** @class */ (function (_super) {
            __extends(SubtitleSelectBox, _super);
            function SubtitleSelectBox(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-subtitleselectbox"],
                  ariaLabel: i18n_1.i18n.getLocalizer("subtitle.select"),
                },
                _this.config
              );
              return _this;
            }
            SubtitleSelectBox.prototype.configure = function (
              player,
              uimanager
            ) {
              _super.prototype.configure.call(this, player, uimanager);
              new subtitleutils_1.SubtitleSwitchHandler(
                player,
                this,
                uimanager
              );
            };
            return SubtitleSelectBox;
          })(selectbox_1.SelectBox);
          exports.SubtitleSelectBox = SubtitleSelectBox;
        },
        {
          "../localization/i18n": 93,
          "../subtitleutils": 113,
          "./selectbox": 48,
        },
      ],
      60: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.BackgroundColorSelectBox = void 0;
          var subtitlesettingselectbox_1 = require("./subtitlesettingselectbox");
          var i18n_1 = require("../../localization/i18n");
          /**
           * A select box providing a selection of different background colors.
           */
          var BackgroundColorSelectBox = /** @class */ (function (_super) {
            __extends(BackgroundColorSelectBox, _super);
            function BackgroundColorSelectBox(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-subtitlesettingsbackgroundcolorselectbox"],
                },
                _this.config
              );
              return _this;
            }
            BackgroundColorSelectBox.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.addItem("black", i18n_1.i18n.getLocalizer("default"));
              this.addItem("white", i18n_1.i18n.getLocalizer("colors.white"));
              this.addItem("black", i18n_1.i18n.getLocalizer("colors.black"));
              this.addItem("red", i18n_1.i18n.getLocalizer("colors.red"));
              this.addItem("green", i18n_1.i18n.getLocalizer("colors.green"));
              this.addItem("blue", i18n_1.i18n.getLocalizer("colors.blue"));
              this.addItem("cyan", i18n_1.i18n.getLocalizer("colors.cyan"));
              this.addItem("yellow", i18n_1.i18n.getLocalizer("colors.yellow"));
              this.addItem(
                "magenta",
                i18n_1.i18n.getLocalizer("colors.magenta")
              );
              var setColorAndOpacity = function () {
                if (
                  _this.settingsManager.backgroundColor.isSet() &&
                  _this.settingsManager.backgroundOpacity.isSet()
                ) {
                  _this.toggleOverlayClass(
                    "bgcolor-" +
                      _this.settingsManager.backgroundColor.value +
                      _this.settingsManager.backgroundOpacity.value
                  );
                } else {
                  _this.toggleOverlayClass(null);
                }
              };
              this.onItemSelected.subscribe(function (sender, key) {
                _this.settingsManager.backgroundColor.value = key;
              });
              this.settingsManager.backgroundColor.onChanged.subscribe(
                function (sender, property) {
                  // Color and opacity go together, so we need to...
                  if (!_this.settingsManager.backgroundColor.isSet()) {
                    // ... clear the opacity when the color is not set
                    _this.settingsManager.backgroundOpacity.clear();
                  } else if (!_this.settingsManager.backgroundOpacity.isSet()) {
                    // ... set an opacity when the color is set
                    _this.settingsManager.backgroundOpacity.value = "100";
                  }
                  _this.selectItem(property.value);
                  setColorAndOpacity();
                }
              );
              this.settingsManager.backgroundOpacity.onChanged.subscribe(
                function () {
                  setColorAndOpacity();
                }
              );
              // Load initial value
              if (this.settingsManager.backgroundColor.isSet()) {
                this.selectItem(this.settingsManager.backgroundColor.value);
              }
            };
            return BackgroundColorSelectBox;
          })(subtitlesettingselectbox_1.SubtitleSettingSelectBox);
          exports.BackgroundColorSelectBox = BackgroundColorSelectBox;
        },
        { "../../localization/i18n": 93, "./subtitlesettingselectbox": 67 },
      ],
      61: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.BackgroundOpacitySelectBox = void 0;
          var subtitlesettingselectbox_1 = require("./subtitlesettingselectbox");
          var i18n_1 = require("../../localization/i18n");
          /**
           * A select box providing a selection of different background opacity.
           */
          var BackgroundOpacitySelectBox = /** @class */ (function (_super) {
            __extends(BackgroundOpacitySelectBox, _super);
            function BackgroundOpacitySelectBox(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-subtitlesettingsbackgroundopacityselectbox"],
                },
                _this.config
              );
              return _this;
            }
            BackgroundOpacitySelectBox.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.addItem("25", i18n_1.i18n.getLocalizer("default"));
              this.addItem(
                "100",
                i18n_1.i18n.getLocalizer("percent", { value: 100 })
              );
              this.addItem(
                "75",
                i18n_1.i18n.getLocalizer("percent", { value: 75 })
              );
              this.addItem(
                "50",
                i18n_1.i18n.getLocalizer("percent", { value: 50 })
              );
              this.addItem(
                "25",
                i18n_1.i18n.getLocalizer("percent", { value: 25 })
              );
              this.addItem(
                "0",
                i18n_1.i18n.getLocalizer("percent", { value: 0 })
              );
              this.onItemSelected.subscribe(function (sender, key) {
                _this.settingsManager.backgroundOpacity.value = key;
                // Color and opacity go together, so we need to...
                if (!_this.settingsManager.backgroundOpacity.isSet()) {
                  // ... clear the color when the opacity is not set
                  _this.settingsManager.backgroundColor.clear();
                } else if (!_this.settingsManager.backgroundColor.isSet()) {
                  // ... set a color when the opacity is set
                  _this.settingsManager.backgroundColor.value = "black";
                }
              });
              // Update selected item when value is set from somewhere else
              this.settingsManager.backgroundOpacity.onChanged.subscribe(
                function (sender, property) {
                  _this.selectItem(property.value);
                }
              );
              // Load initial value
              if (this.settingsManager.backgroundOpacity.isSet()) {
                this.selectItem(this.settingsManager.backgroundOpacity.value);
              }
            };
            return BackgroundOpacitySelectBox;
          })(subtitlesettingselectbox_1.SubtitleSettingSelectBox);
          exports.BackgroundOpacitySelectBox = BackgroundOpacitySelectBox;
        },
        { "../../localization/i18n": 93, "./subtitlesettingselectbox": 67 },
      ],
      62: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.CharacterEdgeSelectBox = void 0;
          var subtitlesettingselectbox_1 = require("./subtitlesettingselectbox");
          var i18n_1 = require("../../localization/i18n");
          /**
           * A select box providing a selection of different character edge.
           */
          var CharacterEdgeSelectBox = /** @class */ (function (_super) {
            __extends(CharacterEdgeSelectBox, _super);
            function CharacterEdgeSelectBox(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-subtitlesettingscharacteredgeselectbox"],
                },
                _this.config
              );
              return _this;
            }
            CharacterEdgeSelectBox.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.addItem(null, i18n_1.i18n.getLocalizer("default"));
              this.addItem(
                "raised",
                i18n_1.i18n.getLocalizer(
                  "settings.subtitles.characterEdge.raised"
                )
              );
              this.addItem(
                "depressed",
                i18n_1.i18n.getLocalizer(
                  "settings.subtitles.characterEdge.depressed"
                )
              );
              this.addItem(
                "uniform",
                i18n_1.i18n.getLocalizer(
                  "settings.subtitles.characterEdge.uniform"
                )
              );
              this.addItem(
                "dropshadowed",
                i18n_1.i18n.getLocalizer(
                  "settings.subtitles.characterEdge.dropshadowed"
                )
              );
              this.settingsManager.characterEdge.onChanged.subscribe(function (
                sender,
                property
              ) {
                if (property.isSet()) {
                  _this.toggleOverlayClass("characteredge-" + property.value);
                } else {
                  _this.toggleOverlayClass(null);
                }
                // Select the item in case the property was set from outside
                _this.selectItem(property.value);
              });
              this.onItemSelected.subscribe(function (sender, key) {
                _this.settingsManager.characterEdge.value = key;
              });
              // Load initial value
              if (this.settingsManager.characterEdge.isSet()) {
                this.selectItem(this.settingsManager.characterEdge.value);
              }
            };
            return CharacterEdgeSelectBox;
          })(subtitlesettingselectbox_1.SubtitleSettingSelectBox);
          exports.CharacterEdgeSelectBox = CharacterEdgeSelectBox;
        },
        { "../../localization/i18n": 93, "./subtitlesettingselectbox": 67 },
      ],
      63: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.FontColorSelectBox = void 0;
          var subtitlesettingselectbox_1 = require("./subtitlesettingselectbox");
          var i18n_1 = require("../../localization/i18n");
          /**
           * A select box providing a selection of different font colors.
           */
          var FontColorSelectBox = /** @class */ (function (_super) {
            __extends(FontColorSelectBox, _super);
            function FontColorSelectBox(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-subtitlesettingsfontcolorselectbox"],
                },
                _this.config
              );
              return _this;
            }
            FontColorSelectBox.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.addItem(null, i18n_1.i18n.getLocalizer("default"));
              this.addItem("white", i18n_1.i18n.getLocalizer("colors.white"));
              this.addItem("black", i18n_1.i18n.getLocalizer("colors.black"));
              this.addItem("red", i18n_1.i18n.getLocalizer("colors.red"));
              this.addItem("green", i18n_1.i18n.getLocalizer("colors.green"));
              this.addItem("blue", i18n_1.i18n.getLocalizer("colors.blue"));
              this.addItem("cyan", i18n_1.i18n.getLocalizer("colors.cyan"));
              this.addItem("yellow", i18n_1.i18n.getLocalizer("colors.yellow"));
              this.addItem(
                "magenta",
                i18n_1.i18n.getLocalizer("colors.magenta")
              );
              var setColorAndOpacity = function () {
                if (
                  _this.settingsManager.fontColor.isSet() &&
                  _this.settingsManager.fontOpacity.isSet()
                ) {
                  _this.toggleOverlayClass(
                    "fontcolor-" +
                      _this.settingsManager.fontColor.value +
                      _this.settingsManager.fontOpacity.value
                  );
                } else {
                  _this.toggleOverlayClass(null);
                }
              };
              this.onItemSelected.subscribe(function (sender, key) {
                _this.settingsManager.fontColor.value = key;
              });
              this.settingsManager.fontColor.onChanged.subscribe(function (
                sender,
                property
              ) {
                // Color and opacity go together, so we need to...
                if (!_this.settingsManager.fontColor.isSet()) {
                  // ... clear the opacity when the color is not set
                  _this.settingsManager.fontOpacity.clear();
                } else if (!_this.settingsManager.fontOpacity.isSet()) {
                  // ... set an opacity when the color is set
                  _this.settingsManager.fontOpacity.value = "100";
                }
                _this.selectItem(property.value);
                setColorAndOpacity();
              });
              this.settingsManager.fontOpacity.onChanged.subscribe(function () {
                setColorAndOpacity();
              });
              // Load initial value
              if (this.settingsManager.fontColor.isSet()) {
                this.selectItem(this.settingsManager.fontColor.value);
              }
            };
            return FontColorSelectBox;
          })(subtitlesettingselectbox_1.SubtitleSettingSelectBox);
          exports.FontColorSelectBox = FontColorSelectBox;
        },
        { "../../localization/i18n": 93, "./subtitlesettingselectbox": 67 },
      ],
      64: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.FontFamilySelectBox = void 0;
          var subtitlesettingselectbox_1 = require("./subtitlesettingselectbox");
          var i18n_1 = require("../../localization/i18n");
          /**
           * A select box providing a selection of different font family.
           */
          var FontFamilySelectBox = /** @class */ (function (_super) {
            __extends(FontFamilySelectBox, _super);
            function FontFamilySelectBox(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-subtitlesettingsfontfamilyselectbox"],
                },
                _this.config
              );
              return _this;
            }
            FontFamilySelectBox.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.addItem(null, i18n_1.i18n.getLocalizer("default"));
              this.addItem(
                "monospacedserif",
                i18n_1.i18n.getLocalizer(
                  "settings.subtitles.font.family.monospacedserif"
                )
              );
              this.addItem(
                "proportionalserif",
                i18n_1.i18n.getLocalizer(
                  "settings.subtitles.font.family.proportionalserif"
                )
              );
              this.addItem(
                "monospacedsansserif",
                i18n_1.i18n.getLocalizer(
                  "settings.subtitles.font.family.monospacedsansserif"
                )
              );
              this.addItem(
                "proportionalsansserif",
                i18n_1.i18n.getLocalizer(
                  "settings.subtitles.font.family.proportionalsansserif"
                )
              );
              this.addItem(
                "casual",
                i18n_1.i18n.getLocalizer(
                  "settings.subtitles.font.family.casual"
                )
              );
              this.addItem(
                "cursive",
                i18n_1.i18n.getLocalizer(
                  "settings.subtitles.font.family.cursive"
                )
              );
              this.addItem(
                "smallcapital",
                i18n_1.i18n.getLocalizer(
                  "settings.subtitles.font.family.smallcapital"
                )
              );
              this.settingsManager.fontFamily.onChanged.subscribe(function (
                sender,
                property
              ) {
                if (property.isSet()) {
                  _this.toggleOverlayClass("fontfamily-" + property.value);
                } else {
                  _this.toggleOverlayClass(null);
                }
                // Select the item in case the property was set from outside
                _this.selectItem(property.value);
              });
              this.onItemSelected.subscribe(function (sender, key) {
                _this.settingsManager.fontFamily.value = key;
              });
              // Load initial value
              if (this.settingsManager.fontFamily.isSet()) {
                this.selectItem(this.settingsManager.fontFamily.value);
              }
            };
            return FontFamilySelectBox;
          })(subtitlesettingselectbox_1.SubtitleSettingSelectBox);
          exports.FontFamilySelectBox = FontFamilySelectBox;
        },
        { "../../localization/i18n": 93, "./subtitlesettingselectbox": 67 },
      ],
      65: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.FontOpacitySelectBox = void 0;
          var subtitlesettingselectbox_1 = require("./subtitlesettingselectbox");
          var i18n_1 = require("../../localization/i18n");
          /**
           * A select box providing a selection of different font colors.
           */
          var FontOpacitySelectBox = /** @class */ (function (_super) {
            __extends(FontOpacitySelectBox, _super);
            function FontOpacitySelectBox(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-subtitlesettingsfontopacityselectbox"],
                },
                _this.config
              );
              return _this;
            }
            FontOpacitySelectBox.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.addItem(null, i18n_1.i18n.getLocalizer("default"));
              this.addItem(
                "100",
                i18n_1.i18n.getLocalizer("percent", { value: 100 })
              );
              this.addItem(
                "75",
                i18n_1.i18n.getLocalizer("percent", { value: 75 })
              );
              this.addItem(
                "50",
                i18n_1.i18n.getLocalizer("percent", { value: 50 })
              );
              this.addItem(
                "25",
                i18n_1.i18n.getLocalizer("percent", { value: 25 })
              );
              this.onItemSelected.subscribe(function (sender, key) {
                _this.settingsManager.fontOpacity.value = key;
                // Color and opacity go together, so we need to...
                if (!_this.settingsManager.fontOpacity.isSet()) {
                  // ... clear the color when the opacity is not set
                  _this.settingsManager.fontColor.clear();
                } else if (!_this.settingsManager.fontColor.isSet()) {
                  // ... set a color when the opacity is set
                  _this.settingsManager.fontColor.value = "white";
                }
              });
              // Update selected item when value is set from somewhere else
              this.settingsManager.fontOpacity.onChanged.subscribe(function (
                sender,
                property
              ) {
                _this.selectItem(property.value);
              });
              // Load initial value
              if (this.settingsManager.fontOpacity.isSet()) {
                this.selectItem(this.settingsManager.fontOpacity.value);
              }
            };
            return FontOpacitySelectBox;
          })(subtitlesettingselectbox_1.SubtitleSettingSelectBox);
          exports.FontOpacitySelectBox = FontOpacitySelectBox;
        },
        { "../../localization/i18n": 93, "./subtitlesettingselectbox": 67 },
      ],
      66: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.FontSizeSelectBox = void 0;
          var subtitlesettingselectbox_1 = require("./subtitlesettingselectbox");
          var i18n_1 = require("../../localization/i18n");
          /**
           * A select box providing a selection of different font colors.
           */
          var FontSizeSelectBox = /** @class */ (function (_super) {
            __extends(FontSizeSelectBox, _super);
            function FontSizeSelectBox(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-subtitlesettingsfontsizeselectbox"],
                },
                _this.config
              );
              return _this;
            }
            FontSizeSelectBox.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.addItem(null, i18n_1.i18n.getLocalizer("default"));
              this.addItem(
                "50",
                i18n_1.i18n.getLocalizer("percent", { value: 50 })
              );
              this.addItem(
                "75",
                i18n_1.i18n.getLocalizer("percent", { value: 75 })
              );
              this.addItem(
                "100",
                i18n_1.i18n.getLocalizer("percent", { value: 100 })
              );
              this.addItem(
                "150",
                i18n_1.i18n.getLocalizer("percent", { value: 150 })
              );
              this.addItem(
                "200",
                i18n_1.i18n.getLocalizer("percent", { value: 200 })
              );
              this.addItem(
                "300",
                i18n_1.i18n.getLocalizer("percent", { value: 300 })
              );
              this.addItem(
                "400",
                i18n_1.i18n.getLocalizer("percent", { value: 400 })
              );
              this.settingsManager.fontSize.onChanged.subscribe(function (
                sender,
                property
              ) {
                if (property.isSet()) {
                  _this.toggleOverlayClass("fontsize-" + property.value);
                } else {
                  _this.toggleOverlayClass(null);
                }
                // Select the item in case the property was set from outside
                _this.selectItem(property.value);
              });
              this.onItemSelected.subscribe(function (sender, key) {
                _this.settingsManager.fontSize.value = key;
              });
              // Load initial value
              if (this.settingsManager.fontSize.isSet()) {
                this.selectItem(this.settingsManager.fontSize.value);
              }
            };
            return FontSizeSelectBox;
          })(subtitlesettingselectbox_1.SubtitleSettingSelectBox);
          exports.FontSizeSelectBox = FontSizeSelectBox;
        },
        { "../../localization/i18n": 93, "./subtitlesettingselectbox": 67 },
      ],
      67: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SubtitleSettingSelectBox = void 0;
          var selectbox_1 = require("../selectbox");
          /**
           * Base class for all subtitles settings select box
           **/
          var SubtitleSettingSelectBox = /** @class */ (function (_super) {
            __extends(SubtitleSettingSelectBox, _super);
            function SubtitleSettingSelectBox(config) {
              var _this = _super.call(this, config) || this;
              _this.settingsManager = config.settingsManager;
              _this.overlay = config.overlay;
              return _this;
            }
            /**
             * Removes a previously set class and adds the passed in class.
             * @param cssClass The new class to replace the previous class with or null to just remove the previous class
             */
            SubtitleSettingSelectBox.prototype.toggleOverlayClass = function (
              cssClass
            ) {
              // Remove previous class if existing
              if (this.currentCssClass) {
                this.overlay.getDomElement().removeClass(this.currentCssClass);
                this.currentCssClass = null;
              }
              // Add new class if specified. If the new class is null, we don't add anything.
              if (cssClass) {
                this.currentCssClass = this.prefixCss(cssClass);
                this.overlay.getDomElement().addClass(this.currentCssClass);
              }
            };
            return SubtitleSettingSelectBox;
          })(selectbox_1.SelectBox);
          exports.SubtitleSettingSelectBox = SubtitleSettingSelectBox;
        },
        { "../selectbox": 48 },
      ],
      68: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SubtitleSettingsLabel = void 0;
          var container_1 = require("../container");
          var dom_1 = require("../../dom");
          var i18n_1 = require("../../localization/i18n");
          var SubtitleSettingsLabel = /** @class */ (function (_super) {
            __extends(SubtitleSettingsLabel, _super);
            function SubtitleSettingsLabel(config) {
              var _this = _super.call(this, config) || this;
              _this.opener = config.opener;
              _this.text = config.text;
              _this.for = config.for;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-label",
                  components: [_this.opener],
                },
                _this.config
              );
              return _this;
            }
            SubtitleSettingsLabel.prototype.toDomElement = function () {
              var labelElement = new dom_1.DOM("label", {
                id: this.config.id,
                class: this.getCssClasses(),
                for: this.for,
              }).append(
                new dom_1.DOM("span", {}).html(
                  i18n_1.i18n.performLocalization(this.text)
                ),
                this.opener.getDomElement()
              );
              return labelElement;
            };
            return SubtitleSettingsLabel;
          })(container_1.Container);
          exports.SubtitleSettingsLabel = SubtitleSettingsLabel;
        },
        { "../../dom": 86, "../../localization/i18n": 93, "../container": 19 },
      ],
      69: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SubtitleSettingsProperty = exports.SubtitleSettingsManager =
            void 0;
          var storageutils_1 = require("../../storageutils");
          var component_1 = require("../component");
          var eventdispatcher_1 = require("../../eventdispatcher");
          var SubtitleSettingsManager = /** @class */ (function () {
            function SubtitleSettingsManager() {
              var _this = this;
              this._properties = {
                fontColor: new SubtitleSettingsProperty(this),
                fontOpacity: new SubtitleSettingsProperty(this),
                fontFamily: new SubtitleSettingsProperty(this),
                fontSize: new SubtitleSettingsProperty(this),
                characterEdge: new SubtitleSettingsProperty(this),
                backgroundColor: new SubtitleSettingsProperty(this),
                backgroundOpacity: new SubtitleSettingsProperty(this),
                windowColor: new SubtitleSettingsProperty(this),
                windowOpacity: new SubtitleSettingsProperty(this),
              };
              this.userSettings = {};
              this.localStorageKey =
                DummyComponent.instance().prefixCss("subtitlesettings");
              var _loop_1 = function (propertyName) {
                this_1._properties[propertyName].onChanged.subscribe(function (
                  sender,
                  property
                ) {
                  if (property.isSet()) {
                    _this.userSettings[propertyName] = property.value;
                  } else {
                    // Delete the property from the settings object if unset to avoid serialization of null values
                    delete _this.userSettings[propertyName];
                  }
                  // Save the settings object when a property has changed
                  _this.save();
                });
              };
              var this_1 = this;
              for (var propertyName in this._properties) {
                _loop_1(propertyName);
              }
              this.load();
            }
            SubtitleSettingsManager.prototype.reset = function () {
              for (var propertyName in this._properties) {
                this._properties[propertyName].clear();
              }
              this._properties.backgroundColor.value = "black";
              this._properties.backgroundOpacity.value = "25";
            };
            Object.defineProperty(
              SubtitleSettingsManager.prototype,
              "fontColor",
              {
                get: function () {
                  return this._properties.fontColor;
                },
                enumerable: false,
                configurable: true,
              }
            );
            Object.defineProperty(
              SubtitleSettingsManager.prototype,
              "fontOpacity",
              {
                get: function () {
                  return this._properties.fontOpacity;
                },
                enumerable: false,
                configurable: true,
              }
            );
            Object.defineProperty(
              SubtitleSettingsManager.prototype,
              "fontFamily",
              {
                get: function () {
                  return this._properties.fontFamily;
                },
                enumerable: false,
                configurable: true,
              }
            );
            Object.defineProperty(
              SubtitleSettingsManager.prototype,
              "fontSize",
              {
                get: function () {
                  return this._properties.fontSize;
                },
                enumerable: false,
                configurable: true,
              }
            );
            Object.defineProperty(
              SubtitleSettingsManager.prototype,
              "characterEdge",
              {
                get: function () {
                  return this._properties.characterEdge;
                },
                enumerable: false,
                configurable: true,
              }
            );
            Object.defineProperty(
              SubtitleSettingsManager.prototype,
              "backgroundColor",
              {
                get: function () {
                  return this._properties.backgroundColor;
                },
                enumerable: false,
                configurable: true,
              }
            );
            Object.defineProperty(
              SubtitleSettingsManager.prototype,
              "backgroundOpacity",
              {
                get: function () {
                  return this._properties.backgroundOpacity;
                },
                enumerable: false,
                configurable: true,
              }
            );
            Object.defineProperty(
              SubtitleSettingsManager.prototype,
              "windowColor",
              {
                get: function () {
                  return this._properties.windowColor;
                },
                enumerable: false,
                configurable: true,
              }
            );
            Object.defineProperty(
              SubtitleSettingsManager.prototype,
              "windowOpacity",
              {
                get: function () {
                  return this._properties.windowOpacity;
                },
                enumerable: false,
                configurable: true,
              }
            );
            /**
             * Saves the settings to local storage.
             */
            SubtitleSettingsManager.prototype.save = function () {
              storageutils_1.StorageUtils.setObject(
                this.localStorageKey,
                this.userSettings
              );
            };
            /**
             * Loads the settings from local storage
             */
            SubtitleSettingsManager.prototype.load = function () {
              this.userSettings = storageutils_1.StorageUtils.getObject(
                this.localStorageKey
              ) || { backgroundColor: "black", backgroundOpacity: "25" };
              // Apply the loaded settings
              for (var property in this.userSettings) {
                this._properties[property].value = this.userSettings[property];
              }
            };
            return SubtitleSettingsManager;
          })();
          exports.SubtitleSettingsManager = SubtitleSettingsManager;
          /**
           * A dummy component whose sole purpose is to expose the {@link #prefixCss} method to the
           * {@link SubtitleSettingsManager}.
           */
          var DummyComponent = /** @class */ (function (_super) {
            __extends(DummyComponent, _super);
            function DummyComponent() {
              return (_super !== null && _super.apply(this, arguments)) || this;
            }
            DummyComponent.instance = function () {
              if (!DummyComponent._instance) {
                DummyComponent._instance = new DummyComponent();
              }
              return DummyComponent._instance;
            };
            DummyComponent.prototype.prefixCss = function (cssClassOrId) {
              return _super.prototype.prefixCss.call(this, cssClassOrId);
            };
            return DummyComponent;
          })(component_1.Component);
          var SubtitleSettingsProperty = /** @class */ (function () {
            function SubtitleSettingsProperty(manager) {
              this._manager = manager;
              this._onChanged = new eventdispatcher_1.EventDispatcher();
            }
            SubtitleSettingsProperty.prototype.isSet = function () {
              return this._value != null;
            };
            SubtitleSettingsProperty.prototype.clear = function () {
              this._value = null;
              this.onChangedEvent(null);
            };
            Object.defineProperty(SubtitleSettingsProperty.prototype, "value", {
              get: function () {
                return this._value;
              },
              set: function (value) {
                if (typeof value === "string" && value === "null") {
                  value = null;
                }
                this._value = value;
                this.onChangedEvent(value);
              },
              enumerable: false,
              configurable: true,
            });
            SubtitleSettingsProperty.prototype.onChangedEvent = function (
              value
            ) {
              this._onChanged.dispatch(this._manager, this);
            };
            Object.defineProperty(
              SubtitleSettingsProperty.prototype,
              "onChanged",
              {
                get: function () {
                  return this._onChanged.getEvent();
                },
                enumerable: false,
                configurable: true,
              }
            );
            return SubtitleSettingsProperty;
          })();
          exports.SubtitleSettingsProperty = SubtitleSettingsProperty;
        },
        {
          "../../eventdispatcher": 88,
          "../../storageutils": 111,
          "../component": 18,
        },
      ],
      70: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SubtitleSettingsPanelPage = void 0;
          var settingspanelpage_1 = require("../settingspanelpage");
          var subtitlesettingsmanager_1 = require("./subtitlesettingsmanager");
          var fontsizeselectbox_1 = require("./fontsizeselectbox");
          var fontfamilyselectbox_1 = require("./fontfamilyselectbox");
          var fontcolorselectbox_1 = require("./fontcolorselectbox");
          var fontopacityselectbox_1 = require("./fontopacityselectbox");
          var characteredgeselectbox_1 = require("./characteredgeselectbox");
          var backgroundcolorselectbox_1 = require("./backgroundcolorselectbox");
          var backgroundopacityselectbox_1 = require("./backgroundopacityselectbox");
          var windowcolorselectbox_1 = require("./windowcolorselectbox");
          var windowopacityselectbox_1 = require("./windowopacityselectbox");
          var subtitlesettingsresetbutton_1 = require("./subtitlesettingsresetbutton");
          var settingspanelpagebackbutton_1 = require("../settingspanelpagebackbutton");
          var settingspanelitem_1 = require("../settingspanelitem");
          var i18n_1 = require("../../localization/i18n");
          var SubtitleSettingsPanelPage = /** @class */ (function (_super) {
            __extends(SubtitleSettingsPanelPage, _super);
            function SubtitleSettingsPanelPage(config) {
              var _this = _super.call(this, config) || this;
              _this.overlay = config.overlay;
              _this.settingsPanel = config.settingsPanel;
              var manager =
                new subtitlesettingsmanager_1.SubtitleSettingsManager();
              _this.config = _this.mergeConfig(
                config,
                {
                  components: [
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer("settings.subtitles.font.size"),
                      new fontsizeselectbox_1.FontSizeSelectBox({
                        overlay: _this.overlay,
                        settingsManager: manager,
                      })
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer(
                        "settings.subtitles.font.family"
                      ),
                      new fontfamilyselectbox_1.FontFamilySelectBox({
                        overlay: _this.overlay,
                        settingsManager: manager,
                      })
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer("settings.subtitles.font.color"),
                      new fontcolorselectbox_1.FontColorSelectBox({
                        overlay: _this.overlay,
                        settingsManager: manager,
                      })
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer(
                        "settings.subtitles.font.opacity"
                      ),
                      new fontopacityselectbox_1.FontOpacitySelectBox({
                        overlay: _this.overlay,
                        settingsManager: manager,
                      })
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer(
                        "settings.subtitles.characterEdge"
                      ),
                      new characteredgeselectbox_1.CharacterEdgeSelectBox({
                        overlay: _this.overlay,
                        settingsManager: manager,
                      })
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer(
                        "settings.subtitles.background.color"
                      ),
                      new backgroundcolorselectbox_1.BackgroundColorSelectBox({
                        overlay: _this.overlay,
                        settingsManager: manager,
                      })
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer(
                        "settings.subtitles.background.opacity"
                      ),
                      new backgroundopacityselectbox_1.BackgroundOpacitySelectBox(
                        {
                          overlay: _this.overlay,
                          settingsManager: manager,
                        }
                      )
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer(
                        "settings.subtitles.window.color"
                      ),
                      new windowcolorselectbox_1.WindowColorSelectBox({
                        overlay: _this.overlay,
                        settingsManager: manager,
                      })
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer(
                        "settings.subtitles.window.opacity"
                      ),
                      new windowopacityselectbox_1.WindowOpacitySelectBox({
                        overlay: _this.overlay,
                        settingsManager: manager,
                      })
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      new settingspanelpagebackbutton_1.SettingsPanelPageBackButton(
                        {
                          container: _this.settingsPanel,
                          text: i18n_1.i18n.getLocalizer("back"),
                        }
                      ),
                      new subtitlesettingsresetbutton_1.SubtitleSettingsResetButton(
                        {
                          settingsManager: manager,
                        }
                      ),
                      {
                        role: "menubar",
                      }
                    ),
                  ],
                },
                _this.config
              );
              return _this;
            }
            SubtitleSettingsPanelPage.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.onActive.subscribe(function () {
                _this.overlay.enablePreviewSubtitleLabel();
              });
              this.onInactive.subscribe(function () {
                _this.overlay.removePreviewSubtitleLabel();
              });
            };
            return SubtitleSettingsPanelPage;
          })(settingspanelpage_1.SettingsPanelPage);
          exports.SubtitleSettingsPanelPage = SubtitleSettingsPanelPage;
        },
        {
          "../../localization/i18n": 93,
          "../settingspanelitem": 50,
          "../settingspanelpage": 51,
          "../settingspanelpagebackbutton": 52,
          "./backgroundcolorselectbox": 60,
          "./backgroundopacityselectbox": 61,
          "./characteredgeselectbox": 62,
          "./fontcolorselectbox": 63,
          "./fontfamilyselectbox": 64,
          "./fontopacityselectbox": 65,
          "./fontsizeselectbox": 66,
          "./subtitlesettingsmanager": 69,
          "./subtitlesettingsresetbutton": 71,
          "./windowcolorselectbox": 72,
          "./windowopacityselectbox": 73,
        },
      ],
      71: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SubtitleSettingsResetButton = void 0;
          var button_1 = require("../button");
          var i18n_1 = require("../../localization/i18n");
          /**
           * A button that resets all subtitle settings to their defaults.
           */
          var SubtitleSettingsResetButton = /** @class */ (function (_super) {
            __extends(SubtitleSettingsResetButton, _super);
            function SubtitleSettingsResetButton(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-subtitlesettingsresetbutton",
                  text: i18n_1.i18n.getLocalizer("reset"),
                },
                _this.config
              );
              return _this;
            }
            SubtitleSettingsResetButton.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.onClick.subscribe(function () {
                _this.config.settingsManager.reset();
              });
            };
            return SubtitleSettingsResetButton;
          })(button_1.Button);
          exports.SubtitleSettingsResetButton = SubtitleSettingsResetButton;
        },
        { "../../localization/i18n": 93, "../button": 12 },
      ],
      72: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.WindowColorSelectBox = void 0;
          var subtitlesettingselectbox_1 = require("./subtitlesettingselectbox");
          var i18n_1 = require("../../localization/i18n");
          /**
           * A select box providing a selection of different background colors.
           */
          var WindowColorSelectBox = /** @class */ (function (_super) {
            __extends(WindowColorSelectBox, _super);
            function WindowColorSelectBox(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-subtitlesettingswindowcolorselectbox"],
                },
                _this.config
              );
              return _this;
            }
            WindowColorSelectBox.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.addItem(null, i18n_1.i18n.getLocalizer("default"));
              this.addItem("white", i18n_1.i18n.getLocalizer("colors.white"));
              this.addItem("black", i18n_1.i18n.getLocalizer("colors.black"));
              this.addItem("red", i18n_1.i18n.getLocalizer("colors.red"));
              this.addItem("green", i18n_1.i18n.getLocalizer("colors.green"));
              this.addItem("blue", i18n_1.i18n.getLocalizer("colors.blue"));
              this.addItem("cyan", i18n_1.i18n.getLocalizer("colors.cyan"));
              this.addItem("yellow", i18n_1.i18n.getLocalizer("colors.yellow"));
              this.addItem(
                "magenta",
                i18n_1.i18n.getLocalizer("colors.magenta")
              );
              var setColorAndOpacity = function () {
                if (
                  _this.settingsManager.windowColor.isSet() &&
                  _this.settingsManager.windowOpacity.isSet()
                ) {
                  _this.toggleOverlayClass(
                    "windowcolor-" +
                      _this.settingsManager.windowColor.value +
                      _this.settingsManager.windowOpacity.value
                  );
                } else {
                  _this.toggleOverlayClass(null);
                }
              };
              this.onItemSelected.subscribe(function (sender, key) {
                _this.settingsManager.windowColor.value = key;
              });
              this.settingsManager.windowColor.onChanged.subscribe(function (
                sender,
                property
              ) {
                // Color and opacity go together, so we need to...
                if (!_this.settingsManager.windowColor.isSet()) {
                  // ... clear the opacity when the color is not set
                  _this.settingsManager.windowOpacity.clear();
                } else if (!_this.settingsManager.windowOpacity.isSet()) {
                  // ... set an opacity when the color is set
                  _this.settingsManager.windowOpacity.value = "100";
                }
                _this.selectItem(property.value);
                setColorAndOpacity();
              });
              this.settingsManager.windowOpacity.onChanged.subscribe(
                function () {
                  setColorAndOpacity();
                }
              );
              // Load initial value
              if (this.settingsManager.windowColor.isSet()) {
                this.selectItem(this.settingsManager.windowColor.value);
              }
            };
            return WindowColorSelectBox;
          })(subtitlesettingselectbox_1.SubtitleSettingSelectBox);
          exports.WindowColorSelectBox = WindowColorSelectBox;
        },
        { "../../localization/i18n": 93, "./subtitlesettingselectbox": 67 },
      ],
      73: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.WindowOpacitySelectBox = void 0;
          var subtitlesettingselectbox_1 = require("./subtitlesettingselectbox");
          var i18n_1 = require("../../localization/i18n");
          /**
           * A select box providing a selection of different background opacity.
           */
          var WindowOpacitySelectBox = /** @class */ (function (_super) {
            __extends(WindowOpacitySelectBox, _super);
            function WindowOpacitySelectBox(config) {
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-subtitlesettingswindowopacityselectbox"],
                },
                _this.config
              );
              return _this;
            }
            WindowOpacitySelectBox.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              this.addItem(null, i18n_1.i18n.getLocalizer("default"));
              this.addItem(
                "100",
                i18n_1.i18n.getLocalizer("percent", { value: 100 })
              );
              this.addItem(
                "75",
                i18n_1.i18n.getLocalizer("percent", { value: 75 })
              );
              this.addItem(
                "50",
                i18n_1.i18n.getLocalizer("percent", { value: 50 })
              );
              this.addItem(
                "25",
                i18n_1.i18n.getLocalizer("percent", { value: 25 })
              );
              this.addItem(
                "0",
                i18n_1.i18n.getLocalizer("percent", { value: 0 })
              );
              this.onItemSelected.subscribe(function (sender, key) {
                _this.settingsManager.windowOpacity.value = key;
                // Color and opacity go together, so we need to...
                if (!_this.settingsManager.windowOpacity.isSet()) {
                  // ... clear the color when the opacity is not set
                  _this.settingsManager.windowColor.clear();
                } else if (!_this.settingsManager.windowColor.isSet()) {
                  // ... set a color when the opacity is set
                  _this.settingsManager.windowColor.value = "black";
                }
              });
              // Update selected item when value is set from somewhere else
              this.settingsManager.windowOpacity.onChanged.subscribe(function (
                sender,
                property
              ) {
                _this.selectItem(property.value);
              });
              // Load initial value
              if (this.settingsManager.windowOpacity.isSet()) {
                this.selectItem(this.settingsManager.windowOpacity.value);
              }
            };
            return WindowOpacitySelectBox;
          })(subtitlesettingselectbox_1.SubtitleSettingSelectBox);
          exports.WindowOpacitySelectBox = WindowOpacitySelectBox;
        },
        { "../../localization/i18n": 93, "./subtitlesettingselectbox": 67 },
      ],
      74: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.TimelineMarkersHandler = void 0;
          var dom_1 = require("../dom");
          var playerutils_1 = require("../playerutils");
          var timeout_1 = require("../timeout");
          var TimelineMarkersHandler = /** @class */ (function () {
            function TimelineMarkersHandler(
              config,
              getSeekBarWidth,
              markersContainer
            ) {
              this.config = config;
              this.getSeekBarWidth = getSeekBarWidth;
              this.markersContainer = markersContainer;
              this.timelineMarkers = [];
            }
            TimelineMarkersHandler.prototype.initialize = function (
              player,
              uimanager
            ) {
              this.player = player;
              this.uimanager = uimanager;
              this.configureMarkers();
            };
            TimelineMarkersHandler.prototype.configureMarkers = function () {
              var _this = this;
              // Remove markers when unloaded
              this.player.on(
                this.player.exports.PlayerEvent.SourceUnloaded,
                function () {
                  return _this.clearMarkers();
                }
              );
              this.player.on(
                this.player.exports.PlayerEvent.AdBreakStarted,
                function () {
                  return _this.clearMarkers();
                }
              );
              this.player.on(
                this.player.exports.PlayerEvent.AdBreakFinished,
                function () {
                  return _this.updateMarkers();
                }
              );
              // Update markers when the size of the seekbar changes
              this.player.on(
                this.player.exports.PlayerEvent.PlayerResized,
                function () {
                  return _this.updateMarkersDOM();
                }
              );
              this.player.on(
                this.player.exports.PlayerEvent.SourceLoaded,
                function () {
                  if (_this.player.isLive()) {
                    // Update marker position as timeshift range changes
                    _this.player.on(
                      _this.player.exports.PlayerEvent.TimeChanged,
                      function () {
                        return _this.updateMarkers();
                      }
                    );
                    // Update marker postion when paused as timeshift range changes
                    _this.configureLivePausedTimeshiftUpdater(function () {
                      return _this.updateMarkers();
                    });
                  }
                }
              );
              this.uimanager
                .getConfig()
                .events.onUpdated.subscribe(function () {
                  return _this.updateMarkers();
                });
              this.uimanager.onRelease.subscribe(function () {
                return _this.uimanager
                  .getConfig()
                  .events.onUpdated.unsubscribe(function () {
                    return _this.updateMarkers();
                  });
              });
              // Init markers at startup
              this.updateMarkers();
            };
            TimelineMarkersHandler.prototype.getMarkerAtPosition = function (
              percentage
            ) {
              var snappingRange = this.config.snappingRange;
              var matchingMarker = this.timelineMarkers.find(function (marker) {
                var hasDuration = marker.duration > 0;
                // Handle interval markers
                var intervalMarkerMatch =
                  hasDuration &&
                  percentage >= marker.position - snappingRange &&
                  percentage <=
                    marker.position + marker.duration + snappingRange;
                // Handle position markers
                var positionMarkerMatch =
                  percentage >= marker.position - snappingRange &&
                  percentage <= marker.position + snappingRange;
                return intervalMarkerMatch || positionMarkerMatch;
              });
              return matchingMarker || null;
            };
            TimelineMarkersHandler.prototype.clearMarkers = function () {
              this.timelineMarkers = [];
              this.markersContainer.empty();
            };
            TimelineMarkersHandler.prototype.removeMarkerFromConfig = function (
              marker
            ) {
              this.uimanager.getConfig().metadata.markers = this.uimanager
                .getConfig()
                .metadata.markers.filter(function (_marker) {
                  return marker !== _marker;
                });
            };
            TimelineMarkersHandler.prototype.filterRemovedMarkers =
              function () {
                var _this = this;
                this.timelineMarkers = this.timelineMarkers.filter(function (
                  seekbarMarker
                ) {
                  var matchingMarker = _this.uimanager
                    .getConfig()
                    .metadata.markers.find(function (_marker) {
                      return seekbarMarker.marker === _marker;
                    });
                  if (!matchingMarker) {
                    _this.removeMarkerFromDOM(seekbarMarker);
                  }
                  return matchingMarker;
                });
              };
            TimelineMarkersHandler.prototype.removeMarkerFromDOM = function (
              marker
            ) {
              if (marker.element) {
                marker.element.remove();
              }
            };
            TimelineMarkersHandler.prototype.updateMarkers = function () {
              var _this = this;
              if (!shouldProcessMarkers(this.player, this.uimanager)) {
                this.clearMarkers();
                return;
              }
              this.filterRemovedMarkers();
              this.uimanager
                .getConfig()
                .metadata.markers.forEach(function (marker) {
                  var _a = getMarkerPositions(_this.player, marker),
                    markerPosition = _a.markerPosition,
                    markerDuration = _a.markerDuration;
                  if (shouldRemoveMarker(markerPosition, markerDuration)) {
                    _this.removeMarkerFromConfig(marker);
                  } else if (markerPosition <= 100) {
                    var matchingMarker = _this.timelineMarkers.find(function (
                      seekbarMarker
                    ) {
                      return seekbarMarker.marker === marker;
                    });
                    if (matchingMarker) {
                      matchingMarker.position = markerPosition;
                      matchingMarker.duration = markerDuration;
                      _this.updateMarkerDOM(matchingMarker);
                    } else {
                      var newMarker = {
                        marker: marker,
                        position: markerPosition,
                        duration: markerDuration,
                      };
                      _this.timelineMarkers.push(newMarker);
                      _this.createMarkerDOM(newMarker);
                    }
                  }
                });
            };
            TimelineMarkersHandler.prototype.getMarkerCssProperties = function (
              marker
            ) {
              var seekBarWidthPx = this.getSeekBarWidth();
              var positionInPx =
                (seekBarWidthPx / 100) *
                (marker.position < 0 ? 0 : marker.position);
              var cssProperties = {
                transform: "translateX(".concat(positionInPx, "px)"),
              };
              if (marker.duration > 0) {
                var markerWidthPx = Math.round(
                  (seekBarWidthPx / 100) * marker.duration
                );
                cssProperties["width"] = "".concat(markerWidthPx, "px");
              }
              return cssProperties;
            };
            TimelineMarkersHandler.prototype.updateMarkerDOM = function (
              marker
            ) {
              marker.element.css(this.getMarkerCssProperties(marker));
            };
            TimelineMarkersHandler.prototype.createMarkerDOM = function (
              marker
            ) {
              var _this = this;
              var markerClasses = ["seekbar-marker"]
                .concat(marker.marker.cssClasses || [])
                .map(function (cssClass) {
                  return _this.prefixCss(cssClass);
                });
              var markerElement = new dom_1.DOM("div", {
                class: markerClasses.join(" "),
                "data-marker-time": String(marker.marker.time),
                "data-marker-title": String(marker.marker.title),
              }).css(this.getMarkerCssProperties(marker));
              if (marker.marker.imageUrl) {
                var removeImage = function () {
                  imageElement_1.remove();
                };
                var imageElement_1 = new dom_1.DOM("img", {
                  class: this.prefixCss("seekbar-marker-image"),
                  src: marker.marker.imageUrl,
                }).on("error", removeImage);
                markerElement.append(imageElement_1);
              }
              marker.element = markerElement;
              this.markersContainer.append(markerElement);
            };
            TimelineMarkersHandler.prototype.updateMarkersDOM = function () {
              var _this = this;
              this.timelineMarkers.forEach(function (marker) {
                if (marker.element) {
                  _this.updateMarkerDOM(marker);
                } else {
                  _this.createMarkerDOM(marker);
                }
              });
            };
            TimelineMarkersHandler.prototype.configureLivePausedTimeshiftUpdater =
              function (handler) {
                var _this = this;
                // Regularly update the marker position while the timeout is active
                this.pausedTimeshiftUpdater = new timeout_1.Timeout(
                  1000,
                  handler,
                  true
                );
                this.player.on(
                  this.player.exports.PlayerEvent.Paused,
                  function () {
                    if (
                      _this.player.isLive() &&
                      _this.player.getMaxTimeShift() < 0
                    ) {
                      _this.pausedTimeshiftUpdater.start();
                    }
                  }
                );
                // Stop updater when playback continues (no matter if the updater was started before)
                this.player.on(
                  this.player.exports.PlayerEvent.Play,
                  function () {
                    return _this.pausedTimeshiftUpdater.clear();
                  }
                );
                this.player.on(
                  this.player.exports.PlayerEvent.Destroy,
                  function () {
                    return _this.pausedTimeshiftUpdater.clear();
                  }
                );
              };
            TimelineMarkersHandler.prototype.prefixCss = function (
              cssClassOrId
            ) {
              return this.config.cssPrefix + "-" + cssClassOrId;
            };
            return TimelineMarkersHandler;
          })();
          exports.TimelineMarkersHandler = TimelineMarkersHandler;
          function getMarkerPositions(player, marker) {
            var duration = getDuration(player);
            var markerPosition =
              (100 / duration) * getMarkerTime(marker, player, duration); // convert absolute time to percentage
            var markerDuration = (100 / duration) * marker.duration;
            if (markerPosition < 0 && !isNaN(markerDuration)) {
              // Shrink marker duration for on live streams as they reach end
              markerDuration = markerDuration + markerPosition;
            }
            if (100 - markerPosition < markerDuration) {
              // Shrink marker if it overflows timeline
              markerDuration = 100 - markerPosition;
            }
            return {
              markerDuration: markerDuration,
              markerPosition: markerPosition,
            };
          }
          function getMarkerTime(marker, player, duration) {
            if (!player.isLive()) {
              return marker.time;
            }
            return (
              duration -
              (playerutils_1.PlayerUtils.getSeekableRangeRespectingLive(player)
                .end -
                marker.time)
            );
          }
          function getDuration(player) {
            if (!player.isLive()) {
              return player.getDuration();
            }
            var _a =
                playerutils_1.PlayerUtils.getSeekableRangeRespectingLive(
                  player
                ),
              start = _a.start,
              end = _a.end;
            return end - start;
          }
          function shouldRemoveMarker(markerPosition, markerDuration) {
            return (
              (markerDuration < 0 || isNaN(markerDuration)) &&
              markerPosition < 0
            );
          }
          function shouldProcessMarkers(player, uimanager) {
            // Don't generate timeline markers if we don't yet have a duration
            // The duration check is for buggy platforms where the duration is not available instantly (Chrome on Android 4.3)
            var validToProcess =
              player.getDuration() !== Infinity || player.isLive();
            var hasMarkers = uimanager.getConfig().metadata.markers.length > 0;
            return validToProcess && hasMarkers;
          }
        },
        { "../dom": 86, "../playerutils": 99, "../timeout": 114 },
      ],
      75: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.TitleBar = void 0;
          var container_1 = require("./container");
          var metadatalabel_1 = require("./metadatalabel");
          /**
           * Displays a title bar containing a label with the title of the video.
           */
          var TitleBar = /** @class */ (function (_super) {
            __extends(TitleBar, _super);
            function TitleBar(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-titlebar",
                  hidden: true,
                  components: [
                    new metadatalabel_1.MetadataLabel({
                      content: metadatalabel_1.MetadataLabelContent.Title,
                    }),
                    new metadatalabel_1.MetadataLabel({
                      content: metadatalabel_1.MetadataLabelContent.Description,
                    }),
                  ],
                  keepHiddenWithoutMetadata: false,
                },
                _this.config
              );
              return _this;
            }
            TitleBar.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              var shouldBeShown = !this.isHidden();
              var hasMetadataText = true; // Flag to track if any metadata label contains text
              var checkMetadataTextAndUpdateVisibility = function () {
                hasMetadataText = false;
                // Iterate through metadata labels and check if at least one of them contains text
                for (
                  var _i = 0, _a = _this.getComponents();
                  _i < _a.length;
                  _i++
                ) {
                  var component = _a[_i];
                  if (component instanceof metadatalabel_1.MetadataLabel) {
                    if (!component.isEmpty()) {
                      hasMetadataText = true;
                      break;
                    }
                  }
                }
                if (_this.isShown()) {
                  // Hide a visible titlebar if it does not contain any text and the hidden flag is set
                  if (config.keepHiddenWithoutMetadata && !hasMetadataText) {
                    _this.hide();
                  }
                } else if (shouldBeShown) {
                  // Show a hidden titlebar if it should actually be shown
                  _this.show();
                }
              };
              // Listen to text change events to update the hasMetadataText flag when the metadata dynamically changes
              for (
                var _i = 0, _a = this.getComponents();
                _i < _a.length;
                _i++
              ) {
                var component = _a[_i];
                if (component instanceof metadatalabel_1.MetadataLabel) {
                  component.onTextChanged.subscribe(
                    checkMetadataTextAndUpdateVisibility
                  );
                }
              }
              uimanager.onControlsShow.subscribe(function () {
                shouldBeShown = true;
                if (!(config.keepHiddenWithoutMetadata && !hasMetadataText)) {
                  _this.show();
                }
              });
              uimanager.onControlsHide.subscribe(function () {
                shouldBeShown = false;
                _this.hide();
              });
              // init
              checkMetadataTextAndUpdateVisibility();
            };
            return TitleBar;
          })(container_1.Container);
          exports.TitleBar = TitleBar;
        },
        { "./container": 19, "./metadatalabel": 36 },
      ],
      76: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.ToggleButton = void 0;
          var button_1 = require("./button");
          var eventdispatcher_1 = require("../eventdispatcher");
          /**
           * A button that can be toggled between 'on' and 'off' states.
           */
          var ToggleButton = /** @class */ (function (_super) {
            __extends(ToggleButton, _super);
            function ToggleButton(config) {
              var _this = _super.call(this, config) || this;
              _this.toggleButtonEvents = {
                onToggle: new eventdispatcher_1.EventDispatcher(),
                onToggleOn: new eventdispatcher_1.EventDispatcher(),
                onToggleOff: new eventdispatcher_1.EventDispatcher(),
              };
              var defaultConfig = {
                cssClass: "ui-togglebutton",
                onClass: "on",
                offClass: "off",
              };
              if (config.onAriaLabel) {
                config.ariaLabel = config.onAriaLabel;
              }
              _this.config = _this.mergeConfig(
                config,
                defaultConfig,
                _this.config
              );
              return _this;
            }
            ToggleButton.prototype.configure = function (player, uimanager) {
              _super.prototype.configure.call(this, player, uimanager);
              var config = this.getConfig();
              this.getDomElement().addClass(this.prefixCss(config.offClass));
            };
            /**
             * Toggles the button to the 'on' state.
             */
            ToggleButton.prototype.on = function () {
              if (this.isOff()) {
                var config = this.getConfig();
                this.onState = true;
                this.getDomElement().removeClass(
                  this.prefixCss(config.offClass)
                );
                this.getDomElement().addClass(this.prefixCss(config.onClass));
                this.onToggleEvent();
                this.onToggleOnEvent();
                this.setAriaAttr("pressed", "true");
                if (this.config.onAriaLabel) {
                  this.setAriaLabel(this.config.onAriaLabel);
                }
              }
            };
            /**
             * Toggles the button to the 'off' state.
             */
            ToggleButton.prototype.off = function () {
              if (this.isOn()) {
                var config = this.getConfig();
                this.onState = false;
                this.getDomElement().removeClass(
                  this.prefixCss(config.onClass)
                );
                this.getDomElement().addClass(this.prefixCss(config.offClass));
                this.onToggleEvent();
                this.onToggleOffEvent();
                this.setAriaAttr("pressed", "false");
                if (this.config.offAriaLabel) {
                  this.setAriaLabel(this.config.offAriaLabel);
                }
              }
            };
            /**
             * Toggle the button 'on' if it is 'off', or 'off' if it is 'on'.
             */
            ToggleButton.prototype.toggle = function () {
              if (this.isOn()) {
                this.off();
              } else {
                this.on();
              }
            };
            /**
             * Checks if the toggle button is in the 'on' state.
             * @returns {boolean} true if button is 'on', false if 'off'
             */
            ToggleButton.prototype.isOn = function () {
              return this.onState;
            };
            /**
             * Checks if the toggle button is in the 'off' state.
             * @returns {boolean} true if button is 'off', false if 'on'
             */
            ToggleButton.prototype.isOff = function () {
              return !this.isOn();
            };
            ToggleButton.prototype.onClickEvent = function () {
              _super.prototype.onClickEvent.call(this);
              // Fire the toggle event together with the click event
              // (they are technically the same, only the semantics are different)
              this.onToggleEvent();
            };
            ToggleButton.prototype.onToggleEvent = function () {
              this.toggleButtonEvents.onToggle.dispatch(this);
            };
            ToggleButton.prototype.onToggleOnEvent = function () {
              this.toggleButtonEvents.onToggleOn.dispatch(this);
            };
            ToggleButton.prototype.onToggleOffEvent = function () {
              this.toggleButtonEvents.onToggleOff.dispatch(this);
            };
            Object.defineProperty(ToggleButton.prototype, "onToggle", {
              /**
               * Gets the event that is fired when the button is toggled.
               * @returns {Event<ToggleButton<Config>, NoArgs>}
               */
              get: function () {
                return this.toggleButtonEvents.onToggle.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(ToggleButton.prototype, "onToggleOn", {
              /**
               * Gets the event that is fired when the button is toggled 'on'.
               * @returns {Event<ToggleButton<Config>, NoArgs>}
               */
              get: function () {
                return this.toggleButtonEvents.onToggleOn.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(ToggleButton.prototype, "onToggleOff", {
              /**
               * Gets the event that is fired when the button is toggled 'off'.
               * @returns {Event<ToggleButton<Config>, NoArgs>}
               */
              get: function () {
                return this.toggleButtonEvents.onToggleOff.getEvent();
              },
              enumerable: false,
              configurable: true,
            });
            return ToggleButton;
          })(button_1.Button);
          exports.ToggleButton = ToggleButton;
        },
        { "../eventdispatcher": 88, "./button": 12 },
      ],
      77: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.TvNoiseCanvas = void 0;
          var component_1 = require("./component");
          var dom_1 = require("../dom");
          /**
           * Animated analog TV static noise.
           */
          var TvNoiseCanvas = /** @class */ (function (_super) {
            __extends(TvNoiseCanvas, _super);
            function TvNoiseCanvas(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.canvasWidth = 160;
              _this.canvasHeight = 90;
              _this.interferenceHeight = 50;
              _this.lastFrameUpdate = 0;
              _this.frameInterval = 60;
              _this.useAnimationFrame = !!window.requestAnimationFrame;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-tvnoisecanvas",
                },
                _this.config
              );
              return _this;
            }
            TvNoiseCanvas.prototype.toDomElement = function () {
              return (this.canvas = new dom_1.DOM("canvas", {
                class: this.getCssClasses(),
              }));
            };
            TvNoiseCanvas.prototype.start = function () {
              this.canvasElement = this.canvas.get(0);
              this.canvasContext = this.canvasElement.getContext("2d");
              this.noiseAnimationWindowPos = -this.canvasHeight;
              this.lastFrameUpdate = 0;
              this.canvasElement.width = this.canvasWidth;
              this.canvasElement.height = this.canvasHeight;
              this.renderFrame();
            };
            TvNoiseCanvas.prototype.stop = function () {
              if (this.useAnimationFrame) {
                cancelAnimationFrame(this.frameUpdateHandlerId);
              } else {
                clearTimeout(this.frameUpdateHandlerId);
              }
            };
            TvNoiseCanvas.prototype.renderFrame = function () {
              // This code has been copied from the player controls.js and simplified
              if (
                this.lastFrameUpdate + this.frameInterval >
                new Date().getTime()
              ) {
                // It's too early to render the next frame
                this.scheduleNextRender();
                return;
              }
              var currentPixelOffset;
              var canvasWidth = this.canvasWidth;
              var canvasHeight = this.canvasHeight;
              // Create texture
              var noiseImage = this.canvasContext.createImageData(
                canvasWidth,
                canvasHeight
              );
              // Fill texture with noise
              for (var y = 0; y < canvasHeight; y++) {
                for (var x = 0; x < canvasWidth; x++) {
                  currentPixelOffset = canvasWidth * y * 4 + x * 4;
                  noiseImage.data[currentPixelOffset] = Math.random() * 255;
                  if (
                    y < this.noiseAnimationWindowPos ||
                    y > this.noiseAnimationWindowPos + this.interferenceHeight
                  ) {
                    noiseImage.data[currentPixelOffset] *= 0.85;
                  }
                  noiseImage.data[currentPixelOffset + 1] =
                    noiseImage.data[currentPixelOffset];
                  noiseImage.data[currentPixelOffset + 2] =
                    noiseImage.data[currentPixelOffset];
                  noiseImage.data[currentPixelOffset + 3] = 50;
                }
              }
              // Put texture onto canvas
              this.canvasContext.putImageData(noiseImage, 0, 0);
              this.lastFrameUpdate = new Date().getTime();
              this.noiseAnimationWindowPos += 7;
              if (this.noiseAnimationWindowPos > canvasHeight) {
                this.noiseAnimationWindowPos = -canvasHeight;
              }
              this.scheduleNextRender();
            };
            TvNoiseCanvas.prototype.scheduleNextRender = function () {
              if (this.useAnimationFrame) {
                this.frameUpdateHandlerId = window.requestAnimationFrame(
                  this.renderFrame.bind(this)
                );
              } else {
                this.frameUpdateHandlerId = window.setTimeout(
                  this.renderFrame.bind(this),
                  this.frameInterval
                );
              }
            };
            return TvNoiseCanvas;
          })(component_1.Component);
          exports.TvNoiseCanvas = TvNoiseCanvas;
        },
        { "../dom": 86, "./component": 18 },
      ],
      78: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.UIContainer = void 0;
          var container_1 = require("./container");
          var dom_1 = require("../dom");
          var timeout_1 = require("../timeout");
          var playerutils_1 = require("../playerutils");
          var eventdispatcher_1 = require("../eventdispatcher");
          var i18n_1 = require("../localization/i18n");
          /**
           * The base container that contains all of the UI. The UIContainer is passed to the {@link UIManager} to build and
           * setup the UI.
           */
          var UIContainer = (exports.UIContainer = /** @class */ (function (
            _super
          ) {
            __extends(UIContainer, _super);
            function UIContainer(config) {
              var _this = _super.call(this, config) || this;
              _this.hideUi = function () {};
              _this.showUi = function () {};
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-uicontainer",
                  role: "region",
                  ariaLabel: i18n_1.i18n.getLocalizer("player"),
                  hideDelay: 5000,
                },
                _this.config
              );
              _this.playerStateChange = new eventdispatcher_1.EventDispatcher();
              return _this;
            }
            UIContainer.prototype.configure = function (player, uimanager) {
              var config = this.getConfig();
              if (config.userInteractionEventSource) {
                this.userInteractionEventSource = new dom_1.DOM(
                  config.userInteractionEventSource
                );
              } else {
                this.userInteractionEventSource = this.getDomElement();
              }
              _super.prototype.configure.call(this, player, uimanager);
              this.configureUIShowHide(player, uimanager);
              this.configurePlayerStates(player, uimanager);
            };
            UIContainer.prototype.configureUIShowHide = function (
              player,
              uimanager
            ) {
              var _this = this;
              var config = this.getConfig();
              if (config.hideDelay === -1) {
                uimanager.onConfigured.subscribe(function () {
                  return uimanager.onControlsShow.dispatch(_this);
                });
                return;
              }
              var isUiShown = false;
              var isSeeking = false;
              var isFirstTouch = true;
              var playerState;
              var hidingPrevented = function () {
                return (
                  config.hidePlayerStateExceptions &&
                  config.hidePlayerStateExceptions.indexOf(playerState) > -1
                );
              };
              this.showUi = function () {
                if (!isUiShown) {
                  // Let subscribers know that they should reveal themselves
                  uimanager.onControlsShow.dispatch(_this);
                  isUiShown = true;
                }
                // Don't trigger timeout while seeking (it will be triggered once the seek is finished) or casting
                if (!isSeeking && !player.isCasting() && !hidingPrevented()) {
                  _this.uiHideTimeout.start();
                }
              };
              this.hideUi = function () {
                // Hide the UI only if it is shown, and if not casting
                if (isUiShown && !player.isCasting()) {
                  // Issue a preview event to check if we are good to hide the controls
                  var previewHideEventArgs = {};
                  uimanager.onPreviewControlsHide.dispatch(
                    _this,
                    previewHideEventArgs
                  );
                  if (!previewHideEventArgs.cancel) {
                    // If the preview wasn't canceled, let subscribers know that they should now hide themselves
                    uimanager.onControlsHide.dispatch(_this);
                    isUiShown = false;
                  } else {
                    // If the hide preview was canceled, continue to show UI
                    _this.showUi();
                  }
                }
              };
              // Timeout to defer UI hiding by the configured delay time
              this.uiHideTimeout = new timeout_1.Timeout(
                config.hideDelay,
                this.hideUi
              );
              this.userInteractionEvents = [
                {
                  // On touch displays, the first touch reveals the UI
                  name: "touchend",
                  handler: function (e) {
                    if (!isUiShown) {
                      // Only if the UI is hidden, we prevent other actions (except for the first touch) and reveal the UI
                      // instead. The first touch is not prevented to let other listeners receive the event and trigger an
                      // initial action, e.g. the huge playback button can directly start playback instead of requiring a double
                      // tap which 1. reveals the UI and 2. starts playback.
                      if (isFirstTouch && !player.isPlaying()) {
                        isFirstTouch = false;
                      } else {
                        e.preventDefault();
                      }
                      _this.showUi();
                    }
                  },
                },
                {
                  // When the mouse enters, we show the UI
                  name: "mouseenter",
                  handler: function () {
                    _this.showUi();
                  },
                },
                {
                  // When the mouse moves within, we show the UI
                  name: "mousemove",
                  handler: function () {
                    _this.showUi();
                  },
                },
                {
                  name: "focusin",
                  handler: function () {
                    _this.showUi();
                  },
                },
                {
                  name: "keydown",
                  handler: function () {
                    _this.showUi();
                  },
                },
                {
                  // When the mouse leaves, we can prepare to hide the UI, except a seek is going on
                  name: "mouseleave",
                  handler: function () {
                    // When a seek is going on, the seek scrub pointer may exit the UI area while still seeking, and we do not
                    // hide the UI in such cases
                    if (!isSeeking && !hidingPrevented()) {
                      _this.uiHideTimeout.start();
                    }
                  },
                },
              ];
              this.userInteractionEvents.forEach(function (event) {
                return _this.userInteractionEventSource.on(
                  event.name,
                  event.handler
                );
              });
              uimanager.onSeek.subscribe(function () {
                _this.uiHideTimeout.clear(); // Don't hide UI while a seek is in progress
                isSeeking = true;
              });
              uimanager.onSeeked.subscribe(function () {
                isSeeking = false;
                if (!hidingPrevented()) {
                  _this.uiHideTimeout.start(); // Re-enable UI hide timeout after a seek
                }
              });
              player.on(player.exports.PlayerEvent.CastStarted, function () {
                _this.showUi(); // Show UI when a Cast session has started (UI will then stay permanently on during the session)
              });
              this.playerStateChange.subscribe(function (_, state) {
                playerState = state;
                if (hidingPrevented()) {
                  // Entering a player state that prevents hiding and forces the controls to be shown
                  _this.uiHideTimeout.clear();
                  _this.showUi();
                } else {
                  // Entering a player state that allows hiding
                  _this.uiHideTimeout.start();
                }
              });
            };
            UIContainer.prototype.configurePlayerStates = function (
              player,
              uimanager
            ) {
              var _this = this;
              var container = this.getDomElement();
              // Convert player states into CSS class names
              var stateClassNames = [];
              for (var state in playerutils_1.PlayerUtils.PlayerState) {
                if (isNaN(Number(state))) {
                  var enumName =
                    playerutils_1.PlayerUtils.PlayerState[
                      playerutils_1.PlayerUtils.PlayerState[state]
                    ];
                  stateClassNames[
                    playerutils_1.PlayerUtils.PlayerState[state]
                  ] = this.prefixCss(
                    UIContainer.STATE_PREFIX + enumName.toLowerCase()
                  );
                }
              }
              var removeStates = function () {
                container.removeClass(
                  stateClassNames[playerutils_1.PlayerUtils.PlayerState.Idle]
                );
                container.removeClass(
                  stateClassNames[
                    playerutils_1.PlayerUtils.PlayerState.Prepared
                  ]
                );
                container.removeClass(
                  stateClassNames[playerutils_1.PlayerUtils.PlayerState.Playing]
                );
                container.removeClass(
                  stateClassNames[playerutils_1.PlayerUtils.PlayerState.Paused]
                );
                container.removeClass(
                  stateClassNames[
                    playerutils_1.PlayerUtils.PlayerState.Finished
                  ]
                );
              };
              var updateState = function (state) {
                removeStates();
                container.addClass(stateClassNames[state]);
                _this.playerStateChange.dispatch(_this, state);
              };
              player.on(player.exports.PlayerEvent.SourceLoaded, function () {
                updateState(playerutils_1.PlayerUtils.PlayerState.Prepared);
              });
              player.on(player.exports.PlayerEvent.Play, function () {
                updateState(playerutils_1.PlayerUtils.PlayerState.Playing);
              });
              player.on(player.exports.PlayerEvent.Playing, function () {
                updateState(playerutils_1.PlayerUtils.PlayerState.Playing);
              });
              player.on(player.exports.PlayerEvent.Paused, function () {
                updateState(playerutils_1.PlayerUtils.PlayerState.Paused);
              });
              player.on(
                player.exports.PlayerEvent.PlaybackFinished,
                function () {
                  updateState(playerutils_1.PlayerUtils.PlayerState.Finished);
                }
              );
              player.on(player.exports.PlayerEvent.SourceUnloaded, function () {
                updateState(playerutils_1.PlayerUtils.PlayerState.Idle);
              });
              uimanager.getConfig().events.onUpdated.subscribe(function () {
                updateState(playerutils_1.PlayerUtils.getState(player));
              });
              // Fullscreen marker class
              player.on(
                player.exports.PlayerEvent.ViewModeChanged,
                function () {
                  if (
                    player.getViewMode() === player.exports.ViewMode.Fullscreen
                  ) {
                    container.addClass(_this.prefixCss(UIContainer.FULLSCREEN));
                  } else {
                    container.removeClass(
                      _this.prefixCss(UIContainer.FULLSCREEN)
                    );
                  }
                }
              );
              // Init fullscreen state
              if (player.getViewMode() === player.exports.ViewMode.Fullscreen) {
                container.addClass(this.prefixCss(UIContainer.FULLSCREEN));
              }
              // Buffering marker class
              player.on(player.exports.PlayerEvent.StallStarted, function () {
                container.addClass(_this.prefixCss(UIContainer.BUFFERING));
              });
              player.on(player.exports.PlayerEvent.StallEnded, function () {
                container.removeClass(_this.prefixCss(UIContainer.BUFFERING));
              });
              // Init buffering state
              if (player.isStalled()) {
                container.addClass(this.prefixCss(UIContainer.BUFFERING));
              }
              // RemoteControl marker class
              player.on(player.exports.PlayerEvent.CastStarted, function () {
                container.addClass(_this.prefixCss(UIContainer.REMOTE_CONTROL));
              });
              player.on(player.exports.PlayerEvent.CastStopped, function () {
                container.removeClass(
                  _this.prefixCss(UIContainer.REMOTE_CONTROL)
                );
              });
              // Init RemoteControl state
              if (player.isCasting()) {
                container.addClass(this.prefixCss(UIContainer.REMOTE_CONTROL));
              }
              // Controls visibility marker class
              uimanager.onControlsShow.subscribe(function () {
                container.removeClass(
                  _this.prefixCss(UIContainer.CONTROLS_HIDDEN)
                );
                container.addClass(_this.prefixCss(UIContainer.CONTROLS_SHOWN));
              });
              uimanager.onControlsHide.subscribe(function () {
                container.removeClass(
                  _this.prefixCss(UIContainer.CONTROLS_SHOWN)
                );
                container.addClass(
                  _this.prefixCss(UIContainer.CONTROLS_HIDDEN)
                );
              });
              // Layout size classes
              var updateLayoutSizeClasses = function (width, height) {
                container.removeClass(_this.prefixCss("layout-max-width-400"));
                container.removeClass(_this.prefixCss("layout-max-width-600"));
                container.removeClass(_this.prefixCss("layout-max-width-800"));
                container.removeClass(_this.prefixCss("layout-max-width-1200"));
                if (width <= 400) {
                  container.addClass(_this.prefixCss("layout-max-width-400"));
                } else if (width <= 600) {
                  container.addClass(_this.prefixCss("layout-max-width-600"));
                } else if (width <= 800) {
                  container.addClass(_this.prefixCss("layout-max-width-800"));
                } else if (width <= 1200) {
                  container.addClass(_this.prefixCss("layout-max-width-1200"));
                }
              };
              player.on(player.exports.PlayerEvent.PlayerResized, function (e) {
                // Convert strings (with "px" suffix) to ints
                var width = Math.round(
                  Number(e.width.substring(0, e.width.length - 2))
                );
                var height = Math.round(
                  Number(e.height.substring(0, e.height.length - 2))
                );
                updateLayoutSizeClasses(width, height);
              });
              // Init layout state
              updateLayoutSizeClasses(
                new dom_1.DOM(player.getContainer()).width(),
                new dom_1.DOM(player.getContainer()).height()
              );
            };
            UIContainer.prototype.release = function () {
              var _this = this;
              // Explicitly unsubscribe user interaction event handlers because they could be attached to an external element
              // that isn't owned by the UI and therefore not removed on release.
              if (this.userInteractionEvents) {
                this.userInteractionEvents.forEach(function (event) {
                  return _this.userInteractionEventSource.off(
                    event.name,
                    event.handler
                  );
                });
              }
              _super.prototype.release.call(this);
              if (this.uiHideTimeout) {
                this.uiHideTimeout.clear();
              }
            };
            UIContainer.prototype.toDomElement = function () {
              var container = _super.prototype.toDomElement.call(this);
              // Detect flexbox support (not supported in IE9)
              if (
                document &&
                typeof document.createElement("p").style.flex !== "undefined"
              ) {
                container.addClass(this.prefixCss("flexbox"));
              } else {
                container.addClass(this.prefixCss("no-flexbox"));
              }
              return container;
            };
            UIContainer.STATE_PREFIX = "player-state-";
            UIContainer.FULLSCREEN = "fullscreen";
            UIContainer.BUFFERING = "buffering";
            UIContainer.REMOTE_CONTROL = "remote-control";
            UIContainer.CONTROLS_SHOWN = "controls-shown";
            UIContainer.CONTROLS_HIDDEN = "controls-hidden";
            return UIContainer;
          })(container_1.Container));
        },
        {
          "../dom": 86,
          "../eventdispatcher": 88,
          "../localization/i18n": 93,
          "../playerutils": 99,
          "../timeout": 114,
          "./container": 19,
        },
      ],
      79: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.VideoQualitySelectBox = void 0;
          var selectbox_1 = require("./selectbox");
          var i18n_1 = require("../localization/i18n");
          /**
           * A select box providing a selection between 'auto' and the available video qualities.
           */
          var VideoQualitySelectBox = /** @class */ (function (_super) {
            __extends(VideoQualitySelectBox, _super);
            function VideoQualitySelectBox(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClasses: ["ui-videoqualityselectbox"],
                },
                _this.config
              );
              return _this;
            }
            VideoQualitySelectBox.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var selectCurrentVideoQuality = function () {
                _this.selectItem(player.getVideoQuality().id);
              };
              var updateVideoQualities = function () {
                var videoQualities = player.getAvailableVideoQualities();
                _this.clearItems();
                // Progressive streams do not support automatic quality selection
                _this.hasAuto = player.getStreamType() !== "progressive";
                if (_this.hasAuto) {
                  // Add entry for automatic quality switching (default setting)
                  _this.addItem("auto", i18n_1.i18n.getLocalizer("auto"));
                }
                // Add video qualities
                for (
                  var _i = 0, videoQualities_1 = videoQualities;
                  _i < videoQualities_1.length;
                  _i++
                ) {
                  var videoQuality = videoQualities_1[_i];
                  _this.addItem(videoQuality.id, videoQuality.label);
                }
                // Select initial quality
                selectCurrentVideoQuality();
              };
              this.onItemSelected.subscribe(function (sender, value) {
                player.setVideoQuality(value);
              });
              // Update qualities when source goes away
              player.on(
                player.exports.PlayerEvent.SourceUnloaded,
                updateVideoQualities
              );
              // Update qualities when the period within a source changes
              player.on(
                player.exports.PlayerEvent.PeriodSwitched,
                updateVideoQualities
              );
              // Update quality selection when quality is changed (from outside)
              player.on(
                player.exports.PlayerEvent.VideoQualityChanged,
                selectCurrentVideoQuality
              );
              if (player.exports.PlayerEvent.VideoQualityAdded) {
                // Update qualities when their availability changed
                // TODO: remove any cast after next player release
                player.on(
                  player.exports.PlayerEvent.VideoQualityAdded,
                  updateVideoQualities
                );
                player.on(
                  player.exports.PlayerEvent.VideoQualityRemoved,
                  updateVideoQualities
                );
              }
              uimanager
                .getConfig()
                .events.onUpdated.subscribe(updateVideoQualities);
            };
            /**
             * Returns true if the select box contains an 'auto' item for automatic quality selection mode.
             * @return {boolean}
             */
            VideoQualitySelectBox.prototype.hasAutoItem = function () {
              return this.hasAuto;
            };
            return VideoQualitySelectBox;
          })(selectbox_1.SelectBox);
          exports.VideoQualitySelectBox = VideoQualitySelectBox;
        },
        { "../localization/i18n": 93, "./selectbox": 48 },
      ],
      80: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.VolumeControlButton = void 0;
          var container_1 = require("./container");
          var volumeslider_1 = require("./volumeslider");
          var volumetogglebutton_1 = require("./volumetogglebutton");
          var timeout_1 = require("../timeout");
          /**
           * A composite volume control that consists of and internally manages a volume control button that can be used
           * for muting, and a (depending on the CSS style, e.g. slide-out) volume control bar.
           */
          var VolumeControlButton = /** @class */ (function (_super) {
            __extends(VolumeControlButton, _super);
            function VolumeControlButton(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.volumeToggleButton =
                new volumetogglebutton_1.VolumeToggleButton();
              _this.volumeSlider = new volumeslider_1.VolumeSlider({
                vertical: config.vertical != null ? config.vertical : true,
                hidden: true,
              });
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-volumecontrolbutton",
                  components: [_this.volumeToggleButton, _this.volumeSlider],
                  hideDelay: 500,
                },
                _this.config
              );
              return _this;
            }
            VolumeControlButton.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var volumeToggleButton = this.getVolumeToggleButton();
              var volumeSlider = this.getVolumeSlider();
              this.volumeSliderHideTimeout = new timeout_1.Timeout(
                this.getConfig().hideDelay,
                function () {
                  volumeSlider.hide();
                }
              );
              /*
               * Volume Slider visibility handling
               *
               * The volume slider shall be visible while the user hovers the mute toggle button, while the user hovers the
               * volume slider, and while the user slides the volume slider. If none of these situations are true, the slider
               * shall disappear.
               */
              var volumeSliderHovered = false;
              volumeToggleButton.getDomElement().on("mouseenter", function () {
                // Show volume slider when mouse enters the button area
                if (volumeSlider.isHidden()) {
                  volumeSlider.show();
                }
                // Avoid hiding of the slider when button is hovered
                _this.volumeSliderHideTimeout.clear();
              });
              volumeToggleButton.getDomElement().on("mouseleave", function () {
                // Hide slider delayed when button is left
                _this.volumeSliderHideTimeout.reset();
              });
              volumeSlider.getDomElement().on("mouseenter", function () {
                // When the slider is entered, cancel the hide timeout activated by leaving the button
                _this.volumeSliderHideTimeout.clear();
                volumeSliderHovered = true;
              });
              volumeSlider.getDomElement().on("mouseleave", function () {
                // When mouse leaves the slider, only hide it if there is no slide operation in progress
                if (volumeSlider.isSeeking()) {
                  _this.volumeSliderHideTimeout.clear();
                } else {
                  _this.volumeSliderHideTimeout.reset();
                }
                volumeSliderHovered = false;
              });
              volumeSlider.onSeeked.subscribe(function () {
                // When a slide operation is done and the slider not hovered (mouse outside slider), hide slider delayed
                if (!volumeSliderHovered) {
                  _this.volumeSliderHideTimeout.reset();
                }
              });
            };
            VolumeControlButton.prototype.release = function () {
              _super.prototype.release.call(this);
              this.volumeSliderHideTimeout.clear();
            };
            /**
             * Provides access to the internally managed volume toggle button.
             * @returns {VolumeToggleButton}
             */
            VolumeControlButton.prototype.getVolumeToggleButton = function () {
              return this.volumeToggleButton;
            };
            /**
             * Provides access to the internally managed volume silder.
             * @returns {VolumeSlider}
             */
            VolumeControlButton.prototype.getVolumeSlider = function () {
              return this.volumeSlider;
            };
            return VolumeControlButton;
          })(container_1.Container);
          exports.VolumeControlButton = VolumeControlButton;
        },
        {
          "../timeout": 114,
          "./container": 19,
          "./volumeslider": 81,
          "./volumetogglebutton": 82,
        },
      ],
      81: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.VolumeSlider = void 0;
          var seekbar_1 = require("./seekbar");
          var i18n_1 = require("../localization/i18n");
          /**
           * A simple volume slider component to adjust the player's volume setting.
           */
          var VolumeSlider = /** @class */ (function (_super) {
            __extends(VolumeSlider, _super);
            function VolumeSlider(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.updateVolumeWhileScrubbing = function (sender, args) {
                if (args.scrubbing && _this.volumeTransition) {
                  _this.volumeTransition.update(args.position);
                }
              };
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-volumeslider",
                  hideIfVolumeControlProhibited: true,
                  ariaLabel: i18n_1.i18n.getLocalizer("settings.audio.volume"),
                  tabIndex: 0,
                },
                _this.config
              );
              return _this;
            }
            VolumeSlider.prototype.setVolumeAriaSliderValues = function (
              value
            ) {
              this.getDomElement().attr(
                "aria-valuenow",
                Math.ceil(value).toString()
              );
              this.getDomElement().attr(
                "aria-valuetext",
                ""
                  .concat(
                    i18n_1.i18n.performLocalization(
                      i18n_1.i18n.getLocalizer("seekBar.value")
                    ),
                    ": "
                  )
                  .concat(Math.ceil(value))
              );
            };
            VolumeSlider.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager, false);
              this.setAriaSliderMinMax("0", "100");
              var config = this.getConfig();
              var volumeController = uimanager.getConfig().volumeController;
              if (
                config.hideIfVolumeControlProhibited &&
                !this.detectVolumeControlAvailability()
              ) {
                this.hide();
                // We can just return from here, because the user will never interact with the control and any configured
                // functionality would only eat resources for no reason.
                return;
              }
              volumeController.onChanged.subscribe(function (_, args) {
                if (args.muted) {
                  _this.setVolumeAriaSliderValues(0);
                  _this.setPlaybackPosition(0);
                } else {
                  _this.setPlaybackPosition(args.volume);
                  _this.setVolumeAriaSliderValues(args.volume);
                }
              });
              this.onSeek.subscribe(function () {
                _this.volumeTransition = volumeController.startTransition();
              });
              this.onSeekPreview.subscribeRateLimited(
                this.updateVolumeWhileScrubbing,
                50
              );
              this.onSeeked.subscribe(function (sender, percentage) {
                if (_this.volumeTransition) {
                  _this.volumeTransition.finish(percentage);
                }
              });
              // Update the volume slider marker when the player resized, a source is loaded,
              // or the UI is configured. Check the seekbar for a detailed description.
              player.on(player.exports.PlayerEvent.PlayerResized, function () {
                _this.refreshPlaybackPosition();
              });
              uimanager.onConfigured.subscribe(function () {
                _this.refreshPlaybackPosition();
              });
              uimanager.getConfig().events.onUpdated.subscribe(function () {
                _this.refreshPlaybackPosition();
              });
              uimanager.onComponentShow.subscribe(function () {
                _this.refreshPlaybackPosition();
              });
              uimanager.onComponentHide.subscribe(function () {
                _this.refreshPlaybackPosition();
              });
              // Init volume bar
              volumeController.onChangedEvent();
            };
            VolumeSlider.prototype.detectVolumeControlAvailability =
              function () {
                /*
                 * "On iOS devices, the audio level is always under the userâ€™s physical control. The volume property is not
                 * settable in JavaScript. Reading the volume property always returns 1."
                 * https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html
                 */
                // as muted autoplay gets paused as soon as we unmute it, we may not touch the volume of the actual player so we
                // probe a dummy audio element
                var dummyVideoElement = document.createElement("video");
                // try setting the volume to 0.7 and if it's still 1 we are on a volume control restricted device
                dummyVideoElement.volume = 0.7;
                return dummyVideoElement.volume !== 1;
              };
            VolumeSlider.prototype.release = function () {
              _super.prototype.release.call(this);
              this.onSeekPreview.unsubscribe(this.updateVolumeWhileScrubbing);
            };
            return VolumeSlider;
          })(seekbar_1.SeekBar);
          exports.VolumeSlider = VolumeSlider;
        },
        { "../localization/i18n": 93, "./seekbar": 44 },
      ],
      82: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.VolumeToggleButton = void 0;
          var togglebutton_1 = require("./togglebutton");
          var i18n_1 = require("../localization/i18n");
          /**
           * A button that toggles audio muting.
           */
          var VolumeToggleButton = /** @class */ (function (_super) {
            __extends(VolumeToggleButton, _super);
            function VolumeToggleButton(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              var defaultConfig = {
                cssClass: "ui-volumetogglebutton",
                text: i18n_1.i18n.getLocalizer("settings.audio.mute"),
                onClass: "muted",
                offClass: "unmuted",
                ariaLabel: i18n_1.i18n.getLocalizer("settings.audio.mute"),
              };
              _this.config = _this.mergeConfig(
                config,
                defaultConfig,
                _this.config
              );
              return _this;
            }
            VolumeToggleButton.prototype.configure = function (
              player,
              uimanager
            ) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var volumeController = uimanager.getConfig().volumeController;
              volumeController.onChanged.subscribe(function (_, args) {
                if (args.muted) {
                  _this.on();
                } else {
                  _this.off();
                }
                var volumeLevelTens = Math.ceil(args.volume / 10);
                _this
                  .getDomElement()
                  .data(
                    _this.prefixCss("volume-level-tens"),
                    String(volumeLevelTens)
                  );
              });
              this.onClick.subscribe(function () {
                volumeController.toggleMuted();
              });
              // Startup init
              volumeController.onChangedEvent();
            };
            return VolumeToggleButton;
          })(togglebutton_1.ToggleButton);
          exports.VolumeToggleButton = VolumeToggleButton;
        },
        { "../localization/i18n": 93, "./togglebutton": 76 },
      ],
      83: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.VRToggleButton = void 0;
          var togglebutton_1 = require("./togglebutton");
          var i18n_1 = require("../localization/i18n");
          /**
           * A button that toggles the video view between normal/mono and VR/stereo.
           */
          var VRToggleButton = /** @class */ (function (_super) {
            __extends(VRToggleButton, _super);
            function VRToggleButton(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-vrtogglebutton",
                  text: i18n_1.i18n.getLocalizer("vr"),
                },
                _this.config
              );
              return _this;
            }
            VRToggleButton.prototype.configure = function (player, uimanager) {
              var _this = this;
              _super.prototype.configure.call(this, player, uimanager);
              var isVRConfigured = function () {
                // VR availability cannot be checked through getVRStatus() because it is asynchronously populated and not
                // available at UI initialization. As an alternative, we check the VR settings in the config.
                // TODO use getVRStatus() through isVRStereoAvailable() once the player has been rewritten and the status is
                // available in Ready
                var source = player.getSource();
                return source && Boolean(source.vr);
              };
              var isVRStereoAvailable = function () {
                var source = player.getSource();
                return player.vr && Boolean(source.vr);
              };
              var vrStateHandler = function (ev) {
                if (
                  ev.type === player.exports.PlayerEvent.Warning &&
                  ev.code !== player.exports.WarningCode.VR_RENDERING_ERROR
                ) {
                  return;
                }
                if (isVRConfigured() && isVRStereoAvailable()) {
                  _this.show(); // show button in case it is hidden
                  if (player.vr && player.vr.getStereo()) {
                    _this.on();
                  } else {
                    _this.off();
                  }
                } else {
                  _this.hide(); // hide button if no stereo mode available
                }
              };
              var vrButtonVisibilityHandler = function () {
                if (isVRConfigured()) {
                  _this.show();
                } else {
                  _this.hide();
                }
              };
              player.on(
                player.exports.PlayerEvent.VRStereoChanged,
                vrStateHandler
              );
              player.on(player.exports.PlayerEvent.Warning, vrStateHandler);
              // Hide button when VR source goes away
              player.on(
                player.exports.PlayerEvent.SourceUnloaded,
                vrButtonVisibilityHandler
              );
              uimanager
                .getConfig()
                .events.onUpdated.subscribe(vrButtonVisibilityHandler);
              this.onClick.subscribe(function () {
                if (!isVRStereoAvailable()) {
                  if (console) {
                    console.log("No VR content");
                  }
                } else {
                  if (player.vr && player.vr.getStereo()) {
                    player.vr.setStereo(false);
                  } else {
                    player.vr.setStereo(true);
                  }
                }
              });
              // Set startup visibility
              vrButtonVisibilityHandler();
            };
            return VRToggleButton;
          })(togglebutton_1.ToggleButton);
          exports.VRToggleButton = VRToggleButton;
        },
        { "../localization/i18n": 93, "./togglebutton": 76 },
      ],
      84: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.Watermark = void 0;
          var clickoverlay_1 = require("./clickoverlay");
          var i18n_1 = require("../localization/i18n");
          /**
           * A watermark overlay with a clickable logo.
           */
          var Watermark = /** @class */ (function (_super) {
            __extends(Watermark, _super);
            function Watermark(config) {
              if (config === void 0) {
                config = {};
              }
              var _this = _super.call(this, config) || this;
              _this.config = _this.mergeConfig(
                config,
                {
                  cssClass: "ui-watermark",
                  url: "http://bitmovin.com",
                  role: "link",
                  text: "logo",
                  ariaLabel: i18n_1.i18n.getLocalizer("watermarkLink"),
                },
                _this.config
              );
              return _this;
            }
            return Watermark;
          })(clickoverlay_1.ClickOverlay);
          exports.Watermark = Watermark;
        },
        { "../localization/i18n": 93, "./clickoverlay": 16 },
      ],
      85: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.DemoFactory = void 0;
          var vrtogglebutton_1 = require("./components/vrtogglebutton");
          var settingstogglebutton_1 = require("./components/settingstogglebutton");
          var volumeslider_1 = require("./components/volumeslider");
          var playbacktimelabel_1 = require("./components/playbacktimelabel");
          var airplaytogglebutton_1 = require("./components/airplaytogglebutton");
          var errormessageoverlay_1 = require("./components/errormessageoverlay");
          var controlbar_1 = require("./components/controlbar");
          var casttogglebutton_1 = require("./components/casttogglebutton");
          var fullscreentogglebutton_1 = require("./components/fullscreentogglebutton");
          var recommendationoverlay_1 = require("./components/recommendationoverlay");
          var playbackspeedselectbox_1 = require("./components/playbackspeedselectbox");
          var audioqualityselectbox_1 = require("./components/audioqualityselectbox");
          var caststatusoverlay_1 = require("./components/caststatusoverlay");
          var uicontainer_1 = require("./components/uicontainer");
          var watermark_1 = require("./components/watermark");
          var subtitleoverlay_1 = require("./components/subtitleoverlay");
          var settingspanel_1 = require("./components/settingspanel");
          var seekbarlabel_1 = require("./components/seekbarlabel");
          var playbacktoggleoverlay_1 = require("./components/playbacktoggleoverlay");
          var pictureinpicturetogglebutton_1 = require("./components/pictureinpicturetogglebutton");
          var spacer_1 = require("./components/spacer");
          var container_1 = require("./components/container");
          var volumetogglebutton_1 = require("./components/volumetogglebutton");
          var playbacktogglebutton_1 = require("./components/playbacktogglebutton");
          var seekbar_1 = require("./components/seekbar");
          var videoqualityselectbox_1 = require("./components/videoqualityselectbox");
          var uimanager_1 = require("./uimanager");
          var titlebar_1 = require("./components/titlebar");
          var bufferingoverlay_1 = require("./components/bufferingoverlay");
          var subtitlelistbox_1 = require("./components/subtitlelistbox");
          var audiotracklistbox_1 = require("./components/audiotracklistbox");
          var settingspanelitem_1 = require("./components/settingspanelitem");
          var settingspanelpage_1 = require("./components/settingspanelpage");
          var uifactory_1 = require("./uifactory");
          var DemoFactory;
          (function (DemoFactory) {
            function buildDemoWithSeparateAudioSubtitlesButtons(
              player,
              config
            ) {
              if (config === void 0) {
                config = {};
              }
              // show smallScreen UI only on mobile/handheld devices
              var smallScreenSwitchWidth = 600;
              return new uimanager_1.UIManager(
                player,
                [
                  {
                    ui: uifactory_1.UIFactory.modernSmallScreenAdsUI(),
                    condition: function (context) {
                      return (
                        context.isMobile &&
                        context.documentWidth < smallScreenSwitchWidth &&
                        context.isAd &&
                        context.adRequiresUi
                      );
                    },
                  },
                  {
                    ui: uifactory_1.UIFactory.modernAdsUI(),
                    condition: function (context) {
                      return context.isAd && context.adRequiresUi;
                    },
                  },
                  {
                    ui: uifactory_1.UIFactory.modernSmallScreenUI(),
                    condition: function (context) {
                      return (
                        context.isMobile &&
                        context.documentWidth < smallScreenSwitchWidth
                      );
                    },
                  },
                  {
                    ui: modernUIWithSeparateAudioSubtitlesButtons(),
                  },
                ],
                config
              );
            }
            DemoFactory.buildDemoWithSeparateAudioSubtitlesButtons =
              buildDemoWithSeparateAudioSubtitlesButtons;
            function modernUIWithSeparateAudioSubtitlesButtons() {
              var subtitleOverlay = new subtitleoverlay_1.SubtitleOverlay();
              var settingsPanel = new settingspanel_1.SettingsPanel({
                components: [
                  new settingspanelpage_1.SettingsPanelPage({
                    components: [
                      new settingspanelitem_1.SettingsPanelItem(
                        "Video Quality",
                        new videoqualityselectbox_1.VideoQualitySelectBox()
                      ),
                      new settingspanelitem_1.SettingsPanelItem(
                        "Speed",
                        new playbackspeedselectbox_1.PlaybackSpeedSelectBox()
                      ),
                      new settingspanelitem_1.SettingsPanelItem(
                        "Audio Quality",
                        new audioqualityselectbox_1.AudioQualitySelectBox()
                      ),
                    ],
                  }),
                ],
                hidden: true,
              });
              var subtitleListBox = new subtitlelistbox_1.SubtitleListBox();
              var subtitleSettingsPanel = new settingspanel_1.SettingsPanel({
                components: [
                  new settingspanelpage_1.SettingsPanelPage({
                    components: [
                      new settingspanelitem_1.SettingsPanelItem(
                        null,
                        subtitleListBox
                      ),
                    ],
                  }),
                ],
                hidden: true,
              });
              var audioTrackListBox =
                new audiotracklistbox_1.AudioTrackListBox();
              var audioTrackSettingsPanel = new settingspanel_1.SettingsPanel({
                components: [
                  new settingspanelpage_1.SettingsPanelPage({
                    components: [
                      new settingspanelitem_1.SettingsPanelItem(
                        null,
                        audioTrackListBox
                      ),
                    ],
                  }),
                ],
                hidden: true,
              });
              var controlBar = new controlbar_1.ControlBar({
                components: [
                  audioTrackSettingsPanel,
                  subtitleSettingsPanel,
                  settingsPanel,
                  new container_1.Container({
                    components: [
                      new playbacktimelabel_1.PlaybackTimeLabel({
                        timeLabelMode:
                          playbacktimelabel_1.PlaybackTimeLabelMode.CurrentTime,
                        hideInLivePlayback: true,
                      }),
                      new seekbar_1.SeekBar({
                        label: new seekbarlabel_1.SeekBarLabel(),
                      }),
                      new playbacktimelabel_1.PlaybackTimeLabel({
                        timeLabelMode:
                          playbacktimelabel_1.PlaybackTimeLabelMode.TotalTime,
                        cssClasses: ["text-right"],
                      }),
                    ],
                    cssClasses: ["controlbar-top"],
                  }),
                  new container_1.Container({
                    components: [
                      new playbacktogglebutton_1.PlaybackToggleButton(),
                      new volumetogglebutton_1.VolumeToggleButton(),
                      new volumeslider_1.VolumeSlider(),
                      new spacer_1.Spacer(),
                      new pictureinpicturetogglebutton_1.PictureInPictureToggleButton(),
                      new airplaytogglebutton_1.AirPlayToggleButton(),
                      new casttogglebutton_1.CastToggleButton(),
                      new vrtogglebutton_1.VRToggleButton(),
                      new settingstogglebutton_1.SettingsToggleButton({
                        settingsPanel: audioTrackSettingsPanel,
                        cssClass: "ui-audiotracksettingstogglebutton",
                      }),
                      new settingstogglebutton_1.SettingsToggleButton({
                        settingsPanel: subtitleSettingsPanel,
                        cssClass: "ui-subtitlesettingstogglebutton",
                      }),
                      new settingstogglebutton_1.SettingsToggleButton({
                        settingsPanel: settingsPanel,
                      }),
                      new fullscreentogglebutton_1.FullscreenToggleButton(),
                    ],
                    cssClasses: ["controlbar-bottom"],
                  }),
                ],
              });
              return new uicontainer_1.UIContainer({
                components: [
                  subtitleOverlay,
                  new bufferingoverlay_1.BufferingOverlay(),
                  new playbacktoggleoverlay_1.PlaybackToggleOverlay(),
                  new caststatusoverlay_1.CastStatusOverlay(),
                  controlBar,
                  new titlebar_1.TitleBar(),
                  new recommendationoverlay_1.RecommendationOverlay(),
                  new watermark_1.Watermark(),
                  new errormessageoverlay_1.ErrorMessageOverlay(),
                ],
              });
            }
          })((DemoFactory = exports.DemoFactory || (exports.DemoFactory = {})));
        },
        {
          "./components/airplaytogglebutton": 7,
          "./components/audioqualityselectbox": 8,
          "./components/audiotracklistbox": 9,
          "./components/bufferingoverlay": 11,
          "./components/caststatusoverlay": 13,
          "./components/casttogglebutton": 14,
          "./components/container": 19,
          "./components/controlbar": 20,
          "./components/errormessageoverlay": 28,
          "./components/fullscreentogglebutton": 29,
          "./components/pictureinpicturetogglebutton": 37,
          "./components/playbackspeedselectbox": 38,
          "./components/playbacktimelabel": 39,
          "./components/playbacktogglebutton": 40,
          "./components/playbacktoggleoverlay": 41,
          "./components/recommendationoverlay": 42,
          "./components/seekbar": 44,
          "./components/seekbarlabel": 47,
          "./components/settingspanel": 49,
          "./components/settingspanelitem": 50,
          "./components/settingspanelpage": 51,
          "./components/settingstogglebutton": 55,
          "./components/spacer": 56,
          "./components/subtitlelistbox": 57,
          "./components/subtitleoverlay": 58,
          "./components/titlebar": 75,
          "./components/uicontainer": 78,
          "./components/videoqualityselectbox": 79,
          "./components/volumeslider": 81,
          "./components/volumetogglebutton": 82,
          "./components/vrtogglebutton": 83,
          "./components/watermark": 84,
          "./uifactory": 115,
          "./uimanager": 117,
        },
      ],
      86: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.DOM = void 0;
          /**
           * Simple DOM manipulation and DOM element event handling modeled after jQuery (as replacement for jQuery).
           *
           * Like jQuery, DOM operates on single elements and lists of elements. For example: creating an element returns a DOM
           * instance with a single element, selecting elements returns a DOM instance with zero, one, or many elements. Similar
           * to jQuery, setters usually affect all elements, while getters operate on only the first element.
           * Also similar to jQuery, most methods (except getters) return the DOM instance facilitating easy chaining of method
           * calls.
           *
           * Built with the help of: http://youmightnotneedjquery.com/
           */
          var DOM = /** @class */ (function () {
            function DOM(something, attributes) {
              this.document = document; // Set the global document to the local document field
              if (something instanceof Array) {
                if (
                  something.length > 0 &&
                  something[0] instanceof HTMLElement
                ) {
                  var elements = something;
                  this.elements = elements;
                }
              } else if (something instanceof HTMLElement) {
                var element = something;
                this.elements = [element];
              } else if (something instanceof Document) {
                // When a document is passed in, we do not do anything with it, but by setting this.elements to null
                // we give the event handling method a means to detect if the events should be registered on the document
                // instead of elements.
                this.elements = null;
              } else if (attributes) {
                var tagName = something;
                var element = document.createElement(tagName);
                for (var attributeName in attributes) {
                  var attributeValue = attributes[attributeName];
                  if (attributeValue != null) {
                    element.setAttribute(attributeName, attributeValue);
                  }
                }
                this.elements = [element];
              } else {
                var selector = something;
                this.elements = this.findChildElements(selector);
              }
            }
            Object.defineProperty(DOM.prototype, "length", {
              /**
               * Gets the number of elements that this DOM instance currently holds.
               * @returns {number} the number of elements
               */
              get: function () {
                return this.elements ? this.elements.length : 0;
              },
              enumerable: false,
              configurable: true,
            });
            DOM.prototype.get = function (index) {
              if (index === undefined) {
                return this.elements;
              } else if (
                !this.elements ||
                index >= this.elements.length ||
                index < -this.elements.length
              ) {
                return undefined;
              } else if (index < 0) {
                return this.elements[this.elements.length - index];
              } else {
                return this.elements[index];
              }
            };
            /**
             * A shortcut method for iterating all elements. Shorts this.elements.forEach(...) to this.forEach(...).
             * @param handler the handler to execute an operation on an element
             */
            DOM.prototype.forEach = function (handler) {
              if (!this.elements) {
                return;
              }
              this.elements.forEach(function (element) {
                handler(element);
              });
            };
            DOM.prototype.findChildElementsOfElement = function (
              element,
              selector
            ) {
              var childElements = element.querySelectorAll(selector);
              // Convert NodeList to Array
              // https://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/
              return [].slice.call(childElements);
            };
            DOM.prototype.findChildElements = function (selector) {
              var _this = this;
              var allChildElements = [];
              if (this.elements) {
                this.forEach(function (element) {
                  allChildElements = allChildElements.concat(
                    _this.findChildElementsOfElement(element, selector)
                  );
                });
              } else {
                return this.findChildElementsOfElement(document, selector);
              }
              return allChildElements;
            };
            /**
             * Finds all child elements of all elements matching the supplied selector.
             * @param selector the selector to match with child elements
             * @returns {DOM} a new DOM instance representing all matched children
             */
            DOM.prototype.find = function (selector) {
              var allChildElements = this.findChildElements(selector);
              return new DOM(allChildElements);
            };
            /**
             * Focuses to the first input element
             */
            DOM.prototype.focusToFirstInput = function () {
              var inputElements = this.findChildElements(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
              );
              if (inputElements.length > 0) {
                inputElements[0].focus();
              }
            };
            /**
             * Focuses to the first input element
             */
            DOM.prototype.scrollTo = function (x, y) {
              this.elements[0].scrollTo(x, y);
            };
            DOM.prototype.html = function (content) {
              if (arguments.length > 0) {
                return this.setHtml(content);
              } else {
                return this.getHtml();
              }
            };
            DOM.prototype.getHtml = function () {
              return this.elements[0].innerHTML;
            };
            DOM.prototype.setHtml = function (content) {
              if (content === undefined || content == null) {
                // Set to empty string to avoid innerHTML getting set to 'undefined' (all browsers) or 'null' (IE9)
                content = "";
              }
              this.forEach(function (element) {
                element.innerHTML = content;
              });
              return this;
            };
            /**
             * Clears the inner HTML of all elements (deletes all children).
             * @returns {DOM}
             */
            DOM.prototype.empty = function () {
              this.forEach(function (element) {
                element.innerHTML = "";
              });
              return this;
            };
            /**
             * Returns the current value of the first form element, e.g. the selected value of a select box or the text if an
             * input field.
             * @returns {string} the value of a form element
             */
            DOM.prototype.val = function () {
              var element = this.elements[0];
              if (
                element instanceof HTMLSelectElement ||
                element instanceof HTMLInputElement
              ) {
                return element.value;
              } else {
                // TODO add support for missing form elements
                throw new Error(
                  "val() not supported for ".concat(typeof element)
                );
              }
            };
            DOM.prototype.attr = function (attribute, value) {
              if (arguments.length > 1) {
                return this.setAttr(attribute, value);
              } else {
                return this.getAttr(attribute);
              }
            };
            /**
             * Removes the attribute of the element.
             * @param attribute
             */
            DOM.prototype.removeAttr = function (attribute) {
              this.forEach(function (element) {
                element.removeAttribute(attribute);
              });
            };
            DOM.prototype.getAttr = function (attribute) {
              return this.elements[0].getAttribute(attribute);
            };
            DOM.prototype.setAttr = function (attribute, value) {
              this.forEach(function (element) {
                element.setAttribute(attribute, value);
              });
              return this;
            };
            DOM.prototype.data = function (dataAttribute, value) {
              if (arguments.length > 1) {
                return this.setData(dataAttribute, value);
              } else {
                return this.getData(dataAttribute);
              }
            };
            DOM.prototype.getData = function (dataAttribute) {
              return this.elements[0].getAttribute("data-" + dataAttribute);
            };
            DOM.prototype.setData = function (dataAttribute, value) {
              this.forEach(function (element) {
                element.setAttribute("data-" + dataAttribute, value);
              });
              return this;
            };
            /**
             * Appends one or more DOM elements as children to all elements.
             * @param childElements the chrild elements to append
             * @returns {DOM}
             */
            DOM.prototype.append = function () {
              var childElements = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                childElements[_i] = arguments[_i];
              }
              this.forEach(function (element) {
                childElements.forEach(function (childElement) {
                  childElement.elements.forEach(function (_, index) {
                    element.appendChild(childElement.elements[index]);
                  });
                });
              });
              return this;
            };
            /**
             * Removes all elements from the DOM.
             */
            DOM.prototype.remove = function () {
              this.forEach(function (element) {
                var parent = element.parentNode;
                if (parent) {
                  parent.removeChild(element);
                }
              });
            };
            /**
             * Returns the offset of the first element from the document's top left corner.
             * @returns {Offset}
             */
            DOM.prototype.offset = function () {
              var element = this.elements[0];
              var elementRect = element.getBoundingClientRect();
              var htmlRect =
                document.body.parentElement.getBoundingClientRect();
              // Virtual viewport scroll handling (e.g. pinch zoomed viewports in mobile browsers or desktop Chrome/Edge)
              // 'normal' zooms and virtual viewport zooms (aka layout viewport) result in different
              // element.getBoundingClientRect() results:
              //  - with normal scrolls, the clientRect decreases with an increase in scroll(Top|Left)/page(X|Y)Offset
              //  - with pinch zoom scrolls, the clientRect stays the same while scroll/pageOffset changes
              // This means, that the combination of clientRect + scroll/pageOffset does not work to calculate the offset
              // from the document's upper left origin when pinch zoom is used.
              // To work around this issue, we do not use scroll/pageOffset but get the clientRect of the html element and
              // subtract it from the element's rect, which always results in the offset from the document origin.
              // NOTE: the current way of offset calculation was implemented specifically to track event positions on the
              // seek bar, and it might break compatibility with jQuery's offset() method. If this ever turns out to be a
              // problem, this method should be reverted to the old version and the offset calculation moved to the seek bar.
              return {
                top: elementRect.top - htmlRect.top,
                left: elementRect.left - htmlRect.left,
              };
            };
            /**
             * Returns the width of the first element.
             * @returns {number} the width of the first element
             */
            DOM.prototype.width = function () {
              // TODO check if this is the same as jQuery's width() (probably not)
              return this.elements[0].offsetWidth;
            };
            /**
             * Returns the height of the first element.
             * @returns {number} the height of the first element
             */
            DOM.prototype.height = function () {
              // TODO check if this is the same as jQuery's height() (probably not)
              return this.elements[0].offsetHeight;
            };
            /**
             * Returns the size of the first element.
             * @return {Size} the size of the first element
             */
            DOM.prototype.size = function () {
              return { width: this.width(), height: this.height() };
            };
            /**
             * Attaches an event handler to one or more events on all elements.
             * @param eventName the event name (or multiple names separated by space) to listen to
             * @param eventHandler the event handler to call when the event fires
             * @returns {DOM}
             */
            DOM.prototype.on = function (eventName, eventHandler) {
              var _this = this;
              var events = eventName.split(" ");
              events.forEach(function (event) {
                if (_this.elements == null) {
                  _this.document.addEventListener(event, eventHandler);
                } else {
                  _this.forEach(function (element) {
                    element.addEventListener(event, eventHandler);
                  });
                }
              });
              return this;
            };
            /**
             * Removes an event handler from one or more events on all elements.
             * @param eventName the event name (or multiple names separated by space) to remove the handler from
             * @param eventHandler the event handler to remove
             * @returns {DOM}
             */
            DOM.prototype.off = function (eventName, eventHandler) {
              var _this = this;
              var events = eventName.split(" ");
              events.forEach(function (event) {
                if (_this.elements == null) {
                  _this.document.removeEventListener(event, eventHandler);
                } else {
                  _this.forEach(function (element) {
                    element.removeEventListener(event, eventHandler);
                  });
                }
              });
              return this;
            };
            /**
             * Adds the specified class(es) to all elements.
             * @param className the class(es) to add, multiple classes separated by space
             * @returns {DOM}
             */
            DOM.prototype.addClass = function (className) {
              this.forEach(function (element) {
                var _a;
                if (element.classList) {
                  var classNames = className
                    .split(" ")
                    .filter(function (className) {
                      return className.length > 0;
                    });
                  if (classNames.length > 0) {
                    (_a = element.classList).add.apply(_a, classNames);
                  }
                } else {
                  element.className += " " + className;
                }
              });
              return this;
            };
            /**
             * Removed the specified class(es) from all elements.
             * @param className the class(es) to remove, multiple classes separated by space
             * @returns {DOM}
             */
            DOM.prototype.removeClass = function (className) {
              this.forEach(function (element) {
                var _a;
                if (element.classList) {
                  var classNames = className
                    .split(" ")
                    .filter(function (className) {
                      return className.length > 0;
                    });
                  if (classNames.length > 0) {
                    (_a = element.classList).remove.apply(_a, classNames);
                  }
                } else {
                  element.className = element.className.replace(
                    new RegExp(
                      "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
                      "gi"
                    ),
                    " "
                  );
                }
              });
              return this;
            };
            /**
             * Checks if any of the elements has the specified class.
             * @param className the class name to check
             * @returns {boolean} true if one of the elements has the class attached, else if no element has it attached
             */
            DOM.prototype.hasClass = function (className) {
              var hasClass = false;
              this.forEach(function (element) {
                if (element.classList) {
                  if (element.classList.contains(className)) {
                    // Since we are inside a handler, we can't just 'return true'. Instead, we save it to a variable
                    // and return it at the end of the function body.
                    hasClass = true;
                  }
                } else {
                  if (
                    new RegExp("(^| )" + className + "( |$)", "gi").test(
                      element.className
                    )
                  ) {
                    // See comment above
                    hasClass = true;
                  }
                }
              });
              return hasClass;
            };
            DOM.prototype.css = function (propertyNameOrCollection, value) {
              if (typeof propertyNameOrCollection === "string") {
                var propertyName = propertyNameOrCollection;
                if (arguments.length === 2) {
                  return this.setCss(propertyName, value);
                } else {
                  return this.getCss(propertyName);
                }
              } else {
                var propertyValueCollection = propertyNameOrCollection;
                return this.setCssCollection(propertyValueCollection);
              }
            };
            /**
             * Removes an inline CSS property if it exists
             * @param propertyName name of the property to remove
             * @param elementIndex index of the element whose CSS property should get removed
             */
            DOM.prototype.removeCss = function (propertyName, elementIndex) {
              if (elementIndex === void 0) {
                elementIndex = 0;
              }
              return this.elements[elementIndex].style.removeProperty(
                propertyName
              );
            };
            DOM.prototype.getCss = function (propertyName) {
              return getComputedStyle(this.elements[0])[propertyName];
            };
            DOM.prototype.setCss = function (propertyName, value) {
              this.forEach(function (element) {
                // <any> cast to resolve TS7015: http://stackoverflow.com/a/36627114/370252
                element.style[propertyName] = value;
              });
              return this;
            };
            DOM.prototype.setCssCollection = function (ruleValueCollection) {
              this.forEach(function (element) {
                // http://stackoverflow.com/a/34490573/370252
                Object.assign(element.style, ruleValueCollection);
              });
              return this;
            };
            return DOM;
          })();
          exports.DOM = DOM;
        },
        {},
      ],
      87: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.ErrorUtils = void 0;
          var ErrorUtils;
          (function (ErrorUtils) {
            ErrorUtils.defaultErrorMessages = {
              1000: "Error is unknown",
              1001: "The player API is not available after a call to PlayerAPI.destroy.",
              1100: "General setup error",
              1101: "There was an error when inserting the HTML video element",
              1102: "No configuration was provided",
              1103: "The license is not valid",
              1104: "The the domain-locked player is not authorized to playback on this domain",
              1105: "The domain is not allowlisted",
              1106: "The license server URL is invalid",
              1107: "The impression server URL is invalid",
              1108: "Could not initialize a rendering engine",
              1109: "The used flash version does not support playback",
              1110: "Native Flash is not authorized by a valid Adobe token",
              1111: "Flash doesn't have sufficient resources",
              1112: "Flash container API not available",
              1113: 'Protocol not supported. This site has been loaded using "file" protocol, but unfortunately this is not supported. Please load the page using a web server (using http or https)',
              1200: "General source error",
              1201: "No valid source was provided",
              1202: "The downloaded manifest is invalid",
              1203: "There was no technology detected to playback the provided source",
              1204: "The stream type is not supported",
              1205: "The forced technology is not supported",
              1206: "No stream found for supported technologies.",
              1207: "The downloaded segment is empty",
              1208: "The manifest could not be loaded",
              1209: "Progressive stream type not supported or the stream has an error",
              1210: "HLS stream has an error",
              1211: "The encryption method is not supported",
              1300: "General playback error",
              1301: "Video decoder or demuxer had an error with the content",
              1302: "General error if Flash renderer has an error",
              1303: "Flash doesn't have sufficient resources",
              1304: "The transmuxer could not be initialized",
              1400: "Network error while downloading",
              1401: "The manifest download timed out",
              1402: "The segment download timed out",
              1403: "The progressive stream download timed out",
              1404: "The Certificate could not be loaded",
              2000: "General DRM error",
              2001: "Required DRM configuration is missing",
              2002: "The licensing server URL is missing",
              2003: "License request failed",
              2004: "Key or KeyId is missing",
              2005: "Key size is not supported",
              2006: "Unable to instantiate a key system supporting the required combinations",
              2007: "Unable to create or initialize key session",
              2008: "The MediaKey object could not be created/initialized",
              2009: "Key error",
              2010: "The key system is not supported",
              2011: "The certificate is not valid",
              2012: "Invalid header key/value pair for PlayReady license request",
              2013: "Content cannot be played back because the output is restricted on this machine",
              2014: "DRM error for the Flash renderer",
              2100: "General VR error",
              2101: "Player technology not compatible with VR playback",
              3000: "General module error",
              3001: "The definition of the module is invalid (e.g. incomplete).",
              3002: "The module definition specifies dependencies but the module is not provided via a function for deferred loading.",
              3003: "A module cannot be loaded because it has not been added to the player core.",
              3004: "A module cannot be loaded because one or more dependencies are missing.",
              3100: "An Advertising module error has occurred. Refer to the attached AdvertisingError.",
            };
            ErrorUtils.defaultMobileV3ErrorMessageTranslator = function (
              error
            ) {
              return error.message;
            };
            ErrorUtils.defaultWebErrorMessageTranslator = function (error) {
              var errorMessage = ErrorUtils.defaultErrorMessages[error.code];
              if (errorMessage) {
                // Use the error message text if there is one
                return "".concat(errorMessage, "\n(").concat(error.name, ")"); // default error message style
              } else {
                // Fallback to error code/name if no message is defined
                return "".concat(error.code, " ").concat(error.name);
              }
            };
          })((ErrorUtils = exports.ErrorUtils || (exports.ErrorUtils = {})));
        },
        {},
      ],
      88: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.EventDispatcher = void 0;
          var arrayutils_1 = require("./arrayutils");
          var timeout_1 = require("./timeout");
          /**
           * Event dispatcher to subscribe and trigger events. Each event should have its own dispatcher.
           */
          var EventDispatcher = /** @class */ (function () {
            function EventDispatcher() {
              this.listeners = [];
            }
            /**
             * {@inheritDoc}
             */
            EventDispatcher.prototype.subscribe = function (listener) {
              this.listeners.push(new EventListenerWrapper(listener));
            };
            /**
             * {@inheritDoc}
             */
            EventDispatcher.prototype.subscribeOnce = function (listener) {
              this.listeners.push(new EventListenerWrapper(listener, true));
            };
            /**
             * {@inheritDoc}
             */
            EventDispatcher.prototype.subscribeRateLimited = function (
              listener,
              rateMs
            ) {
              this.listeners.push(
                new RateLimitedEventListenerWrapper(listener, rateMs)
              );
            };
            /**
             * {@inheritDoc}
             */
            EventDispatcher.prototype.unsubscribe = function (listener) {
              // Iterate through listeners, compare with parameter, and remove if found
              // NOTE: In case we ever remove all matching listeners instead of just the first, we need to reverse-iterate here
              for (var i = 0; i < this.listeners.length; i++) {
                var subscribedListener = this.listeners[i];
                if (subscribedListener.listener === listener) {
                  subscribedListener.clear();
                  arrayutils_1.ArrayUtils.remove(
                    this.listeners,
                    subscribedListener
                  );
                  return true;
                }
              }
              return false;
            };
            /**
             * Removes all listeners from this dispatcher.
             */
            EventDispatcher.prototype.unsubscribeAll = function () {
              // In case of RateLimitedEventListenerWrapper we need to make sure that the timeout callback won't be called
              for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener.clear();
              }
              this.listeners = [];
            };
            /**
             * Dispatches an event to all subscribed listeners.
             * @param sender the source of the event
             * @param args the arguments for the event
             */
            EventDispatcher.prototype.dispatch = function (sender, args) {
              if (args === void 0) {
                args = null;
              }
              var listenersToRemove = [];
              // Call every listener
              // We iterate over a copy of the array of listeners to avoid the case where events are not fired on listeners when
              // listeners are unsubscribed from within the event handlers during a dispatch (because the indices change and
              // listeners are shifted within the array).
              // This means that listener x+1 will still be called if unsubscribed from within the handler of listener x, as well
              // as listener y+1 will not be called when subscribed from within the handler of listener y.
              // Array.slice(0) is the fastest array copy method according to: https://stackoverflow.com/a/21514254/370252
              var listeners = this.listeners.slice(0);
              for (
                var _i = 0, listeners_1 = listeners;
                _i < listeners_1.length;
                _i++
              ) {
                var listener = listeners_1[_i];
                listener.fire(sender, args);
                if (listener.isOnce()) {
                  listenersToRemove.push(listener);
                }
              }
              // Remove one-time listener
              for (
                var _a = 0, listenersToRemove_1 = listenersToRemove;
                _a < listenersToRemove_1.length;
                _a++
              ) {
                var listenerToRemove = listenersToRemove_1[_a];
                arrayutils_1.ArrayUtils.remove(
                  this.listeners,
                  listenerToRemove
                );
              }
            };
            /**
             * Returns the event that this dispatcher manages and on which listeners can subscribe and unsubscribe event handlers.
             * @returns {Event}
             */
            EventDispatcher.prototype.getEvent = function () {
              // For now, just cast the event dispatcher to the event interface. At some point in the future when the
              // codebase grows, it might make sense to split the dispatcher into separate dispatcher and event classes.
              return this;
            };
            return EventDispatcher;
          })();
          exports.EventDispatcher = EventDispatcher;
          /**
           * A basic event listener wrapper to manage listeners within the {@link EventDispatcher}. This is a 'private' class
           * for internal dispatcher use and it is therefore not exported.
           */
          var EventListenerWrapper = /** @class */ (function () {
            function EventListenerWrapper(listener, once) {
              if (once === void 0) {
                once = false;
              }
              this.eventListener = listener;
              this.once = once;
            }
            Object.defineProperty(EventListenerWrapper.prototype, "listener", {
              /**
               * Returns the wrapped event listener.
               * @returns {EventListener<Sender, Args>}
               */
              get: function () {
                return this.eventListener;
              },
              enumerable: false,
              configurable: true,
            });
            /**
             * Fires the wrapped event listener with the given arguments.
             * @param sender
             * @param args
             */
            EventListenerWrapper.prototype.fire = function (sender, args) {
              this.eventListener(sender, args);
            };
            /**
             * Checks if this listener is scheduled to be called only once.
             * @returns {boolean} once if true
             */
            EventListenerWrapper.prototype.isOnce = function () {
              return this.once;
            };
            EventListenerWrapper.prototype.clear = function () {};
            return EventListenerWrapper;
          })();
          /**
           * Extends the basic {@link EventListenerWrapper} with rate-limiting functionality.
           */
          var RateLimitedEventListenerWrapper = /** @class */ (function (
            _super
          ) {
            __extends(RateLimitedEventListenerWrapper, _super);
            function RateLimitedEventListenerWrapper(listener, rateMs) {
              var _this = _super.call(this, listener) || this;
              _this.rateMs = rateMs;
              // starting limiting the events to the given value
              var startRateLimiting = function () {
                _this.rateLimitTimout.start();
              };
              // timout for limiting the events
              _this.rateLimitTimout = new timeout_1.Timeout(
                _this.rateMs,
                function () {
                  if (_this.lastSeenEvent) {
                    _this.fireSuper(
                      _this.lastSeenEvent.sender,
                      _this.lastSeenEvent.args
                    );
                    startRateLimiting(); // start rateLimiting again to keep rate limit active even after firing the last seen event
                    _this.lastSeenEvent = null;
                  }
                }
              );
              // In case the events stopping during the rateLimiting we need to track the last seen one and delegate after the
              // rate limiting is finished. This prevents missing the last update due to the rate limit.
              _this.rateLimitingEventListener = function (sender, args) {
                // only fire events if the rateLimiting is not running
                if (_this.shouldFireEvent()) {
                  _this.fireSuper(sender, args);
                  startRateLimiting();
                  return;
                }
                _this.lastSeenEvent = {
                  sender: sender,
                  args: args,
                };
              };
              return _this;
            }
            RateLimitedEventListenerWrapper.prototype.shouldFireEvent =
              function () {
                return !this.rateLimitTimout.isActive();
              };
            RateLimitedEventListenerWrapper.prototype.fireSuper = function (
              sender,
              args
            ) {
              // Fire the actual external event listener
              _super.prototype.fire.call(this, sender, args);
            };
            RateLimitedEventListenerWrapper.prototype.fire = function (
              sender,
              args
            ) {
              // Fire the internal rate-limiting listener instead of the external event listener
              this.rateLimitingEventListener(sender, args);
            };
            RateLimitedEventListenerWrapper.prototype.clear = function () {
              _super.prototype.clear.call(this);
              this.rateLimitTimout.clear();
            };
            return RateLimitedEventListenerWrapper;
          })(EventListenerWrapper);
        },
        { "./arrayutils": 1, "./timeout": 114 },
      ],
      89: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.FocusVisibilityTracker = void 0;
          var FocusVisibleCssClassName = "bmpui-focus-visible";
          var FocusVisibilityTracker = /** @class */ (function () {
            function FocusVisibilityTracker(bitmovinUiPrefix) {
              var _this = this;
              this.bitmovinUiPrefix = bitmovinUiPrefix;
              this.lastInteractionWasKeyboard = true;
              this.onKeyDown = function (e) {
                if (e.metaKey || e.altKey || e.ctrlKey) {
                  return;
                }
                _this.lastInteractionWasKeyboard = true;
              };
              this.onMouseOrPointerOrTouch = function () {
                return (_this.lastInteractionWasKeyboard = false);
              };
              this.onFocus = function (_a) {
                var element = _a.target;
                if (
                  _this.lastInteractionWasKeyboard &&
                  isHtmlElement(element) &&
                  isBitmovinUi(element, _this.bitmovinUiPrefix) &&
                  !element.classList.contains(FocusVisibleCssClassName)
                ) {
                  element.classList.add(FocusVisibleCssClassName);
                }
              };
              this.onBlur = function (_a) {
                var element = _a.target;
                if (isHtmlElement(element)) {
                  element.classList.remove(FocusVisibleCssClassName);
                }
              };
              this.eventHandlerMap = {
                mousedown: this.onMouseOrPointerOrTouch,
                pointerdown: this.onMouseOrPointerOrTouch,
                touchstart: this.onMouseOrPointerOrTouch,
                keydown: this.onKeyDown,
                focus: this.onFocus,
                blur: this.onBlur,
              };
              this.registerEventListeners();
            }
            FocusVisibilityTracker.prototype.registerEventListeners =
              function () {
                for (var event_1 in this.eventHandlerMap) {
                  document.addEventListener(
                    event_1,
                    this.eventHandlerMap[event_1],
                    true
                  );
                }
              };
            FocusVisibilityTracker.prototype.unregisterEventListeners =
              function () {
                for (var event_2 in this.eventHandlerMap) {
                  document.removeEventListener(
                    event_2,
                    this.eventHandlerMap[event_2],
                    true
                  );
                }
              };
            FocusVisibilityTracker.prototype.release = function () {
              this.unregisterEventListeners();
            };
            return FocusVisibilityTracker;
          })();
          exports.FocusVisibilityTracker = FocusVisibilityTracker;
          function isBitmovinUi(element, bitmovinUiPrefix) {
            return element.id.indexOf(bitmovinUiPrefix) === 0;
          }
          function isHtmlElement(element) {
            return (
              element instanceof HTMLElement &&
              element.classList instanceof DOMTokenList
            );
          }
        },
        {},
      ],
      90: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.GroupPlaybackSuspensionReason = void 0;
          /**
   * The Group Playback API offers control over synchronized playback of a group of clients, e.g. for Apple SharePlay
   * sessions.
  
   * Note: The API currently only covers the immediate needs of the iOS SDK in combination with our UI which is regarding
   * temporarily suspending synchronization of the player from the group. But it is open to be extended as needed in the
   * future.
   */
          /**
           * Reason for suspending the synchronization with the group.
           */
          var GroupPlaybackSuspensionReason;
          (function (GroupPlaybackSuspensionReason) {
            GroupPlaybackSuspensionReason["UserIsScrubbing"] =
              "userIsScrubbing";
          })(
            (GroupPlaybackSuspensionReason =
              exports.GroupPlaybackSuspensionReason ||
              (exports.GroupPlaybackSuspensionReason = {}))
          );
        },
        {},
      ],
      91: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.Guid = void 0;
          var Guid;
          (function (Guid) {
            var guid = 1;
            function next() {
              return guid++;
            }
            Guid.next = next;
          })((Guid = exports.Guid || (exports.Guid = {})));
        },
        {},
      ],
      92: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.ImageLoader = void 0;
          var dom_1 = require("./dom");
          /**
           * Tracks the loading state of images.
           */
          var ImageLoader = /** @class */ (function () {
            function ImageLoader() {
              this.state = {};
            }
            /**
             * Loads an image and call the callback once the image is loaded. If the image is already loaded, the callback
             * is called immediately, else it is called once loading has finished. Calling this method multiple times for the
             * same image while it is loading calls only let callback passed into the last call.
             * @param url The url to the image to load
             * @param loadedCallback The callback that is called when the image is loaded
             */
            ImageLoader.prototype.load = function (url, loadedCallback) {
              var _this = this;
              if (!this.state[url]) {
                // When the image was never attempted to be loaded before, we create a state and store it in the state map
                // for later use when the same image is requested to be loaded again.
                var state_1 = {
                  url: url,
                  image: new dom_1.DOM("img", {}),
                  loadedCallback: loadedCallback,
                  loaded: false,
                  width: 0,
                  height: 0,
                };
                this.state[url] = state_1;
                // Listen to the load event, update the state and call the callback once the image is loaded
                state_1.image.on("load", function (e) {
                  state_1.loaded = true;
                  state_1.width = state_1.image.get(0).width;
                  state_1.height = state_1.image.get(0).height;
                  _this.callLoadedCallback(state_1);
                });
                // Set the image URL to start the loading
                state_1.image.attr("src", state_1.url);
              } else {
                // We have a state for the requested image, so it is either already loaded or currently loading
                var state = this.state[url];
                // We overwrite the callback to make sure that only the callback of the latest call gets executed.
                // Earlier callbacks become invalid once a new load call arrives, and they are not called as long as the image
                // is not loaded.
                state.loadedCallback = loadedCallback;
                // When the image is already loaded, we directly execute the callback instead of waiting for the load event
                if (state.loaded) {
                  this.callLoadedCallback(state);
                }
              }
            };
            ImageLoader.prototype.callLoadedCallback = function (state) {
              state.loadedCallback(state.url, state.width, state.height);
            };
            return ImageLoader;
          })();
          exports.ImageLoader = ImageLoader;
        },
        { "./dom": 86 },
      ],
      93: [
        function (require, module, exports) {
          "use strict";
          var __assign =
            (this && this.__assign) ||
            function () {
              __assign =
                Object.assign ||
                function (t) {
                  for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s)
                      if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                  }
                  return t;
                };
              return __assign.apply(this, arguments);
            };
          var __importDefault =
            (this && this.__importDefault) ||
            function (mod) {
              return mod && mod.__esModule ? mod : { default: mod };
            };
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.i18n = exports.defaultVocabularies = void 0;
          var de_json_1 = __importDefault(require("./languages/de.json"));
          var en_json_1 = __importDefault(require("./languages/en.json"));
          var es_json_1 = __importDefault(require("./languages/es.json"));
          exports.defaultVocabularies = {
            en: en_json_1.default,
            de: de_json_1.default,
            es: es_json_1.default,
          };
          var defaultLocalizationConfig = {
            language: "en",
            vocabularies: exports.defaultVocabularies,
          };
          var I18n = /** @class */ (function () {
            function I18n(config) {
              this.setConfig(config);
            }
            I18n.prototype.setConfig = function (config) {
              var mergedConfig = __assign(
                __assign({}, defaultLocalizationConfig),
                config
              );
              var detectBrowserLanguage = mergedConfig.language === "auto";
              var vocabularies = this.mergeVocabulariesWithDefaultVocabularies(
                mergedConfig.vocabularies
              );
              this.initializeLanguage(
                mergedConfig.language,
                detectBrowserLanguage,
                vocabularies
              );
              this.initializeVocabulary(vocabularies);
            };
            I18n.containsLanguage = function (vocabularies, language) {
              return vocabularies.hasOwnProperty(language);
            };
            I18n.prototype.mergeVocabulariesWithDefaultVocabularies = function (
              vocabularies
            ) {
              if (vocabularies === void 0) {
                vocabularies = {};
              }
              var rawVocabularies = __assign(
                __assign({}, exports.defaultVocabularies),
                vocabularies
              );
              return Object.keys(rawVocabularies).reduce(function (
                mergedVocabularies,
                language
              ) {
                var _a;
                var vocabulary = rawVocabularies[language];
                if (
                  I18n.containsLanguage(
                    exports.defaultVocabularies,
                    language
                  ) &&
                  I18n.containsLanguage(vocabularies, language)
                ) {
                  vocabulary = __assign(
                    __assign({}, exports.defaultVocabularies[language]),
                    vocabularies[language]
                  );
                }
                return __assign(
                  __assign({}, mergedVocabularies),
                  ((_a = {}), (_a[language] = vocabulary), _a)
                );
              },
              {});
            };
            I18n.prototype.initializeLanguage = function (
              language,
              browserLanguageDetectionEnabled,
              vocabularies
            ) {
              if (browserLanguageDetectionEnabled) {
                var userLanguage = window.navigator.language;
                if (I18n.containsLanguage(vocabularies, userLanguage)) {
                  this.language = userLanguage;
                  return;
                }
                var shortenedUserLanguage = userLanguage.slice(0, 2);
                if (
                  I18n.containsLanguage(vocabularies, shortenedUserLanguage)
                ) {
                  this.language = shortenedUserLanguage;
                  return;
                }
              }
              this.language = language;
            };
            I18n.prototype.initializeVocabulary = function (vocabularies) {
              this.vocabulary = ["en", this.language].reduce(function (
                vocab,
                lang
              ) {
                return __assign(__assign({}, vocab), vocabularies[lang] || {});
              },
              {});
            };
            I18n.prototype.replaceVariableWithPlaceholderIfExists = function (
              text,
              config
            ) {
              var matches = text.match(new RegExp("{[a-zA-Z0-9]+}", "g"));
              if (matches.length === 0) {
                return text;
              }
              return matches
                .map(function (m) {
                  return { match: m, key: m.slice(1, -1) };
                })
                .reduce(function (str, _a) {
                  var key = _a.key,
                    match = _a.match;
                  return config.hasOwnProperty(key)
                    ? str.replace(match, config[key])
                    : str;
                }, text);
            };
            I18n.prototype.getLocalizer = function (key, config) {
              var _this = this;
              return function () {
                if (key == null) {
                  // because sometimes we call toDomElement() without configuring the component or setting text...
                  return undefined;
                }
                var vocabularyString = _this.vocabulary[key];
                if (vocabularyString == null) {
                  vocabularyString = key;
                }
                if (config != null) {
                  vocabularyString =
                    _this.replaceVariableWithPlaceholderIfExists(
                      vocabularyString,
                      config
                    );
                }
                return vocabularyString;
              };
            };
            I18n.prototype.performLocalization = function (text) {
              return typeof text === "function" ? text() : text;
            };
            return I18n;
          })();
          exports.i18n = new I18n(defaultLocalizationConfig);
        },
        {
          "./languages/de.json": 94,
          "./languages/en.json": 95,
          "./languages/es.json": 96,
        },
      ],
      94: [
        function (require, module, exports) {
          module.exports = {
            "settings.video.quality": "VideoqualitÃ¤t",
            "settings.audio.quality": "AudioqualitÃ¤t",
            "settings.audio.track": "Audiospur",
            speed: "Geschwindigkeit",
            play: "Abspielen",
            pause: "Pause",
            playPause: "Abspielen/Pause",
            open: "Ã¶ffnen",
            close: "SchlieÃŸen",
            "settings.audio.mute": "Stummschaltung",
            "settings.audio.volume": "LautstÃ¤rke",
            pictureInPicture: "Bild im Bild",
            appleAirplay: "Apple AirPlay",
            googleCast: "Google Cast",
            vr: "VR",
            settings: "Einstellungen",
            fullscreen: "Vollbild",
            off: "aus",
            "settings.subtitles": "Untertitel",
            "settings.subtitles.font.size": "GrÃ¶ÃŸe",
            "settings.subtitles.font.family": "Schriftart",
            "settings.subtitles.font.color": "Farbe",
            "settings.subtitles.font.opacity": "Deckkraft",
            "settings.subtitles.characterEdge": "RÃ¤nder",
            "settings.subtitles.background.color": "Hintergrundfarbe",
            "settings.subtitles.background.opacity": "Hintergrunddeckkraft",
            "settings.subtitles.window.color": "Hintergrundfarbe",
            "settings.subtitles.window.opacity": "Hintergrunddeckkraft",
            "settings.time.hours": "Stunden",
            "settings.time.minutes": "Minuten",
            "settings.time.seconds": "Sekunden",
            back: "ZurÃ¼ck",
            reset: "ZurÃ¼cksetzen",
            replay: "Wiederholen",
            "ads.remainingTime":
              "Diese Anzeige endet in {remainingTime} Sekunden",
            default: "standard",
            "colors.white": "weiÃŸ",
            "colors.black": "schwarz",
            "colors.red": "rot",
            "colors.green": "grÃ¼n",
            "colors.blue": "blau",
            "colors.yellow": "gelb",
            "subtitle.example": "Beispiel Untertitel",
            "subtitle.select": "Untertitel auswÃ¤hlen",
            playingOn: "Spielt auf <strong>{castDeviceName}</strong>",
            connectingTo:
              "Verbindung mit <strong>{castDeviceName}</strong> wird hergestellt...",
            watermarkLink: "Link zum Homepage",
            controlBar: "Videoplayer Kontrollen",
            player: "Video player",
            seekBar: "Video-Timeline",
            "seekBar.value": "Wert",
            "seekBar.timeshift": "Timeshift",
            "seekBar.durationText": "aus",
          };
        },
        {},
      ],
      95: [
        function (require, module, exports) {
          module.exports = {
            "settings.video.quality": "Video Quality",
            "settings.audio.quality": "Audio Quality",
            "settings.audio.track": "Audio Track",
            "settings.audio.mute": "Mute",
            "settings.audio.volume": "Volume",
            "settings.subtitles.window.color": "Window color",
            "settings.subtitles.window.opacity": "Window opacity",
            "settings.subtitles": "Subtitles",
            "settings.subtitles.font.color": "Font color",
            "settings.subtitles.font.opacity": "Font opacity",
            "settings.subtitles.background.color": "Background color",
            "settings.subtitles.background.opacity": "Background opacity",
            "colors.white": "white",
            "colors.black": "black",
            "colors.red": "red",
            "colors.green": "green",
            "colors.blue": "blue",
            "colors.cyan": "cyan",
            "colors.yellow": "yellow",
            "colors.magenta": "magenta",
            percent: "{value}%",
            "settings.subtitles.font.size": "Font size",
            "settings.subtitles.characterEdge": "Character edge",
            "settings.subtitles.characterEdge.raised": "raised",
            "settings.subtitles.characterEdge.depressed": "depressed",
            "settings.subtitles.characterEdge.uniform": "uniform",
            "settings.subtitles.characterEdge.dropshadowed": "drop shadowed",
            "settings.subtitles.font.family": "Font family",
            "settings.subtitles.font.family.monospacedserif":
              "monospaced serif",
            "settings.subtitles.font.family.proportionalserif":
              "proportional serif",
            "settings.subtitles.font.family.monospacedsansserif":
              "monospaced sans serif",
            "settings.subtitles.font.family.proportionalsansserif":
              "proportional sans serif",
            "settings.subtitles.font.family.casual": "casual",
            "settings.subtitles.font.family.cursive": "cursive",
            "settings.subtitles.font.family.smallcapital": "small capital",
            "settings.time.hours": "Hours",
            "settings.time.minutes": "Minutes",
            "settings.time.seconds": "Seconds",
            "ads.remainingTime": "This ad will end in {remainingTime} seconds.",
            settings: "Settings",
            fullscreen: "Fullscreen",
            speed: "Speed",
            playPause: "Play/Pause",
            play: "Play",
            pause: "Pause",
            open: "open",
            close: "Close",
            pictureInPicture: "Picture-in-Picture",
            appleAirplay: "Apple AirPlay",
            googleCast: "Google Cast",
            vr: "VR",
            off: "off",
            auto: "auto",
            back: "Back",
            reset: "Reset",
            replay: "Replay",
            normal: "normal",
            default: "default",
            live: "Live",
            "subtitle.example": "example subtitle",
            "subtitle.select": "Select subtitle",
            playingOn: "Playing on <strong>{castDeviceName}</strong>",
            connectingTo: "Connecting to <strong>{castDeviceName}</strong>...",
            watermarkLink: "Link to Homepage",
            controlBar: "Video player controls",
            player: "Video player",
            seekBar: "Video timeline",
            "seekBar.value": "Value",
            "seekBar.timeshift": "Timeshift",
            "seekBar.durationText": "out of",
          };
        },
        {},
      ],
      96: [
        function (require, module, exports) {
          module.exports = {
            "settings.video.quality": "Calidad de Video",
            "settings.audio.quality": "Calidad de Audio",
            "settings.audio.track": "Pista de Audio",
            "settings.audio.mute": "Silencio",
            "settings.audio.volume": "Volumen",
            "settings.subtitles.window.color": "color de Ventana",
            "settings.subtitles.window.opacity": "opacidad de Ventana",
            "settings.subtitles": "SubtÃ­tulos",
            "settings.subtitles.font.color": "color de Fuente",
            "settings.subtitles.font.opacity": "opacidad de Fuente",
            "settings.subtitles.background.color": "color de Fondo",
            "settings.subtitles.background.opacity": "opacidad de Fondo",
            "colors.white": "blanco",
            "colors.black": "negro",
            "colors.red": "rojo",
            "colors.green": "verde",
            "colors.blue": "azul",
            "colors.cyan": "cian",
            "colors.yellow": "amarillo",
            "colors.magenta": "magenta",
            percent: "{value}%",
            "settings.subtitles.font.size": "tamaÃ±o de Fuente",
            "settings.subtitles.characterEdge": "borde del Caracter",
            "settings.subtitles.characterEdge.raised": "alzado",
            "settings.subtitles.characterEdge.depressed": "discreto",
            "settings.subtitles.characterEdge.uniform": "uniforme",
            "settings.subtitles.characterEdge.dropshadowed": "sombreado",
            "settings.subtitles.font.family": "tipo de Fuente",
            "settings.subtitles.font.family.monospacedserif":
              "monospaced serif",
            "settings.subtitles.font.family.proportionalserif":
              "proportional serif",
            "settings.subtitles.font.family.monospacedsansserif":
              "monospaced sans serif",
            "settings.subtitles.font.family.proportionalsansserif":
              "proportional sans serif",
            "settings.subtitles.font.family.casual": "casual",
            "settings.subtitles.font.family.cursive": "cursiva",
            "settings.subtitles.font.family.smallcapital": "small capital",
            "settings.time.hours": "Horas",
            "settings.time.minutes": "Minutos",
            "settings.time.seconds": "Segundos",
            "ads.remainingTime":
              "Este anuncio acabarÃ¡ en {remainingTime} segundos.",
            settings: "ConfiguraciÃ³n",
            fullscreen: "Pantalla Completa",
            speed: "Velocidad",
            playPause: "Reproducir/Pausa",
            play: "Reproducir",
            pause: "Pausa",
            open: "Abrir",
            close: "Cerrar",
            pictureInPicture: "Imagen en Imagen",
            appleAirplay: "Apple AirPlay",
            googleCast: "Google Cast",
            vr: "VR",
            off: "off",
            auto: "auto",
            back: "AtrÃ¡s",
            reset: "Reiniciar",
            replay: "Rebobinar",
            normal: "normal",
            default: "predeterminado",
            live: "Directo",
            "subtitle.example": "Ejemplo de SubtÃ­tulo",
            "subtitle.select": "Seleccionar subtÃ­tulo",
            playingOn: "Reproduciendo en <strong>{castDeviceName}</strong>",
            connectingTo: "Conectando a <strong>{castDeviceName}</strong>...",
            watermarkLink: "Enlace al inicio",
            controlBar: "Controles del Reproductor",
            player: "Reproductor de Video",
            seekBar: "LÃ­nea de Tiempo",
            "seekBar.value": "posiciÃ³n",
            "seekBar.timeshift": "cambio de posiciÃ³n",
            "seekBar.durationText": "de",
          };
        },
        {},
      ],
      97: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.ClickOverlay =
            exports.VolumeControlButton =
            exports.TitleBar =
            exports.SubtitleSelectBox =
            exports.SubtitleOverlay =
            exports.SeekBarLabel =
            exports.ErrorMessageOverlay =
            exports.Component =
            exports.CastToggleButton =
            exports.CastStatusOverlay =
            exports.AudioTrackSelectBox =
            exports.AudioQualitySelectBox =
            exports.Label =
            exports.Container =
            exports.UIContainer =
            exports.Watermark =
            exports.VRToggleButton =
            exports.VolumeToggleButton =
            exports.VideoQualitySelectBox =
            exports.ToggleButton =
            exports.SettingsToggleButton =
            exports.SettingsPanel =
            exports.ItemSelectionList =
            exports.SelectBox =
            exports.SeekBar =
            exports.PlaybackToggleButton =
            exports.PlaybackTimeLabelMode =
            exports.HugePlaybackToggleButton =
            exports.FullscreenToggleButton =
            exports.ControlBar =
            exports.Button =
            exports.ListOrientation =
            exports.ListNavigationGroup =
            exports.RootNavigationGroup =
            exports.NavigationGroup =
            exports.SpatialNavigation =
            exports.i18n =
            exports.ErrorUtils =
            exports.StorageUtils =
            exports.BrowserUtils =
            exports.UIUtils =
            exports.PlayerUtils =
            exports.StringUtils =
            exports.ArrayUtils =
            exports.UIFactoryCustom =
            exports.DemoFactory =
            exports.UIFactory =
            exports.UIInstanceManager =
            exports.UIManager =
            exports.version =
              void 0;
          exports.PlaybackTimeLabel =
            exports.RecommendationOverlay =
            exports.ControlsOverlay =
            exports.AdSkipButton =
            exports.AdCounter =
            exports.ReplayButton =
            exports.SettingsPanelItem =
            exports.SubtitleSettingsPanelPage =
            exports.SettingsPanelPageOpenButton =
            exports.SettingsPanelPageBackButton =
            exports.SettingsPanelPage =
            exports.AudioTrackListBox =
            exports.SubtitleListBox =
            exports.ListBox =
            exports.SubtitleSettingsResetButton =
            exports.WindowOpacitySelectBox =
            exports.WindowColorSelectBox =
            exports.SubtitleSettingsLabel =
            exports.SubtitleSettingSelectBox =
            exports.FontSizeSelectBox =
            exports.FontOpacitySelectBox =
            exports.FontFamilySelectBox =
            exports.FontColorSelectBox =
            exports.CharacterEdgeSelectBox =
            exports.BackgroundOpacitySelectBox =
            exports.BackgroundColorSelectBox =
            exports.Spacer =
            exports.PictureInPictureToggleButton =
            exports.VolumeSlider =
            exports.AirPlayToggleButton =
            exports.MetadataLabelContent =
            exports.MetadataLabel =
            exports.CloseButton =
            exports.PlaybackToggleOverlay =
            exports.CastUIContainer =
            exports.BufferingOverlay =
            exports.HugeReplayButton =
            exports.PlaybackSpeedSelectBox =
            exports.AdClickOverlay =
            exports.AdMessageLabel =
              void 0;
          exports.version = "3.54.0";
          // Management
          var uimanager_1 = require("./uimanager");
          Object.defineProperty(exports, "UIManager", {
            enumerable: true,
            get: function () {
              return uimanager_1.UIManager;
            },
          });
          Object.defineProperty(exports, "UIInstanceManager", {
            enumerable: true,
            get: function () {
              return uimanager_1.UIInstanceManager;
            },
          });
          // Factories
          var uifactory_1 = require("./uifactory");
          Object.defineProperty(exports, "UIFactory", {
            enumerable: true,
            get: function () {
              return uifactory_1.UIFactory;
            },
          });
          var demofactory_1 = require("./demofactory");
          Object.defineProperty(exports, "DemoFactory", {
            enumerable: true,
            get: function () {
              return demofactory_1.DemoFactory;
            },
          });
          var uifactorycustom_1 = require("./uifactorycustom");
          Object.defineProperty(exports, "UIFactoryCustom", {
            enumerable: true,
            get: function () {
              return uifactorycustom_1.UIFactoryCustom;
            },
          });
          // Utils
          var arrayutils_1 = require("./arrayutils");
          Object.defineProperty(exports, "ArrayUtils", {
            enumerable: true,
            get: function () {
              return arrayutils_1.ArrayUtils;
            },
          });
          var stringutils_1 = require("./stringutils");
          Object.defineProperty(exports, "StringUtils", {
            enumerable: true,
            get: function () {
              return stringutils_1.StringUtils;
            },
          });
          var playerutils_1 = require("./playerutils");
          Object.defineProperty(exports, "PlayerUtils", {
            enumerable: true,
            get: function () {
              return playerutils_1.PlayerUtils;
            },
          });
          var uiutils_1 = require("./uiutils");
          Object.defineProperty(exports, "UIUtils", {
            enumerable: true,
            get: function () {
              return uiutils_1.UIUtils;
            },
          });
          var browserutils_1 = require("./browserutils");
          Object.defineProperty(exports, "BrowserUtils", {
            enumerable: true,
            get: function () {
              return browserutils_1.BrowserUtils;
            },
          });
          var storageutils_1 = require("./storageutils");
          Object.defineProperty(exports, "StorageUtils", {
            enumerable: true,
            get: function () {
              return storageutils_1.StorageUtils;
            },
          });
          var errorutils_1 = require("./errorutils");
          Object.defineProperty(exports, "ErrorUtils", {
            enumerable: true,
            get: function () {
              return errorutils_1.ErrorUtils;
            },
          });
          // Localization
          var i18n_1 = require("./localization/i18n");
          Object.defineProperty(exports, "i18n", {
            enumerable: true,
            get: function () {
              return i18n_1.i18n;
            },
          });
          // Spatial Navigation
          var spatialnavigation_1 = require("./spatialnavigation/spatialnavigation");
          Object.defineProperty(exports, "SpatialNavigation", {
            enumerable: true,
            get: function () {
              return spatialnavigation_1.SpatialNavigation;
            },
          });
          var navigationgroup_1 = require("./spatialnavigation/navigationgroup");
          Object.defineProperty(exports, "NavigationGroup", {
            enumerable: true,
            get: function () {
              return navigationgroup_1.NavigationGroup;
            },
          });
          var rootnavigationgroup_1 = require("./spatialnavigation/rootnavigationgroup");
          Object.defineProperty(exports, "RootNavigationGroup", {
            enumerable: true,
            get: function () {
              return rootnavigationgroup_1.RootNavigationGroup;
            },
          });
          var ListNavigationGroup_1 = require("./spatialnavigation/ListNavigationGroup");
          Object.defineProperty(exports, "ListNavigationGroup", {
            enumerable: true,
            get: function () {
              return ListNavigationGroup_1.ListNavigationGroup;
            },
          });
          Object.defineProperty(exports, "ListOrientation", {
            enumerable: true,
            get: function () {
              return ListNavigationGroup_1.ListOrientation;
            },
          });
          // Components
          var button_1 = require("./components/button");
          Object.defineProperty(exports, "Button", {
            enumerable: true,
            get: function () {
              return button_1.Button;
            },
          });
          var controlbar_1 = require("./components/controlbar");
          Object.defineProperty(exports, "ControlBar", {
            enumerable: true,
            get: function () {
              return controlbar_1.ControlBar;
            },
          });
          var fullscreentogglebutton_1 = require("./components/fullscreentogglebutton");
          Object.defineProperty(exports, "FullscreenToggleButton", {
            enumerable: true,
            get: function () {
              return fullscreentogglebutton_1.FullscreenToggleButton;
            },
          });
          var hugeplaybacktogglebutton_1 = require("./components/hugeplaybacktogglebutton");
          Object.defineProperty(exports, "HugePlaybackToggleButton", {
            enumerable: true,
            get: function () {
              return hugeplaybacktogglebutton_1.HugePlaybackToggleButton;
            },
          });
          var playbacktimelabel_1 = require("./components/playbacktimelabel");
          Object.defineProperty(exports, "PlaybackTimeLabelMode", {
            enumerable: true,
            get: function () {
              return playbacktimelabel_1.PlaybackTimeLabelMode;
            },
          });
          var playbacktogglebutton_1 = require("./components/playbacktogglebutton");
          Object.defineProperty(exports, "PlaybackToggleButton", {
            enumerable: true,
            get: function () {
              return playbacktogglebutton_1.PlaybackToggleButton;
            },
          });
          var seekbar_1 = require("./components/seekbar");
          Object.defineProperty(exports, "SeekBar", {
            enumerable: true,
            get: function () {
              return seekbar_1.SeekBar;
            },
          });
          var selectbox_1 = require("./components/selectbox");
          Object.defineProperty(exports, "SelectBox", {
            enumerable: true,
            get: function () {
              return selectbox_1.SelectBox;
            },
          });
          var itemselectionlist_1 = require("./components/itemselectionlist");
          Object.defineProperty(exports, "ItemSelectionList", {
            enumerable: true,
            get: function () {
              return itemselectionlist_1.ItemSelectionList;
            },
          });
          var settingspanel_1 = require("./components/settingspanel");
          Object.defineProperty(exports, "SettingsPanel", {
            enumerable: true,
            get: function () {
              return settingspanel_1.SettingsPanel;
            },
          });
          var settingstogglebutton_1 = require("./components/settingstogglebutton");
          Object.defineProperty(exports, "SettingsToggleButton", {
            enumerable: true,
            get: function () {
              return settingstogglebutton_1.SettingsToggleButton;
            },
          });
          var togglebutton_1 = require("./components/togglebutton");
          Object.defineProperty(exports, "ToggleButton", {
            enumerable: true,
            get: function () {
              return togglebutton_1.ToggleButton;
            },
          });
          var videoqualityselectbox_1 = require("./components/videoqualityselectbox");
          Object.defineProperty(exports, "VideoQualitySelectBox", {
            enumerable: true,
            get: function () {
              return videoqualityselectbox_1.VideoQualitySelectBox;
            },
          });
          var volumetogglebutton_1 = require("./components/volumetogglebutton");
          Object.defineProperty(exports, "VolumeToggleButton", {
            enumerable: true,
            get: function () {
              return volumetogglebutton_1.VolumeToggleButton;
            },
          });
          var vrtogglebutton_1 = require("./components/vrtogglebutton");
          Object.defineProperty(exports, "VRToggleButton", {
            enumerable: true,
            get: function () {
              return vrtogglebutton_1.VRToggleButton;
            },
          });
          var watermark_1 = require("./components/watermark");
          Object.defineProperty(exports, "Watermark", {
            enumerable: true,
            get: function () {
              return watermark_1.Watermark;
            },
          });
          var uicontainer_1 = require("./components/uicontainer");
          Object.defineProperty(exports, "UIContainer", {
            enumerable: true,
            get: function () {
              return uicontainer_1.UIContainer;
            },
          });
          var container_1 = require("./components/container");
          Object.defineProperty(exports, "Container", {
            enumerable: true,
            get: function () {
              return container_1.Container;
            },
          });
          var label_1 = require("./components/label");
          Object.defineProperty(exports, "Label", {
            enumerable: true,
            get: function () {
              return label_1.Label;
            },
          });
          var audioqualityselectbox_1 = require("./components/audioqualityselectbox");
          Object.defineProperty(exports, "AudioQualitySelectBox", {
            enumerable: true,
            get: function () {
              return audioqualityselectbox_1.AudioQualitySelectBox;
            },
          });
          var audiotrackselectbox_1 = require("./components/audiotrackselectbox");
          Object.defineProperty(exports, "AudioTrackSelectBox", {
            enumerable: true,
            get: function () {
              return audiotrackselectbox_1.AudioTrackSelectBox;
            },
          });
          var caststatusoverlay_1 = require("./components/caststatusoverlay");
          Object.defineProperty(exports, "CastStatusOverlay", {
            enumerable: true,
            get: function () {
              return caststatusoverlay_1.CastStatusOverlay;
            },
          });
          var casttogglebutton_1 = require("./components/casttogglebutton");
          Object.defineProperty(exports, "CastToggleButton", {
            enumerable: true,
            get: function () {
              return casttogglebutton_1.CastToggleButton;
            },
          });
          var component_1 = require("./components/component");
          Object.defineProperty(exports, "Component", {
            enumerable: true,
            get: function () {
              return component_1.Component;
            },
          });
          var errormessageoverlay_1 = require("./components/errormessageoverlay");
          Object.defineProperty(exports, "ErrorMessageOverlay", {
            enumerable: true,
            get: function () {
              return errormessageoverlay_1.ErrorMessageOverlay;
            },
          });
          // export { RecommendationOverlay } from './components/recommendationoverlay';
          var seekbarlabel_1 = require("./components/seekbarlabel");
          Object.defineProperty(exports, "SeekBarLabel", {
            enumerable: true,
            get: function () {
              return seekbarlabel_1.SeekBarLabel;
            },
          });
          var subtitleoverlay_1 = require("./components/subtitleoverlay");
          Object.defineProperty(exports, "SubtitleOverlay", {
            enumerable: true,
            get: function () {
              return subtitleoverlay_1.SubtitleOverlay;
            },
          });
          var subtitleselectbox_1 = require("./components/subtitleselectbox");
          Object.defineProperty(exports, "SubtitleSelectBox", {
            enumerable: true,
            get: function () {
              return subtitleselectbox_1.SubtitleSelectBox;
            },
          });
          var titlebar_1 = require("./components/titlebar");
          Object.defineProperty(exports, "TitleBar", {
            enumerable: true,
            get: function () {
              return titlebar_1.TitleBar;
            },
          });
          var volumecontrolbutton_1 = require("./components/volumecontrolbutton");
          Object.defineProperty(exports, "VolumeControlButton", {
            enumerable: true,
            get: function () {
              return volumecontrolbutton_1.VolumeControlButton;
            },
          });
          var clickoverlay_1 = require("./components/clickoverlay");
          Object.defineProperty(exports, "ClickOverlay", {
            enumerable: true,
            get: function () {
              return clickoverlay_1.ClickOverlay;
            },
          });
          // export { AdSkipButton } from './components/adskipbutton';
          var admessagelabel_1 = require("./components/admessagelabel");
          Object.defineProperty(exports, "AdMessageLabel", {
            enumerable: true,
            get: function () {
              return admessagelabel_1.AdMessageLabel;
            },
          });
          var adclickoverlay_1 = require("./components/adclickoverlay");
          Object.defineProperty(exports, "AdClickOverlay", {
            enumerable: true,
            get: function () {
              return adclickoverlay_1.AdClickOverlay;
            },
          });
          var playbackspeedselectbox_1 = require("./components/playbackspeedselectbox");
          Object.defineProperty(exports, "PlaybackSpeedSelectBox", {
            enumerable: true,
            get: function () {
              return playbackspeedselectbox_1.PlaybackSpeedSelectBox;
            },
          });
          var hugereplaybutton_1 = require("./components/hugereplaybutton");
          Object.defineProperty(exports, "HugeReplayButton", {
            enumerable: true,
            get: function () {
              return hugereplaybutton_1.HugeReplayButton;
            },
          });
          var bufferingoverlay_1 = require("./components/bufferingoverlay");
          Object.defineProperty(exports, "BufferingOverlay", {
            enumerable: true,
            get: function () {
              return bufferingoverlay_1.BufferingOverlay;
            },
          });
          var castuicontainer_1 = require("./components/castuicontainer");
          Object.defineProperty(exports, "CastUIContainer", {
            enumerable: true,
            get: function () {
              return castuicontainer_1.CastUIContainer;
            },
          });
          var playbacktoggleoverlay_1 = require("./components/playbacktoggleoverlay");
          Object.defineProperty(exports, "PlaybackToggleOverlay", {
            enumerable: true,
            get: function () {
              return playbacktoggleoverlay_1.PlaybackToggleOverlay;
            },
          });
          var closebutton_1 = require("./components/closebutton");
          Object.defineProperty(exports, "CloseButton", {
            enumerable: true,
            get: function () {
              return closebutton_1.CloseButton;
            },
          });
          var metadatalabel_1 = require("./components/metadatalabel");
          Object.defineProperty(exports, "MetadataLabel", {
            enumerable: true,
            get: function () {
              return metadatalabel_1.MetadataLabel;
            },
          });
          Object.defineProperty(exports, "MetadataLabelContent", {
            enumerable: true,
            get: function () {
              return metadatalabel_1.MetadataLabelContent;
            },
          });
          var airplaytogglebutton_1 = require("./components/airplaytogglebutton");
          Object.defineProperty(exports, "AirPlayToggleButton", {
            enumerable: true,
            get: function () {
              return airplaytogglebutton_1.AirPlayToggleButton;
            },
          });
          var volumeslider_1 = require("./components/volumeslider");
          Object.defineProperty(exports, "VolumeSlider", {
            enumerable: true,
            get: function () {
              return volumeslider_1.VolumeSlider;
            },
          });
          var pictureinpicturetogglebutton_1 = require("./components/pictureinpicturetogglebutton");
          Object.defineProperty(exports, "PictureInPictureToggleButton", {
            enumerable: true,
            get: function () {
              return pictureinpicturetogglebutton_1.PictureInPictureToggleButton;
            },
          });
          var spacer_1 = require("./components/spacer");
          Object.defineProperty(exports, "Spacer", {
            enumerable: true,
            get: function () {
              return spacer_1.Spacer;
            },
          });
          var backgroundcolorselectbox_1 = require("./components/subtitlesettings/backgroundcolorselectbox");
          Object.defineProperty(exports, "BackgroundColorSelectBox", {
            enumerable: true,
            get: function () {
              return backgroundcolorselectbox_1.BackgroundColorSelectBox;
            },
          });
          var backgroundopacityselectbox_1 = require("./components/subtitlesettings/backgroundopacityselectbox");
          Object.defineProperty(exports, "BackgroundOpacitySelectBox", {
            enumerable: true,
            get: function () {
              return backgroundopacityselectbox_1.BackgroundOpacitySelectBox;
            },
          });
          var characteredgeselectbox_1 = require("./components/subtitlesettings/characteredgeselectbox");
          Object.defineProperty(exports, "CharacterEdgeSelectBox", {
            enumerable: true,
            get: function () {
              return characteredgeselectbox_1.CharacterEdgeSelectBox;
            },
          });
          var fontcolorselectbox_1 = require("./components/subtitlesettings/fontcolorselectbox");
          Object.defineProperty(exports, "FontColorSelectBox", {
            enumerable: true,
            get: function () {
              return fontcolorselectbox_1.FontColorSelectBox;
            },
          });
          var fontfamilyselectbox_1 = require("./components/subtitlesettings/fontfamilyselectbox");
          Object.defineProperty(exports, "FontFamilySelectBox", {
            enumerable: true,
            get: function () {
              return fontfamilyselectbox_1.FontFamilySelectBox;
            },
          });
          var fontopacityselectbox_1 = require("./components/subtitlesettings/fontopacityselectbox");
          Object.defineProperty(exports, "FontOpacitySelectBox", {
            enumerable: true,
            get: function () {
              return fontopacityselectbox_1.FontOpacitySelectBox;
            },
          });
          var fontsizeselectbox_1 = require("./components/subtitlesettings/fontsizeselectbox");
          Object.defineProperty(exports, "FontSizeSelectBox", {
            enumerable: true,
            get: function () {
              return fontsizeselectbox_1.FontSizeSelectBox;
            },
          });
          var subtitlesettingselectbox_1 = require("./components/subtitlesettings/subtitlesettingselectbox");
          Object.defineProperty(exports, "SubtitleSettingSelectBox", {
            enumerable: true,
            get: function () {
              return subtitlesettingselectbox_1.SubtitleSettingSelectBox;
            },
          });
          var subtitlesettingslabel_1 = require("./components/subtitlesettings/subtitlesettingslabel");
          Object.defineProperty(exports, "SubtitleSettingsLabel", {
            enumerable: true,
            get: function () {
              return subtitlesettingslabel_1.SubtitleSettingsLabel;
            },
          });
          var windowcolorselectbox_1 = require("./components/subtitlesettings/windowcolorselectbox");
          Object.defineProperty(exports, "WindowColorSelectBox", {
            enumerable: true,
            get: function () {
              return windowcolorselectbox_1.WindowColorSelectBox;
            },
          });
          var windowopacityselectbox_1 = require("./components/subtitlesettings/windowopacityselectbox");
          Object.defineProperty(exports, "WindowOpacitySelectBox", {
            enumerable: true,
            get: function () {
              return windowopacityselectbox_1.WindowOpacitySelectBox;
            },
          });
          var subtitlesettingsresetbutton_1 = require("./components/subtitlesettings/subtitlesettingsresetbutton");
          Object.defineProperty(exports, "SubtitleSettingsResetButton", {
            enumerable: true,
            get: function () {
              return subtitlesettingsresetbutton_1.SubtitleSettingsResetButton;
            },
          });
          var listbox_1 = require("./components/listbox");
          Object.defineProperty(exports, "ListBox", {
            enumerable: true,
            get: function () {
              return listbox_1.ListBox;
            },
          });
          var subtitlelistbox_1 = require("./components/subtitlelistbox");
          Object.defineProperty(exports, "SubtitleListBox", {
            enumerable: true,
            get: function () {
              return subtitlelistbox_1.SubtitleListBox;
            },
          });
          var audiotracklistbox_1 = require("./components/audiotracklistbox");
          Object.defineProperty(exports, "AudioTrackListBox", {
            enumerable: true,
            get: function () {
              return audiotracklistbox_1.AudioTrackListBox;
            },
          });
          var settingspanelpage_1 = require("./components/settingspanelpage");
          Object.defineProperty(exports, "SettingsPanelPage", {
            enumerable: true,
            get: function () {
              return settingspanelpage_1.SettingsPanelPage;
            },
          });
          var settingspanelpagebackbutton_1 = require("./components/settingspanelpagebackbutton");
          Object.defineProperty(exports, "SettingsPanelPageBackButton", {
            enumerable: true,
            get: function () {
              return settingspanelpagebackbutton_1.SettingsPanelPageBackButton;
            },
          });
          var settingspanelpageopenbutton_1 = require("./components/settingspanelpageopenbutton");
          Object.defineProperty(exports, "SettingsPanelPageOpenButton", {
            enumerable: true,
            get: function () {
              return settingspanelpageopenbutton_1.SettingsPanelPageOpenButton;
            },
          });
          var subtitlesettingspanelpage_1 = require("./components/subtitlesettings/subtitlesettingspanelpage");
          Object.defineProperty(exports, "SubtitleSettingsPanelPage", {
            enumerable: true,
            get: function () {
              return subtitlesettingspanelpage_1.SubtitleSettingsPanelPage;
            },
          });
          var settingspanelitem_1 = require("./components/settingspanelitem");
          Object.defineProperty(exports, "SettingsPanelItem", {
            enumerable: true,
            get: function () {
              return settingspanelitem_1.SettingsPanelItem;
            },
          });
          var replaybutton_1 = require("./components/replaybutton");
          Object.defineProperty(exports, "ReplayButton", {
            enumerable: true,
            get: function () {
              return replaybutton_1.ReplayButton;
            },
          });
          // Custom Components
          var adcounter_1 = require("./components/custom/adcounter");
          Object.defineProperty(exports, "AdCounter", {
            enumerable: true,
            get: function () {
              return adcounter_1.AdCounter;
            },
          });
          var adskipbutton_1 = require("./components/custom/adskipbutton");
          Object.defineProperty(exports, "AdSkipButton", {
            enumerable: true,
            get: function () {
              return adskipbutton_1.AdSkipButton;
            },
          });
          var controlsoverlay_1 = require("./components/custom/controlsoverlay");
          Object.defineProperty(exports, "ControlsOverlay", {
            enumerable: true,
            get: function () {
              return controlsoverlay_1.ControlsOverlay;
            },
          });
          var recommendationoverlaycustom_1 = require("./components/custom/recommendationoverlaycustom");
          Object.defineProperty(exports, "RecommendationOverlay", {
            enumerable: true,
            get: function () {
              return recommendationoverlaycustom_1.RecommendationOverlay;
            },
          });
          var playbacktimelabel_2 = require("./components/custom/playbacktimelabel");
          Object.defineProperty(exports, "PlaybackTimeLabel", {
            enumerable: true,
            get: function () {
              return playbacktimelabel_2.PlaybackTimeLabel;
            },
          });
          // Object.assign polyfill for ES5/IE9
          // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
          if (typeof Object.assign !== "function") {
            Object.assign = function (target) {
              "use strict";
              if (target == null) {
                throw new TypeError(
                  "Cannot convert undefined or null to object"
                );
              }
              target = Object(target);
              for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source != null) {
                  for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                      target[key] = source[key];
                    }
                  }
                }
              }
              return target;
            };
          }
        },
        {
          "./arrayutils": 1,
          "./browserutils": 3,
          "./components/adclickoverlay": 4,
          "./components/admessagelabel": 5,
          "./components/airplaytogglebutton": 7,
          "./components/audioqualityselectbox": 8,
          "./components/audiotracklistbox": 9,
          "./components/audiotrackselectbox": 10,
          "./components/bufferingoverlay": 11,
          "./components/button": 12,
          "./components/caststatusoverlay": 13,
          "./components/casttogglebutton": 14,
          "./components/castuicontainer": 15,
          "./components/clickoverlay": 16,
          "./components/closebutton": 17,
          "./components/component": 18,
          "./components/container": 19,
          "./components/controlbar": 20,
          "./components/custom/adcounter": 21,
          "./components/custom/adskipbutton": 22,
          "./components/custom/controlsoverlay": 24,
          "./components/custom/playbacktimelabel": 25,
          "./components/custom/recommendationoverlaycustom": 26,
          "./components/errormessageoverlay": 28,
          "./components/fullscreentogglebutton": 29,
          "./components/hugeplaybacktogglebutton": 30,
          "./components/hugereplaybutton": 31,
          "./components/itemselectionlist": 32,
          "./components/label": 33,
          "./components/listbox": 34,
          "./components/metadatalabel": 36,
          "./components/pictureinpicturetogglebutton": 37,
          "./components/playbackspeedselectbox": 38,
          "./components/playbacktimelabel": 39,
          "./components/playbacktogglebutton": 40,
          "./components/playbacktoggleoverlay": 41,
          "./components/replaybutton": 43,
          "./components/seekbar": 44,
          "./components/seekbarlabel": 47,
          "./components/selectbox": 48,
          "./components/settingspanel": 49,
          "./components/settingspanelitem": 50,
          "./components/settingspanelpage": 51,
          "./components/settingspanelpagebackbutton": 52,
          "./components/settingspanelpageopenbutton": 54,
          "./components/settingstogglebutton": 55,
          "./components/spacer": 56,
          "./components/subtitlelistbox": 57,
          "./components/subtitleoverlay": 58,
          "./components/subtitleselectbox": 59,
          "./components/subtitlesettings/backgroundcolorselectbox": 60,
          "./components/subtitlesettings/backgroundopacityselectbox": 61,
          "./components/subtitlesettings/characteredgeselectbox": 62,
          "./components/subtitlesettings/fontcolorselectbox": 63,
          "./components/subtitlesettings/fontfamilyselectbox": 64,
          "./components/subtitlesettings/fontopacityselectbox": 65,
          "./components/subtitlesettings/fontsizeselectbox": 66,
          "./components/subtitlesettings/subtitlesettingselectbox": 67,
          "./components/subtitlesettings/subtitlesettingslabel": 68,
          "./components/subtitlesettings/subtitlesettingspanelpage": 70,
          "./components/subtitlesettings/subtitlesettingsresetbutton": 71,
          "./components/subtitlesettings/windowcolorselectbox": 72,
          "./components/subtitlesettings/windowopacityselectbox": 73,
          "./components/titlebar": 75,
          "./components/togglebutton": 76,
          "./components/uicontainer": 78,
          "./components/videoqualityselectbox": 79,
          "./components/volumecontrolbutton": 80,
          "./components/volumeslider": 81,
          "./components/volumetogglebutton": 82,
          "./components/vrtogglebutton": 83,
          "./components/watermark": 84,
          "./demofactory": 85,
          "./errorutils": 87,
          "./localization/i18n": 93,
          "./playerutils": 99,
          "./spatialnavigation/ListNavigationGroup": 100,
          "./spatialnavigation/navigationgroup": 104,
          "./spatialnavigation/rootnavigationgroup": 106,
          "./spatialnavigation/spatialnavigation": 108,
          "./storageutils": 111,
          "./stringutils": 112,
          "./uifactory": 115,
          "./uifactorycustom": 116,
          "./uimanager": 117,
          "./uiutils": 118,
        },
      ],
      98: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.isMobileV3PlayerAPI = exports.MobileV3PlayerEvent = void 0;
          var MobileV3PlayerEvent;
          (function (MobileV3PlayerEvent) {
            MobileV3PlayerEvent["SourceError"] = "sourceerror";
            MobileV3PlayerEvent["PlayerError"] = "playererror";
            MobileV3PlayerEvent["PlaylistTransition"] = "playlisttransition";
          })(
            (MobileV3PlayerEvent =
              exports.MobileV3PlayerEvent || (exports.MobileV3PlayerEvent = {}))
          );
          function isMobileV3PlayerAPI(player) {
            for (var key in MobileV3PlayerEvent) {
              if (
                MobileV3PlayerEvent.hasOwnProperty(key) &&
                !player.exports.PlayerEvent.hasOwnProperty(key)
              ) {
                return false;
              }
            }
            return true;
          }
          exports.isMobileV3PlayerAPI = isMobileV3PlayerAPI;
        },
        {},
      ],
      99: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.PlayerUtils = void 0;
          var eventdispatcher_1 = require("./eventdispatcher");
          var browserutils_1 = require("./browserutils");
          var PlayerUtils;
          (function (PlayerUtils) {
            var PlayerState;
            (function (PlayerState) {
              PlayerState[(PlayerState["Idle"] = 0)] = "Idle";
              PlayerState[(PlayerState["Prepared"] = 1)] = "Prepared";
              PlayerState[(PlayerState["Playing"] = 2)] = "Playing";
              PlayerState[(PlayerState["Paused"] = 3)] = "Paused";
              PlayerState[(PlayerState["Finished"] = 4)] = "Finished";
            })(
              (PlayerState =
                PlayerUtils.PlayerState || (PlayerUtils.PlayerState = {}))
            );
            function isTimeShiftAvailable(player) {
              return player.isLive() && player.getMaxTimeShift() !== 0;
            }
            PlayerUtils.isTimeShiftAvailable = isTimeShiftAvailable;
            function getState(player) {
              if (player.hasEnded()) {
                return PlayerState.Finished;
              } else if (player.isPlaying()) {
                return PlayerState.Playing;
              } else if (player.isPaused()) {
                return PlayerState.Paused;
              } else if (player.getSource() != null) {
                return PlayerState.Prepared;
              } else {
                return PlayerState.Idle;
              }
            }
            PlayerUtils.getState = getState;
            /**
             * Returns the currentTime - seekableRange.start. This ensures a user-friendly currentTime after a live stream
             * transitioned to VoD.
             * @param player
             */
            function getCurrentTimeRelativeToSeekableRange(player) {
              var currentTime = player.getCurrentTime();
              if (player.isLive()) {
                return currentTime;
              }
              var seekableRangeStart = PlayerUtils.getSeekableRangeStart(
                player,
                0
              );
              return currentTime - seekableRangeStart;
            }
            PlayerUtils.getCurrentTimeRelativeToSeekableRange =
              getCurrentTimeRelativeToSeekableRange;
            /**
             * Returns the start value of the seekable range or the defaultValue if no seekableRange is present.
             * For now this happens only in combination with Mobile SDKs.
             *
             * TODO: remove this function in next major release
             *
             * @param player
             * @param defaultValue
             */
            function getSeekableRangeStart(player, defaultValue) {
              if (defaultValue === void 0) {
                defaultValue = 0;
              }
              return (
                (player.getSeekableRange() &&
                  player.getSeekableRange().start) ||
                defaultValue
              );
            }
            PlayerUtils.getSeekableRangeStart = getSeekableRangeStart;
            /**
             * Calculates player seekable time range for live.
             * As the player returns `{ start: -1, end: -1 }` for live streams we need to calculate the `seekableRange` based on `maxTimeshift`.
             *
             * @param player
             */
            function getSeekableRangeRespectingLive(player) {
              if (!player.isLive()) {
                return player.getSeekableRange();
              }
              var currentTimeshift = -player.getTimeShift();
              var maxTimeshift = -player.getMaxTimeShift();
              var currentTime = player.getCurrentTime();
              var end = currentTime + currentTimeshift;
              var start = currentTime - (maxTimeshift - currentTimeshift);
              return { start: start, end: end };
            }
            PlayerUtils.getSeekableRangeRespectingLive =
              getSeekableRangeRespectingLive;
            var TimeShiftAvailabilityDetector = /** @class */ (function () {
              function TimeShiftAvailabilityDetector(player) {
                var _this = this;
                this.timeShiftAvailabilityChangedEvent =
                  new eventdispatcher_1.EventDispatcher();
                this.player = player;
                this.timeShiftAvailable = undefined;
                var timeShiftDetector = function () {
                  _this.detect();
                };
                // Try to detect timeshift availability when source is loaded, which works for DASH streams
                player.on(
                  player.exports.PlayerEvent.SourceLoaded,
                  timeShiftDetector
                );
                // With HLS/NativePlayer streams, getMaxTimeShift can be 0 before the buffer fills, so we need to additionally
                // check timeshift availability in TimeChanged
                player.on(
                  player.exports.PlayerEvent.TimeChanged,
                  timeShiftDetector
                );
              }
              TimeShiftAvailabilityDetector.prototype.detect = function () {
                if (this.player.isLive()) {
                  var timeShiftAvailableNow = PlayerUtils.isTimeShiftAvailable(
                    this.player
                  );
                  // When the availability changes, we fire the event
                  if (timeShiftAvailableNow !== this.timeShiftAvailable) {
                    this.timeShiftAvailabilityChangedEvent.dispatch(
                      this.player,
                      { timeShiftAvailable: timeShiftAvailableNow }
                    );
                    this.timeShiftAvailable = timeShiftAvailableNow;
                  }
                }
              };
              Object.defineProperty(
                TimeShiftAvailabilityDetector.prototype,
                "onTimeShiftAvailabilityChanged",
                {
                  get: function () {
                    return this.timeShiftAvailabilityChangedEvent.getEvent();
                  },
                  enumerable: false,
                  configurable: true,
                }
              );
              return TimeShiftAvailabilityDetector;
            })();
            PlayerUtils.TimeShiftAvailabilityDetector =
              TimeShiftAvailabilityDetector;
            /**
             * Detects changes of the stream type, i.e. changes of the return value of the player#isLive method.
             * Normally, a stream cannot change its type during playback, it's either VOD or live. Due to bugs on some
             * platforms or browsers, it can still change. It is therefore unreliable to just check #isLive and this detector
             * should be used as a workaround instead.
             *
             * Additionally starting with player v8.19.0 we have the use-case that a live stream changes into a vod.
             * The DurationChanged event indicates this switch.
             *
             * Known cases:
             *
             * - HLS VOD on Android 4.3
             * Video duration is initially 'Infinity' and only gets available after playback starts, so streams are wrongly
             * reported as 'live' before playback (the live-check in the player checks for infinite duration).
             *
             * @deprecated since UI v3.9.0 in combination with player v8.19.0 use PlayerEvent.DurationChanged instead
             *
             * TODO: remove this class in next major release
             */
            var LiveStreamDetector = /** @class */ (function () {
              function LiveStreamDetector(player, uimanager) {
                var _this = this;
                this.liveChangedEvent = new eventdispatcher_1.EventDispatcher();
                this.player = player;
                this.uimanager = uimanager;
                this.live = undefined;
                var liveDetector = function () {
                  _this.detect();
                };
                this.uimanager
                  .getConfig()
                  .events.onUpdated.subscribe(liveDetector);
                // Re-evaluate when playback starts
                player.on(player.exports.PlayerEvent.Play, liveDetector);
                // HLS live detection workaround for Android:
                // Also re-evaluate during playback, because that is when the live flag might change.
                // (Doing it only in Android Chrome saves unnecessary overhead on other platforms)
                if (
                  browserutils_1.BrowserUtils.isAndroid &&
                  browserutils_1.BrowserUtils.isChrome
                ) {
                  player.on(
                    player.exports.PlayerEvent.TimeChanged,
                    liveDetector
                  );
                }
                // DurationChanged event was introduced with player v8.19.0
                if (player.exports.PlayerEvent.DurationChanged) {
                  player.on(
                    player.exports.PlayerEvent.DurationChanged,
                    liveDetector
                  );
                }
                // Ad video's isLive() might be different than the actual video's isLive().
                player.on(
                  player.exports.PlayerEvent.AdBreakStarted,
                  liveDetector
                );
                player.on(
                  player.exports.PlayerEvent.AdBreakFinished,
                  liveDetector
                );
              }
              LiveStreamDetector.prototype.detect = function () {
                var liveNow = this.player.isLive();
                // Compare current to previous live state flag and fire event when it changes. Since we initialize the flag
                // with undefined, there is always at least an initial event fired that tells listeners the live state.
                if (liveNow !== this.live) {
                  this.liveChangedEvent.dispatch(this.player, {
                    live: liveNow,
                  });
                  this.live = liveNow;
                }
              };
              Object.defineProperty(
                LiveStreamDetector.prototype,
                "onLiveChanged",
                {
                  get: function () {
                    return this.liveChangedEvent.getEvent();
                  },
                  enumerable: false,
                  configurable: true,
                }
              );
              return LiveStreamDetector;
            })();
            PlayerUtils.LiveStreamDetector = LiveStreamDetector;
          })((PlayerUtils = exports.PlayerUtils || (exports.PlayerUtils = {})));
        },
        { "./browserutils": 3, "./eventdispatcher": 88 },
      ],
      100: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          var __spreadArray =
            (this && this.__spreadArray) ||
            function (to, from, pack) {
              if (pack || arguments.length === 2)
                for (var i = 0, l = from.length, ar; i < l; i++) {
                  if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                  }
                }
              return to.concat(ar || Array.prototype.slice.call(from));
            };
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.ListNavigationGroup = exports.ListOrientation = void 0;
          var navigationgroup_1 = require("./navigationgroup");
          var types_1 = require("./types");
          var ListOrientation;
          (function (ListOrientation) {
            ListOrientation["Horizontal"] = "horizontal";
            ListOrientation["Vertical"] = "vertical";
          })(
            (ListOrientation =
              exports.ListOrientation || (exports.ListOrientation = {}))
          );
          var ListNavigationGroup = /** @class */ (function (_super) {
            __extends(ListNavigationGroup, _super);
            function ListNavigationGroup(orientation, container) {
              var components = [];
              for (var _i = 2; _i < arguments.length; _i++) {
                components[_i - 2] = arguments[_i];
              }
              var _this =
                _super.apply(
                  this,
                  __spreadArray([container], components, false)
                ) || this;
              switch (orientation) {
                case ListOrientation.Vertical:
                  _this.listNavigationDirections = [
                    types_1.Direction.UP,
                    types_1.Direction.DOWN,
                  ];
                  break;
                case ListOrientation.Horizontal:
                  _this.listNavigationDirections = [
                    types_1.Direction.LEFT,
                    types_1.Direction.RIGHT,
                  ];
                  break;
              }
              return _this;
            }
            ListNavigationGroup.prototype.handleAction = function (action) {
              _super.prototype.handleAction.call(this, action);
              if (action === types_1.Action.SELECT) {
                // close the container when a list entry is selected
                this.handleAction(types_1.Action.BACK);
              }
            };
            ListNavigationGroup.prototype.handleNavigation = function (
              direction
            ) {
              _super.prototype.handleNavigation.call(this, direction);
              if (!this.listNavigationDirections.includes(direction)) {
                // close the container on navigation inputs that don't align
                // with the orientation of the list
                this.handleAction(types_1.Action.BACK);
              }
            };
            return ListNavigationGroup;
          })(navigationgroup_1.NavigationGroup);
          exports.ListNavigationGroup = ListNavigationGroup;
        },
        { "./navigationgroup": 104, "./types": 110 },
      ],
      101: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.getHtmlElementsFromComponents = void 0;
          var container_1 = require("../components/container");
          var typeguards_1 = require("./typeguards");
          /**
           * Recursively resolves a container and the components contained within them, building a flat list of components.
           *
           * @param container The container to get the contained components from
           */
          function resolveAllComponents(container) {
            var childComponents = [];
            container.getComponents().forEach(function (containerOrComponent) {
              if ((0, typeguards_1.isContainer)(containerOrComponent)) {
                childComponents.push.apply(
                  childComponents,
                  resolveAllComponents(containerOrComponent)
                );
              } else if ((0, typeguards_1.isComponent)(containerOrComponent)) {
                childComponents.push(containerOrComponent);
              }
            });
            return childComponents;
          }
          /**
           * Returns the HTML elements associated to the provided component.
           *
           * @param component The component to get the HTML elements from
           */
          function toHtmlElement(component) {
            if ((0, typeguards_1.isListBox)(component)) {
              return [].slice.call(component.getDomElement().get()[0].children);
            } else {
              return component.getDomElement().get().slice(0, 1);
            }
          }
          /**
           * Takes the provided list of components and flat-maps them to a list of their respective HTML elements. In case a
           * provided component is a container, the children of that container will be resolved recursively. Ignores components
           * that are hidden.
           *
           * @param components The components to map to HTML elements
           */
          function getHtmlElementsFromComponents(components) {
            var htmlElements = [];
            components
              .filter(function (component) {
                return !component.isHidden();
              })
              .forEach(function (component) {
                var elementsToConsider =
                  component instanceof container_1.Container
                    ? resolveAllComponents(component)
                    : [component];
                elementsToConsider.forEach(function (component) {
                  htmlElements.push.apply(
                    htmlElements,
                    toHtmlElement(component)
                  );
                });
              });
            return htmlElements;
          }
          exports.getHtmlElementsFromComponents = getHtmlElementsFromComponents;
        },
        { "../components/container": 19, "./typeguards": 109 },
      ],
      102: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.getKeyMapForPlatform = void 0;
          var types_1 = require("./types");
          var browserutils_1 = require("../browserutils");
          var TizenKeyMap = {
            isApplicable: function () {
              return browserutils_1.BrowserUtils.isTizen;
            },
            keyCodes: {
              // D-pad Up
              38: types_1.Direction.UP,
              // D-pad Down
              40: types_1.Direction.DOWN,
              // D-pad Left
              37: types_1.Direction.LEFT,
              // D-pad Right
              39: types_1.Direction.RIGHT,
              // D-pad OK
              13: types_1.Action.SELECT,
              // Back
              10009: types_1.Action.BACK,
            },
          };
          var WebOsKeyMap = {
            isApplicable: function () {
              return browserutils_1.BrowserUtils.isWebOs;
            },
            keyCodes: {
              // D-pad Up
              38: types_1.Direction.UP,
              // D-pad Down
              40: types_1.Direction.DOWN,
              // D-pad Left
              37: types_1.Direction.LEFT,
              // D-pad Right
              39: types_1.Direction.RIGHT,
              // D-pad OK
              13: types_1.Action.SELECT,
              // Back
              461: types_1.Action.BACK,
            },
          };
          var PlayStationKeyMap = {
            isApplicable: function () {
              return browserutils_1.BrowserUtils.isPlayStation;
            },
            keyCodes: {
              // D-pad Up
              38: types_1.Direction.UP,
              // D-pad Down
              40: types_1.Direction.DOWN,
              // D-pad Left
              37: types_1.Direction.LEFT,
              // D-pad Right
              39: types_1.Direction.RIGHT,
              // Cross
              13: types_1.Action.SELECT,
              // Circle
              27: types_1.Action.BACK,
            },
          };
          var AndroidKeyMap = {
            isApplicable: function () {
              return browserutils_1.BrowserUtils.isAndroid;
            },
            keyCodes: {
              // D-pad Up
              19: types_1.Direction.UP,
              // D-pad Down
              20: types_1.Direction.DOWN,
              // D-pad Left
              21: types_1.Direction.LEFT,
              // D-pad Right
              22: types_1.Direction.RIGHT,
              // D-pad Center
              23: types_1.Action.SELECT,
              // Enter
              66: types_1.Action.SELECT,
              // Back
              4: types_1.Action.BACK,
            },
          };
          var HisenseKeyMap = {
            isApplicable: function () {
              return browserutils_1.BrowserUtils.isHisense;
            },
            keyCodes: {
              // D-pad Up
              38: types_1.Direction.UP,
              // D-pad Down
              40: types_1.Direction.DOWN,
              // D-pad Left
              37: types_1.Direction.LEFT,
              // D-pad Right
              39: types_1.Direction.RIGHT,
              // OK
              13: types_1.Action.SELECT,
              // Back
              8: types_1.Action.BACK,
            },
          };
          // Default key map used on desktops
          var DefaultKeyMap = {
            // Arrow Up
            38: types_1.Direction.UP,
            // Arrow Down
            40: types_1.Direction.DOWN,
            // Arrow Left
            37: types_1.Direction.LEFT,
            // Arrow Right
            39: types_1.Direction.RIGHT,
            // Enter
            13: types_1.Action.SELECT,
            // Escape
            27: types_1.Action.BACK,
          };
          /**
           * Returns the matching key map for the current platform.
           */
          function getKeyMapForPlatform() {
            var applicableKeyMap = [
              WebOsKeyMap,
              TizenKeyMap,
              PlayStationKeyMap,
              HisenseKeyMap,
              AndroidKeyMap,
            ].find(function (keyMap) {
              return keyMap.isApplicable();
            });
            if (applicableKeyMap) {
              return applicableKeyMap.keyCodes;
            } else {
              return DefaultKeyMap;
            }
          }
          exports.getKeyMapForPlatform = getKeyMapForPlatform;
        },
        { "../browserutils": 3, "./types": 110 },
      ],
      103: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.getBoundingRectFromElement = exports.getElementInDirection =
            void 0;
          var types_1 = require("./types");
          /**
           * Calculates the length of a vector.
           *
           * @param vector The vector to calculate the length of
           */
          function length(vector) {
            return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
          }
          /**
           * Normalizes the given vector.
           *
           * @param vector The vector to normalize
           */
          function normalize(vector) {
            var len = length(vector);
            return {
              x: vector.x / len,
              y: vector.y / len,
            };
          }
          /**
           * Calculates the dot product between 2 vectors.
           *
           * @param a The first vector
           * @param b The second vector
           */
          function dotProduct(a, b) {
            return a.x * b.x + a.y * b.y;
          }
          /**
           * Calculates the distance between the 2 points pointed to by the provided vectors.
           *
           * @param a The first vector
           * @param b The second vector
           */
          function distance(a, b) {
            return length({
              x: b.x - a.x,
              y: b.y - a.y,
            });
          }
          /**
           * Returns a vector that corresponds to the center of the provided element.
           *
           * @param element The element to get the center of
           */
          function getElementVector(element) {
            var boundingRect = getBoundingRectFromElement(element);
            return {
              x: boundingRect.x + boundingRect.width / 2,
              y: boundingRect.y + boundingRect.height / 2,
            };
          }
          /**
           * Returns the angle in degrees between the unit vector pointing in the given {Direction} and the unit vector that
           * points from the current element to another element.
           *
           * @param a The vector of the current element
           * @param b The vector of the other element
           * @param direction The direction to move along
           */
          function calculateAngle(a, b, direction) {
            var directionVector = {
              x:
                direction === types_1.Direction.LEFT
                  ? -1
                  : direction === types_1.Direction.RIGHT
                  ? 1
                  : 0,
              y:
                direction === types_1.Direction.UP
                  ? -1
                  : direction === types_1.Direction.DOWN
                  ? 1
                  : 0,
            };
            var elementVector = normalize({
              x: b.x - a.x,
              y: b.y - a.y,
            });
            var angleCos =
              dotProduct(directionVector, elementVector) /
              (length(directionVector) * length(elementVector));
            return (Math.acos(angleCos) * 180) / Math.PI;
          }
          /**
           * Returns the closest element to the current element when trying to navigate in the provided direction. Returns
           * undefined, if there is not element in the given direction.
           *
           * @param activeElement The currently selected element
           * @param elements The list of all elements that can be navigated to
           * @param direction The direction in which to navigate
           */
          function getElementInDirection(activeElement, elements, direction) {
            var _a;
            if (!activeElement) return undefined;
            var cutoffAngle = 45;
            var activeElemVector = getElementVector(activeElement);
            return (_a = elements
              // don't take the current element into account
              .filter(function (elem) {
                return elem !== activeElement;
              })
              // get the angle between, and distance to any other element from the current element
              .map(function (element) {
                var elementVector = getElementVector(element);
                var dist = distance(activeElemVector, elementVector);
                var angle = calculateAngle(
                  activeElemVector,
                  elementVector,
                  direction
                );
                return { angle: angle, dist: dist, element: element };
              })
              // filter out any elements that don't align with the direction we're trying to move in
              .filter(function (_a) {
                var angle = _a.angle;
                return angle <= cutoffAngle;
              })
              // sort the resulting elements based on their distance to the current element in ascending order
              .sort(function (_a, _b) {
                var angleA = _a.angle,
                  distA = _a.dist;
                var angleB = _b.angle,
                  distB = _b.dist;
                return angleA - angleB + (distA - distB);
              })
              // return the element closest to the current element
              .shift()) === null || _a === void 0
              ? void 0
              : _a.element;
          }
          exports.getElementInDirection = getElementInDirection;
          /**
           * Returns DOMRect like object containing horizontal X and vertical Y coordinates from and HTMLElement.
           * Handles use-cases for getBoundingClientRect when the return type can be either
           * a ClientRect or DOMRect object type.
           *
           * @param element The currently selected element
           */
          function getBoundingRectFromElement(element) {
            var boundingRect = element.getBoundingClientRect();
            if (
              typeof boundingRect.x !== "number" &&
              typeof boundingRect.y !== "number"
            ) {
              boundingRect.x = boundingRect.left;
              boundingRect.y = boundingRect.top;
            }
            return boundingRect;
          }
          exports.getBoundingRectFromElement = getBoundingRectFromElement;
        },
        { "./types": 110 },
      ],
      104: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.NavigationGroup = void 0;
          var navigationalgorithm_1 = require("./navigationalgorithm");
          var gethtmlelementsfromcomponents_1 = require("./gethtmlelementsfromcomponents");
          var nodeeventsubscriber_1 = require("./nodeeventsubscriber");
          var typeguards_1 = require("./typeguards");
          var types_1 = require("./types");
          /**
           * Used as part of spatial navigation. Groups together different components to which you can navigate to, in a single
           * navigation group.
           *
           * Responsible for finding elements in direction on navigation and for tracking active element inside the group.
           * Triggers blur and focus on element when active element is changed, as well as click on element on `Action.SELECT`.
           * Will call `hideUi()` on passed in container if `Action.BACK` is called.
           */
          var NavigationGroup = /** @class */ (function () {
            function NavigationGroup(container) {
              var components = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                components[_i - 1] = arguments[_i];
              }
              this.container = container;
              this.removeElementHoverEventListeners = function () {};
              this.components = components;
              this.eventSubscriber =
                new nodeeventsubscriber_1.NodeEventSubscriber();
            }
            /**
             * Returns the active HTMLElement.
             */
            NavigationGroup.prototype.getActiveElement = function () {
              return this.activeElement;
            };
            NavigationGroup.prototype.focusElement = function (element) {
              this.blurActiveElement();
              this.activeElement = element;
              this.activeElement.focus();
            };
            NavigationGroup.prototype.blurActiveElement = function () {
              var _a;
              (_a = this.activeElement) === null || _a === void 0
                ? void 0
                : _a.blur();
            };
            NavigationGroup.prototype.focusFirstElement = function () {
              var element = (0,
              gethtmlelementsfromcomponents_1.getHtmlElementsFromComponents)(
                this.components
              )[0];
              if (element) {
                this.focusElement(element);
              }
            };
            NavigationGroup.prototype.defaultNavigationHandler = function (
              direction
            ) {
              var targetElement = (0,
              navigationalgorithm_1.getElementInDirection)(
                this.activeElement,
                (0,
                gethtmlelementsfromcomponents_1.getHtmlElementsFromComponents)(
                  this.components
                ),
                direction
              );
              if (targetElement) {
                this.focusElement(targetElement);
              }
            };
            NavigationGroup.prototype.defaultActionHandler = function (action) {
              switch (action) {
                case types_1.Action.SELECT:
                  this.activeElement.click();
                  break;
                case types_1.Action.BACK:
                  this.container.hide();
                  break;
              }
            };
            NavigationGroup.prototype.handleInput = function (
              data,
              defaultHandler,
              userHandler
            ) {
              var handleDefault = true;
              var preventDefault = function () {
                return (handleDefault = false);
              };
              userHandler === null || userHandler === void 0
                ? void 0
                : userHandler(data, this.activeElement, preventDefault);
              if (handleDefault) {
                defaultHandler.call(this, data);
              }
            };
            /**
             * Handles a navigation event.
             *
             * @param direction The direction of the navigation event
             */
            NavigationGroup.prototype.handleNavigation = function (direction) {
              if (!this.activeElement) {
                // If we do not have an active element, the active element has been disabled by a mouseleave
                // event. We should continue the navigation at the exact place where we left off.
                if (this.activeElementBeforeDisable) {
                  this.focusElement(this.activeElementBeforeDisable);
                } else {
                  this.focusFirstElement();
                }
                return;
              }
              this.handleInput(
                direction,
                this.defaultNavigationHandler,
                this.onNavigation
              );
            };
            /**
             * Handles an action event.
             *
             * @param action The action of the event
             */
            NavigationGroup.prototype.handleAction = function (action) {
              this.handleInput(
                action,
                this.defaultActionHandler,
                this.onAction
              );
            };
            /**
             * Disable navigation group
             *
             * Call blur on active element, set as undefined, and track it as element before disable.
             */
            NavigationGroup.prototype.disable = function () {
              if (this.activeElement) {
                this.activeElementBeforeDisable = this.activeElement;
                this.blurActiveElement();
                this.activeElement = undefined;
              }
            };
            /**
             * Enable navigation group
             *
             * Sets active element to either element that was active before disable, or first element of tracked elements.
             * If it is settings panel, it will always focus first element in the list.
             */
            NavigationGroup.prototype.enable = function () {
              if (
                this.activeElementBeforeDisable &&
                !(0, typeguards_1.isSettingsPanel)(this.container)
              ) {
                this.focusElement(this.activeElementBeforeDisable);
                this.activeElementBeforeDisable = undefined;
              } else {
                this.focusFirstElement();
              }
              this.trackElementHover();
            };
            /**
             * Adds event listener for `mouseenter` on tracked elements to ensure tracking of active element will work together
             * in combination of using mouse and key events.
             */
            NavigationGroup.prototype.trackElementHover = function () {
              var _this = this;
              this.removeElementHoverEventListeners();
              var removeEventListenerFunctions = (0,
              gethtmlelementsfromcomponents_1.getHtmlElementsFromComponents)(
                this.components
              ).map(function (htmlElem) {
                var enterListener = _this.focusElement.bind(_this, htmlElem);
                var exitListener = function () {
                  return _this.disable();
                };
                _this.eventSubscriber.on(htmlElem, "mouseenter", enterListener);
                _this.eventSubscriber.on(htmlElem, "mouseleave", exitListener);
                return function () {
                  _this.eventSubscriber.off(
                    htmlElem,
                    "mouseenter",
                    enterListener
                  );
                  _this.eventSubscriber.off(
                    htmlElem,
                    "mouseleave",
                    exitListener
                  );
                };
              });
              this.removeElementHoverEventListeners = function () {
                return removeEventListenerFunctions.forEach(function (fn) {
                  return fn();
                });
              };
            };
            /**
             * Dispose of navigation group
             */
            NavigationGroup.prototype.release = function () {
              this.eventSubscriber.release();
              this.activeElement = undefined;
              this.components.splice(0, this.components.length);
              this.removeElementHoverEventListeners();
            };
            return NavigationGroup;
          })();
          exports.NavigationGroup = NavigationGroup;
        },
        {
          "./gethtmlelementsfromcomponents": 101,
          "./navigationalgorithm": 103,
          "./nodeeventsubscriber": 105,
          "./typeguards": 109,
          "./types": 110,
        },
      ],
      105: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.NodeEventSubscriber = void 0;
          /**
           * Allows to subscribe to Node events.
           */
          var NodeEventSubscriber = /** @class */ (function () {
            function NodeEventSubscriber() {
              this.attachedListeners = new Map();
            }
            NodeEventSubscriber.prototype.getEventListenersOfType = function (
              type
            ) {
              if (!this.attachedListeners.has(type)) {
                this.attachedListeners.set(type, []);
              }
              return this.attachedListeners.get(type);
            };
            /**
             * Adds the given event listener to the node.
             *
             * @param node The node to remove the event listener from
             * @param type The event to listen to
             * @param listener The listener to remove
             * @param options The event listener options
             */
            NodeEventSubscriber.prototype.on = function (
              node,
              type,
              listener,
              options
            ) {
              node.addEventListener(type, listener, options);
              this.getEventListenersOfType(type).push([
                node,
                listener,
                options,
              ]);
            };
            /**
             * Removes the given event listener from the node.
             *
             * @param node The node to attach the event listener to
             * @param type The event to listen to
             * @param listener The listener to add
             * @param options The event listener options
             */
            NodeEventSubscriber.prototype.off = function (
              node,
              type,
              listener,
              options
            ) {
              var listenersOfType = this.getEventListenersOfType(type);
              var listenerIndex = listenersOfType.findIndex(function (_a) {
                var otherNode = _a[0],
                  otherListener = _a[1],
                  otherOptions = _a[2];
                return (
                  otherNode === node &&
                  otherListener === listener &&
                  otherOptions === options
                );
              });
              node.removeEventListener(type, listener, options);
              if (listenerIndex > -1) {
                listenersOfType.splice(listenerIndex, 1);
              }
            };
            /**
             * Removes all attached event listeners.
             */
            NodeEventSubscriber.prototype.release = function () {
              var _this = this;
              this.attachedListeners.forEach(function (listenersOfType, type) {
                listenersOfType.forEach(function (_a) {
                  var element = _a[0],
                    listener = _a[1],
                    options = _a[2];
                  _this.off(element, type, listener, options);
                });
              });
              this.attachedListeners.clear();
            };
            return NodeEventSubscriber;
          })();
          exports.NodeEventSubscriber = NodeEventSubscriber;
        },
        {},
      ],
      106: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          var __spreadArray =
            (this && this.__spreadArray) ||
            function (to, from, pack) {
              if (pack || arguments.length === 2)
                for (var i = 0, l = from.length, ar; i < l; i++) {
                  if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                  }
                }
              return to.concat(ar || Array.prototype.slice.call(from));
            };
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.RootNavigationGroup = void 0;
          var navigationgroup_1 = require("./navigationgroup");
          var types_1 = require("./types");
          /**
           * Extends NavigationGroup and provides additional logic for hiding and showing the UI on the root container.
           */
          var RootNavigationGroup = /** @class */ (function (_super) {
            __extends(RootNavigationGroup, _super);
            function RootNavigationGroup(container) {
              var elements = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                elements[_i - 1] = arguments[_i];
              }
              var _this =
                _super.apply(
                  this,
                  __spreadArray([container], elements, false)
                ) || this;
              _this.container = container;
              return _this;
            }
            RootNavigationGroup.prototype.handleAction = function (action) {
              this.container.showUi();
              _super.prototype.handleAction.call(this, action);
            };
            RootNavigationGroup.prototype.handleNavigation = function (
              direction
            ) {
              this.container.showUi();
              _super.prototype.handleNavigation.call(this, direction);
            };
            RootNavigationGroup.prototype.defaultActionHandler = function (
              action
            ) {
              if (action === types_1.Action.BACK) {
                this.container.hideUi();
              } else {
                _super.prototype.defaultActionHandler.call(this, action);
              }
            };
            RootNavigationGroup.prototype.release = function () {
              _super.prototype.release.call(this);
            };
            return RootNavigationGroup;
          })(navigationgroup_1.NavigationGroup);
          exports.RootNavigationGroup = RootNavigationGroup;
        },
        { "./navigationgroup": 104, "./types": 110 },
      ],
      107: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SeekBarHandler = void 0;
          var nodeeventsubscriber_1 = require("./nodeeventsubscriber");
          var types_1 = require("./types");
          var navigationalgorithm_1 = require("./navigationalgorithm");
          var DefaultScrubSpeedPercentage = 0.005;
          var ScrubSpeedClearInterval = 100;
          var ScrubSpeedMultiplier = 1.1;
          /**
           * Handles Spatial Navigation interaction with the seek bar. Ensures, that seek operations can be executed and that the
           * scrubbing tooltip is shown as if the user scrubbed using the mouse/touchscreen.
           */
          var SeekBarHandler = /** @class */ (function () {
            function SeekBarHandler(rootNavigationGroup) {
              var _this = this;
              this.rootNavigationGroup = rootNavigationGroup;
              this.cursorPosition = { x: 0, y: 0 };
              this.isScrubbing = false;
              this.scrubSpeedPercentage = DefaultScrubSpeedPercentage;
              this.onNavigation = function (direction, target, preventDefault) {
                if (!isSeekBarWrapper(target)) {
                  return;
                }
                if (
                  direction === types_1.Direction.UP ||
                  direction === types_1.Direction.DOWN
                ) {
                  _this.stopSeeking(getSeekBar(target));
                  return;
                }
                _this.initializeOrUpdateCursorPosition(target, direction);
                _this.dispatchMouseMoveEvent(getSeekBar(target));
                preventDefault();
              };
              this.onAction = function (action, target, preventDefault) {
                if (!isSeekBarWrapper(target)) {
                  return;
                }
                var seekBar = getSeekBar(target);
                if (action === types_1.Action.SELECT && _this.isScrubbing) {
                  _this.dispatchMouseClickEvent(seekBar);
                  preventDefault();
                } else if (action === types_1.Action.BACK) {
                  _this.stopSeeking(seekBar);
                  preventDefault();
                }
              };
              this.rootNavigationGroup.onAction = this.onAction;
              this.eventSubscriber =
                new nodeeventsubscriber_1.NodeEventSubscriber();
              this.rootNavigationGroup.onNavigation = this.onNavigation;
            }
            SeekBarHandler.prototype.updateScrubSpeedPercentage = function () {
              var _this = this;
              clearTimeout(this.scrubSpeedResetTimeout);
              this.scrubSpeedPercentage *= ScrubSpeedMultiplier;
              this.scrubSpeedResetTimeout = window.setTimeout(function () {
                return (_this.scrubSpeedPercentage =
                  DefaultScrubSpeedPercentage);
              }, ScrubSpeedClearInterval);
            };
            SeekBarHandler.prototype.getIncrement = function (
              direction,
              seekBarWrapper
            ) {
              this.updateScrubSpeedPercentage();
              var seekBarWidth = seekBarWrapper.getBoundingClientRect().width;
              var increment = seekBarWidth * this.scrubSpeedPercentage;
              return direction === types_1.Direction.RIGHT
                ? increment
                : -increment;
            };
            SeekBarHandler.prototype.resetCursorPosition = function () {
              this.cursorPosition.x = 0;
              this.cursorPosition.y = 0;
            };
            SeekBarHandler.prototype.updateCursorPosition = function (
              direction,
              seekBarWrapper
            ) {
              this.cursorPosition.x += this.getIncrement(
                direction,
                seekBarWrapper
              );
            };
            SeekBarHandler.prototype.initializeCursorPosition = function (
              seekBarWrapper
            ) {
              var playbackPositionMarker =
                getPlaybackPositionMarker(seekBarWrapper);
              var rect = (0, navigationalgorithm_1.getBoundingRectFromElement)(
                playbackPositionMarker
              );
              var startX = rect.x + rect.width / 2;
              var startY = rect.y;
              this.cursorPosition.x = startX;
              this.cursorPosition.y = startY;
            };
            SeekBarHandler.prototype.initializeOrUpdateCursorPosition =
              function (seekBarWrapper, direction) {
                if (this.isScrubbing) {
                  this.updateCursorPosition(direction, seekBarWrapper);
                } else {
                  this.initializeCursorPosition(seekBarWrapper);
                }
                this.isScrubbing = true;
              };
            SeekBarHandler.prototype.getCursorPositionMouseEventInit =
              function () {
                return {
                  clientX: this.cursorPosition.x,
                  clientY: this.cursorPosition.y,
                };
              };
            SeekBarHandler.prototype.dispatchMouseMoveEvent = function (
              seekBar
            ) {
              seekBar.dispatchEvent(
                new MouseEvent(
                  "mousemove",
                  this.getCursorPositionMouseEventInit()
                )
              );
            };
            SeekBarHandler.prototype.dispatchMouseClickEvent = function (
              seekBar
            ) {
              var _this = this;
              var mouseDownHandler = function () {
                var mouseEventInit = _this.getCursorPositionMouseEventInit();
                document.dispatchEvent(
                  new MouseEvent("mouseup", mouseEventInit)
                );
                _this.eventSubscriber.off(
                  seekBar,
                  "mousedown",
                  mouseDownHandler
                );
                _this.stopSeeking(seekBar);
              };
              this.eventSubscriber.on(seekBar, "mousedown", mouseDownHandler);
              seekBar.dispatchEvent(new MouseEvent("mousedown"));
            };
            SeekBarHandler.prototype.stopSeeking = function (seekBar) {
              this.resetCursorPosition();
              this.isScrubbing = false;
              this.dispatchMouseLeaveEvent(seekBar);
            };
            SeekBarHandler.prototype.dispatchMouseLeaveEvent = function (
              seekBar
            ) {
              seekBar.dispatchEvent(new MouseEvent("mouseleave"));
            };
            /**
             * Releases the SeekBraHandler, making sure all event subscribers are removed.
             */
            SeekBarHandler.prototype.release = function () {
              this.eventSubscriber.release();
              this.rootNavigationGroup.onAction = undefined;
              this.rootNavigationGroup.onNavigation = undefined;
            };
            return SeekBarHandler;
          })();
          exports.SeekBarHandler = SeekBarHandler;
          function isSeekBarWrapper(element) {
            return (
              Array.from(element.classList).findIndex(function (className) {
                return /-ui-seekbar$/.test(className);
              }) > -1
            );
          }
          function getSeekBar(seekBarWrapper) {
            return seekBarWrapper.children.item(0);
          }
          function getPlaybackPositionMarker(seekBarWrapper) {
            return seekBarWrapper.querySelector(
              '[class*="seekbar-playbackposition-marker"]'
            );
          }
        },
        {
          "./navigationalgorithm": 103,
          "./nodeeventsubscriber": 105,
          "./types": 110,
        },
      ],
      108: [
        function (require, module, exports) {
          "use strict";
          var __spreadArray =
            (this && this.__spreadArray) ||
            function (to, from, pack) {
              if (pack || arguments.length === 2)
                for (var i = 0, l = from.length, ar; i < l; i++) {
                  if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                  }
                }
              return to.concat(ar || Array.prototype.slice.call(from));
            };
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SpatialNavigation = void 0;
          var nodeeventsubscriber_1 = require("./nodeeventsubscriber");
          var seekbarhandler_1 = require("./seekbarhandler");
          var keymap_1 = require("./keymap");
          var typeguards_1 = require("./typeguards");
          /**
           * SpatialNavigation keeps track of all navigation groups, and updates the active navigation group when visibility
           * changes on group container.
           *
           * It listens to key events, and triggers either handleNavigation or handleAction on the active group.
           * SeekBarHandler will get instantiated with root navigation group and disposed on release of the spatial navigation.
           */
          var SpatialNavigation = /** @class */ (function () {
            function SpatialNavigation(rootNavigationGroup) {
              var navigationGroups = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                navigationGroups[_i - 1] = arguments[_i];
              }
              var _this = this;
              this.navigationGroups = [];
              this.onShow = function (group) {
                _this.activeNavigationGroups.push(group);
                _this.updateEnabledNavigationGroup();
              };
              this.onHide = function (group) {
                var groupIndex = _this.activeNavigationGroups.findIndex(
                  function (other) {
                    return other === group;
                  }
                );
                if (groupIndex > -1) {
                  group.disable();
                  _this.activeNavigationGroups.splice(groupIndex, 1);
                  _this.updateEnabledNavigationGroup();
                }
              };
              /**
               * Checks if keyboard event keycode is tracked either as Direction or Action and calls appropriate handler on active
               * navigation group
               *
               * @param e {KeyboardEvent}
               */
              this.handleKeyEvent = function (e) {
                var event = _this.keyMap[getKeyCode(e)];
                var active = _this.getActiveNavigationGroup();
                if (
                  !active ||
                  !active.container ||
                  active.container.isHidden() ||
                  active.container.isDisabled()
                ) {
                  return;
                }
                if ((0, typeguards_1.isDirection)(event)) {
                  active.handleNavigation(event);
                  e.preventDefault();
                  e.stopPropagation();
                }
                if ((0, typeguards_1.isAction)(event)) {
                  active.handleAction(event);
                  e.preventDefault();
                  e.stopPropagation();
                }
              };
              this.seekBarHandler = new seekbarhandler_1.SeekBarHandler(
                rootNavigationGroup
              );
              this.activeNavigationGroups = [];
              this.unsubscribeVisibilityChangesFns = [];
              this.eventSubscriber =
                new nodeeventsubscriber_1.NodeEventSubscriber();
              this.navigationGroups = __spreadArray(
                [rootNavigationGroup],
                navigationGroups,
                true
              );
              this.keyMap = (0, keymap_1.getKeyMapForPlatform)();
              this.subscribeToNavigationGroupVisibilityChanges();
              this.attachKeyEventHandler();
              this.enableDefaultNavigationGroup();
            }
            SpatialNavigation.prototype.attachKeyEventHandler = function () {
              this.eventSubscriber.on(
                document,
                "keydown",
                this.handleKeyEvent,
                true
              );
            };
            /**
             * Subscribes to onHide and onShow on all navigation groups containers as Spatial navigation tracks active navigation
             * group based on their container visibility.
             */
            SpatialNavigation.prototype.subscribeToNavigationGroupVisibilityChanges =
              function () {
                var _this = this;
                this.navigationGroups.forEach(function (group) {
                  var onShowHandler = function () {
                    return _this.onShow(group);
                  };
                  var onHideHandler = function () {
                    return _this.onHide(group);
                  };
                  group.container.onShow.subscribe(onShowHandler);
                  group.container.onHide.subscribe(onHideHandler);
                  _this.unsubscribeVisibilityChangesFns.push(
                    function () {
                      return group.container.onShow.unsubscribe(onShowHandler);
                    },
                    function () {
                      return group.container.onHide.unsubscribe(onHideHandler);
                    }
                  );
                });
              };
            SpatialNavigation.prototype.unsubscribeFromNavigationGroupVisibilityChanges =
              function () {
                this.unsubscribeVisibilityChangesFns.forEach(function (unsub) {
                  return unsub();
                });
                this.unsubscribeVisibilityChangesFns = [];
              };
            /**
             * It will enable group of which container is currently shown
             * If there are no groups with containers that are currently visible, it will enable root navigation group
             */
            SpatialNavigation.prototype.enableDefaultNavigationGroup =
              function () {
                var _a;
                var isShown = function (group) {
                  return group.container.isShown();
                };
                var groupToEnable =
                  (_a = this.navigationGroups.find(isShown)) !== null &&
                  _a !== void 0
                    ? _a
                    : this.navigationGroups[0];
                if (groupToEnable) {
                  this.activeNavigationGroups.push(groupToEnable);
                  this.updateEnabledNavigationGroup();
                }
              };
            /**
             * Disables navigation groups that are no longer active and calls enable on last pushed navigation group
             */
            SpatialNavigation.prototype.updateEnabledNavigationGroup =
              function () {
                var _this = this;
                this.activeNavigationGroups.forEach(function (group, idx) {
                  if (idx < _this.activeNavigationGroups.length - 1) {
                    group.disable();
                  } else {
                    group.enable();
                  }
                });
              };
            /**
             * Returns currently active navigation group
             */
            SpatialNavigation.prototype.getActiveNavigationGroup = function () {
              return this.activeNavigationGroups[
                this.activeNavigationGroups.length - 1
              ];
            };
            /**
             * Dispose of SpatialNavigation
             *
             * Remove all event handlers, release seekbar handler and release all navigation groups.
             */
            SpatialNavigation.prototype.release = function () {
              this.unsubscribeFromNavigationGroupVisibilityChanges();
              this.eventSubscriber.release();
              this.navigationGroups.forEach(function (group) {
                return group.release();
              });
              this.seekBarHandler.release();
            };
            return SpatialNavigation;
          })();
          exports.SpatialNavigation = SpatialNavigation;
          function getKeyCode(event) {
            return event.keyCode;
          }
        },
        {
          "./keymap": 102,
          "./nodeeventsubscriber": 105,
          "./seekbarhandler": 107,
          "./typeguards": 109,
        },
      ],
      109: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.isAction =
            exports.isDirection =
            exports.isListBox =
            exports.isContainer =
            exports.isComponent =
            exports.isSettingsPanel =
              void 0;
          var component_1 = require("../components/component");
          var settingspanel_1 = require("../components/settingspanel");
          var container_1 = require("../components/container");
          var listbox_1 = require("../components/listbox");
          var types_1 = require("./types");
          function isSettingsPanel(component) {
            return component instanceof settingspanel_1.SettingsPanel;
          }
          exports.isSettingsPanel = isSettingsPanel;
          function isComponent(obj) {
            return (
              obj !== null &&
              obj !== undefined &&
              obj instanceof component_1.Component
            );
          }
          exports.isComponent = isComponent;
          function isContainer(obj) {
            return (
              obj !== null &&
              obj !== undefined &&
              obj instanceof container_1.Container
            );
          }
          exports.isContainer = isContainer;
          function isListBox(obj) {
            return obj instanceof listbox_1.ListBox;
          }
          exports.isListBox = isListBox;
          function isDirection(direction) {
            return (
              typeof direction === "string" &&
              Object.values(types_1.Direction).includes(direction)
            );
          }
          exports.isDirection = isDirection;
          function isAction(action) {
            return (
              typeof action === "string" &&
              Object.values(types_1.Action).includes(action)
            );
          }
          exports.isAction = isAction;
        },
        {
          "../components/component": 18,
          "../components/container": 19,
          "../components/listbox": 34,
          "../components/settingspanel": 49,
          "./types": 110,
        },
      ],
      110: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.Action = exports.Direction = void 0;
          var Direction;
          (function (Direction) {
            Direction["UP"] = "up";
            Direction["DOWN"] = "down";
            Direction["LEFT"] = "left";
            Direction["RIGHT"] = "right";
          })((Direction = exports.Direction || (exports.Direction = {})));
          var Action;
          (function (Action) {
            Action["SELECT"] = "select";
            Action["BACK"] = "back";
          })((Action = exports.Action || (exports.Action = {})));
        },
        {},
      ],
      111: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.StorageUtils = void 0;
          var StorageUtils;
          (function (StorageUtils) {
            var hasLocalStorageCache;
            function hasLocalStorage() {
              if (hasLocalStorageCache) {
                return hasLocalStorageCache;
              }
              // hasLocalStorage is used to safely ensure we can use localStorage
              // taken from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
              var storage = { length: 0 };
              try {
                storage = window["localStorage"];
                var x = "__storage_test__";
                storage.setItem(x, x);
                storage.removeItem(x);
                hasLocalStorageCache = true;
              } catch (e) {
                hasLocalStorageCache =
                  e instanceof DOMException &&
                  // everything except Firefox
                  (e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === "QuotaExceededError" ||
                    // Firefox
                    e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                  // acknowledge QuotaExceededError only if there's something already stored
                  storage.length !== 0;
              }
              return hasLocalStorageCache;
            }
            StorageUtils.hasLocalStorage = hasLocalStorage;
            /**
             * Stores a string item into localStorage.
             * @param key the item's key
             * @param data the item's data
             */
            function setItem(key, data) {
              if (StorageUtils.hasLocalStorage()) {
                window.localStorage.setItem(key, data);
              }
            }
            StorageUtils.setItem = setItem;
            /**
             * Gets an item's string value from the localStorage.
             * @param key the key to look up its associated value
             * @return {string | null} Returns the string if found, null if there is no data stored for the key
             */
            function getItem(key) {
              if (StorageUtils.hasLocalStorage()) {
                return window.localStorage.getItem(key);
              } else {
                return null;
              }
            }
            StorageUtils.getItem = getItem;
            /**
             * Stores an object into localStorage. The object will be serialized to JSON. The following types are supported
             * in addition to the default types:
             *  - ColorUtils.Color
             *
             * @param key the key to store the data to
             * @param data the object to store
             */
            function setObject(key, data) {
              if (StorageUtils.hasLocalStorage()) {
                var json = JSON.stringify(data);
                setItem(key, json);
              }
            }
            StorageUtils.setObject = setObject;
            /**
             * Gets an object for the given key from localStorage. The object will be deserialized from JSON. Beside the
             * default types, the following types are supported:
             *  - ColorUtils.Color
             *
             * @param key the key to look up its associated object
             * @return {any} Returns the object if found, null otherwise
             */
            function getObject(key) {
              if (StorageUtils.hasLocalStorage()) {
                var json = getItem(key);
                if (key) {
                  var object = JSON.parse(json);
                  return object;
                }
              }
              return null;
            }
            StorageUtils.getObject = getObject;
          })(
            (StorageUtils = exports.StorageUtils || (exports.StorageUtils = {}))
          );
        },
        {},
      ],
      112: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.StringUtils = void 0;
          var i18n_1 = require("./localization/i18n");
          var StringUtils;
          (function (StringUtils) {
            StringUtils.FORMAT_HHMMSS = "hh:mm:ss";
            StringUtils.FORMAT_MMSS = "mm:ss";
            /**
             * Formats a number of seconds into a time string with the pattern hh:mm:ss.
             *
             * @param totalSeconds the total number of seconds to format to string
             * @param format the time format to output (default: hh:mm:ss)
             * @returns {string} the formatted time string
             */
            function secondsToTime(totalSeconds, format) {
              if (format === void 0) {
                format = StringUtils.FORMAT_HHMMSS;
              }
              var isNegative = totalSeconds < 0;
              if (isNegative) {
                // If the time is negative, we make it positive for the calculation below
                // (else we'd get all negative numbers) and reattach the negative sign later.
                totalSeconds = -totalSeconds;
              }
              // Split into separate time parts
              var hours = Math.floor(totalSeconds / 3600);
              var minutes = Math.floor(totalSeconds / 60) - hours * 60;
              var seconds = Math.floor(totalSeconds) % 60;
              return (
                (isNegative ? "-" : "") +
                format
                  .replace("hh", leftPadWithZeros(hours, 2))
                  .replace("mm", leftPadWithZeros(minutes, 2))
                  .replace("ss", leftPadWithZeros(seconds, 2))
              );
            }
            StringUtils.secondsToTime = secondsToTime;
            function secondsToText(totalSeconds) {
              var isNegative = totalSeconds < 0;
              if (isNegative) {
                // If the time is negative, we make it positive for the calculation below
                // (else we'd get all negative numbers) and reattach the negative sign later.
                totalSeconds = -totalSeconds;
              }
              // Split into separate time parts
              var hours = Math.floor(totalSeconds / 3600);
              var minutes = Math.floor(totalSeconds / 60) - hours * 60;
              var seconds = Math.floor(totalSeconds) % 60;
              return (
                (isNegative ? "-" : "") +
                (hours !== 0
                  ? ""
                      .concat(leftPadWithZeros(hours, 2), " ")
                      .concat(
                        i18n_1.i18n.performLocalization(
                          i18n_1.i18n.getLocalizer("settings.time.hours")
                        ),
                        " "
                      )
                  : "") +
                (minutes !== 0
                  ? ""
                      .concat(leftPadWithZeros(minutes, 2), " ")
                      .concat(
                        i18n_1.i18n.performLocalization(
                          i18n_1.i18n.getLocalizer("settings.time.minutes")
                        ),
                        " "
                      )
                  : "") +
                ""
                  .concat(leftPadWithZeros(seconds, 2), " ")
                  .concat(
                    i18n_1.i18n.performLocalization(
                      i18n_1.i18n.getLocalizer("settings.time.seconds")
                    )
                  )
              );
            }
            StringUtils.secondsToText = secondsToText;
            /**
             * Converts a number to a string and left-pads it with zeros to the specified length.
             * Example: leftPadWithZeros(123, 5) => '00123'
             *
             * @param num the number to convert to string and pad with zeros
             * @param length the desired length of the padded string
             * @returns {string} the padded number as string
             */
            function leftPadWithZeros(num, length) {
              var text = num + "";
              var padding = "0000000000".substr(0, length - text.length);
              return padding + text;
            }
            /**
             * Fills out placeholders in an ad message.
             *
             * Has the placeholders '{remainingTime[formatString]}', '{playedTime[formatString]}' and
             * '{adDuration[formatString]}', which are replaced by the remaining time until the ad can be skipped, the current
             * time or the ad duration. The format string is optional. If not specified, the placeholder is replaced by the time
             * in seconds. If specified, it must be of the following format:
             * - %d - Inserts the time as an integer.
             * - %0Nd - Inserts the time as an integer with leading zeroes, if the length of the time string is smaller than N.
             * - %f - Inserts the time as a float.
             * - %0Nf - Inserts the time as a float with leading zeroes.
             * - %.Mf - Inserts the time as a float with M decimal places. Can be combined with %0Nf, e.g. %04.2f (the time
             * 10.123 would be printed as 0010.12).
             * - %hh:mm:ss
             * - %mm:ss
             *
             * Examples:
             * - { text: 'Ad: {remainingTime%mm:ss} secs' }
             * An input value of 100 would be displayed as: 'Ad: 01:40 secs'
             * - { text: 'Ad: {remainingTime%f} secs' }
             * An input value of 100 would be displayed as: 'Ad: 100.0 secs'
             *
             * @param adMessage an ad message with optional placeholders to fill
             * @param skipOffset if specified, {remainingTime} will be filled with the remaining time until the ad can be skipped
             * @param player the player to get the time data from
             * @returns {string} the ad message with filled placeholders
             */
            function replaceAdMessagePlaceholders(
              adMessage,
              skipOffset,
              player
            ) {
              var adMessagePlaceholderRegex = new RegExp(
                "\\{(remainingTime|playedTime|adDuration)(}|%((0[1-9]\\d*(\\.\\d+(d|f)|d|f)|\\.\\d+f|d|f)|hh:mm:ss|mm:ss)})",
                "g"
              );
              return adMessage.replace(
                adMessagePlaceholderRegex,
                function (formatString) {
                  var time = 0;
                  if (formatString.indexOf("remainingTime") > -1) {
                    if (skipOffset) {
                      time = Math.ceil(skipOffset - player.getCurrentTime());
                    } else {
                      time = player.getDuration() - player.getCurrentTime();
                    }
                  } else if (formatString.indexOf("playedTime") > -1) {
                    time = player.getCurrentTime();
                  } else if (formatString.indexOf("adDuration") > -1) {
                    time = player.getDuration();
                  }
                  return formatNumber(Math.round(time), formatString);
                }
              );
            }
            StringUtils.replaceAdMessagePlaceholders =
              replaceAdMessagePlaceholders;
            function formatNumber(time, format) {
              var formatStringValidationRegex =
                /%((0[1-9]\d*(\.\d+(d|f)|d|f)|\.\d+f|d|f)|hh:mm:ss|mm:ss)/;
              var leadingZeroesRegex = /(%0[1-9]\d*)(?=(\.\d+f|f|d))/;
              var decimalPlacesRegex = /\.\d*(?=f)/;
              if (!formatStringValidationRegex.test(format)) {
                // If the format is invalid, we set a default fallback format
                format = "%d";
              }
              // Determine the number of leading zeros
              var leadingZeroes = 0;
              var leadingZeroesMatches = format.match(leadingZeroesRegex);
              if (leadingZeroesMatches) {
                leadingZeroes = parseInt(leadingZeroesMatches[0].substring(2));
              }
              // Determine the number of decimal places
              var numDecimalPlaces = null;
              var decimalPlacesMatches = format.match(decimalPlacesRegex);
              if (
                decimalPlacesMatches &&
                !isNaN(parseInt(decimalPlacesMatches[0].substring(1)))
              ) {
                numDecimalPlaces = parseInt(
                  decimalPlacesMatches[0].substring(1)
                );
                if (numDecimalPlaces > 20) {
                  numDecimalPlaces = 20;
                }
              }
              // Float format
              if (format.indexOf("f") > -1) {
                var timeString = "";
                if (numDecimalPlaces !== null) {
                  // Apply fixed number of decimal places
                  timeString = time.toFixed(numDecimalPlaces);
                } else {
                  timeString = "" + time;
                }
                // Apply leading zeros
                if (timeString.indexOf(".") > -1) {
                  return leftPadWithZeros(
                    timeString,
                    timeString.length +
                      (leadingZeroes - timeString.indexOf("."))
                  );
                } else {
                  return leftPadWithZeros(timeString, leadingZeroes);
                }
              }
              // Time format
              else if (format.indexOf(":") > -1) {
                var totalSeconds = Math.ceil(time);
                // hh:mm:ss format
                if (format.indexOf("hh") > -1) {
                  return secondsToTime(totalSeconds);
                }
                // mm:ss format
                else {
                  var minutes = Math.floor(totalSeconds / 60);
                  var seconds = totalSeconds % 60;
                  return (
                    leftPadWithZeros(minutes, 2) +
                    ":" +
                    leftPadWithZeros(seconds, 2)
                  );
                }
              }
              // Integer format
              else {
                return leftPadWithZeros(Math.ceil(time), leadingZeroes);
              }
            }
          })((StringUtils = exports.StringUtils || (exports.StringUtils = {})));
        },
        { "./localization/i18n": 93 },
      ],
      113: [
        function (require, module, exports) {
          "use strict";
          var __spreadArray =
            (this && this.__spreadArray) ||
            function (to, from, pack) {
              if (pack || arguments.length === 2)
                for (var i = 0, l = from.length, ar; i < l; i++) {
                  if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                  }
                }
              return to.concat(ar || Array.prototype.slice.call(from));
            };
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.SubtitleSwitchHandler = void 0;
          var i18n_1 = require("./localization/i18n");
          /**
           * Helper class to handle all subtitle related events
           *
           * This class listens to player events as well as the `ListSelector` event if selection changed
           */
          var SubtitleSwitchHandler = (exports.SubtitleSwitchHandler =
            /** @class */ (function () {
              function SubtitleSwitchHandler(player, element, uimanager) {
                var _this = this;
                this.addSubtitle = function (event) {
                  var subtitle = event.subtitle;
                  if (!_this.listElement.hasItem(subtitle.id)) {
                    _this.listElement.addItem(subtitle.id, subtitle.label);
                  }
                };
                this.removeSubtitle = function (event) {
                  var subtitle = event.subtitle;
                  if (_this.listElement.hasItem(subtitle.id)) {
                    _this.listElement.removeItem(subtitle.id);
                  }
                };
                this.selectCurrentSubtitle = function () {
                  if (!_this.player.subtitles) {
                    // Subtitles API not available (yet)
                    return;
                  }
                  var currentSubtitle = _this.player.subtitles
                    .list()
                    .filter(function (subtitle) {
                      return subtitle.enabled;
                    })
                    .pop();
                  _this.listElement.selectItem(
                    currentSubtitle
                      ? currentSubtitle.id
                      : SubtitleSwitchHandler.SUBTITLES_OFF_KEY
                  );
                };
                this.clearSubtitles = function () {
                  _this.listElement.clearItems();
                };
                this.refreshSubtitles = function () {
                  if (!_this.player.subtitles) {
                    // Subtitles API not available (yet)
                    return;
                  }
                  var offListItem = {
                    key: SubtitleSwitchHandler.SUBTITLES_OFF_KEY,
                    label: i18n_1.i18n.getLocalizer("off"),
                  };
                  var subtitles = _this.player.subtitles.list();
                  var subtitleToListItem = function (subtitle) {
                    return { key: subtitle.id, label: subtitle.label };
                  };
                  _this.listElement.synchronizeItems(
                    __spreadArray(
                      [offListItem],
                      subtitles.map(subtitleToListItem),
                      true
                    )
                  );
                  _this.selectCurrentSubtitle();
                };
                this.player = player;
                this.listElement = element;
                this.uimanager = uimanager;
                this.bindSelectionEvent();
                this.bindPlayerEvents();
                this.refreshSubtitles();
              }
              SubtitleSwitchHandler.prototype.bindSelectionEvent = function () {
                var _this = this;
                this.listElement.onItemSelected.subscribe(function (_, value) {
                  // TODO add support for multiple concurrent subtitle selections
                  if (value === SubtitleSwitchHandler.SUBTITLES_OFF_KEY) {
                    var currentSubtitle = _this.player.subtitles
                      .list()
                      .filter(function (subtitle) {
                        return subtitle.enabled;
                      })
                      .pop();
                    if (currentSubtitle) {
                      _this.player.subtitles.disable(currentSubtitle.id);
                    }
                  } else {
                    _this.player.subtitles.enable(value, true);
                  }
                });
              };
              SubtitleSwitchHandler.prototype.bindPlayerEvents = function () {
                this.player.on(
                  this.player.exports.PlayerEvent.SubtitleAdded,
                  this.addSubtitle
                );
                this.player.on(
                  this.player.exports.PlayerEvent.SubtitleEnabled,
                  this.selectCurrentSubtitle
                );
                this.player.on(
                  this.player.exports.PlayerEvent.SubtitleDisabled,
                  this.selectCurrentSubtitle
                );
                this.player.on(
                  this.player.exports.PlayerEvent.SubtitleRemoved,
                  this.removeSubtitle
                );
                // Update subtitles when source goes away
                this.player.on(
                  this.player.exports.PlayerEvent.SourceUnloaded,
                  this.clearSubtitles
                );
                // Update subtitles when the period within a source changes
                this.player.on(
                  this.player.exports.PlayerEvent.PeriodSwitched,
                  this.refreshSubtitles
                );
                this.uimanager
                  .getConfig()
                  .events.onUpdated.subscribe(this.refreshSubtitles);
              };
              SubtitleSwitchHandler.SUBTITLES_OFF_KEY = "null";
              return SubtitleSwitchHandler;
            })());
        },
        { "./localization/i18n": 93 },
      ],
      114: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.Timeout = void 0;
          // TODO change to internal (not exported) class, how to use in other files?
          /**
           * Executes a callback after a specified amount of time, optionally repeatedly until stopped.
           */
          var Timeout = /** @class */ (function () {
            /**
             * Creates a new timeout callback handler.
             * @param delay the delay in milliseconds after which the callback should be executed
             * @param callback the callback to execute after the delay time
             * @param repeat if true, call the callback repeatedly in delay intervals
             */
            function Timeout(delay, callback, repeat) {
              if (repeat === void 0) {
                repeat = false;
              }
              this.delay = delay;
              this.callback = callback;
              this.repeat = repeat;
              this.timeoutOrIntervalId = 0;
              this.active = false;
            }
            /**
             * Starts the timeout and calls the callback when the timeout delay has passed.
             * @returns {Timeout} the current timeout (so the start call can be chained to the constructor)
             */
            Timeout.prototype.start = function () {
              this.reset();
              return this;
            };
            /**
             * Clears the timeout. The callback will not be called if clear is called during the timeout.
             */
            Timeout.prototype.clear = function () {
              this.clearInternal();
            };
            /**
             * Resets the passed timeout delay to zero. Can be used to defer the calling of the callback.
             */
            Timeout.prototype.reset = function () {
              var _this = this;
              this.clearInternal();
              if (this.repeat) {
                this.timeoutOrIntervalId = setInterval(
                  this.callback,
                  this.delay
                );
              } else {
                this.timeoutOrIntervalId = setTimeout(function () {
                  _this.active = false;
                  _this.callback();
                }, this.delay);
              }
              this.active = true;
            };
            Timeout.prototype.isActive = function () {
              return this.active;
            };
            Timeout.prototype.clearInternal = function () {
              if (this.repeat) {
                clearInterval(this.timeoutOrIntervalId);
              } else {
                clearTimeout(this.timeoutOrIntervalId);
              }
              this.active = false;
            };
            return Timeout;
          })();
          exports.Timeout = Timeout;
        },
        {},
      ],
      115: [
        function (require, module, exports) {
          "use strict";
          var __assign =
            (this && this.__assign) ||
            function () {
              __assign =
                Object.assign ||
                function (t) {
                  for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s)
                      if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                  }
                  return t;
                };
              return __assign.apply(this, arguments);
            };
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.UIFactory = void 0;
          var subtitleoverlay_1 = require("./components/subtitleoverlay");
          var settingspanelpage_1 = require("./components/settingspanelpage");
          var settingspanelitem_1 = require("./components/settingspanelitem");
          var videoqualityselectbox_1 = require("./components/videoqualityselectbox");
          var playbackspeedselectbox_1 = require("./components/playbackspeedselectbox");
          var audiotrackselectbox_1 = require("./components/audiotrackselectbox");
          var audioqualityselectbox_1 = require("./components/audioqualityselectbox");
          var settingspanel_1 = require("./components/settingspanel");
          var subtitlesettingspanelpage_1 = require("./components/subtitlesettings/subtitlesettingspanelpage");
          var settingspanelpageopenbutton_1 = require("./components/settingspanelpageopenbutton");
          var subtitlesettingslabel_1 = require("./components/subtitlesettings/subtitlesettingslabel");
          var subtitleselectbox_1 = require("./components/subtitleselectbox");
          var controlbar_1 = require("./components/controlbar");
          var container_1 = require("./components/container");
          var playbacktimelabel_1 = require("./components/playbacktimelabel");
          var seekbar_1 = require("./components/seekbar");
          var seekbarlabel_1 = require("./components/seekbarlabel");
          var playbacktogglebutton_1 = require("./components/playbacktogglebutton");
          var volumetogglebutton_1 = require("./components/volumetogglebutton");
          var volumeslider_1 = require("./components/volumeslider");
          var spacer_1 = require("./components/spacer");
          var pictureinpicturetogglebutton_1 = require("./components/pictureinpicturetogglebutton");
          var airplaytogglebutton_1 = require("./components/airplaytogglebutton");
          var casttogglebutton_1 = require("./components/casttogglebutton");
          var vrtogglebutton_1 = require("./components/vrtogglebutton");
          var settingstogglebutton_1 = require("./components/settingstogglebutton");
          var fullscreentogglebutton_1 = require("./components/fullscreentogglebutton");
          var uicontainer_1 = require("./components/uicontainer");
          var bufferingoverlay_1 = require("./components/bufferingoverlay");
          var playbacktoggleoverlay_1 = require("./components/playbacktoggleoverlay");
          var caststatusoverlay_1 = require("./components/caststatusoverlay");
          var titlebar_1 = require("./components/titlebar");
          var recommendationoverlay_1 = require("./components/recommendationoverlay");
          var watermark_1 = require("./components/watermark");
          var errormessageoverlay_1 = require("./components/errormessageoverlay");
          var adclickoverlay_1 = require("./components/adclickoverlay");
          var admessagelabel_1 = require("./components/admessagelabel");
          var adskipbutton_1 = require("./components/adskipbutton");
          var closebutton_1 = require("./components/closebutton");
          var metadatalabel_1 = require("./components/metadatalabel");
          var playerutils_1 = require("./playerutils");
          var label_1 = require("./components/label");
          var castuicontainer_1 = require("./components/castuicontainer");
          var uimanager_1 = require("./uimanager");
          var i18n_1 = require("./localization/i18n");
          var subtitlelistbox_1 = require("./components/subtitlelistbox");
          var audiotracklistbox_1 = require("./components/audiotracklistbox");
          var spatialnavigation_1 = require("./spatialnavigation/spatialnavigation");
          var rootnavigationgroup_1 = require("./spatialnavigation/rootnavigationgroup");
          var ListNavigationGroup_1 = require("./spatialnavigation/ListNavigationGroup");
          var UIFactory;
          (function (UIFactory) {
            function buildDefaultUI(player, config) {
              if (config === void 0) {
                config = {};
              }
              return UIFactory.buildModernUI(player, config);
            }
            UIFactory.buildDefaultUI = buildDefaultUI;
            function buildDefaultSmallScreenUI(player, config) {
              if (config === void 0) {
                config = {};
              }
              return UIFactory.buildModernSmallScreenUI(player, config);
            }
            UIFactory.buildDefaultSmallScreenUI = buildDefaultSmallScreenUI;
            function buildDefaultCastReceiverUI(player, config) {
              if (config === void 0) {
                config = {};
              }
              return UIFactory.buildModernCastReceiverUI(player, config);
            }
            UIFactory.buildDefaultCastReceiverUI = buildDefaultCastReceiverUI;
            function buildDefaultTvUI(player, config) {
              if (config === void 0) {
                config = {};
              }
              return UIFactory.buildModernTvUI(player, config);
            }
            UIFactory.buildDefaultTvUI = buildDefaultTvUI;
            function modernUI() {
              var subtitleOverlay = new subtitleoverlay_1.SubtitleOverlay();
              var mainSettingsPanelPage =
                new settingspanelpage_1.SettingsPanelPage({
                  components: [
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer("settings.video.quality"),
                      new videoqualityselectbox_1.VideoQualitySelectBox()
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer("speed"),
                      new playbackspeedselectbox_1.PlaybackSpeedSelectBox()
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer("settings.audio.track"),
                      new audiotrackselectbox_1.AudioTrackSelectBox()
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer("settings.audio.quality"),
                      new audioqualityselectbox_1.AudioQualitySelectBox()
                    ),
                  ],
                });
              var settingsPanel = new settingspanel_1.SettingsPanel({
                components: [mainSettingsPanelPage],
                hidden: true,
              });
              var subtitleSettingsPanelPage =
                new subtitlesettingspanelpage_1.SubtitleSettingsPanelPage({
                  settingsPanel: settingsPanel,
                  overlay: subtitleOverlay,
                });
              var subtitleSelectBox =
                new subtitleselectbox_1.SubtitleSelectBox();
              var subtitleSettingsOpenButton =
                new settingspanelpageopenbutton_1.SettingsPanelPageOpenButton({
                  targetPage: subtitleSettingsPanelPage,
                  container: settingsPanel,
                  ariaLabel: i18n_1.i18n.getLocalizer("settings.subtitles"),
                  text: i18n_1.i18n.getLocalizer("open"),
                });
              mainSettingsPanelPage.addComponent(
                new settingspanelitem_1.SettingsPanelItem(
                  new subtitlesettingslabel_1.SubtitleSettingsLabel({
                    text: i18n_1.i18n.getLocalizer("settings.subtitles"),
                    opener: subtitleSettingsOpenButton,
                  }),
                  subtitleSelectBox,
                  {
                    role: "menubar",
                  }
                )
              );
              settingsPanel.addComponent(subtitleSettingsPanelPage);
              var controlBar = new controlbar_1.ControlBar({
                components: [
                  settingsPanel,
                  new container_1.Container({
                    components: [
                      new playbacktimelabel_1.PlaybackTimeLabel({
                        timeLabelMode:
                          playbacktimelabel_1.PlaybackTimeLabelMode.CurrentTime,
                        hideInLivePlayback: true,
                      }),
                      new seekbar_1.SeekBar({
                        label: new seekbarlabel_1.SeekBarLabel(),
                      }),
                      new playbacktimelabel_1.PlaybackTimeLabel({
                        timeLabelMode:
                          playbacktimelabel_1.PlaybackTimeLabelMode.TotalTime,
                        cssClasses: ["text-right"],
                      }),
                    ],
                    cssClasses: ["controlbar-top"],
                  }),
                  new container_1.Container({
                    components: [
                      new playbacktogglebutton_1.PlaybackToggleButton(),
                      new volumetogglebutton_1.VolumeToggleButton(),
                      new volumeslider_1.VolumeSlider(),
                      new spacer_1.Spacer(),
                      new pictureinpicturetogglebutton_1.PictureInPictureToggleButton(),
                      new airplaytogglebutton_1.AirPlayToggleButton(),
                      new casttogglebutton_1.CastToggleButton(),
                      new vrtogglebutton_1.VRToggleButton(),
                      new settingstogglebutton_1.SettingsToggleButton({
                        settingsPanel: settingsPanel,
                      }),
                      new fullscreentogglebutton_1.FullscreenToggleButton(),
                    ],
                    cssClasses: ["controlbar-bottom"],
                  }),
                ],
              });
              return new uicontainer_1.UIContainer({
                components: [
                  subtitleOverlay,
                  new bufferingoverlay_1.BufferingOverlay(),
                  new playbacktoggleoverlay_1.PlaybackToggleOverlay(),
                  new caststatusoverlay_1.CastStatusOverlay(),
                  controlBar,
                  new titlebar_1.TitleBar(),
                  new recommendationoverlay_1.RecommendationOverlay(),
                  new watermark_1.Watermark(),
                  new errormessageoverlay_1.ErrorMessageOverlay(),
                ],
                hideDelay: 2000,
                hidePlayerStateExceptions: [
                  playerutils_1.PlayerUtils.PlayerState.Prepared,
                  playerutils_1.PlayerUtils.PlayerState.Paused,
                  playerutils_1.PlayerUtils.PlayerState.Finished,
                ],
              });
            }
            UIFactory.modernUI = modernUI;
            function modernAdsUI() {
              return new uicontainer_1.UIContainer({
                components: [
                  new bufferingoverlay_1.BufferingOverlay(),
                  new adclickoverlay_1.AdClickOverlay(),
                  new playbacktoggleoverlay_1.PlaybackToggleOverlay(),
                  new container_1.Container({
                    components: [
                      new admessagelabel_1.AdMessageLabel({
                        text: i18n_1.i18n.getLocalizer("ads.remainingTime"),
                      }),
                      new adskipbutton_1.AdSkipButton(),
                    ],
                    cssClass: "ui-ads-status",
                  }),
                  new controlbar_1.ControlBar({
                    components: [
                      new container_1.Container({
                        components: [
                          new playbacktogglebutton_1.PlaybackToggleButton(),
                          new volumetogglebutton_1.VolumeToggleButton(),
                          new volumeslider_1.VolumeSlider(),
                          new spacer_1.Spacer(),
                          new fullscreentogglebutton_1.FullscreenToggleButton(),
                        ],
                        cssClasses: ["controlbar-bottom"],
                      }),
                    ],
                  }),
                ],
                cssClasses: ["ui-skin-ads"],
                hideDelay: 2000,
                hidePlayerStateExceptions: [
                  playerutils_1.PlayerUtils.PlayerState.Prepared,
                  playerutils_1.PlayerUtils.PlayerState.Paused,
                  playerutils_1.PlayerUtils.PlayerState.Finished,
                ],
              });
            }
            UIFactory.modernAdsUI = modernAdsUI;
            function modernSmallScreenUI() {
              var subtitleOverlay = new subtitleoverlay_1.SubtitleOverlay();
              var mainSettingsPanelPage =
                new settingspanelpage_1.SettingsPanelPage({
                  components: [
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer("settings.video.quality"),
                      new videoqualityselectbox_1.VideoQualitySelectBox()
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer("speed"),
                      new playbackspeedselectbox_1.PlaybackSpeedSelectBox()
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer("settings.audio.track"),
                      new audiotrackselectbox_1.AudioTrackSelectBox()
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer("settings.audio.quality"),
                      new audioqualityselectbox_1.AudioQualitySelectBox()
                    ),
                  ],
                });
              var settingsPanel = new settingspanel_1.SettingsPanel({
                components: [mainSettingsPanelPage],
                hidden: true,
                pageTransitionAnimation: false,
                hideDelay: -1,
              });
              var subtitleSettingsPanelPage =
                new subtitlesettingspanelpage_1.SubtitleSettingsPanelPage({
                  settingsPanel: settingsPanel,
                  overlay: subtitleOverlay,
                });
              var subtitleSettingsOpenButton =
                new settingspanelpageopenbutton_1.SettingsPanelPageOpenButton({
                  targetPage: subtitleSettingsPanelPage,
                  container: settingsPanel,
                  ariaLabel: i18n_1.i18n.getLocalizer("settings.subtitles"),
                  text: i18n_1.i18n.getLocalizer("open"),
                });
              var subtitleSelectBox =
                new subtitleselectbox_1.SubtitleSelectBox();
              mainSettingsPanelPage.addComponent(
                new settingspanelitem_1.SettingsPanelItem(
                  new subtitlesettingslabel_1.SubtitleSettingsLabel({
                    text: i18n_1.i18n.getLocalizer("settings.subtitles"),
                    opener: subtitleSettingsOpenButton,
                  }),
                  subtitleSelectBox,
                  {
                    role: "menubar",
                  }
                )
              );
              settingsPanel.addComponent(subtitleSettingsPanelPage);
              settingsPanel.addComponent(
                new closebutton_1.CloseButton({ target: settingsPanel })
              );
              subtitleSettingsPanelPage.addComponent(
                new closebutton_1.CloseButton({ target: settingsPanel })
              );
              var controlBar = new controlbar_1.ControlBar({
                components: [
                  new container_1.Container({
                    components: [
                      //new PlaybackTimeLabel({ timeLabelMode: PlaybackTimeLabelMode.CurrentTime, hideInLivePlayback: true }),
                      new seekbar_1.SeekBar({
                        label: new seekbarlabel_1.SeekBarLabel(),
                      }),
                      //new PlaybackTimeLabel({ timeLabelMode: PlaybackTimeLabelMode.TotalTime, cssClasses: ['text-right'] }),
                    ],
                    cssClasses: ["controlbar-top"],
                  }),
                  new container_1.Container({
                    components: [
                      new playbacktogglebutton_1.PlaybackToggleButton(),
                      new volumetogglebutton_1.VolumeToggleButton(),
                      new volumeslider_1.VolumeSlider(),
                      new spacer_1.Spacer(),
                      new pictureinpicturetogglebutton_1.PictureInPictureToggleButton(),
                      new settingstogglebutton_1.SettingsToggleButton({
                        settingsPanel: settingsPanel,
                      }),
                      new fullscreentogglebutton_1.FullscreenToggleButton(),
                    ],
                    cssClasses: ["controlbar-bottom"],
                  }),
                ],
              });
              return new uicontainer_1.UIContainer({
                components: [
                  subtitleOverlay,
                  new bufferingoverlay_1.BufferingOverlay(),
                  new caststatusoverlay_1.CastStatusOverlay(),
                  new playbacktoggleoverlay_1.PlaybackToggleOverlay(),
                  new recommendationoverlay_1.RecommendationOverlay(),
                  controlBar,
                  new titlebar_1.TitleBar({
                    components: [
                      //  new MetadataLabel({ content: MetadataLabelContent.Title }),
                      new casttogglebutton_1.CastToggleButton(),
                      new vrtogglebutton_1.VRToggleButton(),
                      new airplaytogglebutton_1.AirPlayToggleButton(),
                    ],
                  }),
                  settingsPanel,
                  new watermark_1.Watermark(),
                  new errormessageoverlay_1.ErrorMessageOverlay(),
                ],
                cssClasses: ["ui-skin-smallscreen"],
                hideDelay: 2000,
                hidePlayerStateExceptions: [
                  playerutils_1.PlayerUtils.PlayerState.Prepared,
                  playerutils_1.PlayerUtils.PlayerState.Paused,
                  playerutils_1.PlayerUtils.PlayerState.Finished,
                ],
              });
            }
            UIFactory.modernSmallScreenUI = modernSmallScreenUI;
            function modernSmallScreenAdsUI() {
              return new uicontainer_1.UIContainer({
                components: [
                  new bufferingoverlay_1.BufferingOverlay(),
                  new adclickoverlay_1.AdClickOverlay(),
                  new playbacktoggleoverlay_1.PlaybackToggleOverlay(),
                  new titlebar_1.TitleBar({
                    components: [
                      // dummy label with no content to move buttons to the right
                      new label_1.Label({ cssClass: "label-metadata-title" }),
                      new fullscreentogglebutton_1.FullscreenToggleButton(),
                    ],
                  }),
                  new container_1.Container({
                    components: [
                      new admessagelabel_1.AdMessageLabel({
                        text: "Ad: {remainingTime} secs",
                      }),
                      new adskipbutton_1.AdSkipButton(),
                    ],
                    cssClass: "ui-ads-status",
                  }),
                ],
                cssClasses: ["ui-skin-ads", "ui-skin-smallscreen"],
                hideDelay: 2000,
                hidePlayerStateExceptions: [
                  playerutils_1.PlayerUtils.PlayerState.Prepared,
                  playerutils_1.PlayerUtils.PlayerState.Paused,
                  playerutils_1.PlayerUtils.PlayerState.Finished,
                ],
              });
            }
            UIFactory.modernSmallScreenAdsUI = modernSmallScreenAdsUI;
            function modernCastReceiverUI() {
              var controlBar = new controlbar_1.ControlBar({
                components: [
                  new container_1.Container({
                    components: [
                      new playbacktimelabel_1.PlaybackTimeLabel({
                        timeLabelMode:
                          playbacktimelabel_1.PlaybackTimeLabelMode.CurrentTime,
                        hideInLivePlayback: true,
                      }),
                      new seekbar_1.SeekBar({
                        smoothPlaybackPositionUpdateIntervalMs: -1,
                      }),
                      new playbacktimelabel_1.PlaybackTimeLabel({
                        timeLabelMode:
                          playbacktimelabel_1.PlaybackTimeLabelMode.TotalTime,
                        cssClasses: ["text-right"],
                      }),
                    ],
                    cssClasses: ["controlbar-top"],
                  }),
                ],
              });
              return new castuicontainer_1.CastUIContainer({
                components: [
                  new subtitleoverlay_1.SubtitleOverlay(),
                  new bufferingoverlay_1.BufferingOverlay(),
                  new playbacktoggleoverlay_1.PlaybackToggleOverlay(),
                  new watermark_1.Watermark(),
                  controlBar,
                  new titlebar_1.TitleBar({ keepHiddenWithoutMetadata: true }),
                  new errormessageoverlay_1.ErrorMessageOverlay(),
                ],
                cssClasses: ["ui-skin-cast-receiver"],
                hideDelay: 2000,
                hidePlayerStateExceptions: [
                  playerutils_1.PlayerUtils.PlayerState.Prepared,
                  playerutils_1.PlayerUtils.PlayerState.Paused,
                  playerutils_1.PlayerUtils.PlayerState.Finished,
                ],
              });
            }
            UIFactory.modernCastReceiverUI = modernCastReceiverUI;
            function buildModernUI(player, config) {
              if (config === void 0) {
                config = {};
              }
              // show smallScreen UI only on mobile/handheld devices
              var smallScreenSwitchWidth = 600;
              return new uimanager_1.UIManager(
                player,
                [
                  {
                    ui: modernSmallScreenAdsUI(),
                    condition: function (context) {
                      return (
                        context.isMobile &&
                        context.documentWidth < smallScreenSwitchWidth &&
                        context.isAd &&
                        context.adRequiresUi
                      );
                    },
                  },
                  {
                    ui: modernAdsUI(),
                    condition: function (context) {
                      return context.isAd && context.adRequiresUi;
                    },
                  },
                  {
                    ui: modernSmallScreenUI(),
                    condition: function (context) {
                      return (
                        !context.isAd &&
                        !context.adRequiresUi &&
                        context.isMobile &&
                        context.documentWidth < smallScreenSwitchWidth
                      );
                    },
                  },
                  {
                    ui: modernUI(),
                    condition: function (context) {
                      return !context.isAd && !context.adRequiresUi;
                    },
                  },
                ],
                config
              );
            }
            UIFactory.buildModernUI = buildModernUI;
            function buildModernSmallScreenUI(player, config) {
              if (config === void 0) {
                config = {};
              }
              return new uimanager_1.UIManager(
                player,
                [
                  {
                    ui: modernSmallScreenAdsUI(),
                    condition: function (context) {
                      return context.isAd && context.adRequiresUi;
                    },
                  },
                  {
                    ui: modernSmallScreenUI(),
                    condition: function (context) {
                      return !context.isAd && !context.adRequiresUi;
                    },
                  },
                ],
                config
              );
            }
            UIFactory.buildModernSmallScreenUI = buildModernSmallScreenUI;
            function buildModernCastReceiverUI(player, config) {
              if (config === void 0) {
                config = {};
              }
              return new uimanager_1.UIManager(
                player,
                modernCastReceiverUI(),
                config
              );
            }
            UIFactory.buildModernCastReceiverUI = buildModernCastReceiverUI;
            function buildModernTvUI(player, config) {
              if (config === void 0) {
                config = {};
              }
              return new uimanager_1.UIManager(
                player,
                [__assign({}, modernTvUI())],
                config
              );
            }
            UIFactory.buildModernTvUI = buildModernTvUI;
            function modernTvUI() {
              var subtitleListBox = new subtitlelistbox_1.SubtitleListBox();
              var subtitleListPanel = new settingspanel_1.SettingsPanel({
                components: [
                  new settingspanelpage_1.SettingsPanelPage({
                    components: [
                      new settingspanelitem_1.SettingsPanelItem(
                        null,
                        subtitleListBox
                      ),
                    ],
                  }),
                ],
                hidden: true,
              });
              var audioTrackListBox =
                new audiotracklistbox_1.AudioTrackListBox();
              var audioTrackListPanel = new settingspanel_1.SettingsPanel({
                components: [
                  new settingspanelpage_1.SettingsPanelPage({
                    components: [
                      new settingspanelitem_1.SettingsPanelItem(
                        null,
                        audioTrackListBox
                      ),
                    ],
                  }),
                ],
                hidden: true,
              });
              var seekBar = new seekbar_1.SeekBar({
                label: new seekbarlabel_1.SeekBarLabel(),
              });
              var playbackToggleOverlay =
                new playbacktoggleoverlay_1.PlaybackToggleOverlay();
              var subtitleToggleButton =
                new settingstogglebutton_1.SettingsToggleButton({
                  settingsPanel: subtitleListPanel,
                  autoHideWhenNoActiveSettings: true,
                  cssClass: "ui-subtitlesettingstogglebutton",
                  text: i18n_1.i18n.getLocalizer("settings.subtitles"),
                });
              var audioToggleButton =
                new settingstogglebutton_1.SettingsToggleButton({
                  settingsPanel: audioTrackListPanel,
                  autoHideWhenNoActiveSettings: true,
                  cssClass: "ui-audiotracksettingstogglebutton",
                  ariaLabel: i18n_1.i18n.getLocalizer("settings.audio.track"),
                  text: i18n_1.i18n.getLocalizer("settings.audio.track"),
                });
              var uiContainer = new uicontainer_1.UIContainer({
                components: [
                  new subtitleoverlay_1.SubtitleOverlay(),
                  new bufferingoverlay_1.BufferingOverlay(),
                  playbackToggleOverlay,
                  new controlbar_1.ControlBar({
                    components: [
                      new container_1.Container({
                        components: [
                          new playbacktimelabel_1.PlaybackTimeLabel({
                            timeLabelMode:
                              playbacktimelabel_1.PlaybackTimeLabelMode
                                .CurrentTime,
                            hideInLivePlayback: true,
                          }),
                          seekBar,
                          new playbacktimelabel_1.PlaybackTimeLabel({
                            timeLabelMode:
                              playbacktimelabel_1.PlaybackTimeLabelMode
                                .RemainingTime,
                            cssClasses: ["text-right"],
                          }),
                        ],
                        cssClasses: ["controlbar-top"],
                      }),
                    ],
                  }),
                  new titlebar_1.TitleBar({
                    components: [
                      new container_1.Container({
                        components: [
                          new metadatalabel_1.MetadataLabel({
                            content: metadatalabel_1.MetadataLabelContent.Title,
                          }),
                          subtitleToggleButton,
                          audioToggleButton,
                        ],
                        cssClasses: ["ui-titlebar-top"],
                      }),
                      new container_1.Container({
                        components: [
                          new metadatalabel_1.MetadataLabel({
                            content:
                              metadatalabel_1.MetadataLabelContent.Description,
                          }),
                          subtitleListPanel,
                          audioTrackListPanel,
                        ],
                        cssClasses: ["ui-titlebar-bottom"],
                      }),
                    ],
                  }),
                  new recommendationoverlay_1.RecommendationOverlay(),
                  new errormessageoverlay_1.ErrorMessageOverlay(),
                ],
                cssClasses: ["ui-skin-tv"],
                hideDelay: 2000,
                hidePlayerStateExceptions: [
                  playerutils_1.PlayerUtils.PlayerState.Prepared,
                  playerutils_1.PlayerUtils.PlayerState.Paused,
                  playerutils_1.PlayerUtils.PlayerState.Finished,
                ],
              });
              var spatialNavigation = new spatialnavigation_1.SpatialNavigation(
                new rootnavigationgroup_1.RootNavigationGroup(
                  uiContainer,
                  playbackToggleOverlay,
                  seekBar,
                  audioToggleButton,
                  subtitleToggleButton
                ),
                new ListNavigationGroup_1.ListNavigationGroup(
                  ListNavigationGroup_1.ListOrientation.Vertical,
                  subtitleListPanel,
                  subtitleListBox
                ),
                new ListNavigationGroup_1.ListNavigationGroup(
                  ListNavigationGroup_1.ListOrientation.Vertical,
                  audioTrackListPanel,
                  audioTrackListBox
                )
              );
              return {
                ui: uiContainer,
                spatialNavigation: spatialNavigation,
              };
            }
            UIFactory.modernTvUI = modernTvUI;
          })((UIFactory = exports.UIFactory || (exports.UIFactory = {})));
        },
        {
          "./components/adclickoverlay": 4,
          "./components/admessagelabel": 5,
          "./components/adskipbutton": 6,
          "./components/airplaytogglebutton": 7,
          "./components/audioqualityselectbox": 8,
          "./components/audiotracklistbox": 9,
          "./components/audiotrackselectbox": 10,
          "./components/bufferingoverlay": 11,
          "./components/caststatusoverlay": 13,
          "./components/casttogglebutton": 14,
          "./components/castuicontainer": 15,
          "./components/closebutton": 17,
          "./components/container": 19,
          "./components/controlbar": 20,
          "./components/errormessageoverlay": 28,
          "./components/fullscreentogglebutton": 29,
          "./components/label": 33,
          "./components/metadatalabel": 36,
          "./components/pictureinpicturetogglebutton": 37,
          "./components/playbackspeedselectbox": 38,
          "./components/playbacktimelabel": 39,
          "./components/playbacktogglebutton": 40,
          "./components/playbacktoggleoverlay": 41,
          "./components/recommendationoverlay": 42,
          "./components/seekbar": 44,
          "./components/seekbarlabel": 47,
          "./components/settingspanel": 49,
          "./components/settingspanelitem": 50,
          "./components/settingspanelpage": 51,
          "./components/settingspanelpageopenbutton": 54,
          "./components/settingstogglebutton": 55,
          "./components/spacer": 56,
          "./components/subtitlelistbox": 57,
          "./components/subtitleoverlay": 58,
          "./components/subtitleselectbox": 59,
          "./components/subtitlesettings/subtitlesettingslabel": 68,
          "./components/subtitlesettings/subtitlesettingspanelpage": 70,
          "./components/titlebar": 75,
          "./components/uicontainer": 78,
          "./components/videoqualityselectbox": 79,
          "./components/volumeslider": 81,
          "./components/volumetogglebutton": 82,
          "./components/vrtogglebutton": 83,
          "./components/watermark": 84,
          "./localization/i18n": 93,
          "./playerutils": 99,
          "./spatialnavigation/ListNavigationGroup": 100,
          "./spatialnavigation/rootnavigationgroup": 106,
          "./spatialnavigation/spatialnavigation": 108,
          "./uimanager": 117,
        },
      ],
      116: [
        function (require, module, exports) {
          "use strict";
          var __awaiter =
            (this && this.__awaiter) ||
            function (thisArg, _arguments, P, generator) {
              function adopt(value) {
                return value instanceof P
                  ? value
                  : new P(function (resolve) {
                      resolve(value);
                    });
              }
              return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) {
                  try {
                    step(generator.next(value));
                  } catch (e) {
                    reject(e);
                  }
                }
                function rejected(value) {
                  try {
                    step(generator["throw"](value));
                  } catch (e) {
                    reject(e);
                  }
                }
                function step(result) {
                  result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
                }
                step(
                  (generator = generator.apply(
                    thisArg,
                    _arguments || []
                  )).next()
                );
              });
            };
          var __generator =
            (this && this.__generator) ||
            function (thisArg, body) {
              var _ = {
                  label: 0,
                  sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                  },
                  trys: [],
                  ops: [],
                },
                f,
                y,
                t,
                g;
              return (
                (g = { next: verb(0), throw: verb(1), return: verb(2) }),
                typeof Symbol === "function" &&
                  (g[Symbol.iterator] = function () {
                    return this;
                  }),
                g
              );
              function verb(n) {
                return function (v) {
                  return step([n, v]);
                };
              }
              function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while ((g && ((g = 0), op[0] && (_ = 0)), _))
                  try {
                    if (
                      ((f = 1),
                      y &&
                        (t =
                          op[0] & 2
                            ? y["return"]
                            : op[0]
                            ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                            : y.next) &&
                        !(t = t.call(y, op[1])).done)
                    )
                      return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                      case 0:
                      case 1:
                        t = op;
                        break;
                      case 4:
                        _.label++;
                        return { value: op[1], done: false };
                      case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                      case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                      default:
                        if (
                          !((t = _.trys),
                          (t = t.length > 0 && t[t.length - 1])) &&
                          (op[0] === 6 || op[0] === 2)
                        ) {
                          _ = 0;
                          continue;
                        }
                        if (
                          op[0] === 3 &&
                          (!t || (op[1] > t[0] && op[1] < t[3]))
                        ) {
                          _.label = op[1];
                          break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                          _.label = t[1];
                          t = op;
                          break;
                        }
                        if (t && _.label < t[2]) {
                          _.label = t[2];
                          _.ops.push(op);
                          break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                  } catch (e) {
                    op = [6, e];
                    y = 0;
                  } finally {
                    f = t = 0;
                  }
                if (op[0] & 5) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
              }
            };
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.UIFactoryCustom = void 0;
          var subtitleoverlay_1 = require("./components/subtitleoverlay");
          var settingspanelpage_1 = require("./components/settingspanelpage");
          var settingspanelitem_1 = require("./components/settingspanelitem");
          var videoqualityselectbox_1 = require("./components/videoqualityselectbox");
          var playbackspeedselectbox_1 = require("./components/playbackspeedselectbox");
          var audiotrackselectbox_1 = require("./components/audiotrackselectbox");
          var audioqualityselectbox_1 = require("./components/audioqualityselectbox");
          var settingspanel_1 = require("./components/settingspanel");
          var subtitlesettingspanelpage_1 = require("./components/subtitlesettings/subtitlesettingspanelpage");
          var settingspanelpageopenbutton_1 = require("./components/settingspanelpageopenbutton");
          var subtitlelistbox_1 = require("./components/subtitlelistbox");
          var subtitlesettingslabel_1 = require("./components/subtitlesettings/subtitlesettingslabel");
          var subtitleselectbox_1 = require("./components/subtitleselectbox");
          var controlbar_1 = require("./components/controlbar");
          var container_1 = require("./components/container");
          var playbacktimelabel_1 = require("./components/playbacktimelabel");
          var seekbar_1 = require("./components/seekbar");
          var seekbarlabel_1 = require("./components/seekbarlabel");
          var playbacktogglebutton_1 = require("./components/playbacktogglebutton");
          var volumetogglebutton_1 = require("./components/volumetogglebutton");
          var volumeslider_1 = require("./components/volumeslider");
          var spacer_1 = require("./components/spacer");
          var airplaytogglebutton_1 = require("./components/airplaytogglebutton");
          var casttogglebutton_1 = require("./components/casttogglebutton");
          var vrtogglebutton_1 = require("./components/vrtogglebutton");
          var settingstogglebutton_1 = require("./components/settingstogglebutton");
          var fullscreentogglebutton_1 = require("./components/fullscreentogglebutton");
          var uicontainer_1 = require("./components/uicontainer");
          var bufferingoverlay_1 = require("./components/custom/bufferingoverlay");
          var playbacktoggleoverlay_1 = require("./components/playbacktoggleoverlay");
          var caststatusoverlay_1 = require("./components/caststatusoverlay");
          var titlebar_1 = require("./components/titlebar");
          var recommendationoverlaycustom_1 = require("./components/custom/recommendationoverlaycustom");
          var upnextitem_1 = require("./components/custom/upnextitem");
          var errormessageoverlay_1 = require("./components/errormessageoverlay");
          var adclickoverlay_1 = require("./components/adclickoverlay");
          var admessagelabel_1 = require("./components/admessagelabel");
          var adskipbutton_1 = require("./components/custom/adskipbutton");
          var playerutils_1 = require("./playerutils");
          var i18n_1 = require("./localization/i18n");
          var button_1 = require("./components/button");
          var togglebutton_1 = require("./components/togglebutton");
          // import { UIConfig } from './uiconfig';
          var uimanager_1 = require("./uimanager");
          var controlsoverlay_1 = require("./components/custom/controlsoverlay");
          var playbacktimelabel_2 = require("./components/custom/playbacktimelabel");
          var UIFactoryCustom;
          (function (UIFactoryCustom) {
            function buildModernUI(player, config) {
              if (config === void 0) {
                config = {};
              }
              return new uimanager_1.UIManager(
                player,
                [
                  {
                    ui: customAdsUI(),
                    condition: function (context) {
                      return context.isAd && context.adRequiresUi;
                    },
                  },
                  {
                    ui: makeCustomUI(player, config),
                    condition: function (context) {
                      return !context.isAd && !context.adRequiresUi;
                    },
                  },
                ],
                config
              );
            }
            UIFactoryCustom.buildModernUI = buildModernUI;
            function makeCustomUI(player, config) {
              var mainSettingsPanelPage =
                new settingspanelpage_1.SettingsPanelPage({
                  components: [
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer("settings.video.quality"),
                      new videoqualityselectbox_1.VideoQualitySelectBox()
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer("settings.audio.quality"),
                      new audioqualityselectbox_1.AudioQualitySelectBox()
                    ),
                    new settingspanelitem_1.SettingsPanelItem(
                      i18n_1.i18n.getLocalizer("settings.audio.track"),
                      new audiotrackselectbox_1.AudioTrackSelectBox()
                    ),
                  ],
                });
              var settingsPanel = new settingspanel_1.SettingsPanel({
                components: [mainSettingsPanelPage],
                hidden: true,
              });
              // subtitols accessibles des de la icona de configuracio
              var subtitleOverlay = new subtitleoverlay_1.SubtitleOverlay();
              var subtitleSettingsPanelPage =
                new subtitlesettingspanelpage_1.SubtitleSettingsPanelPage({
                  settingsPanel: settingsPanel,
                  overlay: subtitleOverlay,
                });
              var subtitleSelectBox =
                new subtitleselectbox_1.SubtitleSelectBox();
              var subtitleSettingsOpenButton =
                new settingspanelpageopenbutton_1.SettingsPanelPageOpenButton({
                  targetPage: subtitleSettingsPanelPage,
                  container: settingsPanel,
                  ariaLabel: i18n_1.i18n.getLocalizer("settings.subtitles"),
                  text: i18n_1.i18n.getLocalizer("open"),
                });
              mainSettingsPanelPage.addComponent(
                new settingspanelitem_1.SettingsPanelItem(
                  new subtitlesettingslabel_1.SubtitleSettingsLabel({
                    text: i18n_1.i18n.getLocalizer("settings.subtitles"),
                    opener: subtitleSettingsOpenButton,
                  }),
                  subtitleSelectBox,
                  {
                    role: "menubar",
                  }
                )
              );
              settingsPanel.addComponent(subtitleSettingsPanelPage);
              // afegir velocitat com a opcio de configuracio
              mainSettingsPanelPage.addComponent(
                new settingspanelitem_1.SettingsPanelItem(
                  i18n_1.i18n.getLocalizer("speed"),
                  new playbackspeedselectbox_1.PlaybackSpeedSelectBox()
                )
              );
              // subtitols accessibles des del seu propi boto a la barra de control (nomes idioma)
              var subtitleListBox = new subtitlelistbox_1.SubtitleListBox();
              var subtitleListBoxSettingsPanelPage =
                new settingspanelpage_1.SettingsPanelPage({
                  components: [
                    new settingspanelitem_1.SettingsPanelItem(
                      null,
                      subtitleListBox
                    ),
                  ],
                });
              var subtitleSettingsPanel = new settingspanel_1.SettingsPanel({
                components: [subtitleListBoxSettingsPanelPage],
                hidden: true,
                pageTransitionAnimation: false,
                cssClasses: ["ui-settings-subtitles"],
              });
              var subtitlesToggleButton =
                new settingstogglebutton_1.SettingsToggleButton({
                  settingsPanel: subtitleSettingsPanel,
                  ariaLabel: i18n_1.i18n.getLocalizer("settings.subtitles"),
                  text: i18n_1.i18n.getLocalizer("settings.subtitles"),
                  cssClasses: ["ui-subtitlesettingstogglebutton"],
                });
              // resta de botons de la barra de control
              var rewindButton = new button_1.Button({
                cssClasses: ["ui-rewindbutton", "ui-button"],
              });
              rewindButton.onClick.subscribe(function () {
                player.seek(Math.max(0, player.getCurrentTime() - 10));
              });
              var forwardButton = new button_1.Button({
                cssClasses: ["ui-forwardbutton", "ui-button"],
              });
              forwardButton.onClick.subscribe(function () {
                player.seek(
                  Math.min(player.getDuration(), player.getCurrentTime() + 10)
                );
              });
              var recommendationOverlay =
                new recommendationoverlaycustom_1.RecommendationOverlay(
                  {},
                  player
                );
              var hideRecommendations = !(
                config.recommendations && config.recommendations.length > 0
              );
              var mosaicButton = new button_1.Button({
                hidden: hideRecommendations,
                cssClasses: ["ui-mosaicbutton", "ui-button"],
                ariaLabel: i18n_1.i18n.getLocalizer("settings.moreVideos"),
                text: i18n_1.i18n.getLocalizer("settings.moreVideos"),
              });
              mosaicButton.onClick.subscribe(function () {
                recommendationOverlay.openMosaic();
              });
              var pipButton = new togglebutton_1.ToggleButton({
                ariaLabel: i18n_1.i18n.getLocalizer("pictureInPicture"),
                text: i18n_1.i18n.getLocalizer("pictureInPicture"),
                cssClass: "ui-piptogglebutton",
              });
              pipButton.onClick.subscribe(function () {
                return __awaiter(this, void 0, void 0, function () {
                  var error_1;
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (
                          !(
                            player.getVideoElement() !==
                            document.pictureInPictureElement
                          )
                        )
                          return [3 /*break*/, 2];
                        return [
                          4 /*yield*/,
                          player.getVideoElement().requestPictureInPicture(),
                        ];
                      case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                      case 2:
                        return [4 /*yield*/, document.exitPictureInPicture()];
                      case 3:
                        _a.sent();
                        _a.label = 4;
                      case 4:
                        return [3 /*break*/, 6];
                      case 5:
                        error_1 = _a.sent();
                        console.log("" + error_1);
                        return [3 /*break*/, 6];
                      case 6:
                        return [2 /*return*/];
                    }
                  });
                });
              });
              var popupButton = new button_1.Button({
                cssClasses: ["ui-popupbutton", "ui-button"],
                ariaLabel: i18n_1.i18n.getLocalizer("settings.audio.popup"),
                text: i18n_1.i18n.getLocalizer("settings.audio.popup"),
              });
              popupButton.onClick.subscribe(function () {
                var event = new CustomEvent("openPopup");
                dispatchEvent(event);
                player.pause();
              });
              var controlBarBottomComponents = [
                new controlsoverlay_1.ControlsOverlay(),
                new volumetogglebutton_1.VolumeToggleButton(),
                new volumeslider_1.VolumeSlider(),
                new spacer_1.Spacer(),
                subtitlesToggleButton,
                new settingstogglebutton_1.SettingsToggleButton({
                  settingsPanel: settingsPanel,
                }),
                popupButton,
                mosaicButton,
                pipButton,
                new fullscreentogglebutton_1.FullscreenToggleButton(),
                new casttogglebutton_1.CastToggleButton(),
                new airplaytogglebutton_1.AirPlayToggleButton(),
                new vrtogglebutton_1.VRToggleButton(),
              ];
              var controlBar = new controlbar_1.ControlBar({
                components: [
                  subtitleSettingsPanel,
                  settingsPanel,
                  new container_1.Container({
                    components: [
                      new playbacktimelabel_2.PlaybackTimeLabel({
                        timeLabelMode:
                          playbacktimelabel_1.PlaybackTimeLabelMode.CurrentTime,
                        hideInLivePlayback: true,
                      }),
                      new seekbar_1.SeekBar({
                        label: new seekbarlabel_1.SeekBarLabel(),
                      }),
                      new playbacktimelabel_2.PlaybackTimeLabel({
                        timeLabelMode:
                          playbacktimelabel_1.PlaybackTimeLabelMode.TotalTime,
                        cssClasses: ["text-right"],
                      }),
                    ],
                    cssClasses: ["controlbar-top"],
                  }),
                  new container_1.Container({
                    components: controlBarBottomComponents,
                    cssClasses: ["controlbar-bottom"],
                  }),
                ],
              });
              return new uicontainer_1.UIContainer({
                components: [
                  subtitleOverlay,
                  new bufferingoverlay_1.BufferingOverlay(),
                  new playbacktoggleoverlay_1.PlaybackToggleOverlay(),
                  new caststatusoverlay_1.CastStatusOverlay(),
                  new upnextitem_1.UpnextItem(config.nextItem),
                  controlBar,
                  new titlebar_1.TitleBar(),
                  recommendationOverlay,
                  new errormessageoverlay_1.ErrorMessageOverlay(),
                ],
                hideDelay: 2000,
                hidePlayerStateExceptions: [
                  playerutils_1.PlayerUtils.PlayerState.Prepared,
                  playerutils_1.PlayerUtils.PlayerState.Paused,
                  playerutils_1.PlayerUtils.PlayerState.Finished,
                ],
              });
            }
            /****************************************************/
            // ads ui
            /****************************************************/
            function makeCustomAdsUI(isMobile) {
              var controlBarBottomComponents = [
                new playbacktogglebutton_1.PlaybackToggleButton(),
                new volumetogglebutton_1.VolumeToggleButton(),
                new volumeslider_1.VolumeSlider(),
                new spacer_1.Spacer(),
              ];
              if (!isMobile) {
                controlBarBottomComponents.push(
                  new fullscreentogglebutton_1.FullscreenToggleButton()
                );
              }
              return new uicontainer_1.UIContainer({
                components: [
                  new bufferingoverlay_1.BufferingOverlay(),
                  new adclickoverlay_1.AdClickOverlay(),
                  new playbacktoggleoverlay_1.PlaybackToggleOverlay(),
                  new container_1.Container({
                    components: [
                      new admessagelabel_1.AdMessageLabel({
                        text: i18n_1.i18n.getLocalizer("ads.remainingTime"),
                      }),
                      new adskipbutton_1.AdSkipButton(),
                    ],
                    cssClass: "ui-ads-status",
                  }),
                  new controlbar_1.ControlBar({
                    components: [
                      new container_1.Container({
                        components: controlBarBottomComponents,
                        cssClasses: ["controlbar-bottom"],
                      }),
                    ],
                  }),
                ],
                cssClasses: ["ui-skin-ads"],
                hideDelay: -1,
                hidePlayerStateExceptions: [
                  playerutils_1.PlayerUtils.PlayerState.Prepared,
                  playerutils_1.PlayerUtils.PlayerState.Paused,
                  playerutils_1.PlayerUtils.PlayerState.Finished,
                ],
              });
            }
            // mobile ads ui: no fullscreen
            function customEmbedMobileAdsUI() {
              return makeCustomAdsUI(true);
            }
            UIFactoryCustom.customEmbedMobileAdsUI = customEmbedMobileAdsUI;
            // ads ui
            function customAdsUI() {
              return makeCustomAdsUI(false);
            }
            UIFactoryCustom.customAdsUI = customAdsUI;
          })(
            (UIFactoryCustom =
              exports.UIFactoryCustom || (exports.UIFactoryCustom = {}))
          );
        },
        {
          "./components/adclickoverlay": 4,
          "./components/admessagelabel": 5,
          "./components/airplaytogglebutton": 7,
          "./components/audioqualityselectbox": 8,
          "./components/audiotrackselectbox": 10,
          "./components/button": 12,
          "./components/caststatusoverlay": 13,
          "./components/casttogglebutton": 14,
          "./components/container": 19,
          "./components/controlbar": 20,
          "./components/custom/adskipbutton": 22,
          "./components/custom/bufferingoverlay": 23,
          "./components/custom/controlsoverlay": 24,
          "./components/custom/playbacktimelabel": 25,
          "./components/custom/recommendationoverlaycustom": 26,
          "./components/custom/upnextitem": 27,
          "./components/errormessageoverlay": 28,
          "./components/fullscreentogglebutton": 29,
          "./components/playbackspeedselectbox": 38,
          "./components/playbacktimelabel": 39,
          "./components/playbacktogglebutton": 40,
          "./components/playbacktoggleoverlay": 41,
          "./components/seekbar": 44,
          "./components/seekbarlabel": 47,
          "./components/settingspanel": 49,
          "./components/settingspanelitem": 50,
          "./components/settingspanelpage": 51,
          "./components/settingspanelpageopenbutton": 54,
          "./components/settingstogglebutton": 55,
          "./components/spacer": 56,
          "./components/subtitlelistbox": 57,
          "./components/subtitleoverlay": 58,
          "./components/subtitleselectbox": 59,
          "./components/subtitlesettings/subtitlesettingslabel": 68,
          "./components/subtitlesettings/subtitlesettingspanelpage": 70,
          "./components/titlebar": 75,
          "./components/togglebutton": 76,
          "./components/uicontainer": 78,
          "./components/videoqualityselectbox": 79,
          "./components/volumeslider": 81,
          "./components/volumetogglebutton": 82,
          "./components/vrtogglebutton": 83,
          "./localization/i18n": 93,
          "./playerutils": 99,
          "./uimanager": 117,
        },
      ],
      117: [
        function (require, module, exports) {
          "use strict";
          var __extends =
            (this && this.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b)
                      if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                if (typeof b !== "function" && b !== null)
                  throw new TypeError(
                    "Class extends value " +
                      String(b) +
                      " is not a constructor or null"
                  );
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          var __assign =
            (this && this.__assign) ||
            function () {
              __assign =
                Object.assign ||
                function (t) {
                  for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s)
                      if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                  }
                  return t;
                };
              return __assign.apply(this, arguments);
            };
          var __spreadArray =
            (this && this.__spreadArray) ||
            function (to, from, pack) {
              if (pack || arguments.length === 2)
                for (var i = 0, l = from.length, ar; i < l; i++) {
                  if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                  }
                }
              return to.concat(ar || Array.prototype.slice.call(from));
            };
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.PlayerWrapper =
            exports.UIInstanceManager =
            exports.UIManager =
              void 0;
          var uicontainer_1 = require("./components/uicontainer");
          var dom_1 = require("./dom");
          var container_1 = require("./components/container");
          var eventdispatcher_1 = require("./eventdispatcher");
          var uiutils_1 = require("./uiutils");
          var arrayutils_1 = require("./arrayutils");
          var browserutils_1 = require("./browserutils");
          var volumecontroller_1 = require("./volumecontroller");
          var i18n_1 = require("./localization/i18n");
          var focusvisibilitytracker_1 = require("./focusvisibilitytracker");
          var mobilev3playerapi_1 = require("./mobilev3playerapi");
          var UIManager = /** @class */ (function () {
            function UIManager(player, playerUiOrUiVariants, uiconfig) {
              if (uiconfig === void 0) {
                uiconfig = {};
              }
              var _this = this;
              this.events = {
                onUiVariantResolve: new eventdispatcher_1.EventDispatcher(),
                onActiveUiChanged: new eventdispatcher_1.EventDispatcher(),
              };
              if (playerUiOrUiVariants instanceof uicontainer_1.UIContainer) {
                // Single-UI constructor has been called, transform arguments to UIVariant[] signature
                var playerUi = playerUiOrUiVariants;
                var uiVariants = [];
                // Add the default player UI
                uiVariants.push({ ui: playerUi });
                this.uiVariants = uiVariants;
              } else {
                // Default constructor (UIVariant[]) has been called
                this.uiVariants = playerUiOrUiVariants;
              }
              this.player = player;
              this.managerPlayerWrapper = new PlayerWrapper(player);
              // ensure that at least the metadata object does exist in the uiconfig
              uiconfig.metadata = uiconfig.metadata ? uiconfig.metadata : {};
              this.config = __assign(
                __assign(
                  {
                    playbackSpeedSelectionEnabled: true,
                    autoUiVariantResolve: true,
                    disableAutoHideWhenHovered: false,
                    enableSeekPreview: true,
                  },
                  uiconfig
                ),
                {
                  events: {
                    onUpdated: new eventdispatcher_1.EventDispatcher(),
                  },
                  volumeController: new volumecontroller_1.VolumeController(
                    this.managerPlayerWrapper.getPlayer()
                  ),
                }
              );
              /**
               * Gathers configuration data from the UI config and player source config and creates a merged UI config
               * that is used throughout the UI instance.
               */
              var updateConfig = function () {
                var playerSourceConfig = player.getSource() || {};
                _this.config.metadata = JSON.parse(
                  JSON.stringify(uiconfig.metadata || {})
                );
                // Extract the UI-related config properties from the source config
                var playerSourceUiConfig = {
                  metadata: {
                    // TODO move metadata into source.metadata namespace in player v8
                    title: playerSourceConfig.title,
                    description: playerSourceConfig.description,
                    markers: playerSourceConfig.markers,
                  },
                  recommendations: playerSourceConfig.recommendations,
                };
                // Player source config takes precedence over the UI config, because the config in the source is attached
                // to a source which changes with every player.load, whereas the UI config stays the same for the whole
                // lifetime of the player instance.
                _this.config.metadata.title =
                  playerSourceUiConfig.metadata.title ||
                  uiconfig.metadata.title;
                _this.config.metadata.description =
                  playerSourceUiConfig.metadata.description ||
                  uiconfig.metadata.description;
                _this.config.metadata.markers =
                  playerSourceUiConfig.metadata.markers ||
                  uiconfig.metadata.markers ||
                  [];
                _this.config.recommendations =
                  playerSourceUiConfig.recommendations ||
                  uiconfig.recommendations ||
                  [];
              };
              updateConfig();
              // Update the source configuration when a new source is loaded and dispatch onUpdated
              var updateSource = function () {
                updateConfig();
                _this.config.events.onUpdated.dispatch(_this);
              };
              var wrappedPlayer = this.managerPlayerWrapper.getPlayer();
              wrappedPlayer.on(
                this.player.exports.PlayerEvent.SourceLoaded,
                updateSource
              );
              // The PlaylistTransition event is only available on Mobile v3 for now.
              // This event is fired when a new source becomes active in the player.
              if ((0, mobilev3playerapi_1.isMobileV3PlayerAPI)(wrappedPlayer)) {
                wrappedPlayer.on(
                  mobilev3playerapi_1.MobileV3PlayerEvent.PlaylistTransition,
                  updateSource
                );
              }
              if (uiconfig.container) {
                // Unfortunately "uiContainerElement = new DOM(config.container)" will not accept the container with
                // string|HTMLElement type directly, although it accepts both types, so we need to spit these two cases up here.
                // TODO check in upcoming TS versions if the container can be passed in directly, or fix the constructor
                this.uiContainerElement =
                  uiconfig.container instanceof HTMLElement
                    ? new dom_1.DOM(uiconfig.container)
                    : new dom_1.DOM(uiconfig.container);
              } else {
                this.uiContainerElement = new dom_1.DOM(player.getContainer());
              }
              // Create UI instance managers for the UI variants
              // The instance managers map to the corresponding UI variants by their array index
              this.uiInstanceManagers = [];
              var uiVariantsWithoutCondition = [];
              for (var _i = 0, _a = this.uiVariants; _i < _a.length; _i++) {
                var uiVariant = _a[_i];
                if (uiVariant.condition == null) {
                  // Collect variants without conditions for error checking
                  uiVariantsWithoutCondition.push(uiVariant);
                }
                // Create the instance manager for a UI variant
                this.uiInstanceManagers.push(
                  new InternalUIInstanceManager(
                    player,
                    uiVariant.ui,
                    this.config,
                    uiVariant.spatialNavigation
                  )
                );
              }
              // Make sure that there is only one UI variant without a condition
              // It does not make sense to have multiple variants without condition, because only the first one in the list
              // (the one with the lowest index) will ever be selected.
              if (uiVariantsWithoutCondition.length > 1) {
                throw Error(
                  "Too many UIs without a condition: You cannot have more than one default UI"
                );
              }
              // Make sure that the default UI variant, if defined, is at the end of the list (last index)
              // If it comes earlier, the variants with conditions that come afterwards will never be selected because the
              // default variant without a condition always evaluates to 'true'
              if (
                uiVariantsWithoutCondition.length > 0 &&
                uiVariantsWithoutCondition[0] !==
                  this.uiVariants[this.uiVariants.length - 1]
              ) {
                throw Error(
                  "Invalid UI variant order: the default UI (without condition) must be at the end of the list"
                );
              }
              var adStartedEvent = null; // keep the event stored here during ad playback
              // Dynamically select a UI variant that matches the current UI condition.
              var resolveUiVariant = function (event) {
                // Make sure that the AdStarted event data is persisted through ad playback in case other events happen
                // in the meantime, e.g. player resize. We need to store this data because there is no other way to find out
                // ad details while an ad is playing (in v8.0 at least; from v8.1 there will be ads.getActiveAd()).
                // Existing event data signals that an ad is currently active (instead of ads.isLinearAdActive()).
                if (event != null) {
                  switch (event.type) {
                    // The ads UI is shown upon the first AdStarted event. Subsequent AdStarted events within an ad break
                    // will not change the condition context and thus not lead to undesired UI variant resolving.
                    // The ads UI is shown upon AdStarted instead of AdBreakStarted because there can be a loading delay
                    // between these two events in the player, and the AdBreakStarted event does not carry any metadata to
                    // initialize the ads UI, so it would be rendered in an uninitialized state for a certain amount of time.
                    // TODO show ads UI upon AdBreakStarted and display loading overlay between AdBreakStarted and first AdStarted
                    // TODO display loading overlay between AdFinished and next AdStarted
                    case player.exports.PlayerEvent.AdStarted:
                      adStartedEvent = event;
                      break;
                    // The ads UI is hidden only when the ad break is finished, i.e. not on AdFinished events. This way we keep
                    // the ads UI variant active throughout an ad break, as reacting to AdFinished would lead to undesired UI
                    // variant switching between two ads in an ad break, e.g. ads UI -> AdFinished -> content UI ->
                    // AdStarted -> ads UI.
                    case player.exports.PlayerEvent.AdBreakFinished:
                      adStartedEvent = null;
                      // When switching to a variant for the first time, a config.events.onUpdated event is fired to trigger a UI
                      // update of the new variant, because most components subscribe to this event to update themselves. When
                      // switching to the ads UI on the first AdStarted, all UI variants update themselves with the ad data, so
                      // when switching back to the "normal" UI it will carry properties of the ad instead of the main content.
                      // We thus fire this event here to force an UI update with the properties of the main content. This is
                      // basically a hack because the config.events.onUpdated event is abused in many places and not just used
                      // for config updates (e.g. adding a marker to the seekbar).
                      // TODO introduce an event that is fired when the playback content is updated, a switch to/from ads
                      _this.config.events.onUpdated.dispatch(_this);
                      break;
                    // When a new source is loaded during ad playback, there will be no Ad(Break)Finished event
                    case player.exports.PlayerEvent.SourceLoaded:
                    case player.exports.PlayerEvent.SourceUnloaded:
                      adStartedEvent = null;
                      break;
                  }
                }
                // Detect if an ad has started
                var isAd = adStartedEvent != null;
                var adRequiresUi = false;
                if (isAd) {
                  var ad = adStartedEvent.ad;
                  // for now only linear ads can request a UI
                  if (ad.isLinear) {
                    var linearAd = ad;
                    adRequiresUi =
                      (linearAd.uiConfig && linearAd.uiConfig.requestsUi) ||
                      false;
                  }
                }
                if (adRequiresUi) {
                  // we dispatch onUpdated event because if there are multiple adBreaks for same position
                  // `Play` and `Playing` events will not be dispatched which will cause `PlaybackButton` state
                  // to be out of sync
                  _this.config.events.onUpdated.dispatch(_this);
                }
                _this.resolveUiVariant(
                  {
                    isAd: isAd,
                    adRequiresUi: adRequiresUi,
                  },
                  function (context) {
                    // If this is an ad UI, we need to relay the saved ON_AD_STARTED event data so ad components can configure
                    // themselves for the current ad.
                    if (context.isAd) {
                      /* Relay the ON_AD_STARTED event to the ads UI
                       *
                       * Because the ads UI is initialized in the ON_AD_STARTED handler, i.e. when the ON_AD_STARTED event has
                       * already been fired, components in the ads UI that listen for the ON_AD_STARTED event never receive it.
                       * Since this can break functionality of components that rely on this event, we relay the event to the
                       * ads UI components with the following call.
                       */
                      _this.currentUi
                        .getWrappedPlayer()
                        .fireEventInUI(
                          _this.player.exports.PlayerEvent.AdStarted,
                          adStartedEvent
                        );
                    }
                  }
                );
              };
              // Listen to the following events to trigger UI variant resolution
              if (this.config.autoUiVariantResolve) {
                this.managerPlayerWrapper
                  .getPlayer()
                  .on(
                    this.player.exports.PlayerEvent.SourceLoaded,
                    resolveUiVariant
                  );
                this.managerPlayerWrapper
                  .getPlayer()
                  .on(
                    this.player.exports.PlayerEvent.SourceUnloaded,
                    resolveUiVariant
                  );
                this.managerPlayerWrapper
                  .getPlayer()
                  .on(this.player.exports.PlayerEvent.Play, resolveUiVariant);
                this.managerPlayerWrapper
                  .getPlayer()
                  .on(this.player.exports.PlayerEvent.Paused, resolveUiVariant);
                this.managerPlayerWrapper
                  .getPlayer()
                  .on(
                    this.player.exports.PlayerEvent.AdStarted,
                    resolveUiVariant
                  );
                this.managerPlayerWrapper
                  .getPlayer()
                  .on(
                    this.player.exports.PlayerEvent.AdBreakFinished,
                    resolveUiVariant
                  );
                this.managerPlayerWrapper
                  .getPlayer()
                  .on(
                    this.player.exports.PlayerEvent.PlayerResized,
                    resolveUiVariant
                  );
                this.managerPlayerWrapper
                  .getPlayer()
                  .on(
                    this.player.exports.PlayerEvent.ViewModeChanged,
                    resolveUiVariant
                  );
              }
              this.focusVisibilityTracker =
                new focusvisibilitytracker_1.FocusVisibilityTracker("bmpui");
              // Initialize the UI
              resolveUiVariant(null);
            }
            /**
             * Exposes i18n.getLocalizer() function
             * @returns {I18nApi.getLocalizer()}
             */
            UIManager.localize = function (key) {
              return i18n_1.i18n.getLocalizer(key);
            };
            /**
             * Provide configuration to support Custom UI languages
             * default language: 'en'
             */
            UIManager.setLocalizationConfig = function (localizationConfig) {
              i18n_1.i18n.setConfig(localizationConfig);
            };
            UIManager.prototype.getConfig = function () {
              return this.config;
            };
            /**
             * Returns the list of UI variants as passed into the constructor of {@link UIManager}.
             * @returns {UIVariant[]} the list of available UI variants
             */
            UIManager.prototype.getUiVariants = function () {
              return this.uiVariants;
            };
            /**
             * Switches to a UI variant from the list returned by {@link getUiVariants}.
             * @param {UIVariant} uiVariant the UI variant to switch to
             * @param {() => void} onShow a callback that is executed just before the new UI variant is shown
             */
            UIManager.prototype.switchToUiVariant = function (
              uiVariant,
              onShow
            ) {
              var uiVariantIndex = this.uiVariants.indexOf(uiVariant);
              var previousUi = this.currentUi;
              var nextUi = this.uiInstanceManagers[uiVariantIndex];
              // Determine if the UI variant is changing
              // Only if the UI variant is changing, we need to do some stuff. Else we just leave everything as-is.
              if (nextUi === this.currentUi) {
                return;
                // console.log('switched from ', this.currentUi ? this.currentUi.getUI() : 'none',
                //   ' to ', nextUi ? nextUi.getUI() : 'none');
              }
              // Hide the currently active UI variant
              if (this.currentUi) {
                this.currentUi.getUI().hide();
              }
              // Assign the new UI variant as current UI
              this.currentUi = nextUi;
              // When we switch to a different UI instance, there's some additional stuff to manage. If we do not switch
              // to an instance, we're done here.
              if (this.currentUi == null) {
                return;
              }
              // Add the UI to the DOM (and configure it) the first time it is selected
              if (!this.currentUi.isConfigured()) {
                this.addUi(this.currentUi);
                // ensure that the internal state is ready for the upcoming show call
                if (!this.currentUi.getUI().isHidden()) {
                  this.currentUi.getUI().hide();
                }
              }
              if (onShow) {
                onShow();
              }
              this.currentUi.getUI().show();
              this.events.onActiveUiChanged.dispatch(this, {
                previousUi: previousUi,
                currentUi: nextUi,
              });
            };
            /**
             * Triggers a UI variant switch as triggered by events when automatic switching is enabled. It allows to overwrite
             * properties of the {@link UIConditionContext}.
             * @param {Partial<UIConditionContext>} context an optional set of properties that overwrite properties of the
             *   automatically determined context
             * @param {(context: UIConditionContext) => void} onShow a callback that is executed just before the new UI variant
             *   is shown (if a switch is happening)
             */
            UIManager.prototype.resolveUiVariant = function (context, onShow) {
              if (context === void 0) {
                context = {};
              }
              // Determine the current context for which the UI variant will be resolved
              var defaultContext = {
                isAd: false,
                adRequiresUi: false,
                isFullscreen:
                  this.player.getViewMode() ===
                  this.player.exports.ViewMode.Fullscreen,
                isMobile: browserutils_1.BrowserUtils.isMobile,
                isPlaying: this.player.isPlaying(),
                width: this.uiContainerElement.width(),
                documentWidth: document.body.clientWidth,
              };
              // Overwrite properties of the default context with passed in context properties
              var switchingContext = __assign(
                __assign({}, defaultContext),
                context
              );
              // Fire the event and allow modification of the context before it is used to resolve the UI variant
              this.events.onUiVariantResolve.dispatch(this, switchingContext);
              var nextUiVariant = null;
              // Select new UI variant
              // If no variant condition is fulfilled, we switch to *no* UI
              for (var _i = 0, _a = this.uiVariants; _i < _a.length; _i++) {
                var uiVariant = _a[_i];
                var matchesCondition =
                  uiVariant.condition == null ||
                  uiVariant.condition(switchingContext) === true;
                if (nextUiVariant == null && matchesCondition) {
                  nextUiVariant = uiVariant;
                } else {
                  // hide all UIs besides the one which should be active
                  uiVariant.ui.hide();
                }
              }
              this.switchToUiVariant(nextUiVariant, function () {
                if (onShow) {
                  onShow(switchingContext);
                }
              });
            };
            UIManager.prototype.addUi = function (ui) {
              var dom = ui.getUI().getDomElement();
              var player = ui.getWrappedPlayer();
              ui.configureControls();
              /* Append the UI DOM after configuration to avoid CSS transitions at initialization
               * Example: Components are hidden during configuration and these hides may trigger CSS transitions that are
               * undesirable at this time. */
              this.uiContainerElement.append(dom);
              // When the UI is loaded after a source was loaded, we need to tell the components to initialize themselves
              if (player.getSource()) {
                this.config.events.onUpdated.dispatch(this);
              }
              // Fire onConfigured after UI DOM elements are successfully added. When fired immediately, the DOM elements
              // might not be fully configured and e.g. do not have a size.
              // https://swizec.com/blog/how-to-properly-wait-for-dom-elements-to-show-up-in-modern-browsers/swizec/6663
              if (window.requestAnimationFrame) {
                requestAnimationFrame(function () {
                  ui.onConfigured.dispatch(ui.getUI());
                });
              } else {
                // IE9 fallback
                setTimeout(function () {
                  ui.onConfigured.dispatch(ui.getUI());
                }, 0);
              }
            };
            UIManager.prototype.releaseUi = function (ui) {
              ui.releaseControls();
              var uiContainer = ui.getUI();
              if (uiContainer.hasDomElement()) {
                uiContainer.getDomElement().remove();
              }
              ui.clearEventHandlers();
            };
            UIManager.prototype.release = function () {
              for (
                var _i = 0, _a = this.uiInstanceManagers;
                _i < _a.length;
                _i++
              ) {
                var uiInstanceManager = _a[_i];
                this.releaseUi(uiInstanceManager);
              }
              this.managerPlayerWrapper.clearEventHandlers();
              this.focusVisibilityTracker.release();
            };
            Object.defineProperty(UIManager.prototype, "onUiVariantResolve", {
              /**
               * Fires just before UI variants are about to be resolved and the UI variant is possibly switched. It is fired when
               * the switch is triggered from an automatic switch and when calling {@link resolveUiVariant}.
               * Can be used to modify the {@link UIConditionContext} before resolving is done.
               * @returns {EventDispatcher<UIManager, UIConditionContext>}
               */
              get: function () {
                return this.events.onUiVariantResolve;
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(UIManager.prototype, "onActiveUiChanged", {
              /**
               * Fires after the UIManager has switched to a different UI variant.
               * @returns {EventDispatcher<UIManager, ActiveUiChangedArgs>}
               */
              get: function () {
                return this.events.onActiveUiChanged;
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(UIManager.prototype, "activeUi", {
              /**
               * The current active {@link UIInstanceManager}.
               */
              get: function () {
                return this.currentUi;
              },
              enumerable: false,
              configurable: true,
            });
            /**
             * Returns the list of all added markers in undefined order.
             */
            UIManager.prototype.getTimelineMarkers = function () {
              return this.config.metadata.markers;
            };
            /**
             * Adds a marker to the timeline. Does not check for duplicates/overlaps at the `time`.
             */
            UIManager.prototype.addTimelineMarker = function (timelineMarker) {
              this.config.metadata.markers.push(timelineMarker);
              this.config.events.onUpdated.dispatch(this);
            };
            /**
             * Removes a marker from the timeline (by reference) and returns `true` if the marker has
             * been part of the timeline and successfully removed, or `false` if the marker could not
             * be found and thus not removed.
             */
            UIManager.prototype.removeTimelineMarker = function (
              timelineMarker
            ) {
              if (
                arrayutils_1.ArrayUtils.remove(
                  this.config.metadata.markers,
                  timelineMarker
                ) === timelineMarker
              ) {
                this.config.events.onUpdated.dispatch(this);
                return true;
              }
              return false;
            };
            return UIManager;
          })();
          exports.UIManager = UIManager;
          /**
           * Encapsulates functionality to manage a UI instance. Used by the {@link UIManager} to manage multiple UI instances.
           */
          var UIInstanceManager = /** @class */ (function () {
            function UIInstanceManager(player, ui, config, spatialNavigation) {
              this.events = {
                onConfigured: new eventdispatcher_1.EventDispatcher(),
                onSeek: new eventdispatcher_1.EventDispatcher(),
                onSeekPreview: new eventdispatcher_1.EventDispatcher(),
                onSeeked: new eventdispatcher_1.EventDispatcher(),
                onComponentShow: new eventdispatcher_1.EventDispatcher(),
                onComponentHide: new eventdispatcher_1.EventDispatcher(),
                onControlsShow: new eventdispatcher_1.EventDispatcher(),
                onPreviewControlsHide: new eventdispatcher_1.EventDispatcher(),
                onControlsHide: new eventdispatcher_1.EventDispatcher(),
                onRelease: new eventdispatcher_1.EventDispatcher(),
              };
              this.playerWrapper = new PlayerWrapper(player);
              this.ui = ui;
              this.config = config;
              this.spatialNavigation = spatialNavigation;
            }
            UIInstanceManager.prototype.getConfig = function () {
              return this.config;
            };
            UIInstanceManager.prototype.getUI = function () {
              return this.ui;
            };
            UIInstanceManager.prototype.getPlayer = function () {
              return this.playerWrapper.getPlayer();
            };
            Object.defineProperty(UIInstanceManager.prototype, "onConfigured", {
              /**
               * Fires when the UI is fully configured and added to the DOM.
               * @returns {EventDispatcher}
               */
              get: function () {
                return this.events.onConfigured;
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(UIInstanceManager.prototype, "onSeek", {
              /**
               * Fires when a seek starts.
               * @returns {EventDispatcher}
               */
              get: function () {
                return this.events.onSeek;
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(
              UIInstanceManager.prototype,
              "onSeekPreview",
              {
                /**
                 * Fires when the seek timeline is scrubbed.
                 * @returns {EventDispatcher}
                 */
                get: function () {
                  return this.events.onSeekPreview;
                },
                enumerable: false,
                configurable: true,
              }
            );
            Object.defineProperty(UIInstanceManager.prototype, "onSeeked", {
              /**
               * Fires when a seek is finished.
               * @returns {EventDispatcher}
               */
              get: function () {
                return this.events.onSeeked;
              },
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(
              UIInstanceManager.prototype,
              "onComponentShow",
              {
                /**
                 * Fires when a component is showing.
                 * @returns {EventDispatcher}
                 */
                get: function () {
                  return this.events.onComponentShow;
                },
                enumerable: false,
                configurable: true,
              }
            );
            Object.defineProperty(
              UIInstanceManager.prototype,
              "onComponentHide",
              {
                /**
                 * Fires when a component is hiding.
                 * @returns {EventDispatcher}
                 */
                get: function () {
                  return this.events.onComponentHide;
                },
                enumerable: false,
                configurable: true,
              }
            );
            Object.defineProperty(
              UIInstanceManager.prototype,
              "onControlsShow",
              {
                /**
                 * Fires when the UI controls are showing.
                 * @returns {EventDispatcher}
                 */
                get: function () {
                  return this.events.onControlsShow;
                },
                enumerable: false,
                configurable: true,
              }
            );
            Object.defineProperty(
              UIInstanceManager.prototype,
              "onPreviewControlsHide",
              {
                /**
                 * Fires before the UI controls are hiding to check if they are allowed to hide.
                 * @returns {EventDispatcher}
                 */
                get: function () {
                  return this.events.onPreviewControlsHide;
                },
                enumerable: false,
                configurable: true,
              }
            );
            Object.defineProperty(
              UIInstanceManager.prototype,
              "onControlsHide",
              {
                /**
                 * Fires when the UI controls are hiding.
                 * @returns {EventDispatcher}
                 */
                get: function () {
                  return this.events.onControlsHide;
                },
                enumerable: false,
                configurable: true,
              }
            );
            Object.defineProperty(UIInstanceManager.prototype, "onRelease", {
              /**
               * Fires when the UI controls are released.
               * @returns {EventDispatcher}
               */
              get: function () {
                return this.events.onRelease;
              },
              enumerable: false,
              configurable: true,
            });
            UIInstanceManager.prototype.clearEventHandlers = function () {
              this.playerWrapper.clearEventHandlers();
              var events = this.events; // avoid TS7017
              for (var event_1 in events) {
                var dispatcher = events[event_1];
                dispatcher.unsubscribeAll();
              }
            };
            return UIInstanceManager;
          })();
          exports.UIInstanceManager = UIInstanceManager;
          /**
           * Extends the {@link UIInstanceManager} for internal use in the {@link UIManager} and provides access to functionality
           * that components receiving a reference to the {@link UIInstanceManager} should not have access to.
           */
          var InternalUIInstanceManager = /** @class */ (function (_super) {
            __extends(InternalUIInstanceManager, _super);
            function InternalUIInstanceManager() {
              return (_super !== null && _super.apply(this, arguments)) || this;
            }
            InternalUIInstanceManager.prototype.getWrappedPlayer = function () {
              // TODO find a non-hacky way to provide the WrappedPlayer to the UIManager without exporting it
              // getPlayer() actually returns the WrappedPlayer but its return type is set to Player so the WrappedPlayer does
              // not need to be exported
              return this.getPlayer();
            };
            InternalUIInstanceManager.prototype.configureControls =
              function () {
                this.configureControlsTree(this.getUI());
                this.configured = true;
              };
            InternalUIInstanceManager.prototype.isConfigured = function () {
              return this.configured;
            };
            InternalUIInstanceManager.prototype.configureControlsTree =
              function (component) {
                var _this = this;
                var configuredComponents = [];
                uiutils_1.UIUtils.traverseTree(component, function (component) {
                  // First, check if we have already configured a component, and throw an error if we did. Multiple configuration
                  // of the same component leads to unexpected UI behavior. Also, a component that is in the UI tree multiple
                  // times hints at a wrong UI structure.
                  // We could just skip configuration in such a case and not throw an exception, but enforcing a clean UI tree
                  // seems like the better choice.
                  for (
                    var _i = 0, configuredComponents_1 = configuredComponents;
                    _i < configuredComponents_1.length;
                    _i++
                  ) {
                    var configuredComponent = configuredComponents_1[_i];
                    if (configuredComponent === component) {
                      // Write the component to the console to simplify identification of the culprit
                      // (e.g. by inspecting the config)
                      if (console) {
                        console.error(
                          "Circular reference in UI tree",
                          component
                        );
                      }
                      // Additionally throw an error, because this case must not happen and leads to unexpected UI behavior.
                      throw Error(
                        "Circular reference in UI tree: " +
                          component.constructor.name
                      );
                    }
                  }
                  component.initialize();
                  component.configure(_this.getPlayer(), _this);
                  configuredComponents.push(component);
                });
              };
            InternalUIInstanceManager.prototype.releaseControls = function () {
              var _a;
              // Do not call release methods if the components have never been configured; this can result in exceptions
              if (this.configured) {
                this.onRelease.dispatch(this.getUI());
                this.releaseControlsTree(this.getUI());
                this.configured = false;
              }
              (_a = this.spatialNavigation) === null || _a === void 0
                ? void 0
                : _a.release();
              this.released = true;
            };
            InternalUIInstanceManager.prototype.isReleased = function () {
              return this.released;
            };
            InternalUIInstanceManager.prototype.releaseControlsTree = function (
              component
            ) {
              component.release();
              if (component instanceof container_1.Container) {
                for (
                  var _i = 0, _a = component.getComponents();
                  _i < _a.length;
                  _i++
                ) {
                  var childComponent = _a[_i];
                  this.releaseControlsTree(childComponent);
                }
              }
            };
            InternalUIInstanceManager.prototype.clearEventHandlers =
              function () {
                _super.prototype.clearEventHandlers.call(this);
              };
            return InternalUIInstanceManager;
          })(UIInstanceManager);
          /**
           * Wraps the player to track event handlers and provide a simple method to remove all registered event
           * handlers from the player.
           */
          var PlayerWrapper = /** @class */ (function () {
            function PlayerWrapper(player) {
              var _this = this;
              this.eventHandlers = {};
              this.player = player;
              // Collect all members of the player (public API methods and properties of the player)
              var objectProtoPropertyNames = Object.getOwnPropertyNames(
                Object.getPrototypeOf({})
              );
              var namesToIgnore = __spreadArray(
                ["constructor"],
                objectProtoPropertyNames,
                true
              );
              var members = getAllPropertyNames(player).filter(function (name) {
                return namesToIgnore.indexOf(name) === -1;
              });
              // Split the members into methods and properties
              var methods = [];
              var properties = [];
              for (
                var _i = 0, members_1 = members;
                _i < members_1.length;
                _i++
              ) {
                var member = members_1[_i];
                if (typeof player[member] === "function") {
                  methods.push(member);
                } else {
                  properties.push(member);
                }
              }
              // Create wrapper object
              var wrapper = {};
              var _loop_1 = function (method) {
                wrapper[method] = function () {
                  // console.log('called ' + member); // track method calls on the player
                  return player[method].apply(player, arguments);
                };
              };
              // Add function wrappers for all API methods that do nothing but calling the base method on the player
              for (
                var _a = 0, methods_1 = methods;
                _a < methods_1.length;
                _a++
              ) {
                var method = methods_1[_a];
                _loop_1(method);
              }
              var _loop_2 = function (property) {
                // Get an eventually existing property descriptor to differentiate between plain properties and properties with
                // getters/setters.
                var propertyDescriptor = (function (target) {
                  while (target) {
                    var propertyDescriptor_1 = Object.getOwnPropertyDescriptor(
                      target,
                      property
                    );
                    if (propertyDescriptor_1) {
                      return propertyDescriptor_1;
                    }
                    // Check if the PropertyDescriptor exists on a child prototype in case we have an inheritance of the player
                    target = Object.getPrototypeOf(target);
                  }
                })(player);
                // If the property has getters/setters, wrap them accordingly...
                if (
                  propertyDescriptor &&
                  (propertyDescriptor.get || propertyDescriptor.set)
                ) {
                  Object.defineProperty(wrapper, property, {
                    get: function () {
                      return propertyDescriptor.get.call(player);
                    },
                    set: function (value) {
                      return propertyDescriptor.set.call(player, value);
                    },
                  });
                }
                // ... else just transfer the property to the wrapper
                else {
                  wrapper[property] = player[property];
                }
              };
              // Add all public properties of the player to the wrapper
              for (
                var _b = 0, properties_1 = properties;
                _b < properties_1.length;
                _b++
              ) {
                var property = properties_1[_b];
                _loop_2(property);
              }
              // Explicitly add a wrapper method for 'on' that adds added event handlers to the event list
              wrapper.on = function (eventType, callback) {
                player.on(eventType, callback);
                if (!_this.eventHandlers[eventType]) {
                  _this.eventHandlers[eventType] = [];
                }
                _this.eventHandlers[eventType].push(callback);
                return wrapper;
              };
              // Explicitly add a wrapper method for 'off' that removes removed event handlers from the event list
              wrapper.off = function (eventType, callback) {
                player.off(eventType, callback);
                if (_this.eventHandlers[eventType]) {
                  arrayutils_1.ArrayUtils.remove(
                    _this.eventHandlers[eventType],
                    callback
                  );
                }
                return wrapper;
              };
              wrapper.fireEventInUI = function (event, data) {
                if (_this.eventHandlers[event]) {
                  // check if there are handlers for this event registered
                  // Extend the data object with default values to convert it to a {@link PlayerEventBase} object.
                  var playerEventData = Object.assign(
                    {},
                    {
                      timestamp: Date.now(),
                      type: event,
                      // Add a marker property so the UI can detect UI-internal player events
                      uiSourced: true,
                    },
                    data
                  );
                  // Execute the registered callbacks
                  for (
                    var _i = 0, _a = _this.eventHandlers[event];
                    _i < _a.length;
                    _i++
                  ) {
                    var callback = _a[_i];
                    callback(playerEventData);
                  }
                }
              };
              this.wrapper = wrapper;
            }
            /**
             * Returns a wrapped player object that can be used on place of the normal player object.
             * @returns {WrappedPlayer} a wrapped player
             */
            PlayerWrapper.prototype.getPlayer = function () {
              return this.wrapper;
            };
            /**
             * Clears all registered event handlers from the player that were added through the wrapped player.
             */
            PlayerWrapper.prototype.clearEventHandlers = function () {
              try {
                // Call the player API to check if the instance is still valid or already destroyed.
                // This can be any call throwing the PlayerAPINotAvailableError when the player instance is destroyed.
                this.player.getSource();
              } catch (error) {
                if (
                  error instanceof
                  this.player.exports.PlayerAPINotAvailableError
                ) {
                  // We have detected that the player instance is already destroyed, so we clear the event handlers to avoid
                  // event handler unsubscription attempts (which would result in PlayerAPINotAvailableError errors).
                  this.eventHandlers = {};
                }
              }
              for (var eventType in this.eventHandlers) {
                for (
                  var _i = 0, _a = this.eventHandlers[eventType];
                  _i < _a.length;
                  _i++
                ) {
                  var callback = _a[_i];
                  this.player.off(eventType, callback);
                }
              }
            };
            return PlayerWrapper;
          })();
          exports.PlayerWrapper = PlayerWrapper;
          function getAllPropertyNames(target) {
            var names = [];
            while (target) {
              var newNames = Object.getOwnPropertyNames(target).filter(
                function (name) {
                  return names.indexOf(name) === -1;
                }
              );
              names = names.concat(newNames);
              // go up prototype chain
              target = Object.getPrototypeOf(target);
            }
            return names;
          }
        },
        {
          "./arrayutils": 1,
          "./browserutils": 3,
          "./components/container": 19,
          "./components/uicontainer": 78,
          "./dom": 86,
          "./eventdispatcher": 88,
          "./focusvisibilitytracker": 89,
          "./localization/i18n": 93,
          "./mobilev3playerapi": 98,
          "./uiutils": 118,
          "./volumecontroller": 119,
        },
      ],
      118: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.UIUtils = void 0;
          var container_1 = require("./components/container");
          var UIUtils;
          (function (UIUtils) {
            function traverseTree(component, visit) {
              var recursiveTreeWalker = function (component, parent) {
                visit(component, parent);
                // If the current component is a container, visit it's children
                if (component instanceof container_1.Container) {
                  for (
                    var _i = 0, _a = component.getComponents();
                    _i < _a.length;
                    _i++
                  ) {
                    var childComponent = _a[_i];
                    recursiveTreeWalker(childComponent, component);
                  }
                }
              };
              // Walk and configure the component tree
              recursiveTreeWalker(component);
            }
            UIUtils.traverseTree = traverseTree;
            // From: https://github.com/nfriend/ts-keycode-enum/blob/master/Key.enum.ts
            var KeyCode;
            (function (KeyCode) {
              KeyCode[(KeyCode["LeftArrow"] = 37)] = "LeftArrow";
              KeyCode[(KeyCode["UpArrow"] = 38)] = "UpArrow";
              KeyCode[(KeyCode["RightArrow"] = 39)] = "RightArrow";
              KeyCode[(KeyCode["DownArrow"] = 40)] = "DownArrow";
              KeyCode[(KeyCode["Space"] = 32)] = "Space";
              KeyCode[(KeyCode["End"] = 35)] = "End";
              KeyCode[(KeyCode["Home"] = 36)] = "Home";
            })((KeyCode = UIUtils.KeyCode || (UIUtils.KeyCode = {})));
          })((UIUtils = exports.UIUtils || (exports.UIUtils = {})));
        },
        { "./components/container": 19 },
      ],
      119: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.VolumeTransition = exports.VolumeController = void 0;
          var eventdispatcher_1 = require("./eventdispatcher");
          /**
           * Can be used to centrally manage and control the volume and mute state of the player from multiple components.
           */
          var VolumeController = (exports.VolumeController =
            /** @class */ (function () {
              function VolumeController(player) {
                var _this = this;
                this.player = player;
                this.events = {
                  onChanged: new eventdispatcher_1.EventDispatcher(),
                };
                this.storeVolume();
                var handler = function () {
                  _this.onChangedEvent();
                };
                player.on(player.exports.PlayerEvent.SourceLoaded, handler);
                player.on(player.exports.PlayerEvent.VolumeChanged, handler);
                player.on(player.exports.PlayerEvent.Muted, handler);
                player.on(player.exports.PlayerEvent.Unmuted, handler);
              }
              VolumeController.prototype.setVolume = function (volume) {
                this.player.setVolume(volume, VolumeController.issuerName);
              };
              VolumeController.prototype.getVolume = function () {
                return this.player.getVolume();
              };
              VolumeController.prototype.setMuted = function (muted) {
                if (muted) {
                  this.player.mute(VolumeController.issuerName);
                } else {
                  this.player.unmute(VolumeController.issuerName);
                }
              };
              VolumeController.prototype.toggleMuted = function () {
                if (this.isMuted() || this.getVolume() === 0) {
                  // Unmuting from the mute or zero-volume state recalls the previously saved volume setting. Setting the
                  // volume automatically unmutes the player in v7.
                  this.recallVolume();
                } else {
                  this.setMuted(true);
                }
              };
              VolumeController.prototype.isMuted = function () {
                return this.player.isMuted();
              };
              /**
               * Stores (saves) the current volume so it can later be restored with {@link recallVolume}.
               */
              VolumeController.prototype.storeVolume = function () {
                this.storedVolume = this.getVolume();
              };
              /**
               * Recalls (sets) the volume previously stored with {@link storeVolume}.
               */
              VolumeController.prototype.recallVolume = function () {
                this.setMuted(this.storedVolume === 0);
                this.setVolume(this.storedVolume);
              };
              VolumeController.prototype.startTransition = function () {
                return new VolumeTransition(this);
              };
              VolumeController.prototype.onChangedEvent = function () {
                var playerMuted = this.isMuted();
                var playerVolume = this.getVolume();
                var uiMuted = playerMuted || playerVolume === 0;
                var uiVolume = playerMuted ? 0 : playerVolume;
                this.storeVolume();
                this.events.onChanged.dispatch(this, {
                  volume: uiVolume,
                  muted: uiMuted,
                });
              };
              Object.defineProperty(VolumeController.prototype, "onChanged", {
                /**
                 * Gets the event that is fired when the volume settings have changed.
                 */
                get: function () {
                  return this.events.onChanged.getEvent();
                },
                enumerable: false,
                configurable: true,
              });
              VolumeController.issuerName = "ui-volumecontroller";
              return VolumeController;
            })());
          var VolumeTransition = /** @class */ (function () {
            function VolumeTransition(controller) {
              this.controller = controller;
              // Store the volume at the beginning of a volume change so we can recall it later in case we set the volume to
              // zero and actually mute the player.
              controller.storeVolume();
            }
            VolumeTransition.prototype.update = function (volume) {
              // Update the volume while transitioning so the user has a "live preview" of the desired target volume
              this.controller.setMuted(false);
              this.controller.setVolume(volume);
            };
            VolumeTransition.prototype.finish = function (volume) {
              if (volume === 0) {
                // When the volume is zero we essentially mute the volume so we recall the volume from the beginning of the
                // transition and mute the player instead. Recalling is necessary to return to the actual audio volume
                // when unmuting.
                // We must first recall the volume and then mute, because recalling sets the volume on the player
                // and setting a player volume > 0 unmutes the player in v7.
                this.controller.recallVolume();
                this.controller.setMuted(true);
              } else {
                this.controller.setMuted(false);
                this.controller.setVolume(volume);
                this.controller.storeVolume();
              }
            };
            return VolumeTransition;
          })();
          exports.VolumeTransition = VolumeTransition;
        },
        { "./eventdispatcher": 88 },
      ],
      120: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.VttUtils = void 0;
          // Our default height of a line
          var lineHeight = 28;
          // Default relative line height
          var lineHeightPercent = 5;
          var lineCount = 1;
          var defaultLineNumber = 21; // Our default amount of lines
          var Direction;
          (function (Direction) {
            Direction["Top"] = "top";
            Direction["Bottom"] = "bottom";
            Direction["Left"] = "left";
            Direction["Right"] = "right";
          })(Direction || (Direction = {}));
          var VttVerticalWriting;
          (function (VttVerticalWriting) {
            VttVerticalWriting["GrowingRight"] = "lr";
            VttVerticalWriting["GrowingLeft"] = "rl";
          })(VttVerticalWriting || (VttVerticalWriting = {}));
          var DirectionPair = new Map([
            [Direction.Top, Direction.Bottom],
            [Direction.Bottom, Direction.Top],
            [Direction.Left, Direction.Right],
            [Direction.Right, Direction.Left],
          ]);
          /**
           * Sets the default standardized styles for the Cue Box
           * https://w3.org/TR/webvtt1/#applying-css-properties
           */
          var setDefaultVttStyles = function (cueContainerDom, vtt) {
            if (vtt.region) {
              cueContainerDom.css("position", "relative");
              cueContainerDom.css("unicode-bidi", "plaintext");
            } else {
              cueContainerDom.css("position", "absolute");
              cueContainerDom.css("overflow-wrap", "break-word");
              cueContainerDom.css("overflow", "hidden");
              cueContainerDom.css("flex-flow", "column");
            }
            cueContainerDom.css("display", "inline-flex");
          };
          /**
           * Align the Cue Box's line
           * https://w3.org/TR/webvtt1/#webvtt-cue-line-alignment
           */
          var setVttLineAlign = function (
            cueContainerDom,
            _a,
            direction,
            relativeCueBoxPosition
          ) {
            var lineAlign = _a.lineAlign;
            switch (lineAlign) {
              case "center":
                setCssForCenterLineAlign(
                  cueContainerDom,
                  direction,
                  relativeCueBoxPosition
                );
                break;
              case "end":
                setCssForEndLineAlign(
                  cueContainerDom,
                  direction,
                  relativeCueBoxPosition
                );
            }
          };
          /**
           * Defines the line positioning of the Cue Box
           * https://w3.org/TR/webvtt1/#webvtt-cue-line
           */
          var setVttLine = function (
            cueContainerDom,
            vtt,
            direction,
            subtitleOverLaySize
          ) {
            var overlayReferenceEdge = DirectionPair.get(direction);
            if (vtt.line === "auto" && vtt.vertical) {
              cueContainerDom.css(overlayReferenceEdge, "0");
              return;
            }
            if (vtt.line === "auto" && !vtt.vertical) {
              return;
            }
            var relativeLinePosition = parseFloat(vtt.line);
            if (vtt.snapToLines) {
              var targetLine = Number(vtt.line);
              if (targetLine < 0) {
                targetLine = defaultLineNumber + targetLine;
              }
              var lineHeight_1 = subtitleOverLaySize.height / defaultLineNumber;
              var absoluteLinePosition = lineHeight_1 * targetLine;
              relativeLinePosition =
                (100 * absoluteLinePosition) / subtitleOverLaySize.height;
            }
            if (vtt.lineAlign !== "end")
              cueContainerDom.css(
                overlayReferenceEdge,
                "".concat(relativeLinePosition, "%")
              );
            setVttLineAlign(
              cueContainerDom,
              vtt,
              direction,
              relativeLinePosition
            );
          };
          /**
           * Defines the writing direction of the Cue Box
           * https://w3.org/TR/webvtt1/#webvtt-cue-writing-direction
           */
          var setVttWritingDirectionAndCueBoxPositioning = function (
            cueContainerDom,
            vtt,
            subtitleOverlaySize
          ) {
            switch (vtt.vertical) {
              case "":
                cueContainerDom.css("writing-mode", "horizontal-tb");
                cueContainerDom.css(Direction.Bottom, "0");
                setVttLine(
                  cueContainerDom,
                  vtt,
                  Direction.Bottom,
                  subtitleOverlaySize
                );
                break;
              case VttVerticalWriting.GrowingRight:
                setCueBoxPositionForVerticalWriting(
                  cueContainerDom,
                  Direction.Right,
                  vtt,
                  subtitleOverlaySize
                );
                break;
              case VttVerticalWriting.GrowingLeft:
                setCueBoxPositionForVerticalWriting(
                  cueContainerDom,
                  Direction.Left,
                  vtt,
                  subtitleOverlaySize
                );
                break;
            }
          };
          var setCueBoxPositionForVerticalWriting = function (
            cueContainerDom,
            direction,
            vtt,
            subtitleOverlaySize
          ) {
            var writingMode =
              direction === Direction.Right ? "vertical-lr" : "vertical-rl";
            cueContainerDom.css("writing-mode", writingMode);
            cueContainerDom.css(Direction.Top, "0");
            setVttLine(cueContainerDom, vtt, direction, subtitleOverlaySize);
          };
          /**
           * Defines the Cue position alignment
           * https://w3.org/TR/webvtt1/#webvtt-cue-position-alignment
           */
          var setVttPositionAlign = function (cueContainerDom, vtt, direction) {
            // https://www.w3.org/TR/webvtt1/#webvtt-cue-position
            if (vtt.position === "auto") {
              cueContainerDom.css(direction, "0");
            } else {
              switch (vtt.positionAlign) {
                case "line-left":
                  cueContainerDom.css(direction, "".concat(vtt.position, "%"));
                  cueContainerDom.css(DirectionPair.get(direction), "auto");
                  cueContainerDom.css("justify-content", "flex-start");
                  break;
                case "center":
                  cueContainerDom.css(
                    direction,
                    "".concat(vtt.position - vtt.size / 2, "%")
                  );
                  cueContainerDom.css(DirectionPair.get(direction), "auto");
                  cueContainerDom.css("justify-content", "center");
                  break;
                case "line-right":
                  cueContainerDom.css(direction, "auto");
                  cueContainerDom.css(
                    DirectionPair.get(direction),
                    "".concat(100 - vtt.position, "%")
                  );
                  cueContainerDom.css("justify-content", "flex-end");
                  break;
                default:
                  cueContainerDom.css(direction, "".concat(vtt.position, "%"));
                  cueContainerDom.css("justify-content", "flex-start");
              }
            }
          };
          var countLines = function (innerHtml) {
            return innerHtml.split("<br />").length;
          };
          var setCssForCenterLineAlign = function (
            cueContainerDom,
            direction,
            relativeCueBoxPosition
          ) {
            switch (direction) {
              case Direction.Bottom:
                cueContainerDom.css("transform", "translateY(-50%)");
                break;
              case Direction.Left:
                cueContainerDom.css("transform", "translateX(50%)");
                break;
              case Direction.Right:
                cueContainerDom.css("transform", "translateX(-50%)");
                break;
            }
          };
          var setCssForEndLineAlign = function (
            cueContainerDom,
            direction,
            offset
          ) {
            var opositeToOverlayReferenceEdge = direction;
            cueContainerDom.css(
              opositeToOverlayReferenceEdge,
              "".concat(100 - offset, "%")
            );
          };
          var VttUtils;
          (function (VttUtils) {
            VttUtils.setVttCueBoxStyles = function (
              cueContainer,
              subtitleOverlaySize
            ) {
              var vtt = cueContainer.vtt;
              var cueContainerDom = cueContainer.getDomElement();
              setDefaultVttStyles(cueContainerDom, vtt);
              lineCount = countLines(cueContainer.getText());
              setVttWritingDirectionAndCueBoxPositioning(
                cueContainerDom,
                vtt,
                subtitleOverlaySize
              );
              // https://w3.org/TR/webvtt1/#webvtt-cue-text-alignment
              var textAlign = vtt.align === "middle" ? "center" : vtt.align;
              cueContainerDom.css("text-align", textAlign);
              // https://w3.org/TR/webvtt1/#webvtt-cue-size
              var containerSize = vtt.size;
              if (vtt.vertical === "") {
                cueContainerDom.css("width", "".concat(containerSize, "%"));
                setVttPositionAlign(cueContainerDom, vtt, Direction.Left);
              } else {
                cueContainerDom.css("height", "".concat(containerSize, "%"));
                setVttPositionAlign(cueContainerDom, vtt, Direction.Top);
              }
            };
            /** https://www.w3.org/TR/webvtt1/#regions
             *  https://www.speechpad.com/captions/webvtt#toc_16
             */
            VttUtils.setVttRegionStyles = function (
              regionContainer,
              region,
              overlaySize
            ) {
              var regionContainerDom = regionContainer.getDomElement();
              var regionPositionX =
                (overlaySize.width * region.viewportAnchorX) / 100 -
                (((overlaySize.width * region.width) / 100) *
                  region.regionAnchorX) /
                  100;
              var regionPositionY =
                (overlaySize.height * region.viewportAnchorY) / 100 -
                (region.lines * lineHeight * region.regionAnchorY) / 100;
              regionContainerDom.css("position", "absolute");
              regionContainerDom.css("overflow", "hidden");
              regionContainerDom.css("width", "".concat(region.width, "%"));
              regionContainerDom.css(
                Direction.Left,
                "".concat(regionPositionX, "px")
              );
              regionContainerDom.css(Direction.Right, "unset");
              regionContainerDom.css(
                Direction.Top,
                "".concat(regionPositionY, "px")
              );
              regionContainerDom.css(Direction.Bottom, "unset");
              regionContainerDom.css(
                "height",
                "".concat(region.lines * lineHeight, "px")
              );
            };
          })((VttUtils = exports.VttUtils || (exports.VttUtils = {})));
        },
        {},
      ],
    },
    {},
    [97]
  )(97);
});
