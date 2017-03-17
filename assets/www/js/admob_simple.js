var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-2534154076237143/7606418713',
        interstitial: 'ca-app-pub-2534154076237143/7327217112'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-6869992474017983/4806197152',
        interstitial: 'ca-app-pub-6869992474017983/7563979554'
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-6869992474017983/8878394753',
        interstitial: 'ca-app-pub-6869992474017983/1355127956'
    };
}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}

function initApp() {
    if (! AdMob ) { alert( 'admob plugin not ready' ); return; }

  AdMob.createBanner( {
        adId: admobid.banner, 
        isTesting: true,
      //  offsetTopBar: false,
//        adSize:'CUSTOM',
//        width:200,
//        height:200,
//        overlap:false,
//        position:AdMob.AD_POSITION.POS_XY, x:100, y:200,
//        bgColor: 'black'
    } );
    /*
    AdMob.AD_POSITION.NO_CHANGE     = 0,
    AdMob.AD_POSITION.TOP_LEFT      = 1,
    AdMob.AD_POSITION.TOP_CENTER    = 2,
    AdMob.AD_POSITION.TOP_RIGHT     = 3,
    AdMob.AD_POSITION.LEFT          = 4,
    AdMob.AD_POSITION.CENTER        = 5,
    AdMob.AD_POSITION.RIGHT         = 6,
    AdMob.AD_POSITION.BOTTOM_LEFT   = 7,
    AdMob.AD_POSITION.BOTTOM_CENTER = 8,
    AdMob.AD_POSITION.BOTTOM_RIGHT  = 9,
    AdMob.AD_POSITION.POS_XY        = 10, // use the given X and Y, see params 'x' and 'y'

    */
    AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        autoShow: true
    });
}

