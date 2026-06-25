/*2026-06-25 10h08*/
!(function (e) {
  var t;
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
      ? define([], e)
      : ((
          (t =
            'undefined' != typeof window
              ? window
              : 'undefined' != typeof global
                ? global
                : 'undefined' != typeof self
                  ? self
                  : this).bitmovin || (t.bitmovin = {})
        ).playerui = e());
})(function () {
  return (function o(i, r, s) {
    function a(t, e) {
      if (!r[t]) {
        if (!i[t]) {
          var n = 'function' == typeof require && require;
          if (!e && n) return n(t, !0);
          if (l) return l(t, !0);
          throw (((e = new Error("Cannot find module '" + t + "'")).code = 'MODULE_NOT_FOUND'), e);
        }
        ((n = r[t] = { exports: {} }),
          i[t][0].call(
            n.exports,
            function (e) {
              return a(i[t][1][e] || e);
            },
            n,
            n.exports,
            o,
            i,
            r,
            s,
          ));
      }
      return r[t].exports;
    }
    for (var l = 'function' == typeof require && require, e = 0; e < s.length; e++) a(s[e]);
    return a;
  })(
    {
      1: [
        function (e, t, n) {
          var o;
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.ArrayUtils = void 0),
            ((o || (n.ArrayUtils = {})).remove = function (e, t) {
              return -1 < (t = e.indexOf(t)) ? e.splice(t, 1)[0] : null;
            }));
        },
        {},
      ],
      2: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }), (n.AudioTrackSwitchHandler = void 0));
          var i = e('./localization/i18n');
          function o(e, t, n) {
            var o = this;
            ((this.addAudioTrack = function (e) {
              e = e.track;
              o.listElement.hasItem(e.id) || o.listElement.addItem(e.id, i.i18n.getLocalizer(e.label), !0);
            }),
              (this.removeAudioTrack = function (e) {
                e = e.track;
                o.listElement.hasItem(e.id) && o.listElement.removeItem(e.id);
              }),
              (this.selectCurrentAudioTrack = function () {
                var e = o.player.getAudio();
                e && o.listElement.selectItem(e.id);
              }),
              (this.refreshAudioTracks = function () {
                var e = o.player.getAvailableAudio();
                (o.listElement.synchronizeItems(
                  e.map(function (e) {
                    return { key: e.id, label: e.label };
                  }),
                ),
                  o.selectCurrentAudioTrack());
              }),
              (this.player = e),
              (this.listElement = t),
              (this.uimanager = n),
              this.bindSelectionEvent(),
              this.bindPlayerEvents(),
              this.refreshAudioTracks());
          }
          ((o.prototype.bindSelectionEvent = function () {
            var n = this;
            this.listElement.onItemSelected.subscribe(function (e, t) {
              n.player.setAudio(t);
            });
          }),
            (o.prototype.bindPlayerEvents = function () {
              (this.player.on(this.player.exports.PlayerEvent.AudioChanged, this.selectCurrentAudioTrack),
                this.player.on(this.player.exports.PlayerEvent.SourceUnloaded, this.refreshAudioTracks),
                this.player.on(this.player.exports.PlayerEvent.PeriodSwitched, this.refreshAudioTracks),
                this.player.on(this.player.exports.PlayerEvent.AudioAdded, this.addAudioTrack),
                this.player.on(this.player.exports.PlayerEvent.AudioRemoved, this.removeAudioTrack),
                this.uimanager.getConfig().events.onUpdated.subscribe(this.refreshAudioTracks));
            }),
            (n.AudioTrackSwitchHandler = o));
        },
        { './localization/i18n': 88 },
      ],
      3: [
        function (e, t, n) {
          function o() {}
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.BrowserUtils = void 0),
            Object.defineProperty(o, 'isMobile', {
              get: function () {
                return (
                  !!this.windowExists() && !!(navigator && navigator.userAgent && /Mobi/.test(navigator.userAgent))
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(o, 'isChrome', {
              get: function () {
                return (
                  !!this.windowExists() && !!(navigator && navigator.userAgent && /Chrome/.test(navigator.userAgent))
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(o, 'isAndroid', {
              get: function () {
                return (
                  !!this.windowExists() &&
                  !(!(navigator && navigator.userAgent && /Android/.test(navigator.userAgent)) || this.isHisense)
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(o, 'isIOS', {
              get: function () {
                return (
                  !!this.windowExists() &&
                  !!(navigator && navigator.userAgent && /iPad|iPhone|iPod/.test(navigator.userAgent))
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(o, 'isMacIntel', {
              get: function () {
                return (
                  !!this.windowExists() && !(!navigator || !navigator.userAgent || 'MacIntel' !== navigator.platform)
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(o, 'isHisense', {
              get: function () {
                return (
                  !!this.windowExists() && !!(navigator && navigator.userAgent && /Hisense/.test(navigator.userAgent))
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(o, 'isPlayStation', {
              get: function () {
                return (
                  !!this.windowExists() &&
                  !!(navigator && navigator.userAgent && /PlayStation/i.test(navigator.userAgent))
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(o, 'isWebOs', {
              get: function () {
                return (
                  !!this.windowExists() &&
                  !(
                    !navigator ||
                    !navigator.userAgent ||
                    (!navigator.userAgent.includes('Web0S') && !navigator.userAgent.includes('NetCast'))
                  )
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(o, 'isTizen', {
              get: function () {
                return (
                  !!this.windowExists() && !!(navigator && navigator.userAgent && /Tizen/.test(navigator.userAgent))
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(o, 'isTouchSupported', {
              get: function () {
                var e;
                return (
                  !!this.windowExists() &&
                  ('ontouchstart' in window ||
                    (navigator &&
                      navigator.userAgent &&
                      (0 < navigator.maxTouchPoints || 0 < (null != (e = navigator.msMaxTouchPoints) ? e : 0))))
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            (o.windowExists = function () {
              return 'undefined' != typeof window;
            }),
            (n.BrowserUtils = o));
        },
        {},
      ],
      4: [
        function (e, t, n) {
          var o,
            r,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            e =
              (Object.defineProperty(n, '__esModule', { value: !0 }), (n.AdClickOverlay = void 0), e('./clickoverlay')),
            e =
              ((r = e.ClickOverlay),
              i(s, r),
              (s.prototype.configure = function (e, t) {
                function n() {
                  o.setUrl('');
                }
                var o = this,
                  i = (r.prototype.configure.call(this, e, t), null);
                e.on(e.exports.PlayerEvent.AdStarted, function (e) {
                  var t,
                    e = e.ad;
                  (o.setUrl(null != (t = e.clickThroughUrl) ? t : ''),
                    (i = null != (t = e.clickThroughUrlOpened) ? t : null));
                });
                (e.on(e.exports.PlayerEvent.AdFinished, n),
                  e.on(e.exports.PlayerEvent.AdSkipped, n),
                  e.on(e.exports.PlayerEvent.AdError, n),
                  this.onClick.subscribe(function () {
                    (e.pause('ui-ad-click-overlay'), i && i());
                  }));
              }),
              s);
          function s() {
            return (null !== r && r.apply(this, arguments)) || this;
          }
          n.AdClickOverlay = e;
        },
        { './clickoverlay': 17 },
      ],
      5: [
        function (e, t, n) {
          var o,
            a,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.AdMessageLabel = void 0), e('./label')),
            l = e('../stringutils'),
            c = e('../localization/i18n'),
            e =
              ((a = r.Label),
              i(s, a),
              (s.prototype.configure = function (t, e) {
                function n() {
                  t.off(t.exports.PlayerEvent.TimeChanged, s);
                }
                var o = this,
                  i = (a.prototype.configure.call(this, t, e), this.getConfig()),
                  r = i.text,
                  s = function () {
                    o.setText(l.StringUtils.replaceAdMessagePlaceholders(c.i18n.performLocalization(r), 0, t));
                  };
                (t.on(t.exports.PlayerEvent.AdStarted, function (e) {
                  e = e.ad.uiConfig;
                  ((r = (e && e.message) || i.text), s(), t.on(t.exports.PlayerEvent.TimeChanged, s));
                }),
                  t.on(t.exports.PlayerEvent.AdSkipped, n),
                  t.on(t.exports.PlayerEvent.AdError, n),
                  t.on(t.exports.PlayerEvent.AdFinished, n));
              }),
              s);
          function s(e) {
            var t = a.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-label-ad-message', text: c.i18n.getLocalizer('ads.remainingTime') },
                t.config,
              )),
              t
            );
          }
          n.AdMessageLabel = e;
        },
        { '../localization/i18n': 88, '../stringutils': 108, './label': 27 },
      ],
      6: [
        function (e, t, n) {
          var o,
            c,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.AdSkipButton = void 0), e('./button')),
            u = e('../stringutils'),
            e =
              ((c = r.Button),
              i(s, c),
              (s.prototype.configure = function (n, e) {
                function t() {
                  n.off(n.exports.PlayerEvent.TimeChanged, l);
                }
                var o = this,
                  i = (c.prototype.configure.call(this, n, e), this.getConfig()),
                  r = i.untilSkippableMessage,
                  s = i.skippableMessage,
                  a = -1,
                  l = function () {
                    (o.show(),
                      n.getCurrentTime() < a
                        ? (o.setText(u.StringUtils.replaceAdMessagePlaceholders(null != r ? r : '', a, n)), o.disable())
                        : (o.setText(null != s ? s : ''), o.enable()));
                  };
                (n.on(n.exports.PlayerEvent.AdStarted, function (e) {
                  var t,
                    e = e.ad;
                  ((a = null != (t = e.skippableAfter) ? t : -1),
                    (r = (e.uiConfig && e.uiConfig.untilSkippableMessage) || i.untilSkippableMessage),
                    (s = (e.uiConfig && e.uiConfig.skippableMessage) || i.skippableMessage),
                    'number' == typeof a && 0 <= a ? (l(), n.on(n.exports.PlayerEvent.TimeChanged, l)) : o.hide());
                }),
                  n.on(n.exports.PlayerEvent.AdSkipped, t),
                  n.on(n.exports.PlayerEvent.AdError, t),
                  n.on(n.exports.PlayerEvent.AdFinished, t),
                  this.onClick.subscribe(function () {
                    n.ads.skip();
                  }));
              }),
              s);
          function s(e) {
            var t = c.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                {
                  cssClass: 'ui-button-ad-skip',
                  untilSkippableMessage: 'Skip ad in {remainingTime}',
                  skippableMessage: 'Skip ad',
                },
                t.config,
              )),
              t
            );
          }
          n.AdSkipButton = e;
        },
        { '../stringutils': 108, './button': 13 },
      ],
      7: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.AirPlayToggleButton = void 0),
              e('./togglebutton')),
            a = e('../localization/i18n'),
            e =
              ((i = s.ToggleButton),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                var n,
                  o = this;
                (i.prototype.configure.call(this, e, t),
                  e.isAirplayAvailable
                    ? (this.onClick.subscribe(function () {
                        e.isAirplayAvailable()
                          ? e.showAirplayTargetPicker()
                          : console && console.log('AirPlay unavailable');
                      }),
                      (t = function () {
                        e.isAirplayActive() ? o.on() : o.off();
                      }),
                      e.on(
                        e.exports.PlayerEvent.AirplayAvailable,
                        (n = function () {
                          e.isAirplayAvailable() ? o.show() : o.hide();
                        }),
                      ),
                      e.on(e.exports.PlayerEvent.AirplayChanged, t),
                      n(),
                      t())
                    : this.hide());
              }),
              l);
          function l(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-airplaytogglebutton', text: a.i18n.getLocalizer('appleAirplay') },
                t.config,
              )),
              t
            );
          }
          n.AirPlayToggleButton = e;
        },
        { '../localization/i18n': 88, './togglebutton': 71 },
      ],
      8: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.AudioQualitySelectBox = void 0),
              e('./selectbox')),
            l = e('../localization/i18n'),
            e =
              ((i = s.SelectBox),
              r(a, i),
              (a.prototype.configure = function (r, e) {
                function t() {
                  var e,
                    t = r.getAvailableAudioQualities();
                  (s.clearItems(), s.addItem('auto', l.i18n.getLocalizer('auto')));
                  for (var n = 0, o = t; n < o.length; n++) {
                    var i = o[n];
                    s.addItem(i.id, null != (e = i.label) ? e : i.id);
                  }
                  a();
                }
                var s = this,
                  a =
                    (i.prototype.configure.call(this, r, e),
                    function () {
                      s.selectItem(r.getAudioQuality().id);
                    });
                (this.onItemSelected.subscribe(function (e, t) {
                  r.setAudioQuality(t);
                }),
                  r.on(r.exports.PlayerEvent.AudioChanged, t),
                  r.on(r.exports.PlayerEvent.SourceUnloaded, t),
                  r.on(r.exports.PlayerEvent.PeriodSwitched, t),
                  r.on(r.exports.PlayerEvent.AudioQualityChanged, a),
                  r.exports.PlayerEvent.AudioQualityAdded &&
                    (r.on(r.exports.PlayerEvent.AudioQualityAdded, t),
                    r.on(r.exports.PlayerEvent.AudioQualityRemoved, t)),
                  e.getConfig().events.onUpdated.subscribe(t));
              }),
              a);
          function a(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return ((t.config = t.mergeConfig(e, { cssClasses: ['ui-audioqualityselectbox'] }, t.config)), t);
          }
          n.AudioQualitySelectBox = e;
        },
        { '../localization/i18n': 88, './selectbox': 43 },
      ],
      9: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.AudioTrackListBox = void 0), e('./listbox')),
            a = e('../audiotrackutils'),
            e =
              ((i = s.ListBox),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                (i.prototype.configure.call(this, e, t), new a.AudioTrackSwitchHandler(e, this, t));
              }),
              l);
          function l() {
            return (null !== i && i.apply(this, arguments)) || this;
          }
          n.AudioTrackListBox = e;
        },
        { '../audiotrackutils': 2, './listbox': 28 },
      ],
      10: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.AudioTrackSelectBox = void 0),
              e('./selectbox')),
            a = e('../audiotrackutils'),
            e =
              ((i = s.SelectBox),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                (i.prototype.configure.call(this, e, t), new a.AudioTrackSwitchHandler(e, this, t));
              }),
              l);
          function l(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return ((t.config = t.mergeConfig(e, { cssClasses: ['ui-audiotrackselectbox'] }, t.config)), t);
          }
          n.AudioTrackSelectBox = e;
        },
        { '../audiotrackutils': 2, './selectbox': 43 },
      ],
      11: [
        function (e, t, n) {
          var o,
            s,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.BackButton = void 0), e('./togglebutton')),
            a = e('../localization/i18n'),
            e =
              ((s = r.ToggleButton),
              i(l, s),
              (l.prototype.configure = function (t, e) {
                function n() {
                  t.getViewMode() === t.exports.ViewMode.Fullscreen ? i.on() : i.off();
                }
                function o() {
                  r() ? i.show() : i.hide();
                }
                var i = this,
                  r =
                    (s.prototype.configure.call(this, t, e),
                    function () {
                      return t.isViewModeAvailable(t.exports.ViewMode.Fullscreen);
                    });
                (t.on(t.exports.PlayerEvent.ViewModeChanged, n),
                  t.exports.PlayerEvent.ViewModeAvailabilityChanged &&
                    t.on(t.exports.PlayerEvent.ViewModeAvailabilityChanged, o),
                  e.getConfig().events.onUpdated.subscribe(o),
                  this.onClick.subscribe(function () {
                    var e;
                    r()
                      ? ((e =
                          t.getViewMode() === t.exports.ViewMode.Fullscreen
                            ? t.exports.ViewMode.Inline
                            : t.exports.ViewMode.Fullscreen),
                        t.setViewMode(e))
                      : console && console.log('Fullscreen unavailable');
                  }),
                  o(),
                  n());
              }),
              l);
          function l(e) {
            var t = s.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-backbutton', text: a.i18n.getLocalizer('fullscreen'), role: 'button' },
                t.config,
              )),
              t
            );
          }
          n.BackButton = e;
        },
        { '../localization/i18n': 88, './togglebutton': 71 },
      ],
      12: [
        function (e, t, n) {
          var o,
            s,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r =
              (Object.defineProperty(n, '__esModule', { value: !0 }), (n.BufferingOverlay = void 0), e('./container')),
            a = e('./component'),
            l = e('../timeout'),
            e =
              ((s = r.Container),
              i(c, s),
              (c.prototype.configure = function (e, t) {
                function n() {
                  r.start();
                }
                function o() {
                  (r.clear(), i.hide());
                }
                var i = this,
                  t = (s.prototype.configure.call(this, e, t), this.getConfig()),
                  r = new l.Timeout(null != (t = t.showDelayMs) ? t : 1e3, function () {
                    i.show();
                  });
                (e.on(e.exports.PlayerEvent.StallStarted, n),
                  e.on(e.exports.PlayerEvent.StallEnded, o),
                  e.on(e.exports.PlayerEvent.Play, n),
                  e.on(e.exports.PlayerEvent.Playing, o),
                  e.on(e.exports.PlayerEvent.Paused, o),
                  e.on(e.exports.PlayerEvent.Seek, n),
                  e.on(e.exports.PlayerEvent.Seeked, o),
                  e.on(e.exports.PlayerEvent.TimeShift, n),
                  e.on(e.exports.PlayerEvent.TimeShifted, o),
                  e.on(e.exports.PlayerEvent.SourceUnloaded, o),
                  e.isStalled() && this.show());
              }),
              c);
          function c(e) {
            var t = s.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.indicators = [
                new a.Component({ tag: 'div', cssClass: 'ui-buffering-overlay-indicator', role: 'img' }),
                new a.Component({ tag: 'div', cssClass: 'ui-buffering-overlay-indicator', role: 'img' }),
                new a.Component({ tag: 'div', cssClass: 'ui-buffering-overlay-indicator', role: 'img' }),
              ]),
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-buffering-overlay', hidden: !0, components: t.indicators, showDelayMs: 1e3 },
                t.config,
              )),
              t
            );
          }
          n.BufferingOverlay = e;
        },
        { '../timeout': 110, './component': 19, './container': 20 },
      ],
      13: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.Button = void 0), e('./component')),
            a = e('../dom'),
            l = e('../eventdispatcher'),
            c = e('../localization/i18n'),
            e =
              ((i = s.Component),
              r(u, i),
              (u.prototype.toDomElement = function () {
                var e = this,
                  t = {
                    id: this.config.id,
                    'aria-label': c.i18n.performLocalization(this.config.ariaLabel || this.config.text || ''),
                    class: this.getCssClasses(),
                    type: 'button',
                    'aria-pressed': 'false',
                    tabindex: (null != (t = this.config.tabIndex) ? t : 0).toString(),
                  },
                  t =
                    (null != this.config.role && (t.role = this.config.role),
                    new a.DOM('button', t).append(
                      new a.DOM('span', { class: this.prefixCss('label') }).html(
                        c.i18n.performLocalization(null != (t = this.config.text) ? t : ''),
                      ),
                    ));
                return (
                  t.on('click', function () {
                    e.onClickEvent();
                  }),
                  t
                );
              }),
              (u.prototype.setText = function (e) {
                this.getDomElement()
                  .find('.' + this.prefixCss('label'))
                  .html(c.i18n.performLocalization(e));
              }),
              (u.prototype.onClickEvent = function () {
                this.buttonEvents.onClick.dispatch(this);
              }),
              Object.defineProperty(u.prototype, 'onClick', {
                get: function () {
                  return this.buttonEvents.onClick.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              u);
          function u(e) {
            var t = i.call(this, e) || this;
            return (
              (t.buttonEvents = { onClick: new l.EventDispatcher() }),
              (t.config = t.mergeConfig(e, { cssClass: 'ui-button', role: 'button', tabIndex: 0 }, t.config)),
              t
            );
          }
          n.Button = e;
        },
        { '../dom': 81, '../eventdispatcher': 83, '../localization/i18n': 88, './component': 19 },
      ],
      14: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }), (n.CastStatusOverlay = void 0), e('./container')),
            a = e('./label'),
            l = e('../localization/i18n'),
            e =
              ((i = s.Container),
              r(c, i),
              (c.prototype.configure = function (e, t) {
                var n = this;
                (i.prototype.configure.call(this, e, t),
                  e.on(e.exports.PlayerEvent.CastWaitingForDevice, function (e) {
                    n.show();
                    e = e.castPayload.deviceName;
                    n.statusLabel.setText(l.i18n.getLocalizer('connectingTo', { castDeviceName: e }));
                  }),
                  e.on(e.exports.PlayerEvent.CastStarted, function (e) {
                    n.show();
                    e = e.deviceName;
                    n.statusLabel.setText(l.i18n.getLocalizer('playingOn', { castDeviceName: e }));
                  }),
                  e.on(e.exports.PlayerEvent.CastStopped, function (e) {
                    n.hide();
                  }));
              }),
              c);
          function c(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.statusLabel = new a.Label({ cssClass: 'ui-cast-status-label' })),
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-cast-status-overlay', components: [t.statusLabel], hidden: !0 },
                t.config,
              )),
              t
            );
          }
          n.CastStatusOverlay = e;
        },
        { '../localization/i18n': 88, './container': 20, './label': 27 },
      ],
      15: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.CastToggleButton = void 0),
              e('./togglebutton')),
            a = e('../localization/i18n'),
            e =
              ((i = s.ToggleButton),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                function n() {
                  e.isCastAvailable() ? o.show() : o.hide();
                }
                var o = this;
                (i.prototype.configure.call(this, e, t),
                  this.onClick.subscribe(function () {
                    e.isCastAvailable()
                      ? e.isCasting()
                        ? e.castStop()
                        : e.castVideo()
                      : console && console.log('Cast unavailable');
                  }));
                (e.on(e.exports.PlayerEvent.CastAvailable, n),
                  e.on(e.exports.PlayerEvent.CastWaitingForDevice, function () {
                    o.on();
                  }),
                  e.on(e.exports.PlayerEvent.CastStarted, function () {
                    o.on();
                  }),
                  e.on(e.exports.PlayerEvent.CastStopped, function () {
                    o.off();
                  }),
                  n(),
                  e.isCasting() && this.on());
              }),
              l);
          function l(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-casttogglebutton', text: a.i18n.getLocalizer('googleCast') },
                t.config,
              )),
              t
            );
          }
          n.CastToggleButton = e;
        },
        { '../localization/i18n': 88, './togglebutton': 71 },
      ],
      16: [
        function (e, t, n) {
          var o,
            l,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r =
              (Object.defineProperty(n, '__esModule', { value: !0 }), (n.CastUIContainer = void 0), e('./uicontainer')),
            c = e('../timeout'),
            e =
              ((l = r.UIContainer),
              i(s, l),
              (s.prototype.configure = function (e, t) {
                var n = this,
                  o = (l.prototype.configure.call(this, e, t), this.getConfig()),
                  i = !1,
                  r =
                    ((this.castUiHideTimeout = new c.Timeout(null != (o = o.hideDelay) ? o : 5e3, function () {
                      (t.onControlsHide.dispatch(n), (i = !1));
                    })),
                    function () {
                      i || (t.onControlsShow.dispatch(n), (i = !0));
                    }),
                  s = function () {
                    (r(), n.castUiHideTimeout.clear());
                  },
                  a = function () {
                    (r(), n.castUiHideTimeout.start());
                  };
                (e.on(e.exports.PlayerEvent.Play, a),
                  e.on(e.exports.PlayerEvent.Paused, s),
                  e.on(e.exports.PlayerEvent.Seek, s),
                  e.on(e.exports.PlayerEvent.Seeked, function () {
                    (e.isPlaying() ? a : s)();
                  }),
                  t.getConfig().events.onUpdated.subscribe(a));
              }),
              (s.prototype.release = function () {
                (l.prototype.release.call(this), this.castUiHideTimeout.clear());
              }),
              s);
          function s(e) {
            return l.call(this, e) || this;
          }
          n.CastUIContainer = e;
        },
        { '../timeout': 110, './uicontainer': 73 },
      ],
      17: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            e = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.ClickOverlay = void 0), e('./button')),
            e =
              ((i = e.Button),
              r(s, i),
              (s.prototype.initialize = function () {
                (i.prototype.initialize.call(this), this.setUrl(null != (e = this.config.url) ? e : ''));
                var e,
                  t = this.getDomElement();
                t.on('click', function () {
                  var e;
                  t.data('url') && window.open(null != (e = t.data('url')) ? e : '', '_blank');
                });
              }),
              (s.prototype.getUrl = function () {
                var e;
                return null != (e = this.getDomElement().data('url')) ? e : '';
              }),
              (s.prototype.setUrl = function (e) {
                ((void 0 !== e && null != e) || (e = ''), this.getDomElement().data('url', e));
              }),
              s);
          function s(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return ((t.config = t.mergeConfig(e, { cssClass: 'ui-clickoverlay', role: t.config.role }, t.config)), t);
          }
          n.ClickOverlay = e;
        },
        { './button': 13 },
      ],
      18: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.CloseButton = void 0), e('./button')),
            a = e('../localization/i18n'),
            e =
              ((i = s.Button),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                i.prototype.configure.call(this, e, t);
                var n = this.getConfig();
                this.onClick.subscribe(function () {
                  n.target.hide();
                });
              }),
              l);
          function l(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-closebutton', text: a.i18n.getLocalizer('close') },
                t.config,
              )),
              t
            );
          }
          n.CloseButton = e;
        },
        { '../localization/i18n': 88, './button': 13 },
      ],
      19: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }), (n.Component = void 0));
          var o = e('../guid'),
            i = e('../dom'),
            r = e('../eventdispatcher'),
            s = e('../localization/i18n');
          function a(e) {
            (void 0 === e && (e = {}),
              (this.componentEvents = {
                onShow: new r.EventDispatcher(),
                onHide: new r.EventDispatcher(),
                onHoverChanged: new r.EventDispatcher(),
                onEnabled: new r.EventDispatcher(),
                onDisabled: new r.EventDispatcher(),
              }),
              (this.config = this.mergeConfig(
                e,
                {
                  tag: 'div',
                  id: 'bmpui-id-' + o.Guid.next(),
                  cssPrefix: 'bmpui',
                  cssClass: 'ui-component',
                  cssClasses: [],
                  hidden: !1,
                  disabled: !1,
                },
                {},
              )));
          }
          ((a.prototype.initialize = function () {
            var e;
            ((this.hidden = null != (e = this.config.hidden) && e),
              (this.disabled = null != (e = this.config.disabled) && e),
              this.isHidden() && ((this.hidden = !1), this.hide()),
              this.isDisabled() && ((this.disabled = !1), this.disable()));
          }),
            (a.prototype.configure = function (e, t) {
              var n = this;
              (this.onShow.subscribe(function () {
                t.onComponentShow.dispatch(n);
              }),
                this.onHide.subscribe(function () {
                  t.onComponentHide.dispatch(n);
                }),
                this.getDomElement().on('mouseenter', function () {
                  n.onHoverChangedEvent(!0);
                }),
                this.getDomElement().on('mouseleave', function () {
                  n.onHoverChangedEvent(!1);
                }));
            }),
            (a.prototype.release = function () {}),
            (a.prototype.toDomElement = function () {
              var e;
              return new i.DOM(null != (e = this.config.tag) ? e : 'div', {
                id: this.config.id,
                class: this.getCssClasses(),
                role: null != (e = this.config.role) ? e : '',
              });
            }),
            (a.prototype.getDomElement = function () {
              return (this.element || (this.element = this.toDomElement()), this.element);
            }),
            (a.prototype.hasDomElement = function () {
              return Boolean(this.element);
            }),
            (a.prototype.setAriaLabel = function (e) {
              this.setAriaAttr('label', s.i18n.performLocalization(e));
            }),
            (a.prototype.setAriaAttr = function (e, t) {
              this.getDomElement().attr('aria-'.concat(e), t);
            }),
            (a.prototype.mergeConfig = function (e, t, n) {
              return Object.assign({}, n, t, e);
            }),
            (a.prototype.getCssClasses = function () {
              var t = this;
              return [this.config.cssClass]
                .concat(this.config.cssClasses)
                .map(function (e) {
                  return t.prefixCss(null != e ? e : '');
                })
                .join(' ')
                .trim();
            }),
            (a.prototype.prefixCss = function (e) {
              return this.config.cssPrefix + '-' + e;
            }),
            (a.prototype.getConfig = function () {
              return this.config;
            }),
            (a.prototype.hide = function () {
              this.hidden ||
                ((this.hidden = !0), this.getDomElement().addClass(this.prefixCss(a.CLASS_HIDDEN)), this.onHideEvent());
            }),
            (a.prototype.show = function () {
              this.hidden &&
                (this.getDomElement().removeClass(this.prefixCss(a.CLASS_HIDDEN)),
                (this.hidden = !1),
                this.onShowEvent());
            }),
            (a.prototype.isHidden = function () {
              return this.hidden;
            }),
            (a.prototype.isShown = function () {
              return !this.isHidden();
            }),
            (a.prototype.toggleHidden = function () {
              this.isHidden() ? this.show() : this.hide();
            }),
            (a.prototype.disable = function () {
              this.disabled ||
                ((this.disabled = !0),
                this.getDomElement().addClass(this.prefixCss(a.CLASS_DISABLED)),
                this.onDisabledEvent());
            }),
            (a.prototype.enable = function () {
              this.disabled &&
                (this.getDomElement().removeClass(this.prefixCss(a.CLASS_DISABLED)),
                (this.disabled = !1),
                this.onEnabledEvent());
            }),
            (a.prototype.isDisabled = function () {
              return this.disabled;
            }),
            (a.prototype.isEnabled = function () {
              return !this.isDisabled();
            }),
            (a.prototype.isHovered = function () {
              return this.hovered;
            }),
            (a.prototype.onShowEvent = function () {
              this.componentEvents.onShow.dispatch(this);
            }),
            (a.prototype.onHideEvent = function () {
              this.componentEvents.onHide.dispatch(this);
            }),
            (a.prototype.onEnabledEvent = function () {
              this.componentEvents.onEnabled.dispatch(this);
            }),
            (a.prototype.onDisabledEvent = function () {
              this.componentEvents.onDisabled.dispatch(this);
            }),
            (a.prototype.onHoverChangedEvent = function (e) {
              ((this.hovered = e), this.componentEvents.onHoverChanged.dispatch(this, { hovered: e }));
            }),
            Object.defineProperty(a.prototype, 'onShow', {
              get: function () {
                return this.componentEvents.onShow.getEvent();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(a.prototype, 'onHide', {
              get: function () {
                return this.componentEvents.onHide.getEvent();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(a.prototype, 'onEnabled', {
              get: function () {
                return this.componentEvents.onEnabled.getEvent();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(a.prototype, 'onDisabled', {
              get: function () {
                return this.componentEvents.onDisabled.getEvent();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(a.prototype, 'onHoverChanged', {
              get: function () {
                return this.componentEvents.onHoverChanged.getEvent();
              },
              enumerable: !1,
              configurable: !0,
            }),
            (a.CLASS_HIDDEN = 'hidden'),
            (a.CLASS_DISABLED = 'disabled'),
            (n.Component = a));
        },
        { '../dom': 81, '../eventdispatcher': 83, '../guid': 86, '../localization/i18n': 88 },
      ],
      20: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.Container = void 0), e('./component')),
            a = e('../dom'),
            l = e('../arrayutils'),
            c = e('../localization/i18n'),
            e =
              ((i = s.Component),
              r(u, i),
              (u.prototype.addComponent = function (e) {
                (this.config.components.push(e), this.componentsToAdd.push(e));
              }),
              (u.prototype.removeComponent = function (e) {
                return null != l.ArrayUtils.remove(this.config.components, e) && (this.componentsToRemove.push(e), !0);
              }),
              (u.prototype.getComponents = function () {
                return this.config.components;
              }),
              (u.prototype.removeComponents = function () {
                for (var e = 0, t = this.getComponents().slice(); e < t.length; e++) {
                  var n = t[e];
                  this.removeComponent(n);
                }
              }),
              (u.prototype.updateComponents = function () {
                for (var e; (e = this.componentsToRemove.shift()); ) e.getDomElement().remove();
                for (; (e = this.componentsToAdd.shift()); ) this.innerContainerElement.append(e.getDomElement());
              }),
              (u.prototype.toDomElement = function () {
                var e = new a.DOM(null != (e = this.config.tag) ? e : 'div', {
                    id: this.config.id,
                    class: this.getCssClasses(),
                    role: null != (e = this.config.role) ? e : '',
                    'aria-label': c.i18n.performLocalization(null != (e = this.config.ariaLabel) ? e : ''),
                  }),
                  t = new a.DOM(null != (t = this.config.tag) ? t : 'div', {
                    class: this.prefixCss('container-wrapper'),
                  });
                this.innerContainerElement = t;
                for (var n = 0, o = this.config.components; n < o.length; n++) {
                  var i = o[n];
                  this.componentsToAdd.push(i);
                }
                return (this.updateComponents(), e.append(t), e);
              }),
              u);
          function u(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(e, { cssClass: 'ui-container', components: [] }, t.config)),
              (t.componentsToAdd = []),
              (t.componentsToRemove = []),
              t
            );
          }
          n.Container = e;
        },
        { '../arrayutils': 1, '../dom': 81, '../localization/i18n': 88, './component': 19 },
      ],
      21: [
        function (e, t, n) {
          var o,
            s,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            a = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.ControlBar = void 0), e('./container')),
            l = e('../uiutils'),
            c = e('./spacer'),
            r = e('../localization/i18n'),
            u = e('../browserutils'),
            p = e('./settingspanel'),
            e =
              ((s = a.Container),
              i(f, s),
              (f.prototype.configure = function (e, t) {
                var n = this,
                  o = (s.prototype.configure.call(this, e, t), 0),
                  i = !1,
                  r =
                    (t.getConfig().disableAutoHideWhenHovered &&
                      !u.BrowserUtils.isMobile &&
                      l.UIUtils.traverseTree(this, function (e) {
                        e instanceof a.Container ||
                          e instanceof c.Spacer ||
                          e.onHoverChanged.subscribe(function (e, t) {
                            t.hovered ? o++ : o--;
                          });
                      }),
                    u.BrowserUtils.isMobile &&
                      (t.onComponentShow.subscribe(function (e) {
                        e instanceof p.SettingsPanel && (i = !0);
                      }),
                      t.onComponentHide.subscribe(function (e) {
                        e instanceof p.SettingsPanel && (i = !1);
                      })),
                    !1);
                (e.on(e.exports.PlayerEvent.Play, function () {
                  r || ((r = !0), n.show());
                }),
                  e.on(e.exports.PlayerEvent.Paused, function () {
                    ((r = !0), n.show());
                  }),
                  t.onControlsShow.subscribe(function () {
                    r && n.show();
                  }),
                  t.onPreviewControlsHide.subscribe(function (e, t) {
                    t.cancel = t.cancel || 0 < o || i;
                  }),
                  t.onControlsHide.subscribe(function () {
                    n.hide();
                  }));
              }),
              f);
          function f(e) {
            var t = s.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-controlbar', hidden: !0, role: 'region', ariaLabel: r.i18n.getLocalizer('controlBar') },
                t.config,
              )),
              t
            );
          }
          n.ControlBar = e;
        },
        {
          '../browserutils': 3,
          '../localization/i18n': 88,
          '../uiutils': 114,
          './container': 20,
          './settingspanel': 44,
          './spacer': 51,
        },
      ],
      22: [
        function (e, t, n) {
          var o,
            s,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.ErrorMessageOverlay = void 0),
              e('./container')),
            a = e('./label'),
            l = e('./tvnoisecanvas'),
            c = e('../errorutils'),
            u = e('../mobilev3playerapi'),
            e =
              ((s = r.Container),
              i(p, s),
              (p.prototype.configure = function (e, o) {
                var t,
                  i = this,
                  r = (s.prototype.configure.call(this, e, o), this.getConfig()),
                  n = function (e, t) {
                    var n = ((e, t) => {
                      if (e)
                        return 'function' == typeof e
                          ? e(t)
                          : e[t.code]
                            ? 'string' == typeof (e = e[t.code])
                              ? e
                              : e(t)
                            : void 0;
                    })(null != (n = o.getConfig().errorMessages || r.messages) ? n : {}, e);
                    i.display((t = n ? n : t));
                  };
                ((0, u.isMobileV3PlayerAPI)(e)
                  ? (e.on(
                      u.MobileV3PlayerEvent.PlayerError,
                      (t = function (e) {
                        var t = c.ErrorUtils.defaultMobileV3ErrorMessageTranslator(e);
                        n(e, t);
                      }),
                    ),
                    e.on(u.MobileV3PlayerEvent.SourceError, t))
                  : e.on(e.exports.PlayerEvent.Error, function (e) {
                      var t = c.ErrorUtils.defaultWebErrorMessageTranslator(e);
                      n(e, t);
                    }),
                  e.on(e.exports.PlayerEvent.SourceLoaded, function (e) {
                    i.isShown() && (i.tvNoiseBackground.stop(), i.hide());
                  }));
              }),
              (p.prototype.display = function (e) {
                (this.errorLabel.setText(e), this.tvNoiseBackground.start(), this.show());
              }),
              (p.prototype.release = function () {
                (s.prototype.release.call(this), this.tvNoiseBackground.stop());
              }),
              p);
          function p(e) {
            var t = s.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.errorLabel = new a.Label({ cssClass: 'ui-errormessage-label' })),
              (t.tvNoiseBackground = new l.TvNoiseCanvas()),
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-errormessage-overlay', components: [t.tvNoiseBackground, t.errorLabel], hidden: !0 },
                t.config,
              )),
              t
            );
          }
          n.ErrorMessageOverlay = e;
        },
        { '../errorutils': 82, '../mobilev3playerapi': 94, './container': 20, './label': 27, './tvnoisecanvas': 72 },
      ],
      23: [
        function (e, t, n) {
          var o,
            s,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.FullscreenToggleButton = void 0),
              e('./togglebutton')),
            a = e('../localization/i18n'),
            e =
              ((s = r.ToggleButton),
              i(l, s),
              (l.prototype.configure = function (t, e) {
                function n() {
                  t.getViewMode() === t.exports.ViewMode.Fullscreen ? i.on() : i.off();
                }
                function o() {
                  r() ? i.show() : i.hide();
                }
                var i = this,
                  r =
                    (s.prototype.configure.call(this, t, e),
                    function () {
                      return t.isViewModeAvailable(t.exports.ViewMode.Fullscreen);
                    });
                (t.on(t.exports.PlayerEvent.ViewModeChanged, n),
                  t.exports.PlayerEvent.ViewModeAvailabilityChanged &&
                    t.on(t.exports.PlayerEvent.ViewModeAvailabilityChanged, o),
                  e.getConfig().events.onUpdated.subscribe(o),
                  this.onClick.subscribe(function () {
                    var e;
                    r()
                      ? ((e =
                          t.getViewMode() === t.exports.ViewMode.Fullscreen
                            ? t.exports.ViewMode.Inline
                            : t.exports.ViewMode.Fullscreen),
                        t.setViewMode(e))
                      : console && console.log('Fullscreen unavailable');
                  }),
                  o(),
                  n());
              }),
              l);
          function l(e) {
            var t = s.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-fullscreentogglebutton', text: a.i18n.getLocalizer('fullscreen') },
                t.config,
              )),
              t
            );
          }
          n.FullscreenToggleButton = e;
        },
        { '../localization/i18n': 88, './togglebutton': 71 },
      ],
      24: [
        function (e, t, n) {
          var o,
            c,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.HugePlaybackToggleButton = void 0),
              e('./playbacktogglebutton')),
            s = e('../dom'),
            a = e('../localization/i18n'),
            e =
              ((c = r.PlaybackToggleButton),
              i(l, c),
              (l.prototype.configure = function (t, e) {
                function n() {
                  t.isPlaying() || r.isPlayInitiated ? t.pause('ui') : t.play('ui');
                }
                function o() {
                  t.getViewMode() === t.exports.ViewMode.Fullscreen
                    ? t.setViewMode(t.exports.ViewMode.Inline)
                    : t.setViewMode(t.exports.ViewMode.Fullscreen);
                }
                function i() {
                  (r.setTransitionAnimationsEnabled(!1),
                    r.onToggle.subscribeOnce(function () {
                      r.setTransitionAnimationsEnabled(!0);
                    }));
                }
                var r = this,
                  s =
                    (c.prototype.configure.call(this, t, e, !1),
                    'boolean' == typeof e.getConfig().enterFullscreenOnInitialPlayback &&
                      (this.config.enterFullscreenOnInitialPlayback = e.getConfig().enterFullscreenOnInitialPlayback),
                    !0),
                  a = 0,
                  l = 0,
                  e =
                    (this.onClick.subscribe(function () {
                      var e;
                      s
                        ? (n(),
                          r.config.enterFullscreenOnInitialPlayback && t.setViewMode(t.exports.ViewMode.Fullscreen))
                        : (e = Date.now()) - a < 200
                          ? (o(), (l = e))
                          : e - a < 500
                            ? (o(), n(), (l = e))
                            : ((a = e),
                              setTimeout(function () {
                                200 < Date.now() - l && n();
                              }, 200));
                    }),
                    t.on(t.exports.PlayerEvent.Play, function () {
                      s = !1;
                    }),
                    t.on(t.exports.PlayerEvent.SourceLoaded, function () {
                      s = !0;
                    }),
                    t.on(t.exports.PlayerEvent.PlaybackFinished, function () {
                      r.hide();
                    }),
                    t.on(t.exports.PlayerEvent.Play, function () {
                      r.show();
                    }),
                    t.on(t.exports.PlayerEvent.Warning, function (e) {
                      e.code === t.exports.WarningCode.PLAYBACK_COULD_NOT_BE_STARTED && (s = !0);
                    }),
                    i(),
                    Boolean(null == (e = t.getConfig().playback) ? void 0 : e.autoplay)),
                  e = !t.getSource() && e;
                (t.isPlaying() || e) &&
                  (this.on(),
                  i(),
                  t.on(t.exports.PlayerEvent.Warning, function (e) {
                    e.code === t.exports.WarningCode.PLAYBACK_COULD_NOT_BE_STARTED && i();
                  }));
              }),
              (l.prototype.toDomElement = function () {
                var e = c.prototype.toDomElement.call(this);
                return (e.append(new s.DOM('div', { class: this.prefixCss('image') })), e);
              }),
              (l.prototype.setTransitionAnimationsEnabled = function (e) {
                var t = this.prefixCss('no-transition-animations');
                e
                  ? this.getDomElement().removeClass(t)
                  : this.getDomElement().hasClass(t) || this.getDomElement().addClass(t);
              }),
              l);
          function l(e) {
            var t = c.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-hugeplaybacktogglebutton', text: a.i18n.getLocalizer('playPause'), role: 'button' },
                t.config,
              )),
              t
            );
          }
          n.HugePlaybackToggleButton = e;
        },
        { '../dom': 81, '../localization/i18n': 88, './playbacktogglebutton': 34 },
      ],
      25: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.HugeReplayButton = void 0), e('./button')),
            a = e('../dom'),
            l = e('../localization/i18n'),
            e =
              ((i = s.Button),
              r(c, i),
              (c.prototype.configure = function (e, t) {
                var n = this;
                (i.prototype.configure.call(this, e, t),
                  this.hide(),
                  this.onClick.subscribe(function () {
                    (n.hide(), e.play('ui'));
                  }),
                  e.on(e.exports.PlayerEvent.PlaybackFinished, function () {
                    n.show();
                  }),
                  e.on(e.exports.PlayerEvent.Play, function () {
                    n.hide();
                  }));
              }),
              (c.prototype.toDomElement = function () {
                var e = i.prototype.toDomElement.call(this);
                return (e.append(new a.DOM('div', { class: this.prefixCss('image') })), e);
              }),
              c);
          function c(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-hugereplaybutton', text: l.i18n.getLocalizer('replay') },
                t.config,
              )),
              t
            );
          }
          n.HugeReplayButton = e;
        },
        { '../dom': 81, '../localization/i18n': 88, './button': 13 },
      ],
      26: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.ItemSelectionList = void 0),
              e('./listselector')),
            l = e('../dom'),
            c = e('../localization/i18n'),
            e =
              ((i = s.ListSelector),
              r(u, i),
              (u.prototype.isActive = function () {
                return 1 < this.items.length;
              }),
              (u.prototype.toDomElement = function () {
                var e = new l.DOM('ul', { id: this.config.id, class: this.getCssClasses() });
                return ((this.listElement = e), this.updateDomItems(), e);
              }),
              (u.prototype.updateDomItems = function (n) {
                for (
                  var o = this,
                    i = (void 0 === n && (n = null), this.listElement.empty(), null),
                    r = function (e) {
                      e.addClass(o.prefixCss(u.CLASS_SELECTED));
                    },
                    s = function (e) {
                      e.removeClass(o.prefixCss(u.CLASS_SELECTED));
                    },
                    a = this,
                    e = 0,
                    t = this.items;
                  e < t.length;
                  e++
                )
                  ((e) => {
                    var t = new l.DOM('li', { type: 'li', class: a.prefixCss('ui-selectionlistitem') }).append(
                      new l.DOM('a', {}).html(c.i18n.performLocalization(e.label)),
                    );
                    (i || (null != n && String(n) !== e.key) || (i = t),
                      t.on('click', function () {
                        (i && s(i), r((i = t)), o.onItemSelectedEvent(e.key, !1));
                      }),
                      i && r(i),
                      a.listElement.append(t));
                  })(t[e]);
              }),
              (u.prototype.onItemAddedEvent = function (e) {
                (i.prototype.onItemAddedEvent.call(this, e), this.updateDomItems(this.selectedItem));
              }),
              (u.prototype.onItemRemovedEvent = function (e) {
                (i.prototype.onItemRemovedEvent.call(this, e), this.updateDomItems(this.selectedItem));
              }),
              (u.prototype.onItemSelectedEvent = function (e, t) {
                (void 0 === t && (t = !0), i.prototype.onItemSelectedEvent.call(this, e), t && this.updateDomItems(e));
              }),
              (u.CLASS_SELECTED = 'selected'),
              u);
          function u(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return ((t.config = t.mergeConfig(e, { tag: 'ul', cssClass: 'ui-itemselectionlist' }, t.config)), t);
          }
          n.ItemSelectionList = e;
        },
        { '../dom': 81, '../localization/i18n': 88, './listselector': 29 },
      ],
      27: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.Label = void 0), e('./component')),
            a = e('../dom'),
            l = e('../eventdispatcher'),
            c = e('../localization/i18n'),
            e =
              ((i = s.Component),
              r(u, i),
              (u.prototype.toDomElement = function () {
                var e = this,
                  t = null != this.config.for ? 'label' : 'span',
                  t = new a.DOM(t, {
                    id: this.config.id,
                    for: null != (t = this.config.for) ? t : '',
                    class: this.getCssClasses(),
                  }).html(c.i18n.performLocalization(this.text));
                return (
                  t.on('click', function () {
                    e.onClickEvent();
                  }),
                  t
                );
              }),
              (u.prototype.setText = function (e) {
                e !== this.text &&
                  ((this.text = e),
                  (e = c.i18n.performLocalization(e)),
                  this.getDomElement().html(e),
                  this.onTextChangedEvent(e));
              }),
              (u.prototype.getText = function () {
                return c.i18n.performLocalization(this.text);
              }),
              (u.prototype.clearText = function () {
                (this.getDomElement().html(''), this.onTextChangedEvent(''));
              }),
              (u.prototype.isEmpty = function () {
                return !this.text;
              }),
              (u.prototype.onClickEvent = function () {
                this.labelEvents.onClick.dispatch(this);
              }),
              (u.prototype.onTextChangedEvent = function (e) {
                this.labelEvents.onTextChanged.dispatch(this, e);
              }),
              Object.defineProperty(u.prototype, 'onClick', {
                get: function () {
                  return this.labelEvents.onClick.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(u.prototype, 'onTextChanged', {
                get: function () {
                  return this.labelEvents.onTextChanged.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              u);
          function u(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.labelEvents = { onClick: new l.EventDispatcher(), onTextChanged: new l.EventDispatcher() }),
              (t.config = t.mergeConfig(e, { cssClass: 'ui-label' }, t.config)),
              (t.text = null != (e = t.config.text) ? e : ''),
              t
            );
          }
          n.Label = e;
        },
        { '../dom': 81, '../eventdispatcher': 83, '../localization/i18n': 88, './component': 19 },
      ],
      28: [
        function (e, t, n) {
          var o,
            r,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.ListBox = void 0), e('./togglebutton')),
            a = e('./listselector'),
            l = e('../dom'),
            c = e('../arrayutils'),
            e =
              ((r = a.ListSelector),
              i(u, r),
              (u.prototype.configure = function (e, t) {
                (this.onItemAdded.subscribe(this.addListBoxDomItem),
                  this.onItemRemoved.subscribe(this.removeListBoxDomItem),
                  this.onItemSelected.subscribe(this.refreshSelectedItem),
                  r.prototype.configure.call(this, e, t));
              }),
              (u.prototype.toDomElement = function () {
                var e = new l.DOM('div', { id: this.config.id, class: this.getCssClasses() });
                return ((this.listBoxElement = e), this.createListBoxDomItems(), this.refreshSelectedItem(), e);
              }),
              (u.prototype.createListBoxDomItems = function () {
                (this.listBoxElement.empty(), (this.components = []));
                for (var e = 0, t = this.items; e < t.length; e++) {
                  var n = t[e];
                  this.addListBoxDomItem(this, n.key);
                }
              }),
              (u.prototype.buildListBoxItemButton = function (e) {
                return new f({ key: e.key, text: e.label, ariaLabel: e.ariaLabel });
              }),
              (u.prototype.getComponentForKey = function (t) {
                return this.components.find(function (e) {
                  return t === e.key;
                });
              }),
              u);
          function u(e) {
            var i = r.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (i.components = []),
              (i.removeListBoxDomItem = function (e, t) {
                t = i.getComponentForKey(t);
                t && (t.getDomElement().remove(), c.ArrayUtils.remove(i.components, t));
              }),
              (i.addListBoxDomItem = function (e, t) {
                var n,
                  o = i.getComponentForKey(t),
                  t = i.getItemForKey(t);
                t &&
                  (o
                    ? o.setText(t.label)
                    : ((n = i.buildListBoxItemButton(t)).onClick.subscribe(function () {
                        i.handleSelectionChange(n);
                      }),
                      i.components.push(n),
                      i.listBoxElement.append(n.getDomElement())));
              }),
              (i.refreshSelectedItem = function () {
                for (var e = 0, t = i.items; e < t.length; e++) {
                  var n = t[e],
                    n = i.getComponentForKey(n.key);
                  n && (String(n.key) === String(i.selectedItem) ? n.on() : n.off());
                }
              }),
              (i.handleSelectionChange = function (e) {
                i.onItemSelectedEvent(e.key);
              }),
              (i.config = i.mergeConfig(e, { cssClass: 'ui-listbox' }, i.config)),
              i
            );
          }
          n.ListBox = e;
          ((p = s.ToggleButton),
            i(g, p),
            Object.defineProperty(g.prototype, 'key', {
              get: function () {
                return this.config.key;
              },
              enumerable: !1,
              configurable: !0,
            }));
          var p,
            f = g;
          function g(e) {
            var t = p.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-listbox-button', onClass: 'selected', offClass: '' },
                t.config,
              )),
              t
            );
          }
        },
        { '../arrayutils': 1, '../dom': 81, './listselector': 29, './togglebutton': 71 },
      ],
      29: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (this && this.__assign) ||
              function () {
                return (s =
                  Object.assign ||
                  function (e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                      for (var i in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e;
                  }).apply(this, arguments);
              },
            a = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.ListSelector = void 0), e('./component')),
            l = e('../eventdispatcher'),
            c = e('../arrayutils'),
            u = e('../localization/i18n'),
            e =
              ((i = a.Component),
              r(p, i),
              (p.prototype.getItemIndex = function (e) {
                for (var t in this.items) if (e === this.items[t].key) return parseInt(t);
                return -1;
              }),
              (p.prototype.getItems = function () {
                return this.items;
              }),
              (p.prototype.hasItem = function (e) {
                return -1 < this.getItemIndex(e);
              }),
              (p.prototype.addItem = function (t, e, n, o) {
                (void 0 === n && (n = !1), void 0 === o && (o = ''));
                e = s({ key: t, label: u.i18n.performLocalization(e) }, o && { ariaLabel: o });
                (this.config.filter && !this.config.filter(e)) ||
                  (this.config.translator && (e.label = this.config.translator(e)),
                  this.removeItem(t),
                  !n ||
                  (o = this.items.findIndex(function (e) {
                    return e.key > t;
                  })) < 0
                    ? this.items.push(e)
                    : this.items.splice(o, 0, e),
                  this.onItemAddedEvent(t));
              }),
              (p.prototype.removeItem = function (e) {
                var t = this.getItemIndex(e);
                return -1 < t && (c.ArrayUtils.remove(this.items, this.items[t]), this.onItemRemovedEvent(e), !0);
              }),
              (p.prototype.selectItem = function (e) {
                return (
                  e === this.selectedItem ||
                  (-1 < this.getItemIndex(e) && ((this.selectedItem = e), this.onItemSelectedEvent(e), !0))
                );
              }),
              (p.prototype.getSelectedItem = function () {
                return this.selectedItem;
              }),
              (p.prototype.getItemForKey = function (t) {
                return this.items.find(function (e) {
                  return e.key === t;
                });
              }),
              (p.prototype.synchronizeItems = function (e) {
                var t = this;
                (e
                  .filter(function (e) {
                    return !t.hasItem(e.key);
                  })
                  .forEach(function (e) {
                    return t.addItem(e.key, e.label, e.sortedInsert, e.ariaLabel);
                  }),
                  this.items
                    .filter(function (t) {
                      return (
                        0 ===
                        e.filter(function (e) {
                          return e.key === t.key;
                        }).length
                      );
                    })
                    .forEach(function (e) {
                      return t.removeItem(e.key);
                    }));
              }),
              (p.prototype.clearItems = function () {
                var e = this.items;
                ((this.items = []), (this.selectedItem = null));
                for (var t = 0, n = e; t < n.length; t++) {
                  var o = n[t];
                  this.onItemRemovedEvent(o.key);
                }
              }),
              (p.prototype.itemCount = function () {
                return Object.keys(this.items).length;
              }),
              (p.prototype.onItemAddedEvent = function (e) {
                this.listSelectorEvents.onItemAdded.dispatch(this, e);
              }),
              (p.prototype.onItemRemovedEvent = function (e) {
                this.listSelectorEvents.onItemRemoved.dispatch(this, e);
              }),
              (p.prototype.onItemSelectedEvent = function (e) {
                this.listSelectorEvents.onItemSelected.dispatch(this, e);
              }),
              Object.defineProperty(p.prototype, 'onItemAdded', {
                get: function () {
                  return this.listSelectorEvents.onItemAdded.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(p.prototype, 'onItemRemoved', {
                get: function () {
                  return this.listSelectorEvents.onItemRemoved.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(p.prototype, 'onItemSelected', {
                get: function () {
                  return this.listSelectorEvents.onItemSelected.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              p);
          function p(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.selectedItem = null),
              (t.listSelectorEvents = {
                onItemAdded: new l.EventDispatcher(),
                onItemRemoved: new l.EventDispatcher(),
                onItemSelected: new l.EventDispatcher(),
              }),
              (t.config = t.mergeConfig(e, { items: [], cssClass: 'ui-listselector' }, t.config)),
              (t.items = t.config.items),
              t
            );
          }
          n.ListSelector = e;
        },
        { '../arrayutils': 1, '../eventdispatcher': 83, '../localization/i18n': 88, './component': 19 },
      ],
      30: [
        function (e, t, n) {
          var o,
            s,
            a,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            e =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.MetadataLabel = n.MetadataLabelContent = void 0),
              e('./label')),
            r =
              (((r = s || (n.MetadataLabelContent = s = {}))[(r.Title = 0)] = 'Title'),
              (r[(r.Description = 1)] = 'Description'),
              (a = e.Label),
              i(l, a),
              (l.prototype.configure = function (e, t) {
                function n() {
                  var e;
                  switch (i.content) {
                    case s.Title:
                      o.setText(null != (e = null == (e = r.metadata) ? void 0 : e.title) ? e : '');
                      break;
                    case s.Description:
                      o.setText(null != (e = null == (e = r.metadata) ? void 0 : e.description) ? e : '');
                  }
                }
                var o = this,
                  i = (a.prototype.configure.call(this, e, t), this.getConfig()),
                  r = t.getConfig();
                (n(),
                  e.on(e.exports.PlayerEvent.SourceUnloaded, function () {
                    o.setText('');
                  }),
                  t.getConfig().events.onUpdated.subscribe(n));
              }),
              l);
          function l(e) {
            var t = a.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClasses: ['label-metadata', 'label-metadata-' + s[e.content].toLowerCase()] },
                t.config,
              )),
              t
            );
          }
          n.MetadataLabel = r;
        },
        { './label': 27 },
      ],
      31: [
        function (e, t, n) {
          var o,
            s,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.PictureInPictureToggleButton = void 0),
              e('./togglebutton')),
            a = e('../localization/i18n'),
            e =
              ((s = r.ToggleButton),
              i(l, s),
              (l.prototype.configure = function (t, e) {
                function n() {
                  t.getViewMode() === t.exports.ViewMode.PictureInPicture ? i.on() : i.off();
                }
                function o() {
                  r() ? i.show() : i.hide();
                }
                var i = this,
                  r =
                    (s.prototype.configure.call(this, t, e),
                    function () {
                      return t.isViewModeAvailable(t.exports.ViewMode.PictureInPicture);
                    });
                (t.on(t.exports.PlayerEvent.ViewModeChanged, n),
                  t.exports.PlayerEvent.ViewModeAvailabilityChanged &&
                    t.on(t.exports.PlayerEvent.ViewModeAvailabilityChanged, o),
                  e.getConfig().events.onUpdated.subscribe(o),
                  this.onClick.subscribe(function () {
                    var e;
                    r()
                      ? ((e =
                          t.getViewMode() === t.exports.ViewMode.PictureInPicture
                            ? t.exports.ViewMode.Inline
                            : t.exports.ViewMode.PictureInPicture),
                        t.setViewMode(e))
                      : console && console.log('PIP unavailable');
                  }),
                  o(),
                  n());
              }),
              l);
          function l(e) {
            var t = s.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-piptogglebutton', text: a.i18n.getLocalizer('pictureInPicture') },
                t.config,
              )),
              t
            );
          }
          n.PictureInPictureToggleButton = e;
        },
        { '../localization/i18n': 88, './togglebutton': 71 },
      ],
      32: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.PlaybackSpeedSelectBox = void 0),
              e('./selectbox')),
            a = e('../localization/i18n'),
            e =
              ((i = s.SelectBox),
              r(l, i),
              (l.prototype.configure = function (n, e) {
                function t() {
                  var e = n.getPlaybackSpeed();
                  o.setSpeed(e);
                }
                var o = this;
                (i.prototype.configure.call(this, n, e),
                  this.addDefaultItems(),
                  this.onItemSelected.subscribe(function (e, t) {
                    (n.setPlaybackSpeed(parseFloat(t)), o.selectItem(t));
                  }));
                (n.on(n.exports.PlayerEvent.PlaybackSpeedChanged, t), e.getConfig().events.onUpdated.subscribe(t));
              }),
              (l.prototype.setSpeed = function (e) {
                this.selectItem(String(e)) ||
                  (this.clearItems(), this.addDefaultItems([e]), this.selectItem(String(e)));
              }),
              (l.prototype.addDefaultItems = function (e) {
                var t = this;
                this.defaultPlaybackSpeeds
                  .concat((e = void 0 === e ? [] : e))
                  .sort()
                  .forEach(function (e) {
                    1 !== e
                      ? t.addItem(String(e), ''.concat(e, 'x'))
                      : t.addItem(String(e), a.i18n.getLocalizer('normal'));
                  });
              }),
              (l.prototype.clearItems = function () {
                ((this.items = []), (this.selectedItem = null));
              }),
              l);
          function l(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.defaultPlaybackSpeeds = [0.25, 0.5, 1, 1.5, 2]),
              (t.config = t.mergeConfig(e, { cssClasses: ['ui-playbackspeedselectbox'] }, t.config)),
              t
            );
          }
          n.PlaybackSpeedSelectBox = e;
        },
        { '../localization/i18n': 88, './selectbox': 43 },
      ],
      33: [
        function (e, t, n) {
          var o,
            r,
            h,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.PlaybackTimeLabel = n.PlaybackTimeLabelMode = void 0),
              e('./label')),
            y = e('../playerutils'),
            m = e('../stringutils'),
            b = e('../localization/i18n'),
            e =
              (((e = r || (n.PlaybackTimeLabelMode = r = {}))[(e.CurrentTime = 0)] = 'CurrentTime'),
              (e[(e.TotalTime = 1)] = 'TotalTime'),
              (e[(e.CurrentAndTotalTime = 2)] = 'CurrentAndTotalTime'),
              (e[(e.RemainingTime = 3)] = 'RemainingTime'),
              (h = s.Label),
              i(a, h),
              (a.prototype.configure = function (n, e) {
                function t() {
                  ((l = 0), o.getDomElement().css({ 'min-width': '' }), g());
                }
                var o = this,
                  i = (h.prototype.configure.call(this, n, e), this.getConfig()),
                  r = !1,
                  s = this.prefixCss('ui-playbacktimelabel-live'),
                  a = this.prefixCss('ui-playbacktimelabel-live-edge'),
                  l = 0,
                  c = function () {
                    n.timeShift(0);
                  },
                  u = function () {
                    var e, t;
                    r &&
                      ((e = n.getTimeShift() < 0),
                      (t = n.getMaxTimeShift() < 0),
                      e || (n.isPaused() && t) ? o.getDomElement().removeClass(a) : o.getDomElement().addClass(a));
                  },
                  p = new y.PlayerUtils.LiveStreamDetector(n, e),
                  f =
                    (p.onLiveChanged.subscribe(function (e, t) {
                      ((r = t.live),
                        (r = n.isLive())
                          ? (o.getDomElement().addClass(s),
                            o.setText(b.i18n.getLocalizer('live')),
                            i.hideInLivePlayback && o.hide(),
                            o.onClick.subscribe(c),
                            u())
                          : (o.getDomElement().removeClass(s),
                            o.getDomElement().removeClass(a),
                            o.onClick.unsubscribe(c)));
                    }),
                    p.detect(),
                    function () {
                      r ||
                        n.getDuration() === 1 / 0 ||
                        o.setTime(y.PlayerUtils.getCurrentTimeRelativeToSeekableRange(n), n.getDuration());
                      var e = o.getDomElement().width();
                      l < e && ((l = e), o.getDomElement().css({ 'min-width': l + 'px' }));
                    }),
                  g = function () {
                    ((o.timeFormat =
                      3600 <= Math.abs(n.isLive() ? n.getMaxTimeShift() : n.getDuration())
                        ? m.StringUtils.FORMAT_HHMMSS
                        : m.StringUtils.FORMAT_MMSS),
                      f());
                  },
                  d =
                    (n.on(n.exports.PlayerEvent.TimeChanged, f),
                    n.on(n.exports.PlayerEvent.Ready, g),
                    n.on(n.exports.PlayerEvent.Seeked, f),
                    n.on(n.exports.PlayerEvent.TimeShift, u),
                    n.on(n.exports.PlayerEvent.TimeShifted, u),
                    n.on(n.exports.PlayerEvent.Playing, u),
                    n.on(n.exports.PlayerEvent.Paused, u),
                    n.on(n.exports.PlayerEvent.StallStarted, u),
                    n.on(n.exports.PlayerEvent.StallEnded, u),
                    e.getConfig().events.onUpdated.subscribe(t),
                    t(),
                    e.onControlsHide.subscribe(function () {
                      o.hide();
                    }),
                    !1);
                (n.on(n.exports.PlayerEvent.Play, function () {
                  d || ((d = !0), o.show());
                }),
                  e.onControlsShow.subscribe(function () {
                    d && o.show();
                  }));
              }),
              (a.prototype.setTime = function (e, t) {
                var n = m.StringUtils.secondsToTime(e, this.timeFormat),
                  o = m.StringUtils.secondsToTime(t, this.timeFormat);
                switch (this.config.timeLabelMode) {
                  case r.CurrentTime:
                    this.setText(''.concat(n));
                    break;
                  case r.TotalTime:
                    this.setText(''.concat(o));
                    break;
                  case r.CurrentAndTotalTime:
                    this.setText(''.concat(n, ' / ').concat(o));
                    break;
                  case r.RemainingTime:
                    var i = m.StringUtils.secondsToTime(t - e, this.timeFormat);
                    this.setText(''.concat(i));
                }
              }),
              (a.prototype.setTimeFormat = function (e) {
                this.timeFormat = e;
              }),
              a);
          function a(e) {
            var t = h.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-playbacktimelabel', timeLabelMode: r.CurrentAndTotalTime, hideInLivePlayback: !1 },
                t.config,
              )),
              t
            );
          }
          n.PlaybackTimeLabel = e;
        },
        { '../localization/i18n': 88, '../playerutils': 95, '../stringutils': 108, './label': 27 },
      ],
      34: [
        function (e, t, n) {
          var o,
            u,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.PlaybackToggleButton = void 0),
              e('./togglebutton')),
            p = e('../playerutils'),
            s = e('../localization/i18n'),
            e =
              ((u = r.ToggleButton),
              i(f, u),
              (f.prototype.configure = function (t, e, n) {
                function o() {
                  s || (t.isPlaying() || r.isPlayInitiated ? r.on() : r.off());
                }
                function i() {
                  t.isLive() && !p.PlayerUtils.isTimeShiftAvailable(t)
                    ? r.getDomElement().addClass(r.prefixCss(f.CLASS_STOPTOGGLE))
                    : r.getDomElement().removeClass(r.prefixCss(f.CLASS_STOPTOGGLE));
                }
                var r = this,
                  s =
                    (void 0 === n && (n = !0),
                    u.prototype.configure.call(this, t, e),
                    'boolean' == typeof e.getConfig().enterFullscreenOnInitialPlayback &&
                      (this.config.enterFullscreenOnInitialPlayback = e.getConfig().enterFullscreenOnInitialPlayback),
                    !1),
                  a = !0,
                  l =
                    (t.on(t.exports.PlayerEvent.Play, function (e) {
                      ((r.isPlayInitiated = !0), (a = !1), o());
                    }),
                    t.on(t.exports.PlayerEvent.Paused, function (e) {
                      ((r.isPlayInitiated = !1), o());
                    }),
                    t.on(t.exports.PlayerEvent.Playing, function (e) {
                      ((r.isPlayInitiated = !1), o());
                    }),
                    t.on(t.exports.PlayerEvent.SourceLoaded, o),
                    e.getConfig().events.onUpdated.subscribe(o),
                    t.on(t.exports.PlayerEvent.SourceUnloaded, o),
                    t.on(t.exports.PlayerEvent.PlaybackFinished, o),
                    t.on(t.exports.PlayerEvent.CastStarted, o),
                    t.on(t.exports.PlayerEvent.Warning, function (e) {
                      e.code === t.exports.WarningCode.PLAYBACK_COULD_NOT_BE_STARTED &&
                        ((r.isPlayInitiated = !1), (a = !0), r.off());
                    }),
                    new p.PlayerUtils.TimeShiftAvailabilityDetector(t)),
                  c = new p.PlayerUtils.LiveStreamDetector(t, e);
                (l.onTimeShiftAvailabilityChanged.subscribe(i),
                  c.onLiveChanged.subscribe(i),
                  l.detect(),
                  c.detect(),
                  n &&
                    this.onClick.subscribe(function () {
                      t.isPlaying() || r.isPlayInitiated
                        ? t.pause('ui')
                        : (t.play('ui'),
                          a &&
                            r.config.enterFullscreenOnInitialPlayback &&
                            t.setViewMode(t.exports.ViewMode.Fullscreen));
                    }),
                  e.onSeek.subscribe(function () {
                    s = !0;
                  }),
                  e.onSeeked.subscribe(function () {
                    s = !1;
                  }),
                  o());
              }),
              (f.CLASS_STOPTOGGLE = 'stoptoggle'),
              f);
          function f(e) {
            var t = u.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                {
                  cssClass: 'ui-playbacktogglebutton',
                  text: s.i18n.getLocalizer('play'),
                  onAriaLabel: s.i18n.getLocalizer('pause'),
                  offAriaLabel: s.i18n.getLocalizer('play'),
                },
                t.config,
              )),
              (t.isPlayInitiated = !1),
              t
            );
          }
          n.PlaybackToggleButton = e;
        },
        { '../localization/i18n': 88, '../playerutils': 95, './togglebutton': 71 },
      ],
      35: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.PlaybackToggleOverlay = void 0),
              e('./container')),
            a = e('./hugeplaybacktogglebutton'),
            e = ((i = s.Container), r(l, i), l);
          function l(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.playbackToggleButton = new a.HugePlaybackToggleButton({
                enterFullscreenOnInitialPlayback: Boolean(e.enterFullscreenOnInitialPlayback),
              })),
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-playbacktoggle-overlay', components: [t.playbackToggleButton] },
                t.config,
              )),
              t
            );
          }
          n.PlaybackToggleOverlay = e;
        },
        { './container': 20, './hugeplaybacktogglebutton': 24 },
      ],
      36: [
        function (e, t, n) {
          var o,
            r,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            e = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.PosterOverlay = void 0), e('./container')),
            e =
              ((r = e.Container),
              i(s, r),
              (s.prototype.configure = function (t, e) {
                function n() {
                  var e = t.getSource();
                  (e = (e && (e.poster || e.posterSource || (e.metadata && e.metadata.poster))) || '') &&
                    (o.posterUrl = e);
                }
                var o = this,
                  i = (r.prototype.configure.call(this, t, e), this.getDomElement());
                (t.on(t.exports.PlayerEvent.SourceLoaded, n),
                  t.on(t.exports.PlayerEvent.Ready, n),
                  t.on(t.exports.PlayerEvent.PlaybackFinished, function () {
                    (n(), o.posterUrl && i.css('background-image', 'url('.concat(o.posterUrl, ')')), o.show());
                  }),
                  t.on(t.exports.PlayerEvent.Play, function () {
                    o.hide();
                  }),
                  t.on(t.exports.PlayerEvent.SourceUnloaded, function () {
                    ((o.posterUrl = ''), i.css('background-image', ''), o.hide());
                  }));
              }),
              s);
          function s(e) {
            var t = r.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.posterUrl = ''),
              (t.config = t.mergeConfig(e, { cssClass: 'ui-poster-overlay', hidden: !0 }, t.config)),
              t
            );
          }
          n.PosterOverlay = e;
        },
        { './container': 20 },
      ],
      37: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.RecommendationOverlay = void 0),
              e('./container')),
            a = e('./component'),
            l = e('../dom'),
            c = e('../stringutils'),
            u = e('./hugereplaybutton'),
            e =
              ((i = s.Container),
              r(p, i),
              (p.prototype.configure = function (e, r) {
                function t() {
                  a();
                  var e = null != (e = r.getConfig().recommendations) ? e : [];
                  if (0 < e.length) {
                    for (var t = 1, n = 0, o = e; n < o.length; n++) {
                      var i = o[n];
                      s.addComponent(new g({ itemConfig: i, cssClasses: ['recommendation-item-' + t++] }));
                    }
                    (s.updateComponents(), s.getDomElement().addClass(s.prefixCss('recommendations')));
                  }
                }
                var s = this,
                  a =
                    (i.prototype.configure.call(this, e, r),
                    function () {
                      for (var e = 0, t = s.getComponents().slice(); e < t.length; e++) {
                        var n = t[e];
                        n instanceof g && s.removeComponent(n);
                      }
                      (s.updateComponents(), s.getDomElement().removeClass(s.prefixCss('recommendations')));
                    });
                (r.getConfig().events.onUpdated.subscribe(t),
                  e.on(e.exports.PlayerEvent.SourceUnloaded, function () {
                    (a(), s.hide());
                  }),
                  e.on(e.exports.PlayerEvent.Play, function () {
                    s.hide();
                  }),
                  t());
              }),
              p);
          function p(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.replayButton = new u.HugeReplayButton()),
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-recommendation-overlay', hidden: !0, components: [t.replayButton] },
                t.config,
              )),
              t
            );
          }
          n.RecommendationOverlay = e;
          ((f = a.Component),
            r(d, f),
            (d.prototype.toDomElement = function () {
              var e = this.config.itemConfig,
                t = new l.DOM('a', { id: this.config.id, class: this.getCssClasses(), href: e.url }).css({
                  'background-image': 'url('.concat(e.thumbnail, ')'),
                }),
                n = new l.DOM('div', { class: this.prefixCss('background') }),
                n =
                  (t.append(n),
                  new l.DOM('span', { class: this.prefixCss('title') }).append(
                    new l.DOM('span', { class: this.prefixCss('innertitle') }).html(e.title),
                  )),
                n =
                  (t.append(n),
                  new l.DOM('span', { class: this.prefixCss('duration') }).append(
                    new l.DOM('span', { class: this.prefixCss('innerduration') }).html(
                      e.duration ? c.StringUtils.secondsToTime(e.duration) : '',
                    ),
                  ));
              return (t.append(n), t);
            }));
          var f,
            g = d;
          function d(e) {
            var t = f.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(e, { cssClass: 'ui-recommendation-item', itemConfig: null }, t.config)),
              t
            );
          }
        },
        { '../dom': 81, '../stringutils': 108, './component': 19, './container': 20, './hugereplaybutton': 25 },
      ],
      38: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.ReplayButton = void 0), e('./button')),
            a = e('../localization/i18n'),
            l = e('../playerutils'),
            e =
              ((i = s.Button),
              r(c, i),
              (c.prototype.configure = function (e, t) {
                var n = this;
                (i.prototype.configure.call(this, e, t),
                  e.isLive() && this.hide(),
                  new l.PlayerUtils.LiveStreamDetector(e, t).onLiveChanged.subscribe(function (e, t) {
                    t.live ? n.hide() : n.show();
                  }),
                  this.onClick.subscribe(function () {
                    (e.seek(0), e.play('ui'));
                  }));
              }),
              c);
          function c(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-replaybutton', text: a.i18n.getLocalizer('replay') },
                t.config,
              )),
              t
            );
          }
          n.ReplayButton = e;
        },
        { '../localization/i18n': 88, '../playerutils': 95, './button': 13 },
      ],
      39: [
        function (e, t, n) {
          var o,
            d,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            h =
              (Object.defineProperty(n, '__esModule', { value: !0 }), (n.SeekBar = void 0), e('./../groupplaybackapi')),
            r = e('./component'),
            a = e('../dom'),
            s = e('../eventdispatcher'),
            l = e('../timeout'),
            y = e('../playerutils'),
            c = e('../stringutils'),
            m = e('./seekbarcontroller'),
            u = e('../localization/i18n'),
            p = e('../browserutils'),
            f = e('./timelinemarkershandler'),
            g = e('./seekbarbufferlevel'),
            e =
              ((d = r.Component),
              i(b, d),
              (b.prototype.initialize = function () {
                (d.prototype.initialize.call(this), this.hasLabel() && this.getLabel().initialize());
              }),
              (b.prototype.setAriaSliderMinMax = function (e, t) {
                (this.getDomElement().attr('aria-valuemin', e), this.getDomElement().attr('aria-valuemax', t));
              }),
              (b.prototype.setAriaSliderValues = function () {
                var e;
                this.seekBarType === m.SeekBarType.Live
                  ? ((e = Math.ceil(this.player.getTimeShift()).toString()),
                    this.getDomElement().attr('aria-valuenow', e),
                    this.getDomElement().attr(
                      'aria-valuetext',
                      ''
                        .concat(u.i18n.performLocalization(u.i18n.getLocalizer('seekBar.timeshift')), ' ')
                        .concat(u.i18n.performLocalization(u.i18n.getLocalizer('seekBar.value')), ': ')
                        .concat(e),
                    ))
                  : this.seekBarType === m.SeekBarType.Vod &&
                    ((e = ''
                      .concat(c.StringUtils.secondsToText(this.player.getCurrentTime()), ' ')
                      .concat(u.i18n.performLocalization(u.i18n.getLocalizer('seekBar.durationText')), ' ')
                      .concat(c.StringUtils.secondsToText(this.player.getDuration()))),
                    this.getDomElement().attr('aria-valuenow', Math.floor(this.player.getCurrentTime()).toString()),
                    this.getDomElement().attr('aria-valuetext', e));
              }),
              (b.prototype.getPlaybackPositionPercentage = function () {
                return this.player.isLive()
                  ? 100 - (100 / this.player.getMaxTimeShift()) * this.player.getTimeShift()
                  : (100 / this.player.getDuration()) * this.getRelativeCurrentTime();
              }),
              (b.prototype.updateBufferLevel = function (e) {
                e = this.player.isLive() ? 100 : e + (0, g.getMinBufferLevel)(this.player);
                this.setBufferPosition(e);
              }),
              (b.prototype.configure = function (o, n, e) {
                var i,
                  r,
                  s,
                  a,
                  l,
                  c,
                  u,
                  p,
                  f,
                  t,
                  g = this;
                (void 0 === e && (e = !0),
                  d.prototype.configure.call(this, o, n),
                  (this.player = o),
                  this.setPosition(this.seekBarBackdrop, 100),
                  new m.SeekBarController(
                    this.config.keyStepIncrements,
                    o,
                    n.getConfig().volumeController,
                  ).setSeekBarControls(this.getDomElement(), function () {
                    return g.seekBarType;
                  }),
                  e
                    ? (n.onControlsShow.subscribe(function () {
                        g.isUiShown = !0;
                      }),
                      n.onControlsHide.subscribe(function () {
                        g.isUiShown = !1;
                      }),
                      (s = r = i = !1),
                      (l = function (e, t) {
                        var n;
                        (void 0 === e && (e = void 0),
                          void 0 === t && (t = !1),
                          g.isUserSeeking ||
                            ((n = g.getPlaybackPositionPercentage()),
                            g.updateBufferLevel(n),
                            r &&
                              e &&
                              e.type === o.exports.PlayerEvent.SegmentRequestFinished &&
                              n !== g.playbackPositionPercentage &&
                              (n = g.playbackPositionPercentage),
                            o.isLive()
                              ? 0 === o.getMaxTimeShift()
                                ? g.setPlaybackPosition(100)
                                : (g.isSeeking() || g.setPlaybackPosition(n),
                                  g.setAriaSliderMinMax(o.getMaxTimeShift().toString(), '0'))
                              : ((e =
                                  g.config.smoothPlaybackPositionUpdateIntervalMs ===
                                    b.SMOOTH_PLAYBACK_POSITION_UPDATE_DISABLED ||
                                  t ||
                                  o.isPaused()),
                                (t = o.isPaused() === o.isPlaying()),
                                (!e && !t) || g.isSeeking() || g.setPlaybackPosition(n),
                                g.setAriaSliderMinMax('0', o.getDuration().toString())),
                            g.isUiShown && g.setAriaSliderValues()));
                      }),
                      o.on(o.exports.PlayerEvent.Ready, l),
                      o.on(o.exports.PlayerEvent.TimeChanged, l),
                      o.on(o.exports.PlayerEvent.StallEnded, l),
                      o.on(o.exports.PlayerEvent.TimeShifted, l),
                      o.on(o.exports.PlayerEvent.SegmentRequestFinished, l),
                      this.configureLivePausedTimeshiftUpdater(o, n, l),
                      (e = function () {
                        ((s = !0), g.setSeeking(!0), (r = !1));
                      }),
                      (t = function (e, t) {
                        (void 0 === e && (e = void 0), void 0 === t && (t = !1), (s = !1), g.setSeeking(!1), l(e, t));
                      }),
                      o.on(o.exports.PlayerEvent.Seek, e),
                      o.on(o.exports.PlayerEvent.Seeked, t),
                      o.on(o.exports.PlayerEvent.TimeShift, e),
                      o.on(o.exports.PlayerEvent.TimeShifted, t),
                      (c = function (e) {
                        return !!e.groupPlayback;
                      }),
                      this.onSeek.subscribe(function (e) {
                        ((g.isUserSeeking = !0),
                          n.onSeek.dispatch(e),
                          c(o) &&
                            null != (e = o.groupPlayback) &&
                            e.hasJoined() &&
                            !a &&
                            (a =
                              null == (e = o.groupPlayback)
                                ? void 0
                                : e.beginSuspension(h.GroupPlaybackSuspensionReason.UserIsScrubbing)),
                          s || ((i = o.isPlaying()) && o.pause('ui-seek')));
                      }),
                      this.onSeekPreview.subscribe(function (e, t) {
                        (n.onSeekPreview.dispatch(e, t), (r = t.scrubbing));
                      }),
                      'boolean' == typeof n.getConfig().enableSeekPreview &&
                        (this.config.enableSeekPreview = n.getConfig().enableSeekPreview),
                      this.config.enableSeekPreview &&
                        this.onSeekPreview.subscribeRateLimited(this.seekWhileScrubbing, 200),
                      this.onSeeked.subscribe(function (e, t) {
                        ((g.isUserSeeking = !1),
                          g.seek(t),
                          n.onSeeked.dispatch(e),
                          i && o.play('ui-seek'),
                          c(o) &&
                            null != (e = o.groupPlayback) &&
                            e.hasJoined() &&
                            a &&
                            ((e = g.getTargetSeekPosition(t)),
                            null != (t = o.groupPlayback) && t.endSuspension(a, { proposedPlaybackTime: e }),
                            (a = void 0)));
                      }),
                      this.hasLabel() && this.getLabel().configure(o, n),
                      (u = !1),
                      (p = !1),
                      (f = function (e, t) {
                        (e && !t ? g.hide() : g.show(), l(void 0, !0), g.refreshPlaybackPosition());
                      }),
                      (e = new y.PlayerUtils.LiveStreamDetector(o, n)).onLiveChanged.subscribe(function (e, t) {
                        ((u = t.live) && null != g.smoothPlaybackPositionUpdater
                          ? (g.smoothPlaybackPositionUpdater.clear(), (g.seekBarType = m.SeekBarType.Live))
                          : (g.seekBarType = m.SeekBarType.Vod),
                          f(u, p));
                      }),
                      (t = new y.PlayerUtils.TimeShiftAvailabilityDetector(o)).onTimeShiftAvailabilityChanged.subscribe(
                        function (e, t) {
                          ((p = t.timeShiftAvailable), f(u, p));
                        },
                      ),
                      e.detect(),
                      t.detect(),
                      o.on(o.exports.PlayerEvent.PlayerResized, function () {
                        g.refreshPlaybackPosition();
                      }),
                      n.onConfigured.subscribe(function () {
                        g.refreshPlaybackPosition();
                      }),
                      o.on(o.exports.PlayerEvent.SourceLoaded, function () {
                        g.setPlaybackPosition(0);
                      }),
                      n.getConfig().events.onUpdated.subscribe(function () {
                        l();
                      }),
                      'number' == typeof n.getConfig().seekbarSnappingRange &&
                        (this.config.snappingRange = n.getConfig().seekbarSnappingRange),
                      l(),
                      this.setBufferPosition(0),
                      this.setSeekPosition(0),
                      this.config.smoothPlaybackPositionUpdateIntervalMs !==
                        b.SMOOTH_PLAYBACK_POSITION_UPDATE_DISABLED && this.configureSmoothPlaybackPositionUpdater(o, n),
                      this.initializeTimelineMarkers(o, n))
                    : (this.seekBarType = m.SeekBarType.Volume));
              }),
              (b.prototype.initializeTimelineMarkers = function (e, t) {
                var n = this,
                  o = { cssPrefix: this.config.cssPrefix, snappingRange: this.config.snappingRange };
                ((this.timelineMarkersHandler = new f.TimelineMarkersHandler(
                  o,
                  function () {
                    return n.seekBar.width();
                  },
                  this.seekBarMarkersContainer,
                )),
                  this.timelineMarkersHandler.initialize(e, t));
              }),
              (b.prototype.configureLivePausedTimeshiftUpdater = function (e, t, n) {
                var o = this;
                ((this.pausedTimeshiftUpdater = new l.Timeout(1e3, n, !0)),
                  e.on(e.exports.PlayerEvent.Paused, function () {
                    e.isLive() && e.getMaxTimeShift() < 0 && o.pausedTimeshiftUpdater.start();
                  }),
                  e.on(e.exports.PlayerEvent.Play, function () {
                    return o.pausedTimeshiftUpdater.clear();
                  }));
              }),
              (b.prototype.configureSmoothPlaybackPositionUpdater = function (t, e) {
                function n() {
                  t.isLive() || ((r = i.getRelativeCurrentTime()), i.smoothPlaybackPositionUpdater.start());
                }
                function o() {
                  i.smoothPlaybackPositionUpdater.clear();
                }
                var i = this,
                  r = 0,
                  s = 0;
                this.smoothPlaybackPositionUpdater = new l.Timeout(
                  50,
                  function () {
                    if (!i.isSeeking()) {
                      r += 0.05;
                      try {
                        s = i.getRelativeCurrentTime();
                      } catch (e) {
                        return void (
                          e instanceof t.exports.PlayerAPINotAvailableError && i.smoothPlaybackPositionUpdater.clear()
                        );
                      }
                      var e = r - s,
                        e =
                          (2 < Math.abs(e) ? (r = s) : e <= -0.05 ? (r += 0.05) : 0.05 <= e && (r -= 0.05),
                          (100 / t.getDuration()) * r);
                      i.setPlaybackPosition(e);
                    }
                  },
                  !0,
                );
                (t.on(t.exports.PlayerEvent.Play, n),
                  t.on(t.exports.PlayerEvent.Playing, n),
                  t.on(t.exports.PlayerEvent.Paused, o),
                  t.on(t.exports.PlayerEvent.PlaybackFinished, o),
                  t.on(t.exports.PlayerEvent.Seeked, function () {
                    r = i.getRelativeCurrentTime();
                  }),
                  t.on(t.exports.PlayerEvent.SourceUnloaded, o),
                  t.isPlaying() && n());
              }),
              (b.prototype.getRelativeCurrentTime = function () {
                return y.PlayerUtils.getCurrentTimeRelativeToSeekableRange(this.player);
              }),
              (b.prototype.release = function () {
                (d.prototype.release.call(this),
                  this.smoothPlaybackPositionUpdater && this.smoothPlaybackPositionUpdater.clear(),
                  this.pausedTimeshiftUpdater && this.pausedTimeshiftUpdater.clear(),
                  this.config.enableSeekPreview && this.onSeekPreview.unsubscribe(this.seekWhileScrubbing));
              }),
              (b.prototype.toDomElement = function () {
                var n = this,
                  e =
                    (this.config.vertical && this.config.cssClasses.push('vertical'),
                    new a.DOM('div', {
                      id: this.config.id,
                      class: this.getCssClasses(),
                      role: 'slider',
                      'aria-label': u.i18n.performLocalization(this.config.ariaLabel),
                      tabindex: this.config.tabIndex.toString(),
                    })),
                  t = new a.DOM('div', { class: this.prefixCss('seekbar') }),
                  o = ((this.seekBar = t), new a.DOM('div', { class: this.prefixCss('seekbar-bufferlevel') })),
                  o =
                    ((this.seekBarBufferPosition = o),
                    new a.DOM('div', { class: this.prefixCss('seekbar-playbackposition') })),
                  o =
                    ((this.seekBarPlaybackPosition = o),
                    new a.DOM('div', { class: this.prefixCss('seekbar-playbackposition-marker') })),
                  o =
                    ((this.seekBarPlaybackPositionMarker = o),
                    new a.DOM('div', { class: this.prefixCss('seekbar-seekposition') })),
                  o = ((this.seekBarSeekPosition = o), new a.DOM('div', { class: this.prefixCss('seekbar-backdrop') })),
                  o = ((this.seekBarBackdrop = o), new a.DOM('div', { class: this.prefixCss('seekbar-markers') })),
                  i =
                    ((this.seekBarMarkersContainer = o),
                    t.append(
                      this.seekBarBackdrop,
                      this.seekBarBufferPosition,
                      this.seekBarSeekPosition,
                      this.seekBarPlaybackPosition,
                      this.seekBarMarkersContainer,
                      this.seekBarPlaybackPositionMarker,
                    ),
                    !1),
                  r = function (e) {
                    (e.preventDefault(), null != n.player.vr && e.stopPropagation());
                    e = 100 * n.getOffset(e);
                    (n.setSeekPosition(e), n.setPlaybackPosition(e), n.onSeekPreviewEvent(e, !0));
                  },
                  s = function (e) {
                    (e.preventDefault(),
                      new a.DOM(document).off('touchmove mousemove', r),
                      new a.DOM(document).off('touchend mouseup', s));
                    var e = 100 * n.getOffset(e),
                      t = n.timelineMarkersHandler && n.timelineMarkersHandler.getMarkerAtPosition(e);
                    (n.setSeeking(!1), (i = !1), n.onSeekedEvent(t ? t.position : e));
                  };
                return (
                  t.on('touchstart mousedown', function (e) {
                    var t = p.BrowserUtils.isTouchSupported && n.isTouchEvent(e);
                    (e.preventDefault(),
                      null != n.player.vr && e.stopPropagation(),
                      n.setSeeking(!0),
                      (i = !0),
                      n.onSeekEvent(),
                      new a.DOM(document).on(t ? 'touchmove' : 'mousemove', r),
                      new a.DOM(document).on(t ? 'touchend' : 'mouseup', s));
                  }),
                  t.on('touchmove mousemove', function (e) {
                    (e.preventDefault(), i && r(e));
                    e = 100 * n.getOffset(e);
                    (n.setSeekPosition(e),
                      n.onSeekPreviewEvent(e, !1),
                      n.hasLabel() && n.getLabel().isHidden() && n.getLabel().show());
                  }),
                  t.on('touchend mouseleave', function (e) {
                    (e.preventDefault(), n.setSeekPosition(0), n.hasLabel() && n.getLabel().hide());
                  }),
                  e.append(t),
                  this.label && e.append(this.label.getDomElement()),
                  e
                );
              }),
              (b.prototype.getHorizontalOffset = function (e) {
                var t = this.seekBar.offset().left,
                  n = this.seekBar.width();
                return this.sanitizeOffset((1 / n) * (e - t));
              }),
              (b.prototype.getVerticalOffset = function (e) {
                var t = this.seekBar.offset().top,
                  n = this.seekBar.height();
                return 1 - this.sanitizeOffset((1 / n) * (e - t));
              }),
              (b.prototype.getOffset = function (e) {
                return p.BrowserUtils.isTouchSupported && this.isTouchEvent(e)
                  ? this.config.vertical
                    ? this.getVerticalOffset(('touchend' === e.type ? e.changedTouches : e.touches)[0].pageY)
                    : this.getHorizontalOffset(('touchend' === e.type ? e.changedTouches : e.touches)[0].pageX)
                  : e instanceof MouseEvent
                    ? this.config.vertical
                      ? this.getVerticalOffset(e.pageY)
                      : this.getHorizontalOffset(e.pageX)
                    : (console && console.warn('invalid event'), 0);
              }),
              (b.prototype.sanitizeOffset = function (e) {
                return (e < 0 ? (e = 0) : 1 < e && (e = 1), e);
              }),
              (b.prototype.setPlaybackPosition = function (e) {
                ((this.playbackPositionPercentage = e), this.setPosition(this.seekBarPlaybackPosition, e));
                ((e =
                  ((this.config.vertical
                    ? this.seekBar.height() - this.seekBarPlaybackPositionMarker.height()
                    : this.seekBar.width()) /
                    100) *
                  e),
                  this.config.vertical && (e = this.seekBar.height() - e - this.seekBarPlaybackPositionMarker.height()),
                  (e = this.config.vertical
                    ? {
                        transform: 'translateY(' + e + 'px)',
                        '-ms-transform': 'translateY(' + e + 'px)',
                        '-webkit-transform': 'translateY(' + e + 'px)',
                      }
                    : {
                        transform: 'translateX(' + e + 'px)',
                        '-ms-transform': 'translateX(' + e + 'px)',
                        '-webkit-transform': 'translateX(' + e + 'px)',
                      }));
                this.seekBarPlaybackPositionMarker.css(e);
              }),
              (b.prototype.refreshPlaybackPosition = function () {
                this.setPlaybackPosition(this.playbackPositionPercentage);
              }),
              (b.prototype.setBufferPosition = function (e) {
                this.setPosition(this.seekBarBufferPosition, e);
              }),
              (b.prototype.setSeekPosition = function (e) {
                this.setPosition(this.seekBarSeekPosition, e);
              }),
              (b.prototype.setPosition = function (e, t) {
                ((t /= 100),
                  0.99999 <= t && t <= 1.00001 && (t = 0.99999),
                  (t = this.config.vertical
                    ? {
                        transform: 'scaleY(' + t + ')',
                        '-ms-transform': 'scaleY(' + t + ')',
                        '-webkit-transform': 'scaleY(' + t + ')',
                      }
                    : {
                        transform: 'scaleX(' + t + ')',
                        '-ms-transform': 'scaleX(' + t + ')',
                        '-webkit-transform': 'scaleX(' + t + ')',
                      }));
                e.css(t);
              }),
              (b.prototype.setSeeking = function (e) {
                e
                  ? this.getDomElement().addClass(this.prefixCss(b.CLASS_SEEKING))
                  : this.getDomElement().removeClass(this.prefixCss(b.CLASS_SEEKING));
              }),
              (b.prototype.isSeeking = function () {
                return this.getDomElement().hasClass(this.prefixCss(b.CLASS_SEEKING));
              }),
              (b.prototype.hasLabel = function () {
                return null != this.label;
              }),
              (b.prototype.getLabel = function () {
                return this.label;
              }),
              (b.prototype.onSeekEvent = function () {
                this.seekBarEvents.onSeek.dispatch(this);
              }),
              (b.prototype.onSeekPreviewEvent = function (e, t) {
                var n,
                  o = (this.timelineMarkersHandler && this.timelineMarkersHandler.getMarkerAtPosition(e)) || void 0,
                  i = e;
                (o &&
                  (!(0 < (null != (n = o.duration) ? n : 0)) || e < o.position
                    ? (i = o.position)
                    : e > o.position + o.duration && (i = o.position + o.duration)),
                  this.label && this.label.getDomElement().css({ left: i + '%' }),
                  this.seekBarEvents.onSeekPreview.dispatch(this, { scrubbing: t, position: i, marker: o }));
              }),
              (b.prototype.onSeekedEvent = function (e) {
                this.seekBarEvents.onSeeked.dispatch(this, e);
              }),
              Object.defineProperty(b.prototype, 'onSeek', {
                get: function () {
                  return this.seekBarEvents.onSeek.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(b.prototype, 'onSeekPreview', {
                get: function () {
                  return this.seekBarEvents.onSeekPreview.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(b.prototype, 'onSeeked', {
                get: function () {
                  return this.seekBarEvents.onSeeked.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              (b.prototype.onShowEvent = function () {
                (d.prototype.onShowEvent.call(this), this.refreshPlaybackPosition());
              }),
              (b.prototype.isTouchEvent = function (e) {
                return window.TouchEvent && e instanceof TouchEvent;
              }),
              (b.SMOOTH_PLAYBACK_POSITION_UPDATE_DISABLED = -1),
              (b.CLASS_SEEKING = 'seeking'),
              b);
          function b(e) {
            var n = d.call(this, (e = void 0 === e ? {} : e)) || this,
              t =
                ((n.playbackPositionPercentage = 0),
                (n.isUserSeeking = !1),
                (n.seekBarEvents = {
                  onSeek: new s.EventDispatcher(),
                  onSeekPreview: new s.EventDispatcher(),
                  onSeeked: new s.EventDispatcher(),
                }),
                (n.seekWhileScrubbing = function (e, t) {
                  t.scrubbing && n.seek(t.position);
                }),
                (n.getTargetSeekPosition = function (e) {
                  var t;
                  return n.player.isLive()
                    ? (t = n.player.getMaxTimeShift()) - t * (e / 100)
                    : ((t = y.PlayerUtils.getSeekableRangeStart(n.player, 0)), n.player.getDuration() * (e / 100) + t);
                }),
                (n.seek = function (e) {
                  e = n.getTargetSeekPosition(e);
                  n.player.isLive() ? n.player.timeShift(e, 'ui') : n.player.seek(e, 'ui');
                }),
                n.config.keyStepIncrements || { leftRight: 1, upDown: 5 });
            return (
              (n.config = n.mergeConfig(
                e,
                {
                  cssClass: 'ui-seekbar',
                  vertical: !1,
                  smoothPlaybackPositionUpdateIntervalMs: 50,
                  keyStepIncrements: t,
                  ariaLabel: u.i18n.getLocalizer('seekBar'),
                  tabIndex: 0,
                  snappingRange: 1,
                  enableSeekPreview: !0,
                },
                n.config,
              )),
              (n.label = n.config.label),
              n
            );
          }
          n.SeekBar = e;
        },
        {
          '../browserutils': 3,
          '../dom': 81,
          '../eventdispatcher': 83,
          '../localization/i18n': 88,
          '../playerutils': 95,
          '../stringutils': 108,
          '../timeout': 110,
          './../groupplaybackapi': 85,
          './component': 19,
          './seekbarbufferlevel': 40,
          './seekbarcontroller': 41,
          './timelinemarkershandler': 69,
        },
      ],
      40: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.getMinBufferLevel = function (e) {
              var t = e.getDuration(),
                n = e.getVideoBufferLength(),
                e = e.getAudioBufferLength(),
                n = Math.min(null != n ? n : Number.MAX_VALUE, null != e ? e : Number.MAX_VALUE);
              n === Number.MAX_VALUE && (n = 0);
              return (100 / t) * n;
            }));
        },
        {},
      ],
      41: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }), (n.SeekBarController = n.SeekBarType = void 0));
          function r(e, t, n) {
            e < t.min ? n(t.min) : e > t.max ? n(t.max) : n(e);
          }
          var o,
            i = e('../uiutils');
          (((e = o || (n.SeekBarType = o = {}))[(e.Vod = 0)] = 'Vod'),
            (e[(e.Live = 1)] = 'Live'),
            (e[(e.Volume = 2)] = 'Volume'));
          function s(e, t, n) {
            ((this.keyStepIncrements = e), (this.player = t), (this.volumeController = n));
          }
          ((s.prototype.arrowKeyControls = function (e, t, n) {
            var o = this,
              i = Math.floor(e);
            return {
              left: function () {
                return r(i - o.keyStepIncrements.leftRight, t, n);
              },
              right: function () {
                return r(i + o.keyStepIncrements.leftRight, t, n);
              },
              up: function () {
                return r(i + o.keyStepIncrements.upDown, t, n);
              },
              down: function () {
                return r(i - o.keyStepIncrements.upDown, t, n);
              },
              home: function () {
                return r(t.min, t, n);
              },
              end: function () {
                return r(t.max, t, n);
              },
            };
          }),
            (s.prototype.seekBarControls = function (e) {
              return e === o.Live
                ? this.arrowKeyControls(
                    this.player.getTimeShift(),
                    { min: this.player.getMaxTimeShift(), max: 0 },
                    this.player.timeShift,
                  )
                : e === o.Vod
                  ? this.arrowKeyControls(
                      this.player.getCurrentTime(),
                      { min: 0, max: this.player.getDuration() },
                      this.player.seek,
                    )
                  : e === o.Volume && null != this.volumeController
                    ? ((e = this.volumeController.startTransition()),
                      this.arrowKeyControls(this.player.getVolume(), { min: 0, max: 100 }, e.finish.bind(e)))
                    : void 0;
            }),
            (s.prototype.setSeekBarControls = function (e, n) {
              var o = this;
              e.on('keydown', function (e) {
                var t = o.seekBarControls(n());
                switch (e.keyCode) {
                  case i.UIUtils.KeyCode.LeftArrow:
                    (null != t && t.left(), e.preventDefault());
                    break;
                  case i.UIUtils.KeyCode.RightArrow:
                    (null != t && t.right(), e.preventDefault());
                    break;
                  case i.UIUtils.KeyCode.UpArrow:
                    (null != t && t.up(), e.preventDefault());
                    break;
                  case i.UIUtils.KeyCode.DownArrow:
                    (null != t && t.down(), e.preventDefault());
                    break;
                  case i.UIUtils.KeyCode.Home:
                    (null != t && t.home(), e.preventDefault());
                    break;
                  case i.UIUtils.KeyCode.End:
                    (null != t && t.end(), e.preventDefault());
                    break;
                  case i.UIUtils.KeyCode.Space:
                    (o.player.isPlaying() ? o.player.pause() : o.player.play(), e.preventDefault());
                }
              });
            }),
            (n.SeekBarController = s));
        },
        { '../uiutils': 114 },
      ],
      42: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.SeekBarLabel = void 0), e('./container')),
            a = e('./label'),
            l = e('./component'),
            c = e('../stringutils'),
            u = e('../imageloader'),
            p = e('../playerutils'),
            e =
              ((i = s.Container),
              r(f, i),
              (f.prototype.configure = function (e, t) {
                function n() {
                  ((o.timeFormat =
                    3600 <= Math.abs(e.isLive() ? e.getMaxTimeShift() : e.getDuration())
                      ? c.StringUtils.FORMAT_HHMMSS
                      : c.StringUtils.FORMAT_MMSS),
                    o.setTitleText(void 0),
                    o.setThumbnail(null));
                }
                var o = this;
                (i.prototype.configure.call(this, e, t),
                  (this.player = e),
                  (this.uiManager = t).onSeekPreview.subscribeRateLimited(this.handleSeekPreview, 100));
                (t.getConfig().events.onUpdated.subscribe(n), n());
              }),
              (f.prototype.setText = function (e) {
                this.timeLabel.setText(e);
              }),
              (f.prototype.setTime = function (e) {
                this.setText(c.StringUtils.secondsToTime(e, this.timeFormat));
              }),
              (f.prototype.setTitleText = function (e) {
                this.titleLabel.setText((e = void 0 === e ? '' : e));
              }),
              (f.prototype.setThumbnail = function (o) {
                var i = this,
                  r = (void 0 === o && (o = null), this.thumbnail.getDomElement());
                null == o
                  ? r.css({ 'background-image': '', display: '', width: '', height: '' })
                  : this.thumbnailImageLoader.load(o.url, function (e, t, n) {
                      void 0 !== o.x ? r.css(i.thumbnailCssSprite(o, t, n)) : r.css(i.thumbnailCssSingleImage(o, t, n));
                    });
              }),
              (f.prototype.thumbnailCssSprite = function (e, t, n) {
                var t = 100 * (t / e.width),
                  n = 100 * (n / e.height),
                  o = 100 * (e.x / e.width),
                  i = 100 * (e.y / e.height),
                  r = (1 / e.width) * e.height;
                return {
                  display: 'inherit',
                  'background-image': 'url('.concat(e.url, ')'),
                  'padding-bottom': ''.concat(100 * r, '%'),
                  'background-size': ''.concat(t, '% ').concat(n, '%'),
                  'background-position': '-'.concat(o, '% -').concat(i, '%'),
                };
              }),
              (f.prototype.thumbnailCssSingleImage = function (e, t, n) {
                t = (1 / t) * n;
                return {
                  display: 'inherit',
                  'background-image': 'url('.concat(e.url, ')'),
                  'padding-bottom': ''.concat(100 * t, '%'),
                  'background-size': '100% 100%',
                  'background-position': '0 0',
                };
              }),
              (f.prototype.release = function () {
                (i.prototype.release.call(this), this.uiManager.onSeekPreview.unsubscribe(this.handleSeekPreview));
              }),
              f);
          function f(e) {
            var r = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (r.appliedMarkerCssClasses = []),
              (r.handleSeekPreview = function (e, t) {
                var n, o, i;
                (r.player.isLive()
                  ? ((n = (n = r.player.getMaxTimeShift()) - n * (t.position / 100)),
                    r.setTime(n),
                    (n = n),
                    (o = r.player.getTimeShift()),
                    (o = r.player.getCurrentTime() - o + n),
                    r.setThumbnail(null != (n = r.player.getThumbnail(o)) ? n : void 0))
                  : ((o = r.player.getDuration() * (t.position / 100)),
                    r.setTime(o),
                    (n = p.PlayerUtils.getSeekableRangeStart(r.player, 0)),
                    r.setThumbnail(null != (i = r.player.getThumbnail(o + n)) ? i : void 0)),
                  t.marker ? r.setTitleText(t.marker.marker.title) : r.setTitleText(void 0),
                  0 < r.appliedMarkerCssClasses.length &&
                    (r.getDomElement().removeClass(r.appliedMarkerCssClasses.join(' ')),
                    (r.appliedMarkerCssClasses = [])),
                  t.marker &&
                    ((i = (t.marker.marker.cssClasses || []).map(function (e) {
                      return r.prefixCss(e);
                    })),
                    r.getDomElement().addClass(i.join(' ')),
                    (r.appliedMarkerCssClasses = i)));
              }),
              (r.timeLabel = new a.Label({ cssClasses: ['seekbar-label-time'] })),
              (r.titleLabel = new a.Label({ cssClasses: ['seekbar-label-title'] })),
              (r.thumbnail = new l.Component({ cssClasses: ['seekbar-thumbnail'], role: 'img' })),
              (r.thumbnailImageLoader = new u.ImageLoader()),
              (r.config = r.mergeConfig(
                e,
                {
                  cssClass: 'ui-seekbar-label',
                  components: [
                    new s.Container({
                      components: [
                        r.thumbnail,
                        new s.Container({
                          components: [r.titleLabel, r.timeLabel],
                          cssClass: 'seekbar-label-metadata',
                        }),
                      ],
                      cssClass: 'seekbar-label-inner',
                    }),
                  ],
                  hidden: !0,
                },
                r.config,
              )),
              r
            );
          }
          n.SeekBarLabel = e;
        },
        {
          '../imageloader': 87,
          '../playerutils': 95,
          '../stringutils': 108,
          './component': 19,
          './container': 20,
          './label': 27,
        },
      ],
      43: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.SelectBox = void 0), e('./listselector')),
            a = e('../dom'),
            l = e('../localization/i18n'),
            e =
              ((i = s.ListSelector),
              r(c, i),
              (c.prototype.toDomElement = function () {
                var e,
                  t = this,
                  n = new a.DOM('select', {
                    id: null != (e = this.config.id) ? e : '',
                    class: this.getCssClasses(),
                    'aria-label': l.i18n.performLocalization(null != (e = this.config.ariaLabel) ? e : ''),
                  });
                return (
                  (this.selectElement = n),
                  this.updateDomItems(),
                  n.on('change', function () {
                    var e = n.val();
                    t.onItemSelectedEvent(e, !1);
                  }),
                  n
                );
              }),
              (c.prototype.updateDomItems = function (e) {
                (void 0 === e && (e = null), this.selectElement.empty());
                for (var t = 0, n = this.items; t < n.length; t++) {
                  var o = n[t],
                    i = new a.DOM('option', { value: String(o.key) }).html(l.i18n.performLocalization(o.label));
                  (o.key === String(e) && i.attr('selected', 'selected'), this.selectElement.append(i));
                }
              }),
              (c.prototype.onItemAddedEvent = function (e) {
                (i.prototype.onItemAddedEvent.call(this, e), this.updateDomItems(this.selectedItem));
              }),
              (c.prototype.onItemRemovedEvent = function (e) {
                (i.prototype.onItemRemovedEvent.call(this, e), this.updateDomItems(this.selectedItem));
              }),
              (c.prototype.onItemSelectedEvent = function (e, t) {
                (void 0 === t && (t = !0), i.prototype.onItemSelectedEvent.call(this, e), t && this.updateDomItems(e));
              }),
              c);
          function c(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return ((t.config = t.mergeConfig(e, { cssClass: 'ui-selectbox' }, t.config)), t);
          }
          n.SelectBox = e;
        },
        { '../dom': 81, '../localization/i18n': 88, './listselector': 29 },
      ],
      44: [
        function (e, t, n) {
          var o,
            i,
            r,
            s =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            a = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.SettingsPanel = void 0), e('./container')),
            l = e('./selectbox'),
            c = e('../timeout'),
            u = e('../eventdispatcher'),
            p = e('./settingspanelpage'),
            e =
              (((e = i = i || {})[(e.Forwards = 0)] = 'Forwards'),
              (e[(e.Backwards = 1)] = 'Backwards'),
              (r = a.Container),
              s(f, r),
              (f.prototype.configure = function (e, t) {
                var n = this,
                  o = (r.prototype.configure.call(this, e, t), this.getConfig());
                (t.onControlsHide.subscribe(function () {
                  var e;
                  (-1 < (null != (e = o.hideDelay) ? e : 3e3) && n.hide(), n.hideHoveredSelectBoxes());
                }),
                  -1 < (null != (e = o.hideDelay) ? e : 3e3) &&
                    ((this.hideTimeout = new c.Timeout(null != (t = o.hideDelay) ? t : 3e3, function () {
                      (n.hide(), n.hideHoveredSelectBoxes());
                    })),
                    this.getDomElement().on('mouseenter', function () {
                      n.hideTimeout.clear();
                    }),
                    this.getDomElement().on('mouseleave', function () {
                      n.hideTimeout.reset();
                    }),
                    this.getDomElement().on('focusin', function () {
                      n.hideTimeout.clear();
                    }),
                    this.getDomElement().on('focusout', function () {
                      n.hideTimeout.reset();
                    })),
                  this.onHide.subscribe(function () {
                    var e;
                    (-1 < (null != (e = o.hideDelay) ? e : 3e3) && n.hideTimeout.clear(),
                      n.activePage.onInactiveEvent());
                  }),
                  this.onShow.subscribe(function () {
                    var e;
                    (n.resetNavigation(!0),
                      n.activePage.onActiveEvent(),
                      -1 < (null != (e = o.hideDelay) ? e : 3e3) && n.hideTimeout.start());
                  }),
                  this.getRootPage().onSettingsStateChanged.subscribe(function () {
                    n.onSettingsStateChangedEvent();
                  }),
                  this.updateActivePageClass());
              }),
              (f.prototype.getActivePage = function () {
                return this.activePage;
              }),
              (f.prototype.setActivePageIndex = function (e) {
                this.setActivePage(this.getPages()[e]);
              }),
              (f.prototype.setActivePage = function (e) {
                e === this.getActivePage()
                  ? console.warn('Page is already the current one ... skipping navigation')
                  : this.navigateToPage(e, this.getActivePage(), i.Forwards, !this.config.pageTransitionAnimation);
              }),
              (f.prototype.popToRootSettingsPanelPage = function () {
                var e;
                this.resetNavigation(null == (e = this.config.pageTransitionAnimation) || e);
              }),
              (f.prototype.popSettingsPanelPage = function () {
                var e;
                0 === this.navigationStack.length
                  ? console.warn('Already on the root page ... skipping navigation')
                  : ((e = (e = this.navigationStack[this.navigationStack.length - 2]) || this.getRootPage()),
                    this.navigateToPage(e, this.activePage, i.Backwards, !this.config.pageTransitionAnimation));
              }),
              (f.prototype.rootPageHasActiveSettings = function () {
                return this.getRootPage().hasActiveSettings();
              }),
              (f.prototype.getPages = function () {
                var e;
                return (null != (e = this.config.components) ? e : []).filter(function (e) {
                  return e instanceof p.SettingsPanelPage;
                });
              }),
              Object.defineProperty(f.prototype, 'onSettingsStateChanged', {
                get: function () {
                  return this.settingsPanelEvents.onSettingsStateChanged.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              (f.prototype.release = function () {
                (r.prototype.release.call(this), this.hideTimeout && this.hideTimeout.clear());
              }),
              (f.prototype.addComponent = function (e) {
                (0 === this.getPages().length && e instanceof p.SettingsPanelPage && (this.activePage = e),
                  r.prototype.addComponent.call(this, e));
              }),
              (f.prototype.updateActivePageClass = function () {
                var t = this;
                this.getPages().forEach(function (e) {
                  e === t.activePage
                    ? e.getDomElement().addClass(t.prefixCss(f.CLASS_ACTIVE_PAGE))
                    : e.getDomElement().removeClass(t.prefixCss(f.CLASS_ACTIVE_PAGE));
                });
              }),
              (f.prototype.resetNavigation = function (e) {
                var t = this.getActivePage(),
                  n = this.getRootPage();
                (t && !e && t.onInactiveEvent(),
                  (this.navigationStack = []),
                  this.animateNavigation(n, t, e),
                  (this.activePage = n),
                  this.updateActivePageClass());
              }),
              (f.prototype.navigateToPage = function (e, t, n, o) {
                ((this.activePage = e),
                  n === i.Forwards ? this.navigationStack.push(e) : this.navigationStack.pop(),
                  this.animateNavigation(e, t, o),
                  this.updateActivePageClass(),
                  e.onActiveEvent(),
                  t.onInactiveEvent());
              }),
              (f.prototype.animateNavigation = function (e, t, n) {
                var o, i, r, s, a, l;
                this.config.pageTransitionAnimation &&
                  ((i = this.getDomElement()),
                  (r = (l = this.getDomElement().get(0)).scrollWidth),
                  (s = l.scrollHeight),
                  t.getDomElement().css('display', 'none'),
                  this.getDomElement().css({ width: '', height: '' }),
                  (a = (e = e.getDomElement().get(0)).cloneNode(!0)),
                  null != (e = e.parentNode) && e.appendChild(a),
                  (a.style.display = 'block'),
                  (e = l.scrollWidth),
                  (l = l.scrollHeight),
                  null != (o = a.parentElement) && o.removeChild(a),
                  t.getDomElement().css('display', ''),
                  i.css({ width: r + 'px', height: s + 'px' }),
                  n || this.forceBrowserReflow(),
                  i.css({ width: e + 'px', height: l + 'px' }));
              }),
              (f.prototype.forceBrowserReflow = function () {
                this.getDomElement().get(0).offsetLeft;
              }),
              (f.prototype.hideHoveredSelectBoxes = function () {
                this.getComputedItems().forEach(function (e) {
                  var t, n;
                  e.isActive() &&
                    e.setting instanceof l.SelectBox &&
                    ((t = e.setting), 'none' !== (n = t.getDomElement().css('display'))) &&
                    (t.getDomElement().css('display', 'none'),
                    null != window.requestAnimationFrame
                      ? requestAnimationFrame(function () {
                          t.getDomElement().css('display', null != n ? n : '');
                        })
                      : t.getDomElement().css('display', null != n ? n : ''));
                });
              }),
              (f.prototype.getComputedItems = function () {
                for (var e = [], t = 0, n = this.getPages(); t < n.length; t++) {
                  var o = n[t];
                  e.push.apply(e, o.getItems());
                }
                return e;
              }),
              (f.prototype.getRootPage = function () {
                return this.getPages()[0];
              }),
              (f.prototype.onSettingsStateChangedEvent = function () {
                this.settingsPanelEvents.onSettingsStateChanged.dispatch(this);
              }),
              (f.CLASS_ACTIVE_PAGE = 'active'),
              f);
          function f(e) {
            var t = r.call(this, e) || this;
            return (
              (t.navigationStack = []),
              (t.settingsPanelEvents = { onSettingsStateChanged: new u.EventDispatcher() }),
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-settings-panel', hideDelay: 3e3, pageTransitionAnimation: !0 },
                t.config,
              )),
              (t.activePage = t.getRootPage()),
              t
            );
          }
          n.SettingsPanel = e;
        },
        {
          '../eventdispatcher': 83,
          '../timeout': 110,
          './container': 20,
          './selectbox': 43,
          './settingspanelpage': 46,
        },
      ],
      45: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }), (n.SettingsPanelItem = void 0), e('./container')),
            a = e('./component'),
            l = e('../eventdispatcher'),
            c = e('./label'),
            u = e('./selectbox'),
            p = e('./listbox'),
            f = e('./videoqualityselectbox'),
            g = e('./audioqualityselectbox'),
            d = e('./playbackspeedselectbox'),
            e =
              ((i = s.Container),
              r(h, i),
              (h.prototype.configure = function (e, t) {
                var n,
                  o = this;
                (this.setting instanceof u.SelectBox || this.setting instanceof p.ListBox) &&
                  (this.setting.onItemAdded.subscribe(
                    (n = function () {
                      var e;
                      (o.setting instanceof u.SelectBox || o.setting instanceof p.ListBox) &&
                        ((e = 2),
                        ((o.setting instanceof f.VideoQualitySelectBox && o.setting.hasAutoItem()) ||
                          o.setting instanceof g.AudioQualitySelectBox) &&
                          (e = 3),
                        o.setting.itemCount() < e ||
                        (o.setting instanceof d.PlaybackSpeedSelectBox && !t.getConfig().playbackSpeedSelectionEnabled)
                          ? o.hide()
                          : o.show(),
                        o.onActiveChangedEvent(),
                        o.getDomElement().attr('aria-haspopup', 'true'));
                    }),
                  ),
                  this.setting.onItemRemoved.subscribe(n),
                  n());
              }),
              (h.prototype.isActive = function () {
                return this.isShown();
              }),
              (h.prototype.onActiveChangedEvent = function () {
                this.settingsPanelItemEvents.onActiveChanged.dispatch(this);
              }),
              Object.defineProperty(h.prototype, 'onActiveChanged', {
                get: function () {
                  return this.settingsPanelItemEvents.onActiveChanged.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              h);
          function h(e, t, n) {
            var o = i.call(this, (n = void 0 === n ? {} : n)) || this;
            return (
              (o.settingsPanelItemEvents = { onActiveChanged: new l.EventDispatcher() }),
              (o.setting = t),
              (o.config = o.mergeConfig(n, { cssClass: 'ui-settings-panel-item', role: 'menuitem' }, o.config)),
              null !== e &&
                (e instanceof a.Component
                  ? (o.label = e)
                  : (o.label = new c.Label({ text: e, for: o.setting.getConfig().id })),
                o.addComponent(o.label)),
              o.addComponent(o.setting),
              o
            );
          }
          n.SettingsPanelItem = e;
        },
        {
          '../eventdispatcher': 83,
          './audioqualityselectbox': 8,
          './component': 19,
          './container': 20,
          './label': 27,
          './listbox': 28,
          './playbackspeedselectbox': 32,
          './selectbox': 43,
          './videoqualityselectbox': 74,
        },
      ],
      46: [
        function (e, t, n) {
          var o,
            s,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r =
              (Object.defineProperty(n, '__esModule', { value: !0 }), (n.SettingsPanelPage = void 0), e('./container')),
            a = e('./settingspanelitem'),
            l = e('../eventdispatcher'),
            c = e('../browserutils'),
            e =
              ((s = r.Container),
              i(u, s),
              (u.prototype.configure = function (e, t) {
                for (
                  var i = this,
                    n =
                      (s.prototype.configure.call(this, e, t),
                      function () {
                        i.onSettingsStateChangedEvent();
                        for (var e = null, t = 0, n = i.getItems(); t < n.length; t++) {
                          var o = n[t];
                          (o.getDomElement().removeClass(i.prefixCss(u.CLASS_LAST)), o.isShown() && (e = o));
                        }
                        e && e.getDomElement().addClass(i.prefixCss(u.CLASS_LAST));
                      }),
                    o = 0,
                    r = this.getItems();
                  o < r.length;
                  o++
                )
                  r[o].onActiveChanged.subscribe(n);
              }),
              (u.prototype.hasActiveSettings = function () {
                for (var e = 0, t = this.getItems(); e < t.length; e++) if (t[e].isActive()) return !0;
                return !1;
              }),
              (u.prototype.getItems = function () {
                var e;
                return (null != (e = this.config.components) ? e : []).filter(function (e) {
                  return e instanceof a.SettingsPanelItem;
                });
              }),
              (u.prototype.onSettingsStateChangedEvent = function () {
                this.settingsPanelPageEvents.onSettingsStateChanged.dispatch(this);
              }),
              Object.defineProperty(u.prototype, 'onSettingsStateChanged', {
                get: function () {
                  return this.settingsPanelPageEvents.onSettingsStateChanged.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              (u.prototype.onActiveEvent = function () {
                var e = this.getItems().filter(function (e) {
                  return e.isActive();
                });
                (this.settingsPanelPageEvents.onActive.dispatch(this),
                  !(0 < e.length) ||
                    c.BrowserUtils.isIOS ||
                    (c.BrowserUtils.isMacIntel && c.BrowserUtils.isTouchSupported) ||
                    e[0].getDomElement().focusToFirstInput());
              }),
              Object.defineProperty(u.prototype, 'onActive', {
                get: function () {
                  return this.settingsPanelPageEvents.onActive.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              (u.prototype.onInactiveEvent = function () {
                this.settingsPanelPageEvents.onInactive.dispatch(this);
              }),
              Object.defineProperty(u.prototype, 'onInactive', {
                get: function () {
                  return this.settingsPanelPageEvents.onInactive.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              (u.CLASS_LAST = 'last'),
              u);
          function u(e) {
            var t = s.call(this, e) || this;
            return (
              (t.settingsPanelPageEvents = {
                onSettingsStateChanged: new l.EventDispatcher(),
                onActive: new l.EventDispatcher(),
                onInactive: new l.EventDispatcher(),
              }),
              (t.config = t.mergeConfig(e, { cssClass: 'ui-settings-panel-page', role: 'menu' }, t.config)),
              t
            );
          }
          n.SettingsPanelPage = e;
        },
        { '../browserutils': 3, '../eventdispatcher': 83, './container': 20, './settingspanelitem': 45 },
      ],
      47: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            e =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.SettingsPanelPageBackButton = void 0),
              e('./settingspanelpagenavigatorbutton')),
            e =
              ((i = e.SettingsPanelPageNavigatorButton),
              r(s, i),
              (s.prototype.configure = function (e, t) {
                var n = this;
                (i.prototype.configure.call(this, e, t),
                  this.onClick.subscribe(function () {
                    n.popPage();
                  }));
              }),
              s);
          function s(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(e, { cssClass: 'ui-settingspanelpagebackbutton', text: 'back' }, t.config)),
              t
            );
          }
          n.SettingsPanelPageBackButton = e;
        },
        { './settingspanelpagenavigatorbutton': 48 },
      ],
      48: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            e =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.SettingsPanelPageNavigatorButton = void 0),
              e('./button')),
            e =
              ((i = e.Button),
              r(s, i),
              (s.prototype.popPage = function () {
                this.container.popSettingsPanelPage();
              }),
              (s.prototype.pushTargetPage = function () {
                this.targetPage && this.container.setActivePage(this.targetPage);
              }),
              s);
          function s(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(e, {}, t.config)),
              (t.container = t.config.container),
              (t.targetPage = t.config.targetPage),
              t
            );
          }
          n.SettingsPanelPageNavigatorButton = e;
        },
        { './button': 13 },
      ],
      49: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.SettingsPanelPageOpenButton = void 0),
              e('./settingspanelpagenavigatorbutton')),
            a = e('../localization/i18n'),
            e =
              ((i = s.SettingsPanelPageNavigatorButton),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                var n = this;
                (i.prototype.configure.call(this, e, t),
                  this.getDomElement().attr('aria-haspopup', 'true'),
                  this.getDomElement().attr(
                    'aria-owns',
                    null != (t = null == (e = this.config.targetPage) ? void 0 : e.getConfig().id) ? t : '',
                  ),
                  this.onClick.subscribe(function () {
                    n.pushTargetPage();
                  }));
              }),
              l);
          function l(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-settingspanelpageopenbutton', text: a.i18n.getLocalizer('open'), role: 'menuitem' },
                t.config,
              )),
              t
            );
          }
          n.SettingsPanelPageOpenButton = e;
        },
        { '../localization/i18n': 88, './settingspanelpagenavigatorbutton': 48 },
      ],
      50: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.SettingsToggleButton = void 0),
              e('./togglebutton')),
            a = e('./settingspanel'),
            l = e('../arrayutils'),
            c = e('../localization/i18n'),
            e =
              ((i = s.ToggleButton),
              r(u, i),
              (u.prototype.configure = function (e, t) {
                var n = this,
                  e = (i.prototype.configure.call(this, e, t), this.getConfig()),
                  o = e.settingsPanel;
                (this.onClick.subscribe(function () {
                  (o.isShown() ||
                    n.visibleSettingsPanels.slice().forEach(function (e) {
                      return e.hide();
                    }),
                    o.toggleHidden());
                }),
                  o.onShow.subscribe(function () {
                    n.on();
                  }),
                  o.onHide.subscribe(function () {
                    n.off();
                  }),
                  t.onComponentShow.subscribe(function (e) {
                    e instanceof a.SettingsPanel &&
                      (n.visibleSettingsPanels.push(e),
                      e.onHide.subscribeOnce(function () {
                        return l.ArrayUtils.remove(n.visibleSettingsPanels, e);
                      }));
                  }),
                  e.autoHideWhenNoActiveSettings &&
                    (o.onSettingsStateChanged.subscribe(
                      (t = function () {
                        o.rootPageHasActiveSettings() ? n.isHidden() && n.show() : n.isShown() && n.hide();
                      }),
                    ),
                    t()));
              }),
              u);
          function u(e) {
            var t = i.call(this, e) || this;
            if (((t.visibleSettingsPanels = []), e.settingsPanel))
              return (
                (t.config = t.mergeConfig(
                  e,
                  {
                    cssClass: 'ui-settingstogglebutton',
                    text: c.i18n.getLocalizer('settings'),
                    settingsPanel: null,
                    autoHideWhenNoActiveSettings: !0,
                    role: 'pop-up button',
                  },
                  t.config,
                )),
                t
                  .getDomElement()
                  .attr('aria-owns', null != (e = e.settingsPanel.getActivePage().getConfig().id) ? e : ''),
                t.getDomElement().attr('aria-haspopup', 'true'),
                t
              );
            throw new Error('Required SettingsPanel is missing');
          }
          n.SettingsToggleButton = e;
        },
        { '../arrayutils': 1, '../localization/i18n': 88, './settingspanel': 44, './togglebutton': 71 },
      ],
      51: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            e = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.Spacer = void 0), e('./component')),
            e =
              ((i = e.Component),
              r(s, i),
              (s.prototype.onShowEvent = function () {}),
              (s.prototype.onHideEvent = function () {}),
              (s.prototype.onHoverChangedEvent = function (e) {}),
              s);
          function s(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return ((t.config = t.mergeConfig(e, { cssClass: 'ui-spacer' }, t.config)), t);
          }
          n.Spacer = e;
        },
        { './component': 19 },
      ],
      52: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.SubtitleListBox = void 0), e('./listbox')),
            a = e('../subtitleutils'),
            e =
              ((i = s.ListBox),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                (i.prototype.configure.call(this, e, t), new a.SubtitleSwitchHandler(e, this, t));
              }),
              l);
          function l() {
            return (null !== i && i.apply(this, arguments)) || this;
          }
          n.SubtitleListBox = e;
        },
        { '../subtitleutils': 109, './listbox': 28 },
      ],
      53: [
        function (e, t, n) {
          var o,
            s,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.SubtitleRegionContainer =
                n.SubtitleRegionContainerManager =
                n.SubtitleLabel =
                n.SubtitleOverlay =
                  void 0),
              e('./container')),
            a = e('./label'),
            l = e('./controlbar'),
            c = e('../eventdispatcher'),
            u = e('../dom'),
            p = e('../localization/i18n'),
            f = e('../vttutils'),
            e =
              ((s = r.Container),
              i(g, s),
              (g.prototype.configure = function (e, o) {
                function t() {
                  (i.hide(), i.subtitleContainerManager.clear(), r.clear(), i.removeComponents(), i.updateComponents());
                }
                function n() {
                  r.clearInactiveCues(e.getCurrentTime()).forEach(function (e) {
                    i.subtitleContainerManager.removeLabel(e.label);
                  });
                }
                var i = this,
                  r = (s.prototype.configure.call(this, e, o), new m());
                ((this.subtitleManager = r),
                  (this.subtitleContainerManager = new v(this)),
                  e.on(e.exports.PlayerEvent.CueEnter, function (e) {
                    var t = i.generateLabel(e);
                    (r.cueEnter(e, t),
                      i.preprocessLabelEventCallback.dispatch(e, t),
                      i.previewSubtitleActive && i.subtitleContainerManager.removeLabel(i.previewSubtitle),
                      i.show(),
                      i.subtitleContainerManager.addLabel(t, i.getDomElement().size()),
                      i.updateComponents(),
                      o.getConfig().forceSubtitlesIntoViewContainer && i.handleSubtitleCropping(t));
                  }),
                  e.on(e.exports.PlayerEvent.CueUpdate, function (e) {
                    var t = i.generateLabel(e),
                      n = r.cueUpdate(e, t);
                    (i.preprocessLabelEventCallback.dispatch(e, t),
                      n && i.subtitleContainerManager.replaceLabel(n, t),
                      o.getConfig().forceSubtitlesIntoViewContainer && i.handleSubtitleCropping(t));
                  }),
                  e.on(e.exports.PlayerEvent.CueExit, function (e) {
                    e = r.cueExit(e);
                    (e && (i.subtitleContainerManager.removeLabel(e), i.updateComponents()),
                      r.hasCues ||
                        (i.previewSubtitleActive
                          ? (i.subtitleContainerManager.addLabel(i.previewSubtitle), i.updateComponents())
                          : i.hide()));
                  }));
                (e.on(e.exports.PlayerEvent.AudioChanged, t),
                  e.on(e.exports.PlayerEvent.SubtitleEnabled, t),
                  e.on(e.exports.PlayerEvent.SubtitleDisabled, t),
                  e.on(e.exports.PlayerEvent.Seeked, n),
                  e.on(e.exports.PlayerEvent.TimeShifted, n),
                  e.on(e.exports.PlayerEvent.PlaybackFinished, t),
                  e.on(e.exports.PlayerEvent.SourceUnloaded, t),
                  o.onComponentShow.subscribe(function (e) {
                    e instanceof l.ControlBar && i.getDomElement().addClass(i.prefixCss(g.CLASS_CONTROLBAR_VISIBLE));
                  }),
                  o.onComponentHide.subscribe(function (e) {
                    e instanceof l.ControlBar && i.getDomElement().removeClass(i.prefixCss(g.CLASS_CONTROLBAR_VISIBLE));
                  }),
                  this.configureCea608Captions(e, o),
                  t());
              }),
              (g.prototype.detectCroppedSubtitleLabel = function (e) {
                var t = this.getDomElement().get(0),
                  e = e.getBoundingClientRect(),
                  t = t.getBoundingClientRect();
                return {
                  top: e.top < t.top,
                  right: e.right > t.right,
                  bottom: e.bottom > t.bottom,
                  left: e.left < t.left,
                };
              }),
              (g.prototype.handleSubtitleCropping = function (e) {
                var e = e.getDomElement(),
                  t = this.detectCroppedSubtitleLabel(e.get(0));
                (t.top && (e.css('top', '0'), e.removeCss('bottom')),
                  t.right && (e.css('right', '0'), e.removeCss('left')),
                  t.bottom && (e.css('bottom', '0'), e.removeCss('top')),
                  t.left && (e.css('left', '0'), e.removeCss('right')));
              }),
              (g.prototype.generateLabel = function (e) {
                return (
                  e.position && ((e.position.row = e.position.row || 0), (e.position.column = e.position.column || 0)),
                  new h({
                    text: e.html || (e.image && m.generateImageTagText(e.image)) || e.text || '',
                    vtt: e.vtt,
                    region: e.region,
                    regionStyle: e.regionStyle,
                  })
                );
              }),
              (g.prototype.configureCea608Captions = function (e, t) {
                function n() {
                  ((o = new h({ text: 'X' }))
                    .getDomElement()
                    .css({ 'font-size': '200px', 'line-height': '200px', visibility: 'hidden' }),
                    l.addComponent(o),
                    l.updateComponents(),
                    l.show());
                  var e = o.getDomElement().width(),
                    t = o.getDomElement().height(),
                    n = e / t,
                    o =
                      (l.removeComponent(o),
                      l.updateComponents(),
                      l.subtitleManager.hasCues || l.hide(),
                      l.getDomElement().width() - 10),
                    i = l.getDomElement().height();
                  u =
                    (e * g.CEA608_NUM_COLUMNS) / (t * g.CEA608_NUM_ROWS) < o / i
                      ? ((c = i / g.CEA608_NUM_ROWS), o / g.CEA608_NUM_COLUMNS - c * n)
                      : ((c = o / g.CEA608_NUM_COLUMNS / n), 0);
                  for (var r = 0, s = l.getComponents(); r < s.length; r++) {
                    var a = s[r];
                    a instanceof h &&
                      a.getDomElement().css({ 'font-size': ''.concat(c, 'px'), 'letter-spacing': ''.concat(u, 'px') });
                  }
                }
                function o() {
                  (l.getDomElement().removeClass(l.prefixCss(g.CLASS_CEA_608)), (r = !1));
                }
                var l = this,
                  c = 0,
                  u = 0,
                  i = !0,
                  r = !1;
                (e.on(e.exports.PlayerEvent.PlayerResized, function () {
                  r ? n() : (i = !0);
                }),
                  this.preprocessLabelEventCallback.subscribe(function (e, t) {
                    null != e.position &&
                      (r || ((r = !0), l.getDomElement().addClass(l.prefixCss(g.CLASS_CEA_608)), i && (n(), (i = !1))),
                      t
                        .getDomElement()
                        .css({
                          left: ''.concat(e.position.column * g.CEA608_COLUMN_OFFSET, '%'),
                          top: ''.concat(e.position.row * g.CEA608_ROW_OFFSET, '%'),
                          'font-size': ''.concat(c, 'px'),
                          'letter-spacing': ''.concat(u, 'px'),
                        }));
                  }));
                (e.on(e.exports.PlayerEvent.CueExit, function () {
                  l.subtitleManager.hasCues || o();
                }),
                  e.on(e.exports.PlayerEvent.SourceUnloaded, o),
                  e.on(e.exports.PlayerEvent.SubtitleEnabled, o),
                  e.on(e.exports.PlayerEvent.SubtitleDisabled, o));
              }),
              (g.prototype.enablePreviewSubtitleLabel = function () {
                this.subtitleManager.hasCues ||
                  ((this.previewSubtitleActive = !0),
                  this.subtitleContainerManager.addLabel(this.previewSubtitle),
                  this.updateComponents(),
                  this.show());
              }),
              (g.prototype.removePreviewSubtitleLabel = function () {
                this.previewSubtitleActive &&
                  ((this.previewSubtitleActive = !1),
                  this.subtitleContainerManager.removeLabel(this.previewSubtitle),
                  this.updateComponents());
              }),
              (g.CLASS_CONTROLBAR_VISIBLE = 'controlbar-visible'),
              (g.CLASS_CEA_608 = 'cea608'),
              (g.CEA608_NUM_ROWS = 15),
              (g.CEA608_NUM_COLUMNS = 32),
              (g.CEA608_ROW_OFFSET = 100 / g.CEA608_NUM_ROWS),
              (g.CEA608_COLUMN_OFFSET = 100 / g.CEA608_NUM_COLUMNS),
              g);
          function g(e) {
            var t = s.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.preprocessLabelEventCallback = new c.EventDispatcher()),
              (t.previewSubtitleActive = !1),
              (t.previewSubtitle = new h({ text: p.i18n.getLocalizer('subtitle.example') })),
              (t.config = t.mergeConfig(e, { cssClass: 'ui-subtitle-overlay' }, t.config)),
              t
            );
          }
          n.SubtitleOverlay = e;
          ((d = a.Label),
            i(y, d),
            Object.defineProperty(y.prototype, 'vtt', {
              get: function () {
                return this.config.vtt;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(y.prototype, 'region', {
              get: function () {
                return this.config.region;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(y.prototype, 'regionStyle', {
              get: function () {
                return this.config.regionStyle;
              },
              enumerable: !1,
              configurable: !0,
            }));
          var d,
            h = y;
          function y(e) {
            var t = d.call(this, (e = void 0 === e ? {} : e)) || this;
            return ((t.config = t.mergeConfig(e, { cssClass: 'ui-subtitle-label' }, t.config)), t);
          }
          n.SubtitleLabel = h;
          ((b.calculateId = function (e) {
            var t = e.start + '-' + e.text;
            return (e.position && (t += '-' + e.position.row + '-' + e.position.column), t);
          }),
            (b.prototype.cueEnter = function (e, t) {
              this.addCueToMap(e, t);
            }),
            (b.prototype.cueUpdate = function (e, t) {
              var n = this.popCueFromMap(e);
              if (n) return (this.addCueToMap(e, t), n);
            }),
            (b.prototype.addCueToMap = function (e, t) {
              var n = b.calculateId(e);
              ((this.activeSubtitleCueMap[n] = this.activeSubtitleCueMap[n] || []),
                this.activeSubtitleCueMap[n].push({ event: e, label: t }),
                this.activeSubtitleCueCount++);
            }),
            (b.prototype.popCueFromMap = function (e) {
              var e = b.calculateId(e),
                e = this.activeSubtitleCueMap[e];
              if (e && 0 < e.length) return ((e = e.shift()), this.activeSubtitleCueCount--, e.label);
            }),
            (b.prototype.clearInactiveCues = function (t) {
              var n = this,
                o = [];
              return (
                Object.keys(this.activeSubtitleCueMap).forEach(function (e) {
                  n.activeSubtitleCueMap[e].forEach(function (e) {
                    (t < e.event.start || t > e.event.end) && (n.popCueFromMap(e.event), o.push(e));
                  });
                }),
                o
              );
            }),
            (b.generateImageTagText = function (e) {
              if (e) return ((e = new u.DOM('img', { src: e })).css('width', '100%'), e.get(0).outerHTML);
            }),
            (b.prototype.getCues = function (e) {
              ((e = b.calculateId(e)), (e = this.activeSubtitleCueMap[e]));
              if (e && 0 < e.length)
                return e.map(function (e) {
                  return e.label;
                });
            }),
            (b.prototype.cueExit = function (e) {
              return this.popCueFromMap(e);
            }),
            Object.defineProperty(b.prototype, 'cueCount', {
              get: function () {
                return this.activeSubtitleCueCount;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(b.prototype, 'hasCues', {
              get: function () {
                return 0 < this.cueCount;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (b.prototype.clear = function () {
              ((this.activeSubtitleCueMap = {}), (this.activeSubtitleCueCount = 0));
            }));
          var m = b;
          function b() {
            ((this.activeSubtitleCueMap = {}), (this.activeSubtitleCueCount = 0));
          }
          ((P.prototype.getRegion = function (e) {
            return e.vtt
              ? { regionContainerId: e.vtt.region && e.vtt.region.id ? e.vtt.region.id : 'vtt', regionName: 'vtt' }
              : { regionContainerId: e.region || 'default', regionName: e.region || 'default' };
          }),
            (P.prototype.addLabel = function (e, t) {
              var n = this.getRegion(e),
                o = n.regionContainerId,
                n = ['subtitle-position-'.concat(n.regionName)];
              if (
                (e.vtt && e.vtt.region && n.push('vtt-region-'.concat(e.vtt.region.id)),
                !this.subtitleRegionContainers[o])
              ) {
                var i,
                  n = new S({ cssClasses: n });
                for (i in ((this.subtitleRegionContainers[o] = n),
                e.regionStyle
                  ? n.getDomElement().attr('style', e.regionStyle)
                  : e.vtt && !e.vtt.region
                    ? n.getDomElement().css('position', 'static')
                    : n.getDomElement(),
                this.subtitleRegionContainers))
                  this.subtitleOverlay.addComponent(this.subtitleRegionContainers[i]);
              }
              this.subtitleRegionContainers[o].addLabel(e, t);
            }),
            (P.prototype.replaceLabel = function (e, t) {
              var n = this.getRegion(e).regionContainerId;
              (this.subtitleRegionContainers[n].removeLabel(e), this.subtitleRegionContainers[n].addLabel(t));
            }),
            (P.prototype.removeLabel = function (e) {
              var t = e.vtt ? (e.vtt.region && e.vtt.region.id ? e.vtt.region.id : 'vtt') : e.region || 'default';
              (this.subtitleRegionContainers[t].removeLabel(e),
                this.subtitleRegionContainers[t].isEmpty() &&
                  (this.subtitleOverlay.removeComponent(this.subtitleRegionContainers[t]),
                  delete this.subtitleRegionContainers[t]));
            }),
            (P.prototype.clear = function () {
              for (var e in this.subtitleRegionContainers)
                this.subtitleOverlay.removeComponent(this.subtitleRegionContainers[e]);
              this.subtitleRegionContainers = {};
            }));
          var v = P;
          function P(e) {
            ((this.subtitleOverlay = e), (this.subtitleRegionContainers = {}), (this.subtitleOverlay = e));
          }
          n.SubtitleRegionContainerManager = v;
          ((C = r.Container),
            i(w, C),
            (w.prototype.addLabel = function (e, t) {
              (this.labelCount++,
                e.vtt &&
                  (e.vtt.region && t && f.VttUtils.setVttRegionStyles(this, e.vtt.region, t), t) &&
                  f.VttUtils.setVttCueBoxStyles(e, t),
                this.addComponent(e),
                this.updateComponents());
            }),
            (w.prototype.removeLabel = function (e) {
              (this.labelCount--, this.removeComponent(e), this.updateComponents());
            }),
            (w.prototype.isEmpty = function () {
              return 0 === this.labelCount;
            }));
          var C,
            S = w;
          function w(e) {
            var t = C.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.labelCount = 0),
              (t.config = t.mergeConfig(e, { cssClass: 'subtitle-region-container' }, t.config)),
              t
            );
          }
          n.SubtitleRegionContainer = S;
        },
        {
          '../dom': 81,
          '../eventdispatcher': 83,
          '../localization/i18n': 88,
          '../vttutils': 116,
          './container': 20,
          './controlbar': 21,
          './label': 27,
        },
      ],
      54: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }), (n.SubtitleSelectBox = void 0), e('./selectbox')),
            a = e('../subtitleutils'),
            l = e('../localization/i18n'),
            e =
              ((i = s.SelectBox),
              r(c, i),
              (c.prototype.configure = function (e, t) {
                (i.prototype.configure.call(this, e, t), new a.SubtitleSwitchHandler(e, this, t));
              }),
              c);
          function c(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClasses: ['ui-subtitleselectbox'], ariaLabel: l.i18n.getLocalizer('subtitle.select') },
                t.config,
              )),
              t
            );
          }
          n.SubtitleSelectBox = e;
        },
        { '../localization/i18n': 88, '../subtitleutils': 109, './selectbox': 43 },
      ],
      55: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.BackgroundColorSelectBox = void 0),
              e('./subtitlesettingselectbox')),
            a = e('../../localization/i18n'),
            e =
              ((i = s.SubtitleSettingSelectBox),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                function n() {
                  o.settingsManager.backgroundColor.isSet() && o.settingsManager.backgroundOpacity.isSet()
                    ? o.toggleOverlayClass(
                        'bgcolor-' +
                          o.settingsManager.backgroundColor.value +
                          o.settingsManager.backgroundOpacity.value,
                      )
                    : o.toggleOverlayClass('');
                }
                var o = this;
                (i.prototype.configure.call(this, e, t),
                  this.addItem('', a.i18n.getLocalizer('default')),
                  this.addItem('white', a.i18n.getLocalizer('colors.white')),
                  this.addItem('black', a.i18n.getLocalizer('colors.black')),
                  this.addItem('red', a.i18n.getLocalizer('colors.red')),
                  this.addItem('green', a.i18n.getLocalizer('colors.green')),
                  this.addItem('blue', a.i18n.getLocalizer('colors.blue')),
                  this.addItem('cyan', a.i18n.getLocalizer('colors.cyan')),
                  this.addItem('yellow', a.i18n.getLocalizer('colors.yellow')),
                  this.addItem('magenta', a.i18n.getLocalizer('colors.magenta')));
                (this.onItemSelected.subscribe(function (e, t) {
                  o.settingsManager.backgroundColor.value = t;
                }),
                  this.settingsManager.backgroundColor.onChanged.subscribe(function (e, t) {
                    (o.settingsManager.backgroundColor.isSet()
                      ? o.settingsManager.backgroundOpacity.isSet() ||
                        (o.settingsManager.backgroundOpacity.value = '100')
                      : o.settingsManager.backgroundOpacity.clear(),
                      o.selectItem(null != (t = t.value) ? t : ''),
                      n());
                  }),
                  this.settingsManager.backgroundOpacity.onChanged.subscribe(function () {
                    n();
                  }),
                  this.settingsManager.backgroundColor.isSet() &&
                    this.selectItem(null != (e = this.settingsManager.backgroundColor.value) ? e : ''));
              }),
              l);
          function l(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(e, { cssClasses: ['ui-subtitlesettingsbackgroundcolorselectbox'] }, t.config)),
              t
            );
          }
          n.BackgroundColorSelectBox = e;
        },
        { '../../localization/i18n': 88, './subtitlesettingselectbox': 62 },
      ],
      56: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.BackgroundOpacitySelectBox = void 0),
              e('./subtitlesettingselectbox')),
            a = e('../../localization/i18n'),
            e =
              ((i = s.SubtitleSettingSelectBox),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                var n = this;
                (i.prototype.configure.call(this, e, t),
                  this.addItem('', a.i18n.getLocalizer('default')),
                  this.addItem('100', a.i18n.getLocalizer('percent', { value: 100 })),
                  this.addItem('75', a.i18n.getLocalizer('percent', { value: 75 })),
                  this.addItem('50', a.i18n.getLocalizer('percent', { value: 50 })),
                  this.addItem('25', a.i18n.getLocalizer('percent', { value: 25 })),
                  this.addItem('0', a.i18n.getLocalizer('percent', { value: 0 })),
                  this.onItemSelected.subscribe(function (e, t) {
                    ((n.settingsManager.backgroundOpacity.value = t),
                      n.settingsManager.backgroundOpacity.isSet()
                        ? n.settingsManager.backgroundColor.isSet() ||
                          (n.settingsManager.backgroundColor.value = 'black')
                        : n.settingsManager.backgroundColor.clear());
                  }),
                  this.settingsManager.backgroundOpacity.onChanged.subscribe(function (e, t) {
                    n.selectItem(null != (t = t.value) ? t : '');
                  }),
                  this.settingsManager.backgroundOpacity.isSet() &&
                    this.selectItem(null != (e = this.settingsManager.backgroundOpacity.value) ? e : ''));
              }),
              l);
          function l(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClasses: ['ui-subtitlesettingsbackgroundopacityselectbox'] },
                t.config,
              )),
              t
            );
          }
          n.BackgroundOpacitySelectBox = e;
        },
        { '../../localization/i18n': 88, './subtitlesettingselectbox': 62 },
      ],
      57: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.CharacterEdgeSelectBox = void 0),
              e('./subtitlesettingselectbox')),
            a = e('../../localization/i18n'),
            e =
              ((i = s.SubtitleSettingSelectBox),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                var n = this;
                (i.prototype.configure.call(this, e, t),
                  this.addItem('', a.i18n.getLocalizer('default')),
                  this.addItem('raised', a.i18n.getLocalizer('settings.subtitles.characterEdge.raised')),
                  this.addItem('depressed', a.i18n.getLocalizer('settings.subtitles.characterEdge.depressed')),
                  this.addItem('uniform', a.i18n.getLocalizer('settings.subtitles.characterEdge.uniform')),
                  this.addItem('dropshadowed', a.i18n.getLocalizer('settings.subtitles.characterEdge.dropshadowed')),
                  this.settingsManager.characterEdge.onChanged.subscribe(function (e, t) {
                    (t.isSet() ? n.toggleOverlayClass('characteredge-' + t.value) : n.toggleOverlayClass(''),
                      n.selectItem(null != (t = t.value) ? t : ''));
                  }),
                  this.onItemSelected.subscribe(function (e, t) {
                    n.settingsManager.characterEdge.value = t;
                  }),
                  this.settingsManager.characterEdge.isSet() &&
                    this.selectItem(null != (e = this.settingsManager.characterEdge.value) ? e : ''));
              }),
              l);
          function l(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(e, { cssClasses: ['ui-subtitlesettingscharacteredgeselectbox'] }, t.config)),
              t
            );
          }
          n.CharacterEdgeSelectBox = e;
        },
        { '../../localization/i18n': 88, './subtitlesettingselectbox': 62 },
      ],
      58: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.FontColorSelectBox = void 0),
              e('./subtitlesettingselectbox')),
            a = e('../../localization/i18n'),
            e =
              ((i = s.SubtitleSettingSelectBox),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                function n() {
                  o.settingsManager.fontColor.isSet() && o.settingsManager.fontOpacity.isSet()
                    ? o.toggleOverlayClass(
                        'fontcolor-' + o.settingsManager.fontColor.value + o.settingsManager.fontOpacity.value,
                      )
                    : o.toggleOverlayClass('');
                }
                var o = this;
                (i.prototype.configure.call(this, e, t),
                  this.addItem('', a.i18n.getLocalizer('default')),
                  this.addItem('white', a.i18n.getLocalizer('colors.white')),
                  this.addItem('black', a.i18n.getLocalizer('colors.black')),
                  this.addItem('red', a.i18n.getLocalizer('colors.red')),
                  this.addItem('green', a.i18n.getLocalizer('colors.green')),
                  this.addItem('blue', a.i18n.getLocalizer('colors.blue')),
                  this.addItem('cyan', a.i18n.getLocalizer('colors.cyan')),
                  this.addItem('yellow', a.i18n.getLocalizer('colors.yellow')),
                  this.addItem('magenta', a.i18n.getLocalizer('colors.magenta')));
                (this.onItemSelected.subscribe(function (e, t) {
                  o.settingsManager.fontColor.value = t;
                }),
                  this.settingsManager.fontColor.onChanged.subscribe(function (e, t) {
                    (o.settingsManager.fontColor.isSet()
                      ? o.settingsManager.fontOpacity.isSet() || (o.settingsManager.fontOpacity.value = '100')
                      : o.settingsManager.fontOpacity.clear(),
                      o.selectItem(null != (t = t.value) ? t : ''),
                      n());
                  }),
                  this.settingsManager.fontOpacity.onChanged.subscribe(function () {
                    n();
                  }),
                  this.settingsManager.fontColor.isSet() &&
                    this.selectItem(null != (e = this.settingsManager.fontColor.value) ? e : ''));
              }),
              l);
          function l(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(e, { cssClasses: ['ui-subtitlesettingsfontcolorselectbox'] }, t.config)),
              t
            );
          }
          n.FontColorSelectBox = e;
        },
        { '../../localization/i18n': 88, './subtitlesettingselectbox': 62 },
      ],
      59: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.FontFamilySelectBox = void 0),
              e('./subtitlesettingselectbox')),
            a = e('../../localization/i18n'),
            e =
              ((i = s.SubtitleSettingSelectBox),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                var n = this;
                (i.prototype.configure.call(this, e, t),
                  this.addItem('', a.i18n.getLocalizer('default')),
                  this.addItem(
                    'monospacedserif',
                    a.i18n.getLocalizer('settings.subtitles.font.family.monospacedserif'),
                  ),
                  this.addItem(
                    'proportionalserif',
                    a.i18n.getLocalizer('settings.subtitles.font.family.proportionalserif'),
                  ),
                  this.addItem(
                    'monospacedsansserif',
                    a.i18n.getLocalizer('settings.subtitles.font.family.monospacedsansserif'),
                  ),
                  this.addItem(
                    'proportionalsansserif',
                    a.i18n.getLocalizer('settings.subtitles.font.family.proportionalserif'),
                  ),
                  this.addItem('casual', a.i18n.getLocalizer('settings.subtitles.font.family.casual')),
                  this.addItem('cursive', a.i18n.getLocalizer('settings.subtitles.font.family.cursive')),
                  this.addItem('smallcapital', a.i18n.getLocalizer('settings.subtitles.font.family.smallcapital')),
                  this.settingsManager.fontFamily.onChanged.subscribe(function (e, t) {
                    (t.isSet() ? n.toggleOverlayClass('fontfamily-' + t.value) : n.toggleOverlayClass(''),
                      n.selectItem(null != (t = t.value) ? t : ''));
                  }),
                  this.onItemSelected.subscribe(function (e, t) {
                    n.settingsManager.fontFamily.value = t;
                  }),
                  this.settingsManager.fontFamily.isSet() &&
                    this.selectItem(null != (e = this.settingsManager.fontFamily.value) ? e : ''));
              }),
              l);
          function l(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(e, { cssClasses: ['ui-subtitlesettingsfontfamilyselectbox'] }, t.config)),
              t
            );
          }
          n.FontFamilySelectBox = e;
        },
        { '../../localization/i18n': 88, './subtitlesettingselectbox': 62 },
      ],
      60: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.FontOpacitySelectBox = void 0),
              e('./subtitlesettingselectbox')),
            a = e('../../localization/i18n'),
            e =
              ((i = s.SubtitleSettingSelectBox),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                var n = this;
                (i.prototype.configure.call(this, e, t),
                  this.addItem('', a.i18n.getLocalizer('default')),
                  this.addItem('100', a.i18n.getLocalizer('percent', { value: 100 })),
                  this.addItem('75', a.i18n.getLocalizer('percent', { value: 75 })),
                  this.addItem('50', a.i18n.getLocalizer('percent', { value: 50 })),
                  this.addItem('25', a.i18n.getLocalizer('percent', { value: 25 })),
                  this.onItemSelected.subscribe(function (e, t) {
                    ((n.settingsManager.fontOpacity.value = t),
                      n.settingsManager.fontOpacity.isSet()
                        ? n.settingsManager.fontColor.isSet() || (n.settingsManager.fontColor.value = 'white')
                        : n.settingsManager.fontColor.clear());
                  }),
                  this.settingsManager.fontOpacity.onChanged.subscribe(function (e, t) {
                    n.selectItem(null != (t = t.value) ? t : '');
                  }),
                  this.settingsManager.fontOpacity.isSet() &&
                    this.selectItem(null != (e = this.settingsManager.fontOpacity.value) ? e : ''));
              }),
              l);
          function l(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(e, { cssClasses: ['ui-subtitlesettingsfontopacityselectbox'] }, t.config)),
              t
            );
          }
          n.FontOpacitySelectBox = e;
        },
        { '../../localization/i18n': 88, './subtitlesettingselectbox': 62 },
      ],
      61: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.FontSizeSelectBox = void 0),
              e('./subtitlesettingselectbox')),
            a = e('../../localization/i18n'),
            e =
              ((i = s.SubtitleSettingSelectBox),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                var n = this;
                (i.prototype.configure.call(this, e, t),
                  this.addItem('', a.i18n.getLocalizer('default')),
                  this.addItem('50', a.i18n.getLocalizer('percent', { value: 50 })),
                  this.addItem('75', a.i18n.getLocalizer('percent', { value: 75 })),
                  this.addItem('100', a.i18n.getLocalizer('percent', { value: 100 })),
                  this.addItem('150', a.i18n.getLocalizer('percent', { value: 150 })),
                  this.addItem('200', a.i18n.getLocalizer('percent', { value: 200 })),
                  this.addItem('300', a.i18n.getLocalizer('percent', { value: 300 })),
                  this.addItem('400', a.i18n.getLocalizer('percent', { value: 400 })),
                  this.settingsManager.fontSize.onChanged.subscribe(function (e, t) {
                    (t.isSet() ? n.toggleOverlayClass('fontsize-' + t.value) : n.toggleOverlayClass(''),
                      n.selectItem(null != (t = t.value) ? t : ''));
                  }),
                  this.onItemSelected.subscribe(function (e, t) {
                    n.settingsManager.fontSize.value = t;
                  }),
                  this.settingsManager.fontSize.isSet() &&
                    this.selectItem(null != (e = this.settingsManager.fontSize.value) ? e : ''));
              }),
              l);
          function l(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(e, { cssClasses: ['ui-subtitlesettingsfontsizeselectbox'] }, t.config)),
              t
            );
          }
          n.FontSizeSelectBox = e;
        },
        { '../../localization/i18n': 88, './subtitlesettingselectbox': 62 },
      ],
      62: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            e =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.SubtitleSettingSelectBox = void 0),
              e('../selectbox')),
            e =
              ((i = e.SelectBox),
              r(s, i),
              (s.prototype.toggleOverlayClass = function (e) {
                (this.currentCssClass &&
                  (this.overlay.getDomElement().removeClass(this.currentCssClass), (this.currentCssClass = '')),
                  e &&
                    ((this.currentCssClass = this.prefixCss(e)),
                    this.overlay.getDomElement().addClass(this.currentCssClass)));
              }),
              s);
          function s(e) {
            var t = i.call(this, e) || this;
            return ((t.settingsManager = e.settingsManager), (t.overlay = e.overlay), t);
          }
          n.SubtitleSettingSelectBox = e;
        },
        { '../selectbox': 43 },
      ],
      63: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.SubtitleSettingsLabel = void 0),
              e('../container')),
            a = e('../../dom'),
            l = e('../../localization/i18n'),
            e =
              ((i = s.Container),
              r(c, i),
              (c.prototype.toDomElement = function () {
                var e;
                return new a.DOM('label', {
                  id: null != (e = this.config.id) ? e : '',
                  class: this.getCssClasses(),
                  for: this.for,
                }).append(
                  new a.DOM('span', {}).html(l.i18n.performLocalization(this.text)),
                  this.opener.getDomElement(),
                );
              }),
              c);
          function c(e) {
            var t,
              n = i.call(this, e) || this;
            return (
              (n.opener = e.opener),
              (n.text = null != (t = e.text) ? t : ''),
              (n.for = null != (t = e.for) ? t : ''),
              (n.config = n.mergeConfig(e, { cssClass: 'ui-label', components: [n.opener] }, n.config)),
              n
            );
          }
          n.SubtitleSettingsLabel = e;
        },
        { '../../dom': 81, '../../localization/i18n': 88, '../container': 20 },
      ],
      64: [
        function (e, t, n) {
          var o,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.SubtitleSettingsProperty = n.SubtitleSettingsManager = void 0),
              e('../../storageutils')),
            s = e('../component'),
            a = e('../../eventdispatcher');
          function l() {
            var e,
              o = this,
              t =
                ((this._properties = {
                  fontColor: new f(this),
                  fontOpacity: new f(this),
                  fontFamily: new f(this),
                  fontSize: new f(this),
                  characterEdge: new f(this),
                  backgroundColor: new f(this),
                  backgroundOpacity: new f(this),
                  windowColor: new f(this),
                  windowOpacity: new f(this),
                }),
                (this.userSettings = {}),
                (this.localStorageKey = u.instance().prefixCss('subtitlesettings')),
                this);
            for (e in this._properties)
              ((n) => {
                t._properties[n].onChanged.subscribe(function (e, t) {
                  (t.isSet() ? (o.userSettings[n] = t.value) : delete o.userSettings[n], o.save());
                });
              })(e);
            this.load();
          }
          ((l.prototype.reset = function () {
            for (var e in this._properties) this._properties[e].clear();
          }),
            Object.defineProperty(l.prototype, 'fontColor', {
              get: function () {
                return this._properties.fontColor;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(l.prototype, 'fontOpacity', {
              get: function () {
                return this._properties.fontOpacity;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(l.prototype, 'fontFamily', {
              get: function () {
                return this._properties.fontFamily;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(l.prototype, 'fontSize', {
              get: function () {
                return this._properties.fontSize;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(l.prototype, 'characterEdge', {
              get: function () {
                return this._properties.characterEdge;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(l.prototype, 'backgroundColor', {
              get: function () {
                return this._properties.backgroundColor;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(l.prototype, 'backgroundOpacity', {
              get: function () {
                return this._properties.backgroundOpacity;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(l.prototype, 'windowColor', {
              get: function () {
                return this._properties.windowColor;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(l.prototype, 'windowOpacity', {
              get: function () {
                return this._properties.windowOpacity;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (l.prototype.save = function () {
              r.StorageUtils.setObject(this.localStorageKey, this.userSettings);
            }),
            (l.prototype.load = function () {
              for (var e in ((this.userSettings = r.StorageUtils.getObject(this.localStorageKey) || {}),
              this.userSettings))
                this._properties[e].value = this.userSettings[e];
            }),
            (n.SubtitleSettingsManager = l));
          ((c = s.Component),
            i(p, c),
            (p.instance = function () {
              return (p._instance = p._instance ? p._instance : new p());
            }),
            (p.prototype.prefixCss = function (e) {
              return c.prototype.prefixCss.call(this, e);
            }));
          var c,
            u = p;
          function p() {
            return (null !== c && c.apply(this, arguments)) || this;
          }
          ((g.prototype.isSet = function () {
            return null != this._value;
          }),
            (g.prototype.clear = function () {
              ((this._value = null), this.onChangedEvent(null));
            }),
            Object.defineProperty(g.prototype, 'value', {
              get: function () {
                return this._value;
              },
              set: function (e) {
                ((this._value = e = 'string' == typeof e && 'null' === e ? null : e), this.onChangedEvent(e));
              },
              enumerable: !1,
              configurable: !0,
            }),
            (g.prototype.onChangedEvent = function (e) {
              this._onChanged.dispatch(this._manager, this);
            }),
            Object.defineProperty(g.prototype, 'onChanged', {
              get: function () {
                return this._onChanged.getEvent();
              },
              enumerable: !1,
              configurable: !0,
            }));
          var f = g;
          function g(e) {
            ((this._value = null), (this._manager = e), (this._onChanged = new a.EventDispatcher()));
          }
          n.SubtitleSettingsProperty = f;
        },
        { '../../eventdispatcher': 83, '../../storageutils': 107, '../component': 19 },
      ],
      65: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.SubtitleSettingsPanelPage = void 0),
              e('../settingspanelpage')),
            a = e('./subtitlesettingsmanager'),
            l = e('./fontsizeselectbox'),
            c = e('./fontfamilyselectbox'),
            u = e('./fontcolorselectbox'),
            p = e('./fontopacityselectbox'),
            f = e('./characteredgeselectbox'),
            g = e('./backgroundcolorselectbox'),
            d = e('./backgroundopacityselectbox'),
            h = e('./windowcolorselectbox'),
            y = e('./windowopacityselectbox'),
            m = e('./subtitlesettingsresetbutton'),
            b = e('../settingspanelpagebackbutton'),
            v = e('../settingspanelitem'),
            P = e('../../localization/i18n'),
            e =
              ((i = s.SettingsPanelPage),
              r(C, i),
              (C.prototype.configure = function (e, t) {
                var n = this;
                (i.prototype.configure.call(this, e, t),
                  this.onActive.subscribe(function () {
                    n.overlay.enablePreviewSubtitleLabel();
                  }),
                  this.onInactive.subscribe(function () {
                    n.overlay.removePreviewSubtitleLabel();
                  }));
              }),
              C);
          function C(e) {
            var t = i.call(this, e) || this,
              n = ((t.overlay = e.overlay), (t.settingsPanel = e.settingsPanel), new a.SubtitleSettingsManager());
            return (
              (t.config = t.mergeConfig(
                e,
                {
                  components: [
                    new v.SettingsPanelItem(
                      P.i18n.getLocalizer('settings.subtitles.font.size'),
                      new l.FontSizeSelectBox({ overlay: t.overlay, settingsManager: n }),
                    ),
                    new v.SettingsPanelItem(
                      P.i18n.getLocalizer('settings.subtitles.font.family'),
                      new c.FontFamilySelectBox({ overlay: t.overlay, settingsManager: n }),
                    ),
                    new v.SettingsPanelItem(
                      P.i18n.getLocalizer('settings.subtitles.font.color'),
                      new u.FontColorSelectBox({ overlay: t.overlay, settingsManager: n }),
                    ),
                    new v.SettingsPanelItem(
                      P.i18n.getLocalizer('settings.subtitles.font.opacity'),
                      new p.FontOpacitySelectBox({ overlay: t.overlay, settingsManager: n }),
                    ),
                    new v.SettingsPanelItem(
                      P.i18n.getLocalizer('settings.subtitles.characterEdge'),
                      new f.CharacterEdgeSelectBox({ overlay: t.overlay, settingsManager: n }),
                    ),
                    new v.SettingsPanelItem(
                      P.i18n.getLocalizer('settings.subtitles.background.color'),
                      new g.BackgroundColorSelectBox({ overlay: t.overlay, settingsManager: n }),
                    ),
                    new v.SettingsPanelItem(
                      P.i18n.getLocalizer('settings.subtitles.background.opacity'),
                      new d.BackgroundOpacitySelectBox({ overlay: t.overlay, settingsManager: n }),
                    ),
                    new v.SettingsPanelItem(
                      P.i18n.getLocalizer('settings.subtitles.window.color'),
                      new h.WindowColorSelectBox({ overlay: t.overlay, settingsManager: n }),
                    ),
                    new v.SettingsPanelItem(
                      P.i18n.getLocalizer('settings.subtitles.window.opacity'),
                      new y.WindowOpacitySelectBox({ overlay: t.overlay, settingsManager: n }),
                    ),
                    new v.SettingsPanelItem(
                      new b.SettingsPanelPageBackButton({
                        container: t.settingsPanel,
                        text: P.i18n.getLocalizer('back'),
                      }),
                      new m.SubtitleSettingsResetButton({ settingsManager: n }),
                      { role: 'menubar' },
                    ),
                  ],
                },
                t.config,
              )),
              t
            );
          }
          n.SubtitleSettingsPanelPage = e;
        },
        {
          '../../localization/i18n': 88,
          '../settingspanelitem': 45,
          '../settingspanelpage': 46,
          '../settingspanelpagebackbutton': 47,
          './backgroundcolorselectbox': 55,
          './backgroundopacityselectbox': 56,
          './characteredgeselectbox': 57,
          './fontcolorselectbox': 58,
          './fontfamilyselectbox': 59,
          './fontopacityselectbox': 60,
          './fontsizeselectbox': 61,
          './subtitlesettingsmanager': 64,
          './subtitlesettingsresetbutton': 66,
          './windowcolorselectbox': 67,
          './windowopacityselectbox': 68,
        },
      ],
      66: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.SubtitleSettingsResetButton = void 0),
              e('../button')),
            a = e('../../localization/i18n'),
            e =
              ((i = s.Button),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                var n = this;
                (i.prototype.configure.call(this, e, t),
                  this.onClick.subscribe(function () {
                    n.config.settingsManager.reset();
                  }));
              }),
              l);
          function l(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-subtitlesettingsresetbutton', text: a.i18n.getLocalizer('reset') },
                t.config,
              )),
              t
            );
          }
          n.SubtitleSettingsResetButton = e;
        },
        { '../../localization/i18n': 88, '../button': 13 },
      ],
      67: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.WindowColorSelectBox = void 0),
              e('./subtitlesettingselectbox')),
            a = e('../../localization/i18n'),
            e =
              ((i = s.SubtitleSettingSelectBox),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                function n() {
                  o.settingsManager.windowColor.isSet() && o.settingsManager.windowOpacity.isSet()
                    ? o.toggleOverlayClass(
                        'windowcolor-' + o.settingsManager.windowColor.value + o.settingsManager.windowOpacity.value,
                      )
                    : o.toggleOverlayClass('');
                }
                var o = this;
                (i.prototype.configure.call(this, e, t),
                  this.addItem('', a.i18n.getLocalizer('default')),
                  this.addItem('white', a.i18n.getLocalizer('colors.white')),
                  this.addItem('black', a.i18n.getLocalizer('colors.black')),
                  this.addItem('red', a.i18n.getLocalizer('colors.red')),
                  this.addItem('green', a.i18n.getLocalizer('colors.green')),
                  this.addItem('blue', a.i18n.getLocalizer('colors.blue')),
                  this.addItem('cyan', a.i18n.getLocalizer('colors.cyan')),
                  this.addItem('yellow', a.i18n.getLocalizer('colors.yellow')),
                  this.addItem('magenta', a.i18n.getLocalizer('colors.magenta')));
                (this.onItemSelected.subscribe(function (e, t) {
                  o.settingsManager.windowColor.value = t;
                }),
                  this.settingsManager.windowColor.onChanged.subscribe(function (e, t) {
                    (o.settingsManager.windowColor.isSet()
                      ? o.settingsManager.windowOpacity.isSet() || (o.settingsManager.windowOpacity.value = '100')
                      : o.settingsManager.windowOpacity.clear(),
                      o.selectItem(null != (t = t.value) ? t : ''),
                      n());
                  }),
                  this.settingsManager.windowOpacity.onChanged.subscribe(function () {
                    n();
                  }),
                  this.settingsManager.windowColor.isSet() &&
                    this.selectItem(null != (e = this.settingsManager.windowColor.value) ? e : ''));
              }),
              l);
          function l(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(e, { cssClasses: ['ui-subtitlesettingswindowcolorselectbox'] }, t.config)),
              t
            );
          }
          n.WindowColorSelectBox = e;
        },
        { '../../localization/i18n': 88, './subtitlesettingselectbox': 62 },
      ],
      68: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.WindowOpacitySelectBox = void 0),
              e('./subtitlesettingselectbox')),
            a = e('../../localization/i18n'),
            e =
              ((i = s.SubtitleSettingSelectBox),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                var n = this;
                (i.prototype.configure.call(this, e, t),
                  this.addItem('', a.i18n.getLocalizer('default')),
                  this.addItem('100', a.i18n.getLocalizer('percent', { value: 100 })),
                  this.addItem('75', a.i18n.getLocalizer('percent', { value: 75 })),
                  this.addItem('50', a.i18n.getLocalizer('percent', { value: 50 })),
                  this.addItem('25', a.i18n.getLocalizer('percent', { value: 25 })),
                  this.addItem('0', a.i18n.getLocalizer('percent', { value: 0 })),
                  this.onItemSelected.subscribe(function (e, t) {
                    ((n.settingsManager.windowOpacity.value = t),
                      n.settingsManager.windowOpacity.isSet()
                        ? n.settingsManager.windowColor.isSet() || (n.settingsManager.windowColor.value = 'black')
                        : n.settingsManager.windowColor.clear());
                  }),
                  this.settingsManager.windowOpacity.onChanged.subscribe(function (e, t) {
                    n.selectItem(null != (t = t.value) ? t : '');
                  }),
                  this.settingsManager.windowOpacity.isSet() &&
                    this.selectItem(null != (e = this.settingsManager.windowOpacity.value) ? e : ''));
              }),
              l);
          function l(e) {
            var t = i.call(this, e) || this;
            return (
              (t.config = t.mergeConfig(e, { cssClasses: ['ui-subtitlesettingswindowopacityselectbox'] }, t.config)),
              t
            );
          }
          n.WindowOpacitySelectBox = e;
        },
        { '../../localization/i18n': 88, './subtitlesettingselectbox': 62 },
      ],
      69: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }), (n.TimelineMarkersHandler = void 0));
          var i = e('../dom'),
            s = e('../playerutils'),
            o = e('../timeout');
          function r(e, t, n) {
            ((this.config = e), (this.getSeekBarWidth = t), (this.markersContainer = n), (this.timelineMarkers = []));
          }
          ((r.prototype.initialize = function (e, t) {
            ((this.player = e), (this.uimanager = t), this.configureMarkers());
          }),
            (r.prototype.configureMarkers = function () {
              var e = this;
              (this.player.on(this.player.exports.PlayerEvent.SourceUnloaded, function () {
                return e.clearMarkers();
              }),
                this.player.on(this.player.exports.PlayerEvent.AdBreakStarted, function () {
                  return e.clearMarkers();
                }),
                this.player.on(this.player.exports.PlayerEvent.AdBreakFinished, function () {
                  return e.updateMarkers();
                }),
                this.player.on(this.player.exports.PlayerEvent.PlayerResized, function () {
                  return e.updateMarkersDOM();
                }),
                this.player.on(this.player.exports.PlayerEvent.SourceLoaded, function () {
                  e.player.isLive() &&
                    (e.player.on(e.player.exports.PlayerEvent.TimeChanged, function () {
                      return e.updateMarkers();
                    }),
                    e.configureLivePausedTimeshiftUpdater(function () {
                      return e.updateMarkers();
                    }));
                }),
                this.uimanager.getConfig().events.onUpdated.subscribe(function () {
                  return e.updateMarkers();
                }),
                this.uimanager.onRelease.subscribe(function () {
                  return e.uimanager.getConfig().events.onUpdated.unsubscribe(function () {
                    return e.updateMarkers();
                  });
                }),
                this.updateMarkers());
            }),
            (r.prototype.getMarkerAtPosition = function (n) {
              var e,
                o = null != (e = this.config.snappingRange) ? e : 0;
              return (
                this.timelineMarkers.find(function (e) {
                  var t =
                      0 < (null != (t = e.duration) ? t : 0) &&
                      n >= e.position - o &&
                      n <= e.position + (null != (t = e.duration) ? t : 0) + o,
                    e = e.position - o <= n && n <= e.position + o;
                  return t || e;
                }) || null
              );
            }),
            (r.prototype.clearMarkers = function () {
              ((this.timelineMarkers = []), this.markersContainer.empty());
            }),
            (r.prototype.removeMarkerFromConfig = function (t) {
              var e = this.uimanager.getConfig().metadata;
              null != e &&
                e.markers &&
                (e.markers = e.markers.filter(function (e) {
                  return t !== e;
                }));
            }),
            (r.prototype.filterRemovedMarkers = function () {
              var n = this;
              this.timelineMarkers = this.timelineMarkers.filter(function (t) {
                var e =
                  null == (e = null == (e = n.uimanager.getConfig().metadata) ? void 0 : e.markers)
                    ? void 0
                    : e.find(function (e) {
                        return t.marker === e;
                      });
                return (e || n.removeMarkerFromDOM(t), e);
              });
            }),
            (r.prototype.removeMarkerFromDOM = function (e) {
              e.element && e.element.remove();
            }),
            (r.prototype.updateMarkers = function () {
              var e,
                r = this;
              ((e, t) => (
                (e = e.getDuration() !== 1 / 0 || e.isLive()),
                (t = 0 < (null != (t = null == (t = t.getConfig().metadata) ? void 0 : t.markers) ? t : []).length),
                e && t
              ))(this.player, this.uimanager)
                ? (this.filterRemovedMarkers(),
                  (null != (e = null == (e = this.uimanager.getConfig().metadata) ? void 0 : e.markers)
                    ? e
                    : []
                  ).forEach(function (t) {
                    var e,
                      n,
                      o = ((e, t) => {
                        var n = ((e) => {
                            var t, n;
                            return e.isLive()
                              ? ((t = s.PlayerUtils.getSeekableRangeRespectingLive(e)), (n = t.start), t.end - n)
                              : e.getDuration();
                          })(e),
                          e =
                            (100 / n) *
                            ((e, t, n) =>
                              t.isLive() ? n - (s.PlayerUtils.getSeekableRangeRespectingLive(t).end - e.time) : e.time)(
                              t,
                              e,
                              n,
                            ),
                          t = (100 / n) * (null != (n = t.duration) ? n : 0);
                        return (
                          e < 0 && !isNaN(t) && (t += e),
                          { markerDuration: (t = 100 - e < t ? 100 - e : t), markerPosition: e }
                        );
                      })(r.player, t),
                      i = o.markerPosition,
                      o = o.markerDuration;
                    ((e = i),
                      ((n = o) < 0 || isNaN(n)) && e < 0
                        ? r.removeMarkerFromConfig(t)
                        : i <= 100 &&
                          ((n = r.timelineMarkers.find(function (e) {
                            return e.marker === t;
                          }))
                            ? ((n.position = i), (n.duration = o), r.updateMarkerDOM(n))
                            : (r.timelineMarkers.push((e = { marker: t, position: i, duration: o })),
                              r.createMarkerDOM(e))));
                  }))
                : this.clearMarkers();
            }),
            (r.prototype.getMarkerCssProperties = function (e) {
              var t,
                n = this.getSeekBarWidth(),
                o = (n / 100) * (e.position < 0 ? 0 : e.position),
                o = { transform: 'translateX('.concat(o, 'px)') };
              return (
                0 < (null != (t = e.duration) ? t : 0) &&
                  ((n = Math.round((n / 100) * (null != (t = e.duration) ? t : 0))), (o.width = ''.concat(n, 'px'))),
                o
              );
            }),
            (r.prototype.updateMarkerDOM = function (e) {
              var t;
              null != (t = e.element) && t.css(this.getMarkerCssProperties(e));
            }),
            (r.prototype.createMarkerDOM = function (e) {
              var t,
                n = this,
                o = ['seekbar-marker'].concat(e.marker.cssClasses || []).map(function (e) {
                  return n.prefixCss(e);
                }),
                o = new i.DOM('div', {
                  class: o.join(' '),
                  'data-marker-time': String(e.marker.time),
                  'data-marker-title': String(e.marker.title),
                }).css(this.getMarkerCssProperties(e));
              (e.marker.imageUrl &&
                ((t = new i.DOM('img', { class: this.prefixCss('seekbar-marker-image'), src: e.marker.imageUrl }).on(
                  'error',
                  function () {
                    t.remove();
                  },
                )),
                o.append(t)),
                this.markersContainer.append((e.element = o)));
            }),
            (r.prototype.updateMarkersDOM = function () {
              var t = this;
              this.timelineMarkers.forEach(function (e) {
                e.element ? t.updateMarkerDOM(e) : t.createMarkerDOM(e);
              });
            }),
            (r.prototype.configureLivePausedTimeshiftUpdater = function (e) {
              var t = this;
              ((this.pausedTimeshiftUpdater = new o.Timeout(1e3, e, !0)),
                this.player.on(this.player.exports.PlayerEvent.Paused, function () {
                  t.player.isLive() && t.player.getMaxTimeShift() < 0 && t.pausedTimeshiftUpdater.start();
                }),
                this.player.on(this.player.exports.PlayerEvent.Play, function () {
                  return t.pausedTimeshiftUpdater.clear();
                }),
                this.player.on(this.player.exports.PlayerEvent.Destroy, function () {
                  return t.pausedTimeshiftUpdater.clear();
                }));
            }),
            (r.prototype.prefixCss = function (e) {
              return this.config.cssPrefix + '-' + e;
            }),
            (n.TimelineMarkersHandler = r));
        },
        { '../dom': 81, '../playerutils': 95, '../timeout': 110 },
      ],
      70: [
        function (e, t, n) {
          var o,
            u,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.TitleBar = void 0), e('./container')),
            p = e('./metadatalabel'),
            e =
              ((u = r.Container),
              i(s, u),
              (s.prototype.configure = function (e, t) {
                for (
                  var o = this,
                    i = (u.prototype.configure.call(this, e, t), this.getConfig()),
                    r = !this.isHidden(),
                    s = !0,
                    n = function () {
                      s = !1;
                      for (var e = 0, t = o.getComponents(); e < t.length; e++) {
                        var n = t[e];
                        if (n instanceof p.MetadataLabel && !n.isEmpty()) {
                          s = !0;
                          break;
                        }
                      }
                      o.isShown() ? i.keepHiddenWithoutMetadata && !s && o.hide() : r && o.show();
                    },
                    a = 0,
                    l = this.getComponents();
                  a < l.length;
                  a++
                ) {
                  var c = l[a];
                  c instanceof p.MetadataLabel && c.onTextChanged.subscribe(n);
                }
                (t.onControlsShow.subscribe(function () {
                  ((r = !0), (i.keepHiddenWithoutMetadata && !s) || o.show());
                }),
                  t.onControlsHide.subscribe(function () {
                    ((r = !1), o.hide());
                  }),
                  n());
              }),
              s);
          function s(e) {
            var t = u.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                {
                  cssClass: 'ui-titlebar',
                  hidden: !0,
                  components: [
                    new p.MetadataLabel({ content: p.MetadataLabelContent.Title }),
                    new p.MetadataLabel({ content: p.MetadataLabelContent.Description }),
                  ],
                  keepHiddenWithoutMetadata: !1,
                },
                t.config,
              )),
              t
            );
          }
          n.TitleBar = e;
        },
        { './container': 20, './metadatalabel': 30 },
      ],
      71: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.ToggleButton = void 0), e('./button')),
            a = e('../eventdispatcher'),
            e =
              ((i = s.Button),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                i.prototype.configure.call(this, e, t);
                e = this.getConfig();
                this.getDomElement().addClass(this.prefixCss(null != (t = e.offClass) ? t : ''));
              }),
              (l.prototype.on = function () {
                var e, t;
                this.isOff() &&
                  ((t = this.getConfig()),
                  (this.onState = !0),
                  this.getDomElement().removeClass(this.prefixCss(null != (e = t.offClass) ? e : '')),
                  this.getDomElement().addClass(this.prefixCss(null != (e = t.onClass) ? e : '')),
                  this.onToggleEvent(),
                  this.onToggleOnEvent(),
                  this.setAriaAttr('pressed', 'true'),
                  this.config.onAriaLabel) &&
                  this.setAriaLabel(this.config.onAriaLabel);
              }),
              (l.prototype.off = function () {
                var e, t;
                this.isOn() &&
                  ((t = this.getConfig()),
                  (this.onState = !1),
                  this.getDomElement().removeClass(this.prefixCss(null != (e = t.onClass) ? e : '')),
                  this.getDomElement().addClass(this.prefixCss(null != (e = t.offClass) ? e : '')),
                  this.onToggleEvent(),
                  this.onToggleOffEvent(),
                  this.setAriaAttr('pressed', 'false'),
                  this.config.offAriaLabel) &&
                  this.setAriaLabel(this.config.offAriaLabel);
              }),
              (l.prototype.toggle = function () {
                this.isOn() ? this.off() : this.on();
              }),
              (l.prototype.isOn = function () {
                return this.onState;
              }),
              (l.prototype.isOff = function () {
                return !this.isOn();
              }),
              (l.prototype.onClickEvent = function () {
                (i.prototype.onClickEvent.call(this), this.onToggleEvent());
              }),
              (l.prototype.onToggleEvent = function () {
                this.toggleButtonEvents.onToggle.dispatch(this);
              }),
              (l.prototype.onToggleOnEvent = function () {
                this.toggleButtonEvents.onToggleOn.dispatch(this);
              }),
              (l.prototype.onToggleOffEvent = function () {
                this.toggleButtonEvents.onToggleOff.dispatch(this);
              }),
              Object.defineProperty(l.prototype, 'onToggle', {
                get: function () {
                  return this.toggleButtonEvents.onToggle.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(l.prototype, 'onToggleOn', {
                get: function () {
                  return this.toggleButtonEvents.onToggleOn.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(l.prototype, 'onToggleOff', {
                get: function () {
                  return this.toggleButtonEvents.onToggleOff.getEvent();
                },
                enumerable: !1,
                configurable: !0,
              }),
              l);
          function l(e) {
            var t = i.call(this, e) || this;
            t.toggleButtonEvents = {
              onToggle: new a.EventDispatcher(),
              onToggleOn: new a.EventDispatcher(),
              onToggleOff: new a.EventDispatcher(),
            };
            return (
              e.onAriaLabel && (e.ariaLabel = e.onAriaLabel),
              (t.config = t.mergeConfig(e, { cssClass: 'ui-togglebutton', onClass: 'on', offClass: 'off' }, t.config)),
              t
            );
          }
          n.ToggleButton = e;
        },
        { '../eventdispatcher': 83, './button': 13 },
      ],
      72: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.TvNoiseCanvas = void 0), e('./component')),
            a = e('../dom'),
            e =
              ((i = s.Component),
              r(l, i),
              (l.prototype.toDomElement = function () {
                return (this.canvas = new a.DOM('canvas', { class: this.getCssClasses() }));
              }),
              (l.prototype.start = function () {
                ((this.canvasElement = this.canvas.get(0)),
                  (this.canvasContext = this.canvasElement.getContext('2d')),
                  (this.noiseAnimationWindowPos = -this.canvasHeight),
                  (this.lastFrameUpdate = 0),
                  (this.canvasElement.width = this.canvasWidth),
                  (this.canvasElement.height = this.canvasHeight),
                  this.renderFrame());
              }),
              (l.prototype.stop = function () {
                (this.useAnimationFrame ? cancelAnimationFrame : clearTimeout)(this.frameUpdateHandlerId);
              }),
              (l.prototype.renderFrame = function () {
                if (!(this.lastFrameUpdate + this.frameInterval > new Date().getTime())) {
                  for (
                    var e,
                      t = this.canvasWidth,
                      n = this.canvasHeight,
                      o = this.canvasContext.createImageData(t, n),
                      i = 0;
                    i < n;
                    i++
                  )
                    for (var r = 0; r < t; r++)
                      ((o.data[(e = t * i * 4 + 4 * r)] = 255 * Math.random()),
                        (i < this.noiseAnimationWindowPos ||
                          i > this.noiseAnimationWindowPos + this.interferenceHeight) &&
                          (o.data[e] *= 0.85),
                        (o.data[1 + e] = o.data[e]),
                        (o.data[2 + e] = o.data[e]),
                        (o.data[3 + e] = 50));
                  (this.canvasContext.putImageData(o, 0, 0),
                    (this.lastFrameUpdate = new Date().getTime()),
                    (this.noiseAnimationWindowPos += 7),
                    this.noiseAnimationWindowPos > n && (this.noiseAnimationWindowPos = -n));
                }
                this.scheduleNextRender();
              }),
              (l.prototype.scheduleNextRender = function () {
                this.useAnimationFrame
                  ? (this.frameUpdateHandlerId = window.requestAnimationFrame(this.renderFrame.bind(this)))
                  : (this.frameUpdateHandlerId = window.setTimeout(this.renderFrame.bind(this), this.frameInterval));
              }),
              l);
          function l(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.canvasWidth = 160),
              (t.canvasHeight = 90),
              (t.interferenceHeight = 50),
              (t.lastFrameUpdate = 0),
              (t.frameInterval = 60),
              (t.useAnimationFrame = !!window.requestAnimationFrame),
              (t.config = t.mergeConfig(e, { cssClass: 'ui-tvnoisecanvas' }, t.config)),
              t
            );
          }
          n.TvNoiseCanvas = e;
        },
        { '../dom': 81, './component': 19 },
      ],
      73: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.UIContainer = void 0), e('./container')),
            p = e('../dom'),
            u = e('../timeout'),
            f = e('../playerutils'),
            a = e('../eventdispatcher'),
            l = e('../localization/i18n'),
            e =
              ((i = s.Container),
              r(g, i),
              (g.prototype.configure = function (e, t) {
                var n = this.getConfig();
                (n.userInteractionEventSource
                  ? (this.userInteractionEventSource = new p.DOM(n.userInteractionEventSource))
                  : (this.userInteractionEventSource = this.getDomElement()),
                  i.prototype.configure.call(this, e, t),
                  this.configureUIShowHide(e, t),
                  this.configurePlayerStates(e, t));
              }),
              (g.prototype.configureUIShowHide = function (t, n) {
                var e,
                  o,
                  i,
                  r,
                  s,
                  a,
                  l = this,
                  c = this.getConfig();
                -1 === c.hideDelay
                  ? n.onConfigured.subscribe(function () {
                      return n.onControlsShow.dispatch(l);
                    })
                  : ((r = !(i = o = !1)),
                    (a = function () {
                      return !!(c.hidePlayerStateExceptions && -1 < c.hidePlayerStateExceptions.indexOf(s));
                    }),
                    (this.showUi = function () {
                      (o || (n.onControlsShow.dispatch(l), (o = !0)),
                        i || t.isCasting() || a() || l.uiHideTimeout.start());
                    }),
                    (this.hideUi = function () {
                      var e;
                      o &&
                        !t.isCasting() &&
                        (n.onPreviewControlsHide.dispatch(l, (e = {})),
                        e.cancel ? l.showUi() : (n.onControlsHide.dispatch(l), (o = !1)));
                    }),
                    (this.uiHideTimeout = new u.Timeout(null != (e = c.hideDelay) ? e : 5e3, this.hideUi)),
                    (this.userInteractionEvents = [
                      {
                        name: 'touchend',
                        handler: function (e) {
                          o || (r && !t.isPlaying() ? (r = !1) : e.preventDefault(), l.showUi());
                        },
                      },
                      {
                        name: 'mouseenter',
                        handler: function () {
                          l.showUi();
                        },
                      },
                      {
                        name: 'mousemove',
                        handler: function () {
                          l.showUi();
                        },
                      },
                      {
                        name: 'focusin',
                        handler: function () {
                          l.showUi();
                        },
                      },
                      {
                        name: 'keydown',
                        handler: function () {
                          l.showUi();
                        },
                      },
                      {
                        name: 'mouseleave',
                        handler: function () {
                          i || a() || l.uiHideTimeout.start();
                        },
                      },
                    ]),
                    this.userInteractionEvents.forEach(function (e) {
                      return l.userInteractionEventSource.on(e.name, e.handler);
                    }),
                    n.onSeek.subscribe(function () {
                      (l.uiHideTimeout.clear(), (i = !0));
                    }),
                    n.onSeeked.subscribe(function () {
                      ((i = !1), a() || l.uiHideTimeout.start());
                    }),
                    t.on(t.exports.PlayerEvent.CastStarted, function () {
                      l.showUi();
                    }),
                    this.playerStateChange.subscribe(function (e, t) {
                      ((s = t), a() ? (l.uiHideTimeout.clear(), l.showUi()) : l.uiHideTimeout.start());
                    }));
              }),
              (g.prototype.configurePlayerStates = function (e, t) {
                var n,
                  o,
                  i,
                  r = this,
                  s = this.getDomElement(),
                  a = [];
                for (n in f.PlayerUtils.PlayerState)
                  isNaN(Number(n)) &&
                    ((o = f.PlayerUtils.PlayerState[n]),
                    (i = f.PlayerUtils.PlayerState[o]),
                    (a[o] = this.prefixCss(g.STATE_PREFIX + i.toLowerCase())));
                function l(e) {
                  (u(), s.addClass(a[e]), r.playerStateChange.dispatch(r, e));
                }
                function c(e, t) {
                  (s.removeClass(r.prefixCss('layout-max-width-305')),
                    s.removeClass(r.prefixCss('layout-max-width-400')),
                    s.removeClass(r.prefixCss('layout-max-width-600')),
                    s.removeClass(r.prefixCss('layout-max-width-800')),
                    s.removeClass(r.prefixCss('layout-max-width-1200')),
                    e <= 305
                      ? s.addClass(r.prefixCss('layout-max-width-305'))
                      : e <= 400
                        ? s.addClass(r.prefixCss('layout-max-width-400'))
                        : e <= 600
                          ? s.addClass(r.prefixCss('layout-max-width-600'))
                          : e <= 800
                            ? s.addClass(r.prefixCss('layout-max-width-800'))
                            : e <= 1200 && s.addClass(r.prefixCss('layout-max-width-1200')));
                }
                var u = function () {
                  (s.removeClass(a[f.PlayerUtils.PlayerState.Idle]),
                    s.removeClass(a[f.PlayerUtils.PlayerState.Prepared]),
                    s.removeClass(a[f.PlayerUtils.PlayerState.Playing]),
                    s.removeClass(a[f.PlayerUtils.PlayerState.Paused]),
                    s.removeClass(a[f.PlayerUtils.PlayerState.Finished]));
                };
                (e.on(e.exports.PlayerEvent.SourceLoaded, function () {
                  l(f.PlayerUtils.PlayerState.Prepared);
                }),
                  e.on(e.exports.PlayerEvent.Play, function () {
                    l(f.PlayerUtils.PlayerState.Playing);
                  }),
                  e.on(e.exports.PlayerEvent.Playing, function () {
                    l(f.PlayerUtils.PlayerState.Playing);
                  }),
                  e.on(e.exports.PlayerEvent.Paused, function () {
                    l(f.PlayerUtils.PlayerState.Paused);
                  }),
                  e.on(e.exports.PlayerEvent.PlaybackFinished, function () {
                    l(f.PlayerUtils.PlayerState.Finished);
                  }),
                  e.on(e.exports.PlayerEvent.SourceUnloaded, function () {
                    l(f.PlayerUtils.PlayerState.Idle);
                  }),
                  t.getConfig().events.onUpdated.subscribe(function () {
                    l(f.PlayerUtils.getState(e));
                  }),
                  e.on(e.exports.PlayerEvent.ViewModeChanged, function () {
                    e.getViewMode() === e.exports.ViewMode.Fullscreen
                      ? s.addClass(r.prefixCss(g.FULLSCREEN))
                      : s.removeClass(r.prefixCss(g.FULLSCREEN));
                  }),
                  e.getViewMode() === e.exports.ViewMode.Fullscreen && s.addClass(this.prefixCss(g.FULLSCREEN)),
                  e.on(e.exports.PlayerEvent.StallStarted, function () {
                    s.addClass(r.prefixCss(g.BUFFERING));
                  }),
                  e.on(e.exports.PlayerEvent.StallEnded, function () {
                    s.removeClass(r.prefixCss(g.BUFFERING));
                  }),
                  e.isStalled() && s.addClass(this.prefixCss(g.BUFFERING)),
                  e.on(e.exports.PlayerEvent.CastStarted, function () {
                    s.addClass(r.prefixCss(g.REMOTE_CONTROL));
                  }),
                  e.on(e.exports.PlayerEvent.CastStopped, function () {
                    s.removeClass(r.prefixCss(g.REMOTE_CONTROL));
                  }),
                  e.isCasting() && s.addClass(this.prefixCss(g.REMOTE_CONTROL)),
                  t.onControlsShow.subscribe(function () {
                    (s.removeClass(r.prefixCss(g.CONTROLS_HIDDEN)), s.addClass(r.prefixCss(g.CONTROLS_SHOWN)));
                  }),
                  t.onControlsHide.subscribe(function () {
                    (s.removeClass(r.prefixCss(g.CONTROLS_SHOWN)), s.addClass(r.prefixCss(g.CONTROLS_HIDDEN)));
                  }));
                (e.on(e.exports.PlayerEvent.PlayerResized, function (e) {
                  var t = Math.round(Number(e.width.substring(0, e.width.length - 2)));
                  Math.round(Number(e.height.substring(0, e.height.length - 2)));
                  c(t);
                }),
                  c(new p.DOM(e.getContainer()).width(), new p.DOM(e.getContainer()).height()));
              }),
              (g.prototype.release = function () {
                var t = this;
                (this.userInteractionEvents &&
                  this.userInteractionEvents.forEach(function (e) {
                    return t.userInteractionEventSource.off(e.name, e.handler);
                  }),
                  i.prototype.release.call(this),
                  this.uiHideTimeout && this.uiHideTimeout.clear());
              }),
              (g.prototype.toDomElement = function () {
                var e = i.prototype.toDomElement.call(this);
                return (
                  document && void 0 !== document.createElement('p').style.flex
                    ? e.addClass(this.prefixCss('flexbox'))
                    : e.addClass(this.prefixCss('no-flexbox')),
                  e
                );
              }),
              (g.STATE_PREFIX = 'player-state-'),
              (g.FULLSCREEN = 'fullscreen'),
              (g.BUFFERING = 'buffering'),
              (g.REMOTE_CONTROL = 'remote-control'),
              (g.CONTROLS_SHOWN = 'controls-shown'),
              (g.CONTROLS_HIDDEN = 'controls-hidden'),
              g);
          function g(e) {
            var t = i.call(this, e) || this;
            return (
              (t.hideUi = function () {}),
              (t.showUi = function () {}),
              (t.config = t.mergeConfig(
                e,
                {
                  cssClass: 'ui-uicontainer',
                  role: 'region',
                  ariaLabel: l.i18n.getLocalizer('player'),
                  hideDelay: 5e3,
                },
                t.config,
              )),
              (t.playerStateChange = new a.EventDispatcher()),
              t
            );
          }
          n.UIContainer = e;
        },
        {
          '../dom': 81,
          '../eventdispatcher': 83,
          '../localization/i18n': 88,
          '../playerutils': 95,
          '../timeout': 110,
          './container': 20,
        },
      ],
      74: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.VideoQualitySelectBox = void 0),
              e('./selectbox')),
            l = e('../localization/i18n'),
            e =
              ((i = s.SelectBox),
              r(a, i),
              (a.prototype.configure = function (r, e) {
                function t() {
                  var e,
                    t = r.getAvailableVideoQualities();
                  (s.clearItems(),
                    (s.hasAuto = 'progressive' !== r.getStreamType()),
                    s.hasAuto && s.addItem('auto', l.i18n.getLocalizer('auto')));
                  for (var n = 0, o = t; n < o.length; n++) {
                    var i = o[n];
                    s.addItem(i.id, null != (e = i.label) ? e : i.id);
                  }
                  a();
                }
                var s = this,
                  a =
                    (i.prototype.configure.call(this, r, e),
                    function () {
                      s.selectItem(r.getVideoQuality().id);
                    });
                (this.onItemSelected.subscribe(function (e, t) {
                  r.setVideoQuality(t);
                }),
                  r.on(r.exports.PlayerEvent.SourceUnloaded, t),
                  r.on(r.exports.PlayerEvent.PeriodSwitched, t),
                  r.on(r.exports.PlayerEvent.VideoQualityChanged, a),
                  r.exports.PlayerEvent.VideoQualityAdded &&
                    (r.on(r.exports.PlayerEvent.VideoQualityAdded, t),
                    r.on(r.exports.PlayerEvent.VideoQualityRemoved, t)),
                  e.getConfig().events.onUpdated.subscribe(t));
              }),
              (a.prototype.hasAutoItem = function () {
                return this.hasAuto;
              }),
              a);
          function a(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return ((t.config = t.mergeConfig(e, { cssClasses: ['ui-videoqualityselectbox'] }, t.config)), t);
          }
          n.VideoQualitySelectBox = e;
        },
        { '../localization/i18n': 88, './selectbox': 43 },
      ],
      75: [
        function (e, t, n) {
          var o,
            r,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.VolumeControlButton = void 0),
              e('./container')),
            a = e('./volumeslider'),
            l = e('./volumetogglebutton'),
            c = e('../timeout'),
            e =
              ((r = s.Container),
              i(u, r),
              (u.prototype.configure = function (e, t) {
                var n = this,
                  e = (r.prototype.configure.call(this, e, t), this.getVolumeToggleButton()),
                  o = this.getVolumeSlider(),
                  i =
                    ((this.volumeSliderHideTimeout = new c.Timeout(
                      null != (t = this.getConfig().hideDelay) ? t : 500,
                      function () {
                        o.hide();
                      },
                    )),
                    !1);
                (e.getDomElement().on('mouseenter', function () {
                  (o.isHidden() && o.show(), n.volumeSliderHideTimeout.clear());
                }),
                  e.getDomElement().on('mouseleave', function () {
                    n.volumeSliderHideTimeout.reset();
                  }),
                  o.getDomElement().on('mouseenter', function () {
                    (n.volumeSliderHideTimeout.clear(), (i = !0));
                  }),
                  o.getDomElement().on('mouseleave', function () {
                    (o.isSeeking() ? n.volumeSliderHideTimeout.clear() : n.volumeSliderHideTimeout.reset(), (i = !1));
                  }),
                  o.onSeeked.subscribe(function () {
                    i || n.volumeSliderHideTimeout.reset();
                  }));
              }),
              (u.prototype.release = function () {
                (r.prototype.release.call(this), this.volumeSliderHideTimeout.clear());
              }),
              (u.prototype.getVolumeToggleButton = function () {
                return this.volumeToggleButton;
              }),
              (u.prototype.getVolumeSlider = function () {
                return this.volumeSlider;
              }),
              u);
          function u(e) {
            var t = r.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.volumeToggleButton = new l.VolumeToggleButton()),
              (t.volumeSlider = new a.VolumeSlider({ vertical: null == e.vertical || e.vertical, hidden: !0 })),
              (t.config = t.mergeConfig(
                e,
                {
                  cssClass: 'ui-volumecontrolbutton',
                  components: [t.volumeToggleButton, t.volumeSlider],
                  hideDelay: 500,
                },
                t.config,
              )),
              t
            );
          }
          n.VolumeControlButton = e;
        },
        { '../timeout': 110, './container': 20, './volumeslider': 76, './volumetogglebutton': 77 },
      ],
      76: [
        function (e, t, n) {
          var o,
            r,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.VolumeSlider = void 0), e('./seekbar')),
            a = e('../localization/i18n'),
            e =
              ((r = s.SeekBar),
              i(l, r),
              (l.prototype.setVolumeAriaSliderValues = function (e) {
                (this.getDomElement().attr('aria-valuenow', Math.ceil(e).toString()),
                  this.getDomElement().attr(
                    'aria-valuetext',
                    ''
                      .concat(a.i18n.performLocalization(a.i18n.getLocalizer('seekBar.value')), ': ')
                      .concat(Math.ceil(e)),
                  ));
              }),
              (l.prototype.configure = function (e, t) {
                var n = this,
                  o =
                    (r.prototype.configure.call(this, e, t, !1),
                    this.setAriaSliderMinMax('0', '100'),
                    this.getConfig()),
                  i = t.getConfig().volumeController;
                o.hideIfVolumeControlProhibited && !this.detectVolumeControlAvailability()
                  ? this.hide()
                  : (i.onChanged.subscribe(function (e, t) {
                      t.muted
                        ? (n.setVolumeAriaSliderValues(0), n.setPlaybackPosition(0))
                        : (n.setPlaybackPosition(t.volume), n.setVolumeAriaSliderValues(t.volume));
                    }),
                    this.onSeek.subscribe(function () {
                      n.volumeTransition = i.startTransition();
                    }),
                    this.onSeekPreview.subscribeRateLimited(this.updateVolumeWhileScrubbing, 50),
                    this.onSeeked.subscribe(function (e, t) {
                      n.volumeTransition && n.volumeTransition.finish(t);
                    }),
                    e.on(e.exports.PlayerEvent.PlayerResized, function () {
                      n.refreshPlaybackPosition();
                    }),
                    t.onConfigured.subscribe(function () {
                      n.refreshPlaybackPosition();
                    }),
                    t.getConfig().events.onUpdated.subscribe(function () {
                      n.refreshPlaybackPosition();
                    }),
                    t.onComponentShow.subscribe(function () {
                      n.refreshPlaybackPosition();
                    }),
                    t.onComponentHide.subscribe(function () {
                      n.refreshPlaybackPosition();
                    }),
                    i.onChangedEvent());
              }),
              (l.prototype.detectVolumeControlAvailability = function () {
                var e = document.createElement('video');
                return ((e.volume = 0.7), 1 !== e.volume);
              }),
              (l.prototype.release = function () {
                (r.prototype.release.call(this), this.onSeekPreview.unsubscribe(this.updateVolumeWhileScrubbing));
              }),
              l);
          function l(e) {
            var n = r.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (n.updateVolumeWhileScrubbing = function (e, t) {
                t.scrubbing && n.volumeTransition && n.volumeTransition.update(t.position);
              }),
              (n.config = n.mergeConfig(
                e,
                {
                  cssClass: 'ui-volumeslider',
                  hideIfVolumeControlProhibited: !0,
                  ariaLabel: a.i18n.getLocalizer('settings.audio.volume'),
                  tabIndex: 0,
                },
                n.config,
              )),
              n
            );
          }
          n.VolumeSlider = e;
        },
        { '../localization/i18n': 88, './seekbar': 39 },
      ],
      77: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.VolumeToggleButton = void 0),
              e('./togglebutton')),
            a = e('../localization/i18n'),
            e =
              ((i = s.ToggleButton),
              r(l, i),
              (l.prototype.configure = function (e, t) {
                var n = this,
                  o = (i.prototype.configure.call(this, e, t), t.getConfig().volumeController);
                (o.onChanged.subscribe(function (e, t) {
                  t.muted ? n.on() : n.off();
                  t = Math.ceil(t.volume / 10);
                  n.getDomElement().data(n.prefixCss('volume-level-tens'), String(t));
                }),
                  this.onClick.subscribe(function () {
                    o.toggleMuted();
                  }),
                  o.onChangedEvent());
              }),
              l);
          function l(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this,
              n = {
                cssClass: 'ui-volumetogglebutton',
                text: a.i18n.getLocalizer('settings.audio.mute'),
                onClass: 'muted',
                offClass: 'unmuted',
                ariaLabel: a.i18n.getLocalizer('settings.audio.mute'),
              };
            return ((t.config = t.mergeConfig(e, n, t.config)), t);
          }
          n.VolumeToggleButton = e;
        },
        { '../localization/i18n': 88, './togglebutton': 71 },
      ],
      78: [
        function (e, t, n) {
          var o,
            a,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            r =
              (Object.defineProperty(n, '__esModule', { value: !0 }), (n.VRToggleButton = void 0), e('./togglebutton')),
            s = e('../localization/i18n'),
            e =
              ((a = r.ToggleButton),
              i(l, a),
              (l.prototype.configure = function (t, e) {
                function n(e) {
                  (e.type === t.exports.PlayerEvent.Warning && e.code !== t.exports.WarningCode.VR_RENDERING_ERROR) ||
                    (r() && s() ? (i.show(), t.vr && t.vr.getStereo() ? i.on() : i.off()) : i.hide());
                }
                function o() {
                  r() ? i.show() : i.hide();
                }
                var i = this,
                  r =
                    (a.prototype.configure.call(this, t, e),
                    function () {
                      var e = t.getSource();
                      return e && Boolean(e.vr);
                    }),
                  s = function () {
                    var e = t.getSource();
                    return t.vr && Boolean(null == e ? void 0 : e.vr);
                  };
                (t.on(t.exports.PlayerEvent.VRStereoChanged, n),
                  t.on(t.exports.PlayerEvent.Warning, n),
                  t.on(t.exports.PlayerEvent.SourceUnloaded, o),
                  e.getConfig().events.onUpdated.subscribe(o),
                  this.onClick.subscribe(function () {
                    s()
                      ? t.vr && t.vr.getStereo()
                        ? t.vr.setStereo(!1)
                        : t.vr.setStereo(!0)
                      : console && console.log('No VR content');
                  }),
                  o());
              }),
              l);
          function l(e) {
            var t = a.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                { cssClass: 'ui-vrtogglebutton', text: s.i18n.getLocalizer('vr') },
                t.config,
              )),
              t
            );
          }
          n.VRToggleButton = e;
        },
        { '../localization/i18n': 88, './togglebutton': 71 },
      ],
      79: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s = (Object.defineProperty(n, '__esModule', { value: !0 }), (n.Watermark = void 0), e('./clickoverlay')),
            a = e('../localization/i18n'),
            e = ((i = s.ClickOverlay), r(l, i), l);
          function l(e) {
            var t = i.call(this, (e = void 0 === e ? {} : e)) || this;
            return (
              (t.config = t.mergeConfig(
                e,
                {
                  cssClass: 'ui-watermark',
                  url: 'http://bitmovin.com',
                  role: 'link',
                  text: 'logo',
                  ariaLabel: a.i18n.getLocalizer('watermarkLink'),
                },
                t.config,
              )),
              t
            );
          }
          n.Watermark = e;
        },
        { '../localization/i18n': 88, './clickoverlay': 17 },
      ],
      80: [
        function (e, D, t) {
          (Object.defineProperty(t, '__esModule', { value: !0 }), (t.DemoFactory = void 0));
          var n,
            o,
            i = e('./components/vrtogglebutton'),
            r = e('./components/settingstogglebutton'),
            s = e('./components/volumeslider'),
            a = e('./components/playbacktimelabel'),
            l = e('./components/airplaytogglebutton'),
            c = e('./components/errormessageoverlay'),
            u = e('./components/controlbar'),
            p = e('./components/casttogglebutton'),
            f = e('./components/fullscreentogglebutton'),
            g = e('./components/recommendationoverlay'),
            d = e('./components/playbackspeedselectbox'),
            h = e('./components/audioqualityselectbox'),
            y = e('./components/caststatusoverlay'),
            m = e('./components/uicontainer'),
            b = e('./components/watermark'),
            v = e('./components/subtitleoverlay'),
            P = e('./components/settingspanel'),
            C = e('./components/seekbarlabel'),
            S = e('./components/playbacktoggleoverlay'),
            w = e('./components/pictureinpicturetogglebutton'),
            _ = e('./components/spacer'),
            E = e('./components/container'),
            O = e('./components/volumetogglebutton'),
            x = e('./components/playbacktogglebutton'),
            k = e('./components/seekbar'),
            T = e('./components/videoqualityselectbox'),
            M = e('./uimanager'),
            L = e('./components/titlebar'),
            A = e('./components/bufferingoverlay'),
            U = e('./components/subtitlelistbox'),
            z = e('./components/audiotracklistbox'),
            B = e('./components/settingspanelitem'),
            I = e('./components/settingspanelpage'),
            j = e('./uifactory');
          (((n || (t.DemoFactory = {})).buildDemoWithSeparateAudioSubtitlesButtons = function (e, t) {
            return (
              void 0 === t && (t = {}),
              new M.UIManager(
                e,
                [
                  {
                    ui: j.UIFactory.modernSmallScreenAdsUI(),
                    condition: function (e) {
                      return e.isMobile && e.documentWidth < 600 && e.isAd && e.adRequiresUi;
                    },
                  },
                  {
                    ui: j.UIFactory.modernAdsUI(),
                    condition: function (e) {
                      return e.isAd && e.adRequiresUi;
                    },
                  },
                  {
                    ui: j.UIFactory.modernSmallScreenUI(),
                    condition: function (e) {
                      return e.isMobile && e.documentWidth < 600;
                    },
                  },
                  { ui: o() },
                ],
                t,
              )
            );
          }),
            (o = function () {
              var e = new v.SubtitleOverlay(),
                t = new P.SettingsPanel({
                  components: [
                    new I.SettingsPanelPage({
                      components: [
                        new B.SettingsPanelItem('Video Quality', new T.VideoQualitySelectBox()),
                        new B.SettingsPanelItem('Speed', new d.PlaybackSpeedSelectBox()),
                        new B.SettingsPanelItem('Audio Quality', new h.AudioQualitySelectBox()),
                      ],
                    }),
                  ],
                  hidden: !0,
                }),
                n = new U.SubtitleListBox(),
                n = new P.SettingsPanel({
                  components: [new I.SettingsPanelPage({ components: [new B.SettingsPanelItem(null, n)] })],
                  hidden: !0,
                }),
                o = new z.AudioTrackListBox(),
                o = new P.SettingsPanel({
                  components: [new I.SettingsPanelPage({ components: [new B.SettingsPanelItem(null, o)] })],
                  hidden: !0,
                }),
                o = new u.ControlBar({
                  components: [
                    o,
                    n,
                    t,
                    new E.Container({
                      components: [
                        new a.PlaybackTimeLabel({
                          timeLabelMode: a.PlaybackTimeLabelMode.CurrentTime,
                          hideInLivePlayback: !0,
                        }),
                        new k.SeekBar({ label: new C.SeekBarLabel() }),
                        new a.PlaybackTimeLabel({
                          timeLabelMode: a.PlaybackTimeLabelMode.TotalTime,
                          cssClasses: ['text-right'],
                        }),
                      ],
                      cssClasses: ['controlbar-top'],
                    }),
                    new E.Container({
                      components: [
                        new x.PlaybackToggleButton(),
                        new O.VolumeToggleButton(),
                        new s.VolumeSlider(),
                        new _.Spacer(),
                        new w.PictureInPictureToggleButton(),
                        new l.AirPlayToggleButton(),
                        new p.CastToggleButton(),
                        new i.VRToggleButton(),
                        new r.SettingsToggleButton({ settingsPanel: o, cssClass: 'ui-audiotracksettingstogglebutton' }),
                        new r.SettingsToggleButton({ settingsPanel: n, cssClass: 'ui-subtitlesettingstogglebutton' }),
                        new r.SettingsToggleButton({ settingsPanel: t }),
                        new f.FullscreenToggleButton(),
                      ],
                      cssClasses: ['controlbar-bottom'],
                    }),
                  ],
                });
              return new m.UIContainer({
                components: [
                  e,
                  new A.BufferingOverlay(),
                  new S.PlaybackToggleOverlay(),
                  new y.CastStatusOverlay(),
                  o,
                  new L.TitleBar(),
                  new g.RecommendationOverlay(),
                  new b.Watermark(),
                  new c.ErrorMessageOverlay(),
                ],
              });
            }));
        },
        {
          './components/airplaytogglebutton': 7,
          './components/audioqualityselectbox': 8,
          './components/audiotracklistbox': 9,
          './components/bufferingoverlay': 12,
          './components/caststatusoverlay': 14,
          './components/casttogglebutton': 15,
          './components/container': 20,
          './components/controlbar': 21,
          './components/errormessageoverlay': 22,
          './components/fullscreentogglebutton': 23,
          './components/pictureinpicturetogglebutton': 31,
          './components/playbackspeedselectbox': 32,
          './components/playbacktimelabel': 33,
          './components/playbacktogglebutton': 34,
          './components/playbacktoggleoverlay': 35,
          './components/recommendationoverlay': 37,
          './components/seekbar': 39,
          './components/seekbarlabel': 42,
          './components/settingspanel': 44,
          './components/settingspanelitem': 45,
          './components/settingspanelpage': 46,
          './components/settingstogglebutton': 50,
          './components/spacer': 51,
          './components/subtitlelistbox': 52,
          './components/subtitleoverlay': 53,
          './components/titlebar': 70,
          './components/uicontainer': 73,
          './components/videoqualityselectbox': 74,
          './components/volumeslider': 76,
          './components/volumetogglebutton': 77,
          './components/vrtogglebutton': 78,
          './components/watermark': 79,
          './uifactory': 111,
          './uimanager': 113,
        },
      ],
      81: [
        function (e, t, n) {
          function o(e, t) {
            if (((this.elements = null), (this.document = document), e instanceof Array))
              0 < e.length && e[0] instanceof HTMLElement && (this.elements = e);
            else if (e instanceof HTMLElement) {
              var n = e;
              this.elements = [n];
            } else if (e instanceof Document) this.elements = null;
            else if (t) {
              var o,
                n = document.createElement(e);
              for (o in t) {
                var i = t[o];
                null != i && n.setAttribute(o, i);
              }
              this.elements = [n];
            } else this.elements = this.findChildElements(e);
          }
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.DOM = void 0),
            Object.defineProperty(o.prototype, 'length', {
              get: function () {
                return this.elements ? this.elements.length : 0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (o.prototype.get = function (e) {
              var t;
              return void 0 === e
                ? null != (t = this.elements)
                  ? t
                  : []
                : !this.elements || e >= this.elements.length || e < -this.elements.length
                  ? void 0
                  : e < 0
                    ? this.elements[this.elements.length - e]
                    : this.elements[e];
            }),
            (o.prototype.forEach = function (t) {
              this.elements &&
                this.elements.forEach(function (e) {
                  t(e);
                });
            }),
            (o.prototype.findChildElementsOfElement = function (e, t) {
              e = e.querySelectorAll(t);
              return [].slice.call(e);
            }),
            (o.prototype.findChildElements = function (t) {
              var n = this,
                o = [];
              return this.elements
                ? (this.forEach(function (e) {
                    o = o.concat(n.findChildElementsOfElement(e, t));
                  }),
                  o)
                : this.findChildElementsOfElement(document, t);
            }),
            (o.prototype.find = function (e) {
              return new o(this.findChildElements(e));
            }),
            (o.prototype.focusToFirstInput = function () {
              var e = this.findChildElements(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
              );
              0 < e.length && e[0].focus();
            }),
            (o.prototype.scrollTo = function (e, t) {
              var n;
              null != (n = null == (n = this.elements) ? void 0 : n[0]) && n.scrollTo(e, t);
            }),
            (o.prototype.html = function (e) {
              return 0 < arguments.length ? this.setHtml(e) : this.getHtml();
            }),
            (o.prototype.getHtml = function () {
              return this.elements[0].innerHTML;
            }),
            (o.prototype.setHtml = function (t) {
              return (
                (void 0 !== t && null != t) || (t = ''),
                this.forEach(function (e) {
                  e.innerHTML = t;
                }),
                this
              );
            }),
            (o.prototype.empty = function () {
              return (
                this.forEach(function (e) {
                  e.innerHTML = '';
                }),
                this
              );
            }),
            (o.prototype.val = function () {
              var e = this.elements[0];
              if (e instanceof HTMLSelectElement || e instanceof HTMLInputElement) return e.value;
              throw new Error('val() not supported for '.concat(typeof e));
            }),
            (o.prototype.attr = function (e, t) {
              return 1 < arguments.length ? this.setAttr(e, t) : this.getAttr(e);
            }),
            (o.prototype.removeAttr = function (t) {
              this.forEach(function (e) {
                e.removeAttribute(t);
              });
            }),
            (o.prototype.getAttr = function (e) {
              return this.elements[0].getAttribute(e);
            }),
            (o.prototype.setAttr = function (t, n) {
              return (
                this.forEach(function (e) {
                  e.setAttribute(t, n);
                }),
                this
              );
            }),
            (o.prototype.data = function (e, t) {
              return 1 < arguments.length ? this.setData(e, t) : this.getData(e);
            }),
            (o.prototype.getData = function (e) {
              return this.elements[0].getAttribute('data-' + e);
            }),
            (o.prototype.setData = function (t, n) {
              return (
                this.forEach(function (e) {
                  e.setAttribute('data-' + t, n);
                }),
                this
              );
            }),
            (o.prototype.append = function () {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              return (
                this.forEach(function (o) {
                  e.forEach(function (n) {
                    var e;
                    null != (e = n.elements) &&
                      e.forEach(function (e, t) {
                        o.appendChild(n.elements[t]);
                      });
                  });
                }),
                this
              );
            }),
            (o.prototype.remove = function () {
              this.forEach(function (e) {
                var t = e.parentNode;
                t && t.removeChild(e);
              });
            }),
            (o.prototype.offset = function () {
              var e = this.elements[0].getBoundingClientRect(),
                t = document.body.parentElement.getBoundingClientRect();
              return { top: e.top - t.top, left: e.left - t.left };
            }),
            (o.prototype.width = function () {
              return this.elements[0].offsetWidth;
            }),
            (o.prototype.height = function () {
              return this.elements[0].offsetHeight;
            }),
            (o.prototype.size = function () {
              return { width: this.width(), height: this.height() };
            }),
            (o.prototype.on = function (e, n) {
              var o = this;
              return (
                e.split(' ').forEach(function (t) {
                  null == o.elements
                    ? o.document.addEventListener(t, n)
                    : o.forEach(function (e) {
                        e.addEventListener(t, n);
                      });
                }),
                this
              );
            }),
            (o.prototype.off = function (e, n) {
              var o = this;
              return (
                e.split(' ').forEach(function (t) {
                  null == o.elements
                    ? o.document.removeEventListener(t, n)
                    : o.forEach(function (e) {
                        e.removeEventListener(t, n);
                      });
                }),
                this
              );
            }),
            (o.prototype.addClass = function (o) {
              return (
                this.forEach(function (e) {
                  var t, n;
                  e.classList
                    ? 0 <
                        (n = o.split(' ').filter(function (e) {
                          return 0 < e.length;
                        })).length && (t = e.classList).add.apply(t, n)
                    : (e.className += ' ' + o);
                }),
                this
              );
            }),
            (o.prototype.removeClass = function (o) {
              return (
                this.forEach(function (e) {
                  var t, n;
                  e.classList
                    ? 0 <
                        (n = o.split(' ').filter(function (e) {
                          return 0 < e.length;
                        })).length && (t = e.classList).remove.apply(t, n)
                    : (e.className = e.className.replace(
                        new RegExp('(^|\\b)' + o.split(' ').join('|') + '(\\b|$)', 'gi'),
                        ' ',
                      ));
                }),
                this
              );
            }),
            (o.prototype.hasClass = function (t) {
              var n = !1;
              return (
                this.forEach(function (e) {
                  e.classList
                    ? e.classList.contains(t) && (n = !0)
                    : new RegExp('(^| )' + t + '( |$)', 'gi').test(e.className) && (n = !0);
                }),
                n
              );
            }),
            (o.prototype.css = function (e, t) {
              var n;
              return 'string' == typeof e
                ? ((n = e), 2 === arguments.length ? this.setCss(n, t) : this.getCss(n))
                : this.setCssCollection(e);
            }),
            (o.prototype.removeCss = function (e, t) {
              return this.elements[(t = void 0 === t ? 0 : t)].style.removeProperty(e);
            }),
            (o.prototype.getCss = function (e) {
              return getComputedStyle(this.elements[0])[e];
            }),
            (o.prototype.setCss = function (t, n) {
              return (
                this.forEach(function (e) {
                  e.style[t] = n;
                }),
                this
              );
            }),
            (o.prototype.setCssCollection = function (t) {
              return (
                this.forEach(function (e) {
                  Object.assign(e.style, t);
                }),
                this
              );
            }),
            (n.DOM = o));
        },
        {},
      ],
      82: [
        function (e, t, n) {
          var o;
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.ErrorUtils = void 0),
            (o = n.ErrorUtils =
              {
                defaultErrorMessages: {
                  1e3: 'Error is unknown',
                  1001: 'The player API is not available after a call to PlayerAPI.destroy.',
                  1100: 'General setup error',
                  1101: 'There was an error when inserting the HTML video element',
                  1102: 'No configuration was provided',
                  1103: 'The license is not valid',
                  1104: 'The the domain-locked player is not authorized to playback on this domain',
                  1105: 'The domain is not allowlisted',
                  1106: 'The license server URL is invalid',
                  1107: 'The impression server URL is invalid',
                  1108: 'Could not initialize a rendering engine',
                  1109: 'The used flash version does not support playback',
                  1110: 'Native Flash is not authorized by a valid Adobe token',
                  1111: "Flash doesn't have sufficient resources",
                  1112: 'Flash container API not available',
                  1113: 'Protocol not supported. This site has been loaded using "file" protocol, but unfortunately this is not supported. Please load the page using a web server (using http or https)',
                  1200: 'General source error',
                  1201: 'No valid source was provided',
                  1202: 'The downloaded manifest is invalid',
                  1203: 'There was no technology detected to playback the provided source',
                  1204: 'The stream type is not supported',
                  1205: 'The forced technology is not supported',
                  1206: 'No stream found for supported technologies.',
                  1207: 'The downloaded segment is empty',
                  1208: 'The manifest could not be loaded',
                  1209: 'Progressive stream type not supported or the stream has an error',
                  1210: 'HLS stream has an error',
                  1211: 'The encryption method is not supported',
                  1300: 'General playback error',
                  1301: 'Video decoder or demuxer had an error with the content',
                  1302: 'General error if Flash renderer has an error',
                  1303: "Flash doesn't have sufficient resources",
                  1304: 'The transmuxer could not be initialized',
                  1400: 'Network error while downloading',
                  1401: 'The manifest download timed out',
                  1402: 'The segment download timed out',
                  1403: 'The progressive stream download timed out',
                  1404: 'The Certificate could not be loaded',
                  2e3: 'General DRM error',
                  2001: 'Required DRM configuration is missing',
                  2002: 'The licensing server URL is missing',
                  2003: 'License request failed',
                  2004: 'Key or KeyId is missing',
                  2005: 'Key size is not supported',
                  2006: 'Unable to instantiate a key system supporting the required combinations',
                  2007: 'Unable to create or initialize key session',
                  2008: 'The MediaKey object could not be created/initialized',
                  2009: 'Key error',
                  2010: 'The key system is not supported',
                  2011: 'The certificate is not valid',
                  2012: 'Invalid header key/value pair for PlayReady license request',
                  2013: 'Content cannot be played back because the output is restricted on this machine',
                  2014: 'DRM error for the Flash renderer',
                  2100: 'General VR error',
                  2101: 'Player technology not compatible with VR playback',
                  3e3: 'General module error',
                  3001: 'The definition of the module is invalid (e.g. incomplete).',
                  3002: 'The module definition specifies dependencies but the module is not provided via a function for deferred loading.',
                  3003: 'A module cannot be loaded because it has not been added to the player core.',
                  3004: 'A module cannot be loaded because one or more dependencies are missing.',
                  3100: 'An Advertising module error has occurred. Refer to the attached AdvertisingError.',
                },
                defaultMobileV3ErrorMessageTranslator: function (e) {
                  return e.message;
                },
                defaultWebErrorMessageTranslator: function (e) {
                  var t = o.defaultErrorMessages[e.code],
                    n = null != (n = e.name) ? n : '';
                  return t ? ''.concat(t, '\n(').concat(n, ')') : ''.concat(e.code, ' ').concat(n);
                },
              }));
        },
        {},
      ],
      83: [
        function (e, t, n) {
          var o,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            l =
              (Object.defineProperty(n, '__esModule', { value: !0 }), (n.EventDispatcher = void 0), e('./arrayutils')),
            r = e('./timeout');
          function s() {
            this.listeners = [];
          }
          ((s.prototype.subscribe = function (e) {
            this.listeners.push(new a(e));
          }),
            (s.prototype.subscribeOnce = function (e) {
              this.listeners.push(new a(e, !0));
            }),
            (s.prototype.subscribeRateLimited = function (e, t) {
              this.listeners.push(new p(e, t));
            }),
            (s.prototype.unsubscribe = function (e) {
              for (var t = 0; t < this.listeners.length; t++) {
                var n = this.listeners[t];
                if (n.listener === e) return (n.clear(), l.ArrayUtils.remove(this.listeners, n), !0);
              }
              return !1;
            }),
            (s.prototype.unsubscribeAll = function () {
              for (var e = 0, t = this.listeners; e < t.length; e++) t[e].clear();
              this.listeners = [];
            }),
            (s.prototype.dispatch = function (e, t) {
              void 0 === t && (t = null);
              for (var n = [], o = 0, i = this.listeners.slice(0); o < i.length; o++) {
                var r = i[o];
                (r.fire(e, t), r.isOnce() && n.push(r));
              }
              for (var s = 0, a = n; s < a.length; s++) l.ArrayUtils.remove(this.listeners, a[s]);
            }),
            (s.prototype.getEvent = function () {
              return this;
            }),
            (n.EventDispatcher = s));
          (Object.defineProperty(c.prototype, 'listener', {
            get: function () {
              return this.eventListener;
            },
            enumerable: !1,
            configurable: !0,
          }),
            (c.prototype.fire = function (e, t) {
              this.eventListener(e, t);
            }),
            (c.prototype.isOnce = function () {
              return this.once;
            }),
            (c.prototype.clear = function () {}));
          var a = c;
          function c(e, t) {
            (void 0 === t && (t = !1), (this.eventListener = e), (this.once = t));
          }
          (i(f, (u = a)),
            (f.prototype.shouldFireEvent = function () {
              return !this.rateLimitTimout.isActive();
            }),
            (f.prototype.fireSuper = function (e, t) {
              u.prototype.fire.call(this, e, t);
            }),
            (f.prototype.fire = function (e, t) {
              this.rateLimitingEventListener(e, t);
            }),
            (f.prototype.clear = function () {
              (u.prototype.clear.call(this), this.rateLimitTimout.clear());
            }));
          var u,
            p = f;
          function f(e, t) {
            function n() {
              o.rateLimitTimout.start();
            }
            var o = u.call(this, e) || this;
            o.rateMs = t;
            return (
              (o.rateLimitTimout = new r.Timeout(o.rateMs, function () {
                o.lastSeenEvent &&
                  (o.fireSuper(o.lastSeenEvent.sender, o.lastSeenEvent.args), n(), (o.lastSeenEvent = void 0));
              })),
              (o.rateLimitingEventListener = function (e, t) {
                o.shouldFireEvent() ? (o.fireSuper(e, t), n()) : (o.lastSeenEvent = { sender: e, args: t });
              }),
              o
            );
          }
        },
        { './arrayutils': 1, './timeout': 110 },
      ],
      84: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }), (n.FocusVisibilityTracker = void 0));
          var o = 'bmpui-focus-visible';
          function i(e) {
            var n = this;
            ((this.bitmovinUiPrefix = e),
              (this.lastInteractionWasKeyboard = !0),
              (this.onKeyDown = function (e) {
                e.metaKey || e.altKey || e.ctrlKey || (n.lastInteractionWasKeyboard = !0);
              }),
              (this.onMouseOrPointerOrTouch = function () {
                return (n.lastInteractionWasKeyboard = !1);
              }),
              (this.onFocus = function (e) {
                var t,
                  e = e.target;
                n.lastInteractionWasKeyboard &&
                  r(e) &&
                  ((t = n.bitmovinUiPrefix), 0 === e.id.indexOf(t)) &&
                  !e.classList.contains(o) &&
                  e.classList.add(o);
              }),
              (this.onBlur = function (e) {
                e = e.target;
                r(e) && e.classList.remove(o);
              }),
              (this.eventHandlerMap = {
                mousedown: this.onMouseOrPointerOrTouch,
                pointerdown: this.onMouseOrPointerOrTouch,
                touchstart: this.onMouseOrPointerOrTouch,
                keydown: this.onKeyDown,
                focus: this.onFocus,
                blur: this.onBlur,
              }),
              this.registerEventListeners());
          }
          function r(e) {
            return e instanceof HTMLElement && e.classList instanceof DOMTokenList;
          }
          ((i.prototype.registerEventListeners = function () {
            for (var e in this.eventHandlerMap) document.addEventListener(e, this.eventHandlerMap[e], !0);
          }),
            (i.prototype.unregisterEventListeners = function () {
              for (var e in this.eventHandlerMap) document.removeEventListener(e, this.eventHandlerMap[e], !0);
            }),
            (i.prototype.release = function () {
              this.unregisterEventListeners();
            }),
            (n.FocusVisibilityTracker = i));
        },
        {},
      ],
      85: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.GroupPlaybackSuspensionReason = void 0),
            ((n.GroupPlaybackSuspensionReason = {}).UserIsScrubbing = 'userIsScrubbing'));
        },
        {},
      ],
      86: [
        function (e, t, n) {
          var o;
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.Guid = void 0),
            (n = n.Guid = {}),
            (o = 1),
            (n.next = function () {
              return o++;
            }));
        },
        {},
      ],
      87: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }), (n.ImageLoader = void 0));
          var r = e('./dom');
          function o() {
            this.state = {};
          }
          ((o.prototype.load = function (e, t) {
            var n,
              o,
              i = this;
            this.state[e]
              ? (((n = this.state[e]).loadedCallback = t), n.loaded && this.callLoadedCallback(n))
              : ((o = { url: e, image: new r.DOM('img', {}), loadedCallback: t, loaded: !1, width: 0, height: 0 }),
                (this.state[e] = o).image.on('load', function () {
                  ((o.loaded = !0),
                    (o.width = o.image.get(0).width),
                    (o.height = o.image.get(0).height),
                    i.callLoadedCallback(o));
                }),
                o.image.attr('src', o.url));
          }),
            (o.prototype.callLoadedCallback = function (e) {
              e.loadedCallback(e.url, e.width, e.height);
            }),
            (n.ImageLoader = o));
        },
        { './dom': 81 },
      ],
      88: [
        function (e, t, r) {
          var s =
              (this && this.__assign) ||
              function () {
                return (s =
                  Object.assign ||
                  function (e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                      for (var i in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e;
                  }).apply(this, arguments);
              },
            n =
              (this && this.__importDefault) ||
              function (e) {
                return e && e.__esModule ? e : { default: e };
              },
            o =
              (Object.defineProperty(r, '__esModule', { value: !0 }),
              (r.i18n = r.defaultVocabularies = void 0),
              n(e('./languages/de.json'))),
            i = n(e('./languages/en.json')),
            a = n(e('./languages/es.json')),
            n = n(e('./languages/ca.json')),
            l =
              ((r.defaultVocabularies = { en: i.default, de: o.default, es: a.default, ca: n.default }),
              { language: 'ca', vocabularies: r.defaultVocabularies }),
            e =
              ((c.prototype.setConfig = function (e) {
                var e = s(s({}, l), e),
                  t = 'auto' === e.language,
                  n = this.mergeVocabulariesWithDefaultVocabularies(e.vocabularies);
                (this.initializeLanguage(e.language, t, n), this.initializeVocabulary(n));
              }),
              (c.containsLanguage = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
              }),
              (c.prototype.mergeVocabulariesWithDefaultVocabularies = function (o) {
                void 0 === o && (o = {});
                var i = s(s({}, r.defaultVocabularies), o);
                return Object.keys(i).reduce(function (e, t) {
                  var n = i[t];
                  return (
                    c.containsLanguage(r.defaultVocabularies, t) &&
                      c.containsLanguage(o, t) &&
                      (n = s(s({}, r.defaultVocabularies[t]), o[t])),
                    s(s({}, e), (((e = {})[t] = n), e))
                  );
                }, {});
              }),
              (c.prototype.initializeLanguage = function (e, t, n) {
                if (t) {
                  t = window.navigator.language;
                  if (c.containsLanguage(n, t)) return void (this.language = t);
                  t = t.slice(0, 2);
                  if (c.containsLanguage(n, t)) return void (this.language = t);
                }
                this.language = e;
              }),
              (c.prototype.initializeVocabulary = function (n) {
                this.vocabulary = ['en', this.language].reduce(function (e, t) {
                  return s(s({}, e), n[t] || {});
                }, {});
              }),
              (c.prototype.replaceVariableWithPlaceholderIfExists = function (e, o) {
                var t = e.match(new RegExp('{[a-zA-Z0-9]+}', 'g'));
                return t && 0 !== t.length
                  ? t
                      .map(function (e) {
                        return { match: e, key: e.slice(1, -1) };
                      })
                      .reduce(function (e, t) {
                        var n = t.key,
                          t = t.match;
                        return Object.prototype.hasOwnProperty.call(o, n) ? e.replace(t, String(o[n])) : e;
                      }, e)
                  : e;
              }),
              (c.prototype.getLocalizer = function (t, n) {
                var o = this;
                return function () {
                  var e;
                  return null == t
                    ? ''
                    : (null == (e = o.vocabulary[t]) && (e = t),
                      null != n ? o.replaceVariableWithPlaceholderIfExists(e, n) : e);
                };
              }),
              (c.prototype.performLocalization = function (e) {
                return 'function' == typeof e ? e() : e;
              }),
              c);
          function c(e) {
            this.setConfig(e);
          }
          r.i18n = new e(l);
        },
        { './languages/ca.json': 89, './languages/de.json': 90, './languages/en.json': 91, './languages/es.json': 92 },
      ],
      89: [
        function (e, t, n) {
          t.exports = {
            'settings.video.quality': 'Qualitat del vídeo',
            'settings.audio.quality': 'Qualitat de l’àudio',
            'settings.audio.track': 'Pista d’àudio',
            'settings.audio.mute': 'Mute',
            'settings.audio.volume': 'Volume',
            'settings.subtitles.window.color': 'Color de la finestra',
            'settings.subtitles.window.opacity': 'Opacitat de la finestra',
            'settings.subtitles': 'Subtítols',
            'settings.subtitles.font.color': 'Color del text',
            'settings.subtitles.font.opacity': 'Opacitat del text',
            'settings.subtitles.background.color': 'Color de fons',
            'settings.subtitles.background.opacity': 'Opacitat del fons',
            'colors.white': 'blanc',
            'colors.black': 'negre',
            'colors.red': 'vermell',
            'colors.green': 'verd',
            'colors.blue': 'blau',
            'colors.cyan': 'cian',
            'colors.yellow': 'groc',
            'colors.magenta': 'magenta',
            percent: '{value}%',
            'settings.subtitles.font.size': 'Mida del text',
            'settings.subtitles.characterEdge': 'Contorn del text',
            'settings.subtitles.characterEdge.raised': 'en relleu',
            'settings.subtitles.characterEdge.depressed': 'enfonsada',
            'settings.subtitles.characterEdge.uniform': 'uniforme',
            'settings.subtitles.characterEdge.dropshadowed': 'ombra projectada',
            'settings.subtitles.font.family': 'Família del text',
            'settings.subtitles.font.family.monospacedserif': 'monospaced serif',
            'settings.subtitles.font.family.proportionalserif': 'proportional serif',
            'settings.subtitles.font.family.monospacedsansserif': 'monospaced sans serif',
            'settings.subtitles.font.family.proportionalsansserif': 'proportional sans serif',
            'settings.subtitles.font.family.casual': 'casual',
            'settings.subtitles.font.family.cursive': 'cursive',
            'settings.subtitles.font.family.smallcapital': 'small capital',
            'settings.time.hours': 'Hores',
            'settings.time.minutes': 'Minuts',
            'settings.time.seconds': 'Segons',
            'ads.remainingTime': 'Aquest anunci acabarà en {remainingTime} segons.',
            settings: 'Configuració',
            fullscreen: 'Pantalla completa',
            speed: 'Velocitat',
            playPause: 'Reprodueix/Pausa',
            play: 'Reprodueix',
            pause: 'Pausa',
            open: 'Obre',
            close: 'Tanca',
            pictureInPicture: 'Finestra flotant de vídeo',
            appleAirplay: 'Apple AirPlay',
            googleCast: 'Google Cast',
            vr: 'RV',
            off: 'Desactivat',
            auto: 'Automàtic',
            back: 'Enrere',
            reset: 'Neteja',
            replay: 'Tornar a reproduir',
            normal: 'Normal',
            default: 'Per defecte',
            live: 'En directe',
            'subtitle.example': 'exemple de subtítol',
            'subtitle.select': 'Tria subtítol',
            playingOn: 'S’està reproduint a <strong>{castDeviceName}</strong>',
            connectingTo: 'S’està connectant a <strong>{castDeviceName}</strong>...',
            watermarkLink: "Enllaç a l'inici",
            controlBar: 'Controls del reproductor de vídeo',
            player: 'Reproductor de vídeo',
            seekBar: 'Línia de temps del vídeo',
            'seekBar.value': 'Valor',
            'seekBar.timeshift': 'Desplaçament temporal',
            'seekBar.durationText': 'de',
          };
        },
        {},
      ],
      90: [
        function (e, t, n) {
          t.exports = {
            'settings.video.quality': 'Videoqualität',
            'settings.audio.quality': 'Audioqualität',
            'settings.audio.track': 'Audiospur',
            speed: 'Geschwindigkeit',
            play: 'Abspielen',
            pause: 'Pause',
            playPause: 'Abspielen/Pause',
            open: 'öffnen',
            close: 'Schließen',
            'settings.audio.mute': 'Stummschaltung',
            'settings.audio.volume': 'Lautstärke',
            pictureInPicture: 'Bild im Bild',
            appleAirplay: 'Apple AirPlay',
            googleCast: 'Google Cast',
            vr: 'VR',
            settings: 'Einstellungen',
            fullscreen: 'Vollbild',
            off: 'aus',
            'settings.subtitles': 'Untertitel',
            'settings.subtitles.font.size': 'Größe',
            'settings.subtitles.font.family': 'Schriftart',
            'settings.subtitles.font.color': 'Farbe',
            'settings.subtitles.font.opacity': 'Deckkraft',
            'settings.subtitles.characterEdge': 'Ränder',
            'settings.subtitles.background.color': 'Hintergrundfarbe',
            'settings.subtitles.background.opacity': 'Hintergrunddeckkraft',
            'settings.subtitles.window.color': 'Hintergrundfarbe',
            'settings.subtitles.window.opacity': 'Hintergrunddeckkraft',
            'settings.time.hours': 'Stunden',
            'settings.time.minutes': 'Minuten',
            'settings.time.seconds': 'Sekunden',
            back: 'Zurück',
            reset: 'Zurücksetzen',
            replay: 'Wiederholen',
            'ads.remainingTime': 'Diese Anzeige endet in {remainingTime} Sekunden',
            default: 'standard',
            'colors.white': 'weiß',
            'colors.black': 'schwarz',
            'colors.red': 'rot',
            'colors.green': 'grün',
            'colors.blue': 'blau',
            'colors.yellow': 'gelb',
            'subtitle.example': 'Beispiel Untertitel',
            'subtitle.select': 'Untertitel auswählen',
            playingOn: 'Spielt auf <strong>{castDeviceName}</strong>',
            connectingTo: 'Verbindung mit <strong>{castDeviceName}</strong> wird hergestellt...',
            watermarkLink: 'Link zum Homepage',
            controlBar: 'Videoplayer Kontrollen',
            player: 'Video player',
            seekBar: 'Video-Timeline',
            'seekBar.value': 'Wert',
            'seekBar.timeshift': 'Timeshift',
            'seekBar.durationText': 'aus',
          };
        },
        {},
      ],
      91: [
        function (e, t, n) {
          t.exports = {
            'settings.video.quality': 'Video Quality',
            'settings.audio.quality': 'Audio Quality',
            'settings.audio.track': 'Audio Track',
            'settings.audio.mute': 'Mute',
            'settings.audio.volume': 'Volume',
            'settings.subtitles.window.color': 'Window color',
            'settings.subtitles.window.opacity': 'Window opacity',
            'settings.subtitles': 'Subtitles',
            'settings.subtitles.font.color': 'Font color',
            'settings.subtitles.font.opacity': 'Font opacity',
            'settings.subtitles.background.color': 'Background color',
            'settings.subtitles.background.opacity': 'Background opacity',
            'colors.white': 'white',
            'colors.black': 'black',
            'colors.red': 'red',
            'colors.green': 'green',
            'colors.blue': 'blue',
            'colors.cyan': 'cyan',
            'colors.yellow': 'yellow',
            'colors.magenta': 'magenta',
            percent: '{value}%',
            'settings.subtitles.font.size': 'Font size',
            'settings.subtitles.characterEdge': 'Character edge',
            'settings.subtitles.characterEdge.raised': 'raised',
            'settings.subtitles.characterEdge.depressed': 'depressed',
            'settings.subtitles.characterEdge.uniform': 'uniform',
            'settings.subtitles.characterEdge.dropshadowed': 'drop shadowed',
            'settings.subtitles.font.family': 'Font family',
            'settings.subtitles.font.family.monospacedserif': 'monospaced serif',
            'settings.subtitles.font.family.proportionalserif': 'proportional serif',
            'settings.subtitles.font.family.monospacedsansserif': 'monospaced sans serif',
            'settings.subtitles.font.family.proportionalsansserif': 'proportional sans serif',
            'settings.subtitles.font.family.casual': 'casual',
            'settings.subtitles.font.family.cursive': 'cursive',
            'settings.subtitles.font.family.smallcapital': 'small capital',
            'settings.time.hours': 'Hours',
            'settings.time.minutes': 'Minutes',
            'settings.time.seconds': 'Seconds',
            'ads.remainingTime': 'This ad will end in {remainingTime} seconds.',
            settings: 'Settings',
            fullscreen: 'Fullscreen',
            speed: 'Speed',
            playPause: 'Play/Pause',
            play: 'Play',
            pause: 'Pause',
            open: 'open',
            close: 'Close',
            pictureInPicture: 'Picture-in-Picture',
            appleAirplay: 'Apple AirPlay',
            googleCast: 'Google Cast',
            vr: 'VR',
            off: 'off',
            auto: 'auto',
            back: 'Back',
            reset: 'Reset',
            replay: 'Replay',
            normal: 'normal',
            default: 'default',
            live: 'Live',
            'subtitle.example': 'example subtitle',
            'subtitle.select': 'Select subtitle',
            playingOn: 'Playing on <strong>{castDeviceName}</strong>',
            connectingTo: 'Connecting to <strong>{castDeviceName}</strong>...',
            watermarkLink: 'Link to Homepage',
            controlBar: 'Video player controls',
            player: 'Video player',
            seekBar: 'Video timeline',
            'seekBar.value': 'Value',
            'seekBar.timeshift': 'Timeshift',
            'seekBar.durationText': 'out of',
          };
        },
        {},
      ],
      92: [
        function (e, t, n) {
          t.exports = {
            'settings.video.quality': 'Calidad de Video',
            'settings.audio.quality': 'Calidad de Audio',
            'settings.audio.track': 'Pista de Audio',
            'settings.audio.mute': 'Silencio',
            'settings.audio.volume': 'Volumen',
            'settings.subtitles.window.color': 'color de Ventana',
            'settings.subtitles.window.opacity': 'opacidad de Ventana',
            'settings.subtitles': 'Subtítulos',
            'settings.subtitles.font.color': 'color de Fuente',
            'settings.subtitles.font.opacity': 'opacidad de Fuente',
            'settings.subtitles.background.color': 'color de Fondo',
            'settings.subtitles.background.opacity': 'opacidad de Fondo',
            'colors.white': 'blanco',
            'colors.black': 'negro',
            'colors.red': 'rojo',
            'colors.green': 'verde',
            'colors.blue': 'azul',
            'colors.cyan': 'cian',
            'colors.yellow': 'amarillo',
            'colors.magenta': 'magenta',
            percent: '{value}%',
            'settings.subtitles.font.size': 'tamaño de Fuente',
            'settings.subtitles.characterEdge': 'borde del Caracter',
            'settings.subtitles.characterEdge.raised': 'alzado',
            'settings.subtitles.characterEdge.depressed': 'discreto',
            'settings.subtitles.characterEdge.uniform': 'uniforme',
            'settings.subtitles.characterEdge.dropshadowed': 'sombreado',
            'settings.subtitles.font.family': 'tipo de Fuente',
            'settings.subtitles.font.family.monospacedserif': 'monospaced serif',
            'settings.subtitles.font.family.proportionalserif': 'proportional serif',
            'settings.subtitles.font.family.monospacedsansserif': 'monospaced sans serif',
            'settings.subtitles.font.family.proportionalsansserif': 'proportional sans serif',
            'settings.subtitles.font.family.casual': 'casual',
            'settings.subtitles.font.family.cursive': 'cursiva',
            'settings.subtitles.font.family.smallcapital': 'small capital',
            'settings.time.hours': 'Horas',
            'settings.time.minutes': 'Minutos',
            'settings.time.seconds': 'Segundos',
            'ads.remainingTime': 'Este anuncio acabará en {remainingTime} segundos.',
            settings: 'Configuración',
            fullscreen: 'Pantalla Completa',
            speed: 'Velocidad',
            playPause: 'Reproducir/Pausa',
            play: 'Reproducir',
            pause: 'Pausa',
            open: 'Abrir',
            close: 'Cerrar',
            pictureInPicture: 'Imagen en Imagen',
            appleAirplay: 'Apple AirPlay',
            googleCast: 'Google Cast',
            vr: 'VR',
            off: 'off',
            auto: 'auto',
            back: 'Atrás',
            reset: 'Reiniciar',
            replay: 'Rebobinar',
            normal: 'normal',
            default: 'predeterminado',
            live: 'Directo',
            'subtitle.example': 'Ejemplo de Subtítulo',
            'subtitle.select': 'Seleccionar subtítulo',
            playingOn: 'Reproduciendo en <strong>{castDeviceName}</strong>',
            connectingTo: 'Conectando a <strong>{castDeviceName}</strong>...',
            watermarkLink: 'Enlace al inicio',
            controlBar: 'Controles del Reproductor',
            player: 'Reproductor de Video',
            seekBar: 'Línea de Tiempo',
            'seekBar.value': 'posición',
            'seekBar.timeshift': 'cambio de posición',
            'seekBar.durationText': 'de',
          };
        },
        {},
      ],
      93: [
        function (e, D, t) {
          (Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.VolumeControlButton =
              t.TitleBar =
              t.SubtitleSelectBox =
              t.SubtitleOverlay =
              t.SeekBarLabel =
              t.RecommendationOverlay =
              t.ErrorMessageOverlay =
              t.Component =
              t.CastToggleButton =
              t.CastStatusOverlay =
              t.AudioTrackSelectBox =
              t.AudioQualitySelectBox =
              t.Label =
              t.Container =
              t.UIContainer =
              t.Watermark =
              t.VRToggleButton =
              t.VolumeToggleButton =
              t.VideoQualitySelectBox =
              t.ToggleButton =
              t.SettingsToggleButton =
              t.SettingsPanel =
              t.ItemSelectionList =
              t.SelectBox =
              t.SeekBar =
              t.PlaybackToggleButton =
              t.PlaybackTimeLabelMode =
              t.PlaybackTimeLabel =
              t.HugePlaybackToggleButton =
              t.FullscreenToggleButton =
              t.ControlBar =
              t.Button =
              t.ListOrientation =
              t.ListNavigationGroup =
              t.RootNavigationGroup =
              t.NavigationGroup =
              t.SpatialNavigation =
              t.i18n =
              t.ErrorUtils =
              t.StorageUtils =
              t.BrowserUtils =
              t.UIUtils =
              t.PlayerUtils =
              t.StringUtils =
              t.ArrayUtils =
              t.DemoFactory =
              t.UIFactory =
              t.UIInstanceManager =
              t.UIManager =
              t.version =
                void 0),
            (t.BackButton =
              t.ReplayButton =
              t.SettingsPanelItem =
              t.SubtitleSettingsPanelPage =
              t.SettingsPanelPageOpenButton =
              t.SettingsPanelPageBackButton =
              t.SettingsPanelPage =
              t.AudioTrackListBox =
              t.SubtitleListBox =
              t.ListBox =
              t.SubtitleSettingsResetButton =
              t.WindowOpacitySelectBox =
              t.WindowColorSelectBox =
              t.SubtitleSettingsLabel =
              t.SubtitleSettingSelectBox =
              t.FontSizeSelectBox =
              t.FontOpacitySelectBox =
              t.FontFamilySelectBox =
              t.FontColorSelectBox =
              t.CharacterEdgeSelectBox =
              t.BackgroundOpacitySelectBox =
              t.BackgroundColorSelectBox =
              t.Spacer =
              t.PictureInPictureToggleButton =
              t.VolumeSlider =
              t.AirPlayToggleButton =
              t.MetadataLabelContent =
              t.MetadataLabel =
              t.CloseButton =
              t.PlaybackToggleOverlay =
              t.CastUIContainer =
              t.PosterOverlay =
              t.BufferingOverlay =
              t.HugeReplayButton =
              t.PlaybackSpeedSelectBox =
              t.AdClickOverlay =
              t.AdMessageLabel =
              t.AdSkipButton =
              t.ClickOverlay =
                void 0),
            (t.version = '0.1.0'));
          var n = e('./uimanager'),
            o =
              (Object.defineProperty(t, 'UIManager', {
                enumerable: !0,
                get: function () {
                  return n.UIManager;
                },
              }),
              Object.defineProperty(t, 'UIInstanceManager', {
                enumerable: !0,
                get: function () {
                  return n.UIInstanceManager;
                },
              }),
              e('./uifactory')),
            i =
              (Object.defineProperty(t, 'UIFactory', {
                enumerable: !0,
                get: function () {
                  return o.UIFactory;
                },
              }),
              e('./demofactory')),
            r =
              (Object.defineProperty(t, 'DemoFactory', {
                enumerable: !0,
                get: function () {
                  return i.DemoFactory;
                },
              }),
              e('./arrayutils')),
            s =
              (Object.defineProperty(t, 'ArrayUtils', {
                enumerable: !0,
                get: function () {
                  return r.ArrayUtils;
                },
              }),
              e('./stringutils')),
            a =
              (Object.defineProperty(t, 'StringUtils', {
                enumerable: !0,
                get: function () {
                  return s.StringUtils;
                },
              }),
              e('./playerutils')),
            l =
              (Object.defineProperty(t, 'PlayerUtils', {
                enumerable: !0,
                get: function () {
                  return a.PlayerUtils;
                },
              }),
              e('./uiutils')),
            c =
              (Object.defineProperty(t, 'UIUtils', {
                enumerable: !0,
                get: function () {
                  return l.UIUtils;
                },
              }),
              e('./browserutils')),
            u =
              (Object.defineProperty(t, 'BrowserUtils', {
                enumerable: !0,
                get: function () {
                  return c.BrowserUtils;
                },
              }),
              e('./storageutils')),
            p =
              (Object.defineProperty(t, 'StorageUtils', {
                enumerable: !0,
                get: function () {
                  return u.StorageUtils;
                },
              }),
              e('./errorutils')),
            f =
              (Object.defineProperty(t, 'ErrorUtils', {
                enumerable: !0,
                get: function () {
                  return p.ErrorUtils;
                },
              }),
              e('./localization/i18n')),
            g =
              (Object.defineProperty(t, 'i18n', {
                enumerable: !0,
                get: function () {
                  return f.i18n;
                },
              }),
              e('./spatialnavigation/spatialnavigation')),
            d =
              (Object.defineProperty(t, 'SpatialNavigation', {
                enumerable: !0,
                get: function () {
                  return g.SpatialNavigation;
                },
              }),
              e('./spatialnavigation/navigationgroup')),
            h =
              (Object.defineProperty(t, 'NavigationGroup', {
                enumerable: !0,
                get: function () {
                  return d.NavigationGroup;
                },
              }),
              e('./spatialnavigation/rootnavigationgroup')),
            y =
              (Object.defineProperty(t, 'RootNavigationGroup', {
                enumerable: !0,
                get: function () {
                  return h.RootNavigationGroup;
                },
              }),
              e('./spatialnavigation/ListNavigationGroup')),
            m =
              (Object.defineProperty(t, 'ListNavigationGroup', {
                enumerable: !0,
                get: function () {
                  return y.ListNavigationGroup;
                },
              }),
              Object.defineProperty(t, 'ListOrientation', {
                enumerable: !0,
                get: function () {
                  return y.ListOrientation;
                },
              }),
              e('./components/button')),
            b =
              (Object.defineProperty(t, 'Button', {
                enumerable: !0,
                get: function () {
                  return m.Button;
                },
              }),
              e('./components/controlbar')),
            v =
              (Object.defineProperty(t, 'ControlBar', {
                enumerable: !0,
                get: function () {
                  return b.ControlBar;
                },
              }),
              e('./components/fullscreentogglebutton')),
            P =
              (Object.defineProperty(t, 'FullscreenToggleButton', {
                enumerable: !0,
                get: function () {
                  return v.FullscreenToggleButton;
                },
              }),
              e('./components/hugeplaybacktogglebutton')),
            C =
              (Object.defineProperty(t, 'HugePlaybackToggleButton', {
                enumerable: !0,
                get: function () {
                  return P.HugePlaybackToggleButton;
                },
              }),
              e('./components/playbacktimelabel')),
            S =
              (Object.defineProperty(t, 'PlaybackTimeLabel', {
                enumerable: !0,
                get: function () {
                  return C.PlaybackTimeLabel;
                },
              }),
              Object.defineProperty(t, 'PlaybackTimeLabelMode', {
                enumerable: !0,
                get: function () {
                  return C.PlaybackTimeLabelMode;
                },
              }),
              e('./components/playbacktogglebutton')),
            w =
              (Object.defineProperty(t, 'PlaybackToggleButton', {
                enumerable: !0,
                get: function () {
                  return S.PlaybackToggleButton;
                },
              }),
              e('./components/seekbar')),
            _ =
              (Object.defineProperty(t, 'SeekBar', {
                enumerable: !0,
                get: function () {
                  return w.SeekBar;
                },
              }),
              e('./components/selectbox')),
            E =
              (Object.defineProperty(t, 'SelectBox', {
                enumerable: !0,
                get: function () {
                  return _.SelectBox;
                },
              }),
              e('./components/itemselectionlist')),
            O =
              (Object.defineProperty(t, 'ItemSelectionList', {
                enumerable: !0,
                get: function () {
                  return E.ItemSelectionList;
                },
              }),
              e('./components/settingspanel')),
            x =
              (Object.defineProperty(t, 'SettingsPanel', {
                enumerable: !0,
                get: function () {
                  return O.SettingsPanel;
                },
              }),
              e('./components/settingstogglebutton')),
            k =
              (Object.defineProperty(t, 'SettingsToggleButton', {
                enumerable: !0,
                get: function () {
                  return x.SettingsToggleButton;
                },
              }),
              e('./components/togglebutton')),
            T =
              (Object.defineProperty(t, 'ToggleButton', {
                enumerable: !0,
                get: function () {
                  return k.ToggleButton;
                },
              }),
              e('./components/videoqualityselectbox')),
            M =
              (Object.defineProperty(t, 'VideoQualitySelectBox', {
                enumerable: !0,
                get: function () {
                  return T.VideoQualitySelectBox;
                },
              }),
              e('./components/volumetogglebutton')),
            L =
              (Object.defineProperty(t, 'VolumeToggleButton', {
                enumerable: !0,
                get: function () {
                  return M.VolumeToggleButton;
                },
              }),
              e('./components/vrtogglebutton')),
            A =
              (Object.defineProperty(t, 'VRToggleButton', {
                enumerable: !0,
                get: function () {
                  return L.VRToggleButton;
                },
              }),
              e('./components/watermark')),
            B =
              (Object.defineProperty(t, 'Watermark', {
                enumerable: !0,
                get: function () {
                  return A.Watermark;
                },
              }),
              e('./components/uicontainer')),
            I =
              (Object.defineProperty(t, 'UIContainer', {
                enumerable: !0,
                get: function () {
                  return B.UIContainer;
                },
              }),
              e('./components/container')),
            U =
              (Object.defineProperty(t, 'Container', {
                enumerable: !0,
                get: function () {
                  return I.Container;
                },
              }),
              e('./components/label')),
            z =
              (Object.defineProperty(t, 'Label', {
                enumerable: !0,
                get: function () {
                  return U.Label;
                },
              }),
              e('./components/audioqualityselectbox')),
            R =
              (Object.defineProperty(t, 'AudioQualitySelectBox', {
                enumerable: !0,
                get: function () {
                  return z.AudioQualitySelectBox;
                },
              }),
              e('./components/audiotrackselectbox')),
            V =
              (Object.defineProperty(t, 'AudioTrackSelectBox', {
                enumerable: !0,
                get: function () {
                  return R.AudioTrackSelectBox;
                },
              }),
              e('./components/caststatusoverlay')),
            H =
              (Object.defineProperty(t, 'CastStatusOverlay', {
                enumerable: !0,
                get: function () {
                  return V.CastStatusOverlay;
                },
              }),
              e('./components/casttogglebutton')),
            F =
              (Object.defineProperty(t, 'CastToggleButton', {
                enumerable: !0,
                get: function () {
                  return H.CastToggleButton;
                },
              }),
              e('./components/component')),
            N =
              (Object.defineProperty(t, 'Component', {
                enumerable: !0,
                get: function () {
                  return F.Component;
                },
              }),
              e('./components/errormessageoverlay')),
            W =
              (Object.defineProperty(t, 'ErrorMessageOverlay', {
                enumerable: !0,
                get: function () {
                  return N.ErrorMessageOverlay;
                },
              }),
              e('./components/recommendationoverlay')),
            G =
              (Object.defineProperty(t, 'RecommendationOverlay', {
                enumerable: !0,
                get: function () {
                  return W.RecommendationOverlay;
                },
              }),
              e('./components/seekbarlabel')),
            K =
              (Object.defineProperty(t, 'SeekBarLabel', {
                enumerable: !0,
                get: function () {
                  return G.SeekBarLabel;
                },
              }),
              e('./components/subtitleoverlay')),
            q =
              (Object.defineProperty(t, 'SubtitleOverlay', {
                enumerable: !0,
                get: function () {
                  return K.SubtitleOverlay;
                },
              }),
              e('./components/subtitleselectbox')),
            Q =
              (Object.defineProperty(t, 'SubtitleSelectBox', {
                enumerable: !0,
                get: function () {
                  return q.SubtitleSelectBox;
                },
              }),
              e('./components/titlebar')),
            Y =
              (Object.defineProperty(t, 'TitleBar', {
                enumerable: !0,
                get: function () {
                  return Q.TitleBar;
                },
              }),
              e('./components/volumecontrolbutton')),
            X =
              (Object.defineProperty(t, 'VolumeControlButton', {
                enumerable: !0,
                get: function () {
                  return Y.VolumeControlButton;
                },
              }),
              e('./components/clickoverlay')),
            J =
              (Object.defineProperty(t, 'ClickOverlay', {
                enumerable: !0,
                get: function () {
                  return X.ClickOverlay;
                },
              }),
              e('./components/adskipbutton')),
            Z =
              (Object.defineProperty(t, 'AdSkipButton', {
                enumerable: !0,
                get: function () {
                  return J.AdSkipButton;
                },
              }),
              e('./components/admessagelabel')),
            $ =
              (Object.defineProperty(t, 'AdMessageLabel', {
                enumerable: !0,
                get: function () {
                  return Z.AdMessageLabel;
                },
              }),
              e('./components/adclickoverlay')),
            ee =
              (Object.defineProperty(t, 'AdClickOverlay', {
                enumerable: !0,
                get: function () {
                  return $.AdClickOverlay;
                },
              }),
              e('./components/playbackspeedselectbox')),
            te =
              (Object.defineProperty(t, 'PlaybackSpeedSelectBox', {
                enumerable: !0,
                get: function () {
                  return ee.PlaybackSpeedSelectBox;
                },
              }),
              e('./components/hugereplaybutton')),
            ne =
              (Object.defineProperty(t, 'HugeReplayButton', {
                enumerable: !0,
                get: function () {
                  return te.HugeReplayButton;
                },
              }),
              e('./components/bufferingoverlay')),
            oe =
              (Object.defineProperty(t, 'BufferingOverlay', {
                enumerable: !0,
                get: function () {
                  return ne.BufferingOverlay;
                },
              }),
              e('./components/posteroverlay')),
            ie =
              (Object.defineProperty(t, 'PosterOverlay', {
                enumerable: !0,
                get: function () {
                  return oe.PosterOverlay;
                },
              }),
              e('./components/castuicontainer')),
            re =
              (Object.defineProperty(t, 'CastUIContainer', {
                enumerable: !0,
                get: function () {
                  return ie.CastUIContainer;
                },
              }),
              e('./components/playbacktoggleoverlay')),
            se =
              (Object.defineProperty(t, 'PlaybackToggleOverlay', {
                enumerable: !0,
                get: function () {
                  return re.PlaybackToggleOverlay;
                },
              }),
              e('./components/closebutton')),
            j =
              (Object.defineProperty(t, 'CloseButton', {
                enumerable: !0,
                get: function () {
                  return se.CloseButton;
                },
              }),
              e('./components/metadatalabel')),
            ae =
              (Object.defineProperty(t, 'MetadataLabel', {
                enumerable: !0,
                get: function () {
                  return j.MetadataLabel;
                },
              }),
              Object.defineProperty(t, 'MetadataLabelContent', {
                enumerable: !0,
                get: function () {
                  return j.MetadataLabelContent;
                },
              }),
              e('./components/airplaytogglebutton')),
            le =
              (Object.defineProperty(t, 'AirPlayToggleButton', {
                enumerable: !0,
                get: function () {
                  return ae.AirPlayToggleButton;
                },
              }),
              e('./components/volumeslider')),
            ce =
              (Object.defineProperty(t, 'VolumeSlider', {
                enumerable: !0,
                get: function () {
                  return le.VolumeSlider;
                },
              }),
              e('./components/pictureinpicturetogglebutton')),
            ue =
              (Object.defineProperty(t, 'PictureInPictureToggleButton', {
                enumerable: !0,
                get: function () {
                  return ce.PictureInPictureToggleButton;
                },
              }),
              e('./components/spacer')),
            pe =
              (Object.defineProperty(t, 'Spacer', {
                enumerable: !0,
                get: function () {
                  return ue.Spacer;
                },
              }),
              e('./components/subtitlesettings/backgroundcolorselectbox')),
            fe =
              (Object.defineProperty(t, 'BackgroundColorSelectBox', {
                enumerable: !0,
                get: function () {
                  return pe.BackgroundColorSelectBox;
                },
              }),
              e('./components/subtitlesettings/backgroundopacityselectbox')),
            ge =
              (Object.defineProperty(t, 'BackgroundOpacitySelectBox', {
                enumerable: !0,
                get: function () {
                  return fe.BackgroundOpacitySelectBox;
                },
              }),
              e('./components/subtitlesettings/characteredgeselectbox')),
            de =
              (Object.defineProperty(t, 'CharacterEdgeSelectBox', {
                enumerable: !0,
                get: function () {
                  return ge.CharacterEdgeSelectBox;
                },
              }),
              e('./components/subtitlesettings/fontcolorselectbox')),
            he =
              (Object.defineProperty(t, 'FontColorSelectBox', {
                enumerable: !0,
                get: function () {
                  return de.FontColorSelectBox;
                },
              }),
              e('./components/subtitlesettings/fontfamilyselectbox')),
            ye =
              (Object.defineProperty(t, 'FontFamilySelectBox', {
                enumerable: !0,
                get: function () {
                  return he.FontFamilySelectBox;
                },
              }),
              e('./components/subtitlesettings/fontopacityselectbox')),
            me =
              (Object.defineProperty(t, 'FontOpacitySelectBox', {
                enumerable: !0,
                get: function () {
                  return ye.FontOpacitySelectBox;
                },
              }),
              e('./components/subtitlesettings/fontsizeselectbox')),
            be =
              (Object.defineProperty(t, 'FontSizeSelectBox', {
                enumerable: !0,
                get: function () {
                  return me.FontSizeSelectBox;
                },
              }),
              e('./components/subtitlesettings/subtitlesettingselectbox')),
            ve =
              (Object.defineProperty(t, 'SubtitleSettingSelectBox', {
                enumerable: !0,
                get: function () {
                  return be.SubtitleSettingSelectBox;
                },
              }),
              e('./components/subtitlesettings/subtitlesettingslabel')),
            Pe =
              (Object.defineProperty(t, 'SubtitleSettingsLabel', {
                enumerable: !0,
                get: function () {
                  return ve.SubtitleSettingsLabel;
                },
              }),
              e('./components/subtitlesettings/windowcolorselectbox')),
            Ce =
              (Object.defineProperty(t, 'WindowColorSelectBox', {
                enumerable: !0,
                get: function () {
                  return Pe.WindowColorSelectBox;
                },
              }),
              e('./components/subtitlesettings/windowopacityselectbox')),
            Se =
              (Object.defineProperty(t, 'WindowOpacitySelectBox', {
                enumerable: !0,
                get: function () {
                  return Ce.WindowOpacitySelectBox;
                },
              }),
              e('./components/subtitlesettings/subtitlesettingsresetbutton')),
            we =
              (Object.defineProperty(t, 'SubtitleSettingsResetButton', {
                enumerable: !0,
                get: function () {
                  return Se.SubtitleSettingsResetButton;
                },
              }),
              e('./components/listbox')),
            _e =
              (Object.defineProperty(t, 'ListBox', {
                enumerable: !0,
                get: function () {
                  return we.ListBox;
                },
              }),
              e('./components/subtitlelistbox')),
            Ee =
              (Object.defineProperty(t, 'SubtitleListBox', {
                enumerable: !0,
                get: function () {
                  return _e.SubtitleListBox;
                },
              }),
              e('./components/audiotracklistbox')),
            Oe =
              (Object.defineProperty(t, 'AudioTrackListBox', {
                enumerable: !0,
                get: function () {
                  return Ee.AudioTrackListBox;
                },
              }),
              e('./components/settingspanelpage')),
            xe =
              (Object.defineProperty(t, 'SettingsPanelPage', {
                enumerable: !0,
                get: function () {
                  return Oe.SettingsPanelPage;
                },
              }),
              e('./components/settingspanelpagebackbutton')),
            ke =
              (Object.defineProperty(t, 'SettingsPanelPageBackButton', {
                enumerable: !0,
                get: function () {
                  return xe.SettingsPanelPageBackButton;
                },
              }),
              e('./components/settingspanelpageopenbutton')),
            Te =
              (Object.defineProperty(t, 'SettingsPanelPageOpenButton', {
                enumerable: !0,
                get: function () {
                  return ke.SettingsPanelPageOpenButton;
                },
              }),
              e('./components/subtitlesettings/subtitlesettingspanelpage')),
            Me =
              (Object.defineProperty(t, 'SubtitleSettingsPanelPage', {
                enumerable: !0,
                get: function () {
                  return Te.SubtitleSettingsPanelPage;
                },
              }),
              e('./components/settingspanelitem')),
            Le =
              (Object.defineProperty(t, 'SettingsPanelItem', {
                enumerable: !0,
                get: function () {
                  return Me.SettingsPanelItem;
                },
              }),
              e('./components/replaybutton')),
            Ae =
              (Object.defineProperty(t, 'ReplayButton', {
                enumerable: !0,
                get: function () {
                  return Le.ReplayButton;
                },
              }),
              e('./components/backbutton'));
          (Object.defineProperty(t, 'BackButton', {
            enumerable: !0,
            get: function () {
              return Ae.BackButton;
            },
          }),
            'function' != typeof Object.assign &&
              (Object.assign = function (e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                if (null == e) throw new TypeError('Cannot convert undefined or null to object');
                e = Object(e);
                for (var o = 0, i = t; o < i.length; o++) {
                  var r = i[o];
                  if (null != r) for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && (e[s] = r[s]);
                }
                return e;
              }));
        },
        {
          './arrayutils': 1,
          './browserutils': 3,
          './components/adclickoverlay': 4,
          './components/admessagelabel': 5,
          './components/adskipbutton': 6,
          './components/airplaytogglebutton': 7,
          './components/audioqualityselectbox': 8,
          './components/audiotracklistbox': 9,
          './components/audiotrackselectbox': 10,
          './components/backbutton': 11,
          './components/bufferingoverlay': 12,
          './components/button': 13,
          './components/caststatusoverlay': 14,
          './components/casttogglebutton': 15,
          './components/castuicontainer': 16,
          './components/clickoverlay': 17,
          './components/closebutton': 18,
          './components/component': 19,
          './components/container': 20,
          './components/controlbar': 21,
          './components/errormessageoverlay': 22,
          './components/fullscreentogglebutton': 23,
          './components/hugeplaybacktogglebutton': 24,
          './components/hugereplaybutton': 25,
          './components/itemselectionlist': 26,
          './components/label': 27,
          './components/listbox': 28,
          './components/metadatalabel': 30,
          './components/pictureinpicturetogglebutton': 31,
          './components/playbackspeedselectbox': 32,
          './components/playbacktimelabel': 33,
          './components/playbacktogglebutton': 34,
          './components/playbacktoggleoverlay': 35,
          './components/posteroverlay': 36,
          './components/recommendationoverlay': 37,
          './components/replaybutton': 38,
          './components/seekbar': 39,
          './components/seekbarlabel': 42,
          './components/selectbox': 43,
          './components/settingspanel': 44,
          './components/settingspanelitem': 45,
          './components/settingspanelpage': 46,
          './components/settingspanelpagebackbutton': 47,
          './components/settingspanelpageopenbutton': 49,
          './components/settingstogglebutton': 50,
          './components/spacer': 51,
          './components/subtitlelistbox': 52,
          './components/subtitleoverlay': 53,
          './components/subtitleselectbox': 54,
          './components/subtitlesettings/backgroundcolorselectbox': 55,
          './components/subtitlesettings/backgroundopacityselectbox': 56,
          './components/subtitlesettings/characteredgeselectbox': 57,
          './components/subtitlesettings/fontcolorselectbox': 58,
          './components/subtitlesettings/fontfamilyselectbox': 59,
          './components/subtitlesettings/fontopacityselectbox': 60,
          './components/subtitlesettings/fontsizeselectbox': 61,
          './components/subtitlesettings/subtitlesettingselectbox': 62,
          './components/subtitlesettings/subtitlesettingslabel': 63,
          './components/subtitlesettings/subtitlesettingspanelpage': 65,
          './components/subtitlesettings/subtitlesettingsresetbutton': 66,
          './components/subtitlesettings/windowcolorselectbox': 67,
          './components/subtitlesettings/windowopacityselectbox': 68,
          './components/titlebar': 70,
          './components/togglebutton': 71,
          './components/uicontainer': 73,
          './components/videoqualityselectbox': 74,
          './components/volumecontrolbutton': 75,
          './components/volumeslider': 76,
          './components/volumetogglebutton': 77,
          './components/vrtogglebutton': 78,
          './components/watermark': 79,
          './demofactory': 80,
          './errorutils': 82,
          './localization/i18n': 88,
          './playerutils': 95,
          './spatialnavigation/ListNavigationGroup': 96,
          './spatialnavigation/navigationgroup': 100,
          './spatialnavigation/rootnavigationgroup': 102,
          './spatialnavigation/spatialnavigation': 104,
          './storageutils': 107,
          './stringutils': 108,
          './uifactory': 111,
          './uimanager': 113,
          './uiutils': 114,
        },
      ],
      94: [
        function (e, t, n) {
          var o;
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.MobileV3PlayerEvent = void 0),
            (n.isMobileV3PlayerAPI = function (e) {
              for (var t in o)
                if (
                  Object.prototype.hasOwnProperty.call(o, t) &&
                  !Object.prototype.hasOwnProperty.call(e.exports.PlayerEvent, t)
                )
                  return !1;
              return !0;
            }),
            ((n = o || (n.MobileV3PlayerEvent = o = {})).SourceError = 'sourceerror'),
            (n.PlayerError = 'playererror'),
            (n.PlaylistTransition = 'playlisttransition'));
        },
        {},
      ],
      95: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }), (n.PlayerUtils = void 0));
          var o,
            i,
            r = e('./eventdispatcher'),
            s = e('./browserutils');
          function a(e) {
            function t() {
              n.detect();
            }
            var n = this;
            ((this.timeShiftAvailabilityChangedEvent = new r.EventDispatcher()),
              (this.player = e),
              (this.timeShiftAvailable = void 0));
            (e.on(e.exports.PlayerEvent.SourceLoaded, t), e.on(e.exports.PlayerEvent.TimeChanged, t));
          }
          function l(e, t) {
            function n() {
              o.detect();
            }
            var o = this;
            ((this.liveChangedEvent = new r.EventDispatcher()),
              (this.player = e),
              (this.uimanager = t),
              (this.live = void 0));
            (this.uimanager.getConfig().events.onUpdated.subscribe(n),
              e.on(e.exports.PlayerEvent.Play, n),
              s.BrowserUtils.isAndroid && s.BrowserUtils.isChrome && e.on(e.exports.PlayerEvent.TimeChanged, n),
              e.exports.PlayerEvent.DurationChanged && e.on(e.exports.PlayerEvent.DurationChanged, n),
              e.on(e.exports.PlayerEvent.AdBreakStarted, n),
              e.on(e.exports.PlayerEvent.AdBreakFinished, n));
          }
          ((o = n.PlayerUtils = {}),
            ((e = i = o.PlayerState || (o.PlayerState = {}))[(e.Idle = 0)] = 'Idle'),
            (e[(e.Prepared = 1)] = 'Prepared'),
            (e[(e.Playing = 2)] = 'Playing'),
            (e[(e.Paused = 3)] = 'Paused'),
            (e[(e.Finished = 4)] = 'Finished'),
            (o.isTimeShiftAvailable = function (e) {
              return e.isLive() && 0 !== e.getMaxTimeShift();
            }),
            (o.getState = function (e) {
              return e.hasEnded()
                ? i.Finished
                : e.isPlaying()
                  ? i.Playing
                  : e.isPaused()
                    ? i.Paused
                    : null != e.getSource()
                      ? i.Prepared
                      : i.Idle;
            }),
            (o.getCurrentTimeRelativeToSeekableRange = function (e) {
              var t = e.getCurrentTime();
              return e.isLive() ? t : t - o.getSeekableRangeStart(e, 0);
            }),
            (o.getSeekableRangeStart = function (e, t) {
              return (void 0 === t && (t = 0), (e.getSeekableRange() && e.getSeekableRange().start) || t);
            }),
            (o.getSeekableRangeRespectingLive = function (e) {
              var t, n, o;
              return e.isLive()
                ? ((t = -e.getTimeShift()),
                  (n = -e.getMaxTimeShift()),
                  { start: (o = e.getCurrentTime()) - (n - t), end: o + t })
                : e.getSeekableRange();
            }),
            (a.prototype.detect = function () {
              var e;
              this.player.isLive() &&
                (e = o.isTimeShiftAvailable(this.player)) !== this.timeShiftAvailable &&
                (this.timeShiftAvailabilityChangedEvent.dispatch(this.player, { timeShiftAvailable: e }),
                (this.timeShiftAvailable = e));
            }),
            Object.defineProperty(a.prototype, 'onTimeShiftAvailabilityChanged', {
              get: function () {
                return this.timeShiftAvailabilityChangedEvent.getEvent();
              },
              enumerable: !1,
              configurable: !0,
            }),
            (o.TimeShiftAvailabilityDetector = a),
            (l.prototype.detect = function () {
              var e = this.player.isLive();
              e !== this.live && (this.liveChangedEvent.dispatch(this.player, { live: e }), (this.live = e));
            }),
            Object.defineProperty(l.prototype, 'onLiveChanged', {
              get: function () {
                return this.liveChangedEvent.getEvent();
              },
              enumerable: !1,
              configurable: !0,
            }),
            (o.LiveStreamDetector = l));
        },
        { './browserutils': 3, './eventdispatcher': 83 },
      ],
      96: [
        function (e, t, n) {
          var o,
            r,
            s,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            a =
              (this && this.__spreadArray) ||
              function (e, t, n) {
                if (n || 2 === arguments.length)
                  for (var o, i = 0, r = t.length; i < r; i++)
                    (!o && i in t) || ((o = o || Array.prototype.slice.call(t, 0, i))[i] = t[i]);
                return e.concat(o || Array.prototype.slice.call(t));
              },
            l =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.ListNavigationGroup = n.ListOrientation = void 0),
              e('./navigationgroup')),
            c = e('./types'),
            e =
              (((e = r || (n.ListOrientation = r = {})).Horizontal = 'horizontal'),
              (e.Vertical = 'vertical'),
              (s = l.NavigationGroup),
              i(u, s),
              (u.prototype.handleAction = function (e) {
                (s.prototype.handleAction.call(this, e), e === c.Action.SELECT && this.handleAction(c.Action.BACK));
              }),
              (u.prototype.handleNavigation = function (e) {
                (s.prototype.handleNavigation.call(this, e),
                  this.listNavigationDirections.includes(e) || this.handleAction(c.Action.BACK));
              }),
              u);
          function u(e, t) {
            for (var n = [], o = 2; o < arguments.length; o++) n[o - 2] = arguments[o];
            var i = s.apply(this, a([t], n, !1)) || this;
            switch (e) {
              case r.Vertical:
                i.listNavigationDirections = [c.Direction.UP, c.Direction.DOWN];
                break;
              case r.Horizontal:
                i.listNavigationDirections = [c.Direction.LEFT, c.Direction.RIGHT];
            }
            return i;
          }
          n.ListNavigationGroup = e;
        },
        { './navigationgroup': 100, './types': 106 },
      ],
      97: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.getHtmlElementsFromComponents = function (e) {
              var t = [];
              return (
                e
                  .filter(function (e) {
                    return !e.isHidden();
                  })
                  .forEach(function (e) {
                    (e instanceof o.Container
                      ? (function t(e) {
                          var n = [];
                          e.getComponents().forEach(function (e) {
                            (0, i.isContainer)(e) ? n.push.apply(n, t(e)) : (0, i.isComponent)(e) && n.push(e);
                          });
                          return n;
                        })(e)
                      : [e]
                    ).forEach(function (e) {
                      t.push.apply(
                        t,
                        ((e = e),
                        (0, i.isListBox)(e)
                          ? [].slice.call(e.getDomElement().get()[0].children)
                          : e.getDomElement().get().slice(0, 1)),
                      );
                    });
                  }),
                t
              );
            }));
          var o = e('../components/container'),
            i = e('./typeguards');
        },
        { '../components/container': 20, './typeguards': 105 },
      ],
      98: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.getKeyMapForPlatform = function () {
              var e = [r, i, s, l, a].find(function (e) {
                return e.isApplicable();
              });
              return e ? e.keyCodes : c;
            }));
          var n = e('./types'),
            o = e('../browserutils'),
            i = {
              isApplicable: function () {
                return o.BrowserUtils.isTizen;
              },
              keyCodes: {
                38: n.Direction.UP,
                40: n.Direction.DOWN,
                37: n.Direction.LEFT,
                39: n.Direction.RIGHT,
                13: n.Action.SELECT,
                10009: n.Action.BACK,
              },
            },
            r = {
              isApplicable: function () {
                return o.BrowserUtils.isWebOs;
              },
              keyCodes: {
                38: n.Direction.UP,
                40: n.Direction.DOWN,
                37: n.Direction.LEFT,
                39: n.Direction.RIGHT,
                13: n.Action.SELECT,
                461: n.Action.BACK,
              },
            },
            s = {
              isApplicable: function () {
                return o.BrowserUtils.isPlayStation;
              },
              keyCodes: {
                38: n.Direction.UP,
                40: n.Direction.DOWN,
                37: n.Direction.LEFT,
                39: n.Direction.RIGHT,
                13: n.Action.SELECT,
                27: n.Action.BACK,
              },
            },
            a = {
              isApplicable: function () {
                return o.BrowserUtils.isAndroid;
              },
              keyCodes: {
                19: n.Direction.UP,
                20: n.Direction.DOWN,
                21: n.Direction.LEFT,
                22: n.Direction.RIGHT,
                23: n.Action.SELECT,
                66: n.Action.SELECT,
                4: n.Action.BACK,
              },
            },
            l = {
              isApplicable: function () {
                return o.BrowserUtils.isHisense;
              },
              keyCodes: {
                38: n.Direction.UP,
                40: n.Direction.DOWN,
                37: n.Direction.LEFT,
                39: n.Direction.RIGHT,
                13: n.Action.SELECT,
                8: n.Action.BACK,
              },
            },
            c = {
              38: n.Direction.UP,
              40: n.Direction.DOWN,
              37: n.Direction.LEFT,
              39: n.Direction.RIGHT,
              13: n.Action.SELECT,
              27: n.Action.BACK,
            };
        },
        { '../browserutils': 3, './types': 106 },
      ],
      99: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.getElementInDirection = function (t, e, o) {
              var i;
              if (t)
                return (
                  (i = a(t)),
                  null ==
                  (e = e
                    .filter(function (e) {
                      return e !== t;
                    })
                    .map(function (e) {
                      var t = a(e),
                        n = s({ x: t.x - i.x, y: t.y - i.y });
                      return {
                        angle: ((e, t, n) => (
                          (n = {
                            x: n === r.Direction.LEFT ? -1 : n === r.Direction.RIGHT ? 1 : 0,
                            y: n === r.Direction.UP ? -1 : n === r.Direction.DOWN ? 1 : 0,
                          }),
                          (t = ((e) => {
                            var t = s(e);
                            return { x: e.x / t, y: e.y / t };
                          })({ x: t.x - e.x, y: t.y - e.y })),
                          (e = ((e, t) => e.x * t.x + e.y * t.y)(n, t) / (s(n) * s(t))),
                          (180 * Math.acos(e)) / Math.PI
                        ))(i, t, o),
                        dist: n,
                        element: e,
                      };
                    })
                    .filter(function (e) {
                      return e.angle <= 45;
                    })
                    .sort(function (e, t) {
                      return e.angle - t.angle + (e.dist - t.dist);
                    })
                    .shift())
                    ? void 0
                    : e.element
                );
            }),
            (n.getBoundingRectFromElement = o));
          var r = e('./types');
          function s(e) {
            return Math.sqrt(Math.pow(e.x, 2) + Math.pow(e.y, 2));
          }
          function a(e) {
            e = o(e);
            return { x: e.x + e.width / 2, y: e.y + e.height / 2 };
          }
          function o(e) {
            e = e.getBoundingClientRect();
            return ('number' != typeof e.x && 'number' != typeof e.y && ((e.x = e.left), (e.y = e.top)), e);
          }
        },
        { './types': 106 },
      ],
      100: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }), (n.NavigationGroup = void 0));
          var o = e('./navigationalgorithm'),
            i = e('./gethtmlelementsfromcomponents'),
            r = e('./nodeeventsubscriber'),
            s = e('./typeguards'),
            a = e('./types');
          function l(e) {
            for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            ((this.container = e),
              (this.removeElementHoverEventListeners = function () {}),
              (this.components = t),
              (this.eventSubscriber = new r.NodeEventSubscriber()));
          }
          ((l.prototype.getActiveElement = function () {
            return this.activeElement;
          }),
            (l.prototype.focusElement = function (e) {
              (this.blurActiveElement(), (this.activeElement = e), this.activeElement.focus());
            }),
            (l.prototype.blurActiveElement = function () {
              var e;
              null != (e = this.activeElement) && e.blur();
            }),
            (l.prototype.focusFirstElement = function () {
              var e = (0, i.getHtmlElementsFromComponents)(this.components)[0];
              e && this.focusElement(e);
            }),
            (l.prototype.defaultNavigationHandler = function (e) {
              e = (0, o.getElementInDirection)(
                this.activeElement,
                (0, i.getHtmlElementsFromComponents)(this.components),
                e,
              );
              e && this.focusElement(e);
            }),
            (l.prototype.defaultActionHandler = function (e) {
              var t;
              switch (e) {
                case a.Action.SELECT:
                  null != (t = this.activeElement) && t.click();
                  break;
                case a.Action.BACK:
                  this.container.hide();
              }
            }),
            (l.prototype.handleInput = function (e, t, n) {
              var o = !0;
              (null != n &&
                n(e, this.activeElement, function () {
                  return (o = !1);
                }),
                o && t.call(this, e));
            }),
            (l.prototype.handleNavigation = function (e) {
              this.activeElement
                ? this.handleInput(e, this.defaultNavigationHandler, this.onNavigation)
                : this.activeElementBeforeDisable
                  ? this.focusElement(this.activeElementBeforeDisable)
                  : this.focusFirstElement();
            }),
            (l.prototype.handleAction = function (e) {
              this.handleInput(e, this.defaultActionHandler, this.onAction);
            }),
            (l.prototype.disable = function () {
              this.activeElement &&
                ((this.activeElementBeforeDisable = this.activeElement),
                this.blurActiveElement(),
                (this.activeElement = void 0));
            }),
            (l.prototype.enable = function () {
              (this.activeElementBeforeDisable && !(0, s.isSettingsPanel)(this.container)
                ? (this.focusElement(this.activeElementBeforeDisable), (this.activeElementBeforeDisable = void 0))
                : this.focusFirstElement(),
                this.trackElementHover());
            }),
            (l.prototype.trackElementHover = function () {
              var o = this,
                e =
                  (this.removeElementHoverEventListeners(),
                  (0, i.getHtmlElementsFromComponents)(this.components).map(function (e) {
                    function t() {
                      return o.disable();
                    }
                    var n = o.focusElement.bind(o, e);
                    return (
                      o.eventSubscriber.on(e, 'mouseenter', n),
                      o.eventSubscriber.on(e, 'mouseleave', t),
                      function () {
                        (o.eventSubscriber.off(e, 'mouseenter', n), o.eventSubscriber.off(e, 'mouseleave', t));
                      }
                    );
                  }));
              this.removeElementHoverEventListeners = function () {
                return e.forEach(function (e) {
                  return e();
                });
              };
            }),
            (l.prototype.release = function () {
              (this.eventSubscriber.release(),
                (this.activeElement = void 0),
                this.components.splice(0, this.components.length),
                this.removeElementHoverEventListeners());
            }),
            (n.NavigationGroup = l));
        },
        {
          './gethtmlelementsfromcomponents': 97,
          './navigationalgorithm': 99,
          './nodeeventsubscriber': 101,
          './typeguards': 105,
          './types': 106,
        },
      ],
      101: [
        function (e, t, n) {
          function o() {
            this.attachedListeners = new Map();
          }
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.NodeEventSubscriber = void 0),
            (o.prototype.getEventListenersOfType = function (e) {
              return (
                this.attachedListeners.has(e) || this.attachedListeners.set(e, []),
                this.attachedListeners.get(e)
              );
            }),
            (o.prototype.on = function (e, t, n, o) {
              (e.addEventListener(t, n, o), this.getEventListenersOfType(t).push([e, n, o]));
            }),
            (o.prototype.off = function (t, e, n, o) {
              var i = this.getEventListenersOfType(e),
                r = i.findIndex(function (e) {
                  return e[0] === t && e[1] === n && e[2] === o;
                });
              (t.removeEventListener(e, n, o), -1 < r && i.splice(r, 1));
            }),
            (o.prototype.release = function () {
              var o = this;
              (this.attachedListeners.forEach(function (e, n) {
                e.forEach(function (e) {
                  var t = e[0];
                  o.off(t, n, e[1], e[2]);
                });
              }),
                this.attachedListeners.clear());
            }),
            (n.NodeEventSubscriber = o));
        },
        {},
      ],
      102: [
        function (e, t, n) {
          var o,
            i,
            r =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            s =
              (this && this.__spreadArray) ||
              function (e, t, n) {
                if (n || 2 === arguments.length)
                  for (var o, i = 0, r = t.length; i < r; i++)
                    (!o && i in t) || ((o = o || Array.prototype.slice.call(t, 0, i))[i] = t[i]);
                return e.concat(o || Array.prototype.slice.call(t));
              },
            a =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.RootNavigationGroup = void 0),
              e('./navigationgroup')),
            l = e('./types'),
            e =
              ((i = a.NavigationGroup),
              r(c, i),
              (c.prototype.handleAction = function (e) {
                (this.container.showUi(), i.prototype.handleAction.call(this, e));
              }),
              (c.prototype.handleNavigation = function (e) {
                (this.container.showUi(), i.prototype.handleNavigation.call(this, e));
              }),
              (c.prototype.defaultActionHandler = function (e) {
                e === l.Action.BACK ? this.container.hideUi() : i.prototype.defaultActionHandler.call(this, e);
              }),
              (c.prototype.release = function () {
                i.prototype.release.call(this);
              }),
              c);
          function c(e) {
            for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            var o = i.apply(this, s([e], t, !1)) || this;
            return ((o.container = e), o);
          }
          n.RootNavigationGroup = e;
        },
        { './navigationgroup': 100, './types': 106 },
      ],
      103: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }), (n.SeekBarHandler = void 0));
          var i = e('./nodeeventsubscriber'),
            r = e('./types'),
            o = e('./navigationalgorithm');
          function s(e) {
            var o = this;
            ((this.rootNavigationGroup = e),
              (this.cursorPosition = { x: 0, y: 0 }),
              (this.isScrubbing = !1),
              (this.scrubSpeedPercentage = 0.005),
              (this.onNavigation = function (e, t, n) {
                a(t) &&
                  (e === r.Direction.UP || e === r.Direction.DOWN
                    ? o.stopSeeking(l(t))
                    : (o.initializeOrUpdateCursorPosition(t, e), o.dispatchMouseMoveEvent(l(t)), n()));
              }),
              (this.onAction = function (e, t, n) {
                a(t) &&
                  ((t = l(t)),
                  e === r.Action.SELECT && o.isScrubbing
                    ? (o.dispatchMouseClickEvent(t), n())
                    : e === r.Action.BACK && (o.stopSeeking(t), n()));
              }),
              (this.rootNavigationGroup.onAction = this.onAction),
              (this.eventSubscriber = new i.NodeEventSubscriber()),
              (this.rootNavigationGroup.onNavigation = this.onNavigation));
          }
          function a(e) {
            return (
              e &&
              -1 <
                Array.from(e.classList).findIndex(function (e) {
                  return /-ui-seekbar$/.test(e);
                })
            );
          }
          function l(e) {
            return e.children.item(0);
          }
          ((s.prototype.updateScrubSpeedPercentage = function () {
            var e = this;
            (clearTimeout(this.scrubSpeedResetTimeout),
              (this.scrubSpeedPercentage *= 1.1),
              (this.scrubSpeedResetTimeout = window.setTimeout(function () {
                return (e.scrubSpeedPercentage = 0.005);
              }, 100)));
          }),
            (s.prototype.getIncrement = function (e, t) {
              this.updateScrubSpeedPercentage();
              t = t.getBoundingClientRect().width * this.scrubSpeedPercentage;
              return e === r.Direction.RIGHT ? t : -t;
            }),
            (s.prototype.resetCursorPosition = function () {
              ((this.cursorPosition.x = 0), (this.cursorPosition.y = 0));
            }),
            (s.prototype.updateCursorPosition = function (e, t) {
              this.cursorPosition.x += this.getIncrement(e, t);
            }),
            (s.prototype.initializeCursorPosition = function (e) {
              var e = e.querySelector('[class*="seekbar-playbackposition-marker"]'),
                e = (0, o.getBoundingRectFromElement)(e),
                t = e.x + e.width / 2,
                e = e.y;
              ((this.cursorPosition.x = t), (this.cursorPosition.y = e));
            }),
            (s.prototype.initializeOrUpdateCursorPosition = function (e, t) {
              (this.isScrubbing ? this.updateCursorPosition(t, e) : this.initializeCursorPosition(e),
                (this.isScrubbing = !0));
            }),
            (s.prototype.getCursorPositionMouseEventInit = function () {
              return { clientX: this.cursorPosition.x, clientY: this.cursorPosition.y };
            }),
            (s.prototype.dispatchMouseMoveEvent = function (e) {
              e.dispatchEvent(new MouseEvent('mousemove', this.getCursorPositionMouseEventInit()));
            }),
            (s.prototype.dispatchMouseClickEvent = function (t) {
              function n() {
                var e = o.getCursorPositionMouseEventInit();
                (document.dispatchEvent(new MouseEvent('mouseup', e)),
                  o.eventSubscriber.off(t, 'mousedown', n),
                  o.stopSeeking(t));
              }
              var o = this;
              (this.eventSubscriber.on(t, 'mousedown', n), t.dispatchEvent(new MouseEvent('mousedown')));
            }),
            (s.prototype.stopSeeking = function (e) {
              (this.resetCursorPosition(), (this.isScrubbing = !1), this.dispatchMouseLeaveEvent(e));
            }),
            (s.prototype.dispatchMouseLeaveEvent = function (e) {
              e.dispatchEvent(new MouseEvent('mouseleave'));
            }),
            (s.prototype.release = function () {
              (this.eventSubscriber.release(),
                (this.rootNavigationGroup.onAction = void 0),
                (this.rootNavigationGroup.onNavigation = void 0));
            }),
            (n.SeekBarHandler = s));
        },
        { './navigationalgorithm': 99, './nodeeventsubscriber': 101, './types': 106 },
      ],
      104: [
        function (e, t, n) {
          var i =
              (this && this.__spreadArray) ||
              function (e, t, n) {
                if (n || 2 === arguments.length)
                  for (var o, i = 0, r = t.length; i < r; i++)
                    (!o && i in t) || ((o = o || Array.prototype.slice.call(t, 0, i))[i] = t[i]);
                return e.concat(o || Array.prototype.slice.call(t));
              },
            r =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.SpatialNavigation = void 0),
              e('./nodeeventsubscriber')),
            s = e('./seekbarhandler'),
            a = e('./keymap'),
            l = e('./typeguards');
          function o(e) {
            for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            var o = this;
            ((this.navigationGroups = []),
              (this.onShow = function (e) {
                (o.activeNavigationGroups.push(e), o.updateEnabledNavigationGroup());
              }),
              (this.onHide = function (t) {
                var e = o.activeNavigationGroups.findIndex(function (e) {
                  return e === t;
                });
                -1 < e && (t.disable(), o.activeNavigationGroups.splice(e, 1), o.updateEnabledNavigationGroup());
              }),
              (this.handleKeyEvent = function (e) {
                var t = o.keyMap[e.keyCode],
                  n = o.getActiveNavigationGroup();
                n &&
                  n.container &&
                  !n.container.isHidden() &&
                  !n.container.isDisabled() &&
                  ((0, l.isDirection)(t) && (n.handleNavigation(t), e.preventDefault(), e.stopPropagation()),
                  (0, l.isAction)(t)) &&
                  (n.handleAction(t), e.preventDefault(), e.stopPropagation());
              }),
              (this.seekBarHandler = new s.SeekBarHandler(e)),
              (this.activeNavigationGroups = []),
              (this.unsubscribeVisibilityChangesFns = []),
              (this.eventSubscriber = new r.NodeEventSubscriber()),
              (this.navigationGroups = i([e], t, !0)),
              (this.keyMap = (0, a.getKeyMapForPlatform)()),
              this.subscribeToNavigationGroupVisibilityChanges(),
              this.attachKeyEventHandler(),
              this.enableDefaultNavigationGroup());
          }
          ((o.prototype.attachKeyEventHandler = function () {
            this.eventSubscriber.on(document, 'keydown', this.handleKeyEvent, !0);
          }),
            (o.prototype.subscribeToNavigationGroupVisibilityChanges = function () {
              var o = this;
              this.navigationGroups.forEach(function (e) {
                function t() {
                  return o.onShow(e);
                }
                function n() {
                  return o.onHide(e);
                }
                (e.container.onShow.subscribe(t),
                  e.container.onHide.subscribe(n),
                  o.unsubscribeVisibilityChangesFns.push(
                    function () {
                      return e.container.onShow.unsubscribe(t);
                    },
                    function () {
                      return e.container.onHide.unsubscribe(n);
                    },
                  ));
              });
            }),
            (o.prototype.unsubscribeFromNavigationGroupVisibilityChanges = function () {
              (this.unsubscribeVisibilityChangesFns.forEach(function (e) {
                return e();
              }),
                (this.unsubscribeVisibilityChangesFns = []));
            }),
            (o.prototype.enableDefaultNavigationGroup = function () {
              var e =
                null !=
                (e = this.navigationGroups.find(function (e) {
                  return e.container.isShown();
                }))
                  ? e
                  : this.navigationGroups[0];
              e && (this.activeNavigationGroups.push(e), this.updateEnabledNavigationGroup());
            }),
            (o.prototype.updateEnabledNavigationGroup = function () {
              var n = this;
              this.activeNavigationGroups.forEach(function (e, t) {
                t < n.activeNavigationGroups.length - 1 ? e.disable() : e.enable();
              });
            }),
            (o.prototype.getActiveNavigationGroup = function () {
              return this.activeNavigationGroups[this.activeNavigationGroups.length - 1];
            }),
            (o.prototype.release = function () {
              (this.unsubscribeFromNavigationGroupVisibilityChanges(),
                this.eventSubscriber.release(),
                this.navigationGroups.forEach(function (e) {
                  return e.release();
                }),
                this.seekBarHandler.release());
            }),
            (n.SpatialNavigation = o));
        },
        { './keymap': 98, './nodeeventsubscriber': 101, './seekbarhandler': 103, './typeguards': 105 },
      ],
      105: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.isSettingsPanel = function (e) {
              return e instanceof i.SettingsPanel;
            }),
            (n.isComponent = function (e) {
              return null != e && e instanceof o.Component;
            }),
            (n.isContainer = function (e) {
              return null != e && e instanceof r.Container;
            }),
            (n.isListBox = function (e) {
              return e instanceof s.ListBox;
            }),
            (n.isDirection = function (e) {
              return 'string' == typeof e && Object.values(a.Direction).includes(e);
            }),
            (n.isAction = function (e) {
              return 'string' == typeof e && Object.values(a.Action).includes(e);
            }));
          var o = e('../components/component'),
            i = e('../components/settingspanel'),
            r = e('../components/container'),
            s = e('../components/listbox'),
            a = e('./types');
        },
        {
          '../components/component': 19,
          '../components/container': 20,
          '../components/listbox': 28,
          '../components/settingspanel': 44,
          './types': 106,
        },
      ],
      106: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.Action = n.Direction = void 0),
            (n.Direction = { UP: 'up', DOWN: 'down', LEFT: 'left', RIGHT: 'right' }),
            (n.Action = { SELECT: 'select', BACK: 'back' }));
        },
        {},
      ],
      107: [
        function (e, t, n) {
          var o, i;
          function r(e, t) {
            o.hasLocalStorage() && window.localStorage.setItem(e, t);
          }
          function s(e) {
            return o.hasLocalStorage() ? window.localStorage.getItem(e) : null;
          }
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.StorageUtils = void 0),
            ((o = n.StorageUtils =
              {
                hasLocalStorage: function () {
                  if (!i) {
                    var t = { length: 0 };
                    try {
                      var t = window.localStorage,
                        e = '__storage_test__';
                      (t.setItem(e, e), t.removeItem(e), (i = !0));
                    } catch (e) {
                      i =
                        e instanceof DOMException &&
                        (22 === e.code ||
                          1014 === e.code ||
                          'QuotaExceededError' === e.name ||
                          'NS_ERROR_DOM_QUOTA_REACHED' === e.name) &&
                        0 !== t.length;
                    }
                  }
                  return i;
                },
              }).setItem = r),
            (o.getItem = s),
            (o.setObject = function (e, t) {
              o.hasLocalStorage() && r(e, JSON.stringify(t));
            }),
            (o.getObject = function (e) {
              if (o.hasLocalStorage()) {
                var t = s(e);
                if (e) return JSON.parse(t);
              }
              return null;
            }));
        },
        {},
      ],
      108: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }), (n.StringUtils = void 0));
          var r,
            s,
            i,
            a = e('./localization/i18n');
          function l(e, t) {
            void 0 === t && (t = r.FORMAT_HHMMSS);
            var n = e < 0,
              o = (n && (e = -e), Math.floor(e / 3600)),
              i = Math.floor(e / 60) - 60 * o,
              e = Math.floor(e) % 60;
            return (n ? '-' : '') + t.replace('hh', s(o, 2)).replace('mm', s(i, 2)).replace('ss', s(e, 2));
          }
          (((r = n.StringUtils = { FORMAT_HHMMSS: 'hh:mm:ss', FORMAT_MMSS: 'mm:ss' }).secondsToTime = l),
            (r.secondsToText = function (e) {
              var t = e < 0,
                n = (t && (e = -e), Math.floor(e / 3600)),
                o = Math.floor(e / 60) - 60 * n,
                e = Math.floor(e) % 60;
              return (
                (t ? '-' : '') +
                (0 !== n
                  ? ''
                      .concat(s(n, 2), ' ')
                      .concat(a.i18n.performLocalization(a.i18n.getLocalizer('settings.time.hours')), ' ')
                  : '') +
                (0 != o
                  ? ''
                      .concat(s(o, 2), ' ')
                      .concat(a.i18n.performLocalization(a.i18n.getLocalizer('settings.time.minutes')), ' ')
                  : '') +
                ''.concat(s(e, 2), ' ').concat(a.i18n.performLocalization(a.i18n.getLocalizer('settings.time.seconds')))
              );
            }),
            (s = function (e, t) {
              e += '';
              return '0000000000'.substr(0, t - e.length) + e;
            }),
            (r.replaceAdMessagePlaceholders = function (e, n, o) {
              var t = new RegExp(
                '\\{(remainingTime|playedTime|adDuration)(}|%((0[1-9]\\d*(\\.\\d+(d|f)|d|f)|\\.\\d+f|d|f)|hh:mm:ss|mm:ss)})',
                'g',
              );
              return e.replace(t, function (e) {
                var t = 0;
                return (
                  -1 < e.indexOf('remainingTime')
                    ? (t = n ? Math.ceil(n - o.getCurrentTime()) : o.getDuration() - o.getCurrentTime())
                    : -1 < e.indexOf('playedTime')
                      ? (t = o.getCurrentTime())
                      : -1 < e.indexOf('adDuration') && (t = o.getDuration()),
                  i(Math.round(t), e)
                );
              });
            }),
            (i = function (e, t) {
              var n = 0,
                o = (t = /%((0[1-9]\d*(\.\d+(d|f)|d|f)|\.\d+f|d|f)|hh:mm:ss|mm:ss)/.test(t) ? t : '%d').match(
                  /(%0[1-9]\d*)(?=(\.\d+f|f|d))/,
                ),
                o = (o && (n = parseInt(o[0].substring(2))), null),
                i = t.match(/\.\d*(?=f)/);
              return (
                i && !isNaN(parseInt(i[0].substring(1))) && 20 < (o = parseInt(i[0].substring(1))) && (o = 20),
                -1 < t.indexOf('f')
                  ? ((i = ''),
                    -1 < (i = null !== o ? e.toFixed(o) : '' + e).indexOf('.')
                      ? s(i, i.length + (n - i.indexOf('.')))
                      : s(i, n))
                  : -1 < t.indexOf(':')
                    ? ((o = Math.ceil(e)),
                      -1 < t.indexOf('hh') ? l(o) : ((i = Math.floor(o / 60)), (t = o % 60), s(i, 2) + ':' + s(t, 2)))
                    : s(Math.ceil(e), n)
              );
            }));
        },
        { './localization/i18n': 88 },
      ],
      109: [
        function (e, t, n) {
          var i =
              (this && this.__spreadArray) ||
              function (e, t, n) {
                if (n || 2 === arguments.length)
                  for (var o, i = 0, r = t.length; i < r; i++)
                    (!o && i in t) || ((o = o || Array.prototype.slice.call(t, 0, i))[i] = t[i]);
                return e.concat(o || Array.prototype.slice.call(t));
              },
            r =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.SubtitleSwitchHandler = void 0),
              e('./localization/i18n'));
          function s(e, t, n) {
            var o = this;
            ((this.addSubtitle = function (e) {
              e = e.subtitle;
              o.listElement.hasItem(e.id) || o.listElement.addItem(e.id, e.label);
            }),
              (this.removeSubtitle = function (e) {
                e = e.subtitle;
                o.listElement.hasItem(e.id) && o.listElement.removeItem(e.id);
              }),
              (this.selectCurrentSubtitle = function () {
                var e;
                o.player.subtitles &&
                  ((e = o.player.subtitles
                    .list()
                    .filter(function (e) {
                      return e.enabled;
                    })
                    .pop()),
                  o.listElement.selectItem(e ? e.id : s.SUBTITLES_OFF_KEY));
              }),
              (this.clearSubtitles = function () {
                o.listElement.clearItems();
              }),
              (this.refreshSubtitles = function () {
                var e, t;
                o.player.subtitles &&
                  ((e = { key: s.SUBTITLES_OFF_KEY, label: r.i18n.getLocalizer('off') }),
                  (t = o.player.subtitles.list()),
                  o.listElement.synchronizeItems(
                    i(
                      [e],
                      t.map(function (e) {
                        return { key: e.id, label: e.label };
                      }),
                      !0,
                    ),
                  ),
                  o.selectCurrentSubtitle());
              }),
              (this.player = e),
              (this.listElement = t),
              (this.uimanager = n),
              this.bindSelectionEvent(),
              this.bindPlayerEvents(),
              this.refreshSubtitles());
          }
          ((s.prototype.bindSelectionEvent = function () {
            var o = this;
            this.listElement.onItemSelected.subscribe(function (e, t) {
              var n;
              t === s.SUBTITLES_OFF_KEY
                ? (n = o.player.subtitles
                    .list()
                    .filter(function (e) {
                      return e.enabled;
                    })
                    .pop()) && o.player.subtitles.disable(n.id)
                : o.player.subtitles.enable(t, !0);
            });
          }),
            (s.prototype.bindPlayerEvents = function () {
              (this.player.on(this.player.exports.PlayerEvent.SubtitleAdded, this.addSubtitle),
                this.player.on(this.player.exports.PlayerEvent.SubtitleEnabled, this.selectCurrentSubtitle),
                this.player.on(this.player.exports.PlayerEvent.SubtitleDisabled, this.selectCurrentSubtitle),
                this.player.on(this.player.exports.PlayerEvent.SubtitleRemoved, this.removeSubtitle),
                this.player.on(this.player.exports.PlayerEvent.SourceUnloaded, this.clearSubtitles),
                this.player.on(this.player.exports.PlayerEvent.PeriodSwitched, this.refreshSubtitles),
                this.uimanager.getConfig().events.onUpdated.subscribe(this.refreshSubtitles));
            }),
            (s.SUBTITLES_OFF_KEY = 'null'),
            (n.SubtitleSwitchHandler = s));
        },
        { './localization/i18n': 88 },
      ],
      110: [
        function (e, t, n) {
          function o(e, t, n) {
            (void 0 === n && (n = !1),
              (this.delay = e),
              (this.callback = t),
              (this.repeat = n),
              (this.timeoutOrIntervalId = 0),
              (this.active = !1));
          }
          (Object.defineProperty(n, '__esModule', { value: !0 }),
            (n.Timeout = void 0),
            (o.prototype.start = function () {
              return (this.reset(), this);
            }),
            (o.prototype.clear = function () {
              this.clearInternal();
            }),
            (o.prototype.reset = function () {
              var e = this;
              (this.clearInternal(),
                this.repeat
                  ? (this.timeoutOrIntervalId = setInterval(this.callback, this.delay))
                  : (this.timeoutOrIntervalId = setTimeout(function () {
                      ((e.active = !1), e.callback());
                    }, this.delay)),
                (this.active = !0));
            }),
            (o.prototype.isActive = function () {
              return this.active;
            }),
            (o.prototype.clearInternal = function () {
              ((this.repeat ? clearInterval : clearTimeout)(this.timeoutOrIntervalId), (this.active = !1));
            }),
            (n.Timeout = o));
        },
        {},
      ],
      111: [
        function (e, D, t) {
          var n,
            o =
              (this && this.__assign) ||
              function () {
                return (o =
                  Object.assign ||
                  function (e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                      for (var i in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e;
                  }).apply(this, arguments);
              },
            c =
              (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.UIFactory = void 0),
              e('./components/subtitleoverlay')),
            u = e('./components/settingspanelpage'),
            p = e('./components/settingspanelitem'),
            f = e('./components/settingspanel'),
            g = e('./components/controlbar'),
            d = e('./components/container'),
            h = e('./components/playbacktimelabel'),
            y = e('./components/seekbar'),
            m = e('./components/seekbarlabel'),
            i = e('./components/playbacktogglebutton'),
            U = e('./components/volumetogglebutton'),
            z = e('./components/volumeslider'),
            R = e('./components/spacer'),
            b = e('./components/settingstogglebutton'),
            r = e('./components/fullscreentogglebutton'),
            v = e('./components/uicontainer'),
            P = e('./components/bufferingoverlay'),
            C = e('./components/playbacktoggleoverlay'),
            S = e('./components/titlebar'),
            V = e('./components/recommendationoverlay'),
            H = e('./components/watermark'),
            w = e('./components/errormessageoverlay'),
            s = e('./components/adclickoverlay'),
            a = e('./components/admessagelabel'),
            l = e('./components/adskipbutton'),
            _ = e('./components/metadatalabel'),
            E = e('./playerutils'),
            F = e('./components/label'),
            N = e('./components/castuicontainer'),
            O = e('./uimanager'),
            x = e('./localization/i18n'),
            W = e('./components/subtitlelistbox'),
            G = e('./components/audiotracklistbox'),
            K = e('./spatialnavigation/spatialnavigation'),
            q = e('./spatialnavigation/rootnavigationgroup'),
            k = e('./spatialnavigation/ListNavigationGroup'),
            T = e('./uifactoryService');
          function M() {
            return T.UifactoryService.modernUnifiedUI(!1);
          }
          function L() {
            return new v.UIContainer({
              components: [
                new P.BufferingOverlay(),
                new s.AdClickOverlay(),
                new C.PlaybackToggleOverlay(),
                new d.Container({
                  components: [
                    new a.AdMessageLabel({ text: x.i18n.getLocalizer('ads.remainingTime') }),
                    new l.AdSkipButton(),
                  ],
                  cssClass: 'ui-ads-status',
                }),
                new g.ControlBar({
                  components: [
                    new d.Container({
                      components: [
                        new i.PlaybackToggleButton(),
                        new U.VolumeToggleButton(),
                        new z.VolumeSlider(),
                        new R.Spacer(),
                        new r.FullscreenToggleButton(),
                      ],
                      cssClasses: ['controlbar-bottom'],
                    }),
                  ],
                }),
              ],
              cssClasses: ['ui-skin-ads'],
              hideDelay: 2e3,
              hidePlayerStateExceptions: [
                E.PlayerUtils.PlayerState.Prepared,
                E.PlayerUtils.PlayerState.Paused,
                E.PlayerUtils.PlayerState.Finished,
              ],
            });
          }
          function A() {
            return T.UifactoryService.modernUnifiedUI(!0);
          }
          function B() {
            return new v.UIContainer({
              components: [
                new P.BufferingOverlay(),
                new s.AdClickOverlay(),
                new C.PlaybackToggleOverlay(),
                new S.TitleBar({
                  components: [new F.Label({ cssClass: 'label-metadata-title' }), new r.FullscreenToggleButton()],
                }),
                new d.Container({
                  components: [new a.AdMessageLabel({ text: 'Ad: {remainingTime} secs' }), new l.AdSkipButton()],
                  cssClass: 'ui-ads-status',
                }),
              ],
              cssClasses: ['ui-skin-ads', 'ui-skin-smallscreen'],
              hideDelay: 2e3,
              hidePlayerStateExceptions: [
                E.PlayerUtils.PlayerState.Prepared,
                E.PlayerUtils.PlayerState.Paused,
                E.PlayerUtils.PlayerState.Finished,
              ],
            });
          }
          function I() {
            var e = new g.ControlBar({
              components: [
                new d.Container({
                  components: [
                    new h.PlaybackTimeLabel({
                      timeLabelMode: h.PlaybackTimeLabelMode.CurrentTime,
                      hideInLivePlayback: !0,
                    }),
                    new y.SeekBar({ smoothPlaybackPositionUpdateIntervalMs: -1 }),
                    new h.PlaybackTimeLabel({
                      timeLabelMode: h.PlaybackTimeLabelMode.TotalTime,
                      cssClasses: ['text-right'],
                    }),
                  ],
                  cssClasses: ['controlbar-top'],
                }),
              ],
            });
            return new N.CastUIContainer({
              components: [
                new c.SubtitleOverlay(),
                new P.BufferingOverlay(),
                new C.PlaybackToggleOverlay(),
                new H.Watermark(),
                e,
                new S.TitleBar({ keepHiddenWithoutMetadata: !0 }),
                new w.ErrorMessageOverlay(),
              ],
              cssClasses: ['ui-skin-cast-receiver'],
              hideDelay: 2e3,
              hidePlayerStateExceptions: [
                E.PlayerUtils.PlayerState.Prepared,
                E.PlayerUtils.PlayerState.Paused,
                E.PlayerUtils.PlayerState.Finished,
              ],
            });
          }
          function j() {
            var e = new W.SubtitleListBox(),
              t = new f.SettingsPanel({
                components: [new u.SettingsPanelPage({ components: [new p.SettingsPanelItem(null, e)] })],
                hidden: !0,
              }),
              n = new G.AudioTrackListBox(),
              o = new f.SettingsPanel({
                components: [new u.SettingsPanelPage({ components: [new p.SettingsPanelItem(null, n)] })],
                hidden: !0,
              }),
              i = new y.SeekBar({ label: new m.SeekBarLabel() }),
              r = new C.PlaybackToggleOverlay(),
              s = new b.SettingsToggleButton({
                settingsPanel: t,
                autoHideWhenNoActiveSettings: !0,
                cssClass: 'ui-subtitlesettingstogglebutton',
                text: x.i18n.getLocalizer('settings.subtitles'),
              }),
              a = new b.SettingsToggleButton({
                settingsPanel: o,
                autoHideWhenNoActiveSettings: !0,
                cssClass: 'ui-audiotracksettingstogglebutton',
                ariaLabel: x.i18n.getLocalizer('settings.audio.track'),
                text: x.i18n.getLocalizer('settings.audio.track'),
              }),
              l = new v.UIContainer({
                components: [
                  new c.SubtitleOverlay(),
                  new P.BufferingOverlay(),
                  r,
                  new g.ControlBar({
                    components: [
                      new d.Container({
                        components: [
                          new h.PlaybackTimeLabel({
                            timeLabelMode: h.PlaybackTimeLabelMode.CurrentTime,
                            hideInLivePlayback: !0,
                          }),
                          i,
                          new h.PlaybackTimeLabel({
                            timeLabelMode: h.PlaybackTimeLabelMode.RemainingTime,
                            cssClasses: ['text-right'],
                          }),
                        ],
                        cssClasses: ['controlbar-top'],
                      }),
                    ],
                  }),
                  new S.TitleBar({
                    components: [
                      new d.Container({
                        components: [new _.MetadataLabel({ content: _.MetadataLabelContent.Title }), s, a],
                        cssClasses: ['ui-titlebar-top'],
                      }),
                      new d.Container({
                        components: [new _.MetadataLabel({ content: _.MetadataLabelContent.Description }), t, o],
                        cssClasses: ['ui-titlebar-bottom'],
                      }),
                    ],
                  }),
                  new V.RecommendationOverlay(),
                  new w.ErrorMessageOverlay(),
                ],
                cssClasses: ['ui-skin-tv'],
                hideDelay: 2e3,
                hidePlayerStateExceptions: [
                  E.PlayerUtils.PlayerState.Prepared,
                  E.PlayerUtils.PlayerState.Paused,
                  E.PlayerUtils.PlayerState.Finished,
                ],
              });
            return {
              ui: l,
              spatialNavigation: new K.SpatialNavigation(
                new q.RootNavigationGroup(l, r, i, a, s),
                new k.ListNavigationGroup(k.ListOrientation.Vertical, t, e),
                new k.ListNavigationGroup(k.ListOrientation.Vertical, o, n),
              ),
            };
          }
          (((n = t.UIFactory =
            {
              buildDefaultUI: function (e, t) {
                return n.buildModernUI(e, (t = void 0 === t ? {} : t));
              },
              buildDefaultSmallScreenUI: function (e, t) {
                return n.buildModernSmallScreenUI(e, (t = void 0 === t ? {} : t));
              },
              buildDefaultCastReceiverUI: function (e, t) {
                return n.buildModernCastReceiverUI(e, (t = void 0 === t ? {} : t));
              },
              buildDefaultTvUI: function (e, t) {
                return n.buildModernTvUI(e, (t = void 0 === t ? {} : t));
              },
            }).modernUI = M),
            (n.modernAdsUI = L),
            (n.modernSmallScreenUI = A),
            (n.modernSmallScreenAdsUI = B),
            (n.modernCastReceiverUI = I),
            (n.buildModernUI = function (e, t) {
              return (
                void 0 === t && (t = {}),
                new O.UIManager(
                  e,
                  [
                    {
                      ui: B(),
                      condition: function (e) {
                        return e.isMobile && e.documentWidth < 600 && e.isAd && e.adRequiresUi;
                      },
                    },
                    {
                      ui: L(),
                      condition: function (e) {
                        return e.isAd && e.adRequiresUi;
                      },
                    },
                    {
                      ui: A(),
                      condition: function (e) {
                        return !e.isAd && !e.adRequiresUi && e.isMobile && e.documentWidth < 600;
                      },
                    },
                    {
                      ui: M(),
                      condition: function (e) {
                        return !e.isAd && !e.adRequiresUi;
                      },
                    },
                  ],
                  t,
                )
              );
            }),
            (n.buildModernSmallScreenUI = function (e, t) {
              return (
                void 0 === t && (t = {}),
                new O.UIManager(
                  e,
                  [
                    {
                      ui: B(),
                      condition: function (e) {
                        return e.isAd && e.adRequiresUi;
                      },
                    },
                    {
                      ui: A(),
                      condition: function (e) {
                        return !e.isAd && !e.adRequiresUi;
                      },
                    },
                  ],
                  t,
                )
              );
            }),
            (n.buildModernCastReceiverUI = function (e, t) {
              return (void 0 === t && (t = {}), new O.UIManager(e, I(), t));
            }),
            (n.buildModernTvUI = function (e, t) {
              return (void 0 === t && (t = {}), new O.UIManager(e, [o({}, j())], t));
            }),
            (n.modernTvUI = j));
        },
        {
          './components/adclickoverlay': 4,
          './components/admessagelabel': 5,
          './components/adskipbutton': 6,
          './components/audiotracklistbox': 9,
          './components/bufferingoverlay': 12,
          './components/castuicontainer': 16,
          './components/container': 20,
          './components/controlbar': 21,
          './components/errormessageoverlay': 22,
          './components/fullscreentogglebutton': 23,
          './components/label': 27,
          './components/metadatalabel': 30,
          './components/playbacktimelabel': 33,
          './components/playbacktogglebutton': 34,
          './components/playbacktoggleoverlay': 35,
          './components/recommendationoverlay': 37,
          './components/seekbar': 39,
          './components/seekbarlabel': 42,
          './components/settingspanel': 44,
          './components/settingspanelitem': 45,
          './components/settingspanelpage': 46,
          './components/settingstogglebutton': 50,
          './components/spacer': 51,
          './components/subtitlelistbox': 52,
          './components/subtitleoverlay': 53,
          './components/titlebar': 70,
          './components/uicontainer': 73,
          './components/volumeslider': 76,
          './components/volumetogglebutton': 77,
          './components/watermark': 79,
          './localization/i18n': 88,
          './playerutils': 95,
          './spatialnavigation/ListNavigationGroup': 96,
          './spatialnavigation/rootnavigationgroup': 102,
          './spatialnavigation/spatialnavigation': 104,
          './uifactoryService': 112,
          './uimanager': 113,
        },
      ],
      112: [
        function (e, o, t) {
          var l =
              (this && this.__assign) ||
              function () {
                return (l =
                  Object.assign ||
                  function (e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                      for (var i in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e;
                  }).apply(this, arguments);
              },
            c =
              (this && this.__spreadArray) ||
              function (e, t, n) {
                if (n || 2 === arguments.length)
                  for (var o, i = 0, r = t.length; i < r; i++)
                    (!o && i in t) || ((o = o || Array.prototype.slice.call(t, 0, i))[i] = t[i]);
                return e.concat(o || Array.prototype.slice.call(t));
              },
            u =
              (Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.UifactoryService = void 0),
              e('./components/subtitleoverlay')),
            p = e('./components/settingspanelpage'),
            f = e('./components/settingspanelitem'),
            g = e('./components/videoqualityselectbox'),
            d = e('./components/playbackspeedselectbox'),
            h = e('./components/audiotrackselectbox'),
            y = e('./components/audioqualityselectbox'),
            m = e('./components/settingspanel'),
            b = e('./components/subtitlesettings/subtitlesettingspanelpage'),
            v = e('./components/settingspanelpageopenbutton'),
            P = e('./components/subtitlesettings/subtitlesettingslabel'),
            C = e('./components/subtitleselectbox'),
            S = e('./components/controlbar'),
            w = e('./components/container'),
            _ = e('./components/playbacktimelabel'),
            E = e('./components/seekbar'),
            O = e('./components/seekbarlabel'),
            x = e('./components/playbacktogglebutton'),
            k = e('./components/volumetogglebutton'),
            T = e('./components/volumeslider'),
            M = e('./components/spacer'),
            L = e('./components/pictureinpicturetogglebutton'),
            H = e('./components/airplaytogglebutton'),
            F = e('./components/casttogglebutton'),
            N = e('./components/vrtogglebutton'),
            W = e('./components/settingstogglebutton'),
            G = e('./components/fullscreentogglebutton'),
            K = e('./components/uicontainer'),
            A = e('./components/bufferingoverlay'),
            B = e('./components/posteroverlay'),
            I = e('./components/playbacktoggleoverlay'),
            j = e('./components/caststatusoverlay'),
            q = e('./components/titlebar'),
            D = e('./components/recommendationoverlay'),
            Q = e('./components/errormessageoverlay'),
            U = e('./components/closebutton'),
            Y = e('./components/hugereplaybutton'),
            z = e('./components/metadatalabel'),
            R = e('./playerutils'),
            V = e('./localization/i18n'),
            X = e('../ts/uiutils');
          function n() {}
          ((n.modernUnifiedUI = function (e) {
            var t = X.UIUtils.getQueryParams(),
              n = new u.SubtitleOverlay(),
              o = new p.SettingsPanelPage({
                components: [
                  new f.SettingsPanelItem(V.i18n.getLocalizer('settings.video.quality'), new g.VideoQualitySelectBox()),
                  new f.SettingsPanelItem(V.i18n.getLocalizer('speed'), new d.PlaybackSpeedSelectBox()),
                  new f.SettingsPanelItem(V.i18n.getLocalizer('settings.audio.track'), new h.AudioTrackSelectBox()),
                  new f.SettingsPanelItem(V.i18n.getLocalizer('settings.audio.quality'), new y.AudioQualitySelectBox()),
                ],
              }),
              i = new m.SettingsPanel(
                l(l({ components: [o], hidden: !0 }, e && { pageTransitionAnimation: !1 }), { hideDelay: -1 }),
              ),
              r = new b.SubtitleSettingsPanelPage({ settingsPanel: i, overlay: n }),
              s = new C.SubtitleSelectBox(),
              a = new v.SettingsPanelPageOpenButton({
                targetPage: r,
                container: i,
                ariaLabel: V.i18n.getLocalizer('settings.subtitles'),
                text: V.i18n.getLocalizer('open'),
              }),
              o =
                (o.addComponent(
                  new f.SettingsPanelItem(
                    new P.SubtitleSettingsLabel({ text: V.i18n.getLocalizer('settings.subtitles'), opener: a }),
                    s,
                    { role: 'menubar' },
                  ),
                ),
                i.addComponent(r),
                e &&
                  (i.addComponent(new U.CloseButton({ target: i })), r.addComponent(new U.CloseButton({ target: i }))),
                new S.ControlBar({
                  components: c(
                    c([], e ? [] : [i], !0),
                    [
                      new w.Container({
                        components: [
                          new _.PlaybackTimeLabel({
                            timeLabelMode: _.PlaybackTimeLabelMode.CurrentTime,
                            hideInLivePlayback: !0,
                          }),
                          new E.SeekBar({ label: new O.SeekBarLabel() }),
                          new _.PlaybackTimeLabel({
                            timeLabelMode: _.PlaybackTimeLabelMode.TotalTime,
                            hideInLivePlayback: !0,
                            cssClasses: ['text-right'],
                          }),
                        ],
                        cssClasses: ['controlbar-top'],
                      }),
                      new w.Container({
                        components: c(
                          c([], e ? [] : [new x.PlaybackToggleButton()], !0),
                          [
                            new k.VolumeToggleButton(),
                            new T.VolumeSlider(),
                            new M.Spacer(),
                            new L.PictureInPictureToggleButton(),
                            new H.AirPlayToggleButton(),
                            new F.CastToggleButton(),
                            new N.VRToggleButton(),
                            new W.SettingsToggleButton({ settingsPanel: i }),
                            new G.FullscreenToggleButton(),
                          ],
                          !1,
                        ),
                        cssClasses: ['controlbar-bottom'],
                      }),
                    ],
                    !1,
                  ),
                })),
              a = 'true' === String(t.isReels),
              s = e
                ? [
                    n,
                    new B.PosterOverlay(),
                    new A.BufferingOverlay(),
                    new j.CastStatusOverlay(),
                    new _.PlaybackTimeLabel({
                      timeLabelMode: _.PlaybackTimeLabelMode.TotalTime,
                      cssClasses: ['live-next-to-play'],
                    }),
                    new I.PlaybackToggleOverlay(),
                    new Y.HugeReplayButton(),
                    new D.RecommendationOverlay(),
                  ]
                : [
                    n,
                    new B.PosterOverlay(),
                    new A.BufferingOverlay(),
                    new _.PlaybackTimeLabel({
                      timeLabelMode: _.PlaybackTimeLabelMode.TotalTime,
                      cssClasses: ['live-next-to-play'],
                    }),
                    new I.PlaybackToggleOverlay(),
                    new j.CastStatusOverlay(),
                  ];
            return new K.UIContainer(
              l(
                l(
                  {
                    components: a
                      ? [new I.PlaybackToggleOverlay({ hideGoLiveButton: !0 })]
                      : c(
                          c(
                            c(
                              c(
                                c(c([], s, !0), [o], !1),
                                e
                                  ? [
                                      new q.TitleBar({
                                        components: [new z.MetadataLabel({ content: z.MetadataLabelContent.Title })],
                                      }),
                                    ]
                                  : [],
                                !0,
                              ),
                              e ? [i] : [],
                              !0,
                            ),
                            e ? [] : [new D.RecommendationOverlay()],
                            !0,
                          ),
                          [new Q.ErrorMessageOverlay()],
                          !1,
                        ),
                  },
                  e && { cssClasses: a ? ['ui-skin-smallscreen', 'ui-reels'] : ['ui-skin-smallscreen'] },
                ),
                {
                  hideDelay: 2e3,
                  hidePlayerStateExceptions: [
                    R.PlayerUtils.PlayerState.Prepared,
                    R.PlayerUtils.PlayerState.Paused,
                    R.PlayerUtils.PlayerState.Finished,
                  ],
                },
              ),
            );
          }),
            (t.UifactoryService = n));
        },
        {
          '../ts/uiutils': 114,
          './components/airplaytogglebutton': 7,
          './components/audioqualityselectbox': 8,
          './components/audiotrackselectbox': 10,
          './components/bufferingoverlay': 12,
          './components/caststatusoverlay': 14,
          './components/casttogglebutton': 15,
          './components/closebutton': 18,
          './components/container': 20,
          './components/controlbar': 21,
          './components/errormessageoverlay': 22,
          './components/fullscreentogglebutton': 23,
          './components/hugereplaybutton': 25,
          './components/metadatalabel': 30,
          './components/pictureinpicturetogglebutton': 31,
          './components/playbackspeedselectbox': 32,
          './components/playbacktimelabel': 33,
          './components/playbacktogglebutton': 34,
          './components/playbacktoggleoverlay': 35,
          './components/posteroverlay': 36,
          './components/recommendationoverlay': 37,
          './components/seekbar': 39,
          './components/seekbarlabel': 42,
          './components/settingspanel': 44,
          './components/settingspanelitem': 45,
          './components/settingspanelpage': 46,
          './components/settingspanelpageopenbutton': 49,
          './components/settingstogglebutton': 50,
          './components/spacer': 51,
          './components/subtitleoverlay': 53,
          './components/subtitleselectbox': 54,
          './components/subtitlesettings/subtitlesettingslabel': 63,
          './components/subtitlesettings/subtitlesettingspanelpage': 65,
          './components/titlebar': 70,
          './components/uicontainer': 73,
          './components/videoqualityselectbox': 74,
          './components/volumeslider': 76,
          './components/volumetogglebutton': 77,
          './components/vrtogglebutton': 78,
          './localization/i18n': 88,
          './playerutils': 95,
        },
      ],
      113: [
        function (e, t, n) {
          var o,
            i =
              (this && this.__extends) ||
              ((o = function (e, t) {
                return (o =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array
                    ? function (e, t) {
                        e.__proto__ = t;
                      }
                    : function (e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                      }))(e, t);
              }),
              function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null');
                function n() {
                  this.constructor = e;
                }
                (o(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
              }),
            f =
              (this && this.__assign) ||
              function () {
                return (f =
                  Object.assign ||
                  function (e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                      for (var i in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e;
                  }).apply(this, arguments);
              },
            h =
              (this && this.__spreadArray) ||
              function (e, t, n) {
                if (n || 2 === arguments.length)
                  for (var o, i = 0, r = t.length; i < r; i++)
                    (!o && i in t) || ((o = o || Array.prototype.slice.call(t, 0, i))[i] = t[i]);
                return e.concat(o || Array.prototype.slice.call(t));
              },
            g =
              (Object.defineProperty(n, '__esModule', { value: !0 }),
              (n.PlayerWrapper = n.UIInstanceManager = n.UIManager = void 0),
              e('./components/uicontainer')),
            d = e('./dom'),
            r = e('./components/container'),
            y = e('./eventdispatcher'),
            s = e('./uiutils'),
            m = e('./arrayutils'),
            c = e('./browserutils'),
            b = e('./volumecontroller'),
            a = e('./localization/i18n'),
            v = e('./focusvisibilitytracker'),
            P = e('./mobilev3playerapi');
          function l(i, e, o) {
            void 0 === o && (o = {});
            for (
              var r = this,
                t =
                  ((this.events = {
                    onUiVariantResolve: new y.EventDispatcher(),
                    onActiveUiChanged: new y.EventDispatcher(),
                  }),
                  e instanceof g.UIContainer
                    ? ((n = []).push({ ui: e }), (this.uiVariants = n))
                    : (this.uiVariants = e),
                  (this.player = i),
                  (this.managerPlayerWrapper = new w(i)),
                  (o.metadata = o.metadata || {}),
                  (this.config = f(
                    f(
                      {
                        playbackSpeedSelectionEnabled: !0,
                        autoUiVariantResolve: !0,
                        disableAutoHideWhenHovered: !1,
                        enableSeekPreview: !0,
                      },
                      o,
                    ),
                    {
                      events: { onUpdated: new y.EventDispatcher() },
                      volumeController: new b.VolumeController(this.managerPlayerWrapper.getPlayer()),
                    },
                  )),
                  function () {
                    var e,
                      t = i.getSource() || {},
                      t =
                        ((r.config.metadata = JSON.parse(JSON.stringify(o.metadata || {}))),
                        {
                          metadata: { title: t.title, description: t.description, markers: t.markers },
                          recommendations: t.recommendations,
                        }),
                      n = null != (n = r.config.metadata) ? n : {};
                    (((r.config.metadata = n).title =
                      (null == (e = t.metadata) ? void 0 : e.title) || (null == (e = o.metadata) ? void 0 : e.title)),
                      (n.description =
                        (null == (e = t.metadata) ? void 0 : e.description) ||
                        (null == (e = o.metadata) ? void 0 : e.description)),
                      (n.markers =
                        (null == (e = t.metadata) ? void 0 : e.markers) ||
                        (null == (n = o.metadata) ? void 0 : n.markers) ||
                        []),
                      (r.config.recommendations = t.recommendations || o.recommendations || []));
                  }),
                n =
                  (t(),
                  function () {
                    (t(), r.config.events.onUpdated.dispatch(r));
                  }),
                e = this.managerPlayerWrapper.getPlayer(),
                s =
                  (e.on(this.player.exports.PlayerEvent.SourceLoaded, n),
                  (0, P.isMobileV3PlayerAPI)(e) && e.on(P.MobileV3PlayerEvent.PlaylistTransition, n),
                  o.container
                    ? (this.uiContainerElement = (o.container instanceof HTMLElement, new d.DOM(o.container)))
                    : (this.uiContainerElement = new d.DOM(i.getContainer())),
                  (this.uiInstanceManagers = []),
                  []),
                a = 0,
                l = this.uiVariants;
              a < l.length;
              a++
            ) {
              var c = l[a];
              (null == c.condition && s.push(c),
                this.uiInstanceManagers.push(new C(i, c.ui, this.config, c.spatialNavigation)));
            }
            if (1 < s.length) throw Error('Too many UIs without a condition: You cannot have more than one default UI');
            if (0 < s.length && s[0] !== this.uiVariants[this.uiVariants.length - 1])
              throw Error(
                'Invalid UI variant order: the default UI (without condition) must be at the end of the list',
              );
            function u(e) {
              if (null != e)
                switch (e.type) {
                  case i.exports.PlayerEvent.AdStarted:
                    p = e;
                    break;
                  case i.exports.PlayerEvent.AdBreakFinished:
                    ((p = null), r.config.events.onUpdated.dispatch(r));
                    break;
                  case i.exports.PlayerEvent.SourceLoaded:
                  case i.exports.PlayerEvent.SourceUnloaded:
                    p = null;
                }
              var t,
                n = null != p,
                o = !1;
              ((o = null != p && (t = p.ad).isLinear ? (t.uiConfig && t.uiConfig.requestsUi) || !1 : o) &&
                r.config.events.onUpdated.dispatch(r),
                r.resolveUiVariant({ isAd: n, adRequiresUi: o }, function (e) {
                  e.isAd &&
                    null != (e = r.currentUi) &&
                    e.getWrappedPlayer().fireEventInUI(r.player.exports.PlayerEvent.AdStarted, p);
                }));
            }
            var p = null;
            (this.config.autoUiVariantResolve &&
              (this.managerPlayerWrapper.getPlayer().on(this.player.exports.PlayerEvent.SourceLoaded, u),
              this.managerPlayerWrapper.getPlayer().on(this.player.exports.PlayerEvent.SourceUnloaded, u),
              this.managerPlayerWrapper.getPlayer().on(this.player.exports.PlayerEvent.Play, u),
              this.managerPlayerWrapper.getPlayer().on(this.player.exports.PlayerEvent.Paused, u),
              this.managerPlayerWrapper.getPlayer().on(this.player.exports.PlayerEvent.AdStarted, u),
              this.managerPlayerWrapper.getPlayer().on(this.player.exports.PlayerEvent.AdBreakFinished, u),
              this.managerPlayerWrapper.getPlayer().on(this.player.exports.PlayerEvent.PlayerResized, u),
              this.managerPlayerWrapper.getPlayer().on(this.player.exports.PlayerEvent.ViewModeChanged, u)),
              (this.focusVisibilityTracker = new v.FocusVisibilityTracker('bmpui')),
              u(null));
          }
          ((l.localize = function (e) {
            return a.i18n.getLocalizer(e);
          }),
            (l.setLocalizationConfig = function (e) {
              a.i18n.setConfig(e);
            }),
            (l.prototype.getConfig = function () {
              return this.config;
            }),
            (l.prototype.getUiVariants = function () {
              return this.uiVariants;
            }),
            (l.prototype.switchToUiVariant = function (e, t) {
              var n;
              null != e &&
                ((e = this.uiVariants.indexOf(e)),
                (n = this.currentUi),
                (e = this.uiInstanceManagers[e]) !== this.currentUi) &&
                (this.currentUi && this.currentUi.getUI().hide(), (this.currentUi = e), null != this.currentUi) &&
                (this.currentUi.isConfigured() ||
                  (this.addUi(this.currentUi), this.currentUi.getUI().isHidden()) ||
                  this.currentUi.getUI().hide(),
                t && t(),
                this.currentUi.getUI().show(),
                this.events.onActiveUiChanged.dispatch(this, { previousUi: n, currentUi: e }));
            }),
            (l.prototype.resolveUiVariant = function (e, t) {
              void 0 === e && (e = {});
              for (
                var n = {
                    isAd: !1,
                    adRequiresUi: !1,
                    isFullscreen: this.player.getViewMode() === this.player.exports.ViewMode.Fullscreen,
                    isMobile: c.BrowserUtils.isMobile,
                    isPlaying: this.player.isPlaying(),
                    width: this.uiContainerElement.width(),
                    documentWidth: document.body.clientWidth,
                  },
                  o = f(f({}, n), e),
                  i = (this.events.onUiVariantResolve.dispatch(this, o), null),
                  r = 0,
                  s = this.uiVariants;
                r < s.length;
                r++
              ) {
                var a = s[r],
                  l = null == a.condition || !0 === a.condition(o);
                null == i && l ? (i = a) : a.ui.hide();
              }
              this.switchToUiVariant(i, function () {
                t && t(o);
              });
            }),
            (l.prototype.addUi = function (e) {
              var t = e.getUI().getDomElement(),
                n = e.getWrappedPlayer();
              (e.configureControls(),
                this.uiContainerElement.append(t),
                n.getSource() && this.config.events.onUpdated.dispatch(this),
                requestAnimationFrame(function () {
                  e.onConfigured.dispatch(e.getUI());
                }));
            }),
            (l.prototype.releaseUi = function (e) {
              e.releaseControls();
              var t = e.getUI();
              (t.hasDomElement() && t.getDomElement().remove(), e.clearEventHandlers());
            }),
            (l.prototype.release = function () {
              for (var e = 0, t = this.uiInstanceManagers; e < t.length; e++) {
                var n = t[e];
                this.releaseUi(n);
              }
              (this.managerPlayerWrapper.clearEventHandlers(), this.focusVisibilityTracker.release());
            }),
            Object.defineProperty(l.prototype, 'onUiVariantResolve', {
              get: function () {
                return this.events.onUiVariantResolve;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(l.prototype, 'onActiveUiChanged', {
              get: function () {
                return this.events.onActiveUiChanged;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(l.prototype, 'activeUi', {
              get: function () {
                return this.currentUi;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (l.prototype.getTimelineMarkers = function () {
              var e;
              return null != (e = null == (e = this.config.metadata) ? void 0 : e.markers) ? e : [];
            }),
            (l.prototype.addTimelineMarker = function (e) {
              var t;
              (null != (t = null == (t = this.config.metadata) ? void 0 : t.markers) && t.push(e),
                this.config.events.onUpdated.dispatch(this));
            }),
            (l.prototype.removeTimelineMarker = function (e) {
              var t;
              return (
                m.ArrayUtils.remove(
                  null != (t = null == (t = this.config.metadata) ? void 0 : t.markers) ? t : [],
                  e,
                ) === e && (this.config.events.onUpdated.dispatch(this), !0)
              );
            }),
            (n.UIManager = l));
          ((u.prototype.getConfig = function () {
            return this.config;
          }),
            (u.prototype.getUI = function () {
              return this.ui;
            }),
            (u.prototype.getPlayer = function () {
              return this.playerWrapper.getPlayer();
            }),
            Object.defineProperty(u.prototype, 'onConfigured', {
              get: function () {
                return this.events.onConfigured;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(u.prototype, 'onSeek', {
              get: function () {
                return this.events.onSeek;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(u.prototype, 'onSeekPreview', {
              get: function () {
                return this.events.onSeekPreview;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(u.prototype, 'onSeeked', {
              get: function () {
                return this.events.onSeeked;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(u.prototype, 'onComponentShow', {
              get: function () {
                return this.events.onComponentShow;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(u.prototype, 'onComponentHide', {
              get: function () {
                return this.events.onComponentHide;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(u.prototype, 'onControlsShow', {
              get: function () {
                return this.events.onControlsShow;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(u.prototype, 'onPreviewControlsHide', {
              get: function () {
                return this.events.onPreviewControlsHide;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(u.prototype, 'onControlsHide', {
              get: function () {
                return this.events.onControlsHide;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(u.prototype, 'onRelease', {
              get: function () {
                return this.events.onRelease;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (u.prototype.clearEventHandlers = function () {
              this.playerWrapper.clearEventHandlers();
              var e,
                t = this.events;
              for (e in t) t[e].unsubscribeAll();
            }));
          e = u;
          function u(e, t, n, o) {
            ((this.events = {
              onConfigured: new y.EventDispatcher(),
              onSeek: new y.EventDispatcher(),
              onSeekPreview: new y.EventDispatcher(),
              onSeeked: new y.EventDispatcher(),
              onComponentShow: new y.EventDispatcher(),
              onComponentHide: new y.EventDispatcher(),
              onControlsShow: new y.EventDispatcher(),
              onPreviewControlsHide: new y.EventDispatcher(),
              onControlsHide: new y.EventDispatcher(),
              onRelease: new y.EventDispatcher(),
            }),
              (this.playerWrapper = new w(e)),
              (this.ui = t),
              (this.config = n),
              (this.spatialNavigation = o));
          }
          n.UIInstanceManager = e;
          (i(S, (p = e)),
            (S.prototype.getWrappedPlayer = function () {
              return this.getPlayer();
            }),
            (S.prototype.configureControls = function () {
              (this.configureControlsTree(this.getUI()), (this.configured = !0));
            }),
            (S.prototype.isConfigured = function () {
              return this.configured;
            }),
            (S.prototype.configureControlsTree = function (e) {
              var o = this,
                i = [];
              s.UIUtils.traverseTree(e, function (e) {
                for (var t = 0, n = i; t < n.length; t++)
                  if (n[t] === e)
                    throw (
                      console && console.error('Circular reference in UI tree', e),
                      Error('Circular reference in UI tree: ' + e.constructor.name)
                    );
                (e.initialize(), e.configure(o.getPlayer(), o), i.push(e));
              });
            }),
            (S.prototype.releaseControls = function () {
              var e;
              (this.configured &&
                (this.onRelease.dispatch(this.getUI()), this.releaseControlsTree(this.getUI()), (this.configured = !1)),
                null != (e = this.spatialNavigation) && e.release(),
                (this.released = !0));
            }),
            (S.prototype.isReleased = function () {
              return this.released;
            }),
            (S.prototype.releaseControlsTree = function (e) {
              if ((e.release(), e instanceof r.Container))
                for (var t = 0, n = e.getComponents(); t < n.length; t++) {
                  var o = n[t];
                  this.releaseControlsTree(o);
                }
            }),
            (S.prototype.clearEventHandlers = function () {
              p.prototype.clearEventHandlers.call(this);
            }));
          var p,
            C = S;
          function S() {
            var e = (null !== p && p.apply(this, arguments)) || this;
            return ((e.configured = !1), (e.released = !1), e);
          }
          ((_.prototype.getPlayer = function () {
            return this.wrapper;
          }),
            (_.prototype.clearEventHandlers = function () {
              try {
                this.player.getSource();
              } catch (e) {
                e instanceof this.player.exports.PlayerAPINotAvailableError && (this.eventHandlers = {});
              }
              for (var e in this.eventHandlers)
                for (var t = 0, n = this.eventHandlers[e]; t < n.length; t++) {
                  var o = n[t];
                  this.player.off(e, o);
                }
            }));
          var w = _;
          function _(o) {
            for (
              var r = this,
                e =
                  ((this.eventHandlers = {}), (this.player = o), Object.getOwnPropertyNames(Object.getPrototypeOf({}))),
                t = h(['constructor'], e, !0),
                n = [],
                i = [],
                s = 0,
                a = ((e) => {
                  for (var t = []; e; ) {
                    var n = Object.getOwnPropertyNames(e).filter(function (e) {
                      return -1 === t.indexOf(e);
                    });
                    ((t = t.concat(n)), (e = Object.getPrototypeOf(e)));
                  }
                  return t;
                })(o).filter(function (e) {
                  return -1 === t.indexOf(e);
                });
              s < a.length;
              s++
            ) {
              var l = a[s];
              ('function' == typeof o[l] ? n : i).push(l);
            }
            for (var c = {}, u = 0, p = n; u < p.length; u++)
              ((n) => {
                c[n] = function () {
                  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                  return o[n].apply(o, e);
                };
              })(p[u]);
            for (
              var f = function (n) {
                  var t = ((e) => {
                    for (; e; ) {
                      var t = Object.getOwnPropertyDescriptor(e, n);
                      if (t) return t;
                      e = Object.getPrototypeOf(e);
                    }
                  })(o);
                  t && (t.get || t.set)
                    ? Object.defineProperty(c, n, {
                        get: function () {
                          return t.get.call(o);
                        },
                        set: function (e) {
                          return t.set.call(o, e);
                        },
                      })
                    : (c[n] = o[n]);
                },
                g = 0,
                d = i;
              g < d.length;
              g++
            )
              f(d[g]);
            ((c.on = function (e, t) {
              return (o.on(e, t), r.eventHandlers[e] || (r.eventHandlers[e] = []), r.eventHandlers[e].push(t), c);
            }),
              (c.off = function (e, t) {
                return (o.off(e, t), r.eventHandlers[e] && m.ArrayUtils.remove(r.eventHandlers[e], t), c);
              }),
              (c.fireEventInUI = function (e, t) {
                if (r.eventHandlers[e])
                  for (
                    var n = Object.assign({}, { timestamp: Date.now(), type: e, uiSourced: !0 }, t),
                      o = 0,
                      i = r.eventHandlers[e];
                    o < i.length;
                    o++
                  )
                    (0, i[o])(n);
              }),
              (this.wrapper = c));
          }
          n.PlayerWrapper = w;
        },
        {
          './arrayutils': 1,
          './browserutils': 3,
          './components/container': 20,
          './components/uicontainer': 73,
          './dom': 81,
          './eventdispatcher': 83,
          './focusvisibilitytracker': 84,
          './localization/i18n': 88,
          './mobilev3playerapi': 94,
          './uiutils': 114,
          './volumecontroller': 115,
        },
      ],
      114: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }), (n.UIUtils = void 0));
          var a = e('./components/container');
          (((e = n.UIUtils = {}).traverseTree = function (e, r) {
            function s(e, t) {
              if ((r(e, t), e instanceof a.Container))
                for (var n = 0, o = e.getComponents(); n < o.length; n++) {
                  var i = o[n];
                  s(i, e);
                }
            }
            s(e);
          }),
            ((n = e.KeyCode || (e.KeyCode = {}))[(n.LeftArrow = 37)] = 'LeftArrow'),
            (n[(n.UpArrow = 38)] = 'UpArrow'),
            (n[(n.RightArrow = 39)] = 'RightArrow'),
            (n[(n.DownArrow = 40)] = 'DownArrow'),
            (n[(n.Space = 32)] = 'Space'),
            (n[(n.End = 35)] = 'End'),
            (n[(n.Home = 36)] = 'Home'),
            (e.getQueryParams = function () {
              var e = document.getElementsByTagName('script'),
                n = { platform: '', isReels: '' };
              return (
                Array.from(e).forEach(function (e) {
                  var t;
                  e.src &&
                    (e.src.includes('bitmovinplayer-ui.js') ||
                      e.src.includes('bitmovinplayer-ui.min.js') ||
                      e.src.includes('3CatInfoBitmovinUI.js')) &&
                    ((e = new URL(e.src)),
                    (t = new URLSearchParams(e.search).get('platform')),
                    (e = new URLSearchParams(e.search).get('isReels')),
                    (n.platform = t || ''),
                    (n.isReels = e || ''));
                }),
                n
              );
            }));
        },
        { './components/container': 20 },
      ],
      115: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }), (n.VolumeTransition = n.VolumeController = void 0));
          var o = e('./eventdispatcher');
          function i(e) {
            function t() {
              n.onChangedEvent();
            }
            var n = this;
            ((this.player = e), (this.events = { onChanged: new o.EventDispatcher() }), this.storeVolume());
            (e.on(e.exports.PlayerEvent.SourceLoaded, t),
              e.on(e.exports.PlayerEvent.VolumeChanged, t),
              e.on(e.exports.PlayerEvent.Muted, t),
              e.on(e.exports.PlayerEvent.Unmuted, t));
          }
          ((i.prototype.setVolume = function (e) {
            this.player.setVolume(e, i.issuerName);
          }),
            (i.prototype.getVolume = function () {
              return this.player.getVolume();
            }),
            (i.prototype.setMuted = function (e) {
              e ? this.player.mute(i.issuerName) : this.player.unmute(i.issuerName);
            }),
            (i.prototype.toggleMuted = function () {
              this.isMuted() || 0 === this.getVolume() ? this.recallVolume() : this.setMuted(!0);
            }),
            (i.prototype.isMuted = function () {
              return this.player.isMuted();
            }),
            (i.prototype.storeVolume = function () {
              this.storedVolume = this.getVolume();
            }),
            (i.prototype.recallVolume = function () {
              (this.setMuted(0 === this.storedVolume), this.setVolume(this.storedVolume));
            }),
            (i.prototype.startTransition = function () {
              return new r(this);
            }),
            (i.prototype.onChangedEvent = function () {
              var e = this.isMuted(),
                t = this.getVolume(),
                n = e || 0 === t,
                e = e ? 0 : t;
              (this.storeVolume(), this.events.onChanged.dispatch(this, { volume: e, muted: n }));
            }),
            Object.defineProperty(i.prototype, 'onChanged', {
              get: function () {
                return this.events.onChanged.getEvent();
              },
              enumerable: !1,
              configurable: !0,
            }),
            (i.issuerName = 'ui-volumecontroller'),
            (n.VolumeController = i));
          ((s.prototype.update = function (e) {
            (this.controller.setMuted(!1), this.controller.setVolume(e));
          }),
            (s.prototype.finish = function (e) {
              0 === e
                ? (this.controller.recallVolume(), this.controller.setMuted(!0))
                : (this.controller.setMuted(!1), this.controller.setVolume(e), this.controller.storeVolume());
            }));
          var r = s;
          function s(e) {
            (this.controller = e).storeVolume();
          }
          n.VolumeTransition = r;
        },
        { './eventdispatcher': 83 },
      ],
      116: [
        function (e, t, n) {
          (Object.defineProperty(n, '__esModule', { value: !0 }), (n.VttUtils = void 0));
          function a(e, t, n, o) {
            var i = t === c.Right ? 'vertical-lr' : 'vertical-rl';
            (e.css('writing-mode', i), e.css(c.Top, '0'), d(e, n, t, o));
          }
          function l(e, t, n) {
            if ('auto' === t.position) e.css(n, '0');
            else
              switch (t.positionAlign) {
                case 'line-left':
                  (e.css(n, ''.concat(t.position, '%')),
                    e.css(f.get(n), 'auto'),
                    e.css('justify-content', 'flex-start'));
                  break;
                case 'center':
                  (e.css(n, ''.concat(t.position - t.size / 2, '%')),
                    e.css(f.get(n), 'auto'),
                    e.css('justify-content', 'center'));
                  break;
                case 'line-right':
                  (e.css(n, 'auto'),
                    e.css(f.get(n), ''.concat(100 - t.position, '%')),
                    e.css('justify-content', 'flex-end'));
                  break;
                default:
                  (e.css(n, ''.concat(t.position, '%')), e.css('justify-content', 'flex-start'));
              }
          }
          var c,
            u,
            o,
            p = 21,
            f =
              (((o = c = c || {}).Top = 'top'),
              (o.Bottom = 'bottom'),
              (o.Left = 'left'),
              (o.Right = 'right'),
              ((o = u = u || {}).GrowingRight = 'lr'),
              (o.GrowingLeft = 'rl'),
              new Map([
                [c.Top, c.Bottom],
                [c.Bottom, c.Top],
                [c.Left, c.Right],
                [c.Right, c.Left],
              ])),
            g = function (e, t, n, o) {
              switch (t.lineAlign) {
                case 'center':
                  i(e, n, o);
                  break;
                case 'end':
                  r(e, n, o);
              }
            },
            d = function (e, t, n, o) {
              var i,
                r,
                s = f.get(n);
              'auto' === t.line && t.vertical
                ? e.css(s, '0')
                : ('auto' === t.line && !t.vertical) ||
                  ((r = parseFloat(t.line)),
                  t.snapToLines &&
                    ((i = Number(t.line)), (r = (100 * ((o.height / p) * (i = i < 0 ? p + i : i))) / o.height)),
                  'end' !== t.lineAlign && e.css(s, ''.concat(r, '%')),
                  g(e, t, n, r));
            },
            i = function (e, t, n) {
              switch (t) {
                case c.Bottom:
                  e.css('transform', 'translateY(-50%)');
                  break;
                case c.Left:
                  e.css('transform', 'translateX(50%)');
                  break;
                case c.Right:
                  e.css('transform', 'translateX(-50%)');
              }
            },
            r = function (e, t, n) {
              e.css(t, ''.concat(100 - n, '%'));
            };
          (((o = n.VttUtils = {}).setVttCueBoxStyles = function (e, t) {
            var n = e.vtt,
              e = e.getDomElement(),
              o =
                ((s = e),
                n.region
                  ? (s.css('position', 'relative'), s.css('unicode-bidi', 'plaintext'))
                  : (s.css('position', 'absolute'),
                    s.css('overflow-wrap', 'break-word'),
                    s.css('overflow', 'hidden'),
                    s.css('flex-flow', 'column')),
                s.css('display', 'inline-flex'),
                e),
              i = n,
              r = t;
            switch (i.vertical) {
              case '':
                (o.css('writing-mode', 'horizontal-tb'), o.css(c.Bottom, '0'), d(o, i, c.Bottom, r));
                break;
              case u.GrowingRight:
                a(o, c.Right, i, r);
                break;
              case u.GrowingLeft:
                a(o, c.Left, i, r);
            }
            var s = 'middle' === n.align ? 'center' : n.align,
              t = (e.css('text-align', s), n.size);
            '' === n.vertical
              ? (e.css('width', ''.concat(t, '%')), l(e, n, c.Left))
              : (e.css('height', ''.concat(t, '%')), l(e, n, c.Top));
          }),
            (o.setVttRegionStyles = function (e, t, n) {
              var e = e.getDomElement(),
                o = (n.width * t.viewportAnchorX) / 100 - (((n.width * t.width) / 100) * t.regionAnchorX) / 100,
                n = (n.height * t.viewportAnchorY) / 100 - (28 * t.lines * t.regionAnchorY) / 100;
              (e.css('position', 'absolute'),
                e.css('overflow', 'hidden'),
                e.css('width', ''.concat(t.width, '%')),
                e.css(c.Left, ''.concat(o, 'px')),
                e.css(c.Right, 'unset'),
                e.css(c.Top, ''.concat(n, 'px')),
                e.css(c.Bottom, 'unset'),
                e.css('height', ''.concat(28 * t.lines, 'px')));
            }));
        },
        {},
      ],
    },
    {},
    [93],
  )(93);
});
//# sourceMappingURL=bitmovinplayer-ui.min.js.map
