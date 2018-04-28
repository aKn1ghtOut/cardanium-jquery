
var cardLayout = {};
(function()
    {
        var cardClass = "cardLayout";
        var self = this;

        this.flipIt = function(elem){
            elem.toggleClass("flipped");
            self.resizeCards(elem);
        };

        this.resizeCards = function(el){
            if( typeof(el) === undefined || el === undefined)
                el = $('.' + cardClass + ':not(.noResize)');
            el.each(function(){

                var padding = parseInt($(this).attr("cl-padding")) || 40;

                var active = $(this).hasClass("flipped") ? "back" : "front";
                $(this).css("height", ($(this).find("." + active + " .contHolder").height() + padding) + "px");
            });
        };
        
        this.bindCards = function() {
            $('.' + cardClass + ':not(.noFlip):not(.functional)')
                .off('click')
                .on('click', function()
                {
                    self.flipIt($(this));
                });
            $('.' + cardClass + '.functional .cardFunctionalClick')
                .off('click')
                .on('click', function()
                {
                    self.flipIt($(this).parents(".cardLayout"));
                });
        };

        this.createCard = function(cardOb){
            /*
            * An object is supposed to be passed like below:
            * createCard({
            *               frontHTML: front,   //Default is empty
            *               backHTML: back,     //Default is empty
            *               noFlip: true,       //Default is false
            *               functional: true,   //Default is functional
            *               bgfront: bgcolor,   //Default is white
            *               bgback: bgcolor     //Default is white
            *               padding: pxValue    //Default is 40
            *               addClasses: classes //Default in nil
            *            })
            * */

            var front       =   cardOb.frontHTML    ||  "",
                back        =   cardOb.backHTML     ||  "",
                noFlip      =   cardOb.noFlip       ||  false,
                functional  =   cardOb.functional   ||  false,
                bgfront     =   cardOb.bgfront      ||  "",
                bgback      =   cardOb.bgback       ||  "",
                addClasses  =   cardOb.addClasses   ||  "",
                setId       =   cardOb.setId        ||  "",
                padding     =   cardOb.padding      ||  40
            ;

            addClasses = addClasses + (functional===true? " functional" : "") + (noFlip===true? " noFlip" : "");
            var elemHTML =
                "<div class='" + cardClass + " " + addClasses + "' " + (((typeof(setId) === "string") && (setId !== "")) ? ("id='" + setId + "'") : "") + " cl-padding='" + padding + "'>" +
                    "<div class='rel'>" +
                        "<div class='front' " + (((typeof(bgfront) === "string") && (bgfront !== "")) ? ("style='background-color: " + bgfront + "'") : "") + ">" +
                            "<div class='contHolder'>" +
                                front +
                            "</div>" +
                        "</div>" +
                        "<div class='back' " + (((typeof(bgback) === "string") && (bgback !== "")) ? ("style='background-color: " + bgback + "'") : "") + ">" +
                            "<div class='contHolder'>" +
                                back +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>";

            return elemHTML;
        }

    }).apply(cardLayout);