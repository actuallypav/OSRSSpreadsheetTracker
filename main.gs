function myFunction() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  // UNCOMENT TO RUN PAVS STUFF
  //var mainSheet = ss.getSheetByName("Skills - Pav")
  
  // UNCOMENT TO RUN HANS' STUFF
  var mainSheet
  mainSheet = ss.getSheetByName("Skills - Hans")
  // https://wiseoldman.net/players/oo%20hans
  getStats(mainSheet)
  mainSheet = ss.getSheetByName("Skills - Pav")
  getStats(mainSheet)
}

function getStats(mainSheet) {
  var userId = mainSheet.getRange('C1').getValue()
  var experienceArray = [83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406, 24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333, 111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368599, 407015, 449428, 496254, 547953, 605032, 668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443, 1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114,2951373, 3258594, 3597792, 3972294, 4385776, 4842295, 5346332, 5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431, 14391160];

  
  var URL_STRING = "https://api.wiseoldman.net/players/" + userId.toString()
  userId = userId.toString()
  // Logger.log(userId);
  // var options = {
  //   "id": userId
  // };
  // var TRACK_URL_STRING = "https://api.wiseoldman.net/players/track/"
  // UrlFetchApp.fetch(TRACK_URL_STRING, options)
  var response = UrlFetchApp.fetch(URL_STRING);
  var json = response.getContentText();
  var data = JSON.parse(json);
  var skillName = mainSheet.getRange('A4:A27').getValues();
  var expColumn = mainSheet.getRange('C4:C27');
  var rankColumn = mainSheet.getRange('D4:D27');
  
  //setting player name
  var displayName = data["displayName"];
  mainSheet.getRange(1,4).setValue(displayName.toString());
  
  //setting combat level
  var combatLevel = data["combatLevel"]
  mainSheet.getRange(2,2).setValue(combatLevel.toString())

  //setting total experience
  var i = 4;
  skillName.forEach(function(row) {
    var currentSkill = row.toString().toLowerCase();
    Logger.log(currentSkill)
    var exp = data["latestSnapshot"][currentSkill]["experience"]
    Logger.log(exp);
    mainSheet.getRange(i,3).setValue(exp);
    i++;
  });
  
  //setting rank
  i = 4
  skillName.forEach(function(row) {
    var currentSkill = row.toString().toLowerCase();
    Logger.log(currentSkill)
    var exp = data["latestSnapshot"][currentSkill]["rank"]
    Logger.log(exp);
    mainSheet.getRange(i,4).setValue(exp);
    i++;
  });
  
  // get the values of the EXP
  var expColumnValues = mainSheet.getRange('C5:C27').getValues();
  i = 5

  // convert EXP to level
  expColumnValues.forEach(function(row){
    var totExp = parseInt(row.toString());
    Logger.log(totExp)
    level = 0;
    x = 0;
    var expCompare = 0;
    while(totExp > expCompare && totExp != expCompare) {
      expCompare = experienceArray[x];
      Logger.log("the level is: " + level);
      level++;
      x++;
    }
    mainSheet.getRange(i,2).setValue(level.toString());
    i++;
  });
}
