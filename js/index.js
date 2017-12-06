window.addEventListener("load",function () {
    searchEffect();
    countDownEffect();
    slideEffect();
});
//搜索框
function searchEffect() {
    var header = document.querySelector("#header");
    var slideHeight = document.querySelector("#slide").offsetHeight;
    window.addEventListener("scroll",function () {
        var scrolllTop = 0;
        if(document.documentElement.scrollTop) {
            scrolllTop = document.documentElement.scrollTop;
        } else {
            scrolllTop = document.body.scrollTop;
        }
        var opacity = scrolllTop / slideHeight;
        if(scrolllTop < slideHeight) {
            header.style.backgroundColor = "rgba(255,0,0,"+ opacity +")";
        } else {
            header.style.backgroundColor = "rgba(255,0,0,1)";
        }

    });
}
    
//倒计时
function countDownEffect() {
    var countBox = document.querySelector(".sk-time");
    var span = countBox.querySelectorAll("span");
    var fetureDate = new Date(2017,11,7,4,0,0).getTime();
    // console.log(fetureDate);
    var date = new Date().getTime();
    // console.log(date);
    var time = Math.floor((fetureDate - date)/1000);
    // console.log(time);
    var timerId = setInterval(function () {
        if(time <= 0) {
            clearInterval(timerId);
            return false;
        }
        // time --;
        var hour = Math.floor(time / 3600);
        //console.log(hour);
        var minute = Math.floor(time % 3600 / 60);
        //console.log(minute);
        var second = Math.floor(time % 60);
        //console.log(second);
        span[0].innerHTML = Math.floor(hour / 10);
        span[1].innerHTML = Math.floor(hour % 10);
        span[3].innerHTML = Math.floor(minute / 10);
        span[4].innerHTML = Math.floor(minute % 10);
        span[6].innerHTML = Math.floor(second/10);
        span[7].innerHTML = Math.floor(second % 10);
    },1000);
}
//轮播图
function slideEffect() {
    var index = 1;
    var slide = document.querySelector("#slide");
    var slideUl = slide.children[0];
    // console.log(ul1);
    var width = slide.offsetWidth;
    // console.log(width);
    var dot = slide.children[1];
    var lis = dot.querySelectorAll("li");
    // console.log(lis);
    var timerId = null;
    function startTime() {
        timerId = setInterval(function () {
            index++;
            // slideUl.style.transform = "translateX("+ (-index * width) + "px)";
            slideUl.style.transform = "translate3d("+ (-index * width) + "px,0px,0px)";
            slideUl.style.transition = "all 0.2s";
            // setTimeout(function () {
            //     if(index >= 9) {
            //         index = 1;
            //         slideUl.style.transform = "translateX("+ (-index * width) + "px)";
            //         slideUl.style.transition = "none";
            //     }
            // },200);
        },1000);
    }
    startTime();
    slideUl.addEventListener("transitionend",function () {
        if(index >= 9) {
            index = 1;
            slideUl.style.transform = "translate3d("+ (-index * width) + "px,0px,0px)";
            slideUl.style.transition = "none";
        } else if(index <= 0) {
            index = 8;
            slideUl.style.transform = "translate3d("+ (-index * width) + "px,0px,0px)";
            slideUl.style.transition = "none";
        }
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove("active");
        }
        lis[index - 1].classList.add("active");
    });

    var startX = moveX = distanceX = 0;

    slideUl.addEventListener("touchstart",function (e) {
       startX = e.touches[0].clientX;
        clearInterval(timerId);
    });

    slideUl.addEventListener("touchmove",function (e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        slideUl.style.transform = "translate3d("+ (-index * width + distanceX) + "px,0px,0px)";
        slideUl.style.transition = "none";
    });

    slideUl.addEventListener("touchend",function () {
        if(Math.abs(distanceX) > (width / 3)) {
            if(distanceX > 0) {
                index--;
            } else {
                index++;
            }
            slideUl.style.transform = "translate3d("+ (-index * width) + "px,0px,0px)";
            slideUl.style.transition = "all 0.2s";
        } else {
            slideUl.style.transform = "translate3d("+ (-index * width) + "px,0px,0px)";
            slideUl.style.transition = "all 0.2s";
        }
        startTime();
    });
}