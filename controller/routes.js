var axios = require('axios');
var moment = require('moment')
var Themeparks = require('themeparks')

module.exports = function (app) {

    //------------------------------------------------------------------------------------
    // Route that gets Disneyland rides. 
    //------------------------------------------------------------------------------------
    app.get('/DisneyRides', (req, res) => {

        var DisneyArr = [];

         
        var disneyLand = new Themeparks.Parks.DisneylandResortMagicKingdom();
        disneyLand.GetWaitTimes().then(function (rides) {
            // print each wait time
            console.log('DISNEYLAND')
            for (var i = 0, ride; ride = rides[i++];) {
                if (ride.waitTime > 0) {
                    
                    DisneyArr.push({
                        name: ride.name,
                        min: ride.waitTime
                    })
                }
            }
            
        }, console.error).then(function () {
            //sort from shortest to longest time
            DisneyArr.sort(function(a,b){return b.min-a.min})
            console.log(DisneyArr)
            res.json(DisneyArr)
        });
    })
    //------------------------------------------------------------------------------------
    // Route that gets CA Adventure rides. 
    //------------------------------------------------------------------------------------
    app.get('/CAAdventureRides', (req, res) => {

        var CAAdventureArr = [];

        // California Adventure - Disneyland Resort (ThemeParks.Parks.DisneylandResortCaliforniaAdventure)
        var disneyCaliforniaAdventure = new Themeparks.Parks.DisneylandResortCaliforniaAdventure();
        disneyCaliforniaAdventure.GetWaitTimes().then(function (rides) {
            // print each wait time
            console.log('CA ADV')
            for (var i = 0, ride; ride = rides[i++];) {
                if (ride.waitTime > 0) {
                    
                    CAAdventureArr.push({
                        name: ride.name,
                        min: ride.waitTime
                        
                    })
                }
            }
        }, console.error).then(function () {
            CAAdventureArr.sort(function(a,b){return b.min-a.min})
            console.log(CAAdventureArr)
            res.json(CAAdventureArr)
        });
    })

    //------------------------------------------------------------------------------------
    // Route that gets Disneyland open/close times. 
    //------------------------------------------------------------------------------------
    app.get('/Disney/Times', (req, res) => {              
        var disneyLand = new Themeparks.Parks.DisneylandResortMagicKingdom();
        disneyLand.GetOpeningTimes().then(function (times) {
            // print opening/close times
            console.log('DISNEYLAND times');
            
            res.json(times[0]);
        }, console.error)
    })

    //------------------------------------------------------------------------------------
    // Route that gets Disneyland open/close times. 
    //------------------------------------------------------------------------------------
    app.get('/CAAdventure/Times', (req, res) => {              
        var disneyCaliforniaAdventure = new Themeparks.Parks.DisneylandResortCaliforniaAdventure();
        disneyCaliforniaAdventure.GetOpeningTimes().then(function (times) {
                // console.log('CAAdventure times');
            
            res.json(times[0]);
        }, console.error)
    })
}
