window.addEventListener("load",function () {
    leftSwipe();
});
function leftSwipe() {
    var parent = document.querySelector(".category-left");
    var child = document.querySelector(".ul");
    var parentH = parent.offsetHeight;
    var childH = child.offsetHeight;
    var maxSwipe = 0 + 100;
    var minSwipe = -(parentH - childH + 100);
    var maxPosition = 0;
    var minPosition = -(parentH - childH);
   // console.log(ulLeft);
    var startY = moveY = distanceY = currentY = 0;
    child.addEventListener("touchstart",function (e) {
        startY = e.touches[0].clientY;
    });
    child.addEventListener("touchmove",function (e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        if ((currentY + distanceY) > minSwipe || (currentY + distanceY) < maxSwipe) {
            child.style.transform = "translateY("+ (currentY + distanceY) +"px)";
        }
    });
    child.addEventListener("touchend",function () {
        currentY += distanceY;
    });
}