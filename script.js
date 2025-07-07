'use strict'

let btnShowContacts = document.querySelector('.show-contacts');
let btnConsult = document.querySelector('.consult');
let btnCloseContacts = document.querySelector('#close-contacts');
let dialogContacts = document.querySelector('#dialog-contacts');


btnShowContacts.addEventListener('click', function () {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.scrollbarGutter = 'stable';
    dialogContacts.showModal();

});

btnConsult.addEventListener('click', function () {
    btnShowContacts.click();
})

btnCloseContacts.addEventListener('click', function () {

    dialogContacts.classList.add('closing');
    setTimeout(function () {
        dialogContacts.close();
        dialogContacts.classList.remove('closing');
        document.body.style.overflow = '';
        document.documentElement.style.scrollbarGutter = '';
    }, 200);
});

dialogContacts.addEventListener('click', function (event) {
    if (event.target === dialogContacts) {
        dialogContacts.classList.add('closing');
        setTimeout(function () {
            dialogContacts.close();
            dialogContacts.classList.remove('closing');
            document.body.style.overflow = '';
            document.documentElement.style.scrollbarGutter = '';
        }, 200);
    }
});

//MARK: ловушка фокуса ---------------------------------------------------
dialogContacts.addEventListener('keydown', function (event) {
    //при нажатой tab ----------------------------------------------
    if (event.key === 'Tab') {
        let selectorsList = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
        //находим нодлист для определения первого и последнего фокусируемого элемента ---
        let focusableElements = dialogContacts.querySelectorAll(selectorsList);

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            // Shift + Tab ---------------------------------------------------------
            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } else {
            // Просто Tab
            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    }
});

//переменная марджина для кнопки btnShowContacts -------------------

let viewportWidth = document.documentElement.clientWidth; // ширина экрана без полосы прокрутки
let x = (viewportWidth - 1250) / 2;

let rootStyles = getComputedStyle(document.documentElement);
let marginLeftBtnShow = rootStyles.getPropertyValue('--margin-left-btnShow').trim();

    if (x > btnShowContacts.offsetWidth) {
        marginLeftBtnShow = ((x - btnShowContacts.offsetWidth) / 2 + x + 1250) + 'px'; 
    } else {

    }

document.documentElement.style.setProperty('--margin-left-btnShow', marginLeftBtnShow);

//MARK: касание - анимация касания на сенсорных экранах --------------------------------

document.addEventListener('touchstart', function (e) {
    const touch = e.touches[0];
    
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    const excludedTags = ['BUTTON', 'A', 'DETAILS', 'SUMMARY'];

    if (target && excludedTags.includes(target.tagName)) {
        return;
    }
        const indicator = document.createElement('div');
        indicator.className = 'touch-indicator';
        indicator.style.left = touch.pageX + 'px';
        indicator.style.top = touch.pageY + 'px';
        document.body.appendChild(indicator);

        // Удаляем индикатор после завершения анимации
        setTimeout(() => {
            indicator.remove();
        }, 600);
    // }
});

