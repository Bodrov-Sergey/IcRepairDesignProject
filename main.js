//match height
function matchHeight(currentClass, dischargeWidth) {
    if (window.innerWidth >= dischargeWidth) {
        elemClass = document.querySelectorAll(currentClass);
        let heightArr = [];
        for (let elem of elemClass) {
            heightArr.push(elem.offsetHeight)
        }
        let trueHeight = 0;
        for (let i of heightArr) {
            if (i > trueHeight) {
                trueHeight = i;
            }
        }
        for (elem of elemClass) {
            elem.style.height = `${trueHeight}px`;
        }
    }
}
matchHeight(".types__list", 850);
matchHeight(".clients__content", 1004);

//slider
function slider(sliderNamesObj) {
    let imgArray = document.querySelectorAll(`.${sliderNamesObj.imgClassName}`);
    let arrowArray = document.querySelectorAll(`.${sliderNamesObj.arrowsClassName}`);
    let titleArray;
    let dotsArray;
    if (sliderNamesObj.dotsClassName) {
        dotsArray = document.querySelectorAll(`.${sliderNamesObj.dotsClassName}`);
        initDotsTitles(dotsArray);
    };
    if (sliderNamesObj.navigationTitles) {
        titleArray = document.querySelectorAll(`.${sliderNamesObj.navigationTitles}`);
        initDotsTitles(titleArray);
    };

    initArrow();

    function initArrow() {
        arrowArray.forEach(arrow => {
            arrow.addEventListener("click", function () {
                let currentNum = +document.querySelector(`.${sliderNamesObj.imgClassName}_active`).dataset.index;
                let nextNumber;
                if (arrow.classList.contains("left")) {
                    nextNumber = currentNum === 0 ? imgArray.length - 1 : currentNum - 1;
                } else {
                    nextNumber = currentNum == imgArray.length - 1 ? 0 : currentNum + 1;
                }
                moveSlider(nextNumber);
            });
        });
    };

    function initDotsTitles(array) {
        array.forEach((dot, index) => {
            dot.addEventListener("click", function () {
                moveSlider(index);
            })
        })

    };

    function moveSlider(num) {
        document.querySelector(`.${sliderNamesObj.imgClassName}_active`).classList.remove(`${sliderNamesObj.imgClassName}_active`);
        document.querySelector(".n" + num).classList.add(`${sliderNamesObj.imgClassName}_active`);

        if (sliderNamesObj.navigationTitles) {
            document.querySelector(`.${sliderNamesObj.navigationTitles}_active`).classList.remove(`${sliderNamesObj.navigationTitles}_active`);
            titleArray[num].classList.add(`${sliderNamesObj.navigationTitles}_active`);

        };
        if (sliderNamesObj.dotsClassName) {
            document.querySelector(`.${sliderNamesObj.dotsClassName}_active`).classList.remove(`${sliderNamesObj.dotsClassName}_active`);
            dotsArray[num].classList.add(`${sliderNamesObj.dotsClassName}_active`);

        };
        if (sliderNamesObj.description) {
            sliderNamesObj.description(num);
        }
    }

};

let projectSlider = {
    imgClassName: "slider__image",
    arrowsClassName: "projects__arrow",
    navigationTitles: "nav__item",
    dotsClassName: "control__point",
    description: projectDescMove
}

function projectDescMove (number){
    let descArr = document.querySelectorAll(".criteria__description");
    switch (number){
        case 0:
            descArr[0].innerHTML = `Rostov-on-Don <br>LCD admiral`;
            descArr[1].innerHTML = `81 m<sup>2</sup>`;
            descArr[2].innerHTML = `3.5 months`;
            descArr[3].innerHTML = `Upon request`;
            break;
        case 1:
            descArr[0].innerHTML = `Sochi <br>Thieves`;
            descArr[1].innerHTML = `105m<sup>2</sup>`;
            descArr[2].innerHTML = `4 months`;
            descArr[3].innerHTML = `Upon request`;
            break;
        case 2:
            descArr[0].innerHTML = `Rostov-on-Don <br>Patriotic`;
            descArr[1].innerHTML = `93m<sup>2</sup>`;
            descArr[2].innerHTML = `3 months`;
            descArr[3].innerHTML = `Upon request`;
            break;
    };
}

document.addEventListener("DOMContentLoaded", slider(projectSlider));
