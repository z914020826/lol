window.addEventListener("load", function () {
  //H5界面加载完之后
  var comm_topact = document.querySelector(".comm-topact");
  // 轮播图部分

  var m_promo = document.querySelector(".m-promo"); //整体的轮播图
  var arrow_l = document.querySelector(".arrow-l"); //左侧按钮
  var arrow_r = document.querySelector(".arrow-r"); //右侧按钮
  var promo_img_list = document.querySelector(".promo-img-list"); //轮播图图片
  var title = m_promo.querySelectorAll(".title"); //标题
  var promoWidth = m_promo.offsetWidth; //图片的宽度
  // 鼠标经过显示左右箭头，鼠标离开隐藏左右箭头
  m_promo.addEventListener("mouseenter", function () {
    arrow_l.style.display = "block";
    arrow_r.style.display = "block";
    clearInterval(timer); //清除自动播放
    timer = null;
  });
  m_promo.addEventListener("mouseleave", function () {
    arrow_l.style.display = "none";
    arrow_r.style.display = "none";
    timer = setInterval(function () {
      arrow_r.click();
    }, 2000);
  });
  // 点击右箭头 图片滚动一张
  var num = 0; //图片距离左侧的变量
  var t = 0; //使标题和图片对照一致的变量
  var first = promo_img_list.children[0].cloneNode(true); //把第一张图片克隆放到最后
  promo_img_list.appendChild(first);
  var flag = true; //判断
  arrow_r.addEventListener("click", function () {
    if (true) {
      flag = false;
      //如果图片移动到最后一个，那么将播放至第一个
      if (num == promo_img_list.children.length - 1) {
        promo_img_list.style.left = "0";
        num = 0;
      }
      num++;
      // 移动图片
      animate(promo_img_list, -num * promoWidth, function () {
        flag = true;
      });
      t++;
      //如果标题移动到最后一个，那么将移动到第一个
      if (t == title.length) {
        t = 0;
      }
      change();
    }
  });
  // 点击左箭头 图片滚动一张
  arrow_l.addEventListener("click", function () {
    if (true) {
      flag = false;
      if (num == 0) {
        promo_img_list.style.left = -num * promoWidth + "px";
        num = promo_img_list.children.length - 1;
      }
      num--;
      animate(promo_img_list, -num * promoWidth, function () {
        flag = true;
      });
      t--;
      if (t < 0) {
        t = title.length - 1;
      }
      change();
    }
  });
  //自动播放的定时器
  var timer = setInterval(function () {
    arrow_r.click();
  }, 2000);
  //使页面打开时第一个标题默认使选择的状态
  title[0].className = "title selected";
  // 当鼠标放上的每个标题上，标题将会出现的样式
  for (var i = 0; i < title.length; i++) {
    title[i].setAttribute("index", i); //获取标题的下标
    title[i].addEventListener("mouseenter", function () {
      for (var i = 0; i < title.length; i++) {
        //先清除所有标题的样式
        title[i].className = "title";
      }
      var index = this.getAttribute("index");
      //设置所选择的标题的样式
      this.className = "title selected";
      //使两个变量都等于所选择的下标
      t = index;
      num = index;
      //当鼠标放置标题上时，使其图片对应一直
      animate(promo_img_list, -index * promoWidth);
    });
  }
  function change() {
    for (var i = 0; i < title.length; i++) {
      title[i].className = "title";
    }
    title[t].className = "title selected";
  }

  // 新闻公告部分
  var part_tab_title = this.document.querySelector(".part-tab-title");
  var content_ul = this.document.querySelectorAll(".new-tab-content-ul");
  part_tab_title.children[0].className = "selected";
  // 标题选中样式
  for (var i = 0; i < part_tab_title.children.length; i++) {
    part_tab_title.children[i].setAttribute("index", i);
    part_tab_title.children[i].addEventListener("mouseenter", function () {
      for (var i = 0; i < part_tab_title.children.length; i++) {
        part_tab_title.children[i].className = "";
      }
      var index = this.getAttribute("index");
      this.className = "selected";
      for (var i = 0; i < content_ul.length; i++) {
        content_ul[i].className = "new-tab-content-ul content-close";
      }
      content_ul[index].className = "new-tab-content-ul content-show";
    });
  }

  // 热门活动部分
  var m_act = this.document.querySelector(".m-act");
  var part_hot_title = m_act.querySelector(".part-tab-title");
  var m_act_list = m_act.querySelector(".m-act-list");
  for (var i = 0; i < part_hot_title.children.length; i++) {
    part_hot_title.children[i].setAttribute("index", i);
    part_hot_title.children[i].addEventListener("mouseenter", function () {
      for (var i = 0; i < part_hot_title.children.length; i++) {
        part_hot_title.children[i].className = "";
      }
      this.className = "selected";
      var index = this.getAttribute("index");
      for (var i = 0; i < m_act_list.children.length; i++) {
        m_act_list.children[i].className = "act-close";
      }
      m_act_list.children[index].className = "act-show";
    });
  }

  // 近期赛程拖拽
  var sc = document.querySelector(".game-sc");
  var move_left = document.querySelector(".icon-left-arrow");
  var move_right = this.document.querySelector(".icon-right-arrow");
  // starX 鼠标点击时的坐标 moveX鼠标移动后的坐标 boxX 盒子的坐标 mdX鼠标移动位置与盒子的偏移值 endX盒子当前的坐标
  var starX, moveX, boxX, mdX, endX;
  sc.addEventListener("mousedown", function (e) {
    var e = e || window.event;
    starX = e.pageX; //鼠标距离窗口的距离
    boxX = sc.offsetLeft; //盒子到左侧的距离
    mdX = starX - boxX;
    document.addEventListener("mousemove", mouseMove2);
    document.addEventListener("mouseup", mouseUp2);
  });
  function mouseMove2(e) {
    boxX = sc.offsetLeft;
    var e = e || window.event;
    moveX = e.pageX; //鼠标移动后的坐标
    endX = moveX - mdX;
    if (endX > 0) {
      endX = 0;
    } else if (endX < -1375) {
      endX = -1375;
    }
    sc.style.left = endX + "px";
  }

  function mouseUp2() {
    document.removeEventListener("mousemove", mouseMove2);
  }

  //版本更新
  var week_free = document.querySelector(".week-free-champion");
  var week_free_hover = document.querySelector(".week-free-hover");
  week_free.addEventListener("mouseenter", function () {
    week_free_hover.className = "week-free-hover show";
  });
  week_free.addEventListener("mouseleave", function () {
    week_free_hover.className = "week-free-hover";
  });

  //更多皮肤
  var new_skin = document.querySelector(".m-new-skin-one");

  var more_skin = document.querySelector(".m-more-skin");
  new_skin.addEventListener("mouseenter", function () {
    more_skin.className = "m-more-skin show";
  });
  more_skin.addEventListener("mouseenter", function () {
    more_skin.className = "m-more-skin show";
  });
  new_skin.addEventListener("mouseleave", function () {
    more_skin.className = "m-more-skin";
  });
  more_skin.addEventListener("mouseleave", function () {
    more_skin.className = "m-more-skin";
  });

  // 最新视频部分

  var fresh_video = document.querySelector(".m-fresh-video");
  var video_title = fresh_video.querySelector(".part-tab-title");
  var video_content = fresh_video.querySelectorAll(".fresh-video-content");
  var video_item = document.querySelector(".video-item");
  var video_img = video_item.querySelectorAll(".video-pre-img");
  var video_bar = video_item.querySelector(".video-pre-bar i");
  for (var i = 0; i < video_title.children.length; i++) {
    video_title.children[i].setAttribute("index", i);
    video_title.children[i].addEventListener("mouseenter", function () {
      for (var i = 0; i < video_title.children.length; i++) {
        video_title.children[i].className = "";
      }
      this.className = "selected";
      var index = this.getAttribute("index");
      for (var i = 0; i < video_content.length; i++) {
        video_content[i].className = "fresh-video-content act-close";
      }
      video_content[index].className = "fresh-video-content act-show";
    });
  }
  var w;
  video_item.addEventListener("mousemove", function (e) {
    var x = e.pageX - 80;
    console.log(x);
    var index;
    if (x % 24 == 0 && x >= 0 && x <= 192) {
      console.log(w);
      if (x < 24) {
        index = 1;
      } else {
        index = Math.floor(x / 24);
      }
      video_img[0].src = "images/hp0" + index + ".jpg";
      video_bar.style.width = index * 12.5 + "%";
    }
  });
  // 热门专辑
  var hotprogram = document.querySelector(".m-hotprogram");
  var hot_title = hotprogram.querySelector(".part-tab-title"); //标题
  var swiper_wrapper = document.querySelectorAll(
    ".hotprogram-list>.swiper-wrapper"
  ); //各个ul
  var hotprogram_list = document.querySelector(".hotprogram-list-wrap"); //各个li
  var list_left = hotprogram_list.querySelector(".hotprogram-list-left"); //左箭头
  var list_right = hotprogram_list.querySelector(".hotprogram-list-right"); //右箭头

  var imgWidth = swiper_wrapper[0].children[0].offsetWidth + 15;
  var hot = 0;
  var index;
  for (var i = 0; i < hot_title.children.length; i++) {
    hot_title.children[i].setAttribute("index", i);
    hot_title.children[i].addEventListener("mouseenter", function () {
      for (var i = 0; i < hot_title.children.length; i++) {
        hot_title.children[i].className = ""; //将所有的类都清空
      }
      this.className = "selected"; //将所选中的标题给上类名
      index = this.getAttribute("index"); //将标题的index的值进行赋值
      if (index == 0) {
        //如果选中的是第一个，这隐藏箭头
        list_left.style.display = "none";
        list_right.style.display = "none";
      }
      if (index > 0) {
        list_left.style.display = "block";
        list_right.style.display = "block";
      }
      for (var i = 0; i < swiper_wrapper.length; i++) {
        swiper_wrapper[i].className = "swiper-wrapper act-close";
      }
      swiper_wrapper[index].className = "swiper-wrapper act-show";
    });
  }
  // 点击右侧图片，图片右滑
  list_right.addEventListener("click", function () {
    hot++;
    if (hot > swiper_wrapper[index].children.length - 3) {
      swiper_wrapper[index].style.left = "0";
      hot = 0;
    }
    console.log(hot);
    animate(swiper_wrapper[index], -hot * imgWidth);
  });

  // 点击右侧图片，图片右滑
  list_left.addEventListener("click", function () {
    hot--;
    if (hot < 0) {
      swiper_wrapper[index].style.left = -hot * imgWidth + "px";
      hot = swiper_wrapper[index].children.length - 3;
    }
    console.log(hot);
    animate(swiper_wrapper[index], -hot * imgWidth);
  });

  // 登录界面
  var login = document.querySelector(".login");
  var mask = document.querySelector(".login-bg");
  var link = document.querySelector("#link");
  var closeBtn = document.querySelector("#closeBtn");
  var login_title = document.querySelector("#title");
  link.addEventListener("click", function () {
    mask.style.display = "block";
    login.style.display = "block";
  });
  closeBtn.addEventListener("click", function () {
    mask.style.display = "none";
    login.style.display = "none";
  });
  login_title.addEventListener("mousedown", function (e) {
    var x = e.pageX - login.offsetLeft;
    var y = e.pageY - login.offsetTop;
    function move(e) {
      login.style.left = e.pageX - x + "px";
      login.style.top = e.pageY - y + "px";
    }
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", move);
    });
  });

  // 视频播放界面
  var new_skin = document.querySelector(".m-new-skin-one");
  var btn_play = new_skin.querySelector(".btn-play-1");
  var skin_video = document.querySelector(".skin-video");
  var video = skin_video.querySelector("video");
  var btn_close = skin_video.querySelector(".btn-close");
  btn_play.addEventListener("click", function () {
    skin_video.style.display = "block";
    mask.style.display = "block";
  });
  btn_close.addEventListener("click", function () {
    skin_video.style.display = "none";
    video.autoplay = "";
    mask.style.display = "none";
  });

  // 旋转木马

  //每张图片围绕着Y轴转动等分角度，再沿Z轴平移一定距离
  function init() {
    var img = document.querySelectorAll(".muma");
    var len = img.length;
    var deg = 360 / len;
    for (var i = 0; i < len; i++) {
      img[i].style.cssText = `transform: rotateY(${
        deg * i
      }deg) translateZ(350px);
                        transition: transform 1s ${(len - i) * 0.1}s;`;
    }
    bindEvent();
  }

  var body = document.body;
  var box = document.getElementById("box");
  var lastX,
    lastY,
    nowX,
    nowY,
    disX = 0,
    disY = 0,
    roY = 0,
    roX = -10, //初始box的rotateX为-10deg
    timer;

  //监听鼠标按下事件
  function bindEvent() {
    body.addEventListener("mousedown", mouseDown);
  }

  //鼠标按下事件执行的方法
  //鼠标按下后，同时监听鼠标移动和鼠标松开事件
  function mouseDown(e) {
    clearInterval(timer);
    var e = e || window.event;
    e.preventDefault();
    lastX = e.clientX; //鼠标点击的位置
    lastY = e.clientY;
    body.addEventListener("mousemove", mouseMove);
    body.addEventListener("mouseup", mouseUp);
  }

  //鼠标移动事件方法
  //根据鼠标移动的偏移量，设置box的XY轴转动角度
  function mouseMove(e) {
    var e = e || window.event;
    nowX = e.clientX; //鼠标拖动停留的位置
    nowY = e.clientY;
    disX = nowX - lastX; //鼠标移动的坐标就是停留的坐标减去起始的坐标
    disY = nowY - lastY;
    roX -= disY * 0.2; //围着X轴旋转需要上下来移动 向下移动越大，负旋转的角度越大
    roY += disX * 0.2; //围着Y轴旋转需要左右移动来实现 向右移动越大 旋转角度越大
    box.style.cssText = `transform:rotateX(${roX}deg) rotateY(${roY}deg);
cursor:move;`;
    lastX = nowX;
    lastY = nowY;
  }

  //鼠标松开事件方法
  //鼠标松开后，设置转动角度逐渐减小的循环函数，在转动角度可以忽略不计时，停止循环
  function mouseUp() {
    body.removeEventListener("mousemove", mouseMove); //当鼠标松开 就清楚鼠标移动的函数
    clearInterval(timer);
    timer = setInterval(function () {
      disX *= 0.98;
      disY *= 0.98;
      roX -= disY * 0.2;
      roY += disX * 0.2; //使旋转慢慢停下来
      box.style.cssText = `transform:rotateX(${roX}deg) rotateY(${roY}deg);
    cursor:pointer;`;
      if (Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1) {
        clearInterval(timer); //到达一定的距离停下来
      }
    }, 20);
  }

  init();

  // 手风琴
  var menu_items = document.querySelectorAll(".menu-contain > li");
  for (var i = 0; i < menu_items.length; i++) {
    menu_items[i].addEventListener("mouseover", function () {
      for (var j = 0; j < menu_items.length; j++) {
        menu_items[j].className = "";
        menu_items[j].children[1].children[0].style.display =
          menu_items[j].children[0].children[1].style.display =
          menu_items[j].children[0].children[2].style.display =
            "none";
      }
      this.className = "active";
      this.children[1].children[0].style.display =
        this.children[0].children[1].style.display =
        this.children[0].children[2].style.display =
          "block";
    });
  }

  // 侧边栏
  var rightnav_bar = document.querySelector(".rightnav-bar");
  var rn_rmhd = document.querySelector(".rn-rmhd"); //热门活动
  var rn_spzx = document.querySelector(".rn-spzx"); //视频中心
  var rn_sszx = document.querySelector(".rn-sszx"); //赛事中心
  var rn_yxtj = document.querySelector(".rn-yxtj"); //旋转木马
  var rn_fanart = document.querySelector(".rn-fanart"); //旋转木马
  var rn_polo = document.querySelector(".rn-polo"); //返回顶部
  document.addEventListener("scroll", function () {
    if (window.pageYOffset >= 300) {
      rightnav_bar.className = "rightnav-bar show showTop";
    } else {
      rightnav_bar.className = "rightnav-bar show";
    }
    if (window.pageYOffset >= 400 && window.pageYOffset <= 1300) {
      rn_rmhd.className = "rightnav-bar-li rn-rmhd selected";
    } else {
      rn_rmhd.className = "rightnav-bar-li rn-rmhd";
    }
    if (window.pageYOffset >= 1301 && window.pageYOffset <= 1780) {
      rn_spzx.className = "rightnav-bar-li rn-spzx selected";
    } else {
      rn_spzx.className = "rightnav-bar-li rn-spzx";
    }
    if (window.pageYOffset >= 1781 && window.pageYOffset <= 2600) {
      rn_sszx.className = "rightnav-bar-li rn-sszx selected";
    } else {
      rn_sszx.className = "rightnav-bar-li rn-sszx";
    }
    if (window.pageYOffset >= 2601 && window.pageYOffset <= 3400) {
      rn_yxtj.className = "rightnav-bar-li rn-yxtj selected";
    } else {
      rn_yxtj.className = "rightnav-bar-li rn-yxtj";
    }
    if (window.pageYOffset >= 3401 && window.pageYOffset <= 3700) {
      rn_fanart.className = "rightnav-bar-li rn-fanart selected";
    } else {
      rn_fanart.className = "rightnav-bar-li rn-fanart";
    }
  });
  // var polo_timer = null;
  // rn_polo.addEventListener('click', function () {
  //     polo_timer = setInterval(function () {
  //         var backTop = document.documentElement.scrollTop;
  //         var topSpeed = backTop / 1.2;
  //         document.documentElement.scrollTop -= (backTop - topSpeed);
  //         if (backTop == 0) {
  //             clearInterval(polo_timer)
  //         }
  //     }, 20)
  // })
  rn_polo.addEventListener("click", function () {
    document.documentElement.scrollTop = 0;
  });
  rn_rmhd.addEventListener("click", function () {
    document.documentElement.scrollTop = 800;
  });
  rn_spzx.addEventListener("click", function () {
    document.documentElement.scrollTop = 1600;
  });
  rn_sszx.addEventListener("click", function () {
    document.documentElement.scrollTop = 2160;
  });
  rn_yxtj.addEventListener("click", function () {
    document.documentElement.scrollTop = 2910;
  });
  rn_fanart.addEventListener("click", function () {
    document.documentElement.scrollTop = 3545;
  });

  document.addEventListener("click", function () {
    console.log(document.documentElement.scrollTop);
  });
});
