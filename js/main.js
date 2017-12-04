'use strict';

// global variables
var globalLanguage = "";
var locale = "";

$(document).ready(function () {
    getLanguage();
    setLanguage();
    sendMessage();
});

function getLanguage() {
    globalLanguage = localStorage.getItem('language') || "pol";

    if (globalLanguage == "pol") {
        $('#flag-link').html('POL<img id="flag" src="img/Polen.jpg" alt="">');
        locale = "pl";
    } else {
        $('#flag-link').html('ENG<img id="flag" src="img/Grossbritanien.jpg" alt="">');
        locale = "en";
    }
}

function setLanguage() {

    jQuery.i18n({
        locale: locale,
        mode: 'map'
    });

    //    $.i18n.prop({mode: 'map'});
    console.log('load?');
    jQuery.i18n().load({
        'pl': langpl,
        'en': langeng
    }).done(function () {
        jQuery('.lang').i18n();
        console.log('success?');
    });
    // handle different ul sizes
    handleUls();


    $('.sel-lang').on('click', function (event) {

        // switch language texts
        console.log(event.delegateTarget.id);
        if (event.delegateTarget.id == "pol") {
            if (globalLanguage == "eng") {
                // set new locale 
                jQuery.i18n().locale = "pl";
                // regenerate all texts 
                jQuery('.lang').i18n();
                //change flag
                $('#flag-link').html('POL<img id="flag" src="img/Polen.jpg" alt="">');
                globalLanguage = "pol"; // set global language for local storage 
            }
        } else if (event.delegateTarget.id == "eng") {
            if (globalLanguage == "pol") {
                jQuery.i18n().locale = "en";
                jQuery('.lang').i18n();
                $('#flag-link').html('ENG<img id="flag" src="img/Grossbritanien.jpg" alt="">');
                globalLanguage = "eng"; // set global language for local storage 
            }

        }

        // handle different ul sizes
        handleUls();
        localStorage.setItem('language', globalLanguage);
    });

};


function sendMessage() {
    $('#send-message').on('click', function (event) {

        var inputs = $('input');
        var alert = false;

        event.preventDefault();
        $('#success-box').addClass('alert-invisible');
        for (var i = 0; i <= inputs.length; i++) {
            var currInput = inputs[i];
            if ($(currInput).val() == "") {
                $(currInput).addClass('alert-border');
                alert = true;
            } else {
                $(currInput).removeClass('alert-border');
            }
        };

        if (alert == true) {
            $('#alert-box').removeClass('alert-invisible');
            return;
        } else {
            $('#alert-box').addClass('alert-invisible');

        };

        $.ajax({
            url: "https://formspree.io/tpielaszkiewicz@gmail.com",
            method: "POST",
            data: {
                kto: $('#username').val(),
                email: $('#email').val(),
                telefon: $('#phone').val(),
                wiadomosc: $('#message').val(),
            },
            dataType: "json",
            success: function () {
                for (var j = 0; j <= inputs.length; j++) {
                    var currInput = inputs[j];
                    $(currInput).val('');
                };
                $('#success-box').removeClass('alert-invisible');
            }
        });
    })
};

function handleUls() {
    // everytime when switching the language, get all ul and li-s and "show" them
    $('#offer ul').removeClass('invisible');
    $('#offer li').removeClass('invisible');

    // when for ul or litext is not available, there will be 'ul-' at the begining, then hide this item
    var uls = Object.values($('#offer ul'));
    var lis = Object.values($('#offer li'));


    console.log(uls);
    uls.forEach(function (element) {
        if ($(element).text().startsWith('ul-')) {
            $(element).addClass('invisible');
        }
    });
    lis.forEach(function (element) {
        if ($(element).text().startsWith('ul-')) {
            $(element).addClass('invisible');
        }
    });

}
