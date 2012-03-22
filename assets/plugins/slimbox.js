/*
	Slimbox v2.02 - The ultimate lightweight Lightbox clone for jQuery
	(c) 2007-2009 Christophe Beyls <http://www.digitalia.be>
	MIT-style license.
*/
(function (w) {
	var E = w(window),
		u, g, F = -1,
		o, x, D, v, y, L, s, n = !window.XMLHttpRequest,
		e = window.opera && (document.compatMode == "CSS1Compat") && (w.browser.version >= 9.3),
		m = document.documentElement,
		l = {},
		t = new Image(),
		J = new Image(),
		H, a, h, q, I, d, G, c, A, K;
	w(function () {
		w("body").append(w([H = w('<div id="lbOverlay" />')[0], a = w('<div id="lbCenter" />')[0], G = w('<div id="lbBottomContainer" />')[0]]).css("display", "none"));
		h = w('<div id="lbImage" />').appendTo(a).append(q = w('<div id="lbNav"/>').append([I = w('<a id="lbPrevLink" href="#" />').click(B)[0], d = w('<a id="lbNextLink" href="#" />').click(f)[0]])[0])[0];
		c = w('<div id="lbBottom" />').appendTo(G).append([w('<a id="lbCloseLink" href="#">x</div>').add(H).click(C)[0], A = w('<div id="lbCaption" />')[0], K = w('<div id="lbNumber" />')[0], w('<div style="clear: both;" />')[0]])[0]
	});
	w.slimbox = function (O, N, M) {
		u = w.extend({
			loop: true,
			overlayOpacity: 0.8,
			overlayFadeDuration: 300,
			resizeDuration: 300,
			resizeEasing: "swing",
			initialWidth: 250,
			initialHeight: 250,
			imageFadeDuration: 300,
			captionAnimationDuration: 300,
			counterText: "Image {x} of {y}",
			closeKeys: [27, 88, 67],
			previousKeys: [666],
			nextKeys: [999]
		}, M);
		if (typeof O == "string") {
			O = [
				[O, N]
			];
			N = 0
		}
		y = E.scrollTop() + ((e ? m.clientHeight : E.height()) / 2);
		L = u.initialWidth;
		s = u.initialHeight;
		w(a).show();
		v = n || (H.currentStyle && (H.currentStyle.position != "fixed"));
		if (v) {
			H.style.position = "absolute"
		}
		w(H).css("opacity", u.overlayOpacity).fadeIn(u.overlayFadeDuration);
		z();
		k(1);
		g = O;
		u.loop = u.loop && (g.length > 1);
		return b(N)
	};
	w.fn.slimbox = function (M, P, O) {
		P = P ||
		function (Q) {
			return [Q.href, Q.title]
		};
		O = O ||
		function () {
			return true
		};
		var N = this;
		return N.unbind("click").click(function () {
			var S = this,
				U = 0,
				T, Q = 0,
				R;
			T = w.grep(N, function (W, V) {
				return O.call(S, W, V)
			});
			for (R = T.length; Q < R; ++Q) {
				if (T[Q] == S) {
					U = Q
				}
				T[Q] = P(T[Q], Q)
			}
			return w.slimbox(T, U, M)
		})
	};

	function z() {
		var N = E.scrollLeft(),
		M = e ? m.clientWidth : E.width();
	}

	function k(M) {
		w("object").add(n ? "select" : "embed").each(function (O, P) {
			if (M) {
				w.data(P, "slimbox", P.style.visibility)
			}
			P.style.visibility = M ? "hidden" : w.data(P, "slimbox")
		});
		var N = M ? "bind" : "unbind";
		E[N]("scroll resize", z);
		w(document)[N]("keydown", p)
	}

	function p(O) {
		var N = O.keyCode,
			M = w.inArray;
		return (M(N, u.closeKeys) >= 0) ? C() : (M(N, u.nextKeys) >= 0) ? f() : (M(N, u.previousKeys) >= 0) ? B() : false
	}

	function B() {
		return b(x)
	}

	function f() {
		return b(D)
	}

	function b(M) {
		if (M >= 0) {
			F = M;
			o = g[F][0];
			x = (F || (u.loop ? g.length : 0)) - 1;
			D = ((F + 1) % g.length) || (u.loop ? 0 : -1);
			r();
			a.className = "lbLoading";
			l = new Image();
			l.onload = j;
			l.src = o
		}
		return false
	}

	function j() {
		a.className = "";
		w(h).css({
			backgroundImage: "url(" + o + ")",
			visibility: "hidden",
			display: ""
		});
		// w(q).width(l.width);
		// w([q, I, d]).height(l.height);
		w(A).html(g[F][1] || "");
		w(K).html((((g.length > 1) && u.counterText) || "").replace(/{x}/, F + 1).replace(/{y}/, g.length));
		if (x >= 0) {
			t.src = g[x][0]
		}
		if (D >= 0) {
			J.src = g[D][0]
		}
		L = h.offsetWidth;
		s = h.offsetHeight;
		var M = Math.max(0, y - (s / 2));
		w(a).queue(function () {
			w(G).css({
				visibility: "hidden",
				display: ""
			});
			w(h).css({
				display: "none",
				visibility: "",
				opacity: ""
			}).fadeIn(u.imageFadeDuration, i)
		})
	}

	function i() {
		if (x >= 0) {
			w(I).show()
		}
		if (D >= 0) {
			w(d).show()
		}
		G.style.visibility = ""
	}

	function r() {
		l.onload = null;
		l.src = t.src = J.src = o;
		w([a, h, c]).stop(true);
		w([I, d, h, G]).hide()
	}

	function C() {
		if (F >= 0) {
			r();
			F = x = D = -1;
			w(a).hide();
			w(H).stop().fadeOut(u.overlayFadeDuration, k)
		}
		return false
	}
})(jQuery);

// AUTOLOAD CODE BLOCK (MAY BE CHANGED OR REMOVED)
jQuery(function ($) {
	$("a[rel^='lightbox']").slimbox({ /* Put custom options here */
	}, null, function (el) {
		return (this == el) || ((this.rel.length > 8) && (this.rel == el.rel));
	});
});