// 头部JS
window.addEventListener("load", function () {
  document.documentElement.scrollTop = 0;
  var comm_topact = document.querySelector(".comm-topact");
  var app = document.querySelector(".head-app-hover");
  var app_icon = this.document.querySelector(".head-app-normal");
  var head_userinfo_normal = this.document.querySelector(
    ".head-userinfo-normal"
  );
  var head_login_hover = this.document.querySelector(".head-login-hover");
  var head_nav = this.document.querySelector(".head-nav");
  var head_nav_sub = this.document.querySelector(".head-nav-sub");
  var head_search_btn = this.document.querySelector(".head-search-btn");
  var search_hover_wrap = this.document.querySelector(".search-hover-wrap");
  var btn_close_search = this.document.querySelector(".btn-close-search");
  window.onscroll = function () {
    var scorllT = document.documentElement.scrollTop;
    if (scorllT > 0) {
      comm_topact.className = "comm-topact";
    }
  };
  var scrollFunc = function (e) {
    e = e || window.event;
    if (e.wheelDelta) {
      if (e.wheelDelta < 0) {
        //当滑轮向下滚动时
        comm_topact.className = "comm-topact";
      }
    }
  };
  window.onmousewheel = document.onmousewheel = scrollFunc;

  app.onmouseenter = function () {
    app.style.display = "block";
  };
  app.onmouseleave = function () {
    app.style.display = "none";
  };
  app_icon.addEventListener("mouseover", function () {
    app.className = "head-app-hover show";
  });
  app_icon.addEventListener("mouseleave", function () {
    setTimeout(function () {
      app.className = "head-app-hover";
    }, 200);
  });
  head_userinfo_normal.addEventListener("mouseenter", function () {
    head_login_hover.className = "head-login-hover show";
  });
  head_userinfo_normal.addEventListener("mouseleave", function () {
    head_login_hover.className = "head-login-hover";
  });
  head_nav.addEventListener("mouseenter", function () {
    head_nav_sub.className = "head-nav-sub show";
  });
  head_nav.addEventListener("mouseleave", function () {
    head_nav_sub.className = "head-nav-sub";
  });
  head_nav_sub.addEventListener("mouseenter", function () {
    head_nav_sub.className = "head-nav-sub show";
  });
  head_nav_sub.addEventListener("mouseleave", function () {
    head_nav_sub.className = "head-nav-sub";
  });
  head_search_btn.addEventListener("click", function () {
    // search_hover_wra.style.display = 'block'
    search_hover_wrap.className = "search-hover-wrap show";
  });
  btn_close_search.addEventListener("click", function () {
    // search_hover_wrap.style.display = 'none'
    search_hover_wrap.className = "search-hover-wrap";
  });
});
