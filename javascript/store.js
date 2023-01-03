
$(document).ready(function(){
    $(window).scroll(function(){

        if(this.scrollY > 2500){                      /*nastaveni přidatné proměnné v sekci slide up button, hodnota 3500 udava v jake casti stranky se objevi slider*/
            $('.scroll-button').addClass("show");
        }else{
            $('.scroll-button').removeClass("show");
        }
    });

    $('.scroll-button').click(function(){           /*spusteni javascriptu*/
        $('html').animate({scrollTop: 0});          /*preskrooluje stranku na zacatek-0*/
    });
    
});
