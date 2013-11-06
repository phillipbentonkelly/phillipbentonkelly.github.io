var GoogleTranslateJS = {};

(function(){
    var $ = jQuery;

	GoogleTranslateJS = function( apiKey ){
        if( !(this instanceof GoogleTranslateJS))
            return new GoogleTranslateJS( apiKey );

        this.apiKey = apiKey;
        this.detectURL = 'https://www.googleapis.com/language/translate/v2/detect?key=' + this.apiKey;
        this.translateURL = 'https://www.googleapis.com/language/translate/v2?key=' + this.apiKey;
	};

    GoogleTranslateJS.prototype = {
        detectLanguage: function( query ){
            var detect_URL = this.detectURL + query;
        },
        translate: function( targetObj, query, sourceLang, targetLang, updateTarget ){
            var thisRef = this;
            var translate_URL = this.translateURL + '&source=' + sourceLang + '&target=' + targetLang + '&q=' + query.replace(/ /g,"%20").trim();

            if(sourceLang != targetLang){
                console.log("Pairing: " + sourceLang + ':' + targetLang);
                
                $.getJSON(translate_URL).promise().done(function(results) {
                    if(updateTarget == true){
                        thisRef.updateTarget( targetObj, results.data.translations[0].translatedText );
                    }
                });
            }else{
                console.log("Language source cannot match the target language.");
            }
        },
        updateTarget: function( targetObj, content ){
            targetObj.html(content);
        }
	};
})();