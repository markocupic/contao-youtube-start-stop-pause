/**
 *
 * @type {{playerInfoList: Array, initialized: boolean, initialize: CeYoutubeStartStopPause.initialize, createPlayer: CeYoutubeStartStopPause.createPlayer}}
 */
CeYoutubeStartStopPause = {

    /**
     * Contains the player info an id filed in the template ce_player_youtube_start_stop_pause.html5
     */
    playerInfoList: [],

    initialized: false,


    /**
     * @constructor
     * This code loads the IFrame Player API code asynchronously.
     */
    initialize: function () {
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        CeYoutubeStartStopPause.initialized = true;
    },

    /**
     * This function creates an <iframe> (and YouTube player) after the API code downloads.
     */
    createPlayer: function (playerInfo) {

        return new YT.Player(playerInfo.id, {
            height: playerInfo.height,
            width: playerInfo.width,
            videoId: playerInfo.videoId,
            elementId: playerInfo.elementId,
            events: {
                'onReady': function (event) {
                    jQuery('[data-button-role="play"][data-button-id="' + event.target.a.id + '"]').click(function () {
                        event.target.playVideo();
                    });
                    jQuery('[data-button-role="pause"][data-button-id="' + event.target.a.id + '"]').click(function () {
                        event.target.pauseVideo();
                    });
                    jQuery('[data-button-role="stop"][data-button-id="' + event.target.a.id + '"]').click(function () {
                        event.target.stopVideo();
                    });
                },
                'onStateChange': function (event) {
                    if (event.data == YT.PlayerState.PLAYING) {
                        // Do something
                    }
                }
            }
        });
    }
}

// Initialize class
jQuery(document).ready(function () {
    if (CeYoutubeStartStopPause.initialized !== true) {
        // Initialize
        CeYoutubeStartStopPause.initialize();
    }
});


/**
 * The API will call this function once!!! when the video player is ready.
 * https://developers.google.com/youtube/iframe_api_reference#Getting_Started
 */
function onYouTubeIframeAPIReady() {

    if (typeof CeYoutubeStartStopPause.playerInfoList === 'undefined') {
        return;

    }
    jQuery.each(CeYoutubeStartStopPause.playerInfoList, function (i, val) {
        var curplayer = CeYoutubeStartStopPause.createPlayer(CeYoutubeStartStopPause.playerInfoList[i]);
    });

}

